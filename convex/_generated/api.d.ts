/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as actions_generateDalleImage from "../actions/generateDalleImage.js";
import type * as actions_generateSpeech from "../actions/generateSpeech.js";
import type * as ai from "../ai.js";
import type * as auth from "../auth.js";
import type * as channels from "../channels.js";
import type * as crons from "../crons.js";
import type * as embeddings from "../embeddings.js";
import type * as http from "../http.js";
import type * as members from "../members.js";
import type * as messages from "../messages.js";
import type * as presence from "../presence.js";
import type * as users from "../users.js";
import type * as workspaces from "../workspaces.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "actions/generateDalleImage": typeof actions_generateDalleImage;
  "actions/generateSpeech": typeof actions_generateSpeech;
  ai: typeof ai;
  auth: typeof auth;
  channels: typeof channels;
  crons: typeof crons;
  embeddings: typeof embeddings;
  http: typeof http;
  members: typeof members;
  messages: typeof messages;
  presence: typeof presence;
  users: typeof users;
  workspaces: typeof workspaces;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
