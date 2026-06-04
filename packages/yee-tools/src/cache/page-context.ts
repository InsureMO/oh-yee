import { warn } from "../common/logger";

/**
 * Page-level cache that persists until the URL changes
 * @ohdule page-context
 */

/**
 * Page context storage using Map for in-memory caching
 */
class PageContextStorage {
  private data: Map<string, unknown> = new Map();

  /**
   * Stores a value in the page context
   * @param key - The cache key
   * @param value - The value to cache
   * @example
   * ```ts
   * PageContext.put('user', { id: 1, name: 'John' });
   * ```
   */
  put(key: string, value: unknown): void {
    if (this.data.has(key)) {
      warn(`Key "${key}" already exists and will be overwritten`);
    }
    this.data.set(key, value);
  }

  /**
   * Retrieves a value from the page context
   * @param key - The cache key
   * @returns The cached value, or undefined if not found
   * @example
   * ```ts
   * const user = PageContext.get('user');
   * ```
   */
  get<T = unknown>(key: string): T | undefined {
    return this.data.get(key) as T | undefined;
  }

  /**
   * Removes a value from the page context
   * @param key - The cache key to remove
   * @example
   * ```ts
   * PageContext.remove('user');
   * ```
   */
  remove(key: string): void {
    this.data.delete(key);
  }

  /**
   * Clears all values from the page context
   * @example
   * ```ts
   * PageContext.clear();
   * ```
   */
  clear(): void {
    this.data.clear();
  }

  /**
   * Gets all keys in the page context
   * @returns An iterator of all keys
   * @example
   * ```ts
   * for (const key of PageContext.keys()) {
   *   console.log(key);
   * }
   * ```
   */
  keys(): IterableIterator<string> {
    return this.data.keys();
  }

  /**
   * Gets all values in the page context
   * @returns An iterator of all values
   * @example
   * ```ts
   * for (const value of PageContext.values()) {
   *   console.log(value);
   * }
   * ```
   */
  values(): IterableIterator<unknown> {
    return this.data.values();
  }

  /**
   * Gets all entries in the page context
   * @returns An iterator of all key-value pairs
   * @example
   * ```ts
   * for (const [key, value] of PageContext.entries()) {
   *   console.log(key, value);
   * }
   * ```
   */
  entries(): IterableIterator<[string, unknown]> {
    return this.data.entries();
  }

  /**
   * Checks if a key exists in the page context
   * @param key - The cache key to check
   * @returns True if the key exists
   * @example
   * ```ts
   * if (PageContext.has('user')) {
   *   console.log('User data exists');
   * }
   * ```
   */
  has(key: string): boolean {
    return this.data.has(key);
  }

  /**
   * Gets the number of items in the page context
   * @returns The number of cached items
   * @example
   * ```ts
   * console.log(PageContext.size()); // 5
   * ```
   */
  size(): number {
    return this.data.size;
  }
}

/**
 * Singleton instance of PageContext
 */
export const PageContext = new PageContextStorage();
