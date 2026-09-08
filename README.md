# ⚡ Plex

Plex is a modern web-based coding workspace that brings **projects, files, code editing, AI assistance, authentication, and developer tools** together in one place.

The goal of Plex is to create a development environment that is:

* ⚡ Fast
* 🧠 AI-powered
* 🛠️ Developer-focused
* 🧩 Modular
* 🌐 Browser-based
* 🎨 Modern and intuitive

---

## ✨ Features

* 🗂️ **Project-based workspace**
* 📁 **File and folder management**
* 📝 **CodeMirror code editor**
* 🎨 **Custom editor themes**
* 🔤 **Multi-language syntax highlighting**
* 🤖 **AI-powered coding assistance**
* ⚡ **Google Gemini integration**
* 🚀 **Groq integration**
* 🔄 **AI provider fallback architecture**
* 🔐 **Clerk authentication**
* 💾 **Convex backend and database**
* 🧠 **Zustand editor state management**
* ↔️ **Resizable workspace panels with Allotment**
* 🏷️ **Project renaming**
* 📑 **Editor tabs**
* 👁️ **Preview tabs**
* 📌 **Pinned tabs**
* ⏱️ **Project update status**
* 📱 **Modern responsive interface**
* 🧱 **Feature-based project architecture**

---

# 🎯 Why Plex?

Traditional development usually involves jumping between multiple applications:

```text
┌──────────────┐
│ File Manager │
└──────┬───────┘
       ↓
┌──────────────┐
│ Code Editor  │
└──────┬───────┘
       ↓
┌──────────────┐
│ AI Assistant │
└──────┬───────┘
       ↓
┌──────────────┐
│   Browser    │
└──────┬───────┘
       ↓
┌──────────────┐
│   GitHub     │
└──────────────┘
```

Plex aims to bring these workflows closer together:

```text
                 ┌───────────────┐
                 │     PLEX      │
                 │  Web IDE       │
                 └───────┬───────┘
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
       Projects        Editor           AI
          │              │              │
          ↓              ↓              ↓
        Files         CodeMirror    Gemini / Groq
          │              │              │
          └──────────────┼──────────────┘
                         ↓
                      Convex
                         ↓
                      Database
```

The vision is to create a **browser-native development environment where developers can manage their projects, edit code, and interact with AI without constantly switching between tools.**

---

# 🏗️ Architecture

Plex follows a modern full-stack architecture built around Next.js, Convex, and AI SDK.

```text
                         USER
                          │
                          ▼
                   ┌─────────────┐
                   │   Next.js   │
                   │  Frontend   │
                   └──────┬──────┘
                          │
            ┌─────────────┼─────────────┐
            ↓             ↓             ↓
        Projects        Editor          AI
            │             │             │
            ↓             ↓             ↓
         Convex       CodeMirror     AI SDK
            │                           │
            ↓                    ┌──────┴──────┐
        Database                 ↓             ↓
                              Gemini         Groq
```

---

# 🧩 Technology Stack

| Technology        | Purpose                      |
| ----------------- | ---------------------------- |
| **Next.js 16**    | Full-stack React framework   |
| **React**         | User interface               |
| **TypeScript**    | Type safety                  |
| **Tailwind CSS**  | Styling                      |
| **Convex**        | Backend + database           |
| **Clerk**         | Authentication               |
| **Zustand**       | Client-side state management |
| **CodeMirror**    | Code editor                  |
| **Allotment**     | Resizable panels             |
| **Vercel AI SDK** | AI integration               |
| **Gemini**        | AI provider                  |
| **Groq**          | AI provider / fallback       |
| **Lucide React**  | Icons                        |
| **date-fns**      | Date formatting              |

---

# 🖥️ Workspace

The main Plex workspace is designed similarly to a modern IDE.

```text
┌─────────────────────────────────────────────────────────┐
│                       PLEX NAVBAR                       │
├───────────────────────┬─────────────────────────────────┤
│                       │                                 │
│                       │                                 │
│       SIDEBAR         │           CODE EDITOR           │
│                       │                                 │
│   📁 Projects         │      ┌───────────────────┐      │
│   📂 Files            │      │ index.tsx        │      │
│                       │      ├───────────────────┤      │
│                       │      │                   │      │
│                       │      │  CodeMirror       │      │
│                       │      │                   │      │
│                       │      │                   │      │
│                       │      └───────────────────┘      │
│                       │                                 │
└───────────────────────┴─────────────────────────────────┘
```

The sidebar can be resized using Allotment.

---

# 📝 Code Editor

Plex uses **CodeMirror** as its editor engine.

The editor is designed around independent extensions so functionality can be added without tightly coupling everything together.

Supported language integrations include:

```text
JavaScript
TypeScript
HTML
CSS
JSON
Markdown
Python
```

The editor architecture can include:

```text
editor/
│
├── Components/
│   ├── code-editor.tsx
│   └── Editor-view.tsx
│
└── extensions/
    ├── language
    ├── theme
    ├── autocomplete
    ├── suggestions
    ├── quick-edit
    └── selection tools
```

