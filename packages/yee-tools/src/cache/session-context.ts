import { extend } from '../object/object-utils';
import { isObject } from '../type/type-utils';
import { warn } from "../common/logger";
/**
 * Session-level cache that persists until the browser is closed
 * Uses sessionStorage for persistence
 * @ohdule session-context
 */

/**
 * Session context storage using sessionStorage
 */
class SessionContextStorage {
  private cache: Record<string, unknown> = Object.create(null);

  /**
   * Stores a value in the session context
   * @param key - The cache key
   * @param value - The value to cache
   * @returns The stored value
   * @example
   * ```ts
   * SessionContext.put('token', 'abc123');
   * ```
   */
  put<T>(key: string, value: T): T {
    this.cache[key] = value;

    if (typeof sessionStorage !== "undefined") {
      try {
        if (typeof value === 'string') {
          sessionStorage.setItem(key, value);
        } else {
          sessionStorage.setItem(key, JSON.stringify(value));
        }
      } catch (error) {
        warn(`Failed to store "${key}" in sessionStorage:`, error);
      }
    }

    return value;
  }

  /**
   * Stores a value in the session context with intelligent merging
   *
   * This method provides two special behaviors compared to `put()`:
   * 1. **Deep Merging**: If the key already exists and both old/new values are objects,
   *    they will be deep-merged instead of replaced
   * 2. **Nested Path Support**: Supports dot-notation keys (e.g., "user.profile.name")
   *    to set nested values within an object
   *
   * @param key - The cache key. Supports dot notation for nested paths (e.g., "user.profile.name")
   * @param value - The value to cache
   * @returns The stored value (may be merged with existing value)
   *
   * @example
   * ```ts
   * // Simple merge (existing object + new object)
   * SessionContext.put('user', { name: 'John', age: 30 });
   * SessionContext.mergeSet('user', { age: 31, city: 'NYC' });
   * // Result: { name: 'John', age: 31, city: 'NYC' }
   *
   * // Nested path setting
   * SessionContext.put('config', { theme: 'dark' });
   * SessionContext.mergeSet('config.ui.language', 'en');
   * // Result: { theme: 'dark', ui: { language: 'en' } }
   * ```
   *
   * @remarks
   * - For simple key-value storage without merging, use `put()` instead
   * - When using dot notation, parent objects will be created if they don't exist
   * - Arrays and primitives are replaced, not merged
   */
  mergeSet<T>(key: string, value: T): unknown {
    if (key.includes(".")) {
      return this._setNestedValue(key, value);
    } else {
      return this._setWithMerge(key, value);
    }
  }

  /**
   * @deprecated Use `mergeSet()` instead. This method will be removed in a future version.
   * Legacy alias for `mergeSet()` with the same functionality.
   */
  set<T>(key: string, value: T): unknown {
    return this.mergeSet(key, value);
  }

  /**
   * Private helper: Set nested value using dot notation
   */
  private _setNestedValue<T>(key: string, value: T): unknown {
    const keys = key.split(".");
    let target = {} as Record<string, unknown>;
    const len = keys.length;
    const latest = len - 1;

    // Build nested object structure from right to left
    for (let i = latest; i >= 0; i--) {
      const currentKey = keys[i] as string;
      if (i === latest) {
        target[currentKey] = value;
      } else if (i > 0) {
        target = { [currentKey]: target };
      }
    }

    const root = keys[0] as string;
    const prev = this.get(root, true) as Record<string, unknown>;
    const curr = prev ? extend(prev, target, true) : target;
    this.put(root, curr);
    return curr;
  }

  /**
   * Private helper: Set with merge if existing value is an object
   */
  private _setWithMerge<T>(key: string, value: T): unknown {
    const isExist = this.has(key);
    if (isExist) {
      const existValue = this.get(key);
      const merged = isObject(existValue) && isObject(value)
        ? extend(existValue, value, true)
        : value;
      this.put(key, merged);
      return merged;
    } else {
      this.put(key, value);
      return value;
    }
  }

  /**
   * Retrieves a value from the session context
   * @param key - The cache key
   * @param parse - Whether to parse JSON (default: true)
   * @returns The cached value, or null if not found
   * @example
   * ```ts
   * const token = SessionContext.get('token');
   * ```
   */
  get<T = unknown>(key: string, parse: boolean = true): T | null {
    const cachedData = this.cache[key];
    if (cachedData !== undefined) {
      return cachedData as T;
    }

    if (typeof sessionStorage === "undefined") {
      return null;
    }

    const sessionData = sessionStorage.getItem(key);
    if (sessionData && sessionData !== "undefined") {
      if (!parse || key === "Authorization") {
        return sessionData as T;
      }

      // Quick check for JSON strings to avoid JSON.parse errors on plain strings
      const firstChar = sessionData[0]!;
      if (firstChar === '{' || firstChar === '[' || firstChar === '"' || firstChar === 'n' || firstChar === 't' || firstChar === 'f' || (firstChar === '-' || (firstChar >= '0' && firstChar <= '9'))) {
        try {
          return JSON.parse(sessionData) as T;
        } catch {
          return sessionData as T;
        }
      }
      return sessionData as T;
    }

    return null;
  }

  /**
   * Removes a value from the session context
   * @param key - The cache key to remove
   * @example
   * ```ts
   * SessionContext.remove('token');
   * ```
   */
  remove(key: string): void {
    delete this.cache[key];

    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem(key);
    }
  }

  /**
   * Clears all values from the session context
   * @example
   * ```ts
   * SessionContext.clear();
   * ```
   */
  clear(): void {
    this.cache = Object.create(null);

    if (typeof sessionStorage !== "undefined") {
      sessionStorage.clear();
    }
  }

  /**
   * Gets all keys in the session context
   * @returns An array of all keys
   * @example
   * ```ts
   * const keys = SessionContext.keys();
   * ```
   */
  keys(): string[] {
    return Object.keys(this.cache);
  }

  /**
   * Checks if a key exists in the session context
   * @param key - The cache key to check
   * @returns True if the key exists
   * @example
   * ```ts
   * if (SessionContext.has('token')) {
   *   console.log('Token exists');
   * }
   * ```
   */
  has(key: string): boolean {
    return (
      key in this.cache ||
      (typeof sessionStorage !== "undefined" &&
        sessionStorage.getItem(key) !== null)
    );
  }

  /**
   * Checks the size of sessionStorage
   * @param maxSizeKB - Maximum size in KB to check against
   * @returns True if there's enough space
   * @example
   * ```ts
   * if (SessionContext.checkSize(5000)) {
   *   console.log('Enough space available');
   * }
   * ```
   */
  checkSize(maxSizeKB: number): boolean {
    if (typeof sessionStorage === "undefined") {
      return false;
    }

    let size = 0;
    for (const key in sessionStorage) {
      if (Object.prototype.hasOwnProperty.call(sessionStorage, key)) {
        const item = sessionStorage.getItem(key);
        size += item?.length ?? 0;
      }
    }

    const sizeKB = size / 1024;
    return maxSizeKB - sizeKB > 0;
  }
}

/**
 * Singleton instance of SessionContext
 */
export const SessionContext = new SessionContextStorage();
