/*
 * File: RestApiTypes.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
    AnyObject,
    AsString,
    ArrayToUnion,
    AsAnyObject,
    SubstringsFromObject,
    UnionOfValues,
    IsKeyPathValid,
    SubstringsFromString,
} from "../../utils/TypeUtils.js"
import type { HttpRequestHeaders, HttpRequestMethod } from "./HttpTypes.js"

/**
 * @title
 * Defines the RESTful API template object key that refers
 * to the array of group names.
 *
 * @see {@link RestApiRequestTemplate} for details.
 */
export type REST_API_TEMPLATE_GROUPS_KEY = "GROUPS"

/**
 * @title
 * Defines the name of the default group template.
 *
 * @see {@link RestApiRequestGroupTemplates} for details.
 */
export type REST_API_TEMPLATE_DEFAULT_GROUP = "DEFAULT"

/**
 * @title
 * Defines parameters which are used to perform a specific RESTful API request.
 *
 * @markdownDescription
 * The RESTful API request template type provides the configuration
 * required to perform a specific RESTful API request type.
 *
 * Based on the template TypeScript can generate parameters of the function
 * used to perform RESTful API requests. See {@link RestApiPerformFuncParams}.
 *
 * The template supports two types of parameters:
 *  - Static values which are assigned directly to a corresponding
 * key (e.g., { METHOD: "GET"});
 *  - Dynamic variables which must be specified inside string literals
 * between `{` and `}` delimiters (e.g., { URI: "api/1/device/{device_token}/deactivate"}). TypeScript system will extract these variables at compile-time.
 * The type of the extracted variables is `string`.
 *
 * @todo
 * Support more types of dynamic variables.
 *
 * Extend this type to add more specific configuration key-value pairs.
 * The keys are upper-cased by convention.
 *
 * @note
 * The string literals with dynamic variables must not be nested more than
 * `5` levels deep for performance reason.
 */
export type RestApiRequestTemplate = {
    /**
     * Each request template can specify multiple group names.
     *
     * A group name refers to a corresponding key of {@link RestApiRequestGroupTemplate}.
     *
     * The request configuration is created by merging the request template
     * with all specified group templates.
     */
    GROUPS?: string[]
    METHOD?: HttpRequestMethod
    HEADERS?: HttpRequestHeaders
    URI?: string
}

/**
 * @title
 * Defines RESTful API request template parameters which are shared between
 * the templates assigned to the same group.
 *
 * @markdownDescription
 * The group template defines parameters common to the request templates
 * with the corresponding group name. The groups are used to prevent
 * duplication of frequently used key-value pairs.
 *
 * The rules of defining the group templates are the same as
 * of {@link RestApiRequestTemplate}. The only exception is that the group
 * templates don't have `GROUPS` key.
 *
 * @note
 * The parameters defined by the request template override those defined
 * by the groups it belongs to.
 */
export type RestApiRequestGroupTemplate = Omit<
    RestApiRequestTemplate,
    REST_API_TEMPLATE_GROUPS_KEY
>

/**
 * @title
 * Defines mapping between RESTful API request types and templates.
 *
 * @markdownDescription
 * The templates object provides the configuration required to perform
 * RESTful API requests to backend.
 *
 * The keys represent request types; the values - request templates.
 *
 * @example
 * const Templates = {
 *    HONK_HORN: {
 *        METHOD: "POST",
 *        URI: "api/1/vehicles/{vehicle_id}/command/honk_horn",
 *        AUTH: true,
 *    },
 *    FLASH_LIGHTS: {
 *        METHOD: "POST",
 *        URI: "api/1/vehicles/{vehicle_id}/command/flash_lights",
 *        AUTH: true,
 *    },
 * } as const
 *
 * @note
 * The type of `Templates` object **MUST NOT** be specified to prevent
 * literal widening. Add `as const` type assertion instead. See [TypeScript 3.4 const
assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).
 */
export type RestApiRequestTemplates = {
    [k: string]: RestApiRequestTemplate
}

/**
 * @title
 * Defines mapping between group names and group templates.
 *
 * @markdownDescription
 * The group templates object provides the configuration of all groups
 * RESTful API request templates can be assigned to.
 *
 * The keys represent group names; the values - group templates.
 *
 * @example
 * export const GroupTemplates = {
 *    DEFAULT: {
 *        METHOD: "GET",
 *    },
 *    OAUTH: {
 *        ACCESS_TOKEN: "{tokenId}"
 *    },
 * } as const
 *
 * @note
 * The template parameters assigned to the `DEFAULT` key are shared
 * between all RESTful API request templates.
 * 
 * @note
 * The type of `GroupTemplates` object **MUST NOT** be specified to prevent
 * literal widening. Add `as const` type assertion instead. See [TypeScript 3.4 const
assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions).
 */
