# Plex — Deep Project Documentation

> Browser-based cloud IDE inspired by Cursor AI / Orchids. Create full web projects
> with an AI coding agent, edit them in a CodeMirror-powered IDE, preview them live
> in WebContainers, and import/export via GitHub — all realtime on Convex.
>
> Package name: `plex` · Version `0.1.0` · Private repo · Origin: Polaris tutorial codebase, renamed.

---

## 1. Overview

Plex lets a signed-in user:

1. Describe an app in natural language → AI agent scaffolds a **complete runnable
   project** (package.json, configs, source tree, README).
2. Edit code in a VSCode-like IDE (explorer, tabs, breadcrumbs, minimap, ghost
   suggestions, Cmd+K quick-edit).
3. Chat with the agent in a conversation sidebar; the agent reads/creates/updates/
   renames/deletes project files through tools.
4. Run a live preview + terminal via WebContainer, with configurable install/dev commands.
5. Import any public GitHub repo as a project; export any project to a new GitHub repo.
6. See everything update in realtime (Convex subscriptions + optimistic UI).

No subscription/paywall gates exist in the codebase — import/export/AI are free
(limited only by each AI provider's own free-tier quotas).

---

## 2. Tech Stack

| Category       | Technologies |
|----------------|--------------|
| Framework      | Next.js 16.1.1 (App Router, Turbopack), React 19.2.3, TypeScript 5 |
| Styling/UI     | Tailwind CSS 4, shadcn/ui + Radix UI, `tw-animate-css`, `next-themes` (dark default), Lucide + react-icons + @react-symbols/icons |
| Editor         | CodeMirror 6 (langs: JS/TS/CSS/HTML/JSON/Markdown/Python), One Dark theme, @replit minimap + indentation markers, zustand store, Allotment resizable panes |
| Database       | Convex 1.31 (realtime queries/mutations, file storage for binaries) |
| Background jobs| Inngest 3.49 + @inngest/agent-kit 0.13 (agentic loop with tools) |
| AI (Vercel SDK)| `ai` 6 + `@ai-sdk/google` 3 (Gemini), `@ai-sdk/groq` 3 (Groq), `@openrouter/ai-sdk-provider` 2 (OpenRouter). (`@ai-sdk/anthropic` installed but unused) |
| Agent models   | Same three providers through agent-kit's `gemini()` adapter and its `openai()` adapter pointed at Groq/OpenRouter OpenAI-compatible endpoints |
| Auth           | Clerk (@clerk/nextjs 6 + @clerk/themes), GitHub OAuth for import/export, Convex JWT template `convex` |
| Execution      | @webcontainer/api 1.6 + @xterm/xterm + @xterm/addon-fit |
| Misc services  | Firecrawl (scrape URLs into AI context), Sentry (@sentry/nextjs 10, tunnel `/monitoring`), Octokit 5 (GitHub API), Inngest + Ky HTTP client, Sonner toasts, react-hook-form + zod + @hookform/resolvers + @tanstack/react-form (forms), nanoid/unique-names-generator (IDs/names), date-fns, recharts/embla/cmdk/vaul/input-otp/react-day-picker (UI kit) |
| Tooling        | pnpm (primary; `pnpm-lock.yaml`), ESLint 9 + eslint-config-next, Node ≥ 20.09 |

---

## 3. Features

### 3.1 Dashboard (`/`)
`ProjectsView` — centered card: Plex logo + Clerk `UserButton` (sign-out/profile),
`New` (⌘J) and `Import` (⌘I) tiles, `ProjectsList`, command palette `ProjectsCommandDialog` (⌘K). Keyboard shortcuts registered globally in the view.

### 3.2 Project IDE (`/projects/[projectId]`)
`ProjectIdLayout` → `ProjectIdView`: navbar (breadcrumb home → project, click-to-rename,
save-state tooltip) + `UserButton`; resizable panes (explorer | editor | conversation/preview);
`TopNavigation` tabs with auto-save (debounced Convex mutations); `ExportPopover`
(create repo: name/visibility/description, live exporting → completed + "View on GitHub",
failed → Retry, cancel/reset actions).

### 3.3 File explorer
Hierarchy tree from flat Convex records (`parentId`), create/rename inline inputs,
VSCode-style icons, loading rows, per-file tabs + breadcrumbs in the editor.

### 3.4 Code editor
CodeMirror with line numbers, folding, bracket matching, multi-cursor, minimap,
indentation guides, language modes per extension, One Dark theme; **ghost-text AI
suggestions** (`/api/suggestion`) as you type; **Cmd+K quick-edit** (`/api/quick-edit`)
rewrites the selection from a natural-language instruction (URLs in the instruction
are scraped via Firecrawl and injected as docs); selection tooltip shortcuts.

### 3.5 Conversation / AI agent
Sidebar chat with processing placeholders, history context (last 10 messages),
auto title generation (3–6 words), message cancel (`message/cancel` event),
past-conversations dialog, per-message status (`processing|completed|cancelled`).
The agent has 8 file tools + URL scraping and verifies with `listFiles` after acting.

### 3.6 Preview & terminal
WebContainer boot (singleton, `coep: credentialless`), mount Convex files as a file
tree, run configurable install/dev commands (per-project settings, defaults
`npm install` / `npm run dev`), `server-ready` URL shown in preview iframe,
xterm terminal streams process output, hot-reload writes Convex file changes into
the container, restart button. Requires COEP/COOP headers (set in `next.config.ts`).

### 3.7 GitHub import / export
- **Import:** paste repo URL → server parses owner/repo, grabs GitHub OAuth token via
  Clerk, creates project, Inngest worker pulls git tree + blobs (text inline,
  binaries into Convex storage) and recreates hierarchy. Status: importing/completed/failed.
- **Export:** repo name/visibility/description → worker creates repo (`auto_init`),
  uploads blobs/tree/commit onto the repo's **actual default branch** (not hardcoded
  `main`), force-updates the branch ref, stores `exportRepoUrl`. Cancel/reset supported.

