/*
 * File: TeslaApiRequestTemplates.ts
 *
 * Copyright (c) Stan Mots. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { RestApiRequestTemplate } from "../shared/RestApiTypes.js"
import type { TeslaApiHeaders } from "./TeslaApiTypes.js"

export type TeslaApiRequestType = keyof typeof TeslaApiRequestTemplates
export type TeslaApiRequestGroup = [keyof typeof TeslaApiRequestGroupTemplates]

/**
 * @title 
 * Defines parameters used to perform a specific Tesla API request.
 * 
 * @note
 * To check whether `TeslaApiRequestTemplate` contains all keys
 * used by {@link TeslaApiRequestTemplates} specify its type as 
 * the following one: 
 * 
 // type _TeslaApiRequestTemplates = {
 //    [k in string]: TeslaApiRequestTemplate
 // }
 *
 * @note
 * Remove the type from {@link TeslaApiRequestTemplates} object declaration
 * after experiments to prevent literal widening. See `RestApiRequestTemplates` 
 * for more details.
 */
export interface TeslaApiRequestTemplate extends RestApiRequestTemplate {
    GROUPS?: TeslaApiRequestGroup
    HEADERS?: TeslaApiHeaders
    AUTH?: boolean
    NOTE?: string
    CONTENT?: string
}

/**
 * @title
 * Defines mapping between group names and group templates.
 *
 * @note
 * The type **MUST NOT** be specified to prevent literal widening.
 *
 * @see RestApiRequestGroupTemplates
 */
export const TeslaApiRequestGroupTemplates = {
    DEFAULT: {
        HEADERS: {
            "X-Tesla-User-Agent": "TeslaApp/4.8.1/5e1bfb8d0d/ios/15.4.1",
        },
    },
} as const

/**
 * @title
 * Defines mapping between Tesla API request types and templates.
 *
 * @notes
 * - The configuration is based on `ownerapi_endpoints.json`.
 *
 * - Use `(:\s\{[\s\S\n]+?\},)` in `VSCode` regex field to select all request
 * templates (i.e. objects between curly braces).
 *
 * - The type **MUST NOT** be specified to prevent literal widening.
 *
 * @see RestApiRequestTemplates.
 */
