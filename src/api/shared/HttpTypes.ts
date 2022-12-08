/*
 * File: HttpTypes.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type HttpRequestHeaders = { [k: string]: unknown }
export type HttpRequestMethod =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "PATCH"
    | "UPDATE"
    | "DELETE"