export type RestApiRequestGroupTemplates = {
    [k: string]: RestApiRequestGroupTemplate
}

/**
 * @title
 * Returns an array of group names extracted from the given template.
 *
 * @note `REST_API_TEMPLATE_DEFAULT_GROUP` is added to the returned array.
 *
 * @template Template - The RESTful API request template.
 */
export type ExtractGroupNames<Template extends RestApiRequestTemplate> =
    Template[REST_API_TEMPLATE_GROUPS_KEY] extends string[]
        ? [
              ...Template[REST_API_TEMPLATE_GROUPS_KEY],
              REST_API_TEMPLATE_DEFAULT_GROUP
          ]
        : [REST_API_TEMPLATE_DEFAULT_GROUP]

/**
 * @title
 * Returns a union of group templates extracted from the given
 * `GroupTemplates` type matching the `Template[GROUPS]` names.
 *
 * @template GroupTemplates - The type to extract the matched templates from.
 * @template Template - The type whose `REST_API_TEMPLATE_GROUPS_KEY` key
 * defines which group template to extract.
 */
export type ExtractGroupTemplatesMatchingNames<
    GroupTemplates extends RestApiRequestGroupTemplates,
    Template extends RestApiRequestTemplate
> = GroupTemplates[ArrayToUnion<ExtractGroupNames<Template>>]

/**
 * @title
 * Returns a union of `string` literals found in the given group template.
 *
 * @note
 * The literals for the same key paths as in `Template` **ARE NOT** returned
 * since RESTful API request template overrides the group template.
 *
 * @template GroupTemplate - The type to extract the `string` literals from.
 * @template Template - The RESTful API request template used to check
 * for overrides.
 */
export type ExtractStringValuesFromGroupTemplate<
    GroupTemplate extends AnyObject,
    Template extends RestApiRequestTemplate,
    A extends string[] = []
> = UnionOfValues<{
    [k in keyof GroupTemplate]: GroupTemplate[k] extends string
        ? IsKeyPathValid<Template, [...A, AsString<k>]> extends true
            ? never
            : GroupTemplate[k]
        : GroupTemplate[k] extends AnyObject
        ? ExtractStringValuesFromGroupTemplate<
              GroupTemplate[k],
              Template,
              [...A, AsString<k>]
          >
        : never
}>

/**
 * @title
 * Returns a union of string literals representing the given template variables.
 *
 * @note
 * The extracted variables represent the dynamic variables defined
 * in the given template string literals between "{" and "}" delimiters.
 *
 * @template Template - The RESTful API request template.
 */
export type ExtractTemplateVars<Template extends RestApiRequestTemplate> =
    SubstringsFromObject<AsAnyObject<Template>, "{", "}">

/**
 * @title
 * Returns a union of string literals representing the variables of the group
 * templates that match the names defined in the `Template[GROUPS]` array.
 *
 * @template GroupTemplates - The group templates containing the templates
 * that match the `Template[GROUPS]` names.
 * @template Template - The RESTful API request template specifying
 * in the `REST_API_TEMPLATE_GROUPS_KEY` what group templates should be
 * searched for the variables.
 */
export type ExtractGroupVars<
    GroupTemplates extends RestApiRequestGroupTemplates,
    Template extends RestApiRequestTemplate
> = SubstringsFromString<
    ExtractStringValuesFromGroupTemplate<
        AsAnyObject<
            ExtractGroupTemplatesMatchingNames<GroupTemplates, Template>
        >,
        Template
    >,
    "{",
    "}"
>

/**
 * @title
 * Generates `perform` function parameters based on the given
 * RESTful API request templates.
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
 * const GroupTemplates = {
 *    DEFAULT: {
 *        NOTE: "Note Id: {noteId}",
 *    },
 * } as const
 *
 * // `params` type: { command: "SERVICE_CENTER_APPOINTMENT_DETAILS"; args: { appointmentId: string, noteId: string } }
 * function perform(params: RestApiPerformFuncParams<typeof Templates, typeof GroupTemplates>) { ... }
 *
 * @template Templates - A type representing templates of RESTful API requests.
 * @template GroupTemplates - A type representing group templates with
 * parameters shared between RESTful API request templates with
 * the corresponding group names.
 */
export type RestApiPerformFuncParams<
    Templates extends RestApiRequestTemplates,
    GroupTemplates extends RestApiRequestGroupTemplates
> = UnionOfValues<{
    [RequestType in keyof Templates]: {
        [k in ExtractTemplateVars<Templates[RequestType]>]: string
    } & {
        [k in ExtractGroupVars<GroupTemplates, Templates[RequestType]>]: string
    } extends infer Args
        ? Args extends Record<string, never>
            ? { command: RequestType }
            : { command: RequestType; args: Args }
        : never
}>
