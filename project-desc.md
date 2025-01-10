**README**

This project is a [Next.js](https://nextjs.org/) application integrated with [Convex](https://convex.dev) for real-time backend functionality. It includes a variety of features such as user authentication, workspace creation, channel management, and membership APIs. Below is a concise overview of the project's file tree and schema, alongside short explanations about each file's purpose.

---

## File Tree

```
/Users/build/Desktop/gauntlet-projects/chat4me
├── middleware.ts
├── bun.lockb
├── postcss.config.mjs
├── convex
│   ├── schema.ts
│   ├── workspaces.ts
│   ├── channels.ts
│   ├── auth.config.ts
│   ├── http.ts
│   ├── tsconfig.json
│   ├── members.ts
│   ├── users.ts
│   ├── auth.ts
│   └── _generated
│       ├── dataModel.d.ts
│       ├── api.d.ts
│       ├── server.d.ts
│       ├── server.js
│       └── api.js
├── README.md
├── tailwind.config.ts
├── public
│   ├── file.svg
│   ├── vercel.svg
│   ├── next.svg
│   ├── globe.svg
│   └── window.svg
├── package.json
├── components.json
├── tsconfig.json
├── sampleData.jsonl
├── eslint.config.mjs
├── next.config.ts
└── src
    ├── middleware.ts
    ├── app
    │   ├── favicon.ico
    │   ├── join
    │   │   └── [workspaceId]
    │   │       └── page.tsx
    │   ├── auth
    │   │   └── page.tsx
    │   ├── workspace
    │   │   └── [workspaceId]
    │   │       ├── workspace-sidebar.tsx
    │   │       ├── workspace-switcher.tsx
    │   │       ├── toolbar.tsx
    │   │       ├── preferences-modal.tsx
    │   │       ├── sidebar-item.tsx
    │   │       ├── sidebar-button.tsx
    │   │       ├── workspace-header.tsx
    │   │       ├── layout.tsx
    │   │       ├── workspace-section.tsx
    │   │       ├── user-item.tsx
    │   │       ├── sidebar.tsx
    │   │       ├── page.tsx
    │   │       └── invite-modal.tsx
    │   ├── features
    │   │   ├── auth
    │   │   │   ├── types.ts
    │   │   │   ├── components
    │   │   │   │   ├── sign-up-card.tsx
    │   │   │   │   ├── user-button.tsx
    │   │   │   │   ├── auth-screen.tsx
    │   │   │   │   └── sign-in-card.tsx
    │   │   │   └── api
    │   │   │       └── use-current-user.ts
    │   │   ├── workspaces
    │   │   │   ├── components
    │   │   │   │   └── create-workspace-modal.tsx
    │   │   │   ├── api
    │   │   │   │   ├── use-get-workspace-info.ts
    │   │   │   │   ├── use-create-workspace.ts
    │   │   │   │   ├── use-join.ts
    │   │   │   │   ├── use-get-workspace.ts
    │   │   │   │   ├── use-update-workspace.ts
    │   │   │   │   ├── use-new-join-code.ts
    │   │   │   │   ├── use-get-workspaces.ts
    │   │   │   │   └── use-remove-workspace.ts
    │   │   │   └── store
    │   │   │       └── use-create-workspace-modal.ts
    │   │   ├── members
    │   │   │   └── api
    │   │   │       ├── use-get-members.ts
    │   │   │       └── use-current-member.ts
    │   │   └── channels
    │   │       ├── components
    │   │       │   └── create-channel-modal.tsx
    │   │       ├── api
    │   │       │   ├── use-create-channel.ts
    │   │       │   └── use-get-channels.ts
    │   │       └── store
    │   │           └── use-create-channel-modal.ts
    │   ├── dashboard
    │   │   └── page.tsx
    │   ├── signin
    │   │   └── page.tsx
    │   ├── layout.tsx // layout for the workspace
    │   └── page.tsx
    ├── globals.css
    ├── components
    │   ├── modals.tsx
    │   ├── ui
    │   │   ├── alert-dialog.tsx
    │   │   ├── card.tsx
    │   │   ├── resizable.tsx
    │   │   ├── label.tsx
    │   │   ├── avatar.tsx
    │   │   ├── dialog.tsx
    │   │   ├── separator.tsx
    │   │   ├── button.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── input.tsx
    │   │   ├── skeleton.tsx
    │   │   └── form.tsx
    │   ├── jotai-provider.tsx
    │   └── ConvexClientProvider.tsx
    ├── hooks
    │   └── use-workspace-id.ts
    └── lib
        └── utils.ts
```

---

## Convex Database Schema (from `schema.ts`)

```ts
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";
 
const schema = defineSchema({
  ...authTables,
  workspaces: defineTable({
    name: v.string(),
    userId: v.id("users"),
    joinCode: v.string(),
  }),
  members: defineTable({
    workspaceId: v.id("workspaces"),
    userId: v.id("users"),
    role: v.union(v.literal("admin"), v.literal("member")),
  })
  .index("by_user_id", ["userId"])
  .index("by_workspace_id", ["workspaceId"])
  .index("by_workspace_id_and_user_id", ["workspaceId", "userId"]),
  channels: defineTable({
    workspaceId: v.id("workspaces"),
    name: v.string(),
    type: v.union(v.literal("public"), v.literal("private")),
  })
  .index("by_workspace_id", ["workspaceId"]),
});
 
export default schema;
```

---

## File Explanations (Brief)

Below is a short 1–2 sentence description of each major file. For more detail, see the inline code comments.

### **Root Files**

- **middleware.ts**  
  Next.js middleware handling user authentication checks via convexAuth. Redirects to `/signin` if not authenticated.
- **postcss.config.mjs**  
  PostCSS configuration enabling Tailwind CSS processing.
- **package.json**  
  Lists project dependencies and scripts (e.g., `dev`, `build`, `start`) for Next.js and Convex.
- **tsconfig.json**  
  TypeScript configuration for the Next.js app (excludes the `/convex/_generated` folder from build).
- **eslint.config.mjs**  
  ESLint configuration for code quality and Next.js recommended settings.
- **next.config.ts**  
  General Next.js configuration.
- **components.json**  
  Configuration file (used by `shadcn/ui`) specifying design tokens and aliases.
- **sampleData.jsonl**  
  Example JSON lines data file (for testing or initial seeding).
- **tailwind.config.ts**  
  TailwindCSS configuration, specifying custom color tokens, etc.

### **Convex Folder**

- **schema.ts**  
  Defines the Convex data schema (see above). Handles tables for workspaces, members, and channels.
- **auth.config.ts**  
  Configures authentication providers for Convex (GitHub, Google, Password).
- **auth.ts**  
  Helper functions for sign-in, sign-out, and user authentication logic on the Convex side.
- **workspaces.ts, channels.ts, members.ts, users.ts**  
  Each file holds queries and mutations for managing respective data (workspaces, channels, members, users).
- **http.ts**  
  Defines HTTP endpoints in combination with Convex, primarily used for auth routes.
- **tsconfig.json**  
  TypeScript configuration dedicated to Convex functions.
- **_generated** (folder)  
  Auto-generated files by Convex: includes type definitions (`dataModel.d.ts`, `api.d.ts`, `server.d.ts`) and the runtime files (`server.js`, `api.js`) for server interactions.

### **Public Folder**

- **file.svg, vercel.svg, next.svg, globe.svg, window.svg**  
  Static images used across the application (logos or icons).

### **src/app**

- **layout.tsx**  
  Root layout component for the Next.js App Router. Wraps the entire application in providers (e.g., ConvexAuthNextjsServerProvider).
- **page.tsx**  
  The homepage that checks for existing workspaces; if none, prompts workspace creation.  
- **signin/page.tsx**  
  A sign-in page that imports a custom AuthScreen.  
- **dashboard/page.tsx**  
  Simple "Dashboard" route as an example of protected content.

#### **src/app/join/[workspaceId]/page.tsx**  
Page for joining an existing workspace by entering a join code.

#### **src/app/auth/page.tsx**  
Renders the AuthScreen (sign in/sign up flow).

#### **src/app/workspace/[workspaceId]**  
- **layout.tsx**  
  Wraps the workspace sub-routes, includes a toolbar and sidebars.
- **page.tsx**  
  Default workspace landing page (e.g., showing channel list, etc.).
- **sidebar.tsx, workspace-sidebar.tsx, workspace-switcher.tsx**  
  Components controlling sidebar UI and switching between multiple workspaces.
- **toolbar.tsx**  
  Top bar inside the workspace layout (search bar, info button, etc.).
- **preferences-modal.tsx**  
  Modal for renaming or deleting a workspace (admin-only).
- **sidebar-item.tsx, sidebar-button.tsx**  
  Reusable UI items for listing channels, direct messages, or actions in the sidebar.
- **workspace-header.tsx, workspace-section.tsx, user-item.tsx**  
  Various components to display workspace details, sections (channels/DMs), and user items.
- **invite-modal.tsx**  
  Modal that displays a workspace join code, link copying, and a button to generate a new code.

### **src/app/features**  
Organized by domain feature:

- **auth**  
  - **api/use-current-user.ts**: React hook to fetch current user from Convex.  
  - **components** (sign-in, sign-up, user button, main AuthScreen).  
  - **types.ts**: Small type definitions for sign-in flow (e.g., "signIn" | "signUp").
- **workspaces**  
  - **api**: Hooks for workspace-related queries/mutations (e.g., create, join, remove, update).  
  - **components**: e.g., `create-workspace-modal.tsx` for the workspace creation flow.  
  - **store**: Example of Jotai atoms for controlling UI states like the workspace creation modal.
- **members**  
  - **api**: Hooks for fetching workspace members and the current member’s role.
- **channels**  
  - **api**: Hooks to create/fetch channels in a workspace.  
  - **components**: e.g., `create-channel-modal.tsx`.

### **src/components**  
- **modals.tsx**  
  Central place to mount all global modals (workspace creation, channel creation).
- **jotai-provider.tsx**  
  Jotai context provider for global state management.
- **ConvexClientProvider.tsx**  
  Provides the Convex React client + authentication context to the Next.js frontend.
- **ui/** (folder)  
  Shared UI components (buttons, cards, dialogs, inputs, etc.) built on top of Radix UI primitives and Tailwind classes.

### **src/hooks**  
- **use-workspace-id.ts**  
  Grabs the `[workspaceId]` from the Next.js dynamic route (`/workspace/[workspaceId]`).

### **src/lib**  
- **utils.ts**  
  Contains utility functions, including a `cn` (class-names) helper with `tailwind-merge`.

---

**Thank you for checking out `chat4me`!**  

- This repository illustrates how to integrate Next.js (App Router) with the Convex backend.  
- For local development, run `npm install` (or your preferred package manager) and then `npm run dev`.  
- You’ll need valid environment variables for Convex (`NEXT_PUBLIC_CONVEX_URL`) and any OAuth providers (GitHub, Google) in a `.env` or your deployment environment.  
- Enjoy exploring the code, and refer to the inline comments for more detailed explanations of each feature!