---

# 📑 Tab System

Plex provides an IDE-like tab system powered by Zustand.

Each project maintains its own editor state.

```ts
interface TabState {
  openTabs: Id<"files">[];
  activeTabId: Id<"files"> | null;
  previewTabId: Id<"files"> | null;
}
```

This enables:

### Preview Tabs

Opening a file can initially create a preview tab.

### Pinned Tabs

A file can be pinned so that it becomes a permanent tab.

### Active Tab

The currently selected file is tracked independently.

Conceptually:

```text
Project
   │
   ├── Open Tabs
   │      ├── index.tsx
   │      ├── App.tsx
   │      └── styles.css
   │
   ├── Active Tab
   │      └── App.tsx
   │
   └── Preview Tab
          └── styles.css
```

---

# 💾 Backend

Plex uses **Convex** for backend functionality and persistent application data.

The general data flow is:

```text
React UI
   │
   ▼
Custom Hook
   │
   ▼
Convex Query / Mutation
   │
   ▼
Convex Backend
   │
   ▼
Database
   │
   ▼
Reactive UI Update
```

Convex can manage application entities such as:

```text
Projects
Files
Project metadata
File metadata
Users
```

---

# 🔐 Authentication

Plex uses **Clerk** for authentication.

```text
User
 │
 ▼
Clerk
 │
 ▼
Authenticated Session
 │
 ▼
Plex
 │
 ▼
Convex
```

Authentication functionality can include:

* Sign in
* Sign up
* User sessions
* User identity
* Account management

---

# 🤖 AI System

Plex is designed with a provider-based AI architecture.

Instead of hard-coding the application to a single AI provider, the AI layer can communicate through the Vercel AI SDK.

```text
                     AI REQUEST
                         │
                         ▼
                   ┌───────────┐
                   │ AI Router │
                   └─────┬─────┘
                         │
                ┌────────┴────────┐
                ↓                 ↓
             Gemini              Groq
                │                 │
                └────────┬────────┘
                         ↓
                      Response
```

This makes it easier to add other providers in the future.

---

# 🔄 AI Fallback

One of the important design goals of Plex is provider resilience.

For example:

```text
User Request
     │
     ▼
   Gemini
     │
     ├── Success ──────────────► Response
     │
     └── Rate Limit / Failure
                │
                ▼
              Groq
                │
                ▼
             Response
```

The application does **not** need to call every provider simultaneously.

Instead, a provider can be attempted first and another provider can be used when an appropriate retryable failure occurs.

Future versions can extend this architecture:

```text
                 AI Router
                    │
       ┌────────────┼─────────────┐
       ↓            ↓             ↓
    Gemini         Groq        Provider N
       │            │             │
       └────────────┼─────────────┘
                    ↓
                 Response
```

---

# 📂 Project Structure

A simplified version of the project structure:

```text
plex/
│
├── convex/
│   ├── _generated/
│   ├── projects.ts
│   ├── files.ts
│   └── ...
│
├── src/
│   │
│   ├── app/
│   │   ├── projects/
│   │   │   └── [projectId]/
│   │   │
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── features/
│   │   │
│   │   ├── projects/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── ...
│   │   │
│   │   ├── editor/
│   │   │   ├── Components/
│   │   │   ├── extensions/
│   │   │   └── ...
│   │   │
│   │   └── ...
│   │
│   ├── components/
│   │   └── ui/
│   │
│   └── lib/
│       └── utils.ts
│
├── public/
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

# 🚀 Getting Started

Follow these steps to run Plex locally.

## Prerequisites

Make sure you have installed:

* Node.js
* pnpm
* Git

Check your versions:

```bash
node --version
pnpm --version
git --version
```

---

# 1. Clone Plex

```bash
git clone https://github.com/YOUR_USERNAME/plex.git
```

Then:

```bash
cd plex
```

---

# 2. Install Dependencies

```bash
pnpm install
```

If pnpm isn't installed:

```bash
npm install -g pnpm
```

Then:

```bash
pnpm install
```

---

# 3. Environment Variables

Create a file in the project root:

```text
.env.local
```

Add the required environment variables.

Example:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Gemini
GEMINI_API_KEY=your_gemini_api_key

# Groq
GROQ_API_KEY=your_groq_api_key
```

> Your exact environment variable names should match the names used by your current implementation.

---

# 🔒 Environment Security

Never commit secrets to GitHub.

Your `.gitignore` should contain:

```gitignore
.env
.env.local
.env.*.local
```

Never expose private API keys using:

```env
NEXT_PUBLIC_GEMINI_API_KEY=...
NEXT_PUBLIC_GROQ_API_KEY=...
```

Private API credentials should remain server-side.

---

# 4. Configure Clerk

Create a Clerk application and obtain your credentials.

Add them to:

```text
.env.local
```

For example:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

---

# 5. Configure Convex

Start Convex development:

```bash
pnpm convex dev
```

Keep this terminal running.

Convex will handle the backend development environment and synchronize your backend with the application.

---

# 6. Configure AI Providers

## Gemini