export const TeslaApiRequestTemplates = {
    STATUS: {
        METHOD: "GET",
        URI: "status",
        AUTH: false,
    },
    PRODUCT_LIST: {
        METHOD: "GET",
        URI: "api/1/products",
        AUTH: true,
    },
    VEHICLE_LIST: {
        METHOD: "GET",
        URI: "api/1/vehicles",
        AUTH: true,
    },
    VEHICLE_ORDER_LIST: {
        METHOD: "GET",
        URI: "api/1/users/orders",
        AUTH: true,
    },
    VEHICLE_SUMMARY: {
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}",
        AUTH: true,
    },
    VEHICLE_DATA: {
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}/vehicle_data",
        AUTH: true,
    },
    CACHED_PROTO_VEHICLE_DATA: {
        NOTE: "This is cached data, pushed by the vehicle on sleep, wake and around OTAs.",
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}/latest_vehicle_data",
        AUTH: true,
    },
    VEHICLE_SERVICE_DATA: {
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}/service_data",
        AUTH: true,
    },
    NEARBY_CHARGING_SITES: {
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}/nearby_charging_sites",
        AUTH: true,
    },
    WAKE_UP: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/wake_up",
        AUTH: true,
    },
    UNLOCK: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/door_unlock",
        AUTH: true,
    },
    LOCK: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/door_lock",
        AUTH: true,
    },
    HONK_HORN: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/honk_horn",
        AUTH: true,
    },
    FLASH_LIGHTS: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/flash_lights",
        AUTH: true,
    },
    CLIMATE_ON: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/auto_conditioning_start",
        AUTH: true,
    },
    CLIMATE_OFF: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/auto_conditioning_stop",
        AUTH: true,
    },
    MAX_DEFROST: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_preconditioning_max",
        AUTH: true,
    },
    CHANGE_CLIMATE_TEMPERATURE_SETTING: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_temps",
        AUTH: true,
    },
    SET_CLIMATE_KEEPER_MODE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_climate_keeper_mode",
        AUTH: true,
    },
    HVAC_BIOWEAPON_MODE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_bioweapon_mode",
        AUTH: true,
    },
    SCHEDULED_DEPARTURE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_scheduled_departure",
        AUTH: true,
    },
    SCHEDULED_CHARGING: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_scheduled_charging",
        AUTH: true,
    },
    CHARGING_AMPS: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_charging_amps",
        AUTH: true,
    },
    SET_CABIN_OVERHEAT_PROTECTION: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_cabin_overheat_protection",
        AUTH: true,
    },
    CHANGE_CHARGE_LIMIT: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_charge_limit",
        AUTH: true,
    },
    SET_VEHICLE_NAME: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_vehicle_name",
        AUTH: true,
    },
    CHANGE_SUNROOF_STATE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/sun_roof_control",
        AUTH: true,
    },
    WINDOW_CONTROL: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/window_control",
        AUTH: true,
    },
    ACTUATE_TRUNK: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/actuate_trunk",
        AUTH: true,
    },
    REMOTE_START: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_start_drive",
        AUTH: true,
    },
    TRIGGER_HOMELINK: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/trigger_homelink",
        AUTH: true,
    },
    CHARGE_PORT_DOOR_OPEN: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_port_door_open",
        AUTH: true,
    },
    CHARGE_PORT_DOOR_CLOSE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_port_door_close",
        AUTH: true,
    },
    START_CHARGE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_start",
        AUTH: true,
    },
    STOP_CHARGE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/charge_stop",
        AUTH: true,
    },
    MEDIA_TOGGLE_PLAYBACK: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_toggle_playback",
        AUTH: true,
    },
    MEDIA_NEXT_TRACK: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_next_track",
        AUTH: true,
    },
    MEDIA_PREVIOUS_TRACK: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_prev_track",
        AUTH: true,
    },
    MEDIA_NEXT_FAVORITE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_next_fav",
        AUTH: true,
    },
    MEDIA_PREVIOUS_FAVORITE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_prev_fav",
        AUTH: true,
    },
    MEDIA_VOLUME_UP: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_volume_up",
        AUTH: true,
    },
    MEDIA_VOLUME_DOWN: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/media_volume_down",
        AUTH: true,
    },
    SPLUNK_TELEMETRY: {
        METHOD: "POST",
        URI: "api/1/logs",
        AUTH: true,
    },
    APP_FEEDBACK_ENTITLEMENTS: {
        METHOD: "GET",
        URI: "api/1/diagnostics",
        AUTH: true,
    },
    APP_FEEDBACK_LOGS: {
        METHOD: "POST",
        URI: "api/1/reports",
        AUTH: true,
    },
    APP_FEEDBACK_METADATA: {
        METHOD: "POST",
        URI: "api/1/diagnostics",
        AUTH: true,
    },
    RETRIEVE_NOTIFICATION_PREFERENCES: {
        METHOD: "GET",
        URI: "api/1/notification_preferences",
        AUTH: true,
    },
    SEND_NOTIFICATION_PREFERENCES: {
        METHOD: "POST",
        URI: "api/1/notification_preferences",
        AUTH: true,
    },
    RETRIEVE_NOTIFICATION_SUBSCRIPTIONS: {
        METHOD: "GET",
        URI: "api/1/subscriptions",
        AUTH: true,
    },
    SEND_NOTIFICATION_SUBSCRIPTIONS: {
        METHOD: "POST",
        URI: "api/1/subscriptions",
        AUTH: true,
    },
    DEACTIVATE_DEVICE_TOKEN: {
        METHOD: "POST",
        URI: "api/1/device/{device_token}/deactivate",
        AUTH: true,
    },
    CALENDAR_SYNC: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/upcoming_calendar_entries",
        AUTH: true,
    },
    SET_VALET_MODE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_valet_mode",
        AUTH: true,
    },
    RESET_VALET_PIN: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/reset_valet_pin",
        AUTH: true,
    },
    SPEED_LIMIT_ACTIVATE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_activate",
        AUTH: true,
    },
    SPEED_LIMIT_DEACTIVATE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_deactivate",
        AUTH: true,
    },
    SPEED_LIMIT_SET_LIMIT: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_set_limit",
        AUTH: true,
    },
    SPEED_LIMIT_CLEAR_PIN: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/speed_limit_clear_pin",
        AUTH: true,
    },
    SCHEDULE_SOFTWARE_UPDATE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/schedule_software_update",
        AUTH: true,
    },
    CANCEL_SOFTWARE_UPDATE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/cancel_software_update",
        AUTH: true,
    },
    SET_SENTRY_MODE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/set_sentry_mode",
        AUTH: true,
    },
    TAKE_DRIVENOTE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/take_drivenote",
        AUTH: true,
    },
    POWERWALL_ORDER_SESSION_DATA: {
        METHOD: "GET",
        URI: "api/1/users/powerwall_order_entry_data",
        AUTH: true,
    },
    POWERWALL_ORDER_PAGE: {
        METHOD: "GET",
        URI: "powerwall_order_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    ONBOARDING_EXPERIENCE: {
        METHOD: "GET",
        URI: "api/1/users/onboarding_data",
        AUTH: true,
    },
    ONBOARDING_EXPERIENCE_PAGE: {
        METHOD: "GET",
        URI: "onboarding_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    GET_UPCOMING_SERVICE_VISIT_DATA: {
        METHOD: "GET",
        URI: "api/1/users/service_scheduling_data",
        AUTH: true,
    },
    GET_OWNERSHIP_XP_CONFIG: {
        METHOD: "GET",
        URI: "api/1/users/app_config",
        AUTH: true,
    },
    REFERRAL_DATA: {
        METHOD: "GET",
        URI: "api/1/users/referral_data",
        AUTH: true,
    },
    REFERRAL_PAGE: {
        METHOD: "GET",
        URI: "referral_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    ROADSIDE_ASSISTANCE_DATA: {
        METHOD: "GET",
        URI: "api/1/users/roadside_assistance_data",
        AUTH: true,
    },
    ROADSIDE_ASSISTANCE_PAGE: {
        METHOD: "GET",
        URI: "roadside_assistance_page",
        AUTH: true,
        CONTENT: "HTML",
    },
    MESSAGE_CENTER_MESSAGE_COUNT: {
        METHOD: "GET",
        URI: "api/1/messages/count",
        AUTH: true,
    },
    MESSAGE_CENTER_MESSAGE_LIST: {
        METHOD: "GET",
        URI: "api/1/messages",
        AUTH: true,
    },
    MESSAGE_CENTER_MESSAGE: {
        METHOD: "GET",
        URI: "api/1/messages/{message_id}",
        AUTH: true,
    },
    MESSAGE_CENTER_MESSAGE_ACTION_UPDATE: {
        METHOD: "POST",
        URI: "api/1/messages/{message_id}/actions",
        AUTH: true,
    },
    SEND_DEVICE_KEY: {
        METHOD: "POST",
        URI: "api/1/users/keys",
        AUTH: true,
    },
    SITE_DATA: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/live_status",
        AUTH: true,
    },
    SITE_CONFIG: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/site_info",
        AUTH: true,
    },
    RATE_TARIFFS: {
        METHOD: "GET",
        URI: "api/1/energy_sites/rate_tariffs",
        AUTH: true,
    },
    SITE_TARIFF: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/tariff_rate",
        AUTH: true,
    },
    CALENDAR_HISTORY_DATA: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/calendar_history",
        AUTH: true,
    },
    SOLAR_SAVINGS_FORECAST: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/savings_forecast",
        AUTH: true,
    },
    ENERGY_REGISTER_PRODUCT: {
        METHOD: "POST",
        URI: "api/1/users/register_product",
        AUTH: true,
    },
    ENERGY_SITE_BACKUP_TIME_REMAINING: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/backup_time_remaining",
        AUTH: true,
    },
    ENERGY_SITE_PROGRAMS: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/programs",
        AUTH: true,
    },
    ENERGY_SITE_TELEMETRY_HISTORY: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/telemetry_history",
        AUTH: true,
    },
    BACKUP_RESERVE: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/backup",
        AUTH: true,
    },
    OFF_GRID_VEHICLE_CHARGING_RESERVE: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/off_grid_vehicle_charging_reserve",
        AUTH: true,
    },
    SITE_NAME: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/site_name",
        AUTH: true,
    },
    OPERATION_MODE: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/operation",
        AUTH: true,
    },
    ENERGY_SITE_IMPORT_EXPORT_CONFIG: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/grid_import_export",
        AUTH: true,
    },
    TIME_OF_USE_SETTINGS: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/time_of_use_settings",
        AUTH: true,
    },
    STORM_MODE_SETTINGS: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/storm_mode",
        AUTH: true,
    },
    ENERGY_SITE_COMMAND: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/command",
        AUTH: true,
    },
    ENERGY_SITE_ENROLL_PROGRAM: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/program",
        AUTH: true,
    },
    ENERGY_SITE_OPT_EVENT: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/event",
        AUTH: true,
    },
    ENERGY_SITE_PREFERENCE: {
        METHOD: "POST",
        URI: "api/1/energy_sites/{site_id}/preference",
        AUTH: true,
    },
    CHECK_ENERGY_PRODUCT_REGISTRATION: {
        METHOD: "GET",
        URI: "api/1/energy_sites/registered",
        AUTH: true,
    },
    ENERGY_EVENT: {
        METHOD: "POST",
        URI: "api/1/energy_sites/energy_event",
        AUTH: true,
    },
    VEHICLE_CHARGE_HISTORY: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/charge_history",
        AUTH: true,
    },
    ENERGY_SITE_PROGRAM_DETAILS: {
        METHOD: "GET",
        URI: "api/1/energy_sites/{site_id}/program",
        AUTH: true,
    },
    ENERGY_WALL_CONNECTOR_FIRMWARE_DOWNLOAD_URL: {
        METHOD: "GET",
        URI: "api/1/wall_connectors/firmware",
        AUTH: true,
    },
    SEND_NOTIFICATION_CONFIRMATION: {
        METHOD: "POST",
        URI: "api/1/notification_confirmations",
        AUTH: true,
    },
    SEND_TO_VEHICLE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/share",
        AUTH: true,
    },
    SEND_SC_TO_VEHICLE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/navigation_sc_request",
        AUTH: true,
    },
    SEND_GPS_TO_VEHICLE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/navigation_gps_request",
        AUTH: true,
    },
    REMOTE_SEAT_HEATER_REQUEST: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_seat_heater_request",
        AUTH: true,
    },
    REMOTE_AUTO_SEAT_CLIMATE_REQUEST: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_auto_seat_climate_request",
        AUTH: true,
    },
    REMOTE_SEAT_COOLING_REQUEST: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_seat_cooler_request",
        AUTH: true,
    },
    REMOTE_STEERING_WHEEL_HEATER_REQUEST: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/remote_steering_wheel_heater_request",
        AUTH: true,
    },
    TRIGGER_VEHICLE_SCREENSHOT: {
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}/screenshot",
        AUTH: true,
    },
    HERMES_AUTHORIZATION: {
        METHOD: "POST",
        URI: "api/1/users/jwt/hermes",
        AUTH: true,
    },
    HERMES_VEHICLE_AUTHORIZATION: {
        METHOD: "POST",
        URI: "api/1/vehicles/{id}/jwt/hermes",
        AUTH: true,
    },
    STATIC_SUPERCHARGER_FILE: {
        METHOD: "GET",
        URI: "static/superchargers/{file_path}",
        AUTH: true,
    },
    STATIC_CHARGER_FILE: {
        METHOD: "GET",
        URI: "static/chargers/{file_path}",
        AUTH: true,
    },
    PLAN_TRIP: {
        METHOD: "POST",
        URI: "api/1/vehicles/plan_trip",
        AUTH: true,
    },
    PLACE_SUGGESTIONS: {
        METHOD: "POST",
        URI: "api/1/vehicles/place_suggestions",
        AUTH: true,
    },
    DRIVING_PLAN: {
        METHOD: "POST",
        URI: "api/1/vehicles/driving_plan",
        AUTH: true,
    },
    REVERSE_GEOCODING: {
        METHOD: "GET",
        URI: "maps/reverse_geocoding/v3/",
        AUTH: true,
    },
    USER: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/user",
        AUTH: true,
    },
    OWNERSHIP_TRANSLATIONS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/static/protected/translations/{path}",
        AUTH: true,
    },
    ROADSIDE_INCIDENTS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/roadside/incidents",
        AUTH: true,
    },
    ROADSIDE_CREATE_INCIDENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/roadside/incidents",
        AUTH: true,
    },
    ROADSIDE_CANCEL_INCIDENT: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/roadside/incidents/{incidentsId}",
        AUTH: true,
    },
    ROADSIDE_WARRANTY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/roadside/warranty",
        AUTH: true,
    },
    ROADSIDE_LOCATIONS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/roadside/locations",
        AUTH: true,
    },
    ROADSIDE_COUNTRIES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/roadside/countries",
        AUTH: true,
    },
    SERVICE_GET_SERVICE_VISITS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/appointments",
        AUTH: true,
    },
    SERVICE_UPDATE_APPOINTMENT: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/service/appointments/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_CANCEL_APPOINTMENT: {
        METHOD: "PATCH",
        URI: "mobile-app/service/appointments/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_CREATE_ACTIVITIES: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/activities/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_UPDATE_ACTIVITIES: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/service/activities/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_DELETE_ACTIVITIES: {
        METHOD: "PATCH",
        URI: "bff/v2/mobile-app/service/activities/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_GET_SERVICE_APPOINTMENTS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/service-appointments",
        AUTH: true,
    },
    SERVICE_CREATE_SERVICE_VISIT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/appointments",
        AUTH: true,
    },
    SERVICE_TRACKER_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MOBILE_NEAREST_LOCATIONS: {
        METHOD: "GET",
        URI: "mobile-app/service/locations/mobile/nearest",
        AUTH: true,
    },
    SERVICE_MOBILE_OPEN_SLOTS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/locations/mobile/slots",
        AUTH: true,
    },
    SERVICE_CENTER_OPEN_SLOTS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/locations/center/slots",
        AUTH: true,
    },
    SERVICE_CENTER_FETCH_PREFERRED_CENTER: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/locations/preferred-service-center",
        AUTH: true,
    },
    SERVICE_CENTER_UPDATE_PREFERRED_CENTER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/locations/preferred-service-center",
        AUTH: true,
    },
    SERVICE_SAVE_CENTER_APPOINTMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/center",
        AUTH: true,
    },
    SERVICE_CREATE_MOBILE_APPOINTMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/mobile",
        AUTH: true,
    },
    SERVICE_UPDATE_MOBILE_APPOINTMENT: {
        METHOD: "PATCH",
        URI: "bff/v2/mobile-app/service/mobile/{appointmentId}",
        AUTH: true,
    },
    SERVICE_SWITCH_TO_CENTER_APPOINTMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/mobile/{appointmentId}/convert-to-center",
        AUTH: true,
    },
    SERVICE_SWITCH_TO_MOBILE_APPOINTMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/center/{appointmentId}/convert-to-mobile",
        AUTH: true,
    },
    SERVICE_MOBILE_APPOINTMENT_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/mobile/{appointmentId}",
        AUTH: true,
    },
    SERVICE_CENTER_APPOINTMENT_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/center/{appointmentId}",
        AUTH: true,
    },
    SERVICE_HISTORY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/history",
        AUTH: true,
    },
    SERVICE_SURVEY_ELIGIBILITY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/surveys",
        AUTH: true,
    },
    SERVICE_SURVEY_QUESTIONS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/surveys",
        AUTH: true,
    },
    SERVICE_SURVEY_ANSWER_QUESTIONS: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/service/surveys",
        AUTH: true,
    },
    SERVICE_LOCATIONS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/center/locations",
        AUTH: true,
    },
    SERVICE_LOCATIONS_BY_TRT_ID: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/center/locations-by-trtid",
        AUTH: true,
    },
    SERVICE_MOBILE_ISSUES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/mobile-service-issues",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_SERVICE_TRACKER: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/mobile-app-service-tracker",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_ALLOW_FILE_UPLOAD: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/service-scheduling-allow-file-upload",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_MOBILE_SERVICE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/show-mobile-service",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_MACGYVER: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/tao-4109-use-macgyver-mobile-app",
        AUTH: true,
    },
    SERVICE_FEATURE_FLAG_SCHEDULING_FALLBACK: {
        METHOD: "GET",
        URI: "mobile-app/feature-flag/TAO-13782-no-estimate-schedule-fallback",
        AUTH: true,
    },
    SERVICE_UPLOAD_FILE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/files",
        AUTH: true,
    },
    SERVICE_DELETE_UPLOADED_FILE: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/files/{uuid}",
        AUTH: true,
    },
    SERVICE_UPDATE_FILE_METADATA: {
        METHOD: "PATCH",
        URI: "bff/v2/mobile-app/files/{uuid}/metadata",
        AUTH: true,
    },
    SERVICE_GET_FILE_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/files/metadata",
        AUTH: true,
    },
    SERVICE_GET_FILE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/files/{uuid}",
        AUTH: true,
    },
    SERVICE_GET_APPOINTMENT_INVOICES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/invoices",
        AUTH: true,
    },
    SERVICE_GET_ESTIMATE_APPROVAL_STATUS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/estimate-status",
        AUTH: true,
    },
    SERVICE_GET_ESTIMATE_COST_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/tracker/invoices/{invoiceId}",
        AUTH: true,
    },
    SERVICE_APPROVE_ESTIMATE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/estimate-status",
        AUTH: true,
    },
    SERVICE_GET_FINAL_INVOICE_AMOUNT_DUE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/tracker/{serviceVisitID}/amount-due",
        AUTH: true,
    },
    SERVICE_MACGYVER_ALERTS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/macgyver/alerts",
        AUTH: true,
    },
    SERVICE_MACGYVER_OUTSTANDING_WORK: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/macgyver/categories",
        AUTH: true,
    },
    SERVICE_ACTIVITY_INFO: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/macgyver/activity-info/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MACGYVER_POST_CUSTOMER_ANSWERS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/macgyver/customer-answers",
        AUTH: true,
    },
    SERVICE_MACGYVER_DISMISS_CUSTOMER_ANSWERS: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/macgyver/customer-answers",
        AUTH: true,
    },
    SERVICE_MACGYVER_SERVICE_METHOD: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/macgyver/service-type",
        AUTH: true,
    },
    SERVICE_MACGYVER_DIAGNOSTIC_RESULT: {
        METHOD: "GET",
        URI: "mobile-app/macgyver/urgent-autodiag-result",
        AUTH: true,
    },
    SERVICE_MACGYVER_CLASSIFY_COLLISION_IMAGES: {
        METHOD: "POST",
        URI: "mobile-app/macgyver/classify-collision-images",
        AUTH: true,
    },
    SERVICE_ACCEPT_LOANER_AGREEMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/loaner/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_CREATE_OFFLINE_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/payment/create-offline-order",
        AUTH: true,
    },
    SERVICE_COMPLETE_OFFLINE_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/payment/complete-offline-order",
        AUTH: true,
    },
    SERVICE_EXTERNAL_COLLISION_CENTER_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/locations/external-collision-center-list",
        AUTH: true,
    },
    SERVICE_FETCH_RECALLS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/campaign/recall-detail",
        AUTH: true,
    },
    SERVICE_FETCH_ENTITY_CODE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/appointments/get-trt/{trtId}",
        AUTH: true,
    },
    SERVICE_CREATE_INVOICE: {
        METHOD: "POST",
        URI: "mobile-app/service/estimate/{serviceVisitId}",
        AUTH: true,
    },
    SERVICE_ESTIMATE_DETAILS: {
        METHOD: "GET",
        URI: "mobile-app/service/estimate/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_RESCHEDULE_DISCLAIMER: {
        METHOD: "GET",
        URI: "mobile-app/service/reschedule-disclaimer",
        AUTH: true,
    },
    ENERGY_OWNERSHIP_GET_TOGGLES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy/feature-flags",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_SITE_INFORMATION: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-service/site-information",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_SERVICE_CASES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-service/appointments",
        AUTH: true,
    },
    ENERGY_SERVICE_POST_SERVICE_CASE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/energy-service/appointments",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_APPOINTMENT_SUGGESTIONS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-service/appointment-suggestions",
        AUTH: true,
    },
    ENERGY_SERVICE_CANCEL_SERVICE_CASE: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/energy-service/service-case",
        AUTH: true,
    },
    ENERGY_SERVICE_CANCEL_APPOINTMENT: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/energy-service/appointments",
        AUTH: true,
    },
    ENERGY_DOCUMENTS_GET_DOCUMENTS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-documents/documents",
        AUTH: true,
    },
    ENERGY_DOCUMENTS_DOWNLOAD_DOCUMENT: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-documents/documents/{documentId}",
        AUTH: true,
    },
    ENERGY_GET_TROUBLESHOOTING_GUIDE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-service/troubleshooting/{troubleshootingFlow}?version=3",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_POWERWALL_WARRANTY_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-service/warranty-details",
        AUTH: true,
    },
    ENERGY_SERVICE_GET_CHAT_AVAILABILITY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/energy-service/chat-availability",
        AUTH: true,
    },
    LOOTBOX_USER_INFO: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals",
        AUTH: true,
    },
    LOOTBOX_GET_ONBOARDING_COPY: {
        METHOD: "GET",
        URI: "mobile-app/referrals/getOnboardingCopy",
        AUTH: true,
    },
    LOOTBOX_PAST_REFERRAL_DATA: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/past-referrals",
        AUTH: true,
    },
    REFERRAL_GET_USER_INFO: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/user-info",
        AUTH: true,
    },
    REFERRAL_GET_PRODUCT_INFO: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/product-info",
        AUTH: true,
    },
    REFERRAL_GET_CONTACT_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/contact-list",
        AUTH: true,
    },
    REFERRAL_POST_CONTACT_LIST: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/referrals/contact-list",
        AUTH: true,
    },
    REFERRAL_GET_CREDIT_HISTORY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/credit-history",
        AUTH: true,
    },
    REFERRAL_GET_PAST_HISTORY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/past-referral-history",
        AUTH: true,
    },
    REFERRAL_GET_PAST_HISTORY_COUNT: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/past-referral-history/count",
        AUTH: true,
    },
    REFERRAL_GET_FEATURE_FLAG: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/tao-69420-treasure",
        AUTH: true,
    },
    REFERRAL_GET_TERMS_AND_CONDITIONS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/referrals/terms-conditions",
        AUTH: true,
    },
    UPGRADES_GET_ELIGIBLE_UPGRADES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/upgrades/eligible/v2",
        AUTH: true,
    },
    UPGRADES_GET_PURCHASED_UPGRADES_V2: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/upgrades/purchased/v2",
        AUTH: true,
    },
    UPGRADES_SUBMIT_REFUND: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/upgrades/refunds/v2",
        AUTH: true,
    },
    USER_ACCOUNT_GET_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/account/details",
        AUTH: true,
    },
    USER_ACCOUNT_PUT_DETAILS: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/account/details",
        AUTH: true,
    },
    USER_ACCOUNT_UPLOAD_PROFILE_PICTURE: {
        METHOD: "POST",
        URI: "images/upload",
        AUTH: true,
    },
    USER_ACCOUNT_DOWNLOAD_PROFILE_PICTURE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/account/profile-pic",
        AUTH: true,
    },
    UPGRADES_CREATE_OFFLINE_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/upgrades/payment/offline-order",
        AUTH: true,
    },
    UPGRADES_COMPLETE_OFFLINE_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/upgrades/payment/offline-purchase-complete/v2",
        AUTH: true,
    },
    SUBSCRIPTIONS_GET_ELIGIBLE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/subscriptions",
        AUTH: true,
    },
    SUBSCRIPTIONS_GET_PURCHASED_SUBSCRIPTIONS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/subscriptions/purchased/v2",
        AUTH: true,
    },
    SUBSCRIPTIONS_CREATE_OFFLINE_ORDER: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/subscriptions/offline-order",
        AUTH: true,
    },
    SUBSCRIPTIONS_POST_CREATE_OFFLINE_ORDER: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/subscriptions/offline-order",
        AUTH: true,
    },
    SUBSCRIPTIONS_PURCHASE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/subscriptions",
        AUTH: true,
    },
    MANAGE_GET_SUBSCRIPTION_INVOICES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/subscriptions/invoices",
        AUTH: true,
    },
    MANAGE_PATCH_AUTO_RENEW_SUBSCRIPTIONS: {
        METHOD: "PATCH",
        URI: "bff/v2/mobile-app/subscriptions/v2",
        AUTH: true,
    },
    MANAGE_GET_BILL_ME_LATER_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/bill-me-later/pending-orders",
        AUTH: true,
    },
    MANAGE_COMPLETE_BILL_ME_LATER_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/purchase-complete",
        AUTH: true,
    },
    MANAGE_CANCEL_BILL_ME_LATER_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/cancel",
        AUTH: true,
    },
    MANAGE_UPGRADE_BILL_ME_LATER_GET_OFFLINE_TOKEN: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/token",
        AUTH: true,
    },
    MANAGE_GET_BILL_ME_LATER_TOGGLE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/bill-me-later/security-toggle",
        AUTH: true,
    },
    MANAGE_POST_BILL_ME_LATER_TOGGLE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/bill-me-later/security-toggle",
        AUTH: true,
    },
    BILLING_ADDRESS_FORM_FEATURE_FLAG: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/billing-address/feature-flag/tao-8202-ownership-mobile-app-billing-address",
        AUTH: true,
    },
    VIDEO_GUIDES_GET_VIDEO_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/video-guides",
        AUTH: true,
    },
    PAYMENTS_GET_SIGNED_USER_TOKEN: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/payments/signed-user-token",
        AUTH: true,
    },
    PAYMENTS_GET_SIGNED_USER_TOKEN_V4: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/payments/v4/signed-user-token",
        AUTH: true,
    },
    PAYMENTS_POST_SIGNED_USER_TOKEN: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/payments/signed-user-token",
        AUTH: true,
    },
    PAYMENTS_GET_INSTRUMENT: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/payments/instrument",
        AUTH: true,
    },
    PAYMENTS_GET_BILLING_ADDRESS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/billing-address",
        AUTH: true,
    },
    PAYMENTS_UPDATE_BILLING_ADDRESS: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/billing-address",
        AUTH: true,
    },
    PAYMENTS_FETCH_CN_ENTITY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/payments/entity",
        AUTH: true,
    },
    DOCUMENTS_DOWNLOAD_INVOICE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/documents/invoices/{invoiceId}",
        AUTH: true,
    },
    SERVICE_MESSAGES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/messages/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_SEND_MESSAGE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/service/messages/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MESSAGES_MARK_READ: {
        METHOD: "PATCH",
        URI: "bff/v2/mobile-app/service/messages/{serviceVisitID}",
        AUTH: true,
    },
    SERVICE_MESSAGES_USER_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/service/messages/users",
        AUTH: true,
    },
    COMMERCE_CATEGORIES: {
        METHOD: "GET",
        URI: "commerce-api/categories/v1{locale}",
        AUTH: true,
    },
    COMMERCE_RECOMMENDATIONS_CATEGORIES: {
        METHOD: "POST",
        URI: "commerce-api/recommendations/categories/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_ADDRESS: {
        METHOD: "GET",
        URI: "commerce-api/addresses/v1{locale}",
        AUTH: true,
    },
    COMMERCE_ADDRESS: {
        METHOD: "POST",
        URI: "commerce-api/addresses/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CAPTURE: {
        METHOD: "POST",
        URI: "commerce-api/purchases/v1{locale}",
        AUTH: true,
    },
    COMMERCE_PROCESSPAYMENT: {
        METHOD: "POST",
        URI: "commerce-api/purchases/{purchaseNumber}/processpayment/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CART_UPDATE: {
        METHOD: "PUT",
        URI: "commerce-api/carts/{cartId}/items/{lineItemId}/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CART_DELETE: {
        METHOD: "DELETE",
        URI: "commerce-api/carts/{cartId}/items/{lineItemId}/v1{locale}",
        AUTH: true,
    },
    COMMERCE_ADD_CART: {
        METHOD: "POST",
        URI: "commerce-api/carts/items/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CLEAR_CART: {
        METHOD: "DELETE",
        URI: "commerce-api/carts/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_CART: {
        METHOD: "GET",
        URI: "commerce-api/carts/v1{locale}",
        AUTH: true,
    },
    COMMERCE_INVENTORY: {
        METHOD: "POST",
        URI: "commerce-api/inventory/v2{locale}",
        AUTH: true,
    },
    COMMERCE_ITEM: {
        METHOD: "POST",
        URI: "commerce-api/items/v1{locale}",
        AUTH: true,
    },
    COMMERCE_TOKEN: {
        METHOD: "POST",
        URI: "commerce-api/tokens/v1{locale}",
        AUTH: true,
    },
    COMMERCE_ADDRESS_VALIDATION: {
        METHOD: "POST",
        URI: "commerce-api/addresses/validations/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GEOGRAPHIES: {
        METHOD: "GET",
        URI: "commerce-api/geographies/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_STORE_INFO: {
        METHOD: "GET",
        URI: "commerce-api/storeconfigurations/v1{locale}",
        AUTH: true,
    },
    COMMERCE_PURCHASE_HISTORY: {
        METHOD: "GET",
        URI: "commerce-api/purchases/v1{locale}",
        AUTH: true,
    },
    COMMERCE_PURCHASE_BY_ORDERNUMBER: {
        METHOD: "GET",
        URI: "commerce-api/purchases/{orderNumber}/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_VEHICLES: {
        METHOD: "GET",
        URI: "commerce-api/vehicles/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_VEHICLES: {
        METHOD: "POST",
        URI: "commerce-api/vehicles/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_SERVICECENTERS: {
        METHOD: "GET",
        URI: "commerce-api/servicecenters/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_SERVICECENTERS: {
        METHOD: "POST",
        URI: "commerce-api/servicecenters/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_CANCELORDER: {
        METHOD: "POST",
        URI: "commerce-api/cancellation/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_RETURNORDER: {
        METHOD: "POST",
        URI: "commerce-api/returns/v1{locale}",
        AUTH: true,
    },
    COMMERCE_GET_INSTALLERS: {
        METHOD: "GET",
        URI: "commerce-api/installers/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_INSTALLER_VENDOR: {
        METHOD: "POST",
        URI: "commerce-api/checkout/auditrecords/v1{locale}",
        AUTH: true,
    },
    COMMERCE_CONTENT: {
        METHOD: "GET",
        URI: "commerce-api/content/v2?file={fileName}",
        AUTH: true,
    },
    COMMERCE_CREATE_ENERGY_ORDER: {
        METHOD: "POST",
        URI: "commerce-api/energy/orders/v1{locale}",
        AUTH: true,
    },
    COMMERCE_STOCK_NOTIFICATION: {
        METHOD: "POST",
        URI: "commerce-api/stocknotifications/v1{locale}",
        AUTH: true,
    },
    MATTERMOST: {
        METHOD: "POST",
        URI: "Just a placeholder",
        AUTH: true,
    },
    SAFETY_RATING_GET_ELIGIBLE_FOR_TELEMATICS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/insurance/eligible-for-telematics",
        AUTH: true,
    },
    SAFETY_RATING_GET_DAILY_BREAKDOWN: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/insurance/daily-breakdown",
        AUTH: true,
    },
    SAFETY_RATING_GET_TRIPS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/insurance/trips",
        AUTH: true,
    },
    SAFETY_RATING_GET_ESTIMATED_SAFETY_SCORE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/insurance/calculate-safety-rating",
        AUTH: true,
    },
    COMMERCE_POST_INVOICE: {
        METHOD: "POST",
        URI: "commerce-api/purchases/invoices/v1{locale}",
        AUTH: true,
    },
    COMMERCE_POST_CHECKOUT_INVOICE: {
        METHOD: "POST",
        URI: "commerce-api/checkout/invoices/v1{locale}",
        AUTH: true,
    },
    CHARGING_BALANCE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/balance",
        AUTH: true,
    },
    CHARGING_BALANCE_CHARGE_TYPE_FLAG: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/tao-9296-filter-by-charge-type",
        AUTH: true,
    },
    CHARGING_BALANCE_CREATE_OFFLINE_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/charging/payment",
        AUTH: true,
    },
    CHARGING_BALANCE_PAYMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/charging/payment/complete",
        AUTH: true,
    },
    CHARGING_BALANCE_ZERO_DOLLAR_TX: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/signed-token",
        AUTH: true,
    },
    CHARGING_BALANCE_GET_IS_BLOCKED: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging-cn/supercharger-status",
        AUTH: true,
    },
    CHARGING_HISTORY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/history",
        AUTH: true,
    },
    CHARGING_HISTORY_VEHICLES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/vehicles",
        AUTH: true,
    },
    CHARGING_HISTORY_VEHICLE_IMAGES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/vehicle-images",
        AUTH: true,
    },
    DOWNLOAD_CHARGING_INVOICE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/invoice/{uuid}",
        AUTH: true,
    },
    DOWNLOAD_CHARGING_SUBSCRIPTION_INVOICE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/subscription/invoice/{invoiceId}",
        AUTH: true,
    },
    CHARGING_DOWNLOAD_CSV: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/export",
        AUTH: true,
    },
    CHARGING_GET_SITES_BOUNDING_BOX: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/charging/sites",
        AUTH: true,
    },
    CHARGING_GET_SITE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/site/{id}",
        AUTH: true,
    },
    CHARGING_STOP_SESSION: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging/session/stop/{id}",
        AUTH: true,
    },
    FINANCING_IS_ENABLED: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/is-captive",
        AUTH: true,
    },
    FINANCING_FETCH_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/details",
        AUTH: true,
    },
    FINANCING_FETCH_DOCUMENT_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/document-list",
        AUTH: true,
    },
    FINANCING_DOWNLOAD_DOCUMENT: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/document",
        AUTH: true,
    },
    FINANCING_GET_SIGNED_TOKEN: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/signed-token",
        AUTH: true,
    },
    FINANCING_GET_COMMERCIAL_SIGNED_TOKEN: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/commercial-signed-token",
        AUTH: true,
    },
    FINANCING_GET_BILLING_ADDRESS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/billing-address",
        AUTH: true,
    },
    FINANCING_GET_WIRE_TRANSFER_INFO: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/wire-transfer-info",
        AUTH: true,
    },
    FINANCING_UPDATE_BILLING_ADDRESS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/billing-address",
        AUTH: true,
    },
    FINANCING_ONE_TIME_PAYMENT_SIGNED_TOKEN: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/one-time-payment-signed-token",
        AUTH: true,
    },
    FINANCING_UPDATE_ONE_TIME_PAYMENT_STATUS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/update-one-time-payment-status",
        AUTH: true,
    },
    FINANCING_UPDATE_ENROLLMENT_SETTINGS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/update-enrollment-settings",
        AUTH: true,
    },
    FINANCING_LOOKUP_WALLET: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/lookup-wallet",
        AUTH: true,
    },
    FINANCING_GET_FEATURE_FLAGS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/feature-flags",
        AUTH: true,
    },
    FINANCING_GET_E_SIGN_DOCUMENTS_STATUS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/documents-status",
        AUTH: true,
    },
    FINANCING_SUBMIT_FINANCING_ACTION: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/manage-financing-action",
        AUTH: true,
    },
    FINANCING_GET_EXTENSION_QUOTE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/extension-quote",
        AUTH: true,
    },
    FINANCING_GET_CAR_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/car-details",
        AUTH: true,
    },
    FINANCING_GET_E_SIGN_SUMMARY: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/esign-summary",
        AUTH: true,
    },
    FINANCING_GET_E_SIGN_DOCUMENT: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/esign-document",
        AUTH: true,
    },
    FINANCING_GET_ACQUISITION_FILE_LIST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/acquisition/files",
        AUTH: true,
    },
    FINANCING_GET_ACQUISITION_FILE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/acquisition/file",
        AUTH: true,
    },
    FINANCING_UPLOAD_ACQUISITION_FILE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/acquisition/file",
        AUTH: true,
    },
    FINANCING_VALIDATE_E_SIGN_DETAILS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/esign-validate-details",
        AUTH: true,
    },
    FINANCING_GET_ACQUISITION_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/acquisition/details",
        AUTH: true,
    },
    FINANCING_GET_APPOINTMENT_DETAILS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/appointment/details",
        AUTH: true,
    },
    FINANCING_GET_APPOINTMENT_LOCATION: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/appointment/location",
        AUTH: true,
    },
    FINANCING_GET_SETTLEMENT_QUOTE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/settlement-quote",
        AUTH: true,
    },
    FINANCING_GENERATE_QUOTE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/quote",
        AUTH: true,
    },
    FINANCING_GENERATE_BUYOUT_QUOTE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/buyout-quote",
        AUTH: true,
    },
    FINANCING_GET_ODOMETER_INFO: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/odometer-info",
        AUTH: true,
    },
    FINANCING_REMOVE_ACQUISITION_FILE: {
        METHOD: "PUT",
        URI: "bff/v2/mobile-app/financing/acquisition/file",
        AUTH: true,
    },
    FINANCING_SUBMIT_ACQUISITION: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/acquisition/submit",
        AUTH: true,
    },
    FINANCING_STATUS_UPDATE_ACQUISITION: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/acquisition/status-update",
        AUTH: true,
    },
    FINANCING_SUBMIT_APPOINTMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/save",
        AUTH: true,
    },
    FINANCING_CANCEL_APPOINTMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/cancel",
        AUTH: true,
    },
    FINANCING_GET_NEAREST_LOCATIONS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/nearest-locations",
        AUTH: true,
    },
    FINANCING_GET_OPEN_SLOTS: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/open-slots",
        AUTH: true,
    },
    FINANCING_GET_OPTION_CODES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/option-codes",
        AUTH: true,
    },
    FINANCING_GET_TRANSLATIONS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/translations",
        AUTH: true,
    },
    FINANCING_REQUEST_INSPECTION_APPOINTMENT: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/financing/appointment/inspection-request",
        AUTH: true,
    },
    FINANCING_GET_REGISTRATION_ADDRESS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/financing/registration-address",
        AUTH: true,
    },
    DASHCAM_SAVE_CLIP: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/command/dashcam_save_clip",
        AUTH: true,
    },
    NON_OWNER_SUPPORTED_PRODUCTS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/user/supported-products",
        AUTH: true,
    },
    FEATURE_CONFIG: {
        METHOD: "GET",
        URI: "api/1/users/feature_config",
        AUTH: true,
    },
    SITE_LOCK_GET_SITES: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging-cn/get-locks",
        AUTH: true,
    },
    SITE_LOCK_SEND_UNLOCK_REQUEST: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/charging-cn/open-lock",
        AUTH: true,
    },
    SITE_LOCK_GET_STATUS: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/charging-cn/get-lock-status",
        AUTH: true,
    },
    FETCH_VEHICLE_SHARED_DRIVERS: {
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}/drivers",
        AUTH: true,
    },
    CREATE_VEHICLE_SHARE_INVITE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/invitations",
        AUTH: true,
    },
    FETCH_VEHICLE_SHARE_INVITES: {
        METHOD: "GET",
        URI: "api/1/vehicles/{vehicle_id}/invitations",
        AUTH: true,
    },
    REVOKE_VEHICLE_SHARE_INVITE: {
        METHOD: "POST",
        URI: "api/1/vehicles/{vehicle_id}/invitations/{invite_id}/revoke",
        AUTH: true,
    },
    REMOVE_VEHICLE_SHARE_DRIVER: {
        METHOD: "DELETE",
        URI: "api/1/vehicles/{vehicle_id}/drivers/{share_user_id}",
        AUTH: true,
    },
    REDEEM_VEHICLE_SHARE_INVITE: {
        METHOD: "POST",
        URI: "api/1/invitations/redeem",
        AUTH: true,
    },
    AUTH_GENERATE_INSTANT_LOGIN: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/auth/generate-instant-login",
        AUTH: true,
    },
    GET_MANAGE_DRIVER_FLAG: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/feature-flag/TAO-14025-add-driver-flow",
        AUTH: true,
    },
    CONTACT_US_CLASSIFICATION: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/contact-us/classify-narrative",
        AUTH: true,
    },
    CONTACT_US_CONTENT_CATALOG: {
        METHOD: "GET",
        URI: "mobile-app/contact-us/content-catalog",
        AUTH: true,
    },
    VEHICLE_PSEUDONYM_DIRECTIVES: {
        METHOD: "POST",
        URI: "api/1/directives/products",
        AUTH: true,
    },
    VEHICLE_UPLOAD_PSEUDONYM_DIRECTIVE: {
        METHOD: "POST",
        URI: "api/1/directives/discover",
        AUTH: true,
    },
    VEHICLE_COMPLETE_PSEUDONYM_DIRECTIVE: {
        METHOD: "POST",
        URI: "api/1/directives/products/complete",
        AUTH: true,
    },
    OWNERSHIP_VEHICLE_SPECS_REQUEST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/ownership/vehicle-details",
        AUTH: true,
    },
    OWNERSHIP_RESERVATION_DETAILS_REQUEST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/ownership/reservation-details/{rn}",
        AUTH: true,
    },
    OWNERSHIP_WARRANTY_DETAILS_REQUEST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/ownership/warranty-details",
        AUTH: true,
    },
    COMMERCE_FEATURE_FLAG: {
        METHOD: "GET",
        URI: "mobile-app/commerce/feature-flags",
        AUTH: true,
    },
    COMMERCE_SEARCH_PRODUCTS: {
        METHOD: "POST",
        URI: "commerce-api/searches/v1{locale}",
        AUTH: true,
    },
    VEHICLE_DOWNLOAD_VAULT: {
        METHOD: "GET",
        URI: "api/1/users/vault_profile",
        AUTH: true,
    },
    VEHICLE_UPLOAD_VAULT: {
        METHOD: "POST",
        URI: "api/1/users/vault_profile",
        AUTH: true,
    },
    USER_INFO: {
        METHOD: "GET",
        URI: "api/1/users/me",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_ASSETS_REQUEST: {
        METHOD: "GET",
        URI: "bff/mobile-app/transfer/assets",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_REMOVAL_ELIGIBILITY: {
        METHOD: "GET",
        URI: "bff/mobile-app/transfer/remove-car-eligibility",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_ADD_INITIATE: {
        METHOD: "POST",
        URI: "bff/mobile-app/transfer/add-initiate",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_VALIDATE_CAR_NAME: {
        METHOD: "POST",
        URI: "bff/mobile-app/transfer/validate-car-name",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_REMOVE_INITIATE: {
        METHOD: "POST",
        URI: "bff/mobile-app/transfer/remove-car",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_SECURITY_CODE: {
        METHOD: "POST",
        URI: "bff/mobile-app/transfer/security-code",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_UPLOAD_DOCUMENT: {
        METHOD: "POST",
        URI: "bff/mobile-app/transfer/upload-document",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_ADD_PROCESS: {
        METHOD: "POST",
        URI: "bff/mobile-app/transfer/add-process",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_USER_SIGNED_TOKEN: {
        METHOD: "GET",
        URI: "bff/mobile-app/transfer/user-signed-token",
        AUTH: true,
    },
    OWNERSHIP_TRANSFER_TOOL_SIGNED_TOKEN: {
        METHOD: "POST",
        URI: "bff/mobile-app/transfer/signed-token",
        AUTH: true,
    },
    SECURITY_AND_PRIVACY_ASSETS_REQUEST: {
        METHOD: "GET",
        URI: "bff/mobile-app/security-privacy/assets",
        AUTH: true,
    },
    CONTACT_INFO_ASSETS_REQUEST: {
        METHOD: "GET",
        URI: "bff/mobile-app/account/contact-info-assets",
        AUTH: true,
    },
    VEHICLE_DETAILS_ASSETS_REQUEST: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/ownership/vehicle-details-assets",
        AUTH: true,
    },
    ESA_FETCH_ELIGIBLE: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/esa/eligible",
        AUTH: true,
    },
    ESA_CREATE_OFFLINE_ORDER: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/esa/payment/offline-order",
        AUTH: true,
    },
    ESA_OFFLINE_ORDER_COMPLETE: {
        METHOD: "POST",
        URI: "bff/v2/mobile-app/esa/payment/offline-purchase-complete",
        AUTH: true,
    },
    ESA_FETCH_PURCHASED: {
        METHOD: "GET",
        URI: "bff/v2/mobile-app/esa/purchased",
        AUTH: true,
    },
} as const
