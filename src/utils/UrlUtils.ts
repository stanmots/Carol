/*
 * File: UrlUtils.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents URL query parameters.
 *
 * Keys and values must be convertable to strings.
 */
export interface QueryParams {
    [k: string]: { toString(): string }
}

/**
 * Converts the given query parameters to a query string.
 *
 * @param { QueryParams } params The object with key-value pairs representing URL query parameters.
 * @returns { string } A string with URL-encoded query parameters. The string always starts with "?" symbol.
 */
export function toQueryString(params: QueryParams): string {
    const query = new URLSearchParams()
    Object.keys(params).forEach((key) => {
        query.append(key, params[key]?.toString() as string)
    })
    return `?${query.toString()}`
}
