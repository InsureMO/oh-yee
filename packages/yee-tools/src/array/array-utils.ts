/**
 * Array utility functions for common array operations
 * @ohdule array-utils
 */

/**
 * Trims whitespace from all string elements in an array
 * @param array - The array of strings to trim
 * @returns A new array with trimmed strings
 * @example
 * ```ts
 * trimArray([' hello ', ' world ']) // ['hello', 'world']
 * ```
 */
export function trimArray(array: string[]): string[] {
  return array.map((element) => element.replace(/^\s+|\s+$/gm, ""));
}

/**
 * Checks if an array contains duplicate elements
 * @param array - The array to check
 * @returns True if the array contains duplicates
 * @example
 * ```ts
 * isRepeat([1, 2, 3, 2]) // true
 * isRepeat([1, 2, 3]) // false
 * ```
 */
export function isRepeat<T>(array: T[]): boolean {
  const seen = new Set<T>();
  for (const item of array) {
    if (seen.has(item)) {
      return true;
    }
    seen.add(item);
  }
  return false;
}

/**
 * Finds the first duplicate element in an array
 * @param array - The array to check
 * @returns The first duplicate element, or null if no duplicates exist
 * @example
 * ```ts
 * repeatElement([1, 2, 3, 2, 4]) // 2
 * repeatElement([1, 2, 3]) // null
 * ```
 */
export function repeatElement<T>(array: T[]): T | null {
  const seen = new Set<T>();
  for (const item of array) {
    if (seen.has(item)) {
      return item;
    }
    seen.add(item);
  }
  return null;
}

/**
 * Removes duplicate elements from an array
 * @param array - The array to deduplicate
 * @returns A new array with unique elements
 * @example
 * ```ts
 * unique([1, 2, 2, 3, 3, 4]) // [1, 2, 3, 4]
 * ```
 */
export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Chunks an array into smaller arrays of a specified size
 * @param array - The array to chunk
 * @param size - The size of each chunk
 * @returns An array of chunks
 * @example
 * ```ts
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (size <= 0) {
    throw new Error("Chunk size must be greater than 0");
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
