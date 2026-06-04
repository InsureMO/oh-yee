import { warn } from "../common/logger";

/**
 * Local-level cache that persists until browser cache is cleared
 * Uses localStorage for persistence
 * @ohdule local-context
 */

/**
 * Local context storage using localStorage
 */
class LocalContextStorage {
  private cache: Record<string, unknown> = Object.create(null);

  /**
   * Stores a value in the local context
   * @param key - The cache key
   * @param value - The value to cache
   * @returns The stored value
   * @example
   * ```ts
   * LocalContext.put('preferences', { theme: 'dark' });
   * ```
   */
  put<T>(key: string, value: T): T {
    this.cache[key] = value;

    if (typeof localStorage !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        warn(`Failed to store "${key}" in localStorage:`, error);
      }
    }

    return value;
  }

  /**
   * Retrieves a value from the local context
   * @param key - The cache key
   * @param parse - Whether to parse JSON (default: true)
   * @returns The cached value, or null if not found
   * @example
   * ```ts
   * const preferences = LocalContext.get('preferences');
   * ```
   */
  get<T = unknown>(key: string, parse: boolean = true): T | null {
    const cachedData = this.cache[key];
    if (cachedData !== undefined) {
      return cachedData as T;
    }

    if (typeof localStorage === "undefined") {
      return null;
    }

    const localData = localStorage.getItem(key);
    if (localData && localData !== "undefined") {
      if (!parse || key === "system_i18nKey") {
        return localData as T;
      }

      try {
        return JSON.parse(localData) as T;
      } catch (error) {
        warn(`Failed to parse "${key}" from localStorage:`, error);
        return localData as T;
      }
    }

    return null;
  }

  /**
   * Removes a value from the local context
   * @param key - The cache key to remove
   * @example
   * ```ts
   * LocalContext.remove('preferences');
   * ```
   */
  remove(key: string): void {
    delete this.cache[key];

    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clears all values from the local context
   * @example
   * ```ts
   * LocalContext.clear();
   * ```
   */
  clear(): void {
    this.cache = Object.create(null);

    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
  }

  /**
   * Checks if a key exists in the local context
   * @param key - The cache key to check
   * @returns True if the key exists
   * @example
   * ```ts
   * if (LocalContext.has('preferences')) {
   *   console.log('Preferences exist');
   * }
   * ```
   */
  has(key: string): boolean {
    return (
      key in this.cache ||
      (typeof localStorage !== "undefined" &&
        localStorage.getItem(key) !== null)
    );
  }

  /**
   * Gets all keys in the local context
   * @returns An array of all keys
   * @example
   * ```ts
   * const keys = LocalContext.keys();
   * ```
   */
  keys(): string[] {
    return Object.keys(this.cache);
  }

  /**
   * Checks the size of localStorage
   * @param maxSizeKB - Maximum size in KB to check against
   * @returns True if there's enough space
   * @example
   * ```ts
   * if (LocalContext.checkSize(5000)) {
   *   console.log('Enough space available');
   * }
   * ```
   */
  checkSize(maxSizeKB: number): boolean {
    if (typeof localStorage === "undefined") {
      return false;
    }

    let size = 0;
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        const item = localStorage.getItem(key);
        size += item?.length ?? 0;
      }
    }

    const sizeKB = size / 1024;
    return maxSizeKB - sizeKB > 0;
  }
}

/**
 * Singleton instance of LocalContext
 */
export const LocalContext = new LocalContextStorage();
