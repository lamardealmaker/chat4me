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
│   ├── crons.ts
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
19 | import type * as crons from "../crons.js";
20 | import type * as embeddings from "../embeddings.js";
21 | import type * as http from "../http.js";
22 | import type * as members from "../members.js";
23 | import type * as messages from "../messages.js";
24 | import type * as presence from "../presence.js";
25 | import type * as users from "../users.js";
26 | import type * as workspaces from "../workspaces.js";
27 | 
28 | /**
29 |  * A utility for referencing Convex functions in your app's API.
30 |  *
31 |  * Usage:
32 |  * ```js
33 |  * const myFunctionReference = api.myModule.myFunction;
34 |  * ```
35 |  */
36 | declare const fullApi: ApiFromModules<{
37 |   ai: typeof ai;
38 |   auth: typeof auth;
39 |   channels: typeof channels;
40 |   crons: typeof crons;
41 |   embeddings: typeof embeddings;
42 |   http: typeof http;
43 |   members: typeof members;
44 |   messages: typeof messages;
45 |   presence: typeof presence;
46 |   users: typeof users;
47 |   workspaces: typeof workspaces;
48 | }>;
49 | export declare const api: FilterApi<
50 |   typeof fullApi,
51 |   FunctionReference<any, "public">
52 | >;
53 | export declare const internal: FilterApi<
54 |   typeof fullApi,
55 |   FunctionReference<any, "internal">
56 | >;
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
2 | import { ActionCtx, MutationCtx, QueryCtx } from "./_generated/server";
3 | import { mutation, query, action, internalQuery, internalMutation } from "./_generated/server";
4 | import { api, internal } from "./_generated/api";
5 | import { Doc, Id } from "./_generated/dataModel";
6 | import { auth } from "./auth";
7 | 
8 | // Queue an AI response task
9 | export const queueResponse = mutation({
10 |   args: {
11 |     channelId: v.id("channels"),
12 |     userId: v.id("users"),
13 |     messageId: v.id("messages"),
14 |   },
15 |   handler: async (ctx: MutationCtx, { channelId, userId, messageId }) => {
16 |     console.log("Queueing AI response", { channelId, userId, messageId });
17 |     const taskId = await ctx.db.insert("aiTasks", {
18 |       channelId,
19 |       userId,
20 |       messageId,
21 |       status: "pending",
22 |       createdAt: Date.now(),
23 |     });
24 |     console.log("Created AI task", { taskId });
25 |     return taskId;
26 |   },
27 | });
28 | 
29 | // Get pending AI tasks
30 | export const getPendingTasks = internalQuery({
31 |   args: {},
32 |   handler: async (ctx: QueryCtx) => {
33 |     return await ctx.db
34 |       .query("aiTasks")
35 |       .withIndex("by_status", (q: any) => q.eq("status", "pending"))
36 |       .collect();
37 |   },
38 | });
39 | 
40 | // Update AI task status
41 | export const updateTaskStatus = internalMutation({
42 |   args: {
43 |     taskId: v.id("aiTasks"),
44 |     status: v.union(
45 |       v.literal("pending"),
46 |       v.literal("processing"),
47 |       v.literal("completed"),
48 |       v.literal("failed")
49 |     ),
50 |     completedAt: v.optional(v.number()),
51 |     error: v.optional(v.string()),
52 |   },
53 |   handler: async (ctx: MutationCtx, { taskId, status, completedAt, error }) => {
54 |     await ctx.db.patch(taskId, {
55 |       status,
56 |       ...(completedAt && { completedAt }),
57 |       ...(error && { error }),
58 |     });
59 |   },
60 | });
61 | 
62 | // Helper function to get recent messages
63 | export const getRecentMessages = internalQuery({
64 |   args: { userId: v.id("users") },
65 |   handler: async (ctx: QueryCtx, { userId }) => {
66 |     const messages = await ctx.db
67 |       .query("messages")
68 |       .withIndex("by_user_id", (q: any) => q.eq("userId", userId))
69 |       .order("desc")
70 |       .take(25);
71 |     return messages;
72 |   },
73 | });
74 | 
75 | // Process pending AI tasks
76 | export const processPendingTasks = action({
77 |   args: {},
78 |   handler: async (ctx: ActionCtx) => {
79 |     const timestamp = new Date().toISOString();
80 |     console.log(`[${timestamp}] 🤖 CRON: Starting processPendingTasks`);
81 |     
82 |     // Get pending tasks
83 |     const tasks = await ctx.runQuery(internal.ai.getPendingTasks, {});
84 |     console.log(`[${timestamp}] 🤖 CRON: Found ${tasks.length} pending tasks`);
85 |     
86 |     if (tasks.length === 0) {
87 |       console.log(`[${timestamp}] 🤖 CRON: No pending tasks to process`);
88 |       return;
89 |     }
90 |     
91 |     for (const task of tasks) {
92 |       try {
93 |         console.log(`[${timestamp}] 🤖 CRON: Processing task ${task._id}`);
94 |         // Mark as processing
95 |         await ctx.runMutation(internal.ai.updateTaskStatus, {
96 |           taskId: task._id,
97 |           status: "processing",
98 |         });
99 | 
100 |         // Get the message to respond to
101 |         const message = await ctx.runQuery(api.messages.getById, {
102 |           messageId: task.messageId,
103 |         });
104 |         if (!message) {
105 |           console.error(`[${timestamp}] 🤖 CRON: Message not found ${task.messageId}`);
106 |           continue;
107 |         }
108 | 
109 |         // Get similar messages for context
110 |         const similarMessages = await ctx.runAction(api.embeddings.findSimilarMessages, {
111 |           text: message.text,
112 |           limit: 5,
113 |         });
114 |         console.log(`[${timestamp}] 🤖 CRON: Found ${similarMessages.length} similar messages`);
115 | 
116 |         // Generate AI response based on context
117 |         const response = await generateAIResponse(ctx, message, similarMessages);
118 |         console.log(`[${timestamp}] 🤖 CRON: Generated AI response (${response.length} chars)`);
119 | 
120 |         // Send the response as the offline user, but marked as AI
121 |         await ctx.runMutation(api.messages.send, {
122 |           channelId: task.channelId,
123 |           text: response,
124 |           parentMessageId: message.parentMessageId,
125 |           isAI: true,
126 |           userId: task.userId,
127 |         });
128 |         console.log(`[${timestamp}] 🤖 CRON: Sent AI response`);
129 | 
130 |         // Mark as completed
131 |         await ctx.runMutation(internal.ai.updateTaskStatus, {
132 |           taskId: task._id,
133 |           status: "completed",
134 |           completedAt: Date.now(),
135 |         });
136 |         console.log(`[${timestamp}] 🤖 CRON: Completed task ${task._id}`);
137 |       } catch (error: any) {
138 |         console.error(`[${timestamp}] 🤖 CRON: Failed to process task ${task._id}`, {
139 |           error: error.message,
140 |           stack: error.stack
141 |         });
142 |         // Mark as failed
143 |         await ctx.runMutation(internal.ai.updateTaskStatus, {
144 |           taskId: task._id,
145 |           status: "failed",
146 |           error: error.message,
147 |         });
148 |       }
149 |     }
150 |   },
151 | });
152 | 
153 | // Helper function to generate AI response
154 | async function generateAIResponse(
155 |   ctx: ActionCtx,
156 |   message: Doc<"messages">,
157 |   similarMessages: Array<Doc<"messages"> & { userName: string }>
158 | ): Promise<string> {
159 |   const apiKey = process.env.OPENAI_API_KEY;
160 |   if (!apiKey) {
161 |     throw new Error("OPENAI_API_KEY environment variable not set");
162 |   }
163 | 
164 |   // Get user's recent messages for style matching
165 |   const recentMessages = await ctx.runQuery(internal.ai.getRecentMessages, {
166 |     userId: message.userId,
167 |   });
168 | 
169 |   // If this is a thread reply, get the parent message for context
170 |   let threadContext = "";
171 |   if (message.parentMessageId) {
172 |     const parentMessage = await ctx.runQuery(api.messages.getMessage, { messageId: message.parentMessageId });
173 |     if (parentMessage) {
174 |       threadContext = `\nThis is a reply to the following message: "${parentMessage.text}"
175 | Please ensure your response is relevant to this specific conversation thread.`;
176 |     }
177 |   }
178 | 
179 |   // Build the prompt
180 |   const prompt = `Please respond to this message: "${message.text}"${threadContext}
181 | 
182 | ${message.parentMessageId ? 'Here are some similar thread responses for context:' : 'Here is context of possible answers:'}
183 | ${similarMessages.map(m => `- ${m.text}`).join('\n')}
184 | 
185 | Here is the user's writing style and tone (examples from their 25 latest messages):
186 | ${recentMessages.map((m: Doc<"messages">) => `- ${m.text}`).join('\n')}
187 | 
188 | ${message.parentMessageId ? 'Keep the response focused on the thread topic and parent message context.' : 'Output answer using the user\'s style and personality.'}`;
189 | 
190 |   // Call OpenAI for response
191 |   const response = await fetch("https://api.openai.com/v1/chat/completions", {
192 |     method: "POST",
193 |     headers: {
194 |       "Content-Type": "application/json",
195 |       Authorization: `Bearer ${apiKey}`,
196 |     },
197 |     body: JSON.stringify({
198 |         // dont change model name
199 |       model: "gpt-4o-mini",
200 |       messages: [
201 |         {
202 |           role: "system",
203 |           content: message.parentMessageId 
204 |             ? "You are an AI assistant responding in a message thread. Focus on the specific conversation context while matching the user's style."
205 |             : "You are an AI assistant responding on behalf of a user. Match their writing style, tone, and personality while providing helpful responses.",
206 |         },
207 |         {
208 |           role: "user",
209 |           content: prompt,
210 |         },
211 |       ],
212 |       temperature: 0.7,
213 |     }),
214 |   });
215 | 
216 |   if (!response.ok) {
217 |     throw new Error(`OpenAI API error: ${response.statusText}`);
218 |   }
219 | 
220 |   const result = await response.json();
221 |   return result.choices[0].message.content;
222 | }
223 | 
224 | // Debug functions
225 | export const testAIResponse = mutation({
226 |   args: {
227 |     workspaceId: v.optional(v.id("workspaces")),
228 |   },
229 |   handler: async (ctx: MutationCtx, args) => {
230 |     // 1. Get current user
231 |     const userId = await auth.getUserId(ctx);
232 |     if (!userId) throw new Error("Not authenticated");
233 | 
234 |     // 2. Get or use provided workspace
235 |     const workspaceId = args.workspaceId || await ctx.db
236 |       .query("workspaces")
237 |       .first()
238 |       .then((ws: Doc<"workspaces"> | null) => ws?._id);
239 |     if (!workspaceId) throw new Error("No workspace found");
240 | 
241 |     // 3. Find another user in the workspace
242 |     const otherMember = await ctx.db
243 |       .query("members")
244 |       .withIndex("by_workspace_id", (q: any) => q.eq("workspaceId", workspaceId))
245 |       .filter((q: any) => q.neq(q.field("userId"), userId))
246 |       .first();
247 |     if (!otherMember) throw new Error("No other user found");
248 | 
249 |     // 4. Create or get DM channel
250 |     const channel = await ctx.db
251 |       .query("channels")
252 |       .withIndex("by_workspace_id", (q: any) => q.eq("workspaceId", workspaceId))
253 |       .filter((q: any) => 
254 |         q.and(
255 |           q.eq(q.field("type"), "dm"),
256 |           q.eq(q.field("userIds"), [userId, otherMember.userId].sort())
257 |         )
258 |       )
259 |       .first();
260 | 
261 |     const channelId = channel?._id || await ctx.db.insert("channels", {
262 |       workspaceId,
263 |       type: "dm",
264 |       userIds: [userId, otherMember.userId].sort(),
265 |       name: "Test DM"
266 |     });
267 | 
268 |     // 5. Send test message
269 |     const messageId = await ctx.db.insert("messages", {
270 |       channelId,
271 |       userId,
272 |       text: "This is a test message to trigger an AI response",
273 |       createdAt: Date.now(),
274 |     });
275 | 
276 |     // 6. Queue AI response
277 |     await ctx.db.insert("aiTasks", {
278 |       channelId,
279 |       userId: otherMember.userId,
280 |       messageId,
281 |       status: "pending",
282 |       createdAt: Date.now(),
283 |     });
284 | 
285 |     return {
286 |       channelId,
287 |       messageId,
288 |       otherUserId: otherMember.userId,
289 |       status: "Test message sent and AI task queued"
290 |     };
291 |   },
292 | });
293 | 
294 | // Debug query to check pending tasks
295 | export const checkPendingTasks = query({
296 |   args: {},
297 |   handler: async (ctx: QueryCtx) => {
298 |     const tasks = await ctx.db
299 |       .query("aiTasks")
300 |       .filter((q: any) => q.eq(q.field("status"), "pending"))
301 |       .collect();
302 |     
303 |     return tasks.map((task: Doc<"aiTasks">) => ({
304 |       ...task,
305 |       createdAt: new Date(task.createdAt).toISOString()
306 |     }));
307 |   },
308 | });
309 | 
310 | // Debug query to check full flow
311 | export const debugFullFlow = query({
312 |   args: {},
313 |   handler: async (ctx: QueryCtx) => {
314 |     const userId = await auth.getUserId(ctx);
315 |     if (!userId) return { 
316 |       tasks: [],
317 |       messages: [],
318 |       status: "error: not authenticated" 
319 |     };
320 | 
321 |     try {
322 |       // 1. Check for pending tasks
323 |       const tasks = await ctx.db
324 |         .query("aiTasks")
325 |         .order("desc")
326 |         .take(5);
327 | 
328 |       const formattedTasks = tasks.map((t: Doc<"aiTasks">) => ({
329 |         ...t,
330 |         createdAt: new Date(t.createdAt).toISOString(),
331 |         completedAt: t.completedAt ? new Date(t.completedAt).toISOString() : undefined
332 |       }));
333 | 
334 |       // 2. Get messages from the most recent task's channel
335 |       let formattedMessages: Array<{
336 |         _id: Id<"messages">;
337 |         userId: Id<"users">;
338 |         channelId: Id<"channels">;
339 |         text: string;
340 |         createdAt: string;
341 |         userName: string;
342 |         isAIResponse: boolean;
343 |         parentMessageId?: Id<"messages">;
344 |       }> = [];
345 |       if (tasks.length > 0) {
346 |         const latestTask = tasks[0];
347 |         const messages = await ctx.db
348 |           .query("messages")
349 |           .withIndex("by_channel_id", (q: any) => q.eq("channelId", latestTask.channelId))
350 |           .order("desc")
351 |           .take(5);
352 | 
353 |         formattedMessages = await Promise.all(messages.map(async (msg: Doc<"messages">) => {
354 |           const user = await ctx.db.get(msg.userId);
355 |           return {
356 |             ...msg,
357 |             userName: user?.name || "Unknown",
358 |             createdAt: new Date(msg.createdAt).toISOString(),
359 |             isAIResponse: !!msg.isAI
360 |           };
361 |         }));
362 |       }
363 | 
364 |       return {
365 |         tasks: formattedTasks,
366 |         messages: formattedMessages,
367 |         status: "success"
368 |       };
369 |     } catch (error: any) {
370 |       return {
371 |         tasks: [],
372 |         messages: [],
373 |         status: `error: ${error.message}`
374 |       };
375 |     }
376 |   }
377 | });
378 | 
379 | // Internal query to get channel
380 | export const getChannel = internalQuery({
381 |   args: { channelId: v.id("channels") },
382 |   handler: async (ctx: QueryCtx, { channelId }) => {
383 |     return await ctx.db
384 |       .query("channels")
385 |       .filter((q) => q.eq(q.field("_id"), channelId))
386 |       .first();
387 |   },
388 | });
389 | 
390 | // Internal query to check workspace membership
391 | export const checkMembership = internalQuery({
392 |   args: { 
393 |     workspaceId: v.id("workspaces"),
394 |     userId: v.id("users")
395 |   },
396 |   handler: async (ctx: QueryCtx, { workspaceId, userId }) => {
397 |     return await ctx.db
398 |       .query("members")
399 |       .withIndex("by_workspace_id_and_user_id", (q) =>
400 |         q.eq("workspaceId", workspaceId).eq("userId", userId)
401 |       )
402 |       .first();
403 |   },
404 | });
405 | 
406 | export const generateSummary = action({
407 |   args: {
408 |     channelId: v.id("channels"),
409 |     threadId: v.optional(v.id("messages")),
410 |     type: v.union(v.literal("channel"), v.literal("dm"), v.literal("thread")),
411 |   },
412 |   handler: async (ctx, { channelId, threadId, type }) => {
413 |     const userId = await auth.getUserId(ctx);
414 |     if (!userId) throw new Error("Unauthorized");
415 | 
416 |     // Get channel using internal query
417 |     const channel = await ctx.runQuery(internal.ai.getChannel, { channelId });
418 |     if (!channel) throw new Error("Channel not found");
419 | 
420 |     // Verify workspace membership using internal query
421 |     const member = await ctx.runQuery(internal.ai.checkMembership, {
422 |       workspaceId: channel.workspaceId,
423 |       userId
424 |     });
425 |     if (!member) throw new Error("Not a member of this workspace");
426 | 
427 |     // Fetch messages based on type
428 |     let messages;
429 |     if (type === "thread" && threadId) {
430 |       messages = await ctx.runQuery(api.messages.listThread, { parentMessageId: threadId });
431 |       
432 |       // Add the parent message
433 |       const parentMessage = await ctx.runQuery(api.messages.getById, { messageId: threadId });
434 |       if (parentMessage) {
435 |         messages = [parentMessage, ...messages];
436 |       }
437 |     } else {
438 |       messages = await ctx.runQuery(api.messages.listRecent, { 
439 |         channelId,
440 |         hours: 24
441 |       });
442 |     }
443 | 
444 |     if (!messages || messages.length === 0) {
445 |       return "No messages found to summarize.";
446 |     }
447 | 
448 |     // Sort messages by timestamp
449 |     messages.sort((a, b) => a.createdAt - b.createdAt);
450 | 
451 |     // Build conversation context
452 |     const conversationContext = messages
453 |       .map((msg) => `${msg.userName || 'Unknown'}: ${msg.text}`)
454 |       .join("\n");
455 | 
456 |     // Generate summary prompt based on type
457 |     let prompt = "";
458 |     if (type === "channel") {
459 |       prompt = `Here's the last 24 hours of channel messages:\n\n${conversationContext}\n\nProvide a clear and concise summary of the key discussions and decisions from these channel messages.`;
460 |     } else if (type === "dm") {
461 |       prompt = `Here's the last 24 hours of direct messages:\n\n${conversationContext}\n\nProvide a clear and concise summary of the key points from this conversation.`;
462 |     } else {
463 |       prompt = `Here's a thread discussion:\n\n${conversationContext}\n\nProvide a clear and concise summary of this thread's discussion and any conclusions reached.`;
464 |     }
465 | 
466 |     // Call OpenAI for summary
467 |     const apiKey = process.env.OPENAI_API_KEY;
468 |     if (!apiKey) {
469 |       throw new Error("OPENAI_API_KEY environment variable not set");
470 |     }
471 | 
472 |     const response = await fetch("https://api.openai.com/v1/chat/completions", {
473 |       method: "POST",
474 |       headers: {
475 |         "Content-Type": "application/json",
476 |         Authorization: `Bearer ${apiKey}`,
477 |       },
478 |       body: JSON.stringify({
479 |         model: "gpt-4o-mini",
480 |         messages: [
481 |           {
482 |             role: "system",
483 |             content: "You are a helpful assistant that provides clear, concise summaries of chat conversations.",
484 |           },
485 |           {
486 |             role: "user",
487 |             content: prompt,
488 |           },
489 |         ],
490 |         temperature: 0.7,
491 |       }),
492 |     });
493 | 
494 |     if (!response.ok) {
495 |       throw new Error(`OpenAI API error: ${response.statusText}`);
496 |     }
497 | 
498 |     const result = await response.json();
499 |     return result.choices[0].message.content;
500 |   },
501 | });
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
124 |     // For DM channels, update names with current user names
125 |     const enhancedChannels = await Promise.all(channels.map(async channel => {
126 |       if (channel.type === "dm" && channel.userIds) {
127 |         const otherUserId = channel.userIds.find(id => id !== userId);
128 |         if (otherUserId) {
129 |           const otherUser = await ctx.db.get(otherUserId);
130 |           return {
131 |             ...channel,
132 |             name: otherUser?.name || "Unknown User"
133 |           };
134 |         }
135 |       }
136 |       return channel;
137 |     }));
138 | 
139 |     // Filter DM channels to only include ones where user is a participant
140 |     return enhancedChannels.filter(channel => 
141 |       channel.type !== "dm" || 
142 |       (channel.userIds && channel.userIds.includes(userId))
143 |     );
144 |   },
145 | });
146 | 
147 | export const cleanupDuplicateDMs = mutation({
148 |   args: {
149 |     workspaceId: v.id("workspaces"),
150 |   },
151 |   async handler(ctx, args) {
152 |     const userId = await auth.getUserId(ctx);
153 |     if (!userId) throw new Error("Unauthorized");
154 | 
155 |     // Get all DM channels for this workspace
156 |     const channels = await ctx.db
157 |       .query("channels")
158 |       .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
159 |       .filter((q) => q.eq(q.field("type"), "dm"))
160 |       .collect();
161 | 
162 |     // Group channels by their userIds
163 |     const channelGroups = new Map<string, Doc<"channels">[]>();
164 |     channels.forEach(channel => {
165 |       if (!channel.userIds) return;
166 |       const key = channel.userIds.sort().join(',');
167 |       if (!channelGroups.has(key)) {
168 |         channelGroups.set(key, []);
169 |       }
170 |       channelGroups.get(key)?.push(channel);
171 |     });
172 | 
173 |     // For each group of duplicate channels, keep the newest one
174 |     for (const [_, duplicates] of channelGroups) {
175 |       if (duplicates.length <= 1) continue;
176 |       
177 |       // Sort by creation time, newest first
178 |       duplicates.sort((a: Doc<"channels">, b: Doc<"channels">) => b._creationTime - a._creationTime);
179 |       
180 |       // Keep the first one (newest), delete the rest
181 |       const [keep, ...remove] = duplicates;
182 |       
183 |       // Update the kept channel if it has an empty name
184 |       if (!keep.name) {
185 |         const otherUserId = keep.userIds?.find((id: Id<"users">) => id !== userId);
186 |         if (otherUserId) {
187 |           const otherUser = await ctx.db.get(otherUserId);
188 |           if (otherUser?.name) {
189 |             await ctx.db.patch(keep._id, { name: otherUser.name });
190 |           }
191 |         }
192 |       }
193 |       
194 |       // Delete the duplicates
195 |       for (const channel of remove) {
196 |         await ctx.db.delete(channel._id);
197 |       }
198 |     }
199 |   },
200 | });
201 | 
202 | export const listDMChannels = query({
203 |   args: {},
204 |   handler: async (ctx) => {
205 |     const userId = await auth.getUserId(ctx);
206 |     if (!userId) return [];
207 | 
208 |     return await ctx.db
209 |       .query("channels")
210 |       .filter((q) => q.eq(q.field("type"), "dm"))
211 |       .collect();
212 |   },
213 | });
```

convex/crons.ts
```
1 | import { cronJobs } from "convex/server";
2 | import { api } from "./_generated/api";
3 | 
4 | const crons = cronJobs();
5 | 
6 | // Process AI tasks every minute
7 | crons.interval(
8 |   "process-ai-tasks",
9 |   { minutes: 1 },
10 |   api.ai.processPendingTasks,
11 |   {}
12 | );
13 | 
14 | // Make sure to export the crons object as the default export
15 | export default crons; 
```

convex/embeddings.ts
```
1 | import { v } from "convex/values";
2 | import { action, internalAction, internalMutation, internalQuery } from "./_generated/server";
3 | import OpenAI from "openai";
4 | import { internal } from "./_generated/api";
5 | import { Doc, Id } from "./_generated/dataModel";
6 | 
7 | // Type for search results
8 | type SearchResult = Doc<"messages"> & {
9 |   userName: string;
10 |   _score: number;
11 | };
12 | 
13 | function getOpenAIClient() {
14 |   const apiKey = process.env.OPENAI_API_KEY;
15 |   if (!apiKey) {
16 |     throw new Error("OPENAI_API_KEY environment variable is required");
17 |   }
18 |   return new OpenAI({ apiKey });
19 | }
20 | 
21 | export const generateEmbedding = internalAction({
22 |   args: { text: v.string() },
23 |   handler: async (ctx, { text }) => {
24 |     const openai = getOpenAIClient();
25 |     const response = await openai.embeddings.create({
26 |       model: "text-embedding-ada-002",
27 |       input: text,
28 |     });
29 |     return response.data[0].embedding;
30 |   },
31 | });
32 | 
33 | export const storeEmbedding = internalMutation({
34 |   args: {
35 |     messageId: v.id("messages"),
36 |     vector: v.array(v.float64()),
37 |   },
38 |   handler: async (ctx, { messageId, vector }) => {
39 |     await ctx.db.insert("messageEmbeddings", {
40 |       messageId,
41 |       vector,
42 |       createdAt: Date.now(),
43 |     });
44 |   },
45 | });
46 | 
47 | export const getMessage = internalQuery({
48 |   args: { messageId: v.id("messages") },
49 |   handler: async (ctx, { messageId }) => {
50 |     return await ctx.db.get(messageId);
51 |   },
52 | });
53 | 
54 | export const getUser = internalQuery({
55 |   args: { userId: v.id("users") },
56 |   handler: async (ctx, { userId }) => {
57 |     return await ctx.db.get(userId);
58 |   },
59 | });
60 | 
61 | export const fetchMessages = internalQuery({
62 |   args: { ids: v.array(v.id("messageEmbeddings")) },
63 |   handler: async (ctx, { ids }) => {
64 |     const results = [];
65 |     for (const id of ids) {
66 |       const embedding = await ctx.db.get(id);
67 |       if (!embedding) continue;
68 | 
69 |       const message = await ctx.db.get(embedding.messageId);
70 |       if (!message) continue;
71 | 
72 |       const user = await ctx.db.get(message.userId);
73 |       if (!user) continue;
74 | 
75 |       results.push({
76 |         ...message,
77 |         userName: user.name ?? "Unknown",
78 |       });
79 |     }
80 |     return results;
81 |   },
82 | });
83 | 
84 | export const generateAndStoreEmbedding = action({
85 |   args: { messageId: v.id("messages") },
86 |   handler: async (ctx, { messageId }) => {
87 |     const message = await ctx.runQuery(internal.embeddings.getMessage, { messageId });
88 |     if (!message) return;
89 | 
90 |     const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
91 |       text: message.text,
92 |     });
93 | 
94 |     await ctx.runMutation(internal.embeddings.storeEmbedding, {
95 |       messageId,
96 |       vector,
97 |     });
98 |   },
99 | });
100 | 
101 | export const findSimilarMessages = action({
102 |   args: {
103 |     text: v.string(),
104 |     limit: v.optional(v.number()),
105 |   },
106 |   handler: async (ctx, { text, limit = 4 }): Promise<SearchResult[]> => {
107 |     // Generate embedding for the search text
108 |     const vector = await ctx.runAction(internal.embeddings.generateEmbedding, {
109 |       text,
110 |     });
111 | 
112 |     // Use vector index to find similar messages
113 |     const results = await ctx.vectorSearch("messageEmbeddings", "by_vector", {
114 |       vector,
115 |       limit,
116 |     });
117 | 
118 |     // Fetch messages using internal query
119 |     const messages = await ctx.runQuery(internal.embeddings.fetchMessages, {
120 |       ids: results.map(r => r._id),
121 |     });
122 | 
123 |     // Add scores to messages
124 |     return messages.map((msg, i) => ({
125 |       ...msg,
126 |       _score: results[i]._score,
127 |     }));
128 |   },
129 | }); 
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
4 | import { api, internal } from "./_generated/api";
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
59 |     await ctx.scheduler.runAfter(0, api.embeddings.generateAndStoreEmbedding, {
60 |       messageId,
61 |     });
62 | 
63 |     // Only check for AI responses if this isn't already an AI message
64 |     if (!isAI) {
65 |       // Handle offline users based on channel type
66 |       const TWO_MINUTES = 2 * 60 * 1000;
67 |       const now = Date.now();
68 | 
69 |       if (channel.type === "dm" && channel.userIds) {
70 |         // For DM channels, check all other users
71 |         const otherUserIds = channel.userIds.filter(id => id !== effectiveUserId);
72 |         
73 |         for (const otherUserId of otherUserIds) {
74 |           // Check user's presence
75 |           const presence = await ctx.db
76 |             .query("userPresence")
77 |             .withIndex("by_workspace_and_user", (q) =>
78 |               q.eq("workspaceId", channel.workspaceId).eq("userId", otherUserId)
79 |             )
80 |             .first();
81 | 
82 |           // If user is offline, queue AI response
83 |           const isOffline = !presence || (now - presence.lastSeen > TWO_MINUTES);
84 |           if (isOffline) {
85 |             await ctx.scheduler.runAfter(0, api.ai.queueResponse, {
86 |               channelId,
87 |               userId: otherUserId,
88 |               messageId,
89 |             });
90 |           }
91 |         }
92 |       } else if (parentMessageId) {
93 |         // For channel messages, always respond if replying to someone else's message
94 |         const parentMessage = await ctx.db.get(parentMessageId);
95 |         if (parentMessage && parentMessage.userId !== effectiveUserId) {
96 |           await ctx.scheduler.runAfter(0, api.ai.queueResponse, {
97 |             channelId,
98 |             userId: parentMessage.userId,
99 |             messageId,
100 |           });
101 |         }
102 |       }
103 |     }
104 | 
105 |     return messageId;
106 |   },
107 | });
108 | 
109 | /**
110 |  * list() - fetch main channel messages, including user name
111 |  */
112 | export const list = query({
113 |   args: { channelId: v.id("channels") },
114 |   handler: async (ctx, args) => {
115 |     const messages = await ctx.db
116 |       .query("messages")
117 |       .withIndex("by_channel_id", (q) => q.eq("channelId", args.channelId))
118 |       .filter((q) => q.eq(q.field("parentMessageId"), undefined))
119 |       .collect();
120 | 
121 |     const results = [];
122 |     for (const msg of messages) {
123 |       const userDoc = await ctx.db.get(msg.userId);
124 |       
125 |       const reactions = await ctx.db
126 |         .query("reactions")
127 |         .withIndex("by_message_id", (q) => q.eq("messageId", msg._id))
128 |         .collect();
129 | 
130 |       const reactionGroups = reactions.reduce((acc, reaction) => {
131 |         const code = encodeURIComponent(reaction.emoji);
132 |         if (!acc[code]) {
133 |           acc[code] = { count: 0, users: [], emoji: reaction.emoji };
134 |         }
135 |         acc[code].count++;
136 |         acc[code].users.push(reaction.userId);
137 |         return acc;
138 |       }, {} as Record<string, { count: number; users: string[]; emoji: string }>);
139 | 
140 |       results.push({
141 |         ...msg,
142 |         userName: userDoc?.name || "Unknown",
143 |         reactions: reactionGroups,
144 |       });
145 |     }
146 | 
147 |     return results;
148 |   },
149 | });
150 | 
151 | /**
152 |  * listThread() - fetch all replies to a specified parentMessageId
153 |  */
154 | export const listThread = query({
155 |   args: { parentMessageId: v.id("messages") },
156 |   handler: async (ctx, { parentMessageId }) => {
157 |     const userId = await auth.getUserId(ctx);
158 |     if (!userId) return [];
159 | 
160 |     // Retrieve the parent message
161 |     const parentMsg = await ctx.db.get(parentMessageId);
162 |     if (!parentMsg) return [];
163 | 
164 |     const channel = await ctx.db.get(parentMsg.channelId);
165 |     if (!channel) return [];
166 | 
167 |     // Check membership
168 |     const member = await ctx.db
169 |       .query("members")
170 |       .withIndex("by_workspace_id_and_user_id", (q) =>
171 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
172 |       )
173 |       .first();
174 |     if (!member) return [];
175 | 
176 |     // Query replies
177 |     const replies = await ctx.db
178 |       .query("messages")
179 |       .withIndex("by_parent_message_id", (q) => q.eq("parentMessageId", parentMessageId))
180 |       .order("asc")
181 |       .collect();
182 | 
183 |     // Populate user name and reactions
184 |     const results = [];
185 |     for (const msg of replies) {
186 |       const userDoc = await ctx.db.get(msg.userId);
187 |       
188 |       // Get reactions
189 |       const reactions = await ctx.db
190 |         .query("reactions")
191 |         .withIndex("by_message_id", (q) => q.eq("messageId", msg._id))
192 |         .collect();
193 | 
194 |       // Group reactions
195 |       const reactionGroups = reactions.reduce((acc, reaction) => {
196 |         const code = encodeURIComponent(reaction.emoji);
197 |         if (!acc[code]) {
198 |           acc[code] = { count: 0, users: [], emoji: reaction.emoji };
199 |         }
200 |         acc[code].count++;
201 |         acc[code].users.push(reaction.userId);
202 |         return acc;
203 |       }, {} as Record<string, { count: number; users: string[]; emoji: string }>);
204 | 
205 |       results.push({
206 |         ...msg,
207 |         userName: userDoc?.name || "Unknown",
208 |         reactions: reactionGroups,
209 |       });
210 |     }
211 |     return results;
212 |   },
213 | });
214 | 
215 | /**
216 |  * toggleReaction - Add or remove an emoji reaction from a message
217 |  */
218 | export const toggleReaction = mutation({
219 |   args: {
220 |     messageId: v.id("messages"),
221 |     emoji: v.string(),
222 |   },
223 |   handler: async (ctx, { messageId, emoji }) => {
224 |     const userId = await auth.getUserId(ctx);
225 |     if (!userId) throw new Error("Unauthorized");
226 | 
227 |     // Get the message to check channel access
228 |     const message = await ctx.db.get(messageId);
229 |     if (!message) throw new Error("Message not found");
230 | 
231 |     const channel = await ctx.db.get(message.channelId);
232 |     if (!channel) throw new Error("Channel not found");
233 | 
234 |     // Verify user is a member of the workspace
235 |     const member = await ctx.db
236 |       .query("members")
237 |       .withIndex("by_workspace_id_and_user_id", (q) =>
238 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
239 |       )
240 |       .first();
241 |     if (!member) throw new Error("Not a member of this workspace");
242 | 
243 |     // Check if reaction already exists
244 |     const existing = await ctx.db
245 |       .query("reactions")
246 |       .withIndex("by_message_and_user", (q) =>
247 |         q.eq("messageId", messageId).eq("userId", userId)
248 |       )
249 |       .filter((q) => q.eq(q.field("emoji"), emoji))
250 |       .first();
251 | 
252 |     if (existing) {
253 |       // Remove reaction
254 |       await ctx.db.delete(existing._id);
255 |     } else {
256 |       // Add reaction
257 |       await ctx.db.insert("reactions", {
258 |         messageId,
259 |         userId,
260 |         emoji,
261 |       });
262 |     }
263 |   },
264 | });
265 | 
266 | /**
267 |  * get() - fetch a single message by ID, including user name
268 |  */
269 | export const get = query({
270 |   args: { messageId: v.id("messages") },
271 |   handler: async (ctx, { messageId }) => {
272 |     const userId = await auth.getUserId(ctx);
273 |     if (!userId) return null;
274 | 
275 |     const message = await ctx.db.get(messageId);
276 |     if (!message) return null;
277 | 
278 |     const channel = await ctx.db.get(message.channelId);
279 |     if (!channel) return null;
280 | 
281 |     // Check membership
282 |     const member = await ctx.db
283 |       .query("members")
284 |       .withIndex("by_workspace_id_and_user_id", (q) =>
285 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
286 |       )
287 |       .first();
288 |     if (!member) return null;
289 | 
290 |     // Get user info
291 |     const user = await ctx.db.get(message.userId);
292 | 
293 |     // Get reactions
294 |     const reactions = await ctx.db
295 |       .query("reactions")
296 |       .withIndex("by_message_id", (q) => q.eq("messageId", messageId))
297 |       .collect();
298 | 
299 |     // Group reactions
300 |     const reactionGroups = reactions.reduce((acc, reaction) => {
301 |       const code = encodeURIComponent(reaction.emoji);
302 |       if (!acc[code]) {
303 |         acc[code] = { count: 0, users: [], emoji: reaction.emoji };
304 |       }
305 |       acc[code].count++;
306 |       acc[code].users.push(reaction.userId);
307 |       return acc;
308 |     }, {} as Record<string, { count: number; users: string[]; emoji: string }>);
309 | 
310 |     return {
311 |       ...message,
312 |       userName: user?.name || "Unknown User",
313 |       reactions: reactionGroups,
314 |     };
315 |   },
316 | });
317 | 
318 | /**
319 |  * getReplyCount - Get the number of replies for a message
320 |  */
321 | export const getReplyCount = query({
322 |   args: { messageId: v.id("messages") },
323 |   handler: async (ctx, { messageId }) => {
324 |     const userId = await auth.getUserId(ctx);
325 |     if (!userId) return 0;
326 | 
327 |     const message = await ctx.db.get(messageId);
328 |     if (!message) return 0;
329 | 
330 |     const channel = await ctx.db.get(message.channelId);
331 |     if (!channel) return 0;
332 | 
333 |     // Check membership
334 |     const member = await ctx.db
335 |       .query("members")
336 |       .withIndex("by_workspace_id_and_user_id", (q) =>
337 |         q.eq("workspaceId", channel.workspaceId).eq("userId", userId)
338 |       )
339 |       .first();
340 |     if (!member) return 0;
341 | 
342 |     // Count replies using the index
343 |     const replies = await ctx.db
344 |       .query("messages")
345 |       .withIndex("by_parent_message_id", (q) => q.eq("parentMessageId", messageId))
346 |       .collect();
347 |     
348 |     return replies.length;
349 |   },
350 | });
351 | 
352 | export const getMessage = query({
353 |   args: { messageId: v.id("messages") },
354 |   handler: async (ctx, { messageId }) => {
355 |     return await ctx.db.get(messageId);
356 |   },
357 | });
358 | 
359 | export const listRecent = query({
360 |   args: { 
361 |     channelId: v.id("channels"),
362 |     hours: v.number()
363 |   },
364 |   handler: async (ctx, { channelId, hours }) => {
365 |     const cutoffTime = Date.now() - hours * 60 * 60 * 1000;
366 |     const messages = await ctx.db
367 |       .query("messages")
368 |       .withIndex("by_channel_id", (q) => q.eq("channelId", channelId))
369 |       .filter((q) => q.gt(q.field("createdAt"), cutoffTime))
370 |       .collect();
371 | 
372 |     const results = [];
373 |     for (const msg of messages) {
374 |       const userDoc = await ctx.db.get(msg.userId);
375 |       results.push({
376 |         ...msg,
377 |         userName: userDoc?.name || "Unknown"
378 |       });
379 |     }
380 | 
381 |     return results;
382 |   }
383 | });
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
36 |       const now = Date.now();
37 | 
38 |       if (existing) {
39 |         await ctx.db.patch(existing._id, {
40 |           status,
41 |           customStatus,
42 |           lastSeen: now,
43 |         });
44 |       } else {
45 |         await ctx.db.insert("userPresence", {
46 |           userId,
47 |           workspaceId,
48 |           status,
49 |           customStatus,
50 |           lastSeen: now,
51 |         });
52 |       }
53 |     } catch (error: any) {
54 |       // Silently handle any DB operation failures
55 |       return;
56 |     }
57 |   },
58 | });
59 | 
60 | // Get presence for all users in a workspace
61 | export const getWorkspacePresence = query({
62 |   args: { workspaceId: v.id("workspaces") },
63 |   handler: async (ctx, { workspaceId }) => {
64 |     const userId = await auth.getUserId(ctx);
65 |     if (!userId) return null;
66 | 
67 |     // Verify user is a member of the workspace
68 |     const member = await ctx.db
69 |       .query("members")
70 |       .withIndex("by_workspace_id_and_user_id", (q) =>
71 |         q.eq("workspaceId", workspaceId).eq("userId", userId)
72 |       )
73 |       .first();
74 |     if (!member) return null;
75 | 
76 |     // Get all presence records for the workspace
77 |     const presenceRecords = await ctx.db
78 |       .query("userPresence")
79 |       .withIndex("by_workspace", (q) => q.eq("workspaceId", workspaceId))
80 |       .collect();
81 | 
82 |     // Mark users as offline if they haven't been seen in 2 minutes
83 |     const TWO_MINUTES = 2 * 60 * 1000;
84 |     const now = Date.now();
85 | 
86 |     const enhancedRecords = await Promise.all(
87 |       presenceRecords.map(async (record) => {
88 |         const user = await ctx.db.get(record.userId);
89 |         return {
90 |           ...record,
91 |           status:
92 |             now - record.lastSeen > TWO_MINUTES ? "offline" : record.status,
93 |           userName: user?.name || "Unknown User",
94 |         };
95 |       })
96 |     );
97 | 
98 |     return enhancedRecords;
99 |   },
100 | });
101 | 
102 | // Get presence for a specific user in a workspace
103 | export const getUserPresence = query({
104 |   args: {
105 |     workspaceId: v.id("workspaces"),
106 |     userId: v.id("users"),
107 |   },
108 |   handler: async (ctx, { workspaceId, userId: targetUserId }) => {
109 |     const userId = await auth.getUserId(ctx);
110 |     if (!userId) return null;
111 | 
112 |     // Verify user is a member of the workspace
113 |     const member = await ctx.db
114 |       .query("members")
115 |       .withIndex("by_workspace_id_and_user_id", (q) =>
116 |         q.eq("workspaceId", workspaceId).eq("userId", userId)
117 |       )
118 |       .first();
119 |     if (!member) return null;
120 | 
121 |     // Get presence record for the target user
122 |     const presence = await ctx.db
123 |       .query("userPresence")
124 |       .withIndex("by_workspace_and_user", (q) =>
125 |         q.eq("workspaceId", workspaceId).eq("userId", targetUserId)
126 |       )
127 |       .first();
128 | 
129 |     if (!presence) return null;
130 | 
131 |     // Check if user is offline based on last seen
132 |     const TWO_MINUTES = 2 * 60 * 1000;
133 |     const now = Date.now();
134 |     const status = now - presence.lastSeen > TWO_MINUTES ? "offline" : presence.status;
135 | 
136 |     const user = await ctx.db.get(targetUserId);
137 |     return {
138 |       ...presence,
139 |       status,
140 |       userName: user?.name || "Unknown User",
141 |     };
142 |   },
143 | });
144 | 
145 | export const list = query({
146 |   args: {
147 |     workspaceId: v.id("workspaces"),
148 |   },
149 |   handler: async (ctx, args) => {
150 |     const userId = await auth.getUserId(ctx);
151 |     if (!userId) return [];
152 | 
153 |     const presence = await ctx.db
154 |       .query("userPresence")
155 |       .withIndex("by_workspace", (q) => q.eq("workspaceId", args.workspaceId))
156 |       .collect();
157 | 
158 |     // Mark users as offline if they haven't been seen in 2 minutes
159 |     const TWO_MINUTES = 2 * 60 * 1000;
160 |     const now = Date.now();
161 | 
162 |     return presence.map(record => ({
163 |       ...record,
164 |       status: now - record.lastSeen > TWO_MINUTES ? "offline" : record.status
165 |     }));
166 |   },
167 | }); 
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
53 |     formattedText: v.optional(v.string()),
54 |     createdAt: v.number(),
55 |     parentMessageId: v.optional(v.id("messages")),
56 |     isAI: v.optional(v.boolean()),
57 |   })
58 |     .index("by_channel_id", ["channelId"])
59 |     .index("by_user_id", ["userId"])
60 |     .index("by_parent_message_id", ["parentMessageId"]),
61 | 
62 |   messageEmbeddings: defineTable({
63 |     messageId: v.id("messages"),
64 |     vector: v.array(v.number()),
65 |     createdAt: v.number(),
66 |   })
67 |     .index("by_message_id", ["messageId"])
68 |     .vectorIndex("by_vector", {
69 |       vectorField: "vector",
70 |       dimensions: 1536,
71 |     }),
72 | 
73 |   aiTasks: defineTable({
74 |     channelId: v.id("channels"),
75 |     userId: v.id("users"),
76 |     messageId: v.id("messages"),
77 |     status: v.union(
78 |       v.literal("pending"),
79 |       v.literal("processing"),
80 |       v.literal("completed"),
81 |       v.literal("failed")
82 |     ),
83 |     createdAt: v.number(),
84 |     completedAt: v.optional(v.number()),
85 |     error: v.optional(v.string()),
86 |   })
87 |     .index("by_status", ["status"])
88 |     .index("by_channel", ["channelId"])
89 |     .index("by_user", ["userId"]),
90 | 
91 |   reactions: defineTable({
92 |     messageId: v.id("messages"),
93 |     userId: v.id("users"),
94 |     emoji: v.string(),
95 |   })
96 |     .index("by_message_id", ["messageId"])
97 |     .index("by_message_and_user", ["messageId", "userId"]),
98 | });
99 | 
100 | export default schema;
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
26 |     "@tailwindcss/typography": "^0.5.16",
27 |     "@types/jwt-decode": "^2.2.1",
28 |     "class-variance-authority": "^0.7.1",
29 |     "clsx": "^2.1.1",
30 |     "convex": "^1.17.4",
31 |     "emoji-mart": "^5.6.0",
32 |     "icons": "^1.0.0",
33 |     "jotai": "^2.11.0",
34 |     "jwt-decode": "^3.1.2",
35 |     "lucide-react": "^0.471.1",
36 |     "next": "15.1.4",
37 |     "openai": "^4.78.1",
38 |     "react": "^18.3.1",
39 |     "react-dom": "^18.3.1",
40 |     "react-hook-form": "^7.54.2",
41 |     "react-icons": "^5.4.0",
42 |     "react-markdown": "^9.0.3",
43 |     "react-resizable-panels": "^2.1.7",
44 |     "react-use": "^17.6.0",
45 |     "react-verification-input": "^4.2.0",
46 |     "sonner": "^1.7.1",
47 |     "tailwind-merge": "^2.6.0",
48 |     "tailwindcss-animate": "^1.0.7",
49 |     "zod": "^3.24.1",
50 |     "zustand": "^5.0.3"
51 |   },
52 |   "devDependencies": {
53 |     "@eslint/eslintrc": "^3",
54 |     "@shadcn/ui": "^0.0.4",
55 |     "@types/node": "^20",
56 |     "@types/react": "^19",
57 |     "@types/react-dom": "^19",
58 |     "eslint": "^9",
59 |     "eslint-config-next": "15.1.4",
60 |     "postcss": "^8",
61 |     "tailwindcss": "^3.4.1",
62 |     "typescript": "^5"
63 |   }
64 | }
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
8 | import { useCreateWorkspaceModal } from "./features/workspaces/store/use-create-workspace-modal";
9 | import { useEffect } from "react";
10 | 
11 | export default function Home() {
12 |   const { signOut } = useAuthActions();
13 |   const router = useRouter();
14 |   const { data: workspaces, isLoading } = useGetWorkspaces();
15 |   const [open, setOpen] = useCreateWorkspaceModal();
16 | 
17 |   useEffect(() => {
18 |     if (isLoading) return;
19 | 
20 |     const workspaceId = workspaces?.[0]?._id;
21 |     if (workspaceId) {
22 |       router.push(`/workspace/${workspaceId}`);
23 |     } else if (!open) {
24 |       setOpen(true);
25 |     }
26 |   }, [workspaces, isLoading, open, setOpen, router]);
27 | 
28 |   const handleSignOut = async () => {
29 |     await signOut();
30 |     router.push("/signin");
31 |   };
32 | 
33 |   if (isLoading) {
34 |     return (
35 |       <div className="min-h-screen flex flex-col items-center justify-center">
36 |         <p>Loading...</p>
37 |       </div>
38 |     );
39 |   }
40 | 
41 |   return (
42 |     <div className="min-h-screen flex flex-col items-center justify-center gap-4">
43 |       <UserButton />
44 |       <h1 className="text-2xl font-bold">Welcome</h1>
45 |       <Button 
46 |         variant="outline"
47 |         onClick={handleSignOut}
48 |       >
49 |         Sign Out
50 |       </Button>
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
13 | import { MessageSquare, Users, UserPlus, Smile, Hash, Circle, Plus } from "lucide-react";
14 | import { Id } from "../../../../../../convex/_generated/dataModel";
15 | import { MessagePresence } from "@/app/features/presence/components/message-presence";
16 | import { usePresence } from "@/app/features/presence/hooks/use-presence";
17 | import { useGetMembers } from "@/app/features/members/api/use-get-members";
18 | import { useGetWorkspace } from "@/app/features/workspaces/api/use-get-workspace";
19 | import { InviteModal } from "../../invite-modal";
20 | import { useGetChannels } from "@/app/features/channels/api/use-get-channels";
21 | import { cn } from "@/lib/utils";
22 | import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
23 | import { SummaryDropdown } from "@/components/ui/summary-dropdown";
24 | import { UserActionMenu } from "@/components/ui/user-action-menu";
25 | 
26 | const EMOJI_MAP: Record<string, string> = {
27 |   thumbs_up: "👍",
28 |   heart: "❤️",
29 |   smile: "😊",
30 |   party: "🎉",
31 |   fire: "🔥",
32 |   eyes: "👀",
33 |   "100": "💯",
34 |   sparkles: "✨",
35 |   raised_hands: "🙌",
36 |   clap: "👏",
37 | };
38 | 
39 | const ChannelHeader = ({ channel }: { channel: any }) => {
40 |   const isDM = channel.type === "dm";
41 |   const params = useParams();
42 |   const workspaceId = params.workspaceId as Id<"workspaces">;
43 |   const { data: currentUser } = useCurrentUser();
44 |   const otherUserId = isDM ? channel.userIds?.find((id: string) => id !== currentUser?._id) : null;
45 |   
46 |   return (
47 |     <div className="flex items-center px-6 py-4 border-b bg-white shadow-sm">
48 |       <div className="flex items-center gap-3">
49 |         {isDM ? (
50 |           <>
51 |             {otherUserId && (
52 |               <MessagePresence 
53 |                 workspaceId={workspaceId} 
54 |                 userId={otherUserId as Id<"users">} 
55 |                 className="h-3 w-3" 
56 |               />
57 |             )}
58 |             <h1 className="text-xl font-semibold text-emerald-900">{channel.name}</h1>
59 |           </>
60 |         ) : (
61 |           <>
62 |             <Hash className="h-5 w-5 text-emerald-700 shrink-0" />
63 |             <h1 className="text-xl font-semibold text-emerald-900">{channel.name}</h1>
64 |           </>
65 |         )}
66 |       </div>
67 |     </div>
68 |   );
69 | };
70 | 
71 | export default function ChannelPage() {
72 |   const params = useParams();
73 |   const channelId = params.channelId as string;
74 |   const workspaceId = params.workspaceId as Id<"workspaces">;
75 |   const messagesEndRef = useRef<HTMLDivElement>(null);
76 |   const [isFirstLoad, setIsFirstLoad] = useState(true);
77 |   const [inviteModalOpen, setInviteModalOpen] = useState(false);
78 |   
79 |   // Initialize presence
80 |   usePresence(workspaceId);
81 | 
82 |   const { data: workspace } = useGetWorkspace({ id: workspaceId });
83 |   const { data: members } = useGetMembers({ workspaceId });
84 |   const { data: channels } = useGetChannels({ workspaceId });
85 |   const messages = useQuery(api.messages.list, { channelId: channelId as Id<"channels"> });
86 |   const sendMessage = useMutation(api.messages.send);
87 |   const toggleReaction = useMutation(api.messages.toggleReaction);
88 |   const { data: currentUser } = useCurrentUser();
89 | 
90 |   const currentChannel = channels?.find(c => c._id === channelId);
91 | 
92 |   const [text, setText] = useState("");
93 |   const [selectedThread, setSelectedThread] = useState<Id<"messages"> | null>(null);
94 | 
95 |   // Initial scroll to bottom without animation
96 |   useEffect(() => {
97 |     if (messages && isFirstLoad) {
98 |       messagesEndRef.current?.scrollIntoView();
99 |       setIsFirstLoad(false);
100 |     }
101 |   }, [messages, isFirstLoad]);
102 | 
103 |   // Smooth scroll to bottom for new messages
104 |   useEffect(() => {
105 |     if (!isFirstLoad && messages) {
106 |       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
107 |     }
108 |   }, [messages, isFirstLoad]);
109 | 
110 |   const handleReaction = async (messageId: Id<"messages">, emoji: string) => {
111 |     try {
112 |       await toggleReaction({ messageId, emoji });
113 |     } catch (error) {
114 |       console.error("Error toggling reaction:", error);
115 |     }
116 |   };
117 | 
118 |   const handleSend = async () => {
119 |     if (!text) return;
120 |     try {
121 |       await sendMessage({ 
122 |         channelId: channelId as Id<"channels">, 
123 |         text,
124 |       });
125 |       setText("");
126 |     } catch (error) {
127 |       console.error("Error sending message:", error);
128 |     }
129 |   };
130 | 
131 |   const Message = ({ msg }: { msg: any }) => {
132 |     const replyCount = useQuery(api.messages.getReplyCount, { messageId: msg._id }) ?? 0;
133 |     const params = useParams();
134 |     const workspaceId = params.workspaceId as Id<"workspaces">;
135 |     const currentChannel = channels?.find(c => c._id === channelId);
136 |     const isDM = currentChannel?.type === "dm";
137 |     const { data: currentUser } = useCurrentUser();
138 |     const isSentByMe = msg.userId === currentUser?._id;
139 |     
140 |     if (!isDM) {
141 |       return (
142 |         <div className="border border-emerald-100 p-3 rounded-lg hover:bg-emerald-50/50 transition bg-white shadow-sm">
143 |           <div className="text-sm text-emerald-800 flex justify-between items-center mb-2">
144 |             <div className="flex items-center gap-2">
145 |               <UserActionMenu 
146 |                 userId={msg.userId as Id<"users">}
147 |                 userName={msg.userName}
148 |               >
149 |                 <strong className="font-medium text-emerald-900">{msg.userName}</strong>
150 |               </UserActionMenu>
151 |               {msg.isAI && (
152 |                 <span className="text-xs text-emerald-400 flex items-center gap-1">
153 |                   <span className="inline-block w-3 h-3">🤖</span>
154 |                   <span className="opacity-75">AI</span>
155 |                 </span>
156 |               )}
157 |               <MessagePresence 
158 |                 workspaceId={workspaceId} 
159 |                 userId={msg.userId} 
160 |                 className="h-2 w-2 shrink-0" 
161 |               />
162 |               <span className="text-xs text-emerald-500">
163 |                 {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
164 |               </span>
165 |             </div>
166 |             <div className="flex items-center gap-2">
167 |               {replyCount > 0 && (
168 |                 <button
169 |                   className="text-xs text-emerald-600 hover:text-emerald-700 hover:underline flex items-center gap-1"
170 |                   onClick={() => setSelectedThread(msg._id)}
171 |                 >
172 |                   <MessageSquare className="h-3 w-3" />
173 |                   {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
174 |                 </button>
175 |               )}
176 |               <Button
177 |                 variant="ghost"
178 |                 size="sm"
179 |                 className="py-1 h-7 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
180 |                 onClick={() => setSelectedThread(msg._id)}
181 |               >
182 |                 Reply
183 |               </Button>
184 |             </div>
185 |           </div>
186 |           <div className="text-sm text-emerald-900 leading-relaxed">{msg.text}</div>
187 |           <div className="mt-3 flex flex-wrap gap-1">
188 |             {Object.entries(msg.reactions || {}).map(([code, data]: [string, any]) => (
189 |               <button
190 |                 key={code}
191 |                 onClick={() => handleReaction(msg._id, code)}
192 |                 className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full text-sm transition-colors"
193 |               >
194 |                 <span>{EMOJI_MAP[code] || code}</span>
195 |                 <span className="text-xs text-emerald-600">{data.count}</span>
196 |               </button>
197 |             ))}
198 |             <EmojiPicker
199 |               onEmojiSelect={(code) => handleReaction(msg._id, code)}
200 |               trigger={
201 |                 <button className="p-1.5 hover:bg-emerald-50 rounded-full transition-colors">
202 |                   <Smile className="h-4 w-4 text-emerald-400 hover:text-emerald-500" />
203 |                 </button>
204 |               }
205 |             />
206 |           </div>
207 |         </div>
208 |       );
209 |     }
210 | 
211 |     // DM Message Style
212 |     return (
213 |       <div className={cn(
214 |         "flex flex-col max-w-[60%] space-y-1 mb-4",
215 |         isSentByMe ? "ml-auto" : ""
216 |       )}>
217 |         <div className={cn(
218 |           "flex items-center gap-2",
219 |           isSentByMe ? "justify-end mr-2" : "ml-2"
220 |         )}>
221 |           <span className="text-xs text-emerald-500">
222 |             {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
223 |           </span>
224 |           {msg.isAI && (
225 |             <span className="text-xs text-emerald-400 flex items-center gap-1">
226 |               <span className="inline-block w-3 h-3">🤖</span>
227 |               <span className="opacity-75">AI</span>
228 |             </span>
229 |           )}
230 |         </div>
231 |         <div className={cn(
232 |           "px-3.5 py-2 rounded-[18px] shadow-sm",
233 |           isSentByMe 
234 |             ? "bg-emerald-600 text-white rounded-br-none" 
235 |             : "bg-gray-100 text-emerald-900 rounded-bl-none"
236 |         )}>
237 |           <div className="text-sm leading-relaxed break-words">
238 |             {msg.text}
239 |           </div>
240 |           {(replyCount > 0 || msg.reactions) && (
241 |             <div className={cn(
242 |               "mt-2 pt-2",
243 |               isSentByMe ? "border-t border-emerald-500/30" : "border-t border-gray-200"
244 |             )}>
245 |               {replyCount > 0 && (
246 |                 <button
247 |                   className={cn(
248 |                     "text-xs flex items-center gap-1 mb-2",
249 |                     isSentByMe ? "text-emerald-100 hover:text-white" : "text-emerald-600 hover:text-emerald-700"
250 |                   )}
251 |                   onClick={() => setSelectedThread(msg._id)}
252 |                 >
253 |                   <MessageSquare className="h-3 w-3" />
254 |                   {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
255 |                 </button>
256 |               )}
257 |               {Object.entries(msg.reactions || {}).map(([code, data]: [string, any]) => (
258 |                 <button
259 |                   key={code}
260 |                   onClick={() => handleReaction(msg._id, code)}
261 |                   className={cn(
262 |                     "inline-flex items-center gap-1 mr-1 px-2 py-0.5 rounded-full text-sm transition-colors",
263 |                     isSentByMe 
264 |                       ? "bg-emerald-500/20 hover:bg-emerald-500/30" 
265 |                       : "bg-gray-200 hover:bg-gray-300"
266 |                   )}
267 |                 >
268 |                   <span>{EMOJI_MAP[code] || code}</span>
269 |                   <span className={cn(
270 |                     "text-xs",
271 |                     isSentByMe ? "text-emerald-100" : "text-emerald-600"
272 |                   )}>{data.count}</span>
273 |                 </button>
274 |               ))}
275 |               <EmojiPicker
276 |                 onEmojiSelect={(code) => handleReaction(msg._id, code)}
277 |                 trigger={
278 |                   <button className={cn(
279 |                     "p-1.5 rounded-full transition-colors inline-flex",
280 |                     isSentByMe 
281 |                       ? "hover:bg-emerald-500/20 text-emerald-100" 
282 |                       : "hover:bg-gray-200 text-emerald-400"
283 |                   )}>
284 |                     <Smile className="h-4 w-4" />
285 |                   </button>
286 |                 }
287 |               />
288 |             </div>
289 |           )}
290 |         </div>
291 |       </div>
292 |     );
293 |   };
294 | 
295 |   // Show empty state if only one member (admin) and not a DM
296 |   if (members && members.length <= 1 && currentChannel?.type !== "dm") {
297 |     return (
298 |       <>
299 |         <InviteModal 
300 |           open={inviteModalOpen}
301 |           onOpenChange={setInviteModalOpen}
302 |           name={workspace?.name || ""}
303 |           joinCode={workspace?.joinCode || ""}
304 |         />
305 |         <div className="flex flex-col h-full">
306 |           <ChannelHeader channel={currentChannel} />
307 |           <div className="flex flex-col items-center justify-center flex-1 bg-emerald-50/30">
308 |             <div className="flex flex-col items-center max-w-md text-center p-8 bg-white rounded-lg shadow-sm">
309 |               <div className="p-3 bg-emerald-100 rounded-full mb-4">
310 |                 <Users className="h-8 w-8 text-emerald-600" />
311 |               </div>
312 |               <h2 className="text-2xl font-semibold text-emerald-900 mb-2">
313 |                 Invite Team Members
314 |               </h2>
315 |               <p className="text-emerald-600 mb-6">
316 |                 This channel is looking a bit empty. Invite your teammates to join the conversation!
317 |               </p>
318 |               <Button
319 |                 onClick={() => setInviteModalOpen(true)}
320 |                 className="bg-emerald-600 hover:bg-emerald-700 text-white"
321 |               >
322 |                 <UserPlus className="mr-2 h-4 w-4" />
323 |                 Invite People
324 |               </Button>
325 |             </div>
326 |           </div>
327 |         </div>
328 |       </>
329 |     );
330 |   }
331 | 
332 |   if (messages === undefined || !currentChannel) {
333 |     return <div className="p-4 text-emerald-600">Loading...</div>;
334 |   }
335 | 
336 |   // Sort messages by creation time, newest first
337 |   const sortedMessages = [...messages].sort((a, b) => a.createdAt - b.createdAt);
338 | 
339 |   return (
340 |     <div className="flex h-full">
341 |       {/* Left section: main channel messages */}
342 |       <div className="flex flex-col flex-1 relative">
343 |         <ChannelHeader channel={currentChannel} />
344 |         {/* Messages list */}
345 |         <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-emerald-50/30">
346 |           {sortedMessages?.length === 0 ? (
347 |             <div className="text-sm text-emerald-600 italic">
348 |               No messages yet. Start the conversation!
349 |             </div>
350 |           ) : (
351 |             sortedMessages?.map((msg) => (
352 |               <Message key={msg._id} msg={msg} />
353 |             ))
354 |           )}
355 |           {/* Invisible div for scrolling to bottom */}
356 |           <div ref={messagesEndRef} />
357 |         </div>
358 | 
359 |         {/* Fixed input at bottom */}
360 |         <div className="p-2 border-t bg-white">
361 |           <div className="flex gap-2">
362 |             <SummaryDropdown 
363 |               channelId={channelId as string} 
364 |               isThread={!!selectedThread}
365 |               isDM={currentChannel?.type === "dm"}
366 |               threadId={selectedThread?.toString()}
367 |             />
368 |             <div className="relative flex-1">
369 |               <Input
370 |                 placeholder="Type a message..."
371 |                 value={text}
372 |                 onChange={(e) => setText(e.target.value)}
373 |                 onKeyDown={(e) => {
374 |                   if (e.key === "Enter" && !e.shiftKey) {
375 |                     e.preventDefault();
376 |                     handleSend();
377 |                   }
378 |                 }}
379 |                 className="rounded-full bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-4"
380 |               />
381 |             </div>
382 |             <Button 
383 |               onClick={handleSend}
384 |               className="bg-emerald-600 hover:bg-emerald-700 shrink-0"
385 |             >
386 |               Send
387 |             </Button>
388 |           </div>
389 |         </div>
390 |       </div>
391 | 
392 |       {/* Right section: Thread panel (conditionally shown) */}
393 |       {selectedThread && (
394 |         <div className="w-[320px] border-l bg-white">
395 |           <ThreadPanel parentMessageId={selectedThread} onClose={() => setSelectedThread(null)} />
396 |         </div>
397 |       )}
398 |     </div>
399 |   );
400 | }
```

src/app/workspace/[workspaceId]/channel/[channelId]/thread-panel.tsx
```
1 | "use client";
2 | 
3 | import { useState, useRef, useEffect } from "react";
4 | import { api } from "../../../../../../convex/_generated/api";
5 | import { useQuery, useMutation } from "convex/react";
6 | import { Input } from "@/components/ui/input";
7 | import { Button } from "@/components/ui/button";
8 | import { Id } from "../../../../../../convex/_generated/dataModel";
9 | import { EmojiPicker } from "@/components/emoji-picker";
10 | import { Smile, Plus } from "lucide-react";
11 | import { MessagePresence } from "@/app/features/presence/components/message-presence";
12 | import { useParams } from "next/navigation";
13 | import { SummaryDropdown } from "@/components/ui/summary-dropdown";
14 | 
15 | const EMOJI_MAP: Record<string, string> = {
16 |   thumbs_up: "👍",
17 |   heart: "❤️",
18 |   smile: "😊",
19 |   party: "🎉",
20 |   fire: "🔥",
21 |   eyes: "👀",
22 |   "100": "💯",
23 |   sparkles: "✨",
24 |   raised_hands: "🙌",
25 |   clap: "👏",
26 | };
27 | 
28 | export function ThreadPanel({
29 |   parentMessageId,
30 |   onClose,
31 | }: {
32 |   parentMessageId: Id<"messages">;
33 |   onClose: () => void;
34 | }) {
35 |   const params = useParams();
36 |   const workspaceId = params.workspaceId as Id<"workspaces">;
37 |   const [text, setText] = useState("");
38 |   const [isFirstLoad, setIsFirstLoad] = useState(true);
39 |   const messagesEndRef = useRef<HTMLDivElement>(null);
40 |   const parentMessage = useQuery(api.messages.get, {
41 |     messageId: parentMessageId,
42 |   });
43 |   const threadMessages = useQuery(api.messages.listThread, {
44 |     parentMessageId,
45 |   });
46 | 
47 |   // Initial scroll to bottom without animation
48 |   useEffect(() => {
49 |     if (threadMessages && isFirstLoad) {
50 |       messagesEndRef.current?.scrollIntoView();
51 |       setIsFirstLoad(false);
52 |     }
53 |   }, [threadMessages, isFirstLoad]);
54 | 
55 |   // Smooth scroll to bottom for new messages
56 |   useEffect(() => {
57 |     if (!isFirstLoad && threadMessages) {
58 |       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
59 |     }
60 |   }, [threadMessages, isFirstLoad]);
61 | 
62 |   const sendMessage = useMutation(api.messages.send);
63 |   const toggleReaction = useMutation(api.messages.toggleReaction);
64 | 
65 |   const handleReaction = async (messageId: Id<"messages">, emoji: string) => {
66 |     try {
67 |       await toggleReaction({ messageId, emoji });
68 |     } catch (error) {
69 |       console.error("Error toggling reaction:", error);
70 |     }
71 |   };
72 | 
73 |   const handleReply = async () => {
74 |     if (!text || !parentMessage) return;
75 |     try {
76 |       await sendMessage({
77 |         channelId: parentMessage.channelId,
78 |         text,
79 |         parentMessageId,
80 |       });
81 |       setText("");
82 |     } catch (error) {
83 |       console.error("Error replying to thread:", error);
84 |     }
85 |   };
86 | 
87 |   const MessageWithReactions = ({ message }: { message: any }) => (
88 |     <div className="border border-emerald-100 p-3 rounded-lg hover:bg-emerald-50/50 transition bg-white shadow-sm">
89 |       <div className="flex items-center gap-2 mb-2">
90 |         <div className="flex items-center gap-2">
91 |           <strong className="font-medium text-emerald-900">{message.userName}</strong>
92 |           {message.isAI && (
93 |             <span className="text-xs text-emerald-400 flex items-center gap-1">
94 |               <span className="inline-block w-3 h-3">🤖</span>
95 |               <span className="opacity-75">AI</span>
96 |             </span>
97 |           )}
98 |           <MessagePresence 
99 |             workspaceId={workspaceId} 
100 |             userId={message.userId} 
101 |             className="h-2 w-2 shrink-0" 
102 |           />
103 |           <span className="text-xs text-emerald-500">
104 |             {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
105 |           </span>
106 |         </div>
107 |       </div>
108 |       <div className="text-sm text-emerald-900 leading-relaxed">{message.text}</div>
109 |       
110 |       {/* Reactions */}
111 |       <div className="mt-3 flex flex-wrap gap-1">
112 |         {Object.entries(message.reactions || {}).map(([code, data]: [string, any]) => (
113 |           <button
114 |             key={code}
115 |             onClick={() => handleReaction(message._id, code)}
116 |             className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 rounded-full text-sm transition-colors"
117 |           >
118 |             <span>{EMOJI_MAP[code] || code}</span>
119 |             <span className="text-xs text-emerald-600">{data.count}</span>
120 |           </button>
121 |         ))}
122 |         
123 |         {/* Add reaction button */}
124 |         <EmojiPicker
125 |           onEmojiSelect={(code) => handleReaction(message._id, code)}
126 |           trigger={
127 |             <button className="p-1.5 hover:bg-emerald-50 rounded-full transition-colors">
128 |               <Smile className="h-4 w-4 text-emerald-400 hover:text-emerald-500" />
129 |             </button>
130 |           }
131 |         />
132 |       </div>
133 |     </div>
134 |   );
135 | 
136 |   if (!threadMessages || !parentMessage) {
137 |     return (
138 |       <div className="p-4 flex flex-col h-full">
139 |         <div className="flex justify-between">
140 |           <h2 className="font-bold text-lg text-emerald-900">Thread</h2>
141 |           <Button variant="outline" size="sm" onClick={onClose}>
142 |             Close
143 |           </Button>
144 |         </div>
145 |         <div className="mt-4 text-emerald-700">Loading thread...</div>
146 |       </div>
147 |     );
148 |   }
149 | 
150 |   return (
151 |     <div className="flex flex-col h-full">
152 |       {/* Header */}
153 |       <div className="p-4 flex justify-between items-center shrink-0 border-b border-emerald-100">
154 |         <h2 className="font-bold text-lg text-emerald-900">Thread</h2>
155 |         <Button variant="outline" size="sm" onClick={onClose}>
156 |           Close
157 |         </Button>
158 |       </div>
159 | 
160 |       {/* All messages in one scrollable section */}
161 |       <div className="flex-1 min-h-0 overflow-y-auto">
162 |         <div className="p-4 space-y-4">
163 |           {/* Parent message */}
164 |           <MessageWithReactions message={parentMessage} />
165 |           
166 |           {/* Thread replies */}
167 |           {threadMessages.length > 0 && threadMessages.map((msg) => (
168 |             <MessageWithReactions key={msg._id} message={msg} />
169 |           ))}
170 |           
171 |           {/* Invisible div for scrolling to bottom */}
172 |           <div ref={messagesEndRef} />
173 |         </div>
174 |       </div>
175 | 
176 |       {/* Reply input - fixed at bottom */}
177 |       <div className="px-4 py-6 border-t border-emerald-100 bg-white shrink-0">
178 |         <div className="flex items-center gap-2">
179 |           <SummaryDropdown 
180 |             channelId={parentMessage.channelId} 
181 |             isThread={true}
182 |             threadId={parentMessageId}
183 |           />
184 |           <div className="relative flex-1">
185 |             <Input
186 |               placeholder="Reply to thread"
187 |               value={text}
188 |               onChange={(e) => setText(e.target.value)}
189 |               onKeyDown={(e) => {
190 |                 if (e.key === "Enter" && !e.shiftKey) {
191 |                   e.preventDefault();
192 |                   handleReply();
193 |                 }
194 |               }}
195 |               className="rounded-full bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 pr-4"
196 |             />
197 |           </div>
198 |           <Button 
199 |             onClick={handleReply}
200 |             className="bg-emerald-600 hover:bg-emerald-700 shrink-0"
201 |           >
202 |             Reply
203 |           </Button>
204 |         </div>
205 |       </div>
206 |     </div>
207 |   );
208 | } 
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
12 |   className?: string;
13 | }
14 | 
15 | export const SidebarItem = ({
16 |   icon: Icon,
17 |   label,
18 |   id,
19 |   href,
20 |   variant = "default",
21 |   iconClassName,
22 |   className,
23 | }: SidebarItemProps) => {
24 |   const router = useRouter();
25 | 
26 |   const onClick = () => {
27 |     if (href) {
28 |       router.push(href);
29 |     }
30 |   };
31 | 
32 |   return (
33 |     <button
34 |       onClick={onClick}
35 |       className={cn(
36 |         "flex items-center gap-x-2 px-2 py-1 w-full transition rounded-md",
37 |         variant === "default" && "text-white hover:bg-white/10",
38 |         variant === "active" && "bg-white text-emerald-700",
39 |         className
40 |       )}
41 |     >
42 |       <Icon className={cn("h-4 w-4", iconClassName)} />
43 |       <span className="text-sm font-medium truncate">{label}</span>
44 |     </button>
45 |   );
46 | };
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
22 | import { MessagePresence } from "@/app/features/presence/components/message-presence";
23 | import { UserActionMenu } from "@/components/ui/user-action-menu";
24 | 
25 | export const WorkspacesSidebar = () => {
26 |   const router = useRouter();
27 |   const pathname = usePathname();
28 |   const workspaceId = useWorkspaceId();
29 |   const [_open, setOpen] = useCreateChannelModal();
30 |   const createDM = useCreateDM();
31 |   const cleanupDMs = useMutation(api.channels.cleanupDuplicateDMs);
32 | 
33 |   // Run cleanup when workspace loads
34 |   useEffect(() => {
35 |     if (workspaceId) {
36 |       cleanupDMs({ workspaceId: workspaceId as Id<"workspaces"> });
37 |     }
38 |   }, [workspaceId]);
39 | 
40 |   const { data: currentMember, isLoading: isCurrentMemberLoading } =
41 |     useCurrentMember({ workspaceId });
42 |   const { data: workspace, isLoading: isWorkspaceLoading } =
43 |     useGetWorkspace({ id: workspaceId });
44 |   const { data: channels, isLoading: isChannelsLoading } =
45 |     useGetChannels({ workspaceId });
46 |   const { data: members, isLoading: isMembersLoading } =
47 |     useGetMembers({ workspaceId });
48 | 
49 |   const regularChannels = channels?.filter(c => c.type !== "dm") ?? [];
50 |   const dmChannels = channels?.filter(c => c.type === "dm" && c.name?.trim()) ?? [];
51 | 
52 |   // Filter out current user from members list
53 |   const otherMembers = members?.filter(m => m.user?._id !== currentMember?.user?._id) ?? [];
54 | 
55 |   const handleUserClick = async (userId: Id<"users">) => {
56 |     if (!workspaceId) return;
57 |     await createDM(workspaceId, userId);
58 |   };
59 | 
60 |   // Get online presence
61 |   const presence = useQuery(api.presence.list, {
62 |     workspaceId: workspaceId as Id<"workspaces">,
63 |   }) ?? [];
64 | 
65 |   // Filter members to only show online ones
66 |   const onlineMembers = members?.filter(member => 
67 |     member.user?._id !== currentMember?.user?._id && // Not current user
68 |     presence.some((p: Doc<"userPresence">) => 
69 |       p.userId === member.user?._id && 
70 |       p.status === "online"
71 |     )
72 |   ) ?? [];
73 | 
74 |   if (isCurrentMemberLoading || isWorkspaceLoading) {
75 |     return (
76 |       <div className="flex items-center justify-center h-full">
77 |         <Loader className="animate-spin text-white" />
78 |       </div>
79 |     );
80 |   }
81 | 
82 |   if (!currentMember || !workspace) {
83 |     return (
84 |       <div className="flex items-center justify-center h-full">
85 |         <div className="flex flex-col items-center gap-y-2">
86 |           <AlertTriangle className="text-white h-8 w-8" />
87 |           <span className="text-white text-sm">Workspace not found</span>
88 |         </div>
89 |       </div>
90 |     );
91 |   }
92 | 
93 |   return (
94 |     <div className="flex flex-col h-full text-white">
95 |       <div className="p-3">
96 |         <WorkspaceHeader
97 |           workspace={workspace}
98 |           isAdmin={currentMember.role === "admin"}
99 |         />
100 | 
101 |         <div className="space-y-8 mt-6">
102 |           <div className="space-y-6">
103 |             <div className="space-y-1">
104 |               {/* TODO: Implement threads */}
105 |               {/* <SidebarItem label="Threads" icon={MessageSquareText} id="threads" /> */}
106 |               {/* TODO: Implement drafts */}
107 |               {/* <SidebarItem label="Drafts & Sent" icon={SendHorizonal} id="drafts" /> */}
108 |             </div>
109 | 
110 |             <WorkspaceSection
111 |               label="Channels"
112 |               hint={currentMember.role === "admin" ? "+" : ""}
113 |               onNew={() => setOpen(true)}
114 |             >
115 |               {channels
116 |                 ?.filter((c) => c.type !== "dm")
117 |                 .map((channelItem) => (
118 |                   <SidebarItem
119 |                     label={channelItem.name}
120 |                     icon={Hash}
121 |                     key={channelItem._id}
122 |                     id={channelItem._id}
123 |                     href={`/workspace/${workspaceId}/channel/${channelItem._id}`}
124 |                     variant={pathname === `/workspace/${workspaceId}/channel/${channelItem._id}` ? "active" : "default"}
125 |                   />
126 |                 ))}
127 |             </WorkspaceSection>
128 | 
129 |             <WorkspaceSection 
130 |               label="Direct Messages"
131 |               hint="+"
132 |             >
133 |               {dmChannels.length === 0 ? (
134 |                 <div className="px-2 py-1 text-sm text-zinc-400">
135 |                   No direct messages yet
136 |                 </div>
137 |               ) : (
138 |                 dmChannels.map((channel) => {
139 |                   const otherUserId = channel.userIds?.find(id => id !== currentMember?.user?._id);
140 |                   return (
141 |                     <div key={channel._id} className="flex items-center relative">
142 |                       {otherUserId && (
143 |                         <MessagePresence 
144 |                           workspaceId={workspaceId} 
145 |                           userId={otherUserId as Id<"users">}
146 |                           className="h-2 w-2 absolute left-2 mt-1"
147 |                         />
148 |                       )}
149 |                       <SidebarItem
150 |                         label={channel.name}
151 |                         id={channel._id}
152 |                         icon={Circle}
153 |                         iconClassName="h-2 w-2 mt-1 text-emerald-500 opacity-0"
154 |                         href={`/workspace/${workspaceId}/channel/${channel._id}`}
155 |                         variant={pathname === `/workspace/${workspaceId}/channel/${channel._id}` ? "active" : "default"}
156 |                         className="pl-7"
157 |                       />
158 |                     </div>
159 |                   );
160 |                 })
161 |               )}
162 | 
163 |               <div className="mt-2 pt-2 border-t border-white/10">
164 |                 {otherMembers.map((member) => (
165 |                   <div
166 |                     key={member._id}
167 |                     className="flex items-center gap-x-2 px-2 py-1 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md text-sm relative"
168 |                   >
169 |                     <MessagePresence 
170 |                       workspaceId={workspaceId} 
171 |                       userId={member.user?._id as Id<"users">}
172 |                       className="h-2 w-2"
173 |                     />
174 |                     <UserActionMenu 
175 |                       userId={member.user?._id as Id<"users">}
176 |                       userName={member.user?.name || ""}
177 |                     >
178 |                       {member.user?.name}
179 |                     </UserActionMenu>
180 |                   </div>
181 |                 ))}
182 |               </div>
183 |             </WorkspaceSection>
184 |           </div>
185 | 
186 |           <WorkspacePresence workspaceId={workspaceId} />
187 |         </div>
188 |       </div>
189 |     </div>
190 |   );
191 | };
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

src/components/ui/chat-message-list.tsx
```
1 | import * as React from "react";
2 | import { ArrowDown } from "lucide-react";
3 | import { Button } from "@/components/ui/button";
4 | import { useAutoScroll } from "@/hooks/use-auto-scroll";
5 | 
6 | interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
7 |   smooth?: boolean;
8 | }
9 | 
10 | const ChatMessageList = React.forwardRef<HTMLDivElement, ChatMessageListProps>(
11 |   ({ className, children, smooth = false, ...props }, _ref) => {
12 |     const {
13 |       scrollRef,
14 |       isAtBottom,
15 |       autoScrollEnabled,
16 |       scrollToBottom,
17 |       disableAutoScroll,
18 |     } = useAutoScroll({
19 |       smooth,
20 |       content: children,
21 |     });
22 | 
23 |     return (
24 |       <div className="relative w-full h-full">
25 |         <div
26 |           className={`flex flex-col w-full h-full p-4 overflow-y-auto ${className}`}
27 |           ref={scrollRef}
28 |           onWheel={disableAutoScroll}
29 |           onTouchMove={disableAutoScroll}
30 |           {...props}
31 |         >
32 |           <div className="flex flex-col gap-6">{children}</div>
33 |         </div>
34 | 
35 |         {!isAtBottom && (
36 |           <Button
37 |             onClick={() => {
38 |               scrollToBottom();
39 |             }}
40 |             size="icon"
41 |             variant="outline"
42 |             className="absolute bottom-2 left-1/2 transform -translate-x-1/2 inline-flex rounded-full shadow-md"
43 |             aria-label="Scroll to bottom"
44 |           >
45 |             <ArrowDown className="h-4 w-4" />
46 |           </Button>
47 |         )}
48 |       </div>
49 |     );
50 |   }
51 | );
52 | 
53 | ChatMessageList.displayName = "ChatMessageList";
54 | 
55 | export { ChatMessageList };
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

src/components/ui/summary-dialog.tsx
```
1 | "use client";
2 | 
3 | import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
4 | import { useCallback, useEffect, useState } from "react";
5 | import { Loader2, Copy, Check } from "lucide-react";
6 | import { cn } from "@/lib/utils";
7 | import { api } from "../../../convex/_generated/api";
8 | import { useAction } from "convex/react";
9 | import { Id } from "../../../convex/_generated/dataModel";
10 | import ReactMarkdown from 'react-markdown';
11 | import { Button } from "@/components/ui/button";
12 | 
13 | interface SummaryDialogProps {
14 |   open: boolean;
15 |   onOpenChange: (open: boolean) => void;
16 |   summaryType: "channel" | "dm" | "thread";
17 |   channelId: string;
18 |   threadId?: string;
19 | }
20 | 
21 | const loadingSteps = {
22 |   channel: ["Fetching recent messages...", "Analyzing channel activity...", "Generating summary..."],
23 |   dm: ["Loading conversation history...", "Analyzing chat patterns...", "Generating summary..."],
24 |   thread: ["Loading thread messages...", "Analyzing discussion context...", "Generating summary..."]
25 | };
26 | 
27 | export const SummaryDialog = ({ 
28 |   open, 
29 |   onOpenChange, 
30 |   summaryType,
31 |   channelId,
32 |   threadId 
33 | }: SummaryDialogProps) => {
34 |   const [currentStep, setCurrentStep] = useState(0);
35 |   const [summary, setSummary] = useState<string | null>(null);
36 |   const [copied, setCopied] = useState(false);
37 |   const generateSummary = useAction(api.ai.generateSummary);
38 | 
39 |   const steps = loadingSteps[summaryType];
40 | 
41 |   const handleCopy = useCallback(() => {
42 |     if (summary) {
43 |       navigator.clipboard.writeText(summary);
44 |       setCopied(true);
45 |       setTimeout(() => setCopied(false), 2000);
46 |     }
47 |   }, [summary]);
48 | 
49 |   const handleGenerate = useCallback(async () => {
50 |     if (!open) return;
51 |     
52 |     setSummary(null);
53 |     setCurrentStep(0);
54 | 
55 |     try {
56 |       // Simulate step progression
57 |       const stepDuration = 1000;
58 |       for (let i = 1; i < steps.length; i++) {
59 |         await new Promise(resolve => setTimeout(resolve, stepDuration));
60 |         setCurrentStep(i);
61 |       }
62 | 
63 |       console.log('Calling generateSummary with:', {
64 |         channelId,
65 |         threadId,
66 |         type: summaryType
67 |       });
68 | 
69 |       const result = await generateSummary({
70 |         channelId: channelId as Id<"channels">,
71 |         threadId: threadId as Id<"messages"> | undefined,
72 |         type: summaryType
73 |       });
74 | 
75 |       if (!result) {
76 |         throw new Error("No summary generated");
77 |       }
78 | 
79 |       console.log('Summary result:', result);
80 |       setSummary(result);
81 |     } catch (error) {
82 |       console.error("Failed to generate summary:", error);
83 |       if (error instanceof Error) {
84 |         setSummary(`Error: ${error.message}. Please try again.`);
85 |       } else {
86 |         setSummary("Failed to generate summary. Please try again.");
87 |       }
88 |     }
89 |   }, [open, channelId, threadId, summaryType, generateSummary, steps]);
90 | 
91 |   useEffect(() => {
92 |     if (open) {
93 |       handleGenerate();
94 |     } else {
95 |       setSummary(null);
96 |       setCurrentStep(0);
97 |     }
98 |   }, [open, handleGenerate]);
99 | 
100 |   return (
101 |     <Dialog open={open} onOpenChange={onOpenChange}>
102 |       <DialogContent className="sm:max-w-[600px]">
103 |         <DialogHeader className="flex flex-row items-center justify-between">
104 |           <DialogTitle>
105 |             {summaryType === "channel" && "Channel Summary"}
106 |             {summaryType === "dm" && "Conversation Summary"}
107 |             {summaryType === "thread" && "Thread Summary"}
108 |           </DialogTitle>
109 |           {summary && (
110 |             <Button
111 |               variant="ghost"
112 |               size="sm"
113 |               onClick={handleCopy}
114 |               className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50"
115 |             >
116 |               {copied ? (
117 |                 <Check className="h-4 w-4" />
118 |               ) : (
119 |                 <Copy className="h-4 w-4" />
120 |               )}
121 |               <span className="ml-2">{copied ? 'Copied!' : 'Copy'}</span>
122 |             </Button>
123 |           )}
124 |         </DialogHeader>
125 | 
126 |         <div className="mt-4">
127 |           {!summary ? (
128 |             <div className="space-y-6">
129 |               {steps.map((step, index) => (
130 |                 <div
131 |                   key={step}
132 |                   className={cn(
133 |                     "flex items-center gap-3 text-sm transition-opacity duration-200",
134 |                     index > currentStep ? "opacity-40" : "opacity-100"
135 |                   )}
136 |                 >
137 |                   {index === currentStep ? (
138 |                     <Loader2 className="h-4 w-4 animate-spin" />
139 |                   ) : (
140 |                     <div className="h-4 w-4" />
141 |                   )}
142 |                   {step}
143 |                 </div>
144 |               ))}
145 |             </div>
146 |           ) : (
147 |             <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
148 |               <ReactMarkdown 
149 |                 className="prose prose-emerald prose-sm max-w-none"
150 |                 components={{
151 |                   h1: ({node, ...props}) => <h1 className="text-lg font-bold text-emerald-950 mb-2" {...props} />,
152 |                   h2: ({node, ...props}) => <h2 className="text-base font-semibold text-emerald-900 mb-2" {...props} />,
153 |                   h3: ({node, ...props}) => <h3 className="text-sm font-medium text-emerald-900 mb-1" {...props} />,
154 |                   ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 mb-3" {...props} />,
155 |                   ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 mb-3" {...props} />,
156 |                   li: ({node, ...props}) => <li className="text-emerald-900" {...props} />,
157 |                   p: ({node, ...props}) => <p className="text-emerald-900 mb-3 leading-relaxed" {...props} />,
158 |                   strong: ({node, ...props}) => <strong className="font-semibold text-emerald-950" {...props} />,
159 |                   blockquote: ({node, ...props}) => (
160 |                     <blockquote className="border-l-2 border-emerald-200 pl-4 italic text-emerald-900 my-2" {...props} />
161 |                   ),
162 |                 }}
163 |               >
164 |                 {summary}
165 |               </ReactMarkdown>
166 |             </div>
167 |           )}
168 |         </div>
169 |       </DialogContent>
170 |     </Dialog>
171 |   );
172 | }; 
173 | 
174 | const globalStyles = `
175 | .custom-scrollbar {
176 |   scrollbar-width: thin;
177 |   scrollbar-color: #10B981 #F0FDF4;
178 | }
179 | 
180 | .custom-scrollbar::-webkit-scrollbar {
181 |   width: 6px;
182 | }
183 | 
184 | .custom-scrollbar::-webkit-scrollbar-track {
185 |   background: #F0FDF4;
186 |   border-radius: 3px;
187 | }
188 | 
189 | .custom-scrollbar::-webkit-scrollbar-thumb {
190 |   background-color: #10B981;
191 |   border-radius: 3px;
192 | }
193 | `; 
```

src/components/ui/summary-dropdown.tsx
```
1 | "use client";
2 | 
3 | import {
4 |   DropdownMenu,
5 |   DropdownMenuContent,
6 |   DropdownMenuItem,
7 |   DropdownMenuTrigger,
8 | } from "@/components/ui/dropdown-menu";
9 | import { Button } from "@/components/ui/button";
10 | import { Plus } from "lucide-react";
11 | import { useState } from "react";
12 | import { SummaryDialog } from "@/components/ui/summary-dialog";
13 | 
14 | interface SummaryDropdownProps {
15 |   channelId: string;
16 |   isThread?: boolean;
17 |   isDM?: boolean;
18 |   threadId?: string;
19 | }
20 | 
21 | export const SummaryDropdown = ({ channelId, isThread, isDM, threadId }: SummaryDropdownProps) => {
22 |   const [dialogOpen, setDialogOpen] = useState(false);
23 |   const [summaryType, setSummaryType] = useState<"channel" | "dm" | "thread">("channel");
24 | 
25 |   const handleSummaryClick = (type: "channel" | "dm" | "thread") => {
26 |     setSummaryType(type);
27 |     setDialogOpen(true);
28 |   };
29 | 
30 |   return (
31 |     <>
32 |       <DropdownMenu>
33 |         <DropdownMenuTrigger asChild>
34 |           <Button variant="ghost" size="icon" className="h-8 w-8">
35 |             <Plus className="h-4 w-4" />
36 |           </Button>
37 |         </DropdownMenuTrigger>
38 |         <DropdownMenuContent align="start" side="top" className="w-48">
39 |           {!isThread && !isDM && (
40 |             <DropdownMenuItem onClick={() => handleSummaryClick("channel")}>
41 |               Summarize messages
42 |             </DropdownMenuItem>
43 |           )}
44 |           {isDM && (
45 |             <DropdownMenuItem onClick={() => handleSummaryClick("dm")}>
46 |               Summarize conversation
47 |             </DropdownMenuItem>
48 |           )}
49 |           {isThread && (
50 |             <DropdownMenuItem onClick={() => handleSummaryClick("thread")}>
51 |               Summarize thread
52 |             </DropdownMenuItem>
53 |           )}
54 |         </DropdownMenuContent>
55 |       </DropdownMenu>
56 | 
57 |       <SummaryDialog 
58 |         open={dialogOpen} 
59 |         onOpenChange={setDialogOpen}
60 |         summaryType={summaryType}
61 |         channelId={channelId}
62 |         threadId={threadId}
63 |       />
64 |     </>
65 |   );
66 | }; 
```

src/components/ui/user-action-menu.tsx
```
1 | "use client";
2 | 
3 | import {
4 |   DropdownMenu,
5 |   DropdownMenuContent,
6 |   DropdownMenuItem,
7 |   DropdownMenuTrigger,
8 | } from "@/components/ui/dropdown-menu";
9 | import { MessageSquare } from "lucide-react";
10 | import { useCreateDM } from "@/app/features/channels/api/use-create-dm";
11 | import { useWorkspaceId } from "@/hooks/use-workspace-id";
12 | import { Id } from "../../../convex/_generated/dataModel";
13 | import { useRouter } from "next/navigation";
14 | import { useCurrentUser } from "@/app/features/auth/api/use-current-user";
15 | import { useState } from "react";
16 | 
17 | interface UserActionMenuProps {
18 |   userId: Id<"users">;
19 |   userName: string;
20 |   children: React.ReactNode;
21 | }
22 | 
23 | export function UserActionMenu({ userId, userName, children }: UserActionMenuProps) {
24 |   const workspaceId = useWorkspaceId();
25 |   const createDM = useCreateDM();
26 |   const router = useRouter();
27 |   const { data: currentUser } = useCurrentUser();
28 |   const [isOpen, setIsOpen] = useState(false);
29 |   let hoverTimeout: NodeJS.Timeout;
30 | 
31 |   const handleStartDM = async () => {
32 |     if (!workspaceId) return;
33 |     const channelId = await createDM(workspaceId, userId);
34 |     if (channelId) {
35 |       router.push(`/workspace/${workspaceId}/channel/${channelId}`);
36 |     }
37 |   };
38 | 
39 |   // If this is the current user, just render the children without the dropdown
40 |   if (userId === currentUser?._id) {
41 |     return <>{children}</>;
42 |   }
43 | 
44 |   return (
45 |     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
46 |       <DropdownMenuTrigger asChild>
47 |         <span 
48 |           className="cursor-pointer hover:underline group relative"
49 |           onMouseEnter={() => {
50 |             hoverTimeout = setTimeout(() => setIsOpen(true), 500); // 500ms delay
51 |           }}
52 |           onMouseLeave={() => {
53 |             clearTimeout(hoverTimeout);
54 |           }}
55 |         >
56 |           {children}
57 |         </span>
58 |       </DropdownMenuTrigger>
59 |       <DropdownMenuContent 
60 |         side="right" 
61 |         align="start" 
62 |         className="w-48"
63 |         onMouseLeave={() => setIsOpen(false)}
64 |       >
65 |         <DropdownMenuItem onClick={handleStartDM} className="cursor-pointer">
66 |           <MessageSquare className="h-4 w-4 mr-2" />
67 |           Message {userName}
68 |         </DropdownMenuItem>
69 |       </DropdownMenuContent>
70 |     </DropdownMenu>
71 |   );
72 | } 
```

src/hooks/use-auto-scroll.tsx
```
1 | import { useCallback, useEffect, useRef, useState } from "react";
2 | 
3 | interface ScrollState {
4 |   isAtBottom: boolean;
5 |   autoScrollEnabled: boolean;
6 | }
7 | 
8 | interface UseAutoScrollOptions {
9 |   offset?: number;
10 |   smooth?: boolean;
11 |   content?: React.ReactNode;
12 | }
13 | 
14 | export function useAutoScroll(options: UseAutoScrollOptions = {}) {
15 |   const { offset = 20, smooth = false, content } = options;
16 |   const scrollRef = useRef<HTMLDivElement>(null);
17 |   const lastContentHeight = useRef(0);
18 |   const userHasScrolled = useRef(false);
19 | 
20 |   const [scrollState, setScrollState] = useState<ScrollState>({
21 |     isAtBottom: true,
22 |     autoScrollEnabled: true,
23 |   });
24 | 
25 |   const checkIsAtBottom = useCallback(
26 |     (element: HTMLElement) => {
27 |       const { scrollTop, scrollHeight, clientHeight } = element;
28 |       const distanceToBottom = Math.abs(
29 |         scrollHeight - scrollTop - clientHeight
30 |       );
31 |       return distanceToBottom <= offset;
32 |     },
33 |     [offset]
34 |   );
35 | 
36 |   const scrollToBottom = useCallback(
37 |     (instant?: boolean) => {
38 |       if (!scrollRef.current) return;
39 | 
40 |       const targetScrollTop =
41 |         scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
42 | 
43 |       if (instant) {
44 |         scrollRef.current.scrollTop = targetScrollTop;
45 |       } else {
46 |         scrollRef.current.scrollTo({
47 |           top: targetScrollTop,
48 |           behavior: smooth ? "smooth" : "auto",
49 |         });
50 |       }
51 | 
52 |       setScrollState({
53 |         isAtBottom: true,
54 |         autoScrollEnabled: true,
55 |       });
56 |       userHasScrolled.current = false;
57 |     },
58 |     [smooth]
59 |   );
60 | 
61 |   const handleScroll = useCallback(() => {
62 |     if (!scrollRef.current) return;
63 | 
64 |     const atBottom = checkIsAtBottom(scrollRef.current);
65 | 
66 |     setScrollState((prev) => ({
67 |       isAtBottom: atBottom,
68 |       // Re-enable auto-scroll if at the bottom
69 |       autoScrollEnabled: atBottom ? true : prev.autoScrollEnabled,
70 |     }));
71 |   }, [checkIsAtBottom]);
72 | 
73 |   useEffect(() => {
74 |     const element = scrollRef.current;
75 |     if (!element) return;
76 | 
77 |     element.addEventListener("scroll", handleScroll, { passive: true });
78 |     return () => element.removeEventListener("scroll", handleScroll);
79 |   }, [handleScroll]);
80 | 
81 |   useEffect(() => {
82 |     const scrollElement = scrollRef.current;
83 |     if (!scrollElement) return;
84 | 
85 |     const currentHeight = scrollElement.scrollHeight;
86 |     const hasNewContent = currentHeight !== lastContentHeight.current;
87 | 
88 |     if (hasNewContent) {
89 |       if (scrollState.autoScrollEnabled) {
90 |         requestAnimationFrame(() => {
91 |           scrollToBottom(lastContentHeight.current === 0);
92 |         });
93 |       }
94 |       lastContentHeight.current = currentHeight;
95 |     }
96 |   }, [content, scrollState.autoScrollEnabled, scrollToBottom]);
97 | 
98 |   useEffect(() => {
99 |     const element = scrollRef.current;
100 |     if (!element) return;
101 | 
102 |     const resizeObserver = new ResizeObserver(() => {
103 |       if (scrollState.autoScrollEnabled) {
104 |         scrollToBottom(true);
105 |       }
106 |     });
107 | 
108 |     resizeObserver.observe(element);
109 |     return () => resizeObserver.disconnect();
110 |   }, [scrollState.autoScrollEnabled, scrollToBottom]);
111 | 
112 |   const disableAutoScroll = useCallback(() => {
113 |     const atBottom = scrollRef.current
114 |       ? checkIsAtBottom(scrollRef.current)
115 |       : false;
116 | 
117 |     // Only disable if not at bottom
118 |     if (!atBottom) {
119 |       userHasScrolled.current = true;
120 |       setScrollState((prev) => ({
121 |         ...prev,
122 |         autoScrollEnabled: false,
123 |       }));
124 |     }
125 |   }, [checkIsAtBottom]);
126 | 
127 |   return {
128 |     scrollRef,
129 |     isAtBottom: scrollState.isAtBottom,
130 |     autoScrollEnabled: scrollState.autoScrollEnabled,
131 |     scrollToBottom: () => scrollToBottom(false),
132 |     disableAutoScroll,
133 |   };
134 | }
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

