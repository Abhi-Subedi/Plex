# ⚡ Polaris

Polaris is a full-stack web-based development environment designed to bring together **code editing, project management, file navigation, AI assistance, authentication, and a modern developer experience** into a single application.

The goal of Polaris is simple:

**Build a lightweight, modern, intelligent coding workspace that runs directly in the browser.**

---

## ✨ Features

* 🗂️ **Project-based workspace**
* 📁 **File and folder management**
* 📝 **CodeMirror-powered code editor**
* 🎨 **Syntax highlighting and custom themes**
* 🔍 **Multiple programming language support**
* 🤖 **AI-powered coding assistance**
* ⚡ **Gemini AI integration**
* 🚀 **Groq AI integration / fallback support**
* 🔐 **Authentication with Clerk**
* 💾 **Real-time backend with Convex**
* 🧠 **Global editor state with Zustand**
* 🖥️ **Resizable editor/sidebar layout with Allotment**
* 🏷️ **Editable project names**
* 👁️ **Preview and pinned editor tabs**
* ⏱️ **Project update status**
* 📦 **Modern Next.js App Router architecture**
* 🌙 **Modern responsive UI**

---

# 🎯 Purpose

Modern developers frequently have to switch between multiple applications:

```text
File Explorer
      ↓
Code Editor
      ↓
Terminal
      ↓
Browser
      ↓
AI Assistant
      ↓
GitHub
```

Polaris aims to bring many of these workflows into a single environment.

Instead of constantly switching between tools, Polaris provides a centralized workspace:

```text
                    ┌─────────────────────┐
                    │       POLARIS       │
                    │   Developer IDE     │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ↓                    ↓                    ↓
     File System          Code Editor          AI Assistant
          │                    │                    │
          ↓                    ↓                    ↓
       Projects            CodeMirror          Gemini / Groq
          │                    │                    │
          └────────────────────┼────────────────────┘
                               ↓
                            Convex
                               ↓
                           Database
```

The long-term vision is to make Polaris a **browser-native development environment where code, projects, and AI work together naturally.**

---

# 🧠 How Polaris Works

At a high level, Polaris follows a modern full-stack architecture.

```text
                        USER
                         │
                         ▼
                  ┌─────────────┐
                  │   Next.js   │
                  │     UI      │
                  └──────┬──────┘
                         │
            ┌────────────┼────────────┐
            ↓            ↓            ↓
       Code Editor    Projects       AI
       CodeMirror      UI          Assistant
            │            │            │
            └────────────┼────────────┘
                         │
                         ▼
                    Application
                      Logic
                         │
             ┌───────────┴───────────┐
             ↓                       ↓
          Convex                  AI APIs
          Backend             Gemini / Groq
             │                       │
             ▼                       ▼
          Database                AI Model
```

---

# 🏗️ Architecture

Polaris is built using several modern technologies, each responsible for a specific part of the application.

## Frontend

```text
Next.js
   │
   ├── React
   ├── TypeScript
   ├── Tailwind CSS
   └── UI Components
```

The frontend handles:

* Application UI
* Project navigation
* File navigation
* Editor interface
* Tabs
* Authentication UI
* AI interaction
* Layout management

---

## Code Editor

Polaris uses **CodeMirror** as the core editor engine.

The editor supports language extensions such as:

```text
JavaScript
TypeScript
HTML
CSS
JSON
Markdown
Python
```

CodeMirror provides:

* Syntax highlighting
* Autocomplete
* Editor commands
* Language parsing
* Custom themes
* Selection tools
* Editor extensions

The editor architecture is organized around reusable extensions.

Example:

```text
editor/
│
├── Components/
│   ├── code-editor.tsx
│   └── Editor-view.tsx
│
└── extensions/
    ├── theme
    ├── language
    ├── autocomplete
    ├── suggestions
    ├── quick-edit
    └── selection tools
```

---

# 🗃️ Backend

Polaris uses **Convex** as its backend and database layer.

Convex handles application data such as:

```text
Users
Projects
Files
Project metadata
File metadata
```

The basic flow is:

```text
React Component
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
```

This allows Polaris to keep application data synchronized between the frontend and backend.

---

# 🔐 Authentication

Authentication is handled using **Clerk**.

The authentication flow is approximately:

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
Polaris
 │
 ▼
Convex
```

Clerk is responsible for:

* Sign in
* Sign up
* User sessions
* User identity
* Account management

---

# 🧠 Editor State Management

Polaris uses **Zustand** for client-side editor state.

One important piece of state is the tab system.

Conceptually:

```text
Project
   │
   ├── Open Tabs
   │
   ├── Active Tab
   │
   └── Preview Tab
