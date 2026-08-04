/**
 * URL utility functions for parsing and manipulating URLs
 * @ohdule url-utils
 */

import { configer } from "../config/config-provider";
import { SessionContext } from "../cache/session-context";
import { parseBool } from "../type/type-utils";
import { warn } from "../common/logger";

/**
 * Parses a query string into an object
 * @param queryString - Query string to parse (without leading '?')
 * @returns Object containing parsed parameters
 */
function parseQueryString(queryString: string): Record<string, string> {
  const params: Record<string, string> = {};

  // Remove leading '?' if present
  const cleanQuery = queryString.startsWith("?")
    ? queryString.slice(1)
    : queryString;

  if (!cleanQuery) {
    return params;
  }

  // Split by '&' and parse each parameter
  const pairs = cleanQuery.split("&");

  for (const pair of pairs) {
    if (!pair) continue;

    const [key, value] = pair.split("=");

    if (key) {
      try {
        // Decode URI component safely
        params[decodeURIComponent(key)] = value
          ? decodeURIComponent(value)
          : "";
      } catch (error) {
        // If decoding fails, use raw values
        warn(`Failed to decode URL parameter: ${pair}`, error);
        params[key] = value || "";
      }
    }
  }

  return params;
}

/**
 * Parses URL query parameters into an object
 * Supports both regular URLs and hash-based routing URLs (e.g., #/path?param=value)
 *
 * @param urlStr - Optional URL string to parse. If not provided, uses current location.search
 * @returns Object containing parsed query parameters
 *
 * @example
 * ```ts
 * // Parse current URL
 * getUrlParam() // { id: '123', name: 'test' }
 *
 * // Parse specific URL
 * getUrlParam('http://example.com?id=123&name=test') // { id: '123', name: 'test' }
 *
 * // Parse hash-based routing URL
 * getUrlParam('http://example.com?lang=en#/page?id=123') // { lang: 'en', id: '123' }
 * ```
 */
export function getUrlParam(urlStr?: string): Record<string, string> {
  const params: Record<string, string> = {};

  // If no URL provided, use current location search
  if (typeof urlStr === "undefined") {
    if (typeof window === "undefined" || typeof location === "undefined") {
      return params;
    }
    return parseQueryString(location.search);
  }

  // Handle hash-based routing (e.g., #/path?param=value)
  if (urlStr.includes("#/")) {
    const [beforeHash, afterHash] = urlStr.split("#/");

    // Parse query params before hash
    if (beforeHash?.includes("?")) {
      const queryString = beforeHash.split("?")[1];
      if (queryString) {
        Object.assign(params, parseQueryString(queryString));
      }
    }

    // Parse query params after hash
    if (afterHash?.includes("?")) {
      const hashQueryString = afterHash.split("?")[1];
      if (hashQueryString) {
        Object.assign(params, parseQueryString(hashQueryString));
      }
    }

    return params;
  }

  // Handle regular URLs
  if (urlStr.includes("?")) {
    const queryString = urlStr.split("?")[1];
    if (queryString) {
      return parseQueryString(queryString);
    }
  }

  return params;
}

/**
 * Converts an object to a query string
 * @param params - Object containing parameters
 * @returns Query string (without leading '?')
 *
 * @example
 * ```ts
 * buildQueryString({ id: '123', name: 'test' }) // 'id=123&name=test'
 * ```
 */
export function buildQueryString(
  params: Record<string, string | number | boolean>,
): string {
  const pairs: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(String(value));
      pairs.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return pairs.join("&");
}

/**
 * Updates URL query parameters
 * @param url - Base URL
 * @param params - Parameters to add/update
 * @returns Updated URL with query parameters
 *
 * @example
 * ```ts
 * updateUrlParams('http://example.com', { id: '123' })
 * // 'http://example.com?id=123'
 *
 * updateUrlParams('http://example.com?name=test', { id: '123' })
 * // 'http://example.com?name=test&id=123'
 * ```
 */
export function updateUrlParams(
  url: string,
  params: Record<string, string | number | boolean>,
): string {
  const [baseUrl, existingQuery] = url.split("?");
  const existingParams = existingQuery ? parseQueryString(existingQuery) : {};

  // Merge existing and new parameters
  const mergedParams = { ...existingParams, ...params };

  const queryString = buildQueryString(mergedParams);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl || "";
}

/**
 * Removes specific query parameters from URL
 * @param url - URL to modify
 * @param keysToRemove - Array of parameter keys to remove
 * @returns URL without specified parameters
 *
 * @example
 * ```ts
 * removeUrlParams('http://example.com?id=123&name=test', ['id'])
 * // 'http://example.com?name=test'
 * ```
 */
