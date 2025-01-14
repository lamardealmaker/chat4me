```
Project Structure:
├── README.md
├── Users
├── bun.lockb
├── codefetch
│   └── my-complete-source.md
├── components.json
├── convex
│   ├── ai.ts
│   ├── auth.config.ts
│   ├── auth.ts
│   ├── channels.ts
│   ├── embeddings.ts
│   ├── http.ts
│   ├── members.ts
│   ├── messages.ts
│   ├── presence.ts
│   ├── schema.ts
│   ├── tsconfig.json
│   ├── users.ts
│   └── workspaces.ts
├── eslint.config.mjs
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── project-desc.md
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── sampleData.jsonl
├── src
│   └── middleware.ts
├── tailwind.config.ts
└── tsconfig.json
```

components.json
```
1 | {
2 |   "$schema": "https://ui.shadcn.com/schema.json",
3 |   "style": "new-york",
4 |   "rsc": true,
5 |   "tsx": true,
6 |   "tailwind": {
7 |     "config": "tailwind.config.ts",
8 |     "css": "src/app/globals.css",
9 |     "baseColor": "zinc",
10 |     "cssVariables": true,
11 |     "prefix": ""
12 |   },
13 |   "aliases": {
14 |     "components": "@/components",
15 |     "utils": "@/lib/utils",
16 |     "ui": "@/components/ui",
17 |     "lib": "@/lib",
18 |     "hooks": "@/hooks"
19 |   },
20 |   "iconLibrary": "lucide"
21 | }
```

convex/_generated/api.d.ts
```
1 | /* eslint-disable */
2 | /**
3 |  * Generated `api` utility.
4 |  *
5 |  * THIS CODE IS AUTOMATICALLY GENERATED.
6 |  *
7 |  * To regenerate, run `npx convex dev`.
8 |  * @module
9 |  */
10 | 
11 | import type {
12 |   ApiFromModules,
13 |   FilterApi,
14 |   FunctionReference,
15 | } from "convex/server";
16 | import type * as ai from "../ai.js";
17 | import type * as auth from "../auth.js";
18 | import type * as channels from "../channels.js";
19 | import type * as embeddings from "../embeddings.js";
20 | import type * as http from "../http.js";
21 | import type * as members from "../members.js";
22 | import type * as messages from "../messages.js";
23 | import type * as presence from "../presence.js";
24 | import type * as users from "../users.js";
25 | import type * as workspaces from "../workspaces.js";
26 | 
27 | /**
28 |  * A utility for referencing Convex functions in your app's API.
29 |  *
30 |  * Usage:
31 |  * ```js
32 |  * const myFunctionReference = api.myModule.myFunction;
33 |  * ```
34 |  */
35 | declare const fullApi: ApiFromModules<{
36 |   ai: typeof ai;
37 |   auth: typeof auth;
38 |   channels: typeof channels;
39 |   embeddings: typeof embeddings;
40 |   http: typeof http;
41 |   members: typeof members;
42 |   messages: typeof messages;
43 |   presence: typeof presence;
44 |   users: typeof users;
45 |   workspaces: typeof workspaces;
46 | }>;
47 | export declare const api: FilterApi<
48 |   typeof fullApi,
49 |   FunctionReference<any, "public">
50 | >;
51 | export declare const internal: FilterApi<
52 |   typeof fullApi,
53 |   FunctionReference<any, "internal">
54 | >;
```

convex/_generated/api.js
```
1 | /* eslint-disable */
2 | /**
3 |  * Generated `api` utility.
4 |  *
5 |  * THIS CODE IS AUTOMATICALLY GENERATED.
6 |  *
7 |  * To regenerate, run `npx convex dev`.
8 |  * @module
9 |  */
10 | 
11 | import { anyApi } from "convex/server";
12 | 
13 | /**
14 |  * A utility for referencing Convex functions in your app's API.
15 |  *
16 |  * Usage:
17 |  * ```js
18 |  * const myFunctionReference = api.myModule.myFunction;
19 |  * ```
20 |  */
21 | export const api = anyApi;
22 | export const internal = anyApi;
```

convex/_generated/dataModel.d.ts
```
1 | /* eslint-disable */
2 | /**
3 |  * Generated data model types.
4 |  *
5 |  * THIS CODE IS AUTOMATICALLY GENERATED.
6 |  *
7 |  * To regenerate, run `npx convex dev`.
8 |  * @module
9 |  */
10 | 
11 | import type {
12 |   DataModelFromSchemaDefinition,
13 |   DocumentByName,
14 |   TableNamesInDataModel,
15 |   SystemTableNames,
16 | } from "convex/server";
17 | import type { GenericId } from "convex/values";
18 | import schema from "../schema.js";
19 | 
20 | /**
21 |  * The names of all of your Convex tables.
22 |  */
23 | export type TableNames = TableNamesInDataModel<DataModel>;
24 | 
25 | /**
26 |  * The type of a document stored in Convex.
27 |  *
28 |  * @typeParam TableName - A string literal type of the table name (like "users").
29 |  */
30 | export type Doc<TableName extends TableNames> = DocumentByName<
31 |   DataModel,
32 |   TableName
33 | >;
34 | 
35 | /**
36 |  * An identifier for a document in Convex.
37 |  *
38 |  * Convex documents are uniquely identified by their `Id`, which is accessible
39 |  * on the `_id` field. To learn more, see [Document IDs](https://docs.convex.dev/using/document-ids).
40 |  *
41 |  * Documents can be loaded using `db.get(id)` in query and mutation functions.
42 |  *
43 |  * IDs are just strings at runtime, but this type can be used to distinguish them from other
44 |  * strings when type checking.
45 |  *
46 |  * @typeParam TableName - A string literal type of the table name (like "users").
47 |  */
48 | export type Id<TableName extends TableNames | SystemTableNames> =
49 |   GenericId<TableName>;
50 | 
51 | /**
52 |  * A type describing your Convex data model.
53 |  *
54 |  * This type includes information about what tables you have, the type of
55 |  * documents stored in those tables, and the indexes defined on them.
56 |  *
57 |  * This type is used to parameterize methods like `queryGeneric` and
58 |  * `mutationGeneric` to make them type-safe.
59 |  */
60 | export type DataModel = DataModelFromSchemaDefinition<typeof schema>;
```

convex/_generated/server.d.ts
```
1 | /* eslint-disable */
2 | /**
3 |  * Generated utilities for implementing server-side Convex query and mutation functions.
4 |  *
5 |  * THIS CODE IS AUTOMATICALLY GENERATED.
6 |  *
7 |  * To regenerate, run `npx convex dev`.
8 |  * @module
9 |  */
10 | 
11 | import {
12 |   ActionBuilder,
13 |   HttpActionBuilder,
14 |   MutationBuilder,
15 |   QueryBuilder,
16 |   GenericActionCtx,
17 |   GenericMutationCtx,
18 |   GenericQueryCtx,
19 |   GenericDatabaseReader,
20 |   GenericDatabaseWriter,
21 | } from "convex/server";
22 | import type { DataModel } from "./dataModel.js";
23 | 
24 | /**
25 |  * Define a query in this Convex app's public API.
26 |  *
27 |  * This function will be allowed to read your Convex database and will be accessible from the client.
28 |  *
29 |  * @param func - The query function. It receives a {@link QueryCtx} as its first argument.
30 |  * @returns The wrapped query. Include this as an `export` to name it and make it accessible.
31 |  */
32 | export declare const query: QueryBuilder<DataModel, "public">;
33 | 
34 | /**
35 |  * Define a query that is only accessible from other Convex functions (but not from the client).
36 |  *
37 |  * This function will be allowed to read from your Convex database. It will not be accessible from the client.
38 |  *
39 |  * @param func - The query function. It receives a {@link QueryCtx} as its first argument.
40 |  * @returns The wrapped query. Include this as an `export` to name it and make it accessible.
41 |  */
42 | export declare const internalQuery: QueryBuilder<DataModel, "internal">;
43 | 
44 | /**
45 |  * Define a mutation in this Convex app's public API.
46 |  *
47 |  * This function will be allowed to modify your Convex database and will be accessible from the client.
48 |  *
49 |  * @param func - The mutation function. It receives a {@link MutationCtx} as its first argument.
50 |  * @returns The wrapped mutation. Include this as an `export` to name it and make it accessible.
51 |  */
52 | export declare const mutation: MutationBuilder<DataModel, "public">;
53 | 
54 | /**
55 |  * Define a mutation that is only accessible from other Convex functions (but not from the client).
56 |  *
57 |  * This function will be allowed to modify your Convex database. It will not be accessible from the client.
58 |  *
59 |  * @param func - The mutation function. It receives a {@link MutationCtx} as its first argument.
60 |  * @returns The wrapped mutation. Include this as an `export` to name it and make it accessible.
61 |  */
62 | export declare const internalMutation: MutationBuilder<DataModel, "internal">;
63 | 
64 | /**
65 |  * Define an action in this Convex app's public API.
66 |  *
67 |  * An action is a function which can execute any JavaScript code, including non-deterministic
68 |  * code and code with side-effects, like calling third-party services.
69 |  * They can be run in Convex's JavaScript environment or in Node.js using the "use node" directive.
70 |  * They can interact with the database indirectly by calling queries and mutations using the {@link ActionCtx}.
71 |  *
72 |  * @param func - The action. It receives an {@link ActionCtx} as its first argument.
73 |  * @returns The wrapped action. Include this as an `export` to name it and make it accessible.
74 |  */
75 | export declare const action: ActionBuilder<DataModel, "public">;
76 | 
77 | /**
78 |  * Define an action that is only accessible from other Convex functions (but not from the client).
79 |  *
80 |  * @param func - The function. It receives an {@link ActionCtx} as its first argument.
81 |  * @returns The wrapped function. Include this as an `export` to name it and make it accessible.
82 |  */
83 | export declare const internalAction: ActionBuilder<DataModel, "internal">;
84 | 
85 | /**
86 |  * Define an HTTP action.
87 |  *
88 |  * This function will be used to respond to HTTP requests received by a Convex
89 |  * deployment if the requests matches the path and method where this action
90 |  * is routed. Be sure to route your action in `convex/http.js`.
91 |  *
92 |  * @param func - The function. It receives an {@link ActionCtx} as its first argument.
93 |  * @returns The wrapped function. Import this function from `convex/http.js` and route it to hook it up.
94 |  */
95 | export declare const httpAction: HttpActionBuilder;
96 | 
97 | /**
98 |  * A set of services for use within Convex query functions.
99 |  *
100 |  * The query context is passed as the first argument to any Convex query
101 |  * function run on the server.
102 |  *
103 |  * This differs from the {@link MutationCtx} because all of the services are
104 |  * read-only.
105 |  */
106 | export type QueryCtx = GenericQueryCtx<DataModel>;
107 | 
108 | /**
109 |  * A set of services for use within Convex mutation functions.
110 |  *
111 |  * The mutation context is passed as the first argument to any Convex mutation
112 |  * function run on the server.
113 |  */
114 | export type MutationCtx = GenericMutationCtx<DataModel>;
115 | 
116 | /**
117 |  * A set of services for use within Convex action functions.
118 |  *
119 |  * The action context is passed as the first argument to any Convex action
120 |  * function run on the server.
121 |  */
122 | export type ActionCtx = GenericActionCtx<DataModel>;
123 | 
124 | /**
125 |  * An interface to read from the database within Convex query functions.
126 |  *
127 |  * The two entry points are {@link DatabaseReader.get}, which fetches a single
128 |  * document by its {@link Id}, or {@link DatabaseReader.query}, which starts
129 |  * building a query.
130 |  */
131 | export type DatabaseReader = GenericDatabaseReader<DataModel>;
132 | 
133 | /**
134 |  * An interface to read from and write to the database within Convex mutation
135 |  * functions.
136 |  *
137 |  * Convex guarantees that all writes within a single mutation are
138 |  * executed atomically, so you never have to worry about partial writes leaving
139 |  * your data in an inconsistent state. See [the Convex Guide](https://docs.convex.dev/understanding/convex-fundamentals/functions#atomicity-and-optimistic-concurrency-control)
140 |  * for the guarantees Convex provides your functions.
141 |  */
142 | export type DatabaseWriter = GenericDatabaseWriter<DataModel>;
```

convex/_generated/server.js
```
1 | /* eslint-disable */
2 | /**
3 |  * Generated utilities for implementing server-side Convex query and mutation functions.
4 |  *
5 |  * THIS CODE IS AUTOMATICALLY GENERATED.
6 |  *
7 |  * To regenerate, run `npx convex dev`.
8 |  * @module
9 |  */
10 | 
11 | import {
12 |   actionGeneric,
13 |   httpActionGeneric,
14 |   queryGeneric,
15 |   mutationGeneric,
16 |   internalActionGeneric,
17 |   internalMutationGeneric,
18 |   internalQueryGeneric,
19 | } from "convex/server";
20 | 
21 | /**
22 |  * Define a query in this Convex app's public API.
23 |  *
24 |  * This function will be allowed to read your Convex database and will be accessible from the client.
25 |  *
26 |  * @param func - The query function. It receives a {@link QueryCtx} as its first argument.
27 |  * @returns The wrapped query. Include this as an `export` to name it and make it accessible.
28 |  */
29 | export const query = queryGeneric;
30 | 
31 | /**
32 |  * Define a query that is only accessible from other Convex functions (but not from the client).
33 |  *
34 |  * This function will be allowed to read from your Convex database. It will not be accessible from the client.
35 |  *
36 |  * @param func - The query function. It receives a {@link QueryCtx} as its first argument.
37 |  * @returns The wrapped query. Include this as an `export` to name it and make it accessible.
38 |  */
39 | export const internalQuery = internalQueryGeneric;
40 | 
41 | /**
42 |  * Define a mutation in this Convex app's public API.
43 |  *
44 |  * This function will be allowed to modify your Convex database and will be accessible from the client.
45 |  *
46 |  * @param func - The mutation function. It receives a {@link MutationCtx} as its first argument.
47 |  * @returns The wrapped mutation. Include this as an `export` to name it and make it accessible.
48 |  */
49 | export const mutation = mutationGeneric;
50 | 
51 | /**
52 |  * Define a mutation that is only accessible from other Convex functions (but not from the client).
53 |  *
54 |  * This function will be allowed to modify your Convex database. It will not be accessible from the client.
55 |  *
56 |  * @param func - The mutation function. It receives a {@link MutationCtx} as its first argument.
57 |  * @returns The wrapped mutation. Include this as an `export` to name it and make it accessible.
58 |  */
59 | export const internalMutation = internalMutationGeneric;
60 | 
61 | /**
62 |  * Define an action in this Convex app's public API.
63 |  *
64 |  * An action is a function which can execute any JavaScript code, including non-deterministic
65 |  * code and code with side-effects, like calling third-party services.
66 |  * They can be run in Convex's JavaScript environment or in Node.js using the "use node" directive.
67 |  * They can interact with the database indirectly by calling queries and mutations using the {@link ActionCtx}.
68 |  *
69 |  * @param func - The action. It receives an {@link ActionCtx} as its first argument.
70 |  * @returns The wrapped action. Include this as an `export` to name it and make it accessible.
71 |  */
72 | export const action = actionGeneric;
73 | 
74 | /**
75 |  * Define an action that is only accessible from other Convex functions (but not from the client).
76 |  *
77 |  * @param func - The function. It receives an {@link ActionCtx} as its first argument.
78 |  * @returns The wrapped function. Include this as an `export` to name it and make it accessible.
79 |  */
80 | export const internalAction = internalActionGeneric;
81 | 
82 | /**
83 |  * Define a Convex HTTP action.
84 |  *
85 |  * @param func - The function. It receives an {@link ActionCtx} as its first argument, and a `Request` object
86 |  * as its second.
87 |  * @returns The wrapped endpoint function. Route a URL path to this function in `convex/http.js`.
88 |  */
89 | export const httpAction = httpActionGeneric;
```

