/**
 * Type checking and conversion utility functions
 * @ohdule type-utils
 */

/**
 * Converts a value to a boolean
 *
 * Rules:
 * - String "false", "0", "null", "undefined", "n", "no", "" (empty) → false
 * - String "true", "1", "y", "yes" → true
 * - Other non-empty strings → true
 * - Non-string values → JavaScript truthiness (!!value)
 *
 * @param input - The value to convert
 * @returns The boolean representation of the input
 *
 * @example
 * ```ts
 * // Explicit false values
 * parseBool('false')   // false
 * parseBool('0')       // false
 * parseBool('null')    // false
 * parseBool('undefined') // false
 * parseBool('n')       // false
 * parseBool('no')      // false
 * parseBool('')        // false
 *
 * // Explicit true values
 * parseBool('true')    // true
 * parseBool('1')       // true
 * parseBool('y')       // true
 * parseBool('yes')     // true
 *
 * // Other non-empty strings
 * parseBool('hello')   // true
 * parseBool('random')  // true
 *
 * // Non-string values
 * parseBool(1)         // true
 * parseBool(0)         // false
 * parseBool(null)      // false
 * parseBool({})        // true
 * ```
 */
export function parseBool(input: unknown): boolean {
  // Handle non-string values using JavaScript truthiness
  if (typeof input !== "string") {
    return !!input;
  }

  const normalized = input.trim().toLowerCase();

  // Explicit false values
  const falseValues = ["false", "0", "null", "undefined", "n", "no", ""];
  if (falseValues.includes(normalized)) {
    return false;
  }

  // All other non-empty strings are considered true
  return true;
}

/**
 * Checks if a value is an array
 * @param value - The value to check
 * @returns True if the value is an array
 * @example
 * ```ts
 * isArray([1, 2, 3]) // true
 * isArray('hello') // false
 * ```
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a string
 * @param value - The value to check
 * @returns True if the value is a string
 * @example
 * ```ts
 * isString('hello') // true
 * isString(123) // false
 * ```
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Checks if a value is a number
 * @param value - The value to check
 * @returns True if the value is a number
 * @example
 * ```ts
 * isNumber(123) // true
 * isNumber('123') // false
 * ```
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

/**
 * Checks if a value is a Date object
 * @param value - The value to check
 * @returns True if the value is a Date
 * @example
 * ```ts
 * isDate(new Date()) // true
 * isDate('2024-01-15') // false
 * ```
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is a function
 * @param value - The value to check
 * @returns True if the value is a function
 * @example
 * ```ts
 * isFunction(() => {}) // true
 * isFunction('hello') // false
 * ```
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}

/**
 * Checks if a value is a plain object
 * @param value - The value to check
 * @returns True if the value is a plain object
 * @example
 * ```ts
 * isObject({}) // true
 * isObject([]) // false
 * isObject(null) // false
 * ```
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * Checks if a value is null or undefined
 * @param value - The value to check
 * @returns True if the value is null or undefined
 * @example
 * ```ts
 * isNullOrUndefined(null) // true
 * isNullOrUndefined(undefined) // true
 * isNullOrUndefined(0) // false
 * ```
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if the current browser is Internet Explorer
 * @returns True if the browser is IE
 * @example
 * ```ts
 * isIE() // true (in IE browser)
 * ```
 */
export function isIE(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  // @ts-expect-error - ActiveXObject is IE-specific
  return !!window.ActiveXObject || "ActiveXObject" in window;
}