export function removeUrlParams(url: string, keysToRemove: string[]): string {
  const [baseUrl, existingQuery] = url.split("?");

  if (!existingQuery) {
    return url;
  }

  const params = parseQueryString(existingQuery);

  // Remove specified keys
  for (const key of keysToRemove) {
    delete params[key];
  }

  const queryString = buildQueryString(params);
  return queryString ? `${baseUrl}?${queryString}` : baseUrl || "";
}

/**
 * Options for {@link normalizeURL}
 */
export interface NormalizeURLOptions {
  /**
   * Whether the request is routed through the baseline API gateway
   * (UI_BASE_LINE_API_GATEWAY_PROXY). When true, the baseline tenant code
   * (UI_BASE_LINE_TENANT_CODE) is used as the path prefix instead of the
   * regular UI_TENANT_CODE. Equivalent to the legacy isCustomerGetway flag.
   */
  baseline?: boolean;
}

/**
 * Normalizes a URL path by ensuring it starts with a slash and adding a
 * tenant / platform / segment prefix when needed.
 *
 * Prefixing is gated by `UI_API_GATEWAY_PROXY_WITH_TENANT` from the project
 * config: it defaults to **on** when unset, and is only disabled by an explicit
 * falsy value (`false` / `"false"` / `"0"` / ...). Both boolean and
 * string-encoded booleans are accepted.
 *
 * @param url - The URL or path to normalize
 * @param options - Optional normalization options
 * @returns The normalized URL path
 * @throws {TypeError} If url is not a non-empty string
 *
 * @example
 * ```ts
 * // Already under /api → only a leading slash is ensured
 * normalizeURL('api/users')      // '/api/users'
 *
 * // Tenant prefix added (UI_TENANT_CODE)
 * normalizeURL('users/list')     // '/api/{tenant}/users/list'
 *
 * // Platform prefix (when 'urp' is in UI_API_PLATFORM_PATHS)
 * normalizeURL('urp/pub/load')   // '/api/platform/urp/pub/load'
 *
 * // Baseline gateway uses UI_BASE_LINE_TENANT_CODE
 * normalizeURL('users/list', { baseline: true }) // '/api/{baselineTenant}/users/list'
 *
 * // Full URLs are returned untouched
 * normalizeURL('http://example.com/api/users') // 'http://example.com/api/users'
 * ```
 */
export function normalizeURL(url: string, options?: NormalizeURLOptions): string {
  // Input validation
  if (!url || typeof url !== "string") {
    throw new TypeError("URL must be a non-empty string");
  }

  if (url.startsWith("http")) {
    return url;
  }

  const wrappedUrl = url.startsWith("/") ? url : "/" + url;
  const service = wrappedUrl.split("/")[1];
  if (!service) {
    return wrappedUrl;
  }

  const projectConfigKey = configer.get<string>("storageKeys.projectConfig", "project_config");
  const cfg = (SessionContext.get(projectConfigKey) as any) || {};
  const baseLineTenant = cfg.UI_BASE_LINE_TENANT_CODE || "";

  // Baseline gateway without a baseline tenant → no prefix (legacy early return)
  if (options?.baseline && !baseLineTenant) {
    return wrappedUrl;
  }

  // UI_API_GATEWAY_PROXY_WITH_TENANT master switch.
  // Defaults to ON when unset; only an explicit falsy value disables prefixing.
  // Existence is checked first because parseBool(undefined) === false.
  const withTenantRaw = cfg.UI_API_GATEWAY_PROXY_WITH_TENANT;
  const withTenant =
    withTenantRaw === undefined || withTenantRaw === null ? true : parseBool(withTenantRaw);
  if (!withTenant) {
    return wrappedUrl;
  }

  // Already prefixed with /api → avoid double prefix
  if (service === "api") {
    return wrappedUrl;
  }

  // 1) Platform prefix
  const platformApis: string[] = (cfg.UI_API_PLATFORM_PATHS || "").split(",").filter(Boolean);
  if (platformApis.includes(service)) {
    return "/api/platform" + wrappedUrl;
  }

  // 2) Segment prefix (UI_API_SEGMENT_PATHS: { segmentKey: "svc1,svc2" })
  const segmentPaths: Record<string, string> = cfg.UI_API_SEGMENT_PATHS || {};
  for (const segKey of Object.keys(segmentPaths)) {
    const list = (segmentPaths[segKey] || "").split(",").filter(Boolean);
    if (list.includes(service)) {
      return `/api/${segKey}${wrappedUrl}`;
    }
  }

  // 3) Tenant prefix — baseline tenant wins when on baseline gateway
  const tenant =
    options?.baseline && baseLineTenant ? baseLineTenant : cfg.UI_TENANT_CODE || "";
  return `/api/${tenant}${wrappedUrl}`;
}