### 3.8 Realtime
Convex `useQuery` subscriptions (projects, files, conversations, messages) +
ConvexProviderWithClerk auth; Inngest events drive long work without blocking UI.

---

## 4. Architecture & Key Flows

```
Browser ── Next.js App Router ──┬── Convex (realtime DB + storage)
  │                              ├── Inngest (events → agent/import/export workers)
  │                              ├── Clerk (session, GitHub OAuth tokens)
  │                              └── AI providers (Gemini → Groq → OpenRouter)
```

**Create project with prompt:** `NewProjectDialog` → `POST /api/projects/create-with-prompt`
(auth → `system.createProjectWithConversation` → user message → assistant
`processing` placeholder → `inngest.send("message/sent")`) → redirect to project page.
Each stage has its own error message; the dialog surfaces the server's `{error}`
string (not a generic toast).

**Agent reply:** `message/sent` → `process-message` fn → sleeps 1s (DB sync) →
loads conversation + recent messages → maybe generates title → builds coding agent
(system prompt + history + 8 tools) → single-agent network (`maxIter: 10`, stops on
text-without-tool-calls) → writes final text into the placeholder (status completed).
Failures hit `onFailure` → apology message. Cancel via `message/cancel` event.

**Suggestion/quick-edit:** editor extension → `POST /api/suggestion|quick-edit`
(zod-validated structured output via `Output.object`) → ghost text / replaced selection.

**Import:** dialog → `POST /api/github/import` → project + `github/import.repo` event →
worker (cleanup → fetch tree → fetch blobs → bulk create, binary via storage upload URLs).

**Export:** popover → `POST /api/github/export` → `github/export.repo` event →
worker (create repo → wait → default-branch ref → blobs → tree → commit → update ref →
`exportRepoUrl`). Cancel/reset routes + worker `cancelOn`.

---

## 5. Project Structure

