/*
 * File: TeslaApiTypes.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RestApiPerformFuncParams } from "../shared/RestApiTypes.js"
import type { HttpRequestHeaders } from "../shared/HttpTypes.js"
import type {
    TeslaApiRequestGroupTemplates,
    TeslaApiRequestTemplates,
} from "./TeslaApiRequestTemplates.js"

export interface TeslaApiHeaders extends HttpRequestHeaders {
    /**
     * @title
     * Used to identify the tesla app.
     *
     * ### Syntax
     *
     * `TeslaApp/<app-version>/<git-hash>/<platform>/<platform-version>`
     *
     * ### Directives
     *
     * - `<app-version>`: The full version identifier of the official
     * Tesla app. Android app variants have it defined in the `AndroidManifest.xml` file in the `android:versionName` attribute.
     * - `<git-hash>`: The git identifier of the specific Tesla app build
     * variant. Android apps have it defined in `BuildConfig.java`
     * in the `GIT_HASH` string constant.
     * - `<platform>`: The current device's OS name (e.g., `android` or `ios`).
     * - `<platform-version>`: The current device's OS version (e.g., `12` for Android Snow Cone). Any version the native apps support is accepted.
     *
     * @example
     * `TeslaApp/4.8.1/5e1bfb8d0d/ios/15.4.1`
     */
    "X-Tesla-User-Agent"?: string

    /**
     * @title
     * Used to debug requests.
     *
     * @note
     * Tesla endpoints expect random `UUID` values.
     */
    "X-TXID"?: string

    /**
     * @title
     * Used to set the public key identifier `PUBLIC_KEY_ID`.
     *
     * @note
     * The header is only used in conjunction with TMBLE Bluetooth module.
     */
    "X-Tesla-App-Key"?: string
}

/**
 * Generates `sendCommand` function parameters.
 *
 * **See** {@link CarApiSendCommandFuncParams}
 */
export type TeslaApiSendCommandFuncParams = CarApiSendCommandFuncParams<
    typeof TeslaApiCommandTemplates
>
