/*
 * File: CarApiTypes.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
    AnyObject,
    Substrings,
    UnionOfValues,
} from "../../utils/TypeUtils.js"

/**
 * Generates `sendCommand` function parameters based on the given
 * car api command templates.
 *
 * The commands must be set as the keys of the specified templates object.
 *
 * Dynamic arguments are extracted from string literals between `{` and `}`
 * delimiters. The literals with arguments must not be nested more
 * than 5 levels deep for performance reason.
 *
 * @example
 * const Templates = {
 *    SERVICE_CENTER_APPOINTMENT_DETAILS: {
 *        TYPE: "GET",
 *        URI: "bff/v2/mobile-app/service/center/{appointmentId}",
 *        AUTH: true,
 *    },
 * } as const
 *
 * // `params` type: { command: "SERVICE_CENTER_APPOINTMENT_DETAILS"; args: { appointmentId: string } }
 * function sendCommand(params: CarApiSendCommandFuncParams<typeof Templates>) { ... }
 *
 * @template Templates - An object representing templates of car api commands.
 */
export type CarApiSendCommandFuncParams<Templates extends AnyObject> =
    UnionOfValues<{
        [Command in keyof Templates]: {
            [k in Templates[Command] extends string | AnyObject
                ? Substrings<Templates[Command], "{", "}">
                : never]: string
        } extends infer Args
            ? Args extends Record<string, never>
                ? { command: Command }
                : { command: Command; args: Args }
            : never
    }>