```
convex/
  schema.ts            # tables: projects, files, conversations, messages (+indexes)
  auth.ts              # verifyAuth (Convex identity) used by user-facing fns
  auth.config.ts       # Clerk JWT issuer domain, applicationID "convex"
  projects.ts          # user mutations/queries: create, get, getPartial, getById, rename, updateSettings
  files.ts             # user file ops (used by explorer/editor hooks)
  conversations.ts     # user conversation ops
  system.ts            # INTERNAL API (PLEX_CONVEX_INTERNAL_KEY gate): projects, files/folders
                       # (incl. bulk createFiles/createFolder/rename/delete/cleanup),
                       # messages, upload URLs, binary file records, import/export status,
                       # getProjectFilesWithUrls — everything Inngest/API routes use
src/
  app/
    layout.tsx         # fonts (Inter/Plex Mono), Providers, Toaster, metadata "Plex"
    page.tsx           # → ProjectsView (dashboard)
    projects/[projectId]/layout.tsx + page.tsx
    global-error.tsx
    api/
      projects/create-with-prompt/route.ts
      messages/route.ts (+ cancel)     # follow-up user message → assistant placeholder + event
      suggestion/route.ts              # ghost completions (structured)
      quick-edit/route.ts              # selection rewrite (structured + Firecrawl docs)
      github/import|export(+cancel/reset)/route.ts
      inngest/route.ts                 # serve(): processMessage, importGithubRepo, exportToGithub
  components/
    providers.tsx      # Clerk → Convex-with-Clerk → Theme → Authenticated/Unauthenticated/Loading gates
    theme-provider.tsx
    ai-elements/       # 30 chat/agent UI primitives (prompt-input, message, code-block, web-preview…)
    ui/                # full shadcn kit (~45 components)
  features/
    auth/components/   # unauthenticated + loading views
    projects/
      components/      # projects-view/list/command-dialog, new-project-dialog,
                       # import-github-dialog, navbar, project-id-*, export-popover,
                       # preview-view, file-explorer/ (tree, inputs, icons)
      hooks/           # use-projects (CRUD), use-files
      inngest/         # import-github-repo, export-to-github
    editor/            # code-editor, editor-view, breadcrumbs, top-navigation,
                       # extensions (setup/theme/languages/minimap/suggestion/quick-edit/selection-tooltip),
                       # hooks/use-editor, zustand store
    conversations/
      components/      # conversation-sidebar, past-conversations-dialog
      hooks/           # use-conversations
      constants.ts     # DEFAULT_CONVERSATION_TITLE
      inngest/
        constants.ts   # CODING_AGENT_SYSTEM_PROMPT (path rules + full-shell checklist), title prompt
        process-message.ts
        tools/         # list/read/update/createFiles/createFolder/rename/delete/scrape-urls
                       # + file-paths.ts (path splitting + folder auto-creation)
    preview/           # use-webcontainer, preview-terminal/settings-popover, file-tree utils
  hooks/use-mobile.ts  # responsive helper
  inngest/client.ts    # Inngest client id "plex" + Sentry middleware
  inngest/functions.ts # demoGenerate (Firecrawl + generateText chain), demoError
  lib/
    ai-providers.ts    # ALL provider config: chains, slots, retry classification,
                       # withAiFallback, resolveTextModel, agent model builders (SERVER-ONLY)
    convex-client.ts   # ConvexHttpClient for routes/workers
    firecrawl.ts       # Firecrawl client (FIRECRAWL_API_KEY)
    utils.ts           # cn() etc.
  instrumentation(.client).ts, proxy.ts (Clerk middleware), globals.css
```

---

## 6. Database Schema (Convex)

- **projects**: `name, ownerId (indexed by_owner), updatedAt, importStatus?, exportStatus?, exportRepoUrl?, settings?{installCommand, devCommand}`
- **files**: `projectId, parentId?, name, type(file|folder), content? (text), storageId? (binary), updatedAt` — indexes `by_project`, `by_parent`, `by_project_parent`. Hierarchy is parent-linked; names are always basenames (paths are resolved to folders at creation).
- **conversations**: `projectId, title, updatedAt` (indexed `by_project`)
- **messages**: `conversationId, projectId, role(user|assistant), content, status?` (indexed `by_conversation`, `by_project_status`)

