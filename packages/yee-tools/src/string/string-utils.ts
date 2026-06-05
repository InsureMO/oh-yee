/**
 * String utility functions for common string operations
 * @ohdule string-utils
 */

/**
 * Trims whitespace from the beginning and end of a string
 * @param str - The string to trim
 * @returns The trimmed string
 * @example
 * ```ts
 * trim('  hello  ') // 'hello'
 * ```
 */
export function trim(str: string): string {
  return str.replace(/^\s+|\s+$/gm, "");
}

/**
 * Checks if a string is empty (length === 0)
 * @param str - The string to check
 * @returns True if the string is empty
 * @example
 * ```ts
 * isEmpty('') // true
 * isEmpty('hello') // false
 * ```
 */
export function isEmpty(str: string): boolean {
  return str.length === 0;
}

/**
 * Checks if a string is not empty
 * @param str - The string to check
 * @returns True if the string is not empty
 * @example
 * ```ts
 * isNotEmpty('hello') // true
 * isNotEmpty('') // false
 * ```
 */
export function isNotEmpty(str: string): boolean {
  return !isEmpty(str);
}

/**
 * Checks if a string is blank (null, undefined, or only whitespace)
 * @param str - The string to check
 * @returns True if the string is blank
 * @example
 * ```ts
 * isBlank(null) // true
 * isBlank('   ') // true
 * isBlank('hello') // false
 * ```
 */
export function isBlank(str: string | null | undefined): boolean {
  if (str == null) { // eslint-disable-line eqeqeq
    return true;
  }
  return trim(str).length === 0;
}

/**
 * Checks if a string is not blank
 * @param str - The string to check
 * @returns True if the string is not blank
 * @example
 * ```ts
 * isNotBlank('hello') // true
 * isNotBlank('   ') // false
 * ```
 */
export function isNotBlank(str: string | null | undefined): boolean {
  return !isBlank(str);
}

/**
 * Masks portions of a string based on a mask pattern
 * @param value - The string to mask
 * @param maskPattern - The mask pattern (format: "maskChar:(start,end)[,...]|[excludeChars]")
 * @returns The masked string
 * @example
 * ```ts
 * mask('1234567890', '*:(0,3)') // '***4567890'
 * mask('1234567890', '*:(-4)') // '123456****'
 * ```
 */
export function mask(
  value: string | null | undefined,
  maskPattern: string,
): string {
  if (value == null || value === "" || value === undefined) { // eslint-disable-line eqeqeq
    return "";
  }

  const index = maskPattern.indexOf("|");
  let left: string;
  let regex: string;

  if (index === -1) {
    left = maskPattern;
    regex = ".";
  } else {
    regex = maskPattern.substr(index + 1, maskPattern.length);
    if (regex === "" || regex === "()") {
      regex = ".";
    } else {
      regex = "[^" + regex.substr(1, regex.length - 1) + "]";
    }
    left = maskPattern.substr(0, index);
  }

  const maskArray = left.split(":");
  const maskChar = maskArray[0] ?? "*";
  const startEndArray = maskArray[1]?.split("),") ?? [];

  let result = value;

  for (let i = 0; i < startEndArray.length; i++) {
    const startEnd = startEndArray[i]?.replace(/[-|(|)]/g, "").split(",") ?? [];
    const startTemp = parseInt(startEnd[0] ?? "0", 10);
    const endTemp =
      startEnd.length > 1 ? parseInt(startEnd[1] ?? "0", 10) : null;

    const length = result.length;
    let start: number;
    let end: number;

    if (startEndArray[i]?.charAt(0) === "-") {
      // from end to start
      if (endTemp == null) { // eslint-disable-line eqeqeq
        start = 0;
        end = length < startTemp ? 0 : length - startTemp;
      } else {
        start = length < endTemp ? 0 : length - endTemp;
        end = length < startTemp ? 0 : length - startTemp;
      }
    } else {
      // from start to end
      if (endTemp == null) { // eslint-disable-line eqeqeq
        start = length < startTemp ? length : startTemp;
        end = length;
      } else {
        start = length < startTemp ? length : startTemp;
        end = length < endTemp ? length : endTemp;
      }
    }

    result =
      result.substring(0, start) +
      result.substring(start, end).replace(new RegExp(regex, "g"), maskChar ?? "*") +
      result.substring(end);
  }

  return result;
}