```

The editor store maintains:

```ts
interface TabState {
  openTabs: Id<"files">[];
  activeTabId: Id<"files"> | null;
  previewTabId: Id<"files"> | null;
}
```

This allows Polaris to support IDE-like behavior.

For example:

```text
Open file A
    ↓
Preview tab A

Open file B
    ↓
Preview tab A becomes preview B

Pin file B
    ↓
B becomes permanent

Open file C
    ↓
C becomes preview
```

---

# 🖥️ Workspace Layout

Polaris uses **Allotment** to create resizable panels.

The layout is approximately:

```text
┌─────────────────────────────────────────────────────┐
│                    Polaris Navbar                   │
├───────────────────┬─────────────────────────────────┤
│                   │                                 │
│                   │                                 │
│     Sidebar       │          Main Editor            │
│                   │                                 │
│   Projects        │                                 │
│   Files           │          CodeMirror             │
│   Navigation      │                                 │
│                   │                                 │
│                   │                                 │
└───────────────────┴─────────────────────────────────┘
          ↕
      Resizable
```

Users can resize the sidebar according to their workflow.

---

# 🤖 AI Architecture

AI is designed as a provider-based system.

Instead of tightly coupling Polaris to one AI provider, the application can use an abstraction layer.

Conceptually:

```text
                     AI REQUEST
                          │
                          ▼
                    ┌───────────┐
                    │ AI Router │
                    └─────┬─────┘
                          │
             ┌────────────┴────────────┐
             ↓                         ↓
          Gemini                     Groq
             │                         │
             └────────────┬────────────┘
                          ↓
                       Response
```

This makes it possible to add additional AI providers later.

---

# 🔥 Gemini + Groq Fallback

One of the goals of Polaris is to avoid making the application completely dependent on one AI provider.

For example:

```text
User Prompt
     │
     ▼
   Gemini
     │
     ├── Success ──────────► Response
     │
     └── Rate Limited/Error
                │
                ▼
              Groq
                │
                ▼
             Response
```

This is especially useful when a provider's free-tier quota is exhausted.

The application should **not** send the request to every provider simultaneously.

Instead:

```text
Provider 1
   │
   ├── success → STOP
   │
   └── failure
          ↓
Provider 2
   │
   ├── success → STOP
   │
   └── failure
          ↓
Provider 3
```

This architecture can be extended later with additional providers.

---

# 📂 Project Structure

A simplified structure looks like:

```text
polaris/
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
│   └── ...
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

> The exact structure may evolve as Polaris grows.

---

# 🛠️ Tech Stack

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| **Next.js**       | Full-stack React framework |
| **React**         | User interface             |
| **TypeScript**    | Type safety                |
| **Tailwind CSS**  | Styling                    |
| **Convex**        | Backend + database         |
| **Clerk**         | Authentication             |
| **Zustand**       | Client-side state          |
| **CodeMirror**    | Code editor                |
| **Allotment**     | Resizable panels           |
| **Lucide React**  | Icons                      |
| **date-fns**      | Date/time formatting       |
| **Vercel AI SDK** | AI integration             |
| **Gemini**        | AI provider                |
| **Groq**          | AI provider/fallback       |

---

# 🚀 Getting Started

Follow these steps to run Polaris locally.

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/polaris.git
```

Enter the project:

```bash
cd polaris
```

---

# 2. Install dependencies

Polaris uses **pnpm**.

Install dependencies:

```bash
pnpm install
```

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

Then:

```bash
pnpm install
```

---

# 3. Configure environment variables

Create:

```text
.env.local
```

in the root of the project.

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

### ⚠️ Important

Never commit `.env.local` to GitHub.

Make sure your `.gitignore` contains:

```gitignore
.env
.env.local
.env.*.local
```

---

# 4. Configure Clerk

Create a Clerk application and obtain the required keys.

Add them to:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

---

# 5. Configure Convex

Start the Convex development environment:

```bash
pnpm convex dev
```

Convex will generate the required configuration and backend files.

Keep the Convex process running while developing.

---

# 6. Configure AI Providers

## Gemini

Add your Gemini API key:

```env
GEMINI_API_KEY=your_key
```

## Groq

Add:

```env
GROQ_API_KEY=your_key
```

Groq can then be used as an alternative/fallback provider.

---

# 7. Start the development server

In another terminal:

```bash
pnpm dev
```

Polaris should now be available at:

```text
http://localhost:3000
```

Open it in your browser.

---

# 🧪 Development Workflow

A typical local development setup uses two terminals.

### Terminal 1

```bash
pnpm convex dev
```

### Terminal 2

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

---

# 🧩 Useful Commands

### Start Next.js

```bash
pnpm dev
```

### Build production version

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

### Install dependencies

```bash
pnpm install
```

### Add a package

```bash
pnpm add <package>
```

Example:

```bash
pnpm add @ai-sdk/groq
```

### Start Convex

```bash
pnpm convex dev
```

### Run a Convex function

```bash
pnpm convex run <functionName>
```

Example:

```bash
pnpm convex run projects:getProject
```

---

# 🧑‍💻 Using Polaris

Once Polaris is running locally:

## 1. Sign in

Create an account or sign in using Clerk.

## 2. Create a project

Create a project from the project interface.

## 3. Open the project

Open the project to enter the workspace.

## 4. Browse files

Use the sidebar to navigate through project files.

## 5. Open a file

Click a file to open it inside the CodeMirror editor.

## 6. Use tabs

Files can be opened as preview tabs or pinned tabs.

## 7. Resize the workspace

Drag the divider between the sidebar and editor to resize the panels.

## 8. Use AI

Send a coding request through the AI interface.

The AI layer can route requests to the configured provider.

---

# 🔄 Application Data Flow

A typical project request looks like:

```text
User
 │
 ▼
