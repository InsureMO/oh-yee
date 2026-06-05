/**
 * Internal utility functions for the fetch module
 * @module fetch-utils
 */

/**
 * Sets request headers on an XMLHttpRequest instance
 * @param xhr - XMLHttpRequest instance
 * @param headers - Headers object
 * @param config - Request configuration object
 */
export function buildHeaders(
  xhr: XMLHttpRequest,
  headers: Record<string, string>,
  config: { responseType?: string; async?: boolean },
): void {
  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key)) {
      const value = headers[key];
      if (value !== undefined) {
        xhr.setRequestHeader(key, value);
      }
    }
  }

  if (config.responseType && config.async !== false) {
    xhr.responseType = config.responseType as any;
  }
}

/**
 * Returns the internal type string of a value
 * @param param - Value to check
 * @returns Type string like 'Object', 'Array', 'String', etc.
 */
export function getType(param: any): string {
  return Object.prototype.toString.call(param).slice(8, -1);
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
