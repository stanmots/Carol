/*
 * File: OidcTypes.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Permutations } from "../../utils/TypeUtils.js"

type OidcResponseTypeValue = "code" | "token" | "id_token"
export type OidcResponseType = Permutations<OidcResponseTypeValue>

type OidcPromptValue = "login" | "consent" | "select_account"
export type OidcPrompt = Permutations<OidcPromptValue> | "none"

type OidcScopeValue =
    | "profile"
    | "email"
    | "address"
    | "phone"
    | "offline_access"

export type OidcScope = `openid ${Permutations<OidcScopeValue>}`

export default interface OidcHeaders {
    /**
     * Indicates one of the standard grant type (as defined in [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749#section-1.3)) being
     * presented in exchange for an access token and possibly a refresh token.
     *
     * Valid values are:
     *
     * - `authorization_code`: The authorization code grant type is used to
     * obtain both access tokens and refresh tokens and is optimized for
     * confidential clients.
     * - `password`: The password grant type is used to exchange the user's
     * password for an access token, and often a refresh token. The user must
     * have a trust relationship with the client (e.g. computer operation
     * system or a highly privileged application), because the client is
     * supposed to discard the password after using it.
     * - `client_credentials`: The client presents its own credentials to the authorization server in order to obtain an access token.
     * - `refresh_token`: The refresh token grant is used to request additional
     * access tokens without requiring the resource owner to reauthenticate.
     * This grant type can only be used in conjunction with either
     * `authorization_code` or `password` type.
     * - `An extension grant`: Any `string` specified in accordance with
     * [RFC 6749 - 4.5. Extension Grants](https://www.rfc-editor.org/rfc/rfc6749#section-4.5). Used to support additional clients or to
     * provide a bridge between `OAuth` and other trust frameworks.
     */
    grant_type:
        | "authorization_code"
        | "password"
        | "client_credentials"
        | "refresh_token"
        | string

    /**
     * The refresh token issued to the client that was previously
     * authorized using `authorization_code` or `password` grant type.
     * 
     * **See:** [RFC 6749 - 6. Refreshing an Access Token
](https://www.rfc-editor.org/rfc/rfc6749#section-6)
     */
    refresh_token: string

    /**
     * A client identifier valid at the authorization server.
     *
     * **Note:** _Required._
     */
    client_id: string

    /**
     *  The authorization code issued in the authorization response.
     *
     * **See:** [RFC 7636 - 4.5. Client Sends the Authorization Code and the Code Verifier to the
      Token Endpoint](https://www.rfc-editor.org/rfc/rfc7636#section-4.5)
     */
    code: string

    /**
     * A cryptographically random sequence with a minimum of 256 bits
     * of entropy used to mitigate the authorization code interception attack.
     *
     * A unique code verifier is created for every authorization request, and
     * its transformed value, called "code challenge", is sent to the
     * authorization server to obtain the authorization code.
     * 
     * **See:** [RFC 7636 - 4.1. Client Creates a Code Verifier
](https://www.rfc-editor.org/rfc/rfc7636#section-4.1)
     */
    code_verifier: string

    /**
     * A PKCE challenge derived from the code verifier that is sent in the
     * authorization request, to be verified against later.
     *
     * **Note:** _Required for Authorization Code with PKCE Flow._
     *
     * **See:** [RFC 7636 - 4.2. Client Creates the Code Challenge
](https://www.rfc-editor.org/rfc/rfc7636#section-4.2)
     *
     */
    code_challenge: string

    /**
     * A method that is used to derive the code challenge.
     *
     * Valid values are:
     *
     * - `S256`: Specifies that the `code_verifier` is hashed by SHA-256 and
     * base64url-encoded, i.e.:
     *
     * `BASE64URL-ENCODE(SHA256(ASCII(code_verifier))) == code_challenge`
     *
     * - `plain`: Specifies that `code_verifier` is left unchanged, i.e.:
     *
     * `code_verifier == code_challenge.`
     *
     * **Note:** _Required for Authorization Code with PKCE Flow._
     */
    code_challenge_method: "S256" | "plain"

    /**
     * A space delimited, case sensitive list of ASCII string values
     * that determine the authorization processing flow to be used,
     * including what parameters are returned from the authorization server
     * to the app upon the call to the `/authorize` endpoint.
     *
     * Valid values are:
     *
     * - `code`: Indicates that a successful response must include
     * an authorization code.
     * - `token`: Indicates that a successful response must include
     * an access token.
     * - `id_token`: Indicates that a successful response must include
     * an ID token.
     *
     * **Note:** _Required._
     *
     * **See:** [Definitions of Multiple-Valued Response Type Combinations](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#Combinations)
     */
    response_type: OidcResponseType

    /**
     * Specifies how the authorization server should return
     * the authorization response parameters to the app.
     *
     * **Note:** The use of this parameter is not recommended with a value that
     * specifies the same `response_mode` as the default
     * `response_mode` for the `response_type` used.
     *
     * Valid values are:
     *
     * - `query`: The response parameters are embedded in the query component
     * (the part after ?) of the `redirect_uri` in the _Location_ header.
     * Default when requesting an access token.
     * - `fragment`: The response parameters are embedded in the fragment
     * component (the part after #) of the `redirect_uri` in the _Location_
     * header. Default when requesting an ID token.
     * - `form_post`: Executes a _POST_ containing the code to the `redirect_uri`. Defined in the [Form Post Response Mode specification](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html#FormPostResponseMode).
     * - `web_message`: Uses _HTML5 Web Messaging_ instead of the redirect for
     * the authorization response from the `/authorize` endpoint. Defined in the [Web Message Response Mode specification](https://datatracker.ietf.org/doc/html/draft-sakimura-oauth-wmrm-00).
     */
    response_mode: "query" | "fragment" | "form_post" | "web_message"

    /**
     * Redirection URI to which the response will be sent.
     *
     * **Note:** _Required._
     */
    redirect_uri: string

    /**
     * A space-delimited list of permissions that the application requires.
     *
     * **Note:** Requests must contain the `openid` scope value.
     * If the `openid` scope value is not present, the behavior
     * is entirely unspecified.
     *
     * Optional scope values are:
     * - `profile`, `email`, `address`, `phone`, and `offline_access`.
     *
     * **See:** [OpenID Connect Scopes](https://openid.net/specs/openid-connect-basic-1_0.html#Scopes)
     */
    scope: OidcScope

    /**
     * A random string generated by the application for security purposes.
     *
     * If this parameter is set in the request, then it is returned
     * to the application as part of the `redirect_uri`.
     *
     * Because the `redirect_uri` can be guessed, using a state value
     * can increase assurance that an incoming connection is the result
     * of an authentication request initiated by the app.
     *
     * **Note:** _Recommended._
     */
    state: string

    /**
     * A hint to the authorization server about the login identifier
     * the end-user might use to log in.
     *
     * The value can be either an email address or the sub string,
     * which is equivalent to the user's ID.
     *
     * Passing this hint suppresses the account chooser and either pre-fills
     * the email box on the sign-in form, or selects the proper session.
     *
     * **Note:** _Optional._
     */
    login_hint: string

    /**
     * A space delimited, case sensitive list of ASCII string values
     * that specifies whether the authorization server prompts the end-user
     * for re-authentication and consent.
     *
     * Valid values are:
     *
     * - `none`: The authorization server must not display any authentication
     * or consent user interface pages. Cannot be combined with other values.
     * - `login`: The authorization server should prompt the end-user for
     * re-authentication.
     * - `consent`: The authorization server should prompt the end-user for
     * consent before returning information to the client.
     * - `select_account` The authorization server should prompt the end-user
     * to select a user account.
     *
     * **Note:** _Optional._
     *
     * **See:** [OpenID Connect Authentication Request
](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
     */
    prompt: OidcPrompt

    /**
     * An ASCII string value that specifies how the authorization server
     * displays the authentication and consent user interface pages
     * to the end-user.
     *
     * Valid values are:
     *
     * - `page`: The authorization server should display the authentication and
     * consent UI consistent with a full User Agent page view. If the display
     * parameter is not specified, this is the default display mode.
     * - `popup`: The authorization server should display the authentication
     * and consent UI consistent with a popup User Agent window.
     * - `touch`: The authorization server should display the authentication
     * and consent UI consistent with a device that leverages a touch interface.
     * - `wap`: The authorization server should display the authentication and
     * consent UI consistent with a "feature phone" type display.
     *
     * **Note:** _Optional._
     *
     * **See:** [OpenID Connect Authentication Request
](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
     */
    display: "page" | "popup" | "touch" | "wap"

    /**
     * End-user's preferred languages and scripts for the user interface,
     * represented as a space-separated list of _BCP47 [RFC5646_` language tag
     * values, ordered by preference. For instance, the value "fr-CA fr en"
     * represents a preference for French as spoken in Canada, then French
     * (without a region designation), followed by English (without a region
     * designation).
     *
     * **Note:** _Optional._
     *
     * **See:** [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag)
     */
    ui_locales: string
}