convex/ai.ts
```
1 | import { v } from "convex/values";
2 | import { action, internalMutation, internalQuery, mutation, QueryCtx } from "./_generated/server";
3 | import { api, internal } from "./_generated/api";
4 | import { Doc, Id } from "./_generated/dataModel";
5 | import { GenericActionCtx } from "convex/server";
6 | 
7 | // Queue an AI response task
8 | export const queueResponse = mutation({
9 |   args: {
10 |     channelId: v.id("channels"),
11 |     userId: v.id("users"),
12 |     messageId: v.id("messages"),
13 |   },
14 |   handler: async (ctx, { channelId, userId, messageId }) => {
15 |     return await ctx.db.insert("aiTasks", {
16 |       channelId,
17 |       userId,
18 |       messageId,
19 |       status: "pending",
20 |       createdAt: Date.now(),
21 |     });
22 |   },
23 | });
24 | 
25 | // Process pending AI tasks
26 | export const processPendingTasks = action({
27 |   args: {},
28 |   handler: async (ctx) => {
29 |     // Get pending tasks
30 |     const tasks = await ctx.runQuery(internal.ai.getPendingTasks, {});
31 |     
32 |     for (const task of tasks) {
33 |       try {
34 |         // Mark as processing
35 |         await ctx.runMutation(internal.ai.updateTaskStatus, {
36 |           taskId: task._id,
37 |           status: "processing",
38 |         });
39 | 
40 |         // Get the message to respond to
41 |         const message = await ctx.runQuery(api.messages.getById, {
42 |           messageId: task.messageId,
43 |         });
44 |         if (!message) continue;
45 | 
46 |         // Get similar messages for context
47 |         const similarMessages = await ctx.runAction(api.embeddings.findSimilarMessages, {
48 |           text: message.text,
49 |           limit: 5,
50 |         });
51 | 
52 |         // Generate AI response based on context
53 |         const response = await generateAIResponse(ctx, message, similarMessages);
54 | 
55 |         // Send the response as the offline user, but marked as AI
56 |         await ctx.runMutation(api.messages.send, {
57 |           channelId: task.channelId,
58 |           text: response,
59 |           parentMessageId: message.parentMessageId,
60 |           isAI: true,
61 |           userId: task.userId, // Send as the offline user
62 |         });
63 | 
64 |         // Mark as completed
65 |         await ctx.runMutation(internal.ai.updateTaskStatus, {
66 |           taskId: task._id,
67 |           status: "completed",
68 |           completedAt: Date.now(),
69 |         });
70 |       } catch (error: any) {
71 |         // Mark as failed
72 |         await ctx.runMutation(internal.ai.updateTaskStatus, {
73 |           taskId: task._id,
74 |           status: "failed",
75 |           error: error.message,
76 |         });
77 |       }
78 |     }
79 |   },
80 | });
81 | 
82 | // Get pending AI tasks
83 | export const getPendingTasks = internalQuery({
84 |   args: {},
85 |   handler: async (ctx) => {
86 |     return await ctx.db
87 |       .query("aiTasks")
88 |       .withIndex("by_status", (q) => q.eq("status", "pending"))
89 |       .collect();
90 |   },
91 | });
92 | 
93 | // Update AI task status
94 | export const updateTaskStatus = internalMutation({
95 |   args: {
96 |     taskId: v.id("aiTasks"),
97 |     status: v.union(
98 |       v.literal("pending"),
99 |       v.literal("processing"),
100 |       v.literal("completed"),
101 |       v.literal("failed")
102 |     ),
103 |     completedAt: v.optional(v.number()),
104 |     error: v.optional(v.string()),
105 |   },
106 |   handler: async (ctx, { taskId, status, completedAt, error }) => {
107 |     await ctx.db.patch(taskId, {
108 |       status,
109 |       ...(completedAt && { completedAt }),
110 |       ...(error && { error }),
111 |     });
112 |   },
113 | });
114 | 
115 | // Helper function to get recent messages
116 | export const getRecentMessages = internalQuery({
117 |   args: { userId: v.id("users") },
118 |   handler: async (ctx, { userId }) => {
119 |     const messages = await ctx.db
120 |       .query("messages")
121 |       .withIndex("by_user_id", (q) => q.eq("userId", userId))
122 |       .order("desc")
123 |       .take(25);
124 |     return messages;
125 |   },
126 | });
127 | 
128 | // Helper function to generate AI response
129 | async function generateAIResponse(
130 |   ctx: GenericActionCtx<any>,
131 |   message: Doc<"messages">,
132 |   similarMessages: Array<Doc<"messages"> & { userName: string }>
133 | ): Promise<string> {
134 |   const apiKey = process.env.OPENAI_API_KEY;
135 |   if (!apiKey) {
136 |     throw new Error("OPENAI_API_KEY environment variable not set");
137 |   }
138 | 
139 |   // Get user's recent messages for style matching
140 |   const recentMessages = await ctx.runQuery(internal.ai.getRecentMessages, {
141 |     userId: message.userId,
142 |   });
143 | 
144 |   // Build the prompt
145 |   const prompt = `Please respond to this message: "${message.text}"
146 | 
147 | Here is context of possible answers:
148 | ${similarMessages.map(m => `- ${m.text}`).join('\n')}
149 | 
150 | Here is the user's writing style and tone (examples from their 25 latest messages):
151 | ${recentMessages.map((m: Doc<"messages">) => `- ${m.text}`).join('\n')}
152 | 
153 | Output answer using the user's style. The user is offline right now.`;
154 | 
155 |   // Call OpenAI for response
156 |   const response = await fetch("https://api.openai.com/v1/chat/completions", {
157 |     method: "POST",
158 |     headers: {
159 |       "Content-Type": "application/json",
160 |       Authorization: `Bearer ${apiKey}`,
161 |     },
162 |     body: JSON.stringify({
163 |       model: "gpt-4",
164 |       messages: [
165 |         {
166 |           role: "system",
167 |           content: "You are an AI assistant responding on behalf of a user who is currently offline. Match their writing style and tone while providing helpful responses.",
168 |         },
169 |         {
170 |           role: "user",
171 |           content: prompt,
172 |         },
173 |       ],
174 |       temperature: 0.7,
175 |     }),
176 |   });
177 | 
178 |   if (!response.ok) {
179 |     throw new Error(`OpenAI API error: ${response.statusText}`);
180 |   }
181 | 
182 |   const result = await response.json();
183 |   return result.choices[0].message.content;
184 | } 
```

convex/auth.config.ts
```
1 | export default {
2 |   providers: [
3 |     {
4 |       domain: process.env.CONVEX_SITE_URL,
5 |       applicationID: "convex",
6 |     },
7 |   ],
8 | };
```

convex/auth.ts
```
1 | import Github from "@auth/core/providers/github";
2 | import Google from "@auth/core/providers/google";
3 | import { Password } from "@convex-dev/auth/providers/Password";
4 | import { convexAuth } from "@convex-dev/auth/server";
5 | 
6 | const CustomPassword = Password({
7 |   profile(params) {
8 |     return {
9 |       email: params.email as string,
10 |       name: params.name as string,
11 |     };
12 |   },
13 | });
14 | 
15 | export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
16 |   providers: [Github, Google, CustomPassword],
17 | });
```

convex/channels.ts
```
1 | import { v } from "convex/values";
2 | import { auth } from "./auth";
3 | import { mutation, query } from "./_generated/server";
4 | import { Doc, Id } from "./_generated/dataModel";
5 | 
6 | export const create = mutation({
7 |   args: {
8 |     workspaceId: v.id("workspaces"),
9 |     name: v.string(),
10 |   },
11 |   handler: async (ctx, args) => {
12 |     const userId = await auth.getUserId(ctx);
13 |     if (!userId) {
14 |       throw new Error("Unauthorized");
15 |     }
16 | 
17 |     const member = await ctx.db
18 |       .query("members")
19 |       .withIndex("by_workspace_id_and_user_id", (q) =>
20 |         q.eq("workspaceId", args.workspaceId).eq("userId", userId)
21 |       )
22 |       .unique();
23 | 
24 |     if (!member) {
25 |       throw new Error("Unauthorized");
26 |     }
27 | 
28 |     if (member.role !== "admin") {
29 |       throw new Error("Unauthorized");
30 |     }
31 |     const parsedName = args.name.replace(/\s+/g, '-').toLowerCase();
32 | 
33 |     const channelId = await ctx.db.insert("channels", {
34 |       workspaceId: args.workspaceId,
35 |       name: parsedName,
36 |       type: "public",
37 |       userIds: [],
38 |     });
39 | 
40 |     return channelId;
41 |   },
42 | });
43 | 
44 | export const createDM = mutation({
45 |   args: {
46 |     workspaceId: v.id("workspaces"),
47 |     otherUserId: v.id("users"),
48 |   },
49 |   async handler(ctx, args) {
50 |     const userId = await auth.getUserId(ctx);
51 |     if (!userId) throw new Error("Unauthorized");
52 | 
53 |     // Get both users' info
54 |     const [currentUser, otherUser] = await Promise.all([
55 |       ctx.db.get(userId),
56 |       ctx.db.get(args.otherUserId)
57 |     ]);
58 |     if (!currentUser || !otherUser) throw new Error("User not found");
59 | 
60 |     // Check if DM channel already exists
61 |     const existingChannel = await ctx.db
62 |       .query("channels")
63 |       .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
64 |       .filter((q) => 
65 |         q.and(
66 |           q.eq(q.field("type"), "dm"),
67 |           q.eq(q.field("userIds"), [userId, args.otherUserId].sort())
68 |         )
69 |       )
70 |       .first();
71 | 
72 |     if (existingChannel) {
73 |       // Update name if it was empty
74 |       if (!existingChannel.name) {
75 |         await ctx.db.patch(existingChannel._id, {
76 |           name: otherUser.name || "Unknown User"
77 |         });
78 |       }
79 |       return existingChannel._id;
80 |     }
81 | 
82 |     // Create new DM channel
83 |     const channelId = await ctx.db.insert("channels", {
84 |       workspaceId: args.workspaceId,
85 |       name: otherUser.name || "Unknown User",
86 |       type: "dm",
87 |       userIds: [userId, args.otherUserId].sort(),
88 |     });
89 | 
90 |     return channelId;
91 |   },
92 | });
93 | 
94 | export const get = query({
95 |   args: {
96 |     workspaceId: v.id("workspaces"),
97 |   },
98 |   handler: async (ctx, args) => {
99 |     const userId = await auth.getUserId(ctx);
100 |     if (!userId) {
101 |       return [];
102 |     }
103 | 
104 |     // Retrieve the member entry
105 |     const member = await ctx.db
106 |       .query("members")
107 |       .withIndex("by_workspace_id_and_user_id", (q) =>
108 |         q.eq("workspaceId", args.workspaceId).eq("userId", userId)
109 |       )
110 |       .unique();
111 | 
112 |     if (!member) {
113 |       return [];
114 |     }
115 | 
116 |     // Fetch all channels for that workspace
117 |     const channels = await ctx.db
118 |       .query("channels")
119 |       .withIndex("by_workspace_id", (q) =>
120 |         q.eq("workspaceId", args.workspaceId)
121 |       )
122 |       .collect();
123 | 
124 |     // Debug log
125 |     console.log("All channels:", channels);
126 |     console.log("Current userId:", userId);
127 | 
128 |     // Filter DM channels to only include ones where user is a participant
129 |     const filteredChannels = channels.filter(channel => {
130 |       if (channel.type === "dm") {
131 |         console.log("DM channel:", channel);
132 |         console.log("Has userIds:", !!channel.userIds);
133 |         console.log("Includes user:", channel.userIds?.includes(userId));
134 |       }
135 |       return channel.type !== "dm" || 
136 |         (channel.userIds && channel.userIds.includes(userId));
137 |     });
138 | 
139 |     return filteredChannels;
140 |   },
141 | });
142 | 
143 | export const cleanupDuplicateDMs = mutation({
144 |   args: {
145 |     workspaceId: v.id("workspaces"),
146 |   },
147 |   async handler(ctx, args) {
148 |     const userId = await auth.getUserId(ctx);
149 |     if (!userId) throw new Error("Unauthorized");
150 | 
151 |     // Get all DM channels for this workspace
152 |     const channels = await ctx.db
153 |       .query("channels")
154 |       .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
155 |       .filter((q) => q.eq(q.field("type"), "dm"))
156 |       .collect();
157 | 
158 |     // Group channels by their userIds
159 |     const channelGroups = new Map<string, Doc<"channels">[]>();
160 |     channels.forEach(channel => {
161 |       if (!channel.userIds) return;
162 |       const key = channel.userIds.sort().join(',');
163 |       if (!channelGroups.has(key)) {
164 |         channelGroups.set(key, []);
165 |       }
166 |       channelGroups.get(key)?.push(channel);
167 |     });
168 | 
169 |     // For each group of duplicate channels, keep the newest one
170 |     for (const [_, duplicates] of channelGroups) {
171 |       if (duplicates.length <= 1) continue;
172 |       
173 |       // Sort by creation time, newest first
174 |       duplicates.sort((a: Doc<"channels">, b: Doc<"channels">) => b._creationTime - a._creationTime);
175 |       
176 |       // Keep the first one (newest), delete the rest
177 |       const [keep, ...remove] = duplicates;
178 |       
179 |       // Update the kept channel if it has an empty name
180 |       if (!keep.name) {
181 |         const otherUserId = keep.userIds?.find((id: Id<"users">) => id !== userId);
182 |         if (otherUserId) {
183 |           const otherUser = await ctx.db.get(otherUserId);
184 |           if (otherUser?.name) {
185 |             await ctx.db.patch(keep._id, { name: otherUser.name });
186 |           }
187 |         }
188 |       }
189 |       
190 |       // Delete the duplicates
191 |       for (const channel of remove) {
192 |         await ctx.db.delete(channel._id);
193 |       }
194 |     }
195 |   },
196 | });
```

convex/embeddings.ts
```
1 | import { v } from "convex/values";
2 | import { action, mutation, query } from "./_generated/server";
3 | import { api } from "./_generated/api";
4 | import { Doc, Id } from "./_generated/dataModel";
5 | 
6 | // OpenAI API for generating embeddings
7 | const OPENAI_API_URL = "https://api.openai.com/v1/embeddings";
8 | const EMBEDDING_MODEL = "text-embedding-ada-002";
9 | 
10 | type MessageWithUser = Doc<"messages"> & { userName: string };
11 | type SearchResult = { _id: Id<"messageEmbeddings">; _score: number };
12 | 
13 | // Action to generate embedding from OpenAI
14 | export const generateEmbedding = action({
15 |   args: { 
16 |     messageId: v.id("messages"),
17 |     text: v.string(),
18 |   },
19 |   handler: async (ctx, { messageId, text }) => {
20 |     const apiKey = process.env.OPENAI_API_KEY;
21 |     if (!apiKey) {
22 |       throw new Error("OPENAI_API_KEY environment variable not set");
23 |     }
24 | 
25 |     const response = await fetch(OPENAI_API_URL, {
26 |       method: "POST",
27 |       headers: {
28 |         "Content-Type": "application/json",
29 |         Authorization: `Bearer ${apiKey}`,
30 |       },
31 |       body: JSON.stringify({
32 |         input: text,
33 |         model: EMBEDDING_MODEL,
34 |       }),
35 |     });
36 | 
37 |     if (!response.ok) {
38 |       throw new Error(`OpenAI API error: ${response.statusText}`);
39 |     }
40 | 
41 |     const result = await response.json();
42 |     const embedding = result.data[0].embedding;
43 | 
44 |     // Store the embedding using a mutation
45 |     await ctx.runMutation(api.embeddings.storeEmbedding, {
46 |       messageId,
47 |       vector: embedding,
48 |     });
49 | 
50 |     return embedding;
51 |   },
52 | });
53 | 
54 | // Mutation to store embedding in the database
55 | export const storeEmbedding = mutation({
56 |   args: {
57 |     messageId: v.id("messages"),
58 |     vector: v.array(v.number()),
59 |   },
60 |   handler: async (ctx, { messageId, vector }) => {
61 |     return await ctx.db.insert("messageEmbeddings", {
62 |       messageId,
63 |       vector,
64 |       createdAt: Date.now(),
65 |     });
66 |   },
67 | });
68 | 
69 | // Query to fetch messages from search results
70 | export const fetchSearchResults = query({
71 |   args: {
72 |     results: v.array(v.object({
73 |       _id: v.id("messageEmbeddings"),
74 |       _score: v.number(),
75 |     })),
76 |   },
77 |   handler: async (ctx, { results }): Promise<MessageWithUser[]> => {
78 |     const messages: MessageWithUser[] = [];
79 |     
80 |     for (const { _id } of results) {
81 |       const embedding = await ctx.db.get(_id);
82 |       if (!embedding) continue;
83 | 
84 |       const message = await ctx.db.get(embedding.messageId);
85 |       if (!message) continue;
86 | 
87 |       const user = await ctx.db.get(message.userId);
88 |       if (!user) continue;
89 | 
90 |       messages.push({
91 |         ...message,
92 |         userName: user.name ?? "Unknown",
93 |       });
94 |     }
95 | 
96 |     return messages;
97 |   },
98 | });
99 | 
100 | // Action to generate embedding and find similar messages
101 | export const findSimilarMessages = action({
102 |   args: {
103 |     text: v.string(),
104 |     limit: v.optional(v.number()),
105 |   },
106 |   handler: async (ctx, { text, limit = 5 }): Promise<MessageWithUser[]> => {
107 |     const apiKey = process.env.OPENAI_API_KEY;
108 |     if (!apiKey) {
109 |       throw new Error("OPENAI_API_KEY environment variable not set");
110 |     }
111 | 
112 |     const response = await fetch(OPENAI_API_URL, {
113 |       method: "POST",
114 |       headers: {
115 |         "Content-Type": "application/json",
116 |         Authorization: `Bearer ${apiKey}`,
117 |       },
118 |       body: JSON.stringify({
119 |         input: text,
120 |         model: EMBEDDING_MODEL,
121 |       }),
122 |     });
123 | 
124 |     if (!response.ok) {
125 |       throw new Error(`OpenAI API error: ${response.statusText}`);
126 |     }
127 | 
128 |     const result = await response.json();
129 |     const queryEmbedding = result.data[0].embedding;
130 | 
131 |     // Do vector search in the action
132 |     const searchResults = await ctx.vectorSearch("messageEmbeddings", "by_vector", {
133 |       vector: queryEmbedding,
134 |       limit,
135 |     });
136 | 
137 |     // Fetch the actual messages using a query
138 |     return await ctx.runQuery(api.embeddings.fetchSearchResults, {
139 |       results: searchResults,
140 |     });
141 |   },
142 | }); 
```

convex/http.ts
```
1 | import { httpRouter } from "convex/server";
2 | import { auth } from "./auth";
3 | 
4 | const http = httpRouter();
5 | 
6 | auth.addHttpRoutes(http);
7 | 
8 | export default http;
```

convex/members.ts
```
1 | import { query, QueryCtx } from "./_generated/server";
2 | import { v } from "convex/values";
3 | import { auth } from "./auth";
4 | import { Id } from "./_generated/dataModel";
5 | 
6 | const populateUser = async (ctx: QueryCtx, id: Id<"users">) => {
7 |     return ctx.db.get(id);
8 | }; 
9 |     
10 | export const get = query({
11 |     args: { workspaceId: v.id("workspaces") },
12 |     handler: async (ctx, args) => {
13 |         const userId = await auth.getUserId(ctx);
14 | 
15 |         if (!userId) {
16 |             return [];
17 |         }
18 | 
19 |         const member = await ctx.db
20 |         .query("members")
21 |         .withIndex("by_workspace_id_and_user_id", (q) => 
22 |             q.eq("workspaceId", args.workspaceId).eq("userId", userId)
23 |         )
24 |         .unique();
25 | 
26 |         if (!member) {
27 |             return [];
28 |         }
29 | 
30 |         const data = await ctx.db.query("members").withIndex("by_workspace_id", (q) => 
31 |             q.eq("workspaceId", args.workspaceId)
32 |         ).collect();
33 | 
34 |         const members = [];
35 | 
36 |         for (const member of data) {
37 |             const user = await populateUser(ctx, member.userId);
38 |             members.push({
39 |                 ...member,
40 |                 user
41 |             });
42 |         }
43 | 
44 |         return members;
45 |     }
46 | });
47 | 
48 | export const current = query({
49 |   args: { workspaceId: v.id("workspaces") },
50 |   handler: async (ctx, args) => {
51 |     const userId = await auth.getUserId(ctx);
52 | 
53 |     if (!userId) {
54 |       return null;
55 |     }
56 | 
57 |     const member = await ctx.db
58 |       .query("members")
59 |       .withIndex("by_workspace_id_and_user_id", (q) => 
60 |         q.eq("workspaceId", args.workspaceId).eq("userId", userId)
61 |       )
62 |       .unique();
63 | 
64 |     if (!member) {
65 |       return null;
66 |     }
67 | 
68 |     const user = await ctx.db.get(member.userId);
69 |     if (!user) {
70 |       return null;
71 |     }
72 | 
73 |     return {
74 |       ...member,
75 |       user
76 |     };
77 |   },
78 | });
79 | 
```

convex/messages.ts
```
1 | import { mutation, query } from "./_generated/server";
2 | import { v } from "convex/values";
3 | import { auth } from "./auth";
4 | import { api } from "./_generated/api";
5 | 
6 | export const getById = query({
7 |   args: { messageId: v.id("messages") },
8 |   handler: async (ctx, { messageId }) => {
9 |     const message = await ctx.db.get(messageId);
10 |     if (!message) return null;
11 | 
12 |     const user = await ctx.db.get(message.userId);
13 |     return {
14 |       ...message,
15 |       userName: user?.name || "Unknown",
16 |     };
17 |   },
18 | });
19 | 
20 | export const send = mutation({
21 |   args: {
22 |     channelId: v.id("channels"),
23 |     text: v.string(),
24 |     parentMessageId: v.optional(v.id("messages")),
25 |     isAI: v.optional(v.boolean()),
26 |     userId: v.optional(v.id("users")), // For AI responses
27 |   },
28 |   handler: async (ctx, { channelId, text, parentMessageId, isAI, userId: overrideUserId }) => {
29 |     const currentUserId = await auth.getUserId(ctx);
30 |     const effectiveUserId = overrideUserId || currentUserId;
31 |     
32 |     if (!effectiveUserId) throw new Error("Unauthorized");
33 |     if (!isAI && overrideUserId) throw new Error("Cannot override userId without AI flag");
34 | 
35 |     // Check that channel exists
36 |     const channel = await ctx.db.get(channelId);
37 |     if (!channel) throw new Error("Channel not found");
38 | 
39 |     // Verify user is a member of the workspace
40 |     const member = await ctx.db
41 |       .query("members")
42 |       .withIndex("by_workspace_id_and_user_id", (q) =>
43 |         q.eq("workspaceId", channel.workspaceId).eq("userId", effectiveUserId)
44 |       )
45 |       .first();
46 |     if (!member) throw new Error("You are not a member of this workspace");
47 | 
48 |     // Insert the message
49 |     const messageId = await ctx.db.insert("messages", {
50 |       channelId,
51 |       userId: effectiveUserId,
52 |       text,
53 |       createdAt: Date.now(),
54 |       parentMessageId,
55 |       isAI,
56 |     });
57 | 
58 |     // Generate and store embedding asynchronously
59 |     await ctx.scheduler.runAfter(0, api.embeddings.generateEmbedding, {
60 |       messageId,
61 |       text,
62 |     });
63 | 
64 |     // Only check for offline responses if this isn't already an AI message
65 |     if (!isAI) {
66 |       // Handle offline users based on channel type
67 |       const TWO_MINUTES = 2 * 60 * 1000;
68 |       const now = Date.now();
69 | 
70 |       if (channel.type === "dm" && channel.userIds) {
71 |         // For DM channels, check all other users
72 |         const otherUserIds = channel.userIds.filter(id => id !== effectiveUserId);
73 |         
74 |         for (const otherUserId of otherUserIds) {
75 |           // Check user's presence
76 |           const presence = await ctx.db
77 |             .query("userPresence")
78 |             .withIndex("by_workspace_and_user", (q) =>
79 |               q.eq("workspaceId", channel.workspaceId).eq("userId", otherUserId)
80 |             )
81 |             .first();
82 | 
83 |           // If user is offline, queue AI response
84 |           const isOffline = !presence || (now - presence.lastSeen > TWO_MINUTES);
85 |           if (isOffline) {
86 |             await ctx.scheduler.runAfter(0, api.ai.queueResponse, {
87 |               channelId,
88 |               userId: otherUserId,
89 |               messageId,
90 |             });
91 |           }
92 |         }
93 |       } else if (parentMessageId) {
94 |         // For channel messages, check if we're replying to someone
95 |         const parentMessage = await ctx.db.get(parentMessageId);
96 |         if (parentMessage && parentMessage.userId !== effectiveUserId) {
97 |           // Check if parent message author is offline
98 |           const presence = await ctx.db
99 |             .query("userPresence")
100 |             .withIndex("by_workspace_and_user", (q) =>
101 |               q.eq("workspaceId", channel.workspaceId).eq("userId", parentMessage.userId)
102 |             )
103 |             .first();
104 | 
105 |           const isOffline = !presence || (now - presence.lastSeen > TWO_MINUTES);
106 |           if (isOffline) {
107 |             await ctx.scheduler.runAfter(0, api.ai.queueResponse, {
108 |               channelId,
109 |               userId: parentMessage.userId,
110 |               messageId,
111 |             });
112 |           }
113 |         }
114 |       }
115 |     }
116 | 
117 |     return messageId;
118 |   },
119 | });
120 | 
121 | /**
122 |  * list() - fetch main channel messages, including user name
123 |  */
124 | export const list = query({
125 |   args: { channelId: v.id("channels") },
126 |   handler: async (ctx, args) => {
127 |     const messages = await ctx.db
128 |       .query("messages")
129 |       .withIndex("by_channel_id", (q) => q.eq("channelId", args.channelId))
130 |       .filter((q) => q.eq(q.field("parentMessageId"), undefined))
131 |       .collect();
132 | 
133 |     const results = [];
134 |     for (const msg of messages) {
135 |       const userDoc = await ctx.db.get(msg.userId);
136 |       
137 |       const reactions = await ctx.db
138 |         .query("reactions")
139 |         .withIndex("by_message_id", (q) => q.eq("messageId", msg._id))
140 |         .collect();
141 | 
142 |       const reactionGroups = reactions.reduce((acc, reaction) => {
143 |         const code = encodeURIComponent(reaction.emoji);
144 |         if (!acc[code]) {
145 |           acc[code] = { count: 0, users: [], emoji: reaction.emoji };
146 |         }
147 |         acc[code].count++;
148 |         acc[code].users.push(reaction.userId);
149 |         return acc;
150 |       }, {} as Record<string, { count: number; users: string[]; emoji: string }>);
151 | 
152 |       results.push({
153 |         ...msg,
154 |         userName: userDoc?.name || "Unknown",
155 |         reactions: reactionGroups,
156 |       });
157 |     }
158 | 
159 |     return results;
160 |   },
161 | });
162 | 
163 | /**
164 |  * listThread() - fetch all replies to a specified parentMessageId
165 |  */
166 | export const listThread = query({
167 |   args: { parentMessageId: v.id("messages") },
168 |   handler: async (ctx, { parentMessageId }) => {
169 |     const userId = await auth.getUserId(ctx);
170 |     if (!userId) return [];
171 | 
172 |     // Retrieve the parent message
173 |     const parentMsg = await ctx.db.get(parentMessageId);
174 |     if (!parentMsg) return [];
175 | 
176 |     const channel = await ctx.db.get(parentMsg.channelId);
177 |     if (!channel) return [];
178 | 
179 |     // Check membership
180 |     const member = await ctx.db
181 |       .query("members")
182 |       .withIndex("by_workspace_id_and_user_id", (q) =>
183 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
184 |       )
185 |       .first();
186 |     if (!member) return [];
187 | 
188 |     // Query replies
189 |     const replies = await ctx.db
190 |       .query("messages")
191 |       .withIndex("by_parent_message_id", (q) => q.eq("parentMessageId", parentMessageId))
192 |       .order("asc")
193 |       .collect();
194 | 
195 |     // Populate user name and reactions
196 |     const results = [];
197 |     for (const msg of replies) {
198 |       const userDoc = await ctx.db.get(msg.userId);
199 |       
200 |       // Get reactions
201 |       const reactions = await ctx.db
202 |         .query("reactions")
203 |         .withIndex("by_message_id", (q) => q.eq("messageId", msg._id))
204 |         .collect();
205 | 
206 |       // Group reactions
207 |       const reactionGroups = reactions.reduce((acc, reaction) => {
208 |         const code = encodeURIComponent(reaction.emoji);
209 |         if (!acc[code]) {
210 |           acc[code] = { count: 0, users: [], emoji: reaction.emoji };
211 |         }
212 |         acc[code].count++;
213 |         acc[code].users.push(reaction.userId);
214 |         return acc;
215 |       }, {} as Record<string, { count: number; users: string[]; emoji: string }>);
216 | 
217 |       results.push({
218 |         ...msg,
219 |         userName: userDoc?.name || "Unknown",
220 |         reactions: reactionGroups,
221 |       });
222 |     }
223 |     return results;
224 |   },
225 | });
226 | 
227 | /**
228 |  * toggleReaction - Add or remove an emoji reaction from a message
229 |  */
230 | export const toggleReaction = mutation({
231 |   args: {
232 |     messageId: v.id("messages"),
233 |     emoji: v.string(),
234 |   },
235 |   handler: async (ctx, { messageId, emoji }) => {
236 |     const userId = await auth.getUserId(ctx);
237 |     if (!userId) throw new Error("Unauthorized");
238 | 
239 |     // Get the message to check channel access
240 |     const message = await ctx.db.get(messageId);
241 |     if (!message) throw new Error("Message not found");
242 | 
243 |     const channel = await ctx.db.get(message.channelId);
244 |     if (!channel) throw new Error("Channel not found");
245 | 
246 |     // Verify user is a member of the workspace
247 |     const member = await ctx.db
248 |       .query("members")
249 |       .withIndex("by_workspace_id_and_user_id", (q) =>
250 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
251 |       )
252 |       .first();
253 |     if (!member) throw new Error("Not a member of this workspace");
254 | 
255 |     // Check if reaction already exists
256 |     const existing = await ctx.db
257 |       .query("reactions")
258 |       .withIndex("by_message_and_user", (q) =>
259 |         q.eq("messageId", messageId).eq("userId", userId)
260 |       )
261 |       .filter((q) => q.eq(q.field("emoji"), emoji))
262 |       .first();
263 | 
264 |     if (existing) {
265 |       // Remove reaction
266 |       await ctx.db.delete(existing._id);
267 |     } else {
268 |       // Add reaction
269 |       await ctx.db.insert("reactions", {
270 |         messageId,
271 |         userId,
272 |         emoji,
273 |       });
274 |     }
275 |   },
276 | });
277 | 
278 | /**
279 |  * get() - fetch a single message by ID, including user name
280 |  */
281 | export const get = query({
282 |   args: { messageId: v.id("messages") },
283 |   handler: async (ctx, { messageId }) => {
284 |     const userId = await auth.getUserId(ctx);
285 |     if (!userId) return null;
286 | 
287 |     const message = await ctx.db.get(messageId);
288 |     if (!message) return null;
289 | 
290 |     const channel = await ctx.db.get(message.channelId);
291 |     if (!channel) return null;
292 | 
293 |     // Check membership
294 |     const member = await ctx.db
295 |       .query("members")
296 |       .withIndex("by_workspace_id_and_user_id", (q) =>
297 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
298 |       )
299 |       .first();
300 |     if (!member) return null;
301 | 
302 |     // Get user info
303 |     const user = await ctx.db.get(message.userId);
304 | 
305 |     // Get reactions
306 |     const reactions = await ctx.db
307 |       .query("reactions")
308 |       .withIndex("by_message_id", (q) => q.eq("messageId", messageId))
309 |       .collect();
310 | 
311 |     // Group reactions
312 |     const reactionGroups = reactions.reduce((acc, reaction) => {
313 |       const code = encodeURIComponent(reaction.emoji);
314 |       if (!acc[code]) {
315 |         acc[code] = { count: 0, users: [], emoji: reaction.emoji };
316 |       }
317 |       acc[code].count++;
318 |       acc[code].users.push(reaction.userId);
319 |       return acc;
320 |     }, {} as Record<string, { count: number; users: string[]; emoji: string }>);
321 | 
322 |     return {
323 |       ...message,
324 |       userName: user?.name || "Unknown User",
325 |       reactions: reactionGroups,
326 |     };
327 |   },
328 | });
329 | 
330 | /**
331 |  * getReplyCount - Get the number of replies for a message
332 |  */
333 | export const getReplyCount = query({
334 |   args: { messageId: v.id("messages") },
335 |   handler: async (ctx, { messageId }) => {
336 |     const userId = await auth.getUserId(ctx);
337 |     if (!userId) return 0;
338 | 
339 |     const message = await ctx.db.get(messageId);
340 |     if (!message) return 0;
341 | 
342 |     const channel = await ctx.db.get(message.channelId);
343 |     if (!channel) return 0;
344 | 
345 |     // Check membership
346 |     const member = await ctx.db
347 |       .query("members")
348 |       .withIndex("by_workspace_id_and_user_id", (q) =>
349 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
350 |       )
351 |       .first();
352 |     if (!member) return 0;
353 | 
354 |     // Count replies using the index
355 |     const replies = await ctx.db
356 |       .query("messages")
357 |       .withIndex("by_parent_message_id", (q) => q.eq("parentMessageId", messageId))
358 |       .collect();
359 |     
360 |     return replies.length;
361 |   },
362 | });
```

convex/presence.ts
```
1 | import { mutation, query } from "./_generated/server";
2 | import { v } from "convex/values";
3 | import { auth } from "./auth";
4 | import { Id } from "./_generated/dataModel";
5 | 
6 | // Update user's presence status
7 | export const updatePresence = mutation({
8 |   args: {
9 |     workspaceId: v.id("workspaces"),
10 |     status: v.union(v.literal("online"), v.literal("offline"), v.literal("away")),
11 |     customStatus: v.optional(v.string()),
12 |   },
13 |   handler: async (ctx, { workspaceId, status, customStatus }) => {
14 |     const userId = await auth.getUserId(ctx);
15 |     // If no user ID, just return silently
16 |     if (!userId) return;
17 | 
18 |     // Try to get member status - if not a member, just return silently
19 |     const member = await ctx.db
20 |       .query("members")
21 |       .withIndex("by_workspace_id_and_user_id", (q) =>
22 |         q.eq("workspaceId", workspaceId).eq("userId", userId)
23 |       )
24 |       .first();
25 |     if (!member) return;
26 | 
27 |     // Try to update or create presence record
28 |     try {
29 |       const existing = await ctx.db
30 |         .query("userPresence")
31 |         .withIndex("by_workspace_and_user", (q) =>
32 |           q.eq("workspaceId", workspaceId).eq("userId", userId)
33 |         )
34 |         .first();
35 | 
36 |       if (existing) {
37 |         await ctx.db.patch(existing._id, {
38 |           status,
39 |           customStatus,
40 |           lastSeen: Date.now(),
41 |         });
42 |       } else {
43 |         await ctx.db.insert("userPresence", {
44 |           userId,
45 |           workspaceId,
46 |           status,
47 |           customStatus,
48 |           lastSeen: Date.now(),
49 |         });
50 |       }
51 |     } catch {
52 |       // Silently handle any DB operation failures
53 |       return;
54 |     }
55 |   },
56 | });
57 | 
58 | // Get presence for all users in a workspace
59 | export const getWorkspacePresence = query({
60 |   args: { workspaceId: v.id("workspaces") },
61 |   handler: async (ctx, { workspaceId }) => {
62 |     const userId = await auth.getUserId(ctx);
63 |     if (!userId) return null;
64 | 
65 |     // Verify user is a member of the workspace
66 |     const member = await ctx.db
67 |       .query("members")
68 |       .withIndex("by_workspace_id_and_user_id", (q) =>
69 |         q.eq("workspaceId", workspaceId).eq("userId", userId)
70 |       )
71 |       .first();
72 |     if (!member) return null;
73 | 
74 |     // Get all presence records for the workspace
75 |     const presenceRecords = await ctx.db
76 |       .query("userPresence")
77 |       .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
78 |       .collect();
79 | 
80 |     // Mark users as offline if they haven't been seen in 2 minutes
81 |     const TWO_MINUTES = 2 * 60 * 1000;
82 |     const now = Date.now();
83 | 
84 |     const enhancedRecords = await Promise.all(
85 |       presenceRecords.map(async (record) => {
86 |         const user = await ctx.db.get(record.userId);
87 |         return {
88 |           ...record,
89 |           status:
90 |             now - record.lastSeen > TWO_MINUTES ? "offline" : record.status,
91 |           userName: user?.name || "Unknown User",
92 |         };
93 |       })
94 |     );
95 | 
96 |     return enhancedRecords;
97 |   },
98 | });
99 | 
100 | // Get presence for a specific user in a workspace
101 | export const getUserPresence = query({
102 |   args: {
103 |     workspaceId: v.id("workspaces"),
104 |     userId: v.id("users"),
105 |   },
106 |   handler: async (ctx, { workspaceId, userId: targetUserId }) => {
107 |     const userId = await auth.getUserId(ctx);
108 |     if (!userId) return null;
109 | 
110 |     // Verify user is a member of the workspace
111 |     const member = await ctx.db
112 |       .query("members")
113 |       .withIndex("by_workspace_id_and_user_id", (q) =>
114 |         q.eq("workspaceId", workspaceId).eq("userId", userId)
115 |       )
116 |       .first();
117 |     if (!member) return null;
118 | 
119 |     // Get presence record for the target user
120 |     const presence = await ctx.db
121 |       .query("userPresence")
122 |       .withIndex("by_workspace_and_user", (q) =>
123 |         q.eq("workspaceId", workspaceId).eq("userId", targetUserId)
124 |       )
125 |       .first();
126 | 
127 |     if (!presence) return null;
128 | 
129 |     // Check if user is offline based on last seen
130 |     const TWO_MINUTES = 2 * 60 * 1000;
131 |     const now = Date.now();
132 |     const status = now - presence.lastSeen > TWO_MINUTES ? "offline" : presence.status;
133 | 
134 |     const user = await ctx.db.get(targetUserId);
135 |     return {
136 |       ...presence,
137 |       status,
138 |       userName: user?.name || "Unknown User",
139 |     };
140 |   },
141 | });
142 | 
143 | export const list = query({
144 |   args: {
145 |     workspaceId: v.id("workspaces"),
146 |   },
147 |   handler: async (ctx, args) => {
148 |     const presence = await ctx.db
149 |       .query("userPresence")
150 |       .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
151 |       .filter((q) => q.eq(q.field("status"), "online"))
152 |       .collect();
153 | 
154 |     return presence;
155 |   },
156 | }); 
```

convex/schema.ts
```
1 | import { defineSchema, defineTable } from "convex/server";
2 | import { authTables } from "@convex-dev/auth/server";
3 | import { v } from "convex/values";
4 | 
5 | const schema = defineSchema({
6 |   ...authTables,
7 | 
8 |   userPresence: defineTable({
9 |     userId: v.id("users"),
10 |     workspaceId: v.id("workspaces"),
11 |     status: v.union(
12 |       v.literal("online"),
13 |       v.literal("offline"),
14 |       v.literal("away")
15 |     ),
16 |     customStatus: v.optional(v.string()),
17 |     lastSeen: v.number(),
18 |   })
19 |     .index("by_workspace", ["workspaceId"])
20 |     .index("by_user", ["userId"])
21 |     .index("by_workspace_and_user", ["workspaceId", "userId"]),
22 | 
23 |   workspaces: defineTable({
24 |     name: v.string(),
25 |     userId: v.id("users"),
26 |     joinCode: v.string(),
27 |   }),
28 | 
29 |   members: defineTable({
30 |     workspaceId: v.id("workspaces"),
31 |     userId: v.id("users"),
32 |     role: v.union(v.literal("admin"), v.literal("member")),
33 |   })
34 |     .index("by_user_id", ["userId"])
35 |     .index("by_workspace_id", ["workspaceId"])
36 |     .index("by_workspace_id_and_user_id", ["workspaceId", "userId"]),
37 | 
38 |   channels: defineTable({
39 |     workspaceId: v.id("workspaces"),
40 |     name: v.string(),
41 |     type: v.union(
42 |       v.literal("public"),
43 |       v.literal("private"),
44 |       v.literal("dm")
45 |     ),
46 |     userIds: v.optional(v.array(v.id("users"))),
47 |   }).index("by_workspace_id", ["workspaceId"]),
48 | 
49 |   messages: defineTable({
50 |     channelId: v.id("channels"),
51 |     userId: v.id("users"),
52 |     text: v.string(),
53 |     createdAt: v.number(),
54 |     parentMessageId: v.optional(v.id("messages")),
55 |     isAI: v.optional(v.boolean()),
56 |   })
57 |     .index("by_channel_id", ["channelId"])
58 |     .index("by_user_id", ["userId"])
59 |     .index("by_parent_message_id", ["parentMessageId"]),
60 | 
61 |   messageEmbeddings: defineTable({
62 |     messageId: v.id("messages"),
63 |     vector: v.array(v.number()),
64 |     createdAt: v.number(),
65 |   })
66 |     .index("by_message_id", ["messageId"])
67 |     .vectorIndex("by_vector", {
68 |       vectorField: "vector",
69 |       dimensions: 1536,
70 |     }),
71 | 
72 |   aiTasks: defineTable({
73 |     channelId: v.id("channels"),
74 |     userId: v.id("users"),
75 |     messageId: v.id("messages"),
76 |     status: v.union(
77 |       v.literal("pending"),
78 |       v.literal("processing"),
79 |       v.literal("completed"),
80 |       v.literal("failed")
81 |     ),
82 |     createdAt: v.number(),
83 |     completedAt: v.optional(v.number()),
84 |     error: v.optional(v.string()),
85 |   })
86 |     .index("by_status", ["status"])
87 |     .index("by_channel", ["channelId"])
88 |     .index("by_user", ["userId"]),
89 | 
90 |   reactions: defineTable({
91 |     messageId: v.id("messages"),
92 |     userId: v.id("users"),
93 |     emoji: v.string(),
94 |   })
95 |     .index("by_message_id", ["messageId"])
96 |     .index("by_message_and_user", ["messageId", "userId"]),
97 | });
98 | 
99 | export default schema;
```

convex/tsconfig.json
```
1 | {
2 |   /* This TypeScript project config describes the environment that
3 |    * Convex functions run in and is used to typecheck them.
4 |    * You can modify it, but some settings required to use Convex.
5 |    */
6 |   "compilerOptions": {
7 |     /* These settings are not required by Convex and can be modified. */
8 |     "allowJs": true,
9 |     "strict": true,
10 |     "moduleResolution": "Bundler",
11 |     "jsx": "react-jsx",
12 |     "skipLibCheck": true,
13 |     "allowSyntheticDefaultImports": true,
14 | 
15 |     /* These compiler options are required by Convex */
16 |     "target": "ESNext",
17 |     "lib": ["ES2021", "dom"],
18 |     "forceConsistentCasingInFileNames": true,
19 |     "module": "ESNext",
20 |     "isolatedModules": true,
21 |     "noEmit": true
22 |   },
23 |   "include": ["./**/*"],
24 |   "exclude": ["./_generated"]
25 | }
```

convex/users.ts
```
1 | import { auth } from "./auth";
2 | import { query } from "./_generated/server";
3 | 
4 | export const current = query({
5 |   args: {},
6 |   handler: async (ctx) => {
7 |     const userId = await auth.getUserId(ctx);
8 | 
9 |     if (userId === null) {
10 |       return null;
11 |     }
12 | 
13 |     return await ctx.db.get(userId);
14 |   },
15 | }); 
```

convex/workspaces.ts
```
1 | import { mutation, query } from "./_generated/server";
2 | import { v } from "convex/values";
3 | import { auth } from "./auth";
4 | 
5 | export const create = mutation({
6 |   args: {
7 |     name: v.string(),
8 |   },
9 |   handler: async (ctx, args) => {
10 |     const userId = await auth.getUserId(ctx);
11 |     if (!userId) {
12 |       return { success: false, message: "Unauthorized", workspaceId: null };
13 |     }
14 | 
15 |     const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
16 |     const workspaceId = await ctx.db.insert("workspaces", {
17 |       name: args.name,
18 |       userId,
19 |       joinCode,
20 |     });
21 | 
22 |     await ctx.db.insert("members", {
23 |       workspaceId,
24 |       userId,
25 |       role: "admin",
26 |     });
27 | 
28 |     // Initialize presence for admin
29 |     await ctx.db.insert("userPresence", {
30 |       userId,
31 |       workspaceId,
32 |       status: "online",
33 |       lastSeen: Date.now(),
34 |     });
35 | 
36 |     // Create default general channel
37 |     await ctx.db.insert("channels", {
38 |       name: "general",
39 |       workspaceId,
40 |       type: "public",
41 |     });
42 | 
43 |     return {
44 |       success: true,
45 |       message: "",
46 |       workspaceId,
47 |     };
48 |   },
49 | });
50 | 
51 | export const getById = query({
52 |   args: { id: v.id("workspaces") },
53 |   handler: async (ctx, args) => {
54 |     const workspace = await ctx.db.get(args.id);
55 |     return workspace;
56 |   },
57 | });
58 | 
59 | export const get = query({
60 |   handler: async (ctx) => {
61 |     const userId = await auth.getUserId(ctx);
62 |     if (!userId) return [];
63 | 
64 |     const members = await ctx.db
65 |       .query("members")
66 |       .filter(q => q.eq(q.field("userId"), userId))
67 |       .collect();
68 | 
69 |     const workspaceIds = members.map(member => member.workspaceId);
70 |     const workspaces = await Promise.all(
71 |       workspaceIds.map(id => ctx.db.get(id))
72 |     );
73 | 
74 |     return workspaces.filter(Boolean);
75 |   },
76 | });
77 | 
78 | export const newJoinCode = mutation({
79 |   args: { id: v.id("workspaces") },
80 |   handler: async (ctx, args) => {
81 |     const userId = await auth.getUserId(ctx);
82 |     if (!userId) throw new Error("Unauthorized");
83 | 
84 |     // Check if user is admin
85 |     const member = await ctx.db
86 |       .query("members")
87 |       .withIndex("by_workspace_id_and_user_id", (q) =>
88 |         q.eq("workspaceId", args.id).eq("userId", userId)
89 |       )
90 |       .first();
91 | 
92 |     if (!member || member.role !== "admin") {
93 |       throw new Error("Only admins can generate new join codes");
94 |     }
95 | 
96 |     // Generate new join code
97 |     const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
98 | 
99 |     // Update workspace with new code
100 |     await ctx.db.patch(args.id, { joinCode });
101 | 
102 |     return args.id;
103 |   },
104 | });
105 | 
106 | export const update = mutation({
107 |   args: { 
108 |     id: v.id("workspaces"),
109 |     name: v.string(),
110 |   },
111 |   handler: async (ctx, args) => {
112 |     const userId = await auth.getUserId(ctx);
113 |     if (!userId) throw new Error("Unauthorized");
114 | 
115 |     // Check if user is admin
116 |     const member = await ctx.db
117 |       .query("members")
118 |       .withIndex("by_workspace_id_and_user_id", (q) =>
119 |         q.eq("workspaceId", args.id).eq("userId", userId)
120 |       )
121 |       .first();
122 | 
123 |     if (!member || member.role !== "admin") {
124 |       throw new Error("Only admins can update workspace settings");
125 |     }
126 | 
127 |     // Update workspace
128 |     await ctx.db.patch(args.id, { name: args.name });
129 | 
130 |     return args.id;
131 |   },
132 | });
133 | 
134 | export const remove = mutation({
135 |   args: { id: v.id("workspaces") },
136 |   handler: async (ctx, args) => {
137 |     const userId = await auth.getUserId(ctx);
138 |     if (!userId) throw new Error("Unauthorized");
139 | 
140 |     // Check if user is admin
141 |     const member = await ctx.db
142 |       .query("members")
143 |       .withIndex("by_workspace_id_and_user_id", (q) =>
144 |         q.eq("workspaceId", args.id).eq("userId", userId)
145 |       )
146 |       .first();
147 | 
148 |     if (!member || member.role !== "admin") {
149 |       throw new Error("Only admins can delete workspaces");
150 |     }
151 | 
152 |     // Get all channels in workspace
153 |     const channels = await ctx.db
154 |       .query("channels")
155 |       .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
156 |       .collect();
157 | 
158 |     // Delete all messages in each channel
159 |     for (const channel of channels) {
160 |       const messages = await ctx.db
161 |         .query("messages")
162 |         .withIndex("by_channel_id", (q) => q.eq("channelId", channel._id))
163 |         .collect();
164 | 
165 |       // Delete reactions for each message
166 |       for (const message of messages) {
167 |         await ctx.db
168 |           .query("reactions")
169 |           .withIndex("by_message_id", (q) => q.eq("messageId", message._id))
170 |           .collect()
171 |           .then((reactions) => {
172 |             reactions.forEach((reaction) => ctx.db.delete(reaction._id));
173 |           });
174 |         await ctx.db.delete(message._id);
175 |       }
176 |       await ctx.db.delete(channel._id);
177 |     }
178 | 
179 |     // Delete all members
180 |     const members = await ctx.db
181 |       .query("members")
182 |       .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.id))
183 |       .collect();
184 |     
185 |     for (const member of members) {
186 |       await ctx.db.delete(member._id);
187 |     }
188 | 
189 |     // Finally delete the workspace
190 |     await ctx.db.delete(args.id);
191 | 
192 |     return args.id;
193 |   },
194 | });
195 | 
196 | /**
197 |  * getInfoById - Get public workspace info by ID (for invite links)
198 |  */
199 | export const getInfoById = query({
200 |   args: { id: v.id("workspaces") },
201 |   handler: async (ctx, args) => {
202 |     const workspace = await ctx.db.get(args.id);
203 |     if (!workspace) return null;
204 | 
205 |     // Return only public info needed for invite page
206 |     return {
207 |       _id: workspace._id,
208 |       name: workspace.name,
209 |       joinCode: workspace.joinCode,
210 |     };
211 |   },
212 | });
213 | 
214 | /**
215 |  * join - Join a workspace using its ID and join code
216 |  */
217 | export const join = mutation({
218 |   args: {
219 |     id: v.id("workspaces"),
220 |     code: v.string(),
221 |   },
222 |   handler: async (ctx, args) => {
223 |     const userId = await auth.getUserId(ctx);
224 |     if (!userId) {
225 |       return { success: false, message: "Unauthorized", workspaceId: null };
226 |     }
227 | 
228 |     // Get the workspace
229 |     const workspace = await ctx.db.get(args.id);
230 |     if (!workspace) {
231 |       return { success: false, message: "Workspace not found", workspaceId: null };
232 |     }
233 | 
234 |     // Check if join code matches
235 |     if (workspace.joinCode !== args.code) {
236 |       return { success: false, message: "Invalid join code", workspaceId: null };
237 |     }
238 | 
239 |     // Check if user is already a member
240 |     const existingMember = await ctx.db
241 |       .query("members")
242 |       .withIndex("by_workspace_id_and_user_id", (q) =>
243 |         q.eq("workspaceId", args.id).eq("userId", userId)
244 |       )
245 |       .first();
246 | 
247 |     if (existingMember) {
248 |       return { success: true, message: "Already a member", workspaceId: args.id };
249 |     }
250 | 
251 |     // Add user as a member
252 |     await ctx.db.insert("members", {
253 |       workspaceId: args.id,
254 |       userId,
255 |       role: "member",
256 |     });
257 | 
258 |     // Initialize presence
259 |     await ctx.db.insert("userPresence", {
260 |       userId,
261 |       workspaceId: args.id,
262 |       status: "online",
263 |       lastSeen: Date.now(),
264 |     });
265 | 
266 |     return { success: true, message: "", workspaceId: args.id };
267 |   },
268 | });
269 | 
270 | // The rest of your existing code remains unchanged...
```

eslint.config.mjs
```
1 | import { dirname } from "path";
2 | import { fileURLToPath } from "url";
3 | import { FlatCompat } from "@eslint/eslintrc";
4 | 
5 | const __filename = fileURLToPath(import.meta.url);
6 | const __dirname = dirname(__filename);
7 | 
8 | const compat = new FlatCompat({
9 |   baseDirectory: __dirname,
10 | });
11 | 
12 | const eslintConfig = [
13 |   {
14 |     ignores: ["**/*"]
15 |   },
16 |   ...compat.extends("next/core-web-vitals", "next/typescript"),
17 |   {
18 |     rules: {
19 |       "@typescript-eslint/no-explicit-any": "off",
20 |       "@typescript-eslint/no-unused-vars": ["warn", {
21 |         "varsIgnorePattern": "^_",
22 |         "argsIgnorePattern": "^_",
23 |         "caughtErrorsIgnorePattern": "^_"
24 |       }]
25 |     }
26 |   }
27 | ];
28 | 
29 | export default eslintConfig;
```

middleware.ts
```
1 | import {
2 |   convexAuthNextjsMiddleware,
3 |   createRouteMatcher,
4 |   nextjsMiddlewareRedirect,
5 | } from "@convex-dev/auth/nextjs/server";
6 | 
7 | const isSignInPage = createRouteMatcher(["/signin"]);
8 | const isProtectedRoute = createRouteMatcher(["/(.*)"]);
9 | 
10 | export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
11 |   // If user is on /signin and is already authenticated, redirect to /dashboard
12 |   if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
13 |     return nextjsMiddlewareRedirect(request, "/dashboard");
14 |   }
15 | 
16 |   // Otherwise, if the route is protected and the user isn't authenticated, redirect to /signin
17 |   if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
18 |     return nextjsMiddlewareRedirect(request, "/signin");
19 |   }
20 | });
21 | 
22 | export const config = {
23 |   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
24 | };
```

next.config.ts
```
1 | import type { NextConfig } from "next";
2 | 
3 | const nextConfig: NextConfig = {
4 |   /* config options here */
5 | };
6 | 
7 | export default nextConfig;
```

package.json
```
1 | {
2 |   "name": "chat4me",
3 |   "version": "0.1.0",
4 |   "private": true,
5 |   "scripts": {
6 |     "dev": "next dev",
7 |     "build": "next build",
8 |     "start": "next start",
9 |     "lint": "next lint"
10 |   },
11 |   "dependencies": {
12 |     "@auth/core": "^0.37.0",
13 |     "@convex-dev/auth": "^0.0.79",
14 |     "@emoji-mart/data": "^1.2.1",
15 |     "@emoji-mart/react": "^1.1.1",
16 |     "@hookform/resolvers": "^3.10.0",
17 |     "@radix-ui/react-alert-dialog": "^1.1.4",
18 |     "@radix-ui/react-avatar": "^1.1.2",
19 |     "@radix-ui/react-dialog": "^1.1.4",
20 |     "@radix-ui/react-dropdown-menu": "^2.1.4",
21 |     "@radix-ui/react-label": "^2.1.1",
22 |     "@radix-ui/react-popover": "^1.1.4",
23 |     "@radix-ui/react-separator": "^1.1.1",
24 |     "@radix-ui/react-slot": "^1.1.1",
25 |     "@radix-ui/react-tooltip": "^1.1.6",
26 |     "@types/jwt-decode": "^2.2.1",
27 |     "class-variance-authority": "^0.7.1",
28 |     "clsx": "^2.1.1",
29 |     "convex": "^1.17.4",
30 |     "emoji-mart": "^5.6.0",
31 |     "icons": "^1.0.0",
32 |     "jotai": "^2.11.0",
33 |     "jwt-decode": "^3.1.2",
34 |     "lucide-react": "^0.469.0",
35 |     "next": "15.1.4",
36 |     "react": "^18.3.1",
37 |     "react-dom": "^18.3.1",
38 |     "react-hook-form": "^7.54.2",
39 |     "react-icons": "^5.4.0",
40 |     "react-resizable-panels": "^2.1.7",
41 |     "react-use": "^17.6.0",
42 |     "react-verification-input": "^4.2.0",
43 |     "sonner": "^1.7.1",
44 |     "tailwind-merge": "^2.6.0",
45 |     "tailwindcss-animate": "^1.0.7",
46 |     "zod": "^3.24.1",
47 |     "zustand": "^5.0.3"
48 |   },
49 |   "devDependencies": {
50 |     "@eslint/eslintrc": "^3",
51 |     "@shadcn/ui": "^0.0.4",
52 |     "@types/node": "^20",
53 |     "@types/react": "^19",
54 |     "@types/react-dom": "^19",
55 |     "eslint": "^9",
56 |     "eslint-config-next": "15.1.4",
57 |     "postcss": "^8",
58 |     "tailwindcss": "^3.4.1",
59 |     "typescript": "^5"
60 |   }
61 | }
```

postcss.config.mjs
```
1 | /** @type {import('postcss-load-config').Config} */
2 | const config = {
3 |   plugins: {
4 |     tailwindcss: {},
5 |   },
6 | };
7 | 
8 | export default config;
```

project-desc.md
```
1 | **README**
2 | 
3 | This project is a [Next.js](https://nextjs.org/) application integrated with [Convex](https://convex.dev) for real-time backend functionality. It includes a variety of features such as user authentication, workspace creation, channel management, and membership APIs. Below is a concise overview of the project's file tree and schema, alongside short explanations about each file's purpose.
4 | 
5 | ---
6 | 
7 | ## File Tree
8 | 
9 | ```
10 | /Users/build/Desktop/gauntlet-projects/chat4me
11 | ├── middleware.ts
12 | ├── bun.lockb
13 | ├── postcss.config.mjs
14 | ├── convex
15 | │   ├── schema.ts
16 | │   ├── workspaces.ts
17 | │   ├── channels.ts
18 | │   ├── auth.config.ts
19 | │   ├── http.ts
20 | │   ├── tsconfig.json
21 | │   ├── members.ts
22 | │   ├── users.ts
23 | │   ├── auth.ts
24 | │   └── _generated
25 | │       ├── dataModel.d.ts
26 | │       ├── api.d.ts
27 | │       ├── server.d.ts
28 | │       ├── server.js
29 | │       └── api.js
30 | ├── README.md
31 | ├── tailwind.config.ts
32 | ├── public
33 | │   ├── file.svg
34 | │   ├── vercel.svg
35 | │   ├── next.svg
36 | │   ├── globe.svg
37 | │   └── window.svg
38 | ├── package.json
39 | ├── components.json
40 | ├── tsconfig.json
41 | ├── sampleData.jsonl
42 | ├── eslint.config.mjs
43 | ├── next.config.ts
44 | └── src
45 |     ├── middleware.ts
46 |     ├── app
47 |     │   ├── favicon.ico
48 |     │   ├── join
49 |     │   │   └── [workspaceId]
50 |     │   │       └── page.tsx
51 |     │   ├── auth
52 |     │   │   └── page.tsx
53 |     │   ├── workspace
54 |     │   │   └── [workspaceId]
55 |     │   │       ├── workspace-sidebar.tsx
56 |     │   │       ├── workspace-switcher.tsx
57 |     │   │       ├── toolbar.tsx
58 |     │   │       ├── preferences-modal.tsx
59 |     │   │       ├── sidebar-item.tsx
60 |     │   │       ├── sidebar-button.tsx
61 |     │   │       ├── workspace-header.tsx
62 |     │   │       ├── layout.tsx
63 |     │   │       ├── workspace-section.tsx
64 |     │   │       ├── user-item.tsx
65 |     │   │       ├── sidebar.tsx
66 |     │   │       ├── page.tsx
67 |     │   │       └── invite-modal.tsx
68 |     │   ├── features
69 |     │   │   ├── auth
70 |     │   │   │   ├── types.ts
71 |     │   │   │   ├── components
72 |     │   │   │   │   ├── sign-up-card.tsx
73 |     │   │   │   │   ├── user-button.tsx
74 |     │   │   │   │   ├── auth-screen.tsx
75 |     │   │   │   │   └── sign-in-card.tsx
76 |     │   │   │   └── api
77 |     │   │   │       └── use-current-user.ts
78 |     │   │   ├── workspaces
79 |     │   │   │   ├── components
80 |     │   │   │   │   └── create-workspace-modal.tsx
81 |     │   │   │   ├── api
82 |     │   │   │   │   ├── use-get-workspace-info.ts
83 |     │   │   │   │   ├── use-create-workspace.ts
84 |     │   │   │   │   ├── use-join.ts
85 |     │   │   │   │   ├── use-get-workspace.ts
86 |     │   │   │   │   ├── use-update-workspace.ts
87 |     │   │   │   │   ├── use-new-join-code.ts
88 |     │   │   │   │   ├── use-get-workspaces.ts
89 |     │   │   │   │   └── use-remove-workspace.ts
90 |     │   │   │   └── store
91 |     │   │   │       └── use-create-workspace-modal.ts
92 |     │   │   ├── members
93 |     │   │   │   └── api
94 |     │   │   │       ├── use-get-members.ts
95 |     │   │   │       └── use-current-member.ts
96 |     │   │   └── channels
97 |     │   │       ├── components
98 |     │   │       │   └── create-channel-modal.tsx
99 |     │   │       ├── api
100 |     │   │       │   ├── use-create-channel.ts
101 |     │   │       │   └── use-get-channels.ts
102 |     │   │       └── store
103 |     │   │           └── use-create-channel-modal.ts
104 |     │   ├── dashboard
105 |     │   │   └── page.tsx
106 |     │   ├── signin
107 |     │   │   └── page.tsx
108 |     │   ├── layout.tsx // layout for the workspace
109 |     │   └── page.tsx
110 |     ├── globals.css
111 |     ├── components
112 |     │   ├── modals.tsx
113 |     │   ├── ui
114 |     │   │   ├── alert-dialog.tsx
115 |     │   │   ├── card.tsx
116 |     │   │   ├── resizable.tsx
117 |     │   │   ├── label.tsx
118 |     │   │   ├── avatar.tsx
119 |     │   │   ├── dialog.tsx
120 |     │   │   ├── separator.tsx
121 |     │   │   ├── button.tsx
122 |     │   │   ├── dropdown-menu.tsx
123 |     │   │   ├── input.tsx
124 |     │   │   ├── skeleton.tsx
125 |     │   │   └── form.tsx
126 |     │   ├── jotai-provider.tsx
127 |     │   └── ConvexClientProvider.tsx
128 |     ├── hooks
129 |     │   └── use-workspace-id.ts
130 |     └── lib
131 |         └── utils.ts
132 | ```
133 | 
134 | ---
135 | 
136 | ## Convex Database Schema (from `schema.ts`)
137 | 
138 | ```ts
139 | import { defineSchema, defineTable } from "convex/server";
140 | import { authTables } from "@convex-dev/auth/server";
141 | import { v } from "convex/values";
142 |  
143 | const schema = defineSchema({
144 |   ...authTables,
145 |   workspaces: defineTable({
146 |     name: v.string(),
147 |     userId: v.id("users"),
148 |     joinCode: v.string(),
149 |   }),
150 |   members: defineTable({
151 |     workspaceId: v.id("workspaces"),
152 |     userId: v.id("users"),
153 |     role: v.union(v.literal("admin"), v.literal("member")),
154 |   })
155 |   .index("by_user_id", ["userId"])
156 |   .index("by_workspace_id", ["workspaceId"])
157 |   .index("by_workspace_id_and_user_id", ["workspaceId", "userId"]),
158 |   channels: defineTable({
159 |     workspaceId: v.id("workspaces"),
160 |     name: v.string(),
161 |     type: v.union(v.literal("public"), v.literal("private")),
162 |   })
163 |   .index("by_workspace_id", ["workspaceId"]),
164 | });
165 |  
166 | export default schema;
167 | ```
168 | 
169 | ---
170 | 
171 | ## File Explanations (Brief)
172 | 
173 | Below is a short 1–2 sentence description of each major file. For more detail, see the inline code comments.
174 | 
175 | ### **Root Files**
176 | 
177 | - **middleware.ts**  
178 |   Next.js middleware handling user authentication checks via convexAuth. Redirects to `/signin` if not authenticated.
179 | - **postcss.config.mjs**  
180 |   PostCSS configuration enabling Tailwind CSS processing.
181 | - **package.json**  
182 |   Lists project dependencies and scripts (e.g., `dev`, `build`, `start`) for Next.js and Convex.
183 | - **tsconfig.json**  
184 |   TypeScript configuration for the Next.js app (excludes the `/convex/_generated` folder from build).
185 | - **eslint.config.mjs**  
186 |   ESLint configuration for code quality and Next.js recommended settings.
187 | - **next.config.ts**  
188 |   General Next.js configuration.
189 | - **components.json**  
190 |   Configuration file (used by `shadcn/ui`) specifying design tokens and aliases.
191 | - **sampleData.jsonl**  
192 |   Example JSON lines data file (for testing or initial seeding).
193 | - **tailwind.config.ts**  
194 |   TailwindCSS configuration, specifying custom color tokens, etc.
195 | 
196 | ### **Convex Folder**
197 | 
198 | - **schema.ts**  
199 |   Defines the Convex data schema (see above). Handles tables for workspaces, members, and channels.
200 | - **auth.config.ts**  
201 |   Configures authentication providers for Convex (GitHub, Google, Password).
202 | - **auth.ts**  
203 |   Helper functions for sign-in, sign-out, and user authentication logic on the Convex side.
204 | - **workspaces.ts, channels.ts, members.ts, users.ts**  
205 |   Each file holds queries and mutations for managing respective data (workspaces, channels, members, users).
206 | - **http.ts**  
207 |   Defines HTTP endpoints in combination with Convex, primarily used for auth routes.
208 | - **tsconfig.json**  
209 |   TypeScript configuration dedicated to Convex functions.
210 | - **_generated** (folder)  
211 |   Auto-generated files by Convex: includes type definitions (`dataModel.d.ts`, `api.d.ts`, `server.d.ts`) and the runtime files (`server.js`, `api.js`) for server interactions.
212 | 
213 | ### **Public Folder**
214 | 
215 | - **file.svg, vercel.svg, next.svg, globe.svg, window.svg**  
216 |   Static images used across the application (logos or icons).
217 | 
218 | ### **src/app**
219 | 
220 | - **layout.tsx**  
221 |   Root layout component for the Next.js App Router. Wraps the entire application in providers (e.g., ConvexAuthNextjsServerProvider).
222 | - **page.tsx**  
223 |   The homepage that checks for existing workspaces; if none, prompts workspace creation.  
224 | - **signin/page.tsx**  
225 |   A sign-in page that imports a custom AuthScreen.  
226 | - **dashboard/page.tsx**  
227 |   Simple "Dashboard" route as an example of protected content.
228 | 
229 | #### **src/app/join/[workspaceId]/page.tsx**  
230 | Page for joining an existing workspace by entering a join code.
231 | 
232 | #### **src/app/auth/page.tsx**  
233 | Renders the AuthScreen (sign in/sign up flow).
234 | 
235 | #### **src/app/workspace/[workspaceId]**  
236 | - **layout.tsx**  
237 |   Wraps the workspace sub-routes, includes a toolbar and sidebars.
238 | - **page.tsx**  
239 |   Default workspace landing page (e.g., showing channel list, etc.).
240 | - **sidebar.tsx, workspace-sidebar.tsx, workspace-switcher.tsx**  
241 |   Components controlling sidebar UI and switching between multiple workspaces.
242 | - **toolbar.tsx**  
243 |   Top bar inside the workspace layout (search bar, info button, etc.).
244 | - **preferences-modal.tsx**  
245 |   Modal for renaming or deleting a workspace (admin-only).
246 | - **sidebar-item.tsx, sidebar-button.tsx**  
247 |   Reusable UI items for listing channels, direct messages, or actions in the sidebar.
248 | - **workspace-header.tsx, workspace-section.tsx, user-item.tsx**  
249 |   Various components to display workspace details, sections (channels/DMs), and user items.
250 | - **invite-modal.tsx**  
251 |   Modal that displays a workspace join code, link copying, and a button to generate a new code.
252 | 
253 | ### **src/app/features**  
254 | Organized by domain feature:
255 | 
256 | - **auth**  
257 |   - **api/use-current-user.ts**: React hook to fetch current user from Convex.  
258 |   - **components** (sign-in, sign-up, user button, main AuthScreen).  
259 |   - **types.ts**: Small type definitions for sign-in flow (e.g., "signIn" | "signUp").
260 | - **workspaces**  
261 |   - **api**: Hooks for workspace-related queries/mutations (e.g., create, join, remove, update).  
262 |   - **components**: e.g., `create-workspace-modal.tsx` for the workspace creation flow.  
263 |   - **store**: Example of Jotai atoms for controlling UI states like the workspace creation modal.
264 | - **members**  
265 |   - **api**: Hooks for fetching workspace members and the current member’s role.
266 | - **channels**  
267 |   - **api**: Hooks to create/fetch channels in a workspace.  
268 |   - **components**: e.g., `create-channel-modal.tsx`.
269 | 
270 | ### **src/components**  
271 | - **modals.tsx**  
272 |   Central place to mount all global modals (workspace creation, channel creation).
273 | - **jotai-provider.tsx**  
274 |   Jotai context provider for global state management.
275 | - **ConvexClientProvider.tsx**  
276 |   Provides the Convex React client + authentication context to the Next.js frontend.
277 | - **ui/** (folder)  
278 |   Shared UI components (buttons, cards, dialogs, inputs, etc.) built on top of Radix UI primitives and Tailwind classes.
279 | 
280 | ### **src/hooks**  
281 | - **use-workspace-id.ts**  
282 |   Grabs the `[workspaceId]` from the Next.js dynamic route (`/workspace/[workspaceId]`).
283 | 
284 | ### **src/lib**  
285 | - **utils.ts**  
286 |   Contains utility functions, including a `cn` (class-names) helper with `tailwind-merge`.
287 | 
288 | ---
289 | 
290 | **Thank you for checking out `chat4me`!**  
291 | 
292 | - This repository illustrates how to integrate Next.js (App Router) with the Convex backend.  
293 | - For local development, run `npm install` (or your preferred package manager) and then `npm run dev`.  
294 | - You’ll need valid environment variables for Convex (`NEXT_PUBLIC_CONVEX_URL`) and any OAuth providers (GitHub, Google) in a `.env` or your deployment environment.  
295 | - Enjoy exploring the code, and refer to the inline comments for more detailed explanations of each feature!
```

sampleData.jsonl
```
1 | {"text": "Buy groceries", "isCompleted": true}
2 | {"text": "Go for a swim", "isCompleted": true}
3 | {"text": "Integrate Convex", "isCompleted": false}
```

src/app/auth/page.tsx
```
1 | import { AuthScreen } from "@/app/features/auth/components/auth-screen";
2 | 
3 | export default function AuthPage() {
4 |   return <AuthScreen />;
5 | } 
```

src/app/features/auth/api/use-current-user.ts
```
1 | import { useQuery } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | 
4 | export const useCurrentUser = () => {
5 |   const data = useQuery(api.users.current);
6 |   const isLoading = data === undefined;
7 | 
8 |   return { data, isLoading };
9 | };
```

src/app/features/auth/components/auth-screen.tsx
```
1 | "use client";
2 | 
3 | import { useState } from "react";
4 | import { SignInFlow } from "../types";
5 | import { SignInCard } from "./sign-in-card";
6 | import { SignUpCard } from "./sign-up-card";
7 | 
8 | export const AuthScreen = () => {
9 |   const [state, setState] = useState<SignInFlow>("signIn");
10 | 
11 |   return (
12 |     <div className="h-full flex items-center justify-center bg-[#014421]">
13 |       <div className="md:h-auto md:w-[420px]">
14 |         {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
15 |       </div>
16 |     </div>
17 |   );
18 | };
19 | 
```

src/app/features/auth/components/sign-in-card.tsx
```
1 | 'use client';
2 | 
3 | import { Button } from "@/components/ui/button";
4 | import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
5 | import { Input } from "@/components/ui/input";
6 | import { Separator } from "@/components/ui/separator";
7 | import { FcGoogle } from "react-icons/fc";
8 | import { FaGithub } from "react-icons/fa";
9 | import { SignInFlow } from "../types";
10 | import { useAuthActions } from "@convex-dev/auth/react";
11 | import { useState } from "react";
12 | import { useRouter } from "next/navigation";
13 | 
14 | const getErrorMessage = (error: any) => {
15 |   if (error?.message?.includes("password")) {
16 |     return "Incorrect password. Please try again.";
17 |   }
18 |   if (error?.message?.includes("email")) {
19 |     return "Email not found. Please check your email or sign up.";
20 |   }
21 |   if (error?.message?.includes("redirect")) {
22 |     return "Authentication failed. Please try again.";
23 |   }
24 |   return "Sign in failed. Please try again.";
25 | };
26 | 
27 | interface SignInCardProps {
28 |   setState: (state: SignInFlow) => void;
29 | }
30 | 
31 | export const SignInCard = ({ setState }: SignInCardProps) => {
32 |   const { signIn } = useAuthActions();
33 |   const [isPending, setIsPending] = useState<string | null>(null);
34 |   const [error, setError] = useState<string | null>(null);
35 |   const router = useRouter();
36 | 
37 |   const handleGithubSignIn = async () => {
38 |     setError(null);
39 |     try {
40 |       setIsPending("github");
41 |       await signIn("github");
42 |       // Redirect on success:
43 |       router.push("/");
44 |     } catch (error) {
45 |       setError("GitHub authentication failed. Please try again.");
46 |     } finally {
47 |       setIsPending(null);
48 |     }
49 |   };
50 | 
51 |   const handleGoogleSignIn = async () => {
52 |     setError(null);
53 |     try {
54 |       setIsPending("google");
55 |       await signIn("google");
56 |       // Redirect on success:
57 |       router.push("/");
58 |     } catch (error) {
59 |       setError("Google authentication failed. Please try again.");
60 |     } finally {
61 |       setIsPending(null);
62 |     }
63 |   };
64 | 
65 |   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
66 |     event.preventDefault();
67 |     setError(null);
68 |     try {
69 |       setIsPending("password");
70 |       const formData = new FormData(event.currentTarget);
71 |       formData.append("flow", "signIn");
72 |       await signIn("password", formData);
73 |       // Redirect on success:
74 |       router.push("/");
75 |     } catch (error: any) {
76 |       setError(getErrorMessage(error));
77 |     } finally {
78 |       setIsPending(null);
79 |     }
80 |   };
81 | 
82 |   return (
83 |     <Card className="w-full h-full p-6">
84 |       <CardHeader className="px-0 pt-0 space-y-2 pb-6">
85 |         <CardTitle className="text-2xl font-bold">Login to continue</CardTitle>
86 |         <CardDescription className="text-gray-500">
87 |           Use your email or another service to continue
88 |         </CardDescription>
89 |       </CardHeader>
90 |       <CardContent className="space-y-4 px-0 pb-0">
91 |         {error && (
92 |           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
93 |             {error}
94 |           </div>
95 |         )}
96 |         <form onSubmit={handleSubmit} className="space-y-4">
97 |           <Input
98 |             name="email"
99 |             disabled={!!isPending}
100 |             placeholder="Email"
101 |             type="email"
102 |             required
103 |             className="h-12"
104 |           />
105 |           <Input
106 |             name="password"
107 |             disabled={!!isPending}
108 |             placeholder="Password"
109 |             type="password"
110 |             required
111 |             className="h-12"
112 |           />
113 |           <Button 
114 |             type="submit" 
115 |             className="w-full bg-[#0f172a] hover:bg-[#1e293b]" 
116 |             size="lg"
117 |             disabled={!!isPending}
118 |           >
119 |             {isPending === "password" ? (
120 |               <div className="flex items-center gap-2">
121 |                 <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
122 |                 Signing in...
123 |               </div>
124 |             ) : (
125 |               "Continue"
126 |             )}
127 |           </Button>
128 |         </form>
129 | 
130 |         <div className="flex items-center gap-4 py-2">
131 |           <Separator className="flex-1" />
132 |           <span className="text-sm text-gray-500">OR</span>
133 |           <Separator className="flex-1" />
134 |         </div>
135 | 
136 |         {/* <Button 
137 |           variant="outline" 
138 |           className="w-full h-12" 
139 |           type="button"
140 |           onClick={handleGoogleSignIn}
141 |           disabled={!!isPending}
142 |         >
143 |           {isPending === "google" ? (
144 |             <div className="flex items-center gap-2">
145 |               <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
146 |               Signing in...
147 |             </div>
148 |           ) : (
149 |             <>
150 |               <FcGoogle className="mr-2 h-5 w-5" />
151 |               Continue with Google
152 |             </>
153 |           )}
154 |         </Button>
155 | 
156 |         <Button 
157 |           variant="outline" 
158 |           className="w-full h-12" 
159 |           type="button"
160 |           onClick={handleGithubSignIn}
161 |           disabled={!!isPending}
162 |         >
163 |           {isPending === "github" ? (
164 |             <div className="flex items-center gap-2">
165 |               <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
166 |               Signing in...
167 |             </div>
168 |           ) : (
169 |             <>
170 |               <FaGithub className="mr-2 h-5 w-5" />
171 |               Continue with GitHub
172 |             </>
173 |           )}
174 |         </Button> */}
175 |       </CardContent>
176 |       <CardFooter className="flex flex-col gap-4">
177 |         <p className="text-sm text-muted-foreground text-center">
178 |           Don't have an account?{" "}
179 |           <Button 
180 |             variant="link" 
181 |             className="p-0" 
182 |             onClick={() => setState("signUp")}
183 |             disabled={!!isPending}
184 |           >
185 |             Sign Up
186 |           </Button>
187 |         </p>
188 |       </CardFooter>
189 |     </Card>
190 |   );
191 | };
```

src/app/features/auth/components/sign-up-card.tsx
```
1 | 'use client';
2 | 
3 | import { Button } from "@/components/ui/button";
4 | import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
5 | import { Input } from "@/components/ui/input";
6 | import { Separator } from "@/components/ui/separator";
7 | import { FcGoogle } from "react-icons/fc";
8 | import { FaGithub } from "react-icons/fa";
9 | import { SignInFlow } from "../types";
10 | import { useAuthActions } from "@convex-dev/auth/react";
11 | import { useState } from "react";
12 | import { useRouter } from "next/navigation";
13 | 
14 | const getErrorMessage = (error: any) => {
15 |   if (error?.message?.includes("email")) {
16 |     return "This email is already registered. Please sign in instead.";
17 |   }
18 |   if (error?.message?.includes("password")) {
19 |     return "Password must be at least 8 characters long, contain uppercase, lowercase, and numbers.";
20 |   }
21 |   if (error?.message?.includes("redirect")) {
22 |     return "Authentication failed. Please try again.";
23 |   }
24 |   return "Sign up failed. Please try again.";
25 | };
26 | 
27 | interface SignUpCardProps {
28 |   setState: (state: SignInFlow) => void;
29 | }
30 | 
31 | export const SignUpCard = ({ setState }: SignUpCardProps) => {
32 |   const { signIn } = useAuthActions();
33 |   const router = useRouter();
34 |   const [isPending, setIsPending] = useState<string | null>(null);
35 |   const [error, setError] = useState<string | null>(null);
36 |   const [formData, setFormData] = useState({
37 |     name: "",
38 |     email: "",
39 |     password: "",
40 |     confirmPassword: ""
41 |   });
42 | 
43 |   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
44 |     const { name, value } = e.target;
45 |     setFormData(prev => ({ ...prev, [name]: value }));
46 |   };
47 | 
48 |   const validateForm = () => {
49 |     if (formData.password !== formData.confirmPassword) {
50 |       setError("Passwords do not match");
51 |       return false;
52 |     }
53 |     if (formData.password.length < 8) {
54 |       setError("Password must be at least 8 characters long");
55 |       return false;
56 |     }
57 |     if (!/[A-Z]/.test(formData.password)) {
58 |       setError("Password must contain at least one uppercase letter");
59 |       return false;
60 |     }
61 |     if (!/[a-z]/.test(formData.password)) {
62 |       setError("Password must contain at least one lowercase letter");
63 |       return false;
64 |     }
65 |     if (!/\d/.test(formData.password)) {
66 |       setError("Password must contain at least one number");
67 |       return false;
68 |     }
69 |     return true;
70 |   };
71 | 
72 |   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
73 |     event.preventDefault();
74 |     setError(null);
75 | 
76 |     if (!validateForm()) {
77 |       return;
78 |     }
79 | 
80 |     try {
81 |       setIsPending("password");
82 |       const data = new FormData();
83 |       data.append("email", formData.email);
84 |       data.append("password", formData.password);
85 |       data.append("flow", "signUp");
86 |       data.append("name", formData.name);
87 | 
88 |       await signIn("password", data);
89 |       router.push("/");
90 |     } catch (error: any) {
91 |       console.error('Sign up error:', error);
92 |       setError(getErrorMessage(error));
93 |     } finally {
94 |       setIsPending(null);
95 |     }
96 |   };
97 | 
98 |   const handleGithubSignIn = async () => {
99 |     setError(null);
100 |     try {
101 |       setIsPending("github");
102 |       await signIn("github");
103 |       router.push("/");
104 |     } catch (error) {
105 |       setError("GitHub authentication failed. Please try again.");
106 |     } finally {
107 |       setIsPending(null);
108 |     }
109 |   };
110 | 
111 |   const handleGoogleSignIn = async () => {
112 |     setError(null);
113 |     try {
114 |       setIsPending("google");
115 |       await signIn("google");
116 |       router.push("/");
117 |     } catch (error) {
118 |       setError("Google authentication failed. Please try again.");
119 |     } finally {
120 |       setIsPending(null);
121 |     }
122 |   };
123 | 
124 |   return (
125 |     <Card className="w-full h-full p-6">
126 |       <CardHeader className="px-0 pt-0 space-y-2 pb-6">
127 |         <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
128 |         <CardDescription className="text-gray-500">
129 |           Enter your details to create a new account
130 |         </CardDescription>
131 |       </CardHeader>
132 |       <CardContent className="space-y-4 px-0 pb-0">
133 |         {error && (
134 |           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
135 |             {error}
136 |           </div>
137 |         )}
138 |         <form onSubmit={handleSubmit} className="space-y-4">
139 |           <Input
140 |             name="name"
141 |             value={formData.name}
142 |             onChange={handleInputChange}
143 |             disabled={!!isPending}
144 |             placeholder="Full Name"
145 |             type="text"
146 |             required
147 |             className="h-12"
148 |           />
149 |           <Input
150 |             name="email"
151 |             value={formData.email}
152 |             onChange={handleInputChange}
153 |             disabled={!!isPending}
154 |             placeholder="Email"
155 |             type="email"
156 |             required
157 |             className="h-12"
158 |           />
159 |           <Input
160 |             name="password"
161 |             value={formData.password}
162 |             onChange={handleInputChange}
163 |             disabled={!!isPending}
164 |             placeholder="Password"
165 |             type="password"
166 |             required
167 |             className="h-12"
168 |           />
169 |           <Input
170 |             name="confirmPassword"
171 |             value={formData.confirmPassword}
172 |             onChange={handleInputChange}
173 |             disabled={!!isPending}
174 |             placeholder="Confirm Password"
175 |             type="password"
176 |             required
177 |             className="h-12"
178 |           />
179 |           <Button 
180 |             type="submit" 
181 |             className="w-full bg-[#0f172a] hover:bg-[#1e293b]" 
182 |             size="lg"
183 |             disabled={!!isPending}
184 |           >
185 |             {isPending === "password" ? (
186 |               <div className="flex items-center gap-2">
187 |                 <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
188 |                 Creating Account...
189 |               </div>
190 |             ) : (
191 |               "Create Account"
192 |             )}
193 |           </Button>
194 |         </form>
195 | 
196 |         <div className="flex items-center gap-4 py-2">
197 |           <Separator className="flex-1" />
198 |           <span className="text-sm text-gray-500">OR</span>
199 |           <Separator className="flex-1" />
200 |         </div>
201 | 
202 |         {/* <Button 
203 |           variant="outline" 
204 |           className="w-full h-12" 
205 |           type="button"
206 |           onClick={handleGoogleSignIn}
207 |           disabled={!!isPending}
208 |         >
209 |           {isPending === "google" ? (
210 |             <div className="flex items-center gap-2">
211 |               <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
212 |               Signing in...
213 |             </div>
214 |           ) : (
215 |             <>
216 |               <FcGoogle className="mr-2 h-5 w-5" />
217 |               Continue with Google
218 |             </>
219 |           )}
220 |         </Button>
221 | 
222 |         <Button 
223 |           variant="outline" 
224 |           className="w-full h-12" 
225 |           type="button"
226 |           onClick={handleGithubSignIn}
227 |           disabled={!!isPending}
228 |         >
229 |           {isPending === "github" ? (
230 |             <div className="flex items-center gap-2">
231 |               <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
232 |               Signing in...
233 |             </div>
234 |           ) : (
235 |             <>
236 |               <FaGithub className="mr-2 h-5 w-5" />
237 |               Continue with GitHub
238 |             </>
239 |           )}
240 |         </Button> */}
241 |       </CardContent>
242 |       <CardFooter className="flex flex-col gap-4">
243 |         <p className="text-sm text-muted-foreground text-center">
244 |           Already have an account?{" "}
245 |           <Button 
246 |             variant="link" 
247 |             className="p-0" 
248 |             onClick={() => setState("signIn")}
249 |             disabled={!!isPending}
250 |           >
251 |             Sign In
252 |           </Button>
253 |         </p>
254 |       </CardFooter>
255 |     </Card>
256 |   );
257 | }; 
```

src/app/features/auth/components/user-button.tsx
```
1 | "use client";
2 | 
3 | import {
4 |   Avatar,
5 |   AvatarFallback,
6 |   AvatarImage
7 | } from "@/components/ui/avatar";
8 | import {
9 |   DropdownMenu,
10 |   DropdownMenuContent,
11 |   DropdownMenuItem,
12 |   DropdownMenuTrigger
13 | } from "@/components/ui/dropdown-menu";
14 | import { useCurrentUser } from "../api/use-current-user";
15 | import { Loader, LogOut } from "lucide-react";
16 | import { useAuthActions } from "@convex-dev/auth/react";
17 | import { useRouter } from "next/navigation";
18 | import { useUpdatePresence } from "@/app/features/presence/hooks/use-presence";
19 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
20 | 
21 | const getRandomColor = () => {
22 |   const colors = [
23 |     "bg-indigo-500",
24 |     "bg-rose-500",
25 |     "bg-blue-500",
26 |     "bg-green-500",
27 |     "bg-orange-500",
28 |     "bg-purple-500",
29 |     "bg-teal-500",
30 |   ];
31 | 
32 |   return colors[Math.floor(Math.random() * colors.length)];
33 | };
34 | 
35 | export const UserButton = () => {
36 |   const { data, isLoading } = useCurrentUser();
37 |   const { signOut } = useAuthActions();
38 |   const router = useRouter();
39 |   const workspaceId = useWorkspaceId();
40 |   const updatePresence = useUpdatePresence();
41 | 
42 |   if (isLoading) {
43 |     return <Loader className="size-4 animate-spin text-muted-foreground" />;
44 |   }
45 | 
46 |   if (!data) {
47 |     return null;
48 |   }
49 | 
50 |   const { image, name, email } = data;
51 | 
52 |   const initials = name?.split(" ")
53 |     .map((word: string) => word[0])
54 |     .join("")
55 |     .toUpperCase()
56 |     .slice(0, 2);
57 | 
58 |   const onSignOut = async () => {
59 |     try {
60 |       await signOut();
61 |     } finally {
62 |       window.location.href = "/signin";
63 |     }
64 |   };
65 | 
66 |   return (
67 |     <DropdownMenu modal={false}>
68 |       <DropdownMenuTrigger className="outline-none relative">
69 |         <Avatar className="size-10 hover:opacity-75 rounded-md transition">
70 |           <AvatarImage className="rounded-md" src={image} alt={name} />
71 |           <AvatarFallback className={`${getRandomColor()} text-white md-rounded`}>
72 |             {initials}
73 |           </AvatarFallback>
74 |         </Avatar>
75 |       </DropdownMenuTrigger>
76 |       <DropdownMenuContent align="center" side="right" className="w-60">
77 |         <DropdownMenuItem 
78 |           className="flex items-center gap-x-2 cursor-pointer"
79 |           onClick={onSignOut}
80 |         >
81 |           <LogOut className="size-4" />
82 |           Logout
83 |         </DropdownMenuItem>
84 |       </DropdownMenuContent>
85 |     </DropdownMenu>
86 |   );
87 | };
```

src/app/features/auth/types.ts
```
1 | export type SignInFlow = "signIn" | "signUp";
2 | 
```

src/app/features/auth/use-auth-guard.ts
```
1 | import { useConvexAuth } from "convex/react";
2 | import { useRouter } from "next/navigation";
3 | import { useEffect } from "react";
4 | 
5 | export function useAuthGuard() {
6 |   const { isAuthenticated, isLoading } = useConvexAuth();
7 |   const router = useRouter();
8 | 
9 |   useEffect(() => {
10 |     if (!isLoading && !isAuthenticated) {
11 |       router.push("/signin");
12 |     }
13 |   }, [isAuthenticated, isLoading, router]);
14 | 
15 |   return { isAuthenticated, isLoading };
16 | } 
```

src/app/features/channels/api/use-create-channel.ts
```
1 | import { useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { useCallback, useMemo, useState } from "react";
4 | import { Id } from "../../../../../convex/_generated/dataModel";
5 | 
6 | type RequestType = { 
7 |     workspaceId: Id<"workspaces">;
8 |     name: string;
9 | };
10 | type ResponseType = Id<"channels"> | null;
11 | 
12 | type Options = {
13 |     onSuccess?: (data: ResponseType) => void;
14 |     onError?: (error: Error) => void;
15 |     onSettled?: () => void;
16 |     throwError?: boolean;
17 | }
18 | 
19 | export const useCreateChannel = () => {
20 |   const [data, setData] = useState<ResponseType | null>(null);
21 |   const [error, setError] = useState<Error | null>(null);
22 |   const [status, setStatus] = useState<"idle" | "pending" | "success" | "error" | "settled">("idle");
23 | 
24 |   const isPending = useMemo(() => status === "pending", [status]);
25 |   const isSuccess = useMemo(() => status === "success", [status]);
26 |   const isError = useMemo(() => status === "error", [status]);
27 |   const isSettled = useMemo(() => status === "settled", [status]);
28 | 
29 |   const mutation = useMutation(api.channels.create);
30 | 
31 |   const mutate = useCallback(async (values: RequestType, options: Options) => {
32 |     try {
33 |       setData(null);
34 |       setError(null);
35 |       setStatus("pending");
36 |       const response = await mutation(values);
37 |       setData(response);
38 |       setStatus("success");
39 |       options?.onSuccess?.(response);
40 |       return response;
41 |     } catch (error) {
42 |       setError(error as Error);
43 |       setStatus("error");
44 |       options?.onError?.(error as Error);
45 |       if (options?.throwError) {
46 |         throw error;
47 |       }
48 |       return null;
49 |     } finally {
50 |       setStatus("settled");
51 |       options?.onSettled?.();
52 |     }
53 |   }, [mutation]);
54 | 
55 |   return {
56 |     mutate,
57 |     data,
58 |     error,
59 |     isPending,
60 |     isSuccess,
61 |     isError,
62 |     isSettled,
63 |   };
64 | };
```

src/app/features/channels/api/use-create-dm.ts
```
1 | import { useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | import { useRouter } from "next/navigation";
5 | 
6 | export function useCreateDM() {
7 |   const createDM = useMutation(api.channels.createDM);
8 |   const router = useRouter();
9 | 
10 |   return async (workspaceId: Id<"workspaces">, otherUserId: Id<"users">) => {
11 |     try {
12 |       const channelId = await createDM({ workspaceId, otherUserId });
13 |       router.push(`/workspace/${workspaceId}/channel/${channelId}`);
14 |       return channelId;
15 |     } catch (error) {
16 |       console.error("Failed to create DM:", error);
17 |       throw error;
18 |     }
19 |   };
20 | } 
```

src/app/features/channels/api/use-get-channels.ts
```
1 | import { useQuery } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | 
5 | interface UseGetChannelsProps {
6 |   workspaceId: Id<"workspaces">;
7 | }
8 | 
9 | export const useGetChannels = ({ workspaceId }: UseGetChannelsProps) => {
10 |   const data = useQuery(api.channels.get, { workspaceId });
11 |   const isLoading = data === undefined;
12 | 
13 |   return { data, isLoading};
14 | }; 
```

src/app/features/channels/components/create-channel-modal.tsx
```
1 | import { Input } from "@/components/ui/input";
2 | import { useCreateChannelModal } from "../store/use-create-channel-modal";
3 | import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
4 | import { Label } from "@/components/ui/label";
5 | import { Button } from "@/components/ui/button";
6 | import { useState } from "react";
7 | import { useCreateChannel } from "@/app/features/channels/api/use-create-channel";
8 | import { toast } from "sonner";
9 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
10 | 
11 | export const CreateChannelModal = () => {
12 |     const workspaceId = useWorkspaceId();
13 |     const [open, setOpen] = useCreateChannelModal();
14 |     const { mutate, isPending } = useCreateChannel();
15 |     const [name, setName] = useState("");
16 | 
17 |     const handleClose = () => {
18 |         setOpen(false);
19 |         setName("");
20 |     };
21 | 
22 |     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
23 |         e.preventDefault();
24 | 
25 |         mutate({ workspaceId, name }, {
26 |             onSuccess: () => {
27 |                 handleClose();
28 |                 toast.success("Channel created! 🎉");
29 |             },
30 |             onError: (error: Error) => {
31 |                 toast.error("Failed to create channel");
32 |             }
33 |         });
34 |     };
35 | 
36 |     return (
37 |         <Dialog open={open} onOpenChange={handleClose}>
38 |             <DialogContent>
39 |                 <DialogHeader>
40 |                     <DialogTitle>Create a Channel</DialogTitle>
41 |                     <DialogDescription>
42 |                         Create a new channel to start collaborating with your team.
43 |                     </DialogDescription>
44 |                 </DialogHeader>
45 |                 <form className="space-y-4" onSubmit={handleSubmit}>
46 |                     <div className="flex flex-col gap-2">
47 |                         <Label>Name</Label>
48 |                         <Input 
49 |                             placeholder="e.g. marketing, design, engineering"
50 |                             value={name}
51 |                             onChange={(e) => setName(e.target.value.replace(/\s+/g, '-'))}
52 |                             disabled={isPending}
53 |                             required
54 |                             autoFocus
55 |                             minLength={1}
56 |                         />
57 |                     </div>
58 |                     <DialogFooter>
59 |                         <Button type="submit" disabled={isPending}>
60 |                             Create Channel
61 |                         </Button>
62 |                     </DialogFooter>
63 |                 </form>
64 |             </DialogContent>
65 |         </Dialog>
66 |     );
67 | };
```

src/app/features/channels/store/use-create-channel-modal.ts
```
1 | import { atom, useAtom } from "jotai";
2 | 
3 | const modalState = atom(false);
4 | 
5 | export const useCreateChannelModal = () => {
6 |   return useAtom(modalState);
7 | }; 
```

src/app/features/members/api/use-current-member.ts
```
1 | import { useQuery } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | 
5 | 
6 | interface UseCurrentMemberProps {
7 |     workspaceId: Id<"workspaces">;
8 | }
9 | 
10 | export const useCurrentMember = ({ workspaceId }: UseCurrentMemberProps) => {
11 |     const data = useQuery(api.members.current, { workspaceId });
12 |     const isLoading = data === undefined;
13 |     return { data, isLoading };
14 | };
```

src/app/features/members/api/use-get-members.ts
```
1 | import { useQuery } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | 
5 | 
6 | interface UseGetMembersProps {
7 |     workspaceId: Id<"workspaces">;
8 | }
9 | 
10 | export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
11 |     const data = useQuery(api.members.get, { workspaceId });
12 |     const isLoading = data === undefined;
13 |     return { data, isLoading };
14 | };
```

src/app/features/messages/api/use-get-messages.ts
```
1 | import { api } from "../../../../../convex/_generated/api";
2 | import { useQuery } from "convex/react";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | 
5 | export function useGetMessages(channelId: string) {
6 |   const data = useQuery(api.messages.list, { channelId: channelId as Id<"channels"> });
7 |   const isLoading = data === undefined;
8 | 
9 |   return { data, isLoading };
10 | }
```

src/app/features/messages/api/use-send-message.ts
```
1 | import { api } from "../../../../../convex/_generated/api";
2 | import { useMutation } from "convex/react";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | 
5 | export function useSendMessage() {
6 |   const sendMessage = useMutation(api.messages.send);
7 | 
8 |   return async ({ channelId, text, parentMessageId }: {
9 |     channelId: Id<"channels">;
10 |     text: string;
11 |     parentMessageId?: Id<"messages">;
12 |   }) => {
13 |     try {
14 |       await sendMessage({ channelId, text, parentMessageId });
15 |     } catch (error) {
16 |       console.error("Error sending message:", error);
17 |       throw error;
18 |     }
19 |   };
20 | }
```

src/app/features/presence/components/message-presence.tsx
```
1 | "use client";
2 | 
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | import { useUserPresence } from "../hooks/use-presence";
5 | import { PresenceIndicator } from "./presence-indicator";
6 | import { cn } from "@/lib/utils";
7 | 
8 | interface MessagePresenceProps {
9 |   workspaceId: Id<"workspaces">;
10 |   userId: Id<"users">;
11 |   className?: string;
12 | }
13 | 
14 | export function MessagePresence({ workspaceId, userId, className }: MessagePresenceProps) {
15 |   const presence = useUserPresence(workspaceId, userId);
16 | 
17 |   if (!presence) return null;
18 | 
19 |   return (
20 |     <PresenceIndicator 
21 |       status={presence.status} 
22 |       className={cn("h-2 w-2 shrink-0 ring-1 ring-white/50", className)} 
23 |     />
24 |   );
25 | } 
```

src/app/features/presence/components/presence-indicator.tsx
```
1 | import { cn } from "@/lib/utils";
2 | import { PresenceStatus } from "../hooks/use-presence";
3 | 
4 | interface PresenceIndicatorProps {
5 |   status: PresenceStatus;
6 |   className?: string;
7 | }
8 | 
9 | export function PresenceIndicator({ status, className }: PresenceIndicatorProps) {
10 |   return (
11 |     <div
12 |       className={cn(
13 |         "h-2.5 w-2.5 rounded-full",
14 |         {
15 |           "bg-emerald-400": status === "online",
16 |           "bg-amber-400": status === "away",
17 |           "bg-red-400": status === "offline",
18 |         },
19 |         className
20 |       )}
21 |     />
22 |   );
23 | }
24 | 
25 | interface PresenceWithStatusProps {
26 |   status: PresenceStatus;
27 |   customStatus?: string;
28 |   userName: string;
29 |   className?: string;
30 | }
31 | 
32 | export function PresenceWithStatus({
33 |   status,
34 |   customStatus,
35 |   userName,
36 |   className,
37 | }: PresenceWithStatusProps) {
38 |   return (
39 |     <div className={cn("flex items-center gap-2", className)}>
40 |       <PresenceIndicator status={status} />
41 |       <div>
42 |         <div className="font-medium text-sm text-white">{userName}</div>
43 |         {customStatus && (
44 |           <div className="text-xs text-zinc-400">{customStatus}</div>
45 |         )}
46 |       </div>
47 |     </div>
48 |   );
49 | } 
```

src/app/features/presence/components/workspace-presence.tsx
```
1 | "use client";
2 | 
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | import { usePresence } from "../hooks/use-presence";
5 | import { PresenceWithStatus } from "./presence-indicator";
6 | import { WorkspaceSection } from "@/app/workspace/[workspaceId]/workspace-section";
7 | 
8 | interface WorkspacePresenceProps {
9 |   workspaceId: Id<"workspaces">;
10 |   className?: string;
11 | }
12 | 
13 | export function WorkspacePresence({ workspaceId, className }: WorkspacePresenceProps) {
14 |   const presenceData = usePresence(workspaceId);
15 | 
16 |   if (!presenceData) return null;
17 | 
18 |   // Sort by status: online first, then away, then offline
19 |   const sortedPresence = [...presenceData].sort((a, b) => {
20 |     const statusOrder = { online: 0, away: 1, offline: 2 };
21 |     return statusOrder[a.status] - statusOrder[b.status];
22 |   });
23 | 
24 |   return (
25 |     <WorkspaceSection label="Members" className={className}>
26 |       {sortedPresence.map((presence) => (
27 |         <PresenceWithStatus
28 |           key={presence.userId}
29 |           status={presence.status}
30 |           customStatus={presence.customStatus}
31 |           userName={presence.userName}
32 |           className="px-2 py-1.5 rounded-md hover:bg-emerald-900/50 transition-colors"
33 |         />
34 |       ))}
35 |     </WorkspaceSection>
36 |   );
37 | } 
```

src/app/features/presence/hooks/use-presence.ts
```
1 | import { useQuery, useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | import { useEffect, useCallback, useRef } from "react";
5 | 
6 | export type PresenceStatus = "online" | "offline" | "away";
7 | 
8 | export function usePresence(workspaceId: Id<"workspaces">) {
9 |   const updatePresence = useMutation(api.presence.updatePresence);
10 |   const presenceData = useQuery(api.presence.getWorkspacePresence, { workspaceId });
11 |   const user = useQuery(api.users.current);
12 |   const mountedRef = useRef(true);
13 | 
14 |   const updateStatus = useCallback(async (status: PresenceStatus) => {
15 |     if (!mountedRef.current) return;
16 |     try {
17 |       await updatePresence({
18 |         workspaceId,
19 |         status,
20 |       });
21 |     } catch (e) {
22 |       // Silently handle errors
23 |     }
24 |   }, [workspaceId, updatePresence]);
25 | 
26 |   // Update presence on mount and set interval
27 |   useEffect(() => {
28 |     if (!user) return;
29 | 
30 |     // Set initial status
31 |     updateStatus("online");
32 | 
33 |     // Set up interval for updates
34 |     const interval = setInterval(() => {
35 |       if (mountedRef.current) {
36 |         updateStatus("online");
37 |       }
38 |     }, 30000);
39 | 
40 |     // Handle visibility changes
41 |     const handleVisibilityChange = () => {
42 |       if (!mountedRef.current) return;
43 |       updateStatus(document.hidden ? "away" : "online");
44 |     };
45 | 
46 |     document.addEventListener("visibilitychange", handleVisibilityChange);
47 | 
48 |     // Cleanup
49 |     return () => {
50 |       mountedRef.current = false;
51 |       clearInterval(interval);
52 |       document.removeEventListener("visibilitychange", handleVisibilityChange);
53 |     };
54 |   }, [user, updateStatus]);
55 | 
56 |   return presenceData;
57 | }
58 | 
59 | export function useUserPresence(workspaceId: Id<"workspaces">, userId: Id<"users">) {
60 |   return useQuery(api.presence.getUserPresence, { workspaceId, userId });
61 | }
62 | 
63 | export function useUpdatePresence() {
64 |   return useMutation(api.presence.updatePresence);
65 | } 
```

src/app/features/workspaces/api/use-create-workspace.ts
```
1 | import { useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { useCallback, useMemo, useState } from "react";
4 | import { Id } from "../../../../../convex/_generated/dataModel";
5 | 
6 | type RequestType = { name: string };
7 | type ResponseType = {
8 |   success: boolean;
9 |   message: string;
10 |   workspaceId: Id<"workspaces"> | null;
11 | };
12 | 
13 | type Options = {
14 |     onSuccess?: (data: ResponseType) => void;
15 |     onError?: (error: Error) => void;
16 |     onSettled?: () => void;
17 |     throwError?: boolean;
18 | }
19 | 
20 | export const useCreateWorkspace = () => {
21 |   const [data, setData] = useState<ResponseType | null>(null);
22 |   const [error, setError] = useState<Error | null>(null);
23 |   const [status, setStatus] = useState<"idle" | "pending" | "success" | "error" | "settled">("idle");
24 | 
25 |   const isPending = useMemo(() => status === "pending", [status]);
26 |   const isSuccess = useMemo(() => status === "success", [status]);
27 |   const isError = useMemo(() => status === "error", [status]);
28 |   const isSettled = useMemo(() => status === "settled", [status]);
29 | 
30 |   const mutation = useMutation(api.workspaces.create);
31 | 
32 |   const mutate = useCallback(async (values: RequestType, options: Options) => {
33 |     try {
34 |       setData(null);
35 |       setError(null);
36 |       setStatus("pending");
37 |       const response = await mutation(values);
38 |       setData(response);
39 |       setStatus("success");
40 |       options?.onSuccess?.(response);
41 |       return response;
42 |     } catch (error) {
43 |       setError(error as Error);
44 |       setStatus("error");
45 |       options?.onError?.(error as Error);
46 |       if (options?.throwError) {
47 |         throw error;
48 |       }
49 |       return null;
50 |     } finally {
51 |       setStatus("settled");
52 |       options?.onSettled?.();
53 |     }
54 |   }, [mutation]);
55 | 
56 |   return {
57 |     mutate,
58 |     data,
59 |     error,
60 |     isPending,
61 |     isSuccess,
62 |     isError,
63 |     isSettled,
64 |   };
65 | };
```

src/app/features/workspaces/api/use-get-workspace-info.ts
```
1 | import { useQuery } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | 
5 | 
6 | interface UseGetWorkspaceInfoProps {
7 |   id: Id<"workspaces">;
8 | }
9 | 
10 | export const useGetWorkspaceInfo = ({ id }: UseGetWorkspaceInfoProps) => {
11 |   const data = useQuery(api.workspaces.getInfoById, { id });
12 |   const isLoading = data === undefined;
13 | 
14 |   return {
15 |     data,
16 |     isLoading
17 |   };
18 | }; 
```

src/app/features/workspaces/api/use-get-workspace.ts
```
1 | import { useQuery } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { Id } from "../../../../../convex/_generated/dataModel";
4 | 
5 | 
6 | interface UseGetWorkspaceProps {
7 |   id: Id<"workspaces">;
8 | }
9 | 
10 | export const useGetWorkspace = ({ id }: UseGetWorkspaceProps) => {
11 |   const data = useQuery(api.workspaces.getById, { id });
12 |   const isLoading = data === undefined;
13 | 
14 |   return {
15 |     data,
16 |     isLoading
17 |   };
18 | }; 
```

src/app/features/workspaces/api/use-get-workspaces.ts
```
1 | import { useQuery } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | 
4 | export const useGetWorkspaces = () => {
5 |   const data = useQuery(api.workspaces.get);
6 |   const isLoading = data === undefined;
7 | 
8 |   return {
9 |     data,
10 |     isLoading
11 |   };
12 | }; 
```

src/app/features/workspaces/api/use-join.ts
```
1 | import { useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { useCallback, useMemo, useState } from "react";
4 | import { Id } from "../../../../../convex/_generated/dataModel";
5 | 
6 | type RequestType = { 
7 |     id: Id<"workspaces">;
8 |     code: string;
9 | };
10 | type ResponseType = {
11 |   success: boolean;
12 |   message: string;
13 |   workspaceId: Id<"workspaces"> | null;
14 | };
15 | 
16 | type Options = {
17 |     onSuccess?: (data: ResponseType) => void;
18 |     onError?: (error: Error) => void;
19 |     onSettled?: () => void;
20 |     throwError?: boolean;
21 | }
22 | 
23 | export const useJoin = () => {
24 |   const [data, setData] = useState<ResponseType | null>(null);
25 |   const [error, setError] = useState<Error | null>(null);
26 |   const [status, setStatus] = useState<"idle" | "pending" | "success" | "error" | "settled">("idle");
27 | 
28 |   const isPending = useMemo(() => status === "pending", [status]);
29 |   const isSuccess = useMemo(() => status === "success", [status]);
30 |   const isError = useMemo(() => status === "error", [status]);
31 |   const isSettled = useMemo(() => status === "settled", [status]);
32 | 
33 |   const mutation = useMutation(api.workspaces.join);
34 | 
35 |   const mutate = useCallback(async (values: RequestType, options: Options) => {
36 |     try {
37 |       setData(null);
38 |       setError(null);
39 |       setStatus("pending");
40 |       const response = await mutation(values);
41 |       setData(response);
42 |       setStatus("success");
43 |       options?.onSuccess?.(response);
44 |       return response;
45 |     } catch (error) {
46 |       setError(error as Error);
47 |       setStatus("error");
48 |       options?.onError?.(error as Error);
49 |       if (options?.throwError) {
50 |         throw error;
51 |       }
52 |       return null;
53 |     } finally {
54 |       setStatus("settled");
55 |       options?.onSettled?.();
56 |     }
57 |   }, [mutation]);
58 | 
59 |   return {
60 |     mutate,
61 |     data,
62 |     error,
63 |     isPending,
64 |     isSuccess,
65 |     isError,
66 |     isSettled,
67 |   };
68 | };
```

src/app/features/workspaces/api/use-new-join-code.ts
```
1 | import { useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { useCallback, useMemo, useState } from "react";
4 | import { Id } from "../../../../../convex/_generated/dataModel";
5 | 
6 | type RequestType = { id: Id<"workspaces"> };
7 | type ResponseType = Id<"workspaces"> | null;
8 | 
9 | type Options = {
10 |     onSuccess?: (data: ResponseType) => void;
11 |     onError?: (error: Error) => void;
12 |     onSettled?: () => void;
13 |     throwError?: boolean;
14 | }
15 | 
16 | export const useNewJoinCode = () => {
17 |   const [data, setData] = useState<ResponseType | null>(null);
18 |   const [error, setError] = useState<Error | null>(null);
19 |   const [status, setStatus] = useState<"idle" | "pending" | "success" | "error" | "settled">("idle");
20 | 
21 |   const isPending = useMemo(() => status === "pending", [status]);
22 |   const isSuccess = useMemo(() => status === "success", [status]);
23 |   const isError = useMemo(() => status === "error", [status]);
24 |   const isSettled = useMemo(() => status === "settled", [status]);
25 | 
26 |   const mutation = useMutation(api.workspaces.newJoinCode);
27 | 
28 |   const mutate = useCallback(async (values: RequestType, options: Options) => {
29 |     try {
30 |       setData(null);
31 |       setError(null);
32 |       setStatus("pending");
33 |       const response = await mutation(values);
34 |       setData(response);
35 |       setStatus("success");
36 |       options?.onSuccess?.(response);
37 |       return response;
38 |     } catch (error) {
39 |       setError(error as Error);
40 |       setStatus("error");
41 |       options?.onError?.(error as Error);
42 |       if (options?.throwError) {
43 |         throw error;
44 |       }
45 |       return null;
46 |     } finally {
47 |       setStatus("settled");
48 |       options?.onSettled?.();
49 |     }
50 |   }, [mutation]);
51 | 
52 |   return {
53 |     mutate,
54 |     data,
55 |     error,
56 |     isPending,
57 |     isSuccess,
58 |     isError,
59 |     isSettled,
60 |   };
61 | };
```

src/app/features/workspaces/api/use-remove-workspace.ts
```
1 | import { useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { useCallback, useMemo, useState } from "react";
4 | import { Id } from "../../../../../convex/_generated/dataModel";
5 | 
6 | 
7 | type RequestType = { id: Id<"workspaces"> };
8 | type ResponseType = Id<"workspaces"> | null;
9 | 
10 | 
11 | type Options = {
12 |     onSuccess?: (data: ResponseType) => void;
13 |     onError?: (error: Error) => void;
14 |     onSettled?: () => void;
15 |     throwError?: boolean;
16 | }
17 | 
18 | export const useRemoveWorkspace = () => {
19 |   const [data, setData] = useState<ResponseType | null>(null);
20 |   const [error, setError] = useState<Error | null>(null);
21 |   const [status, setStatus] = useState<"idle" | "pending" | "success" | "error" | "settled">("idle");
22 | 
23 |   const isPending = useMemo(() => status === "pending", [status]);
24 |   const isSuccess = useMemo(() => status === "success", [status]);
25 |   const isError = useMemo(() => status === "error", [status]);
26 |   const isSettled = useMemo(() => status === "settled", [status]);
27 | 
28 |   const mutation = useMutation(api.workspaces.remove);
29 | 
30 |   const mutate = useCallback(async (values: RequestType, options: Options) => {
31 |     try {
32 |       setData(null);
33 |       setError(null);
34 |       setStatus("pending");
35 |       const response = await mutation(values);
36 |       setData(response);
37 |       setStatus("success");
38 |       options?.onSuccess?.(response);
39 |       return response;
40 |     } catch (error) {
41 |       setError(error as Error);
42 |       setStatus("error");
43 |       options?.onError?.(error as Error);
44 |       if (options?.throwError) {
45 |         throw error;
46 |       }
47 |       return null;
48 |     } finally {
49 |       setStatus("settled");
50 |       options?.onSettled?.();
51 |     }
52 |   }, [mutation]);
53 | 
54 |   return {
55 |     mutate,
56 |     data,
57 |     error,
58 |     isPending,
59 |     isSuccess,
60 |     isError,
61 |     isSettled,
62 |   };
63 | };
```

src/app/features/workspaces/api/use-update-workspace.ts
```
1 | import { useMutation } from "convex/react";
2 | import { api } from "../../../../../convex/_generated/api";
3 | import { useCallback, useMemo, useState } from "react";
4 | import { Id } from "../../../../../convex/_generated/dataModel";
5 | 
6 | 
7 | type RequestType = { id: Id<"workspaces">, name: string };
8 | type ResponseType = Id<"workspaces"> | null;
9 | 
10 | 
11 | type Options = {
12 |     onSuccess?: (data: ResponseType) => void;
13 |     onError?: (error: Error) => void;
14 |     onSettled?: () => void;
15 |     throwError?: boolean;
16 | }
17 | 
18 | export const useUpdateWorkspace = () => {
19 |   const [data, setData] = useState<ResponseType | null>(null);
20 |   const [error, setError] = useState<Error | null>(null);
21 |   const [status, setStatus] = useState<"idle" | "pending" | "success" | "error" | "settled">("idle");
22 | 
23 |   const isPending = useMemo(() => status === "pending", [status]);
24 |   const isSuccess = useMemo(() => status === "success", [status]);
25 |   const isError = useMemo(() => status === "error", [status]);
26 |   const isSettled = useMemo(() => status === "settled", [status]);
27 | 
28 |   const mutation = useMutation(api.workspaces.update);
29 | 
30 |   const mutate = useCallback(async (values: RequestType, options: Options) => {
31 |     try {
32 |       setData(null);
33 |       setError(null);
34 |       setStatus("pending");
35 |       const response = await mutation(values);
36 |       setData(response);
37 |       setStatus("success");
38 |       options?.onSuccess?.(response);
39 |       return response;
40 |     } catch (error) {
41 |       setError(error as Error);
42 |       setStatus("error");
43 |       options?.onError?.(error as Error);
44 |       if (options?.throwError) {
45 |         throw error;
46 |       }
47 |       return null;
48 |     } finally {
49 |       setStatus("settled");
50 |       options?.onSettled?.();
51 |     }
52 |   }, [mutation]);
53 | 
54 |   return {
55 |     mutate,
56 |     data,
57 |     error,
58 |     isPending,
59 |     isSuccess,
60 |     isError,
61 |     isSettled,
62 |   };
63 | };
```

src/app/features/workspaces/components/create-workspace-modal.tsx
```
1 | "use client";
2 | 
3 | import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
4 | import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";
5 | import { Input } from "@/components/ui/input";
6 | import { Button } from "@/components/ui/button";
7 | import { DialogFooter } from "@/components/ui/dialog";
8 | import { useCreateWorkspace } from "../api/use-create-workspace";
9 | import { toast } from "sonner";
10 | import { useState } from "react";
11 | import { useRouter } from "next/navigation";
12 | 
13 | export const CreateWorkspaceModal = () => {
14 |   const router = useRouter();
15 |   const [open, setOpen] = useCreateWorkspaceModal();
16 |   const { mutate, isPending } = useCreateWorkspace();
17 |   const [name, setName] = useState("");
18 | 
19 |   const handleClose = () => {
20 |     setOpen(false);
21 |     setName("");
22 |   };
23 | 
24 |   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
25 |     e.preventDefault();
26 | 
27 |     mutate({ name }, {
28 |       onSuccess: (res: any) => {
29 |         if (!res?.success) {
30 |           toast.error(res?.message || "Failed to create workspace");
31 |           return;
32 |         }
33 |         // res.workspaceId is now a string
34 |         router.push(`/workspace/${res.workspaceId}`);
35 |         handleClose();
36 |         toast.success("Workspace created! 🎉");
37 |       },
38 |       onError: () => {
39 |         toast.error("Failed to create workspace");
40 |       }
41 |     });
42 |   };
43 | 
44 |   return (
45 |     <Dialog open={open} onOpenChange={handleClose}>
46 |       <DialogContent>
47 |         <DialogHeader>
48 |           <DialogTitle>Create a workspace</DialogTitle>
49 |         </DialogHeader>
50 |         <form className="space-y-4" onSubmit={handleSubmit}>
51 |           <Input 
52 |             value={name}
53 |             onChange={(e) => setName(e.target.value)}
54 |             disabled={isPending}
55 |             required
56 |             autoFocus
57 |             minLength={3}
58 |             placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
59 |             className="h-12"
60 |           />
61 |           <DialogFooter className="flex justify-end">
62 |             <Button type="submit" disabled={isPending}>
63 |               Create
64 |             </Button>
65 |           </DialogFooter>
66 |         </form>
67 |       </DialogContent>
68 |     </Dialog>
69 |   );
70 | };
```

src/app/features/workspaces/store/use-create-workspace-modal.ts
```
1 | import { atom, useAtom } from "jotai";
2 | 
3 | const modalState = atom(false);
4 | 
5 | export const useCreateWorkspaceModal = () => {
6 |   return useAtom(modalState);
7 | }; 
```

src/app/globals.css
```
1 | @tailwind base;
2 | @tailwind components;
3 | @tailwind utilities;
4 | 
5 | html,
6 | body,
7 | #root {
8 |   height: 100%;
9 | }
10 | 
11 | 
12 | 
13 | @layer base {
14 |   :root {
15 |     --background: 0 0% 100%;
16 |     --foreground: 240 10% 3.9%;
17 |     --card: 0 0% 100%;
18 |     --card-foreground: 240 10% 3.9%;
19 |     --popover: 0 0% 100%;
20 |     --popover-foreground: 240 10% 3.9%;
21 |     --primary: 240 5.9% 10%;
22 |     --primary-foreground: 0 0% 98%;
23 |     --secondary: 240 4.8% 95.9%;
24 |     --secondary-foreground: 240 5.9% 10%;
25 |     --muted: 240 4.8% 95.9%;
26 |     --muted-foreground: 240 3.8% 46.1%;
27 |     --accent: 240 4.8% 95.9%;
28 |     --accent-foreground: 240 5.9% 10%;
29 |     --destructive: 0 84.2% 60.2%;
30 |     --destructive-foreground: 0 0% 98%;
31 |     --border: 240 5.9% 90%;
32 |     --input: 240 5.9% 90%;
33 |     --ring: 240 10% 3.9%;
34 |     --chart-1: 12 76% 61%;
35 |     --chart-2: 173 58% 39%;
36 |     --chart-3: 197 37% 24%;
37 |     --chart-4: 43 74% 66%;
38 |     --chart-5: 27 87% 67%;
39 |     --radius: 0.5rem;
40 |   }
41 |   .dark {
42 |     --background: 240 10% 3.9%;
43 |     --foreground: 0 0% 98%;
44 |     --card: 240 10% 3.9%;
45 |     --card-foreground: 0 0% 98%;
46 |     --popover: 240 10% 3.9%;
47 |     --popover-foreground: 0 0% 98%;
48 |     --primary: 0 0% 98%;
49 |     --primary-foreground: 240 5.9% 10%;
50 |     --secondary: 240 3.7% 15.9%;
51 |     --secondary-foreground: 0 0% 98%;
52 |     --muted: 240 3.7% 15.9%;
53 |     --muted-foreground: 240 5% 64.9%;
54 |     --accent: 240 3.7% 15.9%;
55 |     --accent-foreground: 0 0% 98%;
56 |     --destructive: 0 62.8% 30.6%;
57 |     --destructive-foreground: 0 0% 98%;
58 |     --border: 240 3.7% 15.9%;
59 |     --input: 240 3.7% 15.9%;
60 |     --ring: 240 4.9% 83.9%;
61 |     --chart-1: 220 70% 50%;
62 |     --chart-2: 160 60% 45%;
63 |     --chart-3: 30 80% 55%;
64 |     --chart-4: 280 65% 60%;
65 |     --chart-5: 340 75% 55%;
66 |   }
67 | }
68 | 
69 | @layer base {
70 |   * {
71 |     @apply border-border;
72 |   }
73 |   body {
74 |     @apply bg-background text-foreground;
75 |   }
76 | }
```

src/app/join/[workspaceId]/page.tsx
```
1 | "use client";
2 | 
3 | import Link from "next/link";
4 | import { Button } from "@/components/ui/button";
5 | import VerificationInput from "react-verification-input";
6 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
7 | import { useGetWorkspaceInfo } from "@/app/features/workspaces/api/use-get-workspace-info";
8 | import { Skeleton } from "@/components/ui/skeleton";
9 | import { Loader, MessageCircle } from "lucide-react";
10 | import { useJoin } from "@/app/features/workspaces/api/use-join";
11 | import { toast } from "sonner";
12 | import { useRouter } from "next/navigation";
13 | 
14 | const LoadingState = () => {
15 |   return (
16 |     <div className="h-full flex flex-col items-center justify-center bg-emerald-50/30">
17 |       <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
18 |         <div className="p-3 bg-emerald-100 rounded-full mb-4">
19 |           <Loader className="h-8 w-8 animate-spin text-emerald-600" />
20 |         </div>
21 |         <div className="space-y-4">
22 |           <Skeleton className="h-8 w-[200px] mx-auto" />
23 |           <Skeleton className="h-5 w-[250px] mx-auto" />
24 |           <Skeleton className="h-12 w-[300px] mx-auto" />
25 |           <Skeleton className="h-8 w-[100px] mx-auto" />
26 |         </div>
27 |       </div>
28 |     </div>
29 |   );
30 | };
31 | 
32 | const JoinPage = () => {
33 |   const workspaceId = useWorkspaceId();
34 |   const router = useRouter();
35 |   const { mutate, isPending } = useJoin();
36 |   const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
37 | 
38 |   const handleComplete = (value: string) => {
39 |     const cleanCode = value.trim().toUpperCase();
40 | 
41 |     // Enforce 6 digits
42 |     if (cleanCode.length !== 6) {
43 |       toast.error("Invalid workspace code. Must be 6 characters.");
44 |       return;
45 |     }
46 | 
47 |     mutate(
48 |       { id: workspaceId, code: cleanCode },
49 |       {
50 |         onSuccess: (res: any) => {
51 |           if (!res?.success) {
52 |             if (res?.message) {
53 |               toast.error(res.message);
54 |             } else {
55 |               toast.error("Failed to join. Please try again.");
56 |             }
57 |             return;
58 |           }
59 |           router.push(`/workspace/${res.workspaceId}`);
60 |           toast.success("Welcome to the workspace!");
61 |         },
62 |         onError: (error) => {
63 |           console.error("JOIN ERROR:", error.message);
64 |           toast.error("Failed to join workspace. Please try again.");
65 |         },
66 |         throwError: false
67 |       }
68 |     );
69 |   };
70 | 
71 |   if (isLoading) {
72 |     return <LoadingState />;
73 |   }
74 | 
75 |   return (
76 |     <div className="h-full flex flex-col items-center justify-center bg-emerald-50/30">
77 |       <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
78 |         <div className="p-3 bg-emerald-100 rounded-full mb-4">
79 |           <MessageCircle className="h-8 w-8 text-emerald-600" />
80 |         </div>
81 |         <div className="flex flex-col gap-y-2 items-center justify-center mb-6">
82 |           <h1 className="text-2xl font-semibold text-emerald-900">
83 |             Join the "{data?.name}" Workspace
84 |           </h1>
85 |           <p className="text-emerald-600">
86 |             Enter the workspace code to join the conversation
87 |           </p>
88 |         </div>
89 |         <div className="mb-6">
90 |           <VerificationInput
91 |             length={6}
92 |             onComplete={handleComplete}
93 |             classNames={{
94 |               container: "gap-2",
95 |               character: "w-10 h-12 rounded-md border-2 border-emerald-200 text-emerald-900 font-medium text-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500",
96 |               characterInactive: "border-emerald-100",
97 |               characterSelected: "border-emerald-500",
98 |             }}
99 |           />
100 |         </div>
101 |         <Button 
102 |           variant="ghost" 
103 |           size="sm" 
104 |           className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50" 
105 |           asChild
106 |         >
107 |           <Link href="/">
108 |             Back to home
109 |           </Link>
110 |         </Button>
111 |       </div>
112 |     </div>
113 |   );
114 | };
115 | 
116 | export default JoinPage;
```

src/app/layout.tsx
```
1 | import type { Metadata } from "next";
2 | import { Geist, Geist_Mono } from "next/font/google";
3 | import "./globals.css";
4 | import { ConvexClientProvider } from "@/components/ConvexClientProvider";
5 | import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
6 | import { CreateWorkspaceModal } from "@/app/features/workspaces/components/create-workspace-modal";
7 | import { Toaster } from "sonner";
8 | import { JotaiProvider } from "@/components/jotai-provider";
9 | import { Modals } from "@/components/modals";
10 | 
11 | const geistSans = Geist({
12 |   variable: "--font-geist-sans",
13 |   subsets: ["latin"],
14 | });
15 | 
16 | const geistMono = Geist_Mono({
17 |   variable: "--font-geist-mono",
18 |   subsets: ["latin"],
19 | });
20 | 
21 | export const metadata: Metadata = {
22 |   title: "Create Next App",
23 |   description: "Generated by create next app",
24 | };
25 | 
26 | export default function RootLayout({
27 |   children,
28 | }: Readonly<{
29 |   children: React.ReactNode;
30 | }>) {
31 |   return (
32 |     <html lang="en">
33 |       <body
34 |         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
35 |       >
36 |         <ConvexAuthNextjsServerProvider>
37 |           <ConvexClientProvider>
38 |             <JotaiProvider>
39 |               <Toaster />
40 |               <Modals />
41 |               {children}
42 |             </JotaiProvider>
43 |           </ConvexClientProvider>
44 |         </ConvexAuthNextjsServerProvider>
45 |       </body>
46 |     </html>
47 |   );
48 | }
```

src/app/page.tsx
```
1 | 'use client';
2 | 
3 | import { useAuthActions } from "@convex-dev/auth/react";
4 | import { Button } from "@/components/ui/button";
5 | import { useRouter } from "next/navigation";
6 | import { UserButton } from "./features/auth/components/user-button";
7 | import { useGetWorkspaces } from "./features/workspaces/api/use-get-workspaces";
8 | import { useMemo, useEffect } from "react";
9 | import { useCreateWorkspaceModal } from "./features/workspaces/store/use-create-workspace-modal";
10 | 
11 | export default function Home() {
12 | 
13 |   const { signOut } = useAuthActions();
14 |   const router = useRouter();
15 |   const { data, isLoading } = useGetWorkspaces();
16 |   const [open, setOpen] = useCreateWorkspaceModal();
17 | 
18 |   const workspaceId = useMemo(() => data?.[0]?._id, [data]);
19 | 
20 |   useEffect(() => {
21 |     if (isLoading) return;
22 | 
23 |     if (workspaceId) {
24 |       router.push(`/workspace/${workspaceId}`);
25 |     } else if (!open) {
26 |       setOpen(true);
27 |     }
28 |   }, [workspaceId, isLoading, open, setOpen, router]);
29 | 
30 |   const handleSignOut = async () => {
31 |     await signOut();
32 |     router.push("/signin");
33 |   };
34 | 
35 |   return (
36 |     <div className="min-h-screen flex flex-col items-center justify-center gap-4">
37 |       {/* <UserButton />
38 |       <h1 className="text-2xl font-bold">Logged in</h1>
39 |       {isLoading && <p>Loading workspaces...</p>}
40 |       {data?.map((workspace) => (
41 |         <div key={workspace._id}>
42 |           <p>{workspace.name}</p>
43 |         </div>
44 |       ))}
45 |       <Button 
46 |         variant="outline"
47 |         onClick={handleSignOut}
48 |       >
49 |         Sign Out
50 |       </Button> */}
51 |     </div>
52 |   );
53 | }
```

src/app/signin/page.tsx
```
1 | 'use client';
2 | 
3 | 
4 | import { AuthScreen } from "../features/auth/components/auth-screen";
5 | 
6 | export default function SignInPage() {
7 |   return (
8 |     <div className="min-h-screen flex items-center justify-center bg-[#014421]">
9 |       <div className="w-full max-w-md space-y-4">
10 |         <h1 className="text-4xl font-bold text-white text-center">chat4me</h1>
11 |         <AuthScreen />
12 |       </div>
13 |     </div>
14 |   );
15 | } 
```

src/app/workspace/[workspaceId]/channel/[channelId]/page.tsx
```
1 | "use client";
2 | 
3 | import { useParams } from "next/navigation";
4 | import { useState, useRef, useEffect } from "react";
5 | import { useGetMessages } from "@/app/features/messages/api/use-get-messages";
6 | import { useSendMessage } from "@/app/features/messages/api/use-send-message";
7 | import { Button } from "@/components/ui/button";
8 | import { Input } from "@/components/ui/input";
9 | import { ThreadPanel } from "./thread-panel";
10 | import { useQuery, useMutation } from "convex/react";
11 | import { api } from "../../../../../../convex/_generated/api";
12 | import { EmojiPicker } from "@/components/emoji-picker";
13 | import { MessageSquare, Users, UserPlus, Smile, Hash, Circle } from "lucide-react";
14 | import { Id } from "../../../../../../convex/_generated/dataModel";
15 | import { MessagePresence } from "@/app/features/presence/components/message-presence";
16 | import { usePresence } from "@/app/features/presence/hooks/use-presence";
17 | import { useGetMembers } from "@/app/features/members/api/use-get-members";
18 | import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
19 | import { InviteModal } from "../../invite-modal";
20 | import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
21 | import { cn } from "@/lib/utils";
22 | 
23 | const EMOJI_MAP: Record<string, string> = {
24 |   thumbs_up: "👍",
25 |   heart: "❤️",
26 |   smile: "😊",
27 |   party: "🎉",
28 |   fire: "🔥",
29 |   eyes: "👀",
30 |   "100": "💯",
31 |   sparkles: "✨",
32 |   raised_hands: "🙌",
33 |   clap: "👏",
34 | };
35 | 
36 | const ChannelHeader = ({ channel }: { channel: any }) => {
37 |   const isDM = channel.type === "dm";
38 |   
39 |   return (
40 |     <div className="flex items-center px-6 py-4 border-b bg-white shadow-sm">
41 |       <div className="flex items-center gap-3">
42 |         {isDM ? (
43 |           <>
44 |             <Circle className="h-3 w-3 text-emerald-500 shrink-0" />
45 |             <h1 className="text-xl font-semibold text-emerald-900">{channel.name}</h1>
46 |           </>
47 |         ) : (
48 |           <>
49 |             <Hash className="h-5 w-5 text-emerald-700 shrink-0" />
50 |             <h1 className="text-xl font-semibold text-emerald-900">{channel.name}</h1>
51 |           </>
52 |         )}
53 |       </div>
54 |     </div>
55 |   );
56 | };
57 | 
58 | export default function ChannelPage() {
59 |   const params = useParams();
60 |   const channelId = params.channelId as string;
61 |   const workspaceId = params.workspaceId as Id<"workspaces">;
62 |   const messagesEndRef = useRef<HTMLDivElement>(null);
63 |   const [isFirstLoad, setIsFirstLoad] = useState(true);
64 |   const [inviteModalOpen, setInviteModalOpen] = useState(false);
65 |   
66 |   // Initialize presence
67 |   usePresence(workspaceId);
68 | 
69 |   const { data: workspace } = useGetWorkspace({ id: workspaceId });
70 |   const { data: members } = useGetMembers({ workspaceId });
71 |   const { data: channels } = useGetChannels({ workspaceId });
72 |   const messages = useQuery(api.messages.list, { channelId: channelId as Id<"channels"> });
73 |   const sendMessage = useMutation(api.messages.send);
74 |   const toggleReaction = useMutation(api.messages.toggleReaction);
75 | 
76 |   const currentChannel = channels?.find(c => c._id === channelId);
77 | 
78 |   const [text, setText] = useState("");
79 |   const [selectedThread, setSelectedThread] = useState<Id<"messages"> | null>(null);
80 | 
81 |   // Initial scroll to bottom without animation
82 |   useEffect(() => {
83 |     if (messages && isFirstLoad) {
84 |       messagesEndRef.current?.scrollIntoView();
85 |       setIsFirstLoad(false);
86 |     }
87 |   }, [messages, isFirstLoad]);
88 | 
89 |   // Smooth scroll to bottom for new messages
90 |   useEffect(() => {
91 |     if (!isFirstLoad && messages) {
92 |       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
93 |     }
94 |   }, [messages, isFirstLoad]);
95 | 
96 |   const handleReaction = async (messageId: Id<"messages">, emoji: string) => {
97 |     try {
98 |       await toggleReaction({ messageId, emoji });
99 |     } catch (error) {
100 |       console.error("Error toggling reaction:", error);
101 |     }
102 |   };
103 | 
104 |   const handleSend = async () => {
105 |     if (!text) return;
106 |     try {
107 |       await sendMessage({ 
108 |         channelId: channelId as Id<"channels">, 
109 |         text,
110 |         parentMessageId: selectedThread || undefined
111 |       });
112 |       setText("");
113 |     } catch (error) {
114 |       console.error("Error sending message:", error);
115 |     }
116 |   };
117 | 
118 |   const Message = ({ msg }: { msg: any }) => {
119 |     const replyCount = useQuery(api.messages.getReplyCount, { messageId: msg._id }) ?? 0;
120 |     const params = useParams();
121 |     const workspaceId = params.workspaceId as Id<"workspaces">;
122 |     const currentChannel = channels?.find(c => c._id === channelId);
123 |     const isDM = currentChannel?.type === "dm";
124 |     
125 |     if (!isDM) {
126 |       return (
127 |         <div className="border border-emerald-100 p-3 rounded-lg hover:bg-emerald-50/50 transition bg-white shadow-sm">
128 |           <div className="text-sm text-emerald-800 flex justify-between items-center mb-2">
129 |             <div className="flex items-center gap-2">
130 |               <strong className="font-medium text-emerald-900">{msg.userName}</strong>
131 |               {msg.isAI && (
132 |                 <span className="text-xs text-emerald-400 flex items-center gap-1">
133 |                   <span className="inline-block w-3 h-3">🤖</span>
134 |                   <span className="opacity-75">AI</span>
135 |                 </span>
136 |               )}
137 |               <MessagePresence 
138 |                 workspaceId={workspaceId} 
139 |                 userId={msg.userId} 
140 |                 className="h-2 w-2 shrink-0" 
141 |               />
142 |               <span className="text-xs text-emerald-500">
143 |                 {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
144 |               </span>
145 |             </div>
146 |             <div className="flex items-center gap-2">
147 |               {replyCount > 0 && (
148 |                 <button
149 |                   className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
150 |                   onClick={() => setSelectedThread(msg._id)}
151 |                 >
152 |                   <MessageSquare className="h-3 w-3" />
153 |                   {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
154 |                 </button>
155 |               )}
156 |               <Button
157 |                 variant="ghost"
158 |                 size="sm"
159 |                 className="py-1 h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
160 |                 onClick={() => setSelectedThread(msg._id)}
161 |               >
162 |                 Reply
163 |               </Button>
164 |             </div>
165 |           </div>
166 |           <div className="text-sm text-emerald-900 leading-relaxed">{msg.text}</div>
167 |           <div className="mt-3 flex flex-wrap gap-1">
168 |             {Object.entries(msg.reactions || {}).map(([code, data]: [string, any]) => (
169 |               <button
170 |                 key={code}
171 |                 onClick={() => handleReaction(msg._id, code)}
172 |                 className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full text-sm transition-colors"
173 |               >
174 |                 <span>{EMOJI_MAP[code] || code}</span>
175 |                 <span className="text-xs text-emerald-600">{data.count}</span>
176 |               </button>
177 |             ))}
178 |             <EmojiPicker
179 |               onEmojiSelect={(code) => handleReaction(msg._id, code)}
180 |               trigger={
181 |                 <button className="p-1.5 hover:bg-emerald-50 rounded-full transition-colors">
182 |                   <Smile className="h-4 w-4 text-emerald-400 hover:text-emerald-500" />
183 |                 </button>
184 |               }
185 |             />
186 |           </div>
187 |         </div>
188 |       );
189 |     }
190 | 
191 |     // DM Message Style
192 |     return (
193 |       <div className="flex flex-col max-w-[60%] space-y-1 mb-4">
194 |         <div className="flex items-center gap-2 ml-2">
195 |           <span className="text-xs text-emerald-500">
196 |             {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
197 |           </span>
198 |           {msg.isAI && (
199 |             <span className="text-xs text-emerald-400 flex items-center gap-1">
200 |               <span className="inline-block w-3 h-3">🤖</span>
201 |               <span className="opacity-75">AI</span>
202 |             </span>
203 |           )}
204 |         </div>
205 |         <div className="bg-emerald-600 text-white px-3.5 py-2 rounded-[18px] rounded-br-none shadow-sm">
206 |           <div className="text-sm leading-relaxed break-words">
207 |             {msg.text}
208 |           </div>
209 |           {(replyCount > 0 || msg.reactions) && (
210 |             <div className="mt-2 pt-2 border-t border-emerald-500/30">
211 |               {replyCount > 0 && (
212 |                 <button
213 |                   className="text-xs text-emerald-100 hover:text-white flex items-center gap-1 mb-2"
214 |                   onClick={() => setSelectedThread(msg._id)}
215 |                 >
216 |                   <MessageSquare className="h-3 w-3" />
217 |                   {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
218 |                 </button>
219 |               )}
220 |               {Object.entries(msg.reactions || {}).map(([code, data]: [string, any]) => (
221 |                 <button
222 |                   key={code}
223 |                   onClick={() => handleReaction(msg._id, code)}
224 |                   className="inline-flex items-center gap-1 mr-1 px-2 py-0.5 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-full text-sm transition-colors"
225 |                 >
226 |                   <span>{EMOJI_MAP[code] || code}</span>
227 |                   <span className="text-xs text-emerald-100">{data.count}</span>
228 |                 </button>
229 |               ))}
230 |               <EmojiPicker
231 |                 onEmojiSelect={(code) => handleReaction(msg._id, code)}
232 |                 trigger={
233 |                   <button className="p-1.5 hover:bg-emerald-500/20 rounded-full transition-colors inline-flex">
234 |                     <Smile className="h-4 w-4 text-emerald-100" />
235 |                   </button>
236 |                 }
237 |               />
238 |             </div>
239 |           )}
240 |         </div>
241 |       </div>
242 |     );
243 |   };
244 | 
245 |   // Show empty state if only one member (admin) and not a DM
246 |   if (members && members.length <= 1 && currentChannel?.type !== "dm") {
247 |     return (
248 |       <>
249 |         <InviteModal 
250 |           open={inviteModalOpen}
251 |           onOpenChange={setInviteModalOpen}
252 |           name={workspace?.name || ""}
253 |           joinCode={workspace?.joinCode || ""}
254 |         />
255 |         <div className="flex flex-col h-full">
256 |           <ChannelHeader channel={currentChannel} />
257 |           <div className="flex flex-col items-center justify-center flex-1 bg-emerald-50/30">
258 |             <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
259 |               <div className="p-3 bg-emerald-100 rounded-full mb-4">
260 |                 <Users className="h-8 w-8 text-emerald-600" />
261 |               </div>
262 |               <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
263 |                 Invite Team Members
264 |               </h2>
265 |               <p className="text-emerald-600 mb-6">
266 |                 This channel is looking a bit empty. Invite your teammates to join the conversation!
267 |               </p>
268 |               <Button
269 |                 onClick={() => setInviteModalOpen(true)}
270 |                 className="bg-emerald-600 hover:bg-emerald-700 text-white"
271 |               >
272 |                 <UserPlus className="mr-2 h-4 w-4" />
273 |                 Invite People
274 |               </Button>
275 |             </div>
276 |           </div>
277 |         </div>
278 |       </>
279 |     );
280 |   }
281 | 
282 |   if (messages === undefined || !currentChannel) {
283 |     return <div className="p-4 text-emerald-600">Loading...</div>;
284 |   }
285 | 
286 |   // Sort messages by creation time, newest first
287 |   const sortedMessages = [...messages].sort((a, b) => a.createdAt - b.createdAt);
288 | 
289 |   return (
290 |     <div className="flex h-full">
291 |       {/* Left section: main channel messages */}
292 |       <div className="flex flex-col flex-1 relative">
293 |         <ChannelHeader channel={currentChannel} />
294 |         {/* Messages list */}
295 |         <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-emerald-50/30">
296 |           {sortedMessages?.length === 0 ? (
297 |             <div className="text-sm text-emerald-600 italic">
298 |               No messages yet. Start the conversation!
299 |             </div>
300 |           ) : (
301 |             sortedMessages?.map((msg) => (
302 |               <Message key={msg._id} msg={msg} />
303 |             ))
304 |           )}
305 |           {/* Invisible div for scrolling to bottom */}
306 |           <div ref={messagesEndRef} />
307 |         </div>
308 | 
309 |         {/* Fixed input at bottom */}
310 |         <div className="p-2 border-t bg-white">
311 |           <div className="flex gap-2">
312 |             <Input
313 |               placeholder="Type a message..."
314 |               value={text}
315 |               onChange={(e) => setText(e.target.value)}
316 |               onKeyDown={(e) => {
317 |                 if (e.key === "Enter" && !e.shiftKey) {
318 |                   e.preventDefault();
319 |                   handleSend();
320 |                 }
321 |               }}
322 |             />
323 |             <Button 
324 |               onClick={handleSend}
325 |               className="bg-emerald-600 hover:bg-emerald-700"
326 |             >
327 |               Send
328 |             </Button>
329 |           </div>
330 |         </div>
331 |       </div>
332 | 
333 |       {/* Right section: Thread panel (conditionally shown) */}
334 |       {selectedThread && (
335 |         <div className="w-[320px] border-l bg-white">
336 |           <ThreadPanel parentMessageId={selectedThread} onClose={() => setSelectedThread(null)} />
337 |         </div>
338 |       )}
339 |     </div>
340 |   );
341 | }
```

src/app/workspace/[workspaceId]/channel/[channelId]/thread-panel.tsx
```
1 | "use client";
2 | 
3 | import { useState } from "react";
4 | import { api } from "../../../../../../convex/_generated/api";
5 | import { useQuery, useMutation } from "convex/react";
6 | import { Input } from "@/components/ui/input";
7 | import { Button } from "@/components/ui/button";
8 | import { Id } from "../../../../../../convex/_generated/dataModel";
9 | import { EmojiPicker } from "@/components/emoji-picker";
10 | import { Smile } from "lucide-react";
11 | import { MessagePresence } from "@/app/features/presence/components/message-presence";
12 | import { useParams } from "next/navigation";
13 | 
14 | const EMOJI_MAP: Record<string, string> = {
15 |   thumbs_up: "👍",
16 |   heart: "❤️",
17 |   smile: "😊",
18 |   party: "🎉",
19 |   fire: "🔥",
20 |   eyes: "👀",
21 |   "100": "💯",
22 |   sparkles: "✨",
23 |   raised_hands: "🙌",
24 |   clap: "👏",
25 | };
26 | 
27 | export function ThreadPanel({
28 |   parentMessageId,
29 |   onClose,
30 | }: {
31 |   parentMessageId: Id<"messages">;
32 |   onClose: () => void;
33 | }) {
34 |   const params = useParams();
35 |   const workspaceId = params.workspaceId as Id<"workspaces">;
36 |   const [text, setText] = useState("");
37 |   const parentMessage = useQuery(api.messages.get, {
38 |     messageId: parentMessageId,
39 |   });
40 |   const threadMessages = useQuery(api.messages.listThread, {
41 |     parentMessageId,
42 |   });
43 | 
44 |   const sendMessage = useMutation(api.messages.send);
45 |   const toggleReaction = useMutation(api.messages.toggleReaction);
46 | 
47 |   const handleReaction = async (messageId: Id<"messages">, emoji: string) => {
48 |     try {
49 |       await toggleReaction({ messageId, emoji });
50 |     } catch (error) {
51 |       console.error("Error toggling reaction:", error);
52 |     }
53 |   };
54 | 
55 |   const handleReply = async () => {
56 |     if (!text || !parentMessage) return;
57 |     try {
58 |       await sendMessage({
59 |         channelId: parentMessage.channelId,
60 |         text,
61 |         parentMessageId,
62 |       });
63 |       setText("");
64 |     } catch (error) {
65 |       console.error("Error replying to thread:", error);
66 |     }
67 |   };
68 | 
69 |   const MessageWithReactions = ({ message }: { message: any }) => (
70 |     <div className="border border-emerald-100 p-3 rounded-lg hover:bg-emerald-50/50 transition bg-white shadow-sm">
71 |       <div className="flex items-center gap-2 mb-2">
72 |         <div className="flex items-center gap-2">
73 |           <strong className="font-medium text-emerald-900">{message.userName}</strong>
74 |           <MessagePresence 
75 |             workspaceId={workspaceId} 
76 |             userId={message.userId} 
77 |             className="h-2 w-2 shrink-0" 
78 |           />
79 |           <span className="text-xs text-emerald-500">
80 |             {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
81 |           </span>
82 |         </div>
83 |       </div>
84 |       <div className="text-sm text-emerald-900 leading-relaxed">{message.text}</div>
85 |       
86 |       {/* Reactions */}
87 |       <div className="mt-3 flex flex-wrap gap-1">
88 |         {Object.entries(message.reactions || {}).map(([code, data]: [string, any]) => (
89 |           <button
90 |             key={code}
91 |             onClick={() => handleReaction(message._id, code)}
92 |             className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full text-sm transition-colors"
93 |           >
94 |             <span>{EMOJI_MAP[code] || code}</span>
95 |             <span className="text-xs text-emerald-600">{data.count}</span>
96 |           </button>
97 |         ))}
98 |         
99 |         {/* Add reaction button */}
100 |         <EmojiPicker
101 |           onEmojiSelect={(code) => handleReaction(message._id, code)}
102 |           trigger={
103 |             <button className="p-1.5 hover:bg-emerald-50 rounded-full transition-colors">
104 |               <Smile className="h-4 w-4 text-emerald-400 hover:text-emerald-500" />
105 |             </button>
106 |           }
107 |         />
108 |       </div>
109 |     </div>
110 |   );
111 | 
112 |   if (!threadMessages || !parentMessage) {
113 |     return (
114 |       <div className="p-4 flex flex-col h-full">
115 |         <div className="flex justify-between">
116 |           <h2 className="font-bold text-lg text-emerald-900">Thread</h2>
117 |           <Button variant="outline" size="sm" onClick={onClose}>
118 |             Close
119 |           </Button>
120 |         </div>
121 |         <div className="mt-4 text-emerald-700">Loading thread...</div>
122 |       </div>
123 |     );
124 |   }
125 | 
126 |   return (
127 |     <div className="p-4 flex flex-col h-full">
128 |       <div className="flex justify-between items-center">
129 |         <h2 className="font-bold text-lg text-emerald-900">Thread</h2>
130 |         <Button variant="outline" size="sm" onClick={onClose}>
131 |           Close
132 |         </Button>
133 |       </div>
134 | 
135 |       {/* Parent message */}
136 |       <div className="mt-4 border-b border-emerald-100 pb-4">
137 |         <MessageWithReactions message={parentMessage} />
138 |       </div>
139 | 
140 |       <div className="flex-1 overflow-y-auto mt-4 space-y-2 pr-2">
141 |         {threadMessages.length === 0 ? (
142 |           <p className="text-sm text-emerald-600 italic">
143 |             No replies yet. Be the first to reply.
144 |           </p>
145 |         ) : (
146 |           threadMessages.map((msg) => (
147 |             <MessageWithReactions key={msg._id} message={msg} />
148 |           ))
149 |         )}
150 |       </div>
151 | 
152 |       <div className="mt-2">
153 |         <div className="flex gap-2">
154 |           <Input
155 |             placeholder="Reply in thread..."
156 |             value={text}
157 |             onChange={(e) => setText(e.target.value)}
158 |             onKeyDown={(e) => {
159 |               if (e.key === "Enter" && !e.shiftKey) {
160 |                 e.preventDefault();
161 |                 handleReply();
162 |               }
163 |             }}
164 |           />
165 |           <Button 
166 |             onClick={handleReply}
167 |             className="bg-emerald-600 hover:bg-emerald-700"
168 |           >
169 |             Reply
170 |           </Button>
171 |         </div>
172 |       </div>
173 |     </div>
174 |   );
175 | } 
```

src/app/workspace/[workspaceId]/channel/page.tsx
```
1 | "use client";
2 | 
3 | import { useParams } from "next/navigation";
4 | import { useGetMembers } from "@/app/features/members/api/use-get-members";
5 | import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
6 | import { Button } from "@/components/ui/button";
7 | import { MessageSquare, Users } from "lucide-react";
8 | import { Id } from "../../../../../convex/_generated/dataModel";
9 | 
10 | export default function EmptyDMPage() {
11 |   const params = useParams();
12 |   const workspaceId = params.workspaceId as Id<"workspaces">;
13 |   
14 |   const { data: workspace } = useGetWorkspace({ id: workspaceId });
15 |   const { data: members } = useGetMembers({ workspaceId });
16 | 
17 |   // Filter out current user from members list
18 |   const otherMembers = members?.filter(m => m.user) ?? [];
19 | 
20 |   return (
21 |     <div className="flex flex-col items-center justify-center h-full bg-emerald-50/30">
22 |       <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
23 |         <div className="p-3 bg-emerald-100 rounded-full mb-4">
24 |           <MessageSquare className="h-8 w-8 text-emerald-600" />
25 |         </div>
26 |         <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
27 |           No Direct Messages Yet
28 |         </h2>
29 |         <p className="text-emerald-600 mb-6">
30 |           {otherMembers.length > 0 
31 |             ? "Start a conversation by clicking on a team member in the sidebar."
32 |             : "Invite team members to start direct messaging with them."}
33 |         </p>
34 |         {otherMembers.length === 0 && (
35 |           <div className="flex flex-col items-center gap-4">
36 |             <div className="flex items-center gap-2 text-sm text-emerald-600">
37 |               <Users className="h-4 w-4" />
38 |               <span>No other members in this workspace</span>
39 |             </div>
40 |           </div>
41 |         )}
42 |       </div>
43 |     </div>
44 |   );
45 | } 
```

src/app/workspace/[workspaceId]/invite-modal.tsx
```
1 | import {Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog"
2 | import { Button } from "@/components/ui/button";
3 | import { Copy, Check, RefreshCw } from "lucide-react";
4 | import { useState } from "react";
5 | import { toast } from "sonner";
6 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
7 | import { useNewJoinCode } from "@/app/features/workspaces/api/use-new-join-code";
8 | import { cn } from "@/lib/utils";
9 | import {
10 |     AlertDialog,
11 |     AlertDialogAction,
12 |     AlertDialogCancel,
13 |     AlertDialogContent,
14 |     AlertDialogDescription,
15 |     AlertDialogFooter,
16 |     AlertDialogHeader,
17 |     AlertDialogTitle,
18 |     AlertDialogTrigger,
19 | } from "@/components/ui/alert-dialog";
20 | 
21 | interface InviteModalProps {
22 |     open: boolean;
23 |     onOpenChange: (open: boolean) => void;
24 |     name: string;
25 |     joinCode: string;
26 | }
27 | 
28 | export const InviteModal = ({open, onOpenChange, name, joinCode}: InviteModalProps) => {
29 |     const workspaceId = useWorkspaceId();
30 |     const { mutate, isPending } = useNewJoinCode();
31 |     const [copied, setCopied] = useState(false);
32 | 
33 |     const handleNewCode = () => {
34 |         mutate({ id: workspaceId }, {
35 |             onSuccess: () => {
36 |                 toast.success("New join code generated!");
37 |             },
38 |             onError: () => {
39 |                 toast.error("Failed to generate new join code");
40 |             }
41 |         });
42 |     };
43 | 
44 |     const handleCopy = () => {
45 |         const inviteLink = `${window.location.origin}/join/${workspaceId}`;
46 |         navigator.clipboard.writeText(inviteLink).then(() => {
47 |             setCopied(true);
48 |             toast.success("Invite link copied!");
49 |             setTimeout(() => setCopied(false), 2000);
50 |         }).catch(() => {
51 |             toast.error("Failed to copy invite link!");
52 |         });
53 |     };
54 | 
55 |     return (
56 |         <Dialog open={open} onOpenChange={onOpenChange}>
57 |             <DialogContent>
58 |                 <DialogHeader className="text-center">
59 |                     <DialogTitle>Invite people to {name}</DialogTitle>
60 |                     <DialogDescription>
61 |                         Share this invite link with people you want to invite to your workspace.
62 |                     </DialogDescription>
63 |                 </DialogHeader>
64 |                 <div className="p-6">
65 |                     <div className="flex flex-col items-center gap-y-4">
66 |                         <div className="bg-muted p-4 rounded-md w-full text-center">
67 |                             <div className="text-xs text-muted-foreground">
68 |                                 Join Code
69 |                             </div>
70 |                             <div className="mt-2 text-3xl font-semibold tracking-wider font-mono">
71 |                                 {joinCode}
72 |                             </div>
73 |                         </div>
74 |                         <Button
75 |                             onClick={handleCopy}
76 |                             variant="outline"
77 |                             className="w-full"
78 |                         >
79 |                             {copied ? (
80 |                                 <>
81 |                                     <Check className="h-4 w-4 mr-2 text-emerald-500" />
82 |                                     Copied!
83 |                                 </>
84 |                             ) : (
85 |                                 <>
86 |                                     <Copy className="h-4 w-4 mr-2" />
87 |                                     Copy Invite Link
88 |                                 </>
89 |                             )}
90 |                         </Button>
91 |                         <div className="flex w-full gap-x-2">
92 |                             <AlertDialog>
93 |                                 <AlertDialogTrigger asChild>
94 |                                     <Button
95 |                                         variant="outline"
96 |                                         disabled={isPending}
97 |                                         className="flex-1"
98 |                                     >
99 |                                         <RefreshCw className={cn(
100 |                                             "h-4 w-4 mr-2",
101 |                                             isPending && "animate-spin"
102 |                                         )} />
103 |                                         Generate New Code
104 |                                     </Button>
105 |                                 </AlertDialogTrigger>
106 |                                 <AlertDialogContent>
107 |                                     <AlertDialogHeader>
108 |                                         <AlertDialogTitle>Generate New Join Code?</AlertDialogTitle>
109 |                                         <AlertDialogDescription>
110 |                                             This will invalidate the current join code. Anyone with the old code won't be able to join the workspace.
111 |                                         </AlertDialogDescription>
112 |                                     </AlertDialogHeader>
113 |                                     <AlertDialogFooter>
114 |                                         <AlertDialogCancel>Cancel</AlertDialogCancel>
115 |                                         <AlertDialogAction
116 |                                             onClick={handleNewCode}
117 |                                             className="bg-black hover:bg-black/90"
118 |                                         >
119 |                                             Generate New Code
120 |                                         </AlertDialogAction>
121 |                                     </AlertDialogFooter>
122 |                                 </AlertDialogContent>
123 |                             </AlertDialog>
124 |                             <Button
125 |                                 onClick={() => onOpenChange(false)}
126 |                                 variant="default"
127 |                                 className="flex-1 bg-black hover:bg-black/90"
128 |                             >
129 |                                 Close
130 |                             </Button>
131 |                         </div>
132 |                     </div>
133 |                 </div>
134 |             </DialogContent>
135 |         </Dialog>
136 |     )
137 | }
```

src/app/workspace/[workspaceId]/layout.tsx
```
1 | "use client";
2 | 
3 | 
4 | 
5 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
6 | import { Toolbar } from "./toolbar";
7 | import { Sidebar } from "./sidebar";
8 | import {
9 |     ResizableHandle,
10 |     ResizablePanel,
11 |     ResizablePanelGroup,
12 |   } from "@/components/ui/resizable";
13 | import { WorkspacesSidebar } from "./workspace-sidebar";
14 | 
15 | interface WorkspaceLayoutProps {
16 |   children: React.ReactNode;
17 | }
18 | 
19 | const WorkspaceLayout = ({
20 |   children,
21 | }: WorkspaceLayoutProps) => {
22 |   const workspaceId = useWorkspaceId();
23 | 
24 |   return (
25 |     <div className="h-full">
26 |       <Toolbar />
27 |       <div className="flex h-[calc(100vh-40px)]">
28 |         <Sidebar />
29 |         <ResizablePanelGroup direction="horizontal" autoSaveId="workspace-layout">
30 |           <ResizablePanel defaultSize={20} minSize={10} maxSize={20} className="bg-[#025632]">
31 |             <WorkspacesSidebar />
32 |           </ResizablePanel>
33 |           <ResizableHandle withHandle />
34 |           <ResizablePanel minSize={20}>
35 |             {children}
36 |           </ResizablePanel>
37 |         </ResizablePanelGroup>
38 |       </div>
39 |     </div>
40 |   );
41 | };
42 | 
43 | export default WorkspaceLayout; 
```

src/app/workspace/[workspaceId]/page.tsx
```
1 | "use client";
2 | 
3 | import { useRouter } from "next/navigation";
4 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
5 | import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
6 | import { useEffect } from "react";
7 | 
8 | export default function WorkspaceIdPage() {
9 |   const router = useRouter();
10 |   const workspaceId = useWorkspaceId();
11 |   const { data: channels } = useGetChannels({ workspaceId });
12 | 
13 |   useEffect(() => {
14 |     if (channels) {
15 |       const generalChannel = channels.find((c) => c.name.toLowerCase() === "general");
16 |       if (generalChannel) {
17 |         router.push(`/workspace/${workspaceId}/channel/${generalChannel._id}`);
18 |       }
19 |     }
20 |   }, [channels, workspaceId, router]);
21 | 
22 |   return <div>Redirecting to general channel...</div>;
23 | }
```

src/app/workspace/[workspaceId]/preferences-modal.tsx
```
1 | "use client";
2 | 
3 | import { Button } from "@/components/ui/button";
4 | import { useRemoveWorkspace } from "@/app/features/workspaces/api/use-remove-workspace";
5 | import { useUpdateWorkspace } from "@/app/features/workspaces/api/use-update-workspace";
6 | import { toast } from "sonner";
7 | import { useRouter } from "next/navigation";
8 | 
9 | import {
10 |     Dialog,
11 |     DialogClose,
12 |     DialogContent,
13 |     DialogDescription,
14 |     DialogFooter,
15 |     DialogHeader,
16 |     DialogTitle,
17 |     DialogTrigger,
18 | } from "@/components/ui/dialog";
19 | import { Input } from "@/components/ui/input";
20 | import { Trash2 } from "lucide-react";
21 | import { useState } from "react";
22 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
23 | 
24 | interface PreferencesModalProps {
25 |     open: boolean;
26 |     setOpen: (open: boolean) => void;
27 |     initialValue: string;
28 | }
29 | 
30 | export const PreferencesModal = ({ open, setOpen, initialValue }: PreferencesModalProps) => {
31 |     const router = useRouter();
32 |     const workspaceId = useWorkspaceId();
33 |     const [value, setValue] = useState(initialValue);
34 |     const [editOpen, setEditOpen] = useState(false);
35 |     const [deleteOpen, setDeleteOpen] = useState(false);
36 | 
37 |     const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } = useUpdateWorkspace(); 
38 |     const { mutate: removeWorkspace, isPending: isRemovingWorkspace } = useRemoveWorkspace();
39 | 
40 |     const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
41 |         e.preventDefault();
42 |         
43 |         if (value === initialValue) {
44 |             setEditOpen(false);
45 |             return;
46 |         }
47 | 
48 |         await updateWorkspace(
49 |             { id: workspaceId, name: value },
50 |             {
51 |                 onSuccess: () => {
52 |                     toast.success("Workspace name updated successfully");
53 |                     setEditOpen(false);
54 |                 },
55 |                 onError: () => {
56 |                     toast.error("Failed to update workspace name");
57 |                 }
58 |             }
59 |         );
60 |     }
61 | 
62 |     const handleDelete = async () => {
63 |         try {
64 |             setDeleteOpen(false);
65 |             
66 |             await removeWorkspace(
67 |                 { id: workspaceId },
68 |                 {
69 |                     onSuccess: () => {
70 |                         toast.success("Workspace deleted successfully");
71 |                         setOpen(false);
72 |                         router.push("/");
73 |                     },
74 |                     onError: (error) => {
75 |                         setDeleteOpen(true);
76 |                         toast.error("Failed to delete workspace: " + error.message);
77 |                     }
78 |                 }
79 |             );
80 |         } catch (error) {
81 |             setDeleteOpen(true);
82 |             toast.error("Failed to delete workspace");
83 |         }
84 |     }
85 | 
86 |     return (
87 |         <Dialog open={open} onOpenChange={setOpen}>
88 |             <DialogContent className="p-0 bg-white overflow-hidden max-w-sm">
89 |                 <DialogHeader className="px-6 py-4 border-b">
90 |                     <DialogTitle className="text-lg font-medium">{value}</DialogTitle>
91 |                 </DialogHeader>
92 |                 <div className="flex flex-col">
93 |                     <Dialog open={editOpen} onOpenChange={setEditOpen}>
94 |                         <DialogTrigger asChild>
95 |                             <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer">
96 |                                 <div className="flex items-center justify-between">
97 |                                     <span className="text-sm font-medium text-gray-700">
98 |                                         Workspace name
99 |                                     </span>
100 |                                     <span className="text-sm text-blue-600">Edit</span>
101 |                                 </div>
102 |                                 <p className="text-sm text-gray-600 mt-1">{value}</p>
103 |                             </div>
104 |                         </DialogTrigger>
105 |                         <DialogContent>
106 |                             <form onSubmit={handleEdit}>
107 |                                 <DialogHeader>
108 |                                     <DialogTitle>Edit workspace name</DialogTitle>
109 |                                 </DialogHeader>
110 |                                 <div className="py-4">
111 |                                     <Input
112 |                                         value={value}
113 |                                         disabled={isUpdatingWorkspace}
114 |                                         onChange={(e) => setValue(e.target.value)}
115 |                                         required
116 |                                         autoFocus
117 |                                         minLength={3}
118 |                                         maxLength={80}
119 |                                         placeholder="Workspace name e.g. 'Work', 'Home', 'School', etc."
120 |                                     />
121 |                                 </div>
122 |                                 <DialogFooter>
123 |                                     <DialogClose asChild>
124 |                                         <Button type="button" variant="outline" disabled={isUpdatingWorkspace}>
125 |                                             Cancel
126 |                                         </Button>
127 |                                     </DialogClose>
128 |                                     <Button type="submit" disabled={isUpdatingWorkspace || value === initialValue}>
129 |                                         Save Changes
130 |                                     </Button>
131 |                                 </DialogFooter>
132 |                             </form>
133 |                         </DialogContent>
134 |                     </Dialog>
135 |                     <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
136 |                         <DialogTrigger asChild>
137 |                             <div className="px-6 py-4">
138 |                                 <button className="text-sm text-red-600 font-medium flex items-center gap-2 hover:opacity-80">
139 |                                     <Trash2 className="size-4" />
140 |                                     Delete workspace
141 |                                 </button>
142 |                             </div>
143 |                         </DialogTrigger>
144 |                         <DialogContent>
145 |                             <DialogHeader>
146 |                                 <DialogTitle>Delete Workspace</DialogTitle>
147 |                                 <DialogDescription>
148 |                                     Are you sure you want to delete this workspace? This action cannot be undone 
149 |                                     and all data will be permanently deleted.
150 |                                 </DialogDescription>
151 |                             </DialogHeader>
152 |                             <DialogFooter>
153 |                                 <DialogClose asChild>
154 |                                     <Button type="button" variant="outline" disabled={isRemovingWorkspace}>
155 |                                         Cancel
156 |                                     </Button>
157 |                                 </DialogClose>
158 |                                 <Button 
159 |                                     type="button" 
160 |                                     variant="destructive"
161 |                                     disabled={isRemovingWorkspace}
162 |                                     onClick={handleDelete}
163 |                                 >
164 |                                     {isRemovingWorkspace ? "Deleting..." : "Delete Workspace"}
165 |                                 </Button>
166 |                             </DialogFooter>
167 |                         </DialogContent>
168 |                     </Dialog>
169 |                 </div>
170 |             </DialogContent>
171 |         </Dialog>
172 |     );
173 | };
```

src/app/workspace/[workspaceId]/sidebar-button.tsx
```
1 | "use client";
2 | 
3 | import { IconType } from "react-icons";
4 | import { LucideIcon } from "lucide-react";
5 | import { cn } from "@/lib/utils";
6 | import { Button } from "@/components/ui/button";
7 | 
8 | interface SidebarButtonProps {
9 |   icon: LucideIcon | IconType;
10 |   label: string;
11 |   isActive?: boolean;
12 |   onClick?: () => void;
13 | }
14 | 
15 | export const SidebarButton = ({
16 |   icon: Icon,
17 |   label,
18 |   isActive,
19 |   onClick,
20 | }: SidebarButtonProps) => {
21 |   return (
22 |     <div 
23 |       className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group"
24 |       onClick={onClick}
25 |     >
26 |       <Button
27 |         variant="transparent"
28 |         className={cn(
29 |           "size-11 p-2.5 group-hover:bg-accent/20",
30 |           isActive && "bg-accent/20"
31 |         )}
32 |       >
33 |         <Icon className="size-6 text-white group-hover:scale-110 transition-all" />
34 |       </Button>
35 |       <span className="text-[11px] text-white group-hover:text-accent">
36 |         {label}
37 |       </span>
38 |     </div>
39 |   );
40 | }; 
```

src/app/workspace/[workspaceId]/sidebar-item.tsx
```
1 | import { LucideIcon } from "lucide-react";
2 | import { useRouter } from "next/navigation";
3 | import { cn } from "@/lib/utils";
4 | 
5 | interface SidebarItemProps {
6 |   icon: LucideIcon;
7 |   label: string;
8 |   id: string;
9 |   href?: string;
10 |   variant?: "default" | "active";
11 |   iconClassName?: string;
12 | }
13 | 
14 | export const SidebarItem = ({
15 |   icon: Icon,
16 |   label,
17 |   id,
18 |   href,
19 |   variant = "default",
20 |   iconClassName,
21 | }: SidebarItemProps) => {
22 |   const router = useRouter();
23 | 
24 |   const onClick = () => {
25 |     if (href) {
26 |       router.push(href);
27 |     }
28 |   };
29 | 
30 |   return (
31 |     <button
32 |       onClick={onClick}
33 |       className={cn(
34 |         "flex items-center gap-x-2 px-2 py-1 w-full transition rounded-md",
35 |         variant === "default" && "text-white hover:bg-white/10",
36 |         variant === "active" && "bg-white text-emerald-700"
37 |       )}
38 |     >
39 |       <Icon className={cn("h-4 w-4", iconClassName)} />
40 |       <span className="text-sm font-medium truncate">{label}</span>
41 |     </button>
42 |   );
43 | };
```

src/app/workspace/[workspaceId]/sidebar.tsx
```
1 | "use client";
2 | 
3 | import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
4 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
5 | import { cn } from "@/lib/utils";
6 | import { UserButton } from "@/app/features/auth/components/user-button";
7 | import { WorkspaceSwitcher } from "./workspace-switcher";
8 | import { SidebarButton } from "./sidebar-button";
9 | import { Hash, Settings, File, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
10 | import { usePathname, useRouter } from "next/navigation";
11 | import { useQuery } from "convex/react";
12 | import { api } from "../../../../convex/_generated/api";
13 | import { Id } from "../../../../convex/_generated/dataModel";
14 | import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
15 | 
16 | interface ItemProps {
17 |   label: string;
18 |   icon: React.ReactNode;
19 |   onClick?: () => void;
20 | }
21 | 
22 | const Item = ({
23 |   label,
24 |   icon,
25 |   onClick
26 | }: ItemProps) => {
27 |   return (
28 |     <button
29 |       onClick={onClick}
30 |       className={cn(
31 |         "group flex items-center gap-x-2 px-2 py-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md",
32 |         "text-zinc-600 dark:text-zinc-300 text-sm font-medium"
33 |       )}
34 |     >
35 |       {icon}
36 |       {label}
37 |     </button>
38 |   );
39 | };
40 | 
41 | const SectionHeader = ({
42 |   label,
43 |   icon,
44 |   sideIcon
45 | }: {
46 |   label: string;
47 |   icon?: React.ReactNode;
48 |   sideIcon?: React.ReactNode;
49 | }) => {
50 |   return (
51 |     <div className="flex items-center justify-between py-2">
52 |       <div className="flex items-center gap-x-2">
53 |         {icon}
54 |         <p className="text-sm font-semibold text-zinc-500">
55 |           {label}
56 |         </p>
57 |       </div>
58 |       {sideIcon}
59 |     </div>
60 |   );
61 | };
62 | 
63 | export const Sidebar = () => {
64 |   const workspaceId = useWorkspaceId();
65 |   const { data: workspace } = useGetWorkspace({ id: workspaceId });
66 |   const { data: channels } = useGetChannels({ workspaceId });
67 |   const pathname = usePathname();
68 |   const router = useRouter();
69 | 
70 |   const dmChannels = channels?.filter(c => c.type === "dm") ?? [];
71 | 
72 |   const handleHomeClick = () => {
73 |     router.push(`/workspace/${workspaceId}`);
74 |   };
75 | 
76 |   const handleDMClick = () => {
77 |     if (dmChannels && dmChannels.length > 0) {
78 |       // Navigate to the most recent DM channel
79 |       router.push(`/workspace/${workspaceId}/channel/${dmChannels[0]._id}`);
80 |     } else {
81 |       // Show the empty state page
82 |       router.push(`/workspace/${workspaceId}/channel`);
83 |     }
84 |   };
85 | 
86 |   // Check if current channel is a DM
87 |   const currentChannelId = pathname.split('/').pop();
88 |   const isInDM = Boolean(currentChannelId && dmChannels.some(c => c._id === currentChannelId));
89 | 
90 |   return (
91 |     <aside 
92 |       className="flex flex-col items-center w-[70px] h-full pt-9 pb-4 gap-y-4"
93 |       style={{ backgroundColor: "#014421" }}
94 |     >
95 |         <WorkspaceSwitcher />
96 |         <SidebarButton 
97 |           icon={Home} 
98 |           label="Home" 
99 |           isActive={pathname === `/workspace/${workspaceId}` || (pathname.includes("/channel/") && !isInDM)} 
100 |           onClick={handleHomeClick}
101 |         /> 
102 |         <SidebarButton 
103 |           icon={MessagesSquare} 
104 |           label="DMs" 
105 |           isActive={isInDM}
106 |           onClick={handleDMClick}
107 |         /> 
108 |         <SidebarButton icon={File} label="Files" isActive={pathname.includes("/files/")} />
109 |         <SidebarButton icon={MoreHorizontal} label="Settings" isActive={pathname.includes("/settings/")} />
110 |         <div className="flex flex-col items-center justify-center mt-auto">
111 |           <UserButton />
112 |         </div>
113 |     </aside>
114 |   );
115 | };
```

src/app/workspace/[workspaceId]/toolbar.tsx
```
1 | "use client";
2 | 
3 | import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
4 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
5 | import { Button } from "@/components/ui/button";
6 | import { Search, Info } from "lucide-react";
7 | 
8 | export const Toolbar = () => {
9 |   const workspaceId = useWorkspaceId();
10 |   const { data } = useGetWorkspace({ id: workspaceId });
11 | 
12 |   if (!data) {
13 |     return null;
14 |   }
15 | 
16 |   return (
17 |     <nav 
18 |       className="bg-[#014421] flex items-center justify-between h-10 p-1.5"
19 |     >
20 |       <div className="flex-1" />
21 |       <div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
22 |         <Button 
23 |           size="sm" 
24 |           className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-8"
25 |         >
26 |           <Search className="size-4 text-white mr-2" />
27 |           <span className="text-white text-xs">
28 |             Search {data?.name} Workspace
29 |           </span>
30 |         </Button>
31 |       </div>
32 |       <div className="ml-auto flex-1 flex items-center justify-end">
33 |         <Button 
34 |           variant="transparent" 
35 |           size="iconSm"
36 |         >
37 |           <Info className="size-5 text-white" />
38 |         </Button>
39 |       </div>
40 |     </nav>
41 |   );
42 | };
```

src/app/workspace/[workspaceId]/user-item.tsx
```
1 | import { Button } from "@/components/ui/button";
2 | import { User } from "@auth/core/types";
3 | import { Id } from "../../../../convex/_generated/dataModel";
4 | import { cva, type VariantProps } from "class-variance-authority";
5 | import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
6 | import { cn } from "@/lib/utils";
7 | import Link from "next/link";
8 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
9 | 
10 | 
11 | const userItemVariants = cva(
12 |     "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
13 |     {
14 |       variants: {
15 |         variant: {
16 |           default: "text-[#f9edfcc]",
17 |           active: "text-[#481349] bg-white/90 hover:bg-white/90",
18 |         },
19 |       },
20 |       defaultVariants: {
21 |         variant: "default"
22 |       }
23 |     }
24 |   );
25 | 
26 | 
27 | interface UserItemProps {
28 |     id: Id<"members">;
29 |     label?: string;
30 |     image?: string;
31 |     variant?: VariantProps<typeof userItemVariants>["variant"];
32 | }
33 | 
34 | export const UserItem = ({ id, label="Member", image, variant }: UserItemProps) => {
35 |     const workspaceId = useWorkspaceId();
36 |     const avatarFallback = label.charAt(0).toUpperCase();
37 |     
38 |     return (
39 |         <Button variant="transparent" className={cn(userItemVariants({ variant }))} size="sm" asChild>
40 |             <Link href={`/workspace/${workspaceId}/member/${id}`}>
41 |                 <Avatar className="rounded-md size-5 mr-1">
42 |                     <AvatarImage className="rounded-md" src={image} />
43 |                     <AvatarFallback className="rounded-md text-sm">{avatarFallback}</AvatarFallback>
44 |                 </Avatar>
45 |                 <span className="text-xs truncate">{label}</span>
46 |             </Link>
47 | 
48 |         </Button>
49 |     );
50 | };
```

src/app/workspace/[workspaceId]/workspace-header.tsx
```
1 | "use client";
2 | 
3 | import {
4 |   DropdownMenu,
5 |   DropdownMenuContent,
6 |   DropdownMenuItem,
7 |   DropdownMenuSeparator,
8 |   DropdownMenuTrigger,
9 | } from "@/components/ui/dropdown-menu";
10 | import { Button } from "@/components/ui/button";
11 | import { ChevronDown, ListFilter, Plus, SquarePen } from "lucide-react";
12 | import { Doc } from "../../../../convex/_generated/dataModel";
13 | import { PreferencesModal } from "./preferences-modal";
14 | import { useState } from "react";
15 | import { InviteModal } from "./invite-modal";
16 | 
17 | interface WorkspaceHeaderProps {
18 |   workspace: Doc<"workspaces">;
19 |   isAdmin: boolean;
20 | }
21 | 
22 | export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
23 |   const [preferencesOpen, setPreferencesOpen] = useState(false);
24 |   const [inviteOpen, setInviteOpen] = useState(false);
25 |   return (
26 |     <>
27 |     <InviteModal 
28 |       open={inviteOpen}
29 |       onOpenChange={setInviteOpen}
30 |       name={workspace.name}
31 |       joinCode={workspace.joinCode}
32 |     
33 | 
34 |     />
35 |     <PreferencesModal open={preferencesOpen} setOpen={setPreferencesOpen} initialValue={workspace.name} />
36 |     <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
37 |       <DropdownMenu>
38 |         <DropdownMenuTrigger asChild>
39 |           <Button variant="transparent" size="sm" className="font-semibold text-lg w-auto p-1.5 overflow-hidden focus:ring-0 focus-visible:ring-0">
40 |             <span className="truncate">{workspace.name}</span>
41 |             <ChevronDown className="size-4 ml-1 shrink-0" />
42 |           </Button>
43 |         </DropdownMenuTrigger>
44 |         <DropdownMenuContent side="bottom" align="start" className="w-64 border-none">
45 |           <DropdownMenuItem className="cursor-pointer capitalize">
46 |             <div className="size-9 relative overflow-hidden bg-[#616161] text-white font-semibold 
47 |             text-xl flex items-center justify-center rounded-md mr-2">{workspace.name.charAt(0).toUpperCase()}</div>
48 |             <div className="flex flex-col">
49 |               <p className="font-bold">{workspace.name}</p>
50 |               <p className="text-xs text-muted-foreground">Active Workspace</p>
51 |             </div>
52 |           </DropdownMenuItem>
53 |           <DropdownMenuSeparator />
54 |           {isAdmin && (
55 |             <>
56 |               <DropdownMenuItem className="cursor-pointer" onClick={() => setInviteOpen(true)}>
57 |                 <div className="size-9 relative overflow-hidden bg-[#1C2A24]/10 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
58 |                   <Plus className="h-4 w-4" />
59 |                 </div>
60 |                 Invite People to {workspace.name}
61 |               </DropdownMenuItem>
62 |               <DropdownMenuSeparator />
63 |               <DropdownMenuItem className="cursor-pointer" onClick={() => setPreferencesOpen(true)}>
64 |                 <div className="size-9 relative overflow-hidden bg-[#1C2A24]/10 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
65 |                   <Plus className="h-4 w-4" />
66 |                 </div>
67 |                 Preferences
68 |               </DropdownMenuItem>
69 |             </>
70 |           )}
71 |         </DropdownMenuContent>
72 |         <DropdownMenuSeparator />
73 |       <div className="flex items-center gap-0.5">
74 |         <Button variant="transparent" size="iconSm">
75 |           <ListFilter className="size-4" />
76 |         </Button>
77 |         <Button variant="transparent" size="iconSm">
78 |           <SquarePen className="size-4" />
79 |         </Button>
80 |       </div>
81 |       </DropdownMenu>
82 |     </div></>
83 |   );
84 | };
```

src/app/workspace/[workspaceId]/workspace-section.tsx
```
1 | "use client";
2 | 
3 | import { Button } from "@/components/ui/button";
4 | import { FaCaretDown } from "react-icons/fa";
5 | import { useToggle } from "react-use";
6 | import { cn } from "@/lib/utils";
7 | 
8 | interface WorkspaceSectionProps {
9 |   label: string;
10 |   children: React.ReactNode;
11 |   hint?: string;
12 |   onNew?: () => void;
13 |   className?: string;
14 | }
15 | 
16 | export function WorkspaceSection({ label, children, hint, onNew, className }: WorkspaceSectionProps) {
17 |   return (
18 |     <div className={cn("space-y-2", className)}>
19 |       <div className="flex items-center justify-between">
20 |         <span className="text-xs font-bold uppercase tracking-wider text-white">
21 |           {label}
22 |         </span>
23 |         {hint && onNew && (
24 |           <button
25 |             onClick={onNew}
26 |             className="text-xs text-zinc-400 hover:text-white transition"
27 |           >
28 |             {hint}
29 |           </button>
30 |         )}
31 |       </div>
32 |       <div className="space-y-[2px]">{children}</div>
33 |     </div>
34 |   );
35 | }
```

src/app/workspace/[workspaceId]/workspace-sidebar.tsx
```
1 | "use client";
2 | 
3 | import { useCreateChannelModal } from "@/app/features/channels/store/use-create-channel-modal";
4 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
5 | import { useCurrentMember } from "@/app/features/members/api/use-current-member";
6 | import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
7 | import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
8 | import { useGetMembers } from "@/app/features/members/api/use-get-members";
9 | import { Hash, Plus, Loader, AlertTriangle, MessageSquareText, SendHorizonal, X, ChevronDown, ChevronRight, Circle } from "lucide-react";
10 | import { WorkspaceSection } from "./workspace-section";
11 | import { SidebarItem } from "./sidebar-item";
12 | import { UserItem } from "./user-item";
13 | import { WorkspaceHeader } from "./workspace-header";
14 | import { useState, useEffect } from "react";
15 | import { useMutation, useQuery } from "convex/react";
16 | import { api } from "../../../../convex/_generated/api";
17 | import { WorkspacePresence } from "@/app/features/presence/components/workspace-presence";
18 | import { Id, Doc } from "../../../../convex/_generated/dataModel";
19 | import { Button } from "@/components/ui/button";
20 | import { useRouter, usePathname } from "next/navigation";
21 | import { useCreateDM } from "@/app/features/channels/api/use-create-dm";
22 | 
23 | export const WorkspacesSidebar = () => {
24 |   const router = useRouter();
25 |   const pathname = usePathname();
26 |   const workspaceId = useWorkspaceId();
27 |   const [_open, setOpen] = useCreateChannelModal();
28 |   const createDM = useCreateDM();
29 |   const cleanupDMs = useMutation(api.channels.cleanupDuplicateDMs);
30 | 
31 |   // Run cleanup when workspace loads
32 |   useEffect(() => {
33 |     if (workspaceId) {
34 |       cleanupDMs({ workspaceId: workspaceId as Id<"workspaces"> });
35 |     }
36 |   }, [workspaceId]);
37 | 
38 |   const { data: currentMember, isLoading: isCurrentMemberLoading } =
39 |     useCurrentMember({ workspaceId });
40 |   const { data: workspace, isLoading: isWorkspaceLoading } =
41 |     useGetWorkspace({ id: workspaceId });
42 |   const { data: channels, isLoading: isChannelsLoading } =
43 |     useGetChannels({ workspaceId });
44 |   const { data: members, isLoading: isMembersLoading } =
45 |     useGetMembers({ workspaceId });
46 | 
47 |   const regularChannels = channels?.filter(c => c.type !== "dm") ?? [];
48 |   const dmChannels = channels?.filter(c => c.type === "dm" && c.name?.trim()) ?? [];
49 | 
50 |   // Filter out current user from members list
51 |   const otherMembers = members?.filter(m => m.user?._id !== currentMember?.user?._id) ?? [];
52 | 
53 |   const handleUserClick = async (userId: Id<"users">) => {
54 |     if (!workspaceId) return;
55 |     await createDM(workspaceId, userId);
56 |   };
57 | 
58 |   // Get online presence
59 |   const presence = useQuery(api.presence.list, {
60 |     workspaceId: workspaceId as Id<"workspaces">,
61 |   }) ?? [];
62 | 
63 |   // Filter members to only show online ones
64 |   const onlineMembers = members?.filter(member => 
65 |     member.user?._id !== currentMember?.user?._id && // Not current user
66 |     presence.some((p: Doc<"userPresence">) => 
67 |       p.userId === member.user?._id && 
68 |       p.status === "online"
69 |     )
70 |   ) ?? [];
71 | 
72 |   if (isCurrentMemberLoading || isWorkspaceLoading) {
73 |     return (
74 |       <div className="flex items-center justify-center h-full">
75 |         <Loader className="animate-spin text-white" />
76 |       </div>
77 |     );
78 |   }
79 | 
80 |   if (!currentMember || !workspace) {
81 |     return (
82 |       <div className="flex items-center justify-center h-full">
83 |         <div className="flex flex-col items-center gap-y-2">
84 |           <AlertTriangle className="text-white h-8 w-8" />
85 |           <span className="text-white text-sm">Workspace not found</span>
86 |         </div>
87 |       </div>
88 |     );
89 |   }
90 | 
91 |   return (
92 |     <div className="flex flex-col h-full text-white">
93 |       <div className="p-3">
94 |         <WorkspaceHeader
95 |           workspace={workspace}
96 |           isAdmin={currentMember.role === "admin"}
97 |         />
98 | 
99 |         <div className="space-y-8 mt-6">
100 |           <div className="space-y-6">
101 |             <div className="space-y-1">
102 |               {/* TODO: Implement threads */}
103 |               {/* <SidebarItem label="Threads" icon={MessageSquareText} id="threads" /> */}
104 |               {/* TODO: Implement drafts */}
105 |               {/* <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" /> */}
106 |             </div>
107 | 
108 |             <WorkspaceSection
109 |               label="Channels"
110 |               hint={currentMember.role === "admin" ? "+" : ""}
111 |               onNew={() => setOpen(true)}
112 |             >
113 |               {channels
114 |                 ?.filter((c) => c.type !== "dm")
115 |                 .map((channelItem) => (
116 |                   <SidebarItem
117 |                     label={channelItem.name}
118 |                     icon={Hash}
119 |                     key={channelItem._id}
120 |                     id={channelItem._id}
121 |                     href={`/workspace/${workspaceId}/channel/${channelItem._id}`}
122 |                     variant={pathname === `/workspace/${workspaceId}/channel/${channelItem._id}` ? "active" : "default"}
123 |                   />
124 |                 ))}
125 |             </WorkspaceSection>
126 | 
127 |             <WorkspaceSection 
128 |               label="Direct Messages"
129 |               hint="+"
130 |             >
131 |               {dmChannels.length === 0 ? (
132 |                 <div className="px-2 py-1 text-sm text-zinc-400">
133 |                   No direct messages yet
134 |                 </div>
135 |               ) : (
136 |                 dmChannels.map((channel) => (
137 |                   <SidebarItem
138 |                     key={channel._id}
139 |                     label={channel.name}
140 |                     id={channel._id}
141 |                     icon={Circle}
142 |                     iconClassName="h-2 w-2 mt-1 text-emerald-500"
143 |                     href={`/workspace/${workspaceId}/channel/${channel._id}`}
144 |                     variant={pathname === `/workspace/${workspaceId}/channel/${channel._id}` ? "active" : "default"}
145 |                   />
146 |                 ))
147 |               )}
148 | 
149 |               <div className="mt-2 pt-2 border-t border-white/10">
150 |                 {otherMembers.map((member) => (
151 |                   <button
152 |                     key={member._id}
153 |                     onClick={() => handleUserClick(member.user?._id as Id<"users">)}
154 |                     className="flex items-center gap-x-2 px-2 py-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md text-sm"
155 |                   >
156 |                     <span>{member.user?.name}</span>
157 |                   </button>
158 |                 ))}
159 |               </div>
160 |             </WorkspaceSection>
161 |           </div>
162 | 
163 |           <WorkspacePresence workspaceId={workspaceId} />
164 |         </div>
165 |       </div>
166 |     </div>
167 |   );
168 | };
```

src/app/workspace/[workspaceId]/workspace-switcher.tsx
```
1 | "use client";
2 | 
3 | import {
4 |   DropdownMenu,
5 |   DropdownMenuContent,
6 |   DropdownMenuItem,
7 |   DropdownMenuLabel,
8 |   DropdownMenuSeparator,
9 |   DropdownMenuTrigger,
10 | } from "@/components/ui/dropdown-menu";
11 | import { Button } from "@/components/ui/button";
12 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
13 | import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
14 | import { useGetWorkspaces } from "@/app/features/workspaces/api/use-get-workspaces";
15 | import { useCreateWorkspaceModal } from "@/app/features/workspaces/store/use-create-workspace-modal";
16 | import { Loader, Plus } from "lucide-react";
17 | import { useRouter } from "next/navigation";
18 | 
19 | export const WorkspaceSwitcher = () => {
20 |   const router = useRouter();
21 |   const workspaceId = useWorkspaceId();
22 | 
23 |   const [_isOpen, setIsOpen] = useCreateWorkspaceModal();
24 | 
25 |   const { data: currentWorkspace, isLoading: isWorkspaceLoading } = useGetWorkspace({ id: workspaceId });
26 |   const { data: workspaces, isLoading: isWorkspacesLoading } = useGetWorkspaces();
27 | 
28 |   const filteredWorkspaces = workspaces?.filter((w) => w?._id !== workspaceId) ?? [];
29 | 
30 |   return (
31 |     <DropdownMenu>
32 |       <DropdownMenuTrigger asChild>
33 |         <Button
34 |           className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 
35 |           text-slate-800 font-semibold text-xl">
36 |           {isWorkspaceLoading ? (
37 |             <Loader className="size-5 animate-spin shrink-0" />
38 |           ) : (
39 |             currentWorkspace?.name?.charAt(0).toUpperCase() || "W"
40 |           )}
41 |         </Button>
42 |       </DropdownMenuTrigger>
43 |       <DropdownMenuContent side="bottom" align="start" className="w-64">
44 |         <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
45 |         <DropdownMenuItem onClick={() => router.push(`/workspace/${workspaceId}`)} className="cursor-pointer flex-col justify-start items-start capitalize">
46 |           {currentWorkspace?.name}
47 |           <span className="text-xs text-muted-foreground">
48 |             Current workspace
49 |           </span>
50 |         </DropdownMenuItem>
51 |         {filteredWorkspaces.map((ws) => {
52 |           if (!ws) return null;
53 |           return (
54 |             <DropdownMenuItem 
55 |               key={ws._id} 
56 |               onClick={() => router.push(`/workspace/${ws._id}`)} 
57 |               className="cursor-pointer flex items-center"
58 |             >
59 |               <div className="size-9 relative overflow-hidden bg-[#1C2A24] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
60 |                 {ws.name.charAt(0).toUpperCase()}
61 |               </div>
62 |               <span className="capitalize truncate max-w-[150px]">{ws.name}</span>
63 |             </DropdownMenuItem>
64 |           );
65 |         })}
66 |         <DropdownMenuSeparator />
67 |         <DropdownMenuItem onClick={() => setIsOpen(true)} className="cursor-pointer">
68 |           <div className="size-9 relative overflow-hidden bg-[#1C2A24]/10 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
69 |             <Plus className="h-4 w-4" />
70 |           </div>
71 |           Create New Workspace
72 |         </DropdownMenuItem>
73 |       </DropdownMenuContent>
74 |     </DropdownMenu>
75 |   );
76 | };
```

src/components/ConvexClientProvider.tsx
```
1 | "use client";
2 | 
3 | import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
4 | import { ReactNode } from "react";
5 | import { ConvexReactClient } from "convex/react";
6 | 
7 | const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
8 | 
9 | export function ConvexClientProvider({ children }: { children: ReactNode }) {
10 |   return (
11 |     <ConvexAuthNextjsProvider client={convex}>
12 |       {children}
13 |     </ConvexAuthNextjsProvider>
14 |   );
15 | }
```

src/components/emoji-picker.tsx
```
1 | "use client";
2 | 
3 | import {
4 |   Popover,
5 |   PopoverContent,
6 |   PopoverTrigger,
7 | } from "@/components/ui/popover";
8 | 
9 | const COMMON_EMOJIS = [
10 |   { code: "thumbs_up", emoji: "👍" },
11 |   { code: "heart", emoji: "❤️" },
12 |   { code: "smile", emoji: "😊" },
13 |   { code: "party", emoji: "🎉" },
14 |   { code: "fire", emoji: "🔥" },
15 |   { code: "eyes", emoji: "👀" },
16 |   { code: "100", emoji: "💯" },
17 |   { code: "sparkles", emoji: "✨" },
18 |   { code: "raised_hands", emoji: "🙌" },
19 |   { code: "clap", emoji: "👏" },
20 | ];
21 | 
22 | interface EmojiPickerProps {
23 |   onEmojiSelect: (emoji: string) => void;
24 |   trigger: React.ReactNode;
25 | }
26 | 
27 | export function EmojiPicker({ onEmojiSelect, trigger }: EmojiPickerProps) {
28 |   return (
29 |     <Popover>
30 |       <PopoverTrigger asChild>
31 |         {trigger}
32 |       </PopoverTrigger>
33 |       <PopoverContent className="w-fit p-2" side="top">
34 |         <div className="flex flex-wrap gap-2">
35 |           {COMMON_EMOJIS.map(({ code, emoji }) => (
36 |             <button
37 |               key={code}
38 |               onClick={() => onEmojiSelect(code)}
39 |               className="hover:scale-125 transition-transform p-1"
40 |             >
41 |               {emoji}
42 |             </button>
43 |           ))}
44 |         </div>
45 |       </PopoverContent>
46 |     </Popover>
47 |   );
48 | } 
```

src/components/jotai-provider.tsx
```
1 | "use client";
2 | 
3 | import { Provider } from "jotai";
4 | 
5 | interface JotaiProviderProps {
6 |   children: React.ReactNode;
7 | }
8 | 
9 | export const JotaiProvider = ({ children }: JotaiProviderProps) => {
10 |   return <Provider>{children}</Provider>;
11 | };
```

src/components/modals.tsx
```
1 | 'use client';
2 | 
3 | import { useEffect, useState } from "react";
4 | import { CreateWorkspaceModal } from "@/app/features/workspaces/components/create-workspace-modal";
5 | import { CreateChannelModal } from "@/app/features/channels/components/create-channel-modal";
6 | 
7 | export const Modals = () => {
8 |   const [isMounted, setIsMounted] = useState(false);
9 | 
10 |   useEffect(() => {
11 |     setIsMounted(true);
12 |   }, []);
13 | 
14 |   if (!isMounted) {
15 |     return null;
16 |   }
17 | 
18 |   return (
19 |     <>
20 |       <CreateWorkspaceModal />
21 |       <CreateChannelModal />
22 |     </>
23 |   );
24 | };
```

src/components/ui/alert-dialog.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
5 | 
6 | import { cn } from "@/lib/utils"
7 | import { buttonVariants } from "@/components/ui/button"
8 | 
9 | const AlertDialog = AlertDialogPrimitive.Root
10 | 
11 | const AlertDialogTrigger = AlertDialogPrimitive.Trigger
12 | 
13 | const AlertDialogPortal = AlertDialogPrimitive.Portal
14 | 
15 | const AlertDialogOverlay = React.forwardRef<
16 |   React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
17 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
18 | >(({ className, ...props }, ref) => (
19 |   <AlertDialogPrimitive.Overlay
20 |     className={cn(
21 |       "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
22 |       className
23 |     )}
24 |     {...props}
25 |     ref={ref}
26 |   />
27 | ))
28 | AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName
29 | 
30 | const AlertDialogContent = React.forwardRef<
31 |   React.ElementRef<typeof AlertDialogPrimitive.Content>,
32 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
33 | >(({ className, ...props }, ref) => (
34 |   <AlertDialogPortal>
35 |     <AlertDialogOverlay />
36 |     <AlertDialogPrimitive.Content
37 |       ref={ref}
38 |       className={cn(
39 |         "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
40 |         className
41 |       )}
42 |       {...props}
43 |     />
44 |   </AlertDialogPortal>
45 | ))
46 | AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName
47 | 
48 | const AlertDialogHeader = ({
49 |   className,
50 |   ...props
51 | }: React.HTMLAttributes<HTMLDivElement>) => (
52 |   <div
53 |     className={cn(
54 |       "flex flex-col space-y-2 text-center sm:text-left",
55 |       className
56 |     )}
57 |     {...props}
58 |   />
59 | )
60 | AlertDialogHeader.displayName = "AlertDialogHeader"
61 | 
62 | const AlertDialogFooter = ({
63 |   className,
64 |   ...props
65 | }: React.HTMLAttributes<HTMLDivElement>) => (
66 |   <div
67 |     className={cn(
68 |       "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
69 |       className
70 |     )}
71 |     {...props}
72 |   />
73 | )
74 | AlertDialogFooter.displayName = "AlertDialogFooter"
75 | 
76 | const AlertDialogTitle = React.forwardRef<
77 |   React.ElementRef<typeof AlertDialogPrimitive.Title>,
78 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
79 | >(({ className, ...props }, ref) => (
80 |   <AlertDialogPrimitive.Title
81 |     ref={ref}
82 |     className={cn("text-lg font-semibold", className)}
83 |     {...props}
84 |   />
85 | ))
86 | AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName
87 | 
88 | const AlertDialogDescription = React.forwardRef<
89 |   React.ElementRef<typeof AlertDialogPrimitive.Description>,
90 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
91 | >(({ className, ...props }, ref) => (
92 |   <AlertDialogPrimitive.Description
93 |     ref={ref}
94 |     className={cn("text-sm text-muted-foreground", className)}
95 |     {...props}
96 |   />
97 | ))
98 | AlertDialogDescription.displayName =
99 |   AlertDialogPrimitive.Description.displayName
100 | 
101 | const AlertDialogAction = React.forwardRef<
102 |   React.ElementRef<typeof AlertDialogPrimitive.Action>,
103 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
104 | >(({ className, ...props }, ref) => (
105 |   <AlertDialogPrimitive.Action
106 |     ref={ref}
107 |     className={cn(buttonVariants(), className)}
108 |     {...props}
109 |   />
110 | ))
111 | AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName
112 | 
113 | const AlertDialogCancel = React.forwardRef<
114 |   React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
115 |   React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
116 | >(({ className, ...props }, ref) => (
117 |   <AlertDialogPrimitive.Cancel
118 |     ref={ref}
119 |     className={cn(
120 |       buttonVariants({ variant: "outline" }),
121 |       "mt-2 sm:mt-0",
122 |       className
123 |     )}
124 |     {...props}
125 |   />
126 | ))
127 | AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName
128 | 
129 | export {
130 |   AlertDialog,
131 |   AlertDialogPortal,
132 |   AlertDialogOverlay,
133 |   AlertDialogTrigger,
134 |   AlertDialogContent,
135 |   AlertDialogHeader,
136 |   AlertDialogFooter,
137 |   AlertDialogTitle,
138 |   AlertDialogDescription,
139 |   AlertDialogAction,
140 |   AlertDialogCancel,
141 | } 
```

src/components/ui/avatar.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as AvatarPrimitive from "@radix-ui/react-avatar"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Avatar = React.forwardRef<
9 |   React.ElementRef<typeof AvatarPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
11 | >(({ className, ...props }, ref) => (
12 |   <AvatarPrimitive.Root
13 |     ref={ref}
14 |     className={cn(
15 |       "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
16 |       className
17 |     )}
18 |     {...props}
19 |   />
20 | ))
21 | Avatar.displayName = AvatarPrimitive.Root.displayName
22 | 
23 | const AvatarImage = React.forwardRef<
24 |   React.ElementRef<typeof AvatarPrimitive.Image>,
25 |   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
26 | >(({ className, ...props }, ref) => (
27 |   <AvatarPrimitive.Image
28 |     ref={ref}
29 |     className={cn("aspect-square h-full w-full", className)}
30 |     {...props}
31 |   />
32 | ))
33 | AvatarImage.displayName = AvatarPrimitive.Image.displayName
34 | 
35 | const AvatarFallback = React.forwardRef<
36 |   React.ElementRef<typeof AvatarPrimitive.Fallback>,
37 |   React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
38 | >(({ className, ...props }, ref) => (
39 |   <AvatarPrimitive.Fallback
40 |     ref={ref}
41 |     className={cn(
42 |       "flex h-full w-full items-center justify-center rounded-full bg-muted",
43 |       className
44 |     )}
45 |     {...props}
46 |   />
47 | ))
48 | AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
49 | 
50 | export { Avatar, AvatarImage, AvatarFallback }
```

src/components/ui/button.tsx
```
1 | import * as React from "react"
2 | import { Slot } from "@radix-ui/react-slot"
3 | import { cva, type VariantProps } from "class-variance-authority"
4 | 
5 | import { cn } from "@/lib/utils"
6 | 
7 | const buttonVariants = cva(
8 |   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
9 |   {
10 |     variants: {
11 |       variant: {
12 |         default:
13 |           "bg-primary text-primary-foreground shadow hover:bg-primary/90",
14 |         destructive:
15 |           "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
16 |         outline:
17 |           "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
18 |         secondary:
19 |           "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
20 |         ghost: "hover:bg-accent hover:text-accent-foreground",
21 |         link: "text-primary underline-offset-4 hover:underline",
22 |         transparent: "bg-transparent hover:bg-accent/10 text-accent",
23 |       },
24 |       size: {
25 |         default: "h-9 px-4 py-2",
26 |         sm: "h-8 rounded-md px-3 text-xs",
27 |         lg: "h-10 rounded-md px-8",
28 |         icon: "h-9 w-9",
29 |         iconSm: "h-8 w-8",
30 |       },
31 |     },
32 |     defaultVariants: {
33 |       variant: "default",
34 |       size: "default",
35 |     },
36 |   }
37 | )
38 | 
39 | export interface ButtonProps
40 |   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
41 |     VariantProps<typeof buttonVariants> {
42 |   asChild?: boolean
43 | }
44 | 
45 | const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
46 |   ({ className, variant, size, asChild = false, ...props }, ref) => {
47 |     const Comp = asChild ? Slot : "button"
48 |     return (
49 |       <Comp
50 |         className={cn(buttonVariants({ variant, size, className }))}
51 |         ref={ref}
52 |         {...props}
53 |       />
54 |     )
55 |   }
56 | )
57 | Button.displayName = "Button"
58 | 
59 | export { Button, buttonVariants }
```

src/components/ui/card.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | const Card = React.forwardRef<
6 |   HTMLDivElement,
7 |   React.HTMLAttributes<HTMLDivElement>
8 | >(({ className, ...props }, ref) => (
9 |   <div
10 |     ref={ref}
11 |     className={cn(
12 |       "rounded-xl border bg-card text-card-foreground shadow",
13 |       className
14 |     )}
15 |     {...props}
16 |   />
17 | ))
18 | Card.displayName = "Card"
19 | 
20 | const CardHeader = React.forwardRef<
21 |   HTMLDivElement,
22 |   React.HTMLAttributes<HTMLDivElement>
23 | >(({ className, ...props }, ref) => (
24 |   <div
25 |     ref={ref}
26 |     className={cn("flex flex-col space-y-1.5 p-6", className)}
27 |     {...props}
28 |   />
29 | ))
30 | CardHeader.displayName = "CardHeader"
31 | 
32 | const CardTitle = React.forwardRef<
33 |   HTMLDivElement,
34 |   React.HTMLAttributes<HTMLDivElement>
35 | >(({ className, ...props }, ref) => (
36 |   <div
37 |     ref={ref}
38 |     className={cn("font-semibold leading-none tracking-tight", className)}
39 |     {...props}
40 |   />
41 | ))
42 | CardTitle.displayName = "CardTitle"
43 | 
44 | const CardDescription = React.forwardRef<
45 |   HTMLDivElement,
46 |   React.HTMLAttributes<HTMLDivElement>
47 | >(({ className, ...props }, ref) => (
48 |   <div
49 |     ref={ref}
50 |     className={cn("text-sm text-muted-foreground", className)}
51 |     {...props}
52 |   />
53 | ))
54 | CardDescription.displayName = "CardDescription"
55 | 
56 | const CardContent = React.forwardRef<
57 |   HTMLDivElement,
58 |   React.HTMLAttributes<HTMLDivElement>
59 | >(({ className, ...props }, ref) => (
60 |   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
61 | ))
62 | CardContent.displayName = "CardContent"
63 | 
64 | const CardFooter = React.forwardRef<
65 |   HTMLDivElement,
66 |   React.HTMLAttributes<HTMLDivElement>
67 | >(({ className, ...props }, ref) => (
68 |   <div
69 |     ref={ref}
70 |     className={cn("flex items-center p-6 pt-0", className)}
71 |     {...props}
72 |   />
73 | ))
74 | CardFooter.displayName = "CardFooter"
75 | 
76 | export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

src/components/ui/dialog.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as DialogPrimitive from "@radix-ui/react-dialog"
5 | import { X } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const Dialog = DialogPrimitive.Root
10 | 
11 | const DialogTrigger = DialogPrimitive.Trigger
12 | 
13 | const DialogPortal = DialogPrimitive.Portal
14 | 
15 | const DialogClose = DialogPrimitive.Close
16 | 
17 | const DialogOverlay = React.forwardRef<
18 |   React.ElementRef<typeof DialogPrimitive.Overlay>,
19 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
20 | >(({ className, ...props }, ref) => (
21 |   <DialogPrimitive.Overlay
22 |     ref={ref}
23 |     className={cn(
24 |       "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
25 |       className
26 |     )}
27 |     {...props}
28 |   />
29 | ))
30 | DialogOverlay.displayName = DialogPrimitive.Overlay.displayName
31 | 
32 | const DialogContent = React.forwardRef<
33 |   React.ElementRef<typeof DialogPrimitive.Content>,
34 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
35 | >(({ className, children, ...props }, ref) => (
36 |   <DialogPortal>
37 |     <DialogOverlay />
38 |     <DialogPrimitive.Content
39 |       ref={ref}
40 |       className={cn(
41 |         "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
42 |         className
43 |       )}
44 |       {...props}
45 |     >
46 |       {children}
47 |       <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
48 |         <X className="h-4 w-4" />
49 |         <span className="sr-only">Close</span>
50 |       </DialogPrimitive.Close>
51 |     </DialogPrimitive.Content>
52 |   </DialogPortal>
53 | ))
54 | DialogContent.displayName = DialogPrimitive.Content.displayName
55 | 
56 | const DialogHeader = ({
57 |   className,
58 |   ...props
59 | }: React.HTMLAttributes<HTMLDivElement>) => (
60 |   <div
61 |     className={cn(
62 |       "flex flex-col space-y-1.5 text-center sm:text-left",
63 |       className
64 |     )}
65 |     {...props}
66 |   />
67 | )
68 | DialogHeader.displayName = "DialogHeader"
69 | 
70 | const DialogFooter = ({
71 |   className,
72 |   ...props
73 | }: React.HTMLAttributes<HTMLDivElement>) => (
74 |   <div
75 |     className={cn(
76 |       "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
77 |       className
78 |     )}
79 |     {...props}
80 |   />
81 | )
82 | DialogFooter.displayName = "DialogFooter"
83 | 
84 | const DialogTitle = React.forwardRef<
85 |   React.ElementRef<typeof DialogPrimitive.Title>,
86 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
87 | >(({ className, ...props }, ref) => (
88 |   <DialogPrimitive.Title
89 |     ref={ref}
90 |     className={cn(
91 |       "text-lg font-semibold leading-none tracking-tight",
92 |       className
93 |     )}
94 |     {...props}
95 |   />
96 | ))
97 | DialogTitle.displayName = DialogPrimitive.Title.displayName
98 | 
99 | const DialogDescription = React.forwardRef<
100 |   React.ElementRef<typeof DialogPrimitive.Description>,
101 |   React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
102 | >(({ className, ...props }, ref) => (
103 |   <DialogPrimitive.Description
104 |     ref={ref}
105 |     className={cn("text-sm text-muted-foreground", className)}
106 |     {...props}
107 |   />
108 | ))
109 | DialogDescription.displayName = DialogPrimitive.Description.displayName
110 | 
111 | export {
112 |   Dialog,
113 |   DialogPortal,
114 |   DialogOverlay,
115 |   DialogTrigger,
116 |   DialogClose,
117 |   DialogContent,
118 |   DialogHeader,
119 |   DialogFooter,
120 |   DialogTitle,
121 |   DialogDescription,
122 | }
```

src/components/ui/dropdown-menu.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
5 | import { Check, ChevronRight, Circle } from "lucide-react"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const DropdownMenu = DropdownMenuPrimitive.Root
10 | 
11 | const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
12 | 
13 | const DropdownMenuGroup = DropdownMenuPrimitive.Group
14 | 
15 | const DropdownMenuPortal = DropdownMenuPrimitive.Portal
16 | 
17 | const DropdownMenuSub = DropdownMenuPrimitive.Sub
18 | 
19 | const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
20 | 
21 | const DropdownMenuSubTrigger = React.forwardRef<
22 |   React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
23 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
24 |     inset?: boolean
25 |   }
26 | >(({ className, inset, children, ...props }, ref) => (
27 |   <DropdownMenuPrimitive.SubTrigger
28 |     ref={ref}
29 |     className={cn(
30 |       "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
31 |       inset && "pl-8",
32 |       className
33 |     )}
34 |     {...props}
35 |   >
36 |     {children}
37 |     <ChevronRight className="ml-auto" />
38 |   </DropdownMenuPrimitive.SubTrigger>
39 | ))
40 | DropdownMenuSubTrigger.displayName =
41 |   DropdownMenuPrimitive.SubTrigger.displayName
42 | 
43 | const DropdownMenuSubContent = React.forwardRef<
44 |   React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
45 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
46 | >(({ className, ...props }, ref) => (
47 |   <DropdownMenuPrimitive.SubContent
48 |     ref={ref}
49 |     className={cn(
50 |       "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
51 |       className
52 |     )}
53 |     {...props}
54 |   />
55 | ))
56 | DropdownMenuSubContent.displayName =
57 |   DropdownMenuPrimitive.SubContent.displayName
58 | 
59 | const DropdownMenuContent = React.forwardRef<
60 |   React.ElementRef<typeof DropdownMenuPrimitive.Content>,
61 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
62 | >(({ className, sideOffset = 4, ...props }, ref) => (
63 |   <DropdownMenuPrimitive.Portal>
64 |     <DropdownMenuPrimitive.Content
65 |       ref={ref}
66 |       sideOffset={sideOffset}
67 |       className={cn(
68 |         "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
69 |         "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
70 |         className
71 |       )}
72 |       {...props}
73 |     />
74 |   </DropdownMenuPrimitive.Portal>
75 | ))
76 | DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName
77 | 
78 | const DropdownMenuItem = React.forwardRef<
79 |   React.ElementRef<typeof DropdownMenuPrimitive.Item>,
80 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
81 |     inset?: boolean
82 |   }
83 | >(({ className, inset, ...props }, ref) => (
84 |   <DropdownMenuPrimitive.Item
85 |     ref={ref}
86 |     className={cn(
87 |       "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
88 |       inset && "pl-8",
89 |       className
90 |     )}
91 |     {...props}
92 |   />
93 | ))
94 | DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName
95 | 
96 | const DropdownMenuCheckboxItem = React.forwardRef<
97 |   React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
98 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
99 | >(({ className, children, checked, ...props }, ref) => (
100 |   <DropdownMenuPrimitive.CheckboxItem
101 |     ref={ref}
102 |     className={cn(
103 |       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
104 |       className
105 |     )}
106 |     checked={checked}
107 |     {...props}
108 |   >
109 |     <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
110 |       <DropdownMenuPrimitive.ItemIndicator>
111 |         <Check className="h-4 w-4" />
112 |       </DropdownMenuPrimitive.ItemIndicator>
113 |     </span>
114 |     {children}
115 |   </DropdownMenuPrimitive.CheckboxItem>
116 | ))
117 | DropdownMenuCheckboxItem.displayName =
118 |   DropdownMenuPrimitive.CheckboxItem.displayName
119 | 
120 | const DropdownMenuRadioItem = React.forwardRef<
121 |   React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
122 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
123 | >(({ className, children, ...props }, ref) => (
124 |   <DropdownMenuPrimitive.RadioItem
125 |     ref={ref}
126 |     className={cn(
127 |       "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
128 |       className
129 |     )}
130 |     {...props}
131 |   >
132 |     <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
133 |       <DropdownMenuPrimitive.ItemIndicator>
134 |         <Circle className="h-2 w-2 fill-current" />
135 |       </DropdownMenuPrimitive.ItemIndicator>
136 |     </span>
137 |     {children}
138 |   </DropdownMenuPrimitive.RadioItem>
139 | ))
140 | DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName
141 | 
142 | const DropdownMenuLabel = React.forwardRef<
143 |   React.ElementRef<typeof DropdownMenuPrimitive.Label>,
144 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
145 |     inset?: boolean
146 |   }
147 | >(({ className, inset, ...props }, ref) => (
148 |   <DropdownMenuPrimitive.Label
149 |     ref={ref}
150 |     className={cn(
151 |       "px-2 py-1.5 text-sm font-semibold",
152 |       inset && "pl-8",
153 |       className
154 |     )}
155 |     {...props}
156 |   />
157 | ))
158 | DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName
159 | 
160 | const DropdownMenuSeparator = React.forwardRef<
161 |   React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
162 |   React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
163 | >(({ className, ...props }, ref) => (
164 |   <DropdownMenuPrimitive.Separator
165 |     ref={ref}
166 |     className={cn("-mx-1 my-1 h-px bg-muted", className)}
167 |     {...props}
168 |   />
169 | ))
170 | DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName
171 | 
172 | const DropdownMenuShortcut = ({
173 |   className,
174 |   ...props
175 | }: React.HTMLAttributes<HTMLSpanElement>) => {
176 |   return (
177 |     <span
178 |       className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
179 |       {...props}
180 |     />
181 |   )
182 | }
183 | DropdownMenuShortcut.displayName = "DropdownMenuShortcut"
184 | 
185 | export {
186 |   DropdownMenu,
187 |   DropdownMenuTrigger,
188 |   DropdownMenuContent,
189 |   DropdownMenuItem,
190 |   DropdownMenuCheckboxItem,
191 |   DropdownMenuRadioItem,
192 |   DropdownMenuLabel,
193 |   DropdownMenuSeparator,
194 |   DropdownMenuShortcut,
195 |   DropdownMenuGroup,
196 |   DropdownMenuPortal,
197 |   DropdownMenuSub,
198 |   DropdownMenuSubContent,
199 |   DropdownMenuSubTrigger,
200 |   DropdownMenuRadioGroup,
201 | }
```

src/components/ui/form.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as LabelPrimitive from "@radix-ui/react-label"
5 | import { Slot } from "@radix-ui/react-slot"
6 | import {
7 |   Controller,
8 |   ControllerProps,
9 |   FieldPath,
10 |   FieldValues,
11 |   FormProvider,
12 |   useFormContext,
13 | } from "react-hook-form"
14 | 
15 | import { cn } from "@/lib/utils"
16 | import { Label } from "@/components/ui/label"
17 | 
18 | const Form = FormProvider
19 | 
20 | type FormFieldContextValue<
21 |   TFieldValues extends FieldValues = FieldValues,
22 |   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
23 | > = {
24 |   name: TName
25 | }
26 | 
27 | const FormFieldContext = React.createContext<FormFieldContextValue>(
28 |   {} as FormFieldContextValue
29 | )
30 | 
31 | const FormField = <
32 |   TFieldValues extends FieldValues = FieldValues,
33 |   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
34 | >({
35 |   ...props
36 | }: ControllerProps<TFieldValues, TName>) => {
37 |   return (
38 |     <FormFieldContext.Provider value={{ name: props.name }}>
39 |       <Controller {...props} />
40 |     </FormFieldContext.Provider>
41 |   )
42 | }
43 | 
44 | const useFormField = () => {
45 |   const fieldContext = React.useContext(FormFieldContext)
46 |   const itemContext = React.useContext(FormItemContext)
47 |   const { getFieldState, formState } = useFormContext()
48 | 
49 |   const fieldState = getFieldState(fieldContext.name, formState)
50 | 
51 |   if (!fieldContext) {
52 |     throw new Error("useFormField should be used within <FormField>")
53 |   }
54 | 
55 |   const { id } = itemContext
56 | 
57 |   return {
58 |     id,
59 |     name: fieldContext.name,
60 |     formItemId: `${id}-form-item`,
61 |     formDescriptionId: `${id}-form-item-description`,
62 |     formMessageId: `${id}-form-item-message`,
63 |     ...fieldState,
64 |   }
65 | }
66 | 
67 | type FormItemContextValue = {
68 |   id: string
69 | }
70 | 
71 | const FormItemContext = React.createContext<FormItemContextValue>(
72 |   {} as FormItemContextValue
73 | )
74 | 
75 | const FormItem = React.forwardRef<
76 |   HTMLDivElement,
77 |   React.HTMLAttributes<HTMLDivElement>
78 | >(({ className, ...props }, ref) => {
79 |   const id = React.useId()
80 | 
81 |   return (
82 |     <FormItemContext.Provider value={{ id }}>
83 |       <div ref={ref} className={cn("space-y-2", className)} {...props} />
84 |     </FormItemContext.Provider>
85 |   )
86 | })
87 | FormItem.displayName = "FormItem"
88 | 
89 | const FormLabel = React.forwardRef<
90 |   React.ElementRef<typeof LabelPrimitive.Root>,
91 |   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
92 | >(({ className, ...props }, ref) => {
93 |   const { error, formItemId } = useFormField()
94 | 
95 |   return (
96 |     <Label
97 |       ref={ref}
98 |       className={cn(error && "text-destructive", className)}
99 |       htmlFor={formItemId}
100 |       {...props}
101 |     />
102 |   )
103 | })
104 | FormLabel.displayName = "FormLabel"
105 | 
106 | const FormControl = React.forwardRef<
107 |   React.ElementRef<typeof Slot>,
108 |   React.ComponentPropsWithoutRef<typeof Slot>
109 | >(({ ...props }, ref) => {
110 |   const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
111 | 
112 |   return (
113 |     <Slot
114 |       ref={ref}
115 |       id={formItemId}
116 |       aria-describedby={
117 |         !error
118 |           ? `${formDescriptionId}`
119 |           : `${formDescriptionId} ${formMessageId}`
120 |       }
121 |       aria-invalid={!!error}
122 |       {...props}
123 |     />
124 |   )
125 | })
126 | FormControl.displayName = "FormControl"
127 | 
128 | const FormDescription = React.forwardRef<
129 |   HTMLParagraphElement,
130 |   React.HTMLAttributes<HTMLParagraphElement>
131 | >(({ className, ...props }, ref) => {
132 |   const { formDescriptionId } = useFormField()
133 | 
134 |   return (
135 |     <p
136 |       ref={ref}
137 |       id={formDescriptionId}
138 |       className={cn("text-[0.8rem] text-muted-foreground", className)}
139 |       {...props}
140 |     />
141 |   )
142 | })
143 | FormDescription.displayName = "FormDescription"
144 | 
145 | const FormMessage = React.forwardRef<
146 |   HTMLParagraphElement,
147 |   React.HTMLAttributes<HTMLParagraphElement>
148 | >(({ className, children, ...props }, ref) => {
149 |   const { error, formMessageId } = useFormField()
150 |   const body = error ? String(error?.message) : children
151 | 
152 |   if (!body) {
153 |     return null
154 |   }
155 | 
156 |   return (
157 |     <p
158 |       ref={ref}
159 |       id={formMessageId}
160 |       className={cn("text-[0.8rem] font-medium text-destructive", className)}
161 |       {...props}
162 |     >
163 |       {body}
164 |     </p>
165 |   )
166 | })
167 | FormMessage.displayName = "FormMessage"
168 | 
169 | export {
170 |   useFormField,
171 |   Form,
172 |   FormItem,
173 |   FormLabel,
174 |   FormControl,
175 |   FormDescription,
176 |   FormMessage,
177 |   FormField,
178 | }
```

src/components/ui/input.tsx
```
1 | import * as React from "react"
2 | 
3 | import { cn } from "@/lib/utils"
4 | 
5 | const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
6 |   ({ className, type, ...props }, ref) => {
7 |     return (
8 |       <input
9 |         type={type}
10 |         className={cn(
11 |           "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
12 |           className
13 |         )}
14 |         ref={ref}
15 |         {...props}
16 |       />
17 |     )
18 |   }
19 | )
20 | Input.displayName = "Input"
21 | 
22 | export { Input }
```

src/components/ui/label.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as LabelPrimitive from "@radix-ui/react-label"
5 | import { cva, type VariantProps } from "class-variance-authority"
6 | 
7 | import { cn } from "@/lib/utils"
8 | 
9 | const labelVariants = cva(
10 |   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
11 | )
12 | 
13 | const Label = React.forwardRef<
14 |   React.ElementRef<typeof LabelPrimitive.Root>,
15 |   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
16 |     VariantProps<typeof labelVariants>
17 | >(({ className, ...props }, ref) => (
18 |   <LabelPrimitive.Root
19 |     ref={ref}
20 |     className={cn(labelVariants(), className)}
21 |     {...props}
22 |   />
23 | ))
24 | Label.displayName = LabelPrimitive.Root.displayName
25 | 
26 | export { Label }
```

src/components/ui/popover.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as PopoverPrimitive from "@radix-ui/react-popover"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Popover = PopoverPrimitive.Root
9 | 
10 | const PopoverTrigger = PopoverPrimitive.Trigger
11 | 
12 | const PopoverContent = React.forwardRef<
13 |   React.ElementRef<typeof PopoverPrimitive.Content>,
14 |   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
15 | >(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
16 |   <PopoverPrimitive.Portal>
17 |     <PopoverPrimitive.Content
18 |       ref={ref}
19 |       align={align}
20 |       sideOffset={sideOffset}
21 |       className={cn(
22 |         "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
23 |         className
24 |       )}
25 |       {...props}
26 |     />
27 |   </PopoverPrimitive.Portal>
28 | ))
29 | PopoverContent.displayName = PopoverPrimitive.Content.displayName
30 | 
31 | export { Popover, PopoverTrigger, PopoverContent }
```

src/components/ui/resizable.tsx
```
1 | "use client"
2 | 
3 | import { GripVertical } from "lucide-react"
4 | import * as ResizablePrimitive from "react-resizable-panels"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const ResizablePanelGroup = ({
9 |   className,
10 |   ...props
11 | }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
12 |   <ResizablePrimitive.PanelGroup
13 |     className={cn(
14 |       "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
15 |       className
16 |     )}
17 |     {...props}
18 |   />
19 | )
20 | 
21 | const ResizablePanel = ResizablePrimitive.Panel
22 | 
23 | const ResizableHandle = ({
24 |   withHandle,
25 |   className,
26 |   ...props
27 | }: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
28 |   withHandle?: boolean
29 | }) => (
30 |   <ResizablePrimitive.PanelResizeHandle
31 |     className={cn(
32 |       "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
33 |       className
34 |     )}
35 |     {...props}
36 |   >
37 |     {withHandle && (
38 |       <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
39 |         <GripVertical className="h-2.5 w-2.5" />
40 |       </div>
41 |     )}
42 |   </ResizablePrimitive.PanelResizeHandle>
43 | )
44 | 
45 | export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
```

src/components/ui/separator.tsx
```
1 | "use client"
2 | 
3 | import * as React from "react"
4 | import * as SeparatorPrimitive from "@radix-ui/react-separator"
5 | 
6 | import { cn } from "@/lib/utils"
7 | 
8 | const Separator = React.forwardRef<
9 |   React.ElementRef<typeof SeparatorPrimitive.Root>,
10 |   React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
11 | >(
12 |   (
13 |     { className, orientation = "horizontal", decorative = true, ...props },
14 |     ref
15 |   ) => (
16 |     <SeparatorPrimitive.Root
17 |       ref={ref}
18 |       decorative={decorative}
19 |       orientation={orientation}
20 |       className={cn(
21 |         "shrink-0 bg-border",
22 |         orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
23 |         className
24 |       )}
25 |       {...props}
26 |     />
27 |   )
28 | )
29 | Separator.displayName = SeparatorPrimitive.Root.displayName
30 | 
31 | export { Separator }
```

src/components/ui/skeleton.tsx
```
1 | import { cn } from "@/lib/utils"
2 | 
3 | function Skeleton({
4 |   className,
5 |   ...props
6 | }: React.HTMLAttributes<HTMLDivElement>) {
7 |   return (
8 |     <div
9 |       className={cn("animate-pulse rounded-md bg-primary/10", className)}
10 |       {...props}
11 |     />
12 |   )
13 | }
14 | 
15 | export { Skeleton }
```

src/hooks/use-workspace-id.ts
```
1 | import { useParams } from "next/navigation";
2 | import { Id } from "../../convex/_generated/dataModel";
3 | 
4 | export const useWorkspaceId = () => {
5 |   const params = useParams();
6 |   return params.workspaceId as Id<"workspaces">;
7 | 
8 | }; 
```

src/lib/utils.ts
```
1 | import { clsx, type ClassValue } from "clsx"
2 | import { twMerge } from "tailwind-merge"
3 | 
4 | export function cn(...inputs: ClassValue[]) {
5 |   return twMerge(clsx(inputs))
6 | }
```

src/middleware.ts
```
1 | import {
2 |   convexAuthNextjsMiddleware,
3 |   createRouteMatcher,
4 |   nextjsMiddlewareRedirect,
5 | } from "@convex-dev/auth/nextjs/server";
6 | 
7 | const isSignInPage = createRouteMatcher(["/signin"]);
8 | const isProtectedRoute = createRouteMatcher([
9 |   "/",
10 |   "/dashboard(.*)",
11 |   "/test(.*)",
12 |   "/workspace(.*)",
13 |   "/join(.*)"
14 | ]);
15 | 
16 | export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
17 |   if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
18 |     return nextjsMiddlewareRedirect(request, "/dashboard");
19 |   }
20 |   if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
21 |     return nextjsMiddlewareRedirect(request, "/signin");
22 |   }
23 | }); 
24 | 
25 | export const config = {
26 |   // The following matcher runs middleware on all routes
27 |   // except static assets.
28 |   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
29 | }; 
```

tailwind.config.ts
```
1 | import type { Config } from "tailwindcss";
2 | 
3 | export default {
4 |     darkMode: ["class"],
5 |     content: [
6 |     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
7 |     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
8 |     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
9 |   ],
10 |   theme: {
11 |   	extend: {
12 |   		colors: {
13 |   			background: 'hsl(var(--background))',
14 |   			foreground: 'hsl(var(--foreground))',
15 |   			card: {
16 |   				DEFAULT: 'hsl(var(--card))',
17 |   				foreground: 'hsl(var(--card-foreground))'
18 |   			},
19 |   			popover: {
20 |   				DEFAULT: 'hsl(var(--popover))',
21 |   				foreground: 'hsl(var(--popover-foreground))'
22 |   			},
23 |   			primary: {
24 |   				DEFAULT: 'hsl(var(--primary))',
25 |   				foreground: 'hsl(var(--primary-foreground))'
26 |   			},
27 |   			secondary: {
28 |   				DEFAULT: 'hsl(var(--secondary))',
29 |   				foreground: 'hsl(var(--secondary-foreground))'
30 |   			},
31 |   			muted: {
32 |   				DEFAULT: 'hsl(var(--muted))',
33 |   				foreground: 'hsl(var(--muted-foreground))'
34 |   			},
35 |   			accent: {
36 |   				DEFAULT: 'hsl(var(--accent))',
37 |   				foreground: 'hsl(var(--accent-foreground))'
38 |   			},
39 |   			destructive: {
40 |   				DEFAULT: 'hsl(var(--destructive))',
41 |   				foreground: 'hsl(var(--destructive-foreground))'
42 |   			},
43 |   			border: 'hsl(var(--border))',
44 |   			input: 'hsl(var(--input))',
45 |   			ring: 'hsl(var(--ring))',
46 |   			chart: {
47 |   				'1': 'hsl(var(--chart-1))',
48 |   				'2': 'hsl(var(--chart-2))',
49 |   				'3': 'hsl(var(--chart-3))',
50 |   				'4': 'hsl(var(--chart-4))',
51 |   				'5': 'hsl(var(--chart-5))'
52 |   			}
53 |   		},
54 |   		borderRadius: {
55 |   			lg: 'var(--radius)',
56 |   			md: 'calc(var(--radius) - 2px)',
57 |   			sm: 'calc(var(--radius) - 4px)'
58 |   		}
59 |   	}
60 |   },
61 |   plugins: [require("tailwindcss-animate")],
62 | } satisfies Config;
```

tsconfig.json
```
1 | {
2 |   "compilerOptions": {
3 |     "target": "ES2017",
4 |     "lib": ["dom", "dom.iterable", "esnext"],
5 |     "allowJs": true,
6 |     "skipLibCheck": true,
7 |     "strict": true,
8 |     "noEmit": true,
9 |     "esModuleInterop": true,
10 |     "module": "esnext",
11 |     "moduleResolution": "bundler",
12 |     "resolveJsonModule": true,
13 |     "isolatedModules": true,
14 |     "jsx": "preserve",
15 |     "incremental": true,
16 |     "plugins": [
17 |       {
18 |         "name": "next"
19 |       }
20 |     ],
21 |     "paths": {
22 |       "@/*": ["./src/*"]
23 |     }
24 |   },
25 |   "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
26 |   "exclude": ["node_modules"]
27 | }
```

