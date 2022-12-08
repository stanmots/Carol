/*
 * File: UrlUtils.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StringConvertible } from "./TypeUtils.js"

/**
 * Converts the given query parameters to a query string.
 *
 * @param params The object with key-value pairs representing URL query parameters.
 * @returns A string with URL-encoded query parameters. The string always starts with `?`symbol.
 */
export function toQueryString(params: StringConvertible): string {
    const query = new URLSearchParams()
    Object.keys(params).forEach((key) => {
        query.append(key, params[key]?.toString() as string)
    })
    return `?${query.toString()}`
}
