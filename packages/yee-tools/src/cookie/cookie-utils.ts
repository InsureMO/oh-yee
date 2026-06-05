/**
 * Cookie utility functions for managing browser cookies
 * @ohdule cookie-utils
 */

const decode = decodeURIComponent;
const encode = encodeURIComponent;

/**
 * Cookie options interface
 */
export interface CookieOptions {
  /**
   * Cookie expiration in days (number) or as a Date object
   */
  expires?: number | Date;
  /**
   * Cookie domain
   */
  domain?: string;
  /**
   * Cookie path
   */
  path?: string;
  /**
   * Whether the cookie should be secure (HTTPS only)
   */
  secure?: boolean;
  /**
   * Whether to skip URI encoding
   */
  raw?: boolean;
  /**
   * Converter function to transform the cookie value
   */
  converter?: (value: string) => unknown;
}

/**
 * Helper function to check if a value is a string
 */
function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Helper function to check if a string is non-empty
 */
function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value !== "";
}

/**
 * Validates a cookie name
 */
function validateCookieName(name: unknown): void {
  if (!isNonEmptyString(name)) {
    throw new TypeError("Cookie name must be a non-empty string");
  }
}

/**
 * Parses a cookie string into an object
 * @param text - The cookie string to parse
 * @param shouldDecode - Whether to decode the values
 * @returns An object containing cookie name-value pairs
 */
function parseCookieString(
  text: string,
  shouldDecode: boolean,
): Record<string, string> {
  const cookies: Record<string, string> = {};

  if (!isString(text) || text.length === 0) {
    return cookies;
  }

  const decodeValue = shouldDecode ? decode : (s: string) => s;
  const cookieParts = text.split(/;\s/g);

  for (let i = 0; i < cookieParts.length; i++) {
    const part = cookieParts[i];
    if (!part) continue;

    const cookieNameValue = part.match(/([^=]+)=/i);
    let cookieName: string;
    let cookieValue: string;

    if (cookieNameValue) {
      try {
        cookieName = decode(cookieNameValue[1] ?? "");
        cookieValue = decodeValue(
          part.substring((cookieNameValue[1]?.length ?? 0) + 1),
        );
      } catch (ex) {
        // Ignore malformed cookies
        continue;
      }
    } else {
      // Boolean flag cookie (no "=")
      try {
        cookieName = decode(part);
        cookieValue = "";
      } catch (ex) {
        continue;
      }
    }

    if (cookieName) {
      cookies[cookieName] = cookieValue;
    }
  }

  return cookies;
}

/**
 * Gets a cookie value by name
 * @param name - The name of the cookie
 * @param options - Optional cookie options
 * @returns The cookie value, or undefined if not found
 * @example
 * ```ts
 * get('username') // 'john_doe'
 * get('data', { converter: JSON.parse }) // { id: 1, name: 'John' }
 * ```
 */
export function get(
  name: string,
  options?: CookieOptions | ((value: string) => unknown),
): unknown {
  validateCookieName(name);

  let opts: CookieOptions;
  if (typeof options === "function") {
    opts = { converter: options };
  } else {
    opts = options ?? {};
  }

  const cookies = parseCookieString(document.cookie, !opts.raw);
  const value = cookies[name];

  if (value === undefined) {
    return undefined;
  }

  return opts.converter ? opts.converter(value) : value;
}

/**
 * Sets a cookie
 * @param name - The name of the cookie
 * @param value - The value to set
 * @param options - Optional cookie options
 * @returns The created cookie string
 * @example
 * ```ts
 * set('username', 'john_doe')
 * set('data', { id: 1 }, { expires: 7, path: '/' })
 * ```
 */
export function set(
  name: string,
  value: unknown,
  options?: CookieOptions,
): string {
  validateCookieName(name);

  const opts = options ?? {};
  const expires = opts.expires;
  const domain = opts.domain;
  const path = opts.path;

  let cookieValue = String(value);
  if (!opts.raw) {
    cookieValue = encode(cookieValue);
  }

  let text = name + "=" + cookieValue;

  // Handle expires
  let date: Date | undefined;
  if (typeof expires === "number") {
    const d = new Date();
    d.setDate(d.getDate() + expires);
    date = d;
  } else if (expires instanceof Date) {
    date = expires;
  }
  if (date instanceof Date) {
    text += "; expires=" + date.toUTCString();
  }

  // Handle domain
  if (isNonEmptyString(domain)) {
    text += "; domain=" + domain;
  }

  // Handle path
  if (isNonEmptyString(path)) {
    text += "; path=" + path;
  }

  // Handle secure
  if (opts.secure) {
    text += "; secure";
  }

  document.cookie = text;
  return text;
}

/**
 * Removes a cookie
 * @param name - The name of the cookie to remove
 * @param options - Optional cookie options (path and domain should match the original cookie)
 * @returns The created cookie string
 * @example
 * ```ts
 * remove('username')
 * remove('session', { path: '/', domain: '.example.com' })
 * ```
 */
export function remove(name: string, options?: CookieOptions): string {
  const opts = options ?? {};
  opts.expires = new Date(0);
  return set(name, "", opts);
}