Two access layers: user functions (`verifyAuth` + `ownerId` checks) vs `system.*`
(`PLEX_CONVEX_INTERNAL_KEY` gate) for server/worker use.

---

## 7. API Routes Reference

| Route | Purpose | Notes |
|---|---|---|
| `POST /api/projects/create-with-prompt` | Create project + conversation + messages, fire agent | Per-stage errors; returns `{projectId}` |
| `POST /api/messages` (+ `/cancel`) | Follow-up message in existing conversation | Same placeholder+event pattern |
| `POST /api/suggestion` | Ghost completion `{suggestion}` | Structured output; needs `code` |
| `POST /api/quick-edit` | Rewrite selection `{editedCode}` | Scrapes URLs from instruction |
| `POST /api/github/import` | Import repo → `{projectId, eventId}` | Needs GitHub OAuth via Clerk |
| `POST /api/github/export` (+`/cancel`/`/reset`) | Export project → `{projectId, eventId}` | Status tracked on project |
| `GET/POST/PUT /api/inngest` | Inngest serve endpoint | 3 functions registered |

---

## 8. Inngest Workers

| Function | Event | Work (steps) |
|---|---|---|
| `process-message` | `message/sent` (+`message/cancel` cancels) | title chain → coding network → write reply; `onFailure` writes apology |
| `import-github-repo` | `github/import.repo` | cleanup → repo tree → blobs (binary→storage) → bulk create; failure → `importStatus: failed` |
| `export-to-github` | `github/export.repo` (+cancel) | create repo → default-branch ref → blobs → tree → commit → update ref → `exportRepoUrl`; failure → `exportStatus: failed` |
| `demoGenerate` / `demoError` | `demo/*` | URL-scrape + generate demo / forced failure demo |

---

## 9. AI System (Deep Dive)

### 9.1 Providers & model IDs (all verified live, never tutorial guesses)

| Provider | SDK | Key | Models used |
|---|---|---|---|
| Gemini (Google AI API) | `@ai-sdk/google@3` | `GOOGLE_GENERATIVE_AI_API_KEY` | `gemini-3.6-flash` (2.0/2.5 return 404-retired on this API) |
| Groq (OpenAI-compatible) | `@ai-sdk/groq@3` | `GROQ_API_KEY` | `openai/gpt-oss-120b` (coding), `openai/gpt-oss-20b` (titles) |
| OpenRouter | `@openrouter/ai-sdk-provider@2` | `OPENROUTER_API_KEY` | `google/gemini-3.8-flash` (coding), `google/gemini-3.5-flash-lite` (titles) |

> Version pins are deliberate: `ai@6` + google@3 speak provider spec V3; groq v4 /
> openrouter v3 are V4-only and fail typecheck. Do not "upgrade" one side alone.

### 9.2 Fallback chains (`src/lib/ai-providers.ts`, server-only)
- `CODING_CHAIN`: gemini-3.6 → gpt-oss-120b → gpt-oss-20b → OR gemini-3.8-flash
- `TITLE_CHAIN`: gemini-3.6 → gpt-oss-20b → OR gemini-3.5-flash-lite
- `withAiFallback(run, chain)`: tries each slot **once, in order**; advances only on
  **retryable** errors (429/quota/5xx/timeout/retired-model); stops on first success
  or first non-retryable error (401/403/400-validation/abort); skips providers with
  no key **without calling**; throws clean `Error("AI service temporarily unavailable…")`
  with the original as `cause` when exhausted. No loops, no double-calling.
- Agent path uses the same chains via `buildAgentModel(slot)` (Gemini adapter, or the
  `openai()` adapter repointed at Groq/OpenRouter base URLs — agent-kit has no native
  Groq/OpenRouter adapters). Title failures only skip titling; coding exhaustion writes
  a quota-aware message (or rethrows → generic apology via `onFailure`).