Add your Gemini API key:

```env
GEMINI_API_KEY=your_api_key
```

## Groq

Add your Groq API key:

```env
GROQ_API_KEY=your_api_key
```

These providers can be used by the AI layer according to the application's provider configuration.

---

# 7. Start Plex

Open another terminal and run:

```bash
pnpm dev
```

The application should be available at:

```text
http://localhost:3000
```

Open the address in your browser.

---

# 🧪 Local Development

A typical development setup uses two terminals.

### Terminal 1

```bash
pnpm convex dev
```

### Terminal 2

```bash
pnpm dev
```

Then visit:

```text
http://localhost:3000
```

---

# ⚙️ Useful Commands

### Install dependencies

```bash
pnpm install
```

### Start development server

```bash
pnpm dev
```

### Start Convex

```bash
pnpm convex dev
```

### Build the application

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

### Add a package

```bash
pnpm add <package>
```

Example:

```bash
pnpm add @ai-sdk/groq
```

### Run a Convex function

```bash
pnpm convex run <functionName>
```

---

# 🛠️ Development Workflow

A typical workflow looks like:

```text
1. Create Project
       ↓
2. Open Project
       ↓
3. Browse Files
       ↓
4. Open File
       ↓
5. Edit Code
       ↓
6. Use AI Assistance
       ↓
7. Save / Update Project
```

---

# 🧠 Data Flow

## Project Data

```text
User
 │
 ▼
Plex UI
 │
 ▼
Project Hook
 │
 ▼
Convex Mutation
 │
 ▼
Convex Database
```

## Editor

```text
File
 │
 ▼
Editor Component
 │
 ▼
CodeMirror
 │
 ▼
Editor State
 │
 ▼
Zustand
```

## AI

```text
User Prompt
 │
 ▼
AI Interface
 │
 ▼
Server-side AI Logic
 │
 ▼
Vercel AI SDK
 │
 ├── Gemini
 │
 └── Groq
 │
 ▼
Generated Response
 │
 ▼
Plex UI
```

---

# 🎨 UI Philosophy

Plex is designed around a modern developer-tool aesthetic.

The interface prioritizes:

* Minimal distractions
* Clear navigation
* Fast interactions
* IDE-like workflows
* Keyboard-friendly interaction
* Resizable panels
* Familiar developer patterns

The goal is to make Plex feel less like a traditional website and more like a **development environment running in the browser**.

---

# 🗺️ Roadmap

Plex is an evolving project.

Potential future improvements include:

* [ ] Advanced AI coding agent
* [ ] Multi-file AI modifications
* [ ] AI-powered debugging
* [ ] AI code explanation
* [ ] AI autocomplete
* [ ] Integrated terminal
* [ ] Git integration
* [ ] GitHub integration
* [ ] File search
* [ ] Command palette
* [ ] Keyboard shortcuts
* [ ] Project sharing
* [ ] Real-time collaboration
* [ ] More programming languages
* [ ] Better code intelligence
* [ ] Deployment integration
* [ ] More AI providers
* [ ] Local AI support
* [ ] Ollama support
* [ ] AI provider load balancing

---

# 🤝 Contributing

Contributions are welcome.

## Fork the repository

Fork Plex on GitHub.

## Create a branch

```bash
git checkout -b feature/my-feature
```

## Make your changes

```bash
git add .
git commit -m "feat: add my feature"
```

## Push your branch

```bash
git push origin feature/my-feature
```

Then create a Pull Request.

---

# 🐛 Bug Reports

Found a bug?

Open an issue and include:

1. Description of the problem
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser and operating system
6. Error messages
7. Screenshots if relevant

---

# 💡 Feature Requests

Have an idea for Plex?

Open an issue describing:

* What you want to add
* Why it would be useful
* How you think it could work
* Any relevant examples

---

# 🔐 Security

If you discover a security vulnerability, please do not publicly disclose sensitive details immediately.

Contact the project maintainer privately so the issue can be investigated and resolved responsibly.

---

# 📜 License

Add your chosen license here.

For example:

```text
MIT License
```

If Plex does not currently have a license, specify that clearly before publishing it publicly.

---

# 🌟 Vision

Plex is more than a code editor.

It is an attempt to create a development environment where:

```text
                ┌──────────────┐
                │     PLEX     │
                └──────┬───────┘
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
      PROJECTS        CODE             AI
        │              │              │
        ↓              ↓              ↓
      FILES         EDITOR          AGENT
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                  DEVELOPMENT
```

The long-term goal is simple:

> **Build a powerful, intelligent development environment that lives in the browser.**

---

# ⚡ Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/plex.git

cd plex

pnpm install
```

Configure:

```text
.env.local
```

Then run:

### Terminal 1

```bash
pnpm convex dev
```

### Terminal 2

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

# ❤️ Built with

**Next.js · React · TypeScript · Convex · Clerk · CodeMirror · Zustand · Allotment · Vercel AI SDK**

---

## ⭐ Plex

**Code. Create. Build.**

*A browser-native development environment powered by modern web technologies and AI.*
