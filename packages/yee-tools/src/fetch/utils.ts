/**
 * Internal utility functions for the fetch module
 * @module fetch-utils
 */

/**
 * Sets request headers on an XMLHttpRequest instance
 * @param xhr - XMLHttpRequest instance
 * @param headers - Headers object
 */
export function buildHeaders(
  xhr: XMLHttpRequest,
  headers: Record<string, string>,
): void {
  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      const value = headers[key];
      if (value !== undefined) {
        xhr.setRequestHeader(key, value);
      }
    }
  }
}

/**
 * Parses raw XMLHttpRequest response headers into a normalized record.
 * @param rawHeaders - Raw headers returned by getAllResponseHeaders
 * @returns Response headers keyed by lowercase header name
 */
export function parseResponseHeaders(
  rawHeaders: string,
): Record<string, string> {
  const headers: Record<string, string> = {};

  rawHeaders
    .trim()
    .split(/[\r\n]+/)
    .forEach((line) => {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex === -1) {
        return;
      }

      const key = line.slice(0, separatorIndex).trim().toLowerCase();
      const value = line.slice(separatorIndex + 1).trim();
      if (!key) {
        return;
      }

      headers[key] = headers[key] ? `${headers[key]}, ${value}` : value;
    });

  return headers;
}

/**
 * Returns the internal type string of a value
 * @param param - Value to check
 * @returns Type string like 'Object', 'Array', 'String', etc.
 */
export function getType(param: any): string {
  return Object.prototype.toString.call(param).slice(8, -1);
}

const NATIVE_REQUEST_BODY_TYPES = new Set([
  'FormData',
  'Blob',
  'File',
  'URLSearchParams',
  'ArrayBuffer',
]);

/**
 * Serializes plain request data while preserving native browser body types.
 * @param data - Request data
 * @param dataFormat - Whether plain data should be serialized as JSON
 * @returns Data ready to be sent by Fetch or XMLHttpRequest
 */
export function serializeRequestData(data: any, dataFormat = true): any {
  if (
    data === null ||
    data === undefined ||
    !dataFormat ||
    typeof data === 'string'
  ) {
    return data ?? null;
  }

  if (
    NATIVE_REQUEST_BODY_TYPES.has(getType(data)) ||
    (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView(data))
  ) {
    return data;
  }

  return JSON.stringify(data);
}

/**
 * Clones request headers and removes a manually supplied multipart Content-Type
 * when the browser should generate the FormData boundary.
 * @param headers - Request headers
 * @param data - Request data
 * @param formDataWithBoundary - Whether the browser should generate the boundary
 * @returns Normalized request headers
 */
export function normalizeRequestHeaders(
  headers: Record<string, string> | undefined,
  data: any,
  formDataWithBoundary = true,
): Record<string, string> | undefined {
  if (!headers) {
    return undefined;
  }

  const normalizedHeaders = { ...headers };
  if (formDataWithBoundary && getType(data) === 'FormData') {
    Object.keys(normalizedHeaders).forEach((key) => {
      if (key.toLowerCase() === 'content-type') {
        delete normalizedHeaders[key];
      }
    });
  }

  return normalizedHeaders;
}

/**
 * Deep merges two objects
 * @param state - Target object
 * @param params - Source object
 * @returns Merged object
 */
export function merger(
  state: Record<string, any>,
  params: Record<string, any>,
): Record<string, any> {
  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (getType(acc[key]) !== "Object" || getType(value) !== "Object") {
        acc[key] = value;
      } else {
        acc[key] = merger(acc[key], value);
      }
      return acc;
    },
    { ...state },
  );
}

/**
 * Rebinds object methods to a given context
 * @param target - Target object
 * @param source - Source object
 * @param thisArg - Context to bind to
 * @returns Target with rebound methods
 */
export function rebind(
  target: Record<string, any>,
  source: Record<string, any>,
  thisArg: any,
): Record<string, any> {
  if (getType(source) === "Object") {
    Object.entries(source).forEach(([key, val]) => {
      if (typeof val === "function") {
        target[key] = val.bind(thisArg);
      } else {
        target[key] = val;
      }
    });
  }
  return target;
}

/**
 * Omits specified keys from an object
 * @param obj - Source object
 * @param keys - Keys to omit
 * @returns New object without specified keys
 */
export function omit(
  obj: Record<string, unknown>,
  keys: string[],
): Record<string, unknown> {
  const res = { ...obj };
  const oks = Object.keys(res);
  keys.forEach((key: string) => {
    if (oks.indexOf(key) > -1) {
      delete res[key];
    }
  });
  return res;
}
