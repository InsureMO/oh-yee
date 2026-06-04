/**
 * CodeTable cache utility
 * @ohdule code-table-cache
 */

/**
 * In-memory cache for CodeTable data
 */
class CodeTableCacheManager {
  private codeTableMap: Map<string, any> = new Map();

  /**
   * Add a code table to cache
   * @param id - Cache key
   * @param codeTable - Code table data
   */
  add(id: string, codeTable: any): void {
    this.codeTableMap.set(id, codeTable);
  }

  /**
   * Initialize/reset the cache
   */
  init(): void {
    this.codeTableMap = new Map();
  }

  /**
   * Get a code table from cache
   * @param id - Cache key
   * @returns Code table data or undefined if not found
   */
  get(id: string): any {
    return this.codeTableMap.get(id);
  }

  /**
   * Get the entire cache map
   * @returns The cache map
   */
  getMap(): Map<string, any> {
    return this.codeTableMap;
  }

  /**
   * Check if a key exists in cache
   * @param id - Cache key
   * @returns True if key exists
   */
  has(id: string): boolean {
    return this.codeTableMap.has(id);
  }

  /**
   * Remove a code table from cache
   * @param id - Cache key
   */
  remove(id: string): boolean {
    return this.codeTableMap.delete(id);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.codeTableMap.clear();
  }

  /**
   * Get cache size
   * @returns Number of cached items
   */
  size(): number {
    return this.codeTableMap.size;
  }
}

/**
 * Singleton instance of CodeTableCache
 */
export const CodeTableCache = new CodeTableCacheManager();
