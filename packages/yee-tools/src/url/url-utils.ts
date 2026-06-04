/**
 * URL utility functions for parsing and manipulating URLs
 * @ohdule url-utils
 */

import { configer } from "../config/config-provider";
import { parseBool } from "../type/type-utils";
import { SessionContext } from "../cache/session-context";
import { warn } from "../common/logger";

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
 * Normalizes a URL path by ensuring it starts with a slash and optionally adding platform prefix
 *
 * @param url - The URL or path to normalize
 * @returns The normalized URL path
 * @throws {TypeError} If url is not a non-empty string
 *
 * @example
 * ```ts
 * // Without tenant
 * normalizeURL('api/users')      // '/api/users'
 * normalizeURL('/api/users')     // '/api/users'
 *
 * // With tenant (when auth.gatewayProxyWithTenant is true)
 * normalizeURL('api/users')      // '/api/platform/api/users'
 * normalizeURL('http://example.com/api/users') // 'http://example.com/api/platform/api/users'
 * ```
 */
export function normalizeURL(url: string): string {
  // Input validation
  if (!url || typeof url !== "string") {
    throw new TypeError("URL must be a non-empty string");
  }

  if (url.startsWith("http")) {
    return url;
  }

  const wrappedUrl = url.startsWith("/") ? url : "/" + url;
  const mark = wrappedUrl.split("/")[1];

  const project_config_key = configer.get("storageKeys.projectConfig", "project_config");
  const projectConfig = SessionContext.get(project_config_key) as any;
  const platformApis = projectConfig?.UI_API_PLATFORM_PATHS || "";
  const tenantCode = projectConfig?.UI_TENANT_CODE || "";

  const platform = platformApis.split(",").find((api: string) => api === mark);

  if (platform) {
    return "/api/platform" + wrappedUrl;
  }

  return `/api/${tenantCode}` + wrappedUrl;
}