### 9.3 Agent tools & path handling
Tools: `listFiles, readFiles, updateFile, createFiles, createFolder, renameFile,
deleteFiles, scrapeUrls`. `createFiles/createFolder` accept **full relative paths**
(`src/routes/index.tsx`); `tools/file-paths.ts` sanitizes (backslashes, leading `/`,
`. `/`..`, empties) and auto-creates missing folders, grouping batch creates per
parent. Collisions with same-named files return actionable errors to the model.
The system prompt mandates full paths + a complete runnable shell (package.json +
scripts, framework config, entry point, README) with per-stack conventions
(TanStack Router `src/routes/__root.tsx`, Next.js `app/`, Vite `index.html+main.tsx`).

### 9.4 Quota behavior
Free tiers are tiny (Gemini ~20 req/day; each agent iteration = ≥1 request,
`maxIter: 10` caps worst case). Title costs 1 call only on a conversation's first
message. Monitor Gemini at `https://ai.dev/rate-limit`; OpenRouter/Groq bill their
own accounts/tiers.

---

## 10. Auth
Clerk middleware (`proxy.ts`) → `ClerkProvider` → `ConvexProviderWithClerk`
(JWT template **`convex`**, `applicationID: "convex"`, `CLERK_JWT_ISSUER_DOMAIN`).
Unauthenticated users see `UnauthenticatedView`; auth-loading shows a spinner view.
GitHub OAuth (via Clerk) supplies repo tokens for import/export — user must connect
GitHub in their Clerk profile ("GitHub not connected" toast links there).

---

## 11. Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `PLEX_CONVEX_INTERNAL_KEY` | server + Convex dashboard | Trust gate for all `system.*` calls — must MATCH in both |
| `NEXT_PUBLIC_CONVEX_URL` / `NEXT_PUBLIC_CONVEX_SITE_URL` / `CONVEX_DEPLOYMENT` | client/server/CLI | Convex deployment wiring (set by `convex dev`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` / `CLERK_JWT_ISSUER_DOMAIN` | mixed | Clerk auth + Convex JWT |
| `GOOGLE_GENERATIVE_AI_API_KEY` (or `GEMINI_API_KEY`) | server | Primary AI provider |
| `GROQ_API_KEY` | server | Fallback provider |
| `OPENROUTER_API_KEY` | server | Fallback provider |
| `FIRECRAWL_API_KEY` | server | URL scraping for AI context |
| `SENTRY_DSN` / `SENTRY_AUTH_TOKEN` / `SENTRY_ORG` / `SENTRY_PROJECT` | mixed | Error tracking (Sentry project slug `polaris`) |
| `INNGEST_DEV` | server | Inngest dev mode |

Never `NEXT_PUBLIC_*` a secret; `ai-providers.ts` is never imported by client components.

---

## 12. Setup & Run

Prereqs: Node 20.09+, pnpm, accounts (Clerk, Convex, Inngest, Google AI Studio;
optional Groq, OpenRouter, Firecrawl, Sentry).

```powershell
pnpm install
# fill .env.local (see table above; PLEX_CONVEX_INTERNAL_KEY = random hex)
npx convex dev          # terminal 1 — syncs DB + env
pnpm dev                # terminal 2 — http://localhost:3000
pnpm dlx inngest-cli@latest dev   # terminal 3 — event workers (Inngest UI :8288)
```

Scripts: `pnpm dev|build|start|lint`. Quality gates: `tsc --noEmit` 0 errors,
`eslint` 0 errors. Restart all three servers after any `.env.local`, Inngest app-ID,
or provider change (env/IDs load at boot, not via HMR).

---

## 13. Conventions & Gotchas

- Package manager is **pnpm** (`package-lock.json` is a stale leftover).
- Server/client boundary: anything touching API keys lives in API routes, Inngest
  functions, or `src/lib/ai-providers.ts` — verified no `.tsx` imports it.
- Inngest function/app IDs (`plex`, `plex-network`): renames orphan old runs in dev.
- Sentry slug is still `polaris` (rename in Sentry dashboard first if desired).
- `README.md` upstream tutorial links left intact.
- Editor ghost text and quick-edit call the same fallback chains as chat.
- Binary project files live in Convex storage; text inline in `files.content`.