Next.js Component
 │
 ▼
Custom React Hook
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
Updated State
 │
 ▼
React UI
```

For AI:

```text
User
 │
 ▼
AI UI
 │
 ▼
Server-side AI logic
 │
 ▼
AI SDK
 │
 ▼
Gemini
 │
 ├── success → response
 │
 └── failure → Groq
                  │
                  ▼
               response
```

---

# 🔒 Security

Polaris follows an important rule:

> **Never expose private API keys to the browser.**

Sensitive keys such as:

```text
GEMINI_API_KEY
GROQ_API_KEY
CLERK_SECRET_KEY
```

must remain server-side.

Never use:

```env
NEXT_PUBLIC_GEMINI_API_KEY=...
```

for private API credentials.

Only variables that are intentionally safe for browser exposure should use the `NEXT_PUBLIC_` prefix.

---

# 🧠 Design Philosophy

Polaris is built around a few principles.

### 1. Developer First

The interface should feel familiar to developers.

### 2. Modular Architecture

Features should remain separated and reusable.

```text
Projects
   │
   ├── Components
   ├── Hooks
   └── Data

Editor
   │
   ├── Components
   └── Extensions

AI
   │
   ├── Providers
   └── Router
```

### 3. Provider Independence

AI functionality should not depend completely on a single provider.

### 4. Type Safety

TypeScript is used throughout the application to reduce runtime errors and make refactoring safer.

### 5. Real-time Data

Convex provides a reactive backend architecture for keeping application data synchronized.

---

# 🗺️ Future Roadmap

Polaris is an evolving project.

Potential future improvements include:

* [ ] Advanced AI coding agent
* [ ] Multi-file AI edits
* [ ] AI-powered debugging
* [ ] AI autocomplete
* [ ] Terminal integration
* [ ] Git integration
* [ ] GitHub integration
* [ ] Real-time collaborative editing
* [ ] Project sharing
* [ ] More programming languages
* [ ] Better code intelligence
* [ ] File search
* [ ] Command palette
* [ ] Keyboard shortcuts
* [ ] AI provider routing
* [ ] Local AI support
* [ ] Ollama integration
* [ ] More AI providers
* [ ] Deployment integration

---

# 🤝 Contributing

Contributions, ideas, and feedback are welcome.

## Fork the repository

```bash
git fork
```

Or fork the project directly through GitHub.

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

Then open a Pull Request.

---

# 🐛 Reporting Issues

If you find a bug, please open an issue with:

1. A clear description
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Browser/OS information
6. Relevant error messages
7. Screenshots when useful

---

# 📜 License

Add your chosen license here.

For example:

```text
MIT License
```

If the project is not yet licensed, specify that clearly before publishing it publicly.

---

# 🌟 Why Polaris?

Polaris isn't just another code editor.

The idea is to create a development environment where:

```text
             CODE
              │
              ▼
          ┌───────┐
          │POLARIS│
          └───────┘
          ▲   ▲   ▲
          │   │   │
        FILES AI PROJECTS
```

Everything developers need to build software should feel like part of **one connected workspace**.

The project is being built around a simple vision:

> **Make software development more accessible, intelligent, and enjoyable by bringing code, projects, and AI together.**

---

# ⭐ Support the Project

If you find Polaris interesting or useful:

⭐ Star the repository
🐛 Report bugs
💡 Suggest features
🔧 Contribute improvements
📢 Share the project

Every contribution helps Polaris grow.

---

# ⚡ Quick Start

For experienced developers:

```bash
git clone https://github.com/YOUR_USERNAME/polaris.git

cd polaris

pnpm install

pnpm convex dev
```

In another terminal:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

Configure your `.env.local` first if authentication, Convex, or AI features require environment variables.

---

# 🚀 Polaris

**Code. Create. Explore.**

Built with modern web technologies and an AI-first mindset.
