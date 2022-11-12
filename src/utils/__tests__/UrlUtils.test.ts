/*
 * File: UrlUtils.test.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { QueryParams } from "../UrlUtils.js"
import { toQueryString } from "../UrlUtils.js"

const queryMock: QueryParams = {
    a: 3,
    b: true,
    c: "Test String",
}

describe("UrlUtils.toQueryString", () => {
    it("returns URL-encoded query string", () => {
        expect(toQueryString(queryMock)).toEqual("?a=3&b=true&c=Test+String")
    })

    it("returns a string with '?' given an empty object", () => {
        expect(toQueryString({})).toEqual("?")
    })
})
