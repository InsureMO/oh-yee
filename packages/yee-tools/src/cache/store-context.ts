/**
 * Store-level cache using IndexedDB for persistent storage
 * @ohdule store-context
 */

import { configer } from "../config/config-provider";
import { warn } from "../common/logger";

/**
 * IndexedDB configuration
 */
interface DBConfig {
  /** Database name */
  dbName: string;
  /** Database version number */
  dbVersion: number;
  /** Object store name */
  storeName: string;
}

/**
 * Store context storage using IndexedDB
 */
class StoreContextStorage {
  private db: IDBDatabase | null = null;
  private dbConfig: DBConfig = {
    dbName: "RainbowUI",
    dbVersion: 1,
    storeName: "CODE_TABLE",
  };

  /**
   * Initialize IndexedDB connection
   * @returns Promise that resolves to true if initialization succeeds
   */
  private async initDB(): Promise<boolean> {
    if (this.db) {
      return true;
    }

    if (!window.indexedDB) {
      warn("IndexedDB is not supported in this browser");
      return false;
    }

    return new Promise((resolve) => {
      const request = indexedDB.open(
        this.dbConfig.dbName,
        this.dbConfig.dbVersion,
      );

      request.onerror = () => {
        warn("Cannot open IndexedDB:", request.error);
        resolve(false);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.dbConfig.storeName)) {
          db.createObjectStore(this.dbConfig.storeName, {
            keyPath: "key",
            autoIncrement: false,
          });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(true);
      };
    });
  }

  /**
   * Get language key for cache key generation
   * @returns The current language key from session storage
   */
  private getLangKey(): string {
    const config = configer.getAll();
    const defaultI18nKey = config.i18n?.storageKey || "system_i18nKey";

    if (typeof sessionStorage !== "undefined") {
      return sessionStorage.getItem(defaultI18nKey) || "system_i18nKey";
    }

    return "system_i18nKey";
  }

  /**
   * Build cache key with language suffix
   * @param key - The base cache key
   * @returns The cache key with language suffix appended
   */
  private buildKey(key: string): string {
    const lang = this.getLangKey();
    return `${key}_${lang}`;
  }

  /**
   * Stores a value in the store context
   * @param key - The cache key
   * @param value - The value to cache
   * @returns Promise that resolves to true if successful
   * @throws {DOMException} When IndexedDB put operation fails
   * @example
   * ```ts
   * await StoreContext.put('codetable_123', codeTableData);
   * ```
   */
  async put<T>(key: string, value: T): Promise<boolean> {
    const success = await this.initDB();
    if (!success || !this.db) {
      return false;
    }

    const cacheKey = this.buildKey(key);

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        this.dbConfig.storeName,
        "readwrite",
      );
      const store = transaction.objectStore(this.dbConfig.storeName);
      const request = store.put({ key: cacheKey, value });

      request.onsuccess = () => resolve(true);
      request.onerror = () => {
        warn("Failed to store data in IndexedDB:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Retrieves a value from the store context
   * @param key - The cache key
   * @returns Promise that resolves to the cached value or null if not found
   * @throws {DOMException} When IndexedDB get operation fails
   * @example
   * ```ts
   * const data = await StoreContext.get('codetable_123');
   * ```
   */
  async get<T = unknown>(key: string): Promise<T | null> {
    const success = await this.initDB();
    if (!success || !this.db) {
      return null;
    }

    const cacheKey = this.buildKey(key);

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        this.dbConfig.storeName,
        "readonly",
      );
      const store = transaction.objectStore(this.dbConfig.storeName);
      const request = store.get(cacheKey);

      request.onsuccess = () => {
        const result = request.result;
        resolve(result ? result.value : null);
      };

      request.onerror = () => {
        warn("Failed to get data from IndexedDB:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Removes a value from the store context
   * @param key - The cache key to remove
   * @returns Promise that resolves to true if successful
   * @throws {DOMException} When IndexedDB delete operation fails
   * @example
   * ```ts
   * await StoreContext.remove('codetable_123');
   * ```
   */
  async remove(key: string): Promise<boolean> {
    const success = await this.initDB();
    if (!success || !this.db) {
      return false;
    }

    const cacheKey = this.buildKey(key);

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        this.dbConfig.storeName,
        "readwrite",
      );
      const store = transaction.objectStore(this.dbConfig.storeName);
      const request = store.delete(cacheKey);

      request.onsuccess = () => resolve(true);
      request.onerror = () => {
        warn("Failed to remove data from IndexedDB:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Clears all values from the store context
   * @returns Promise that resolves to true if successful
   * @throws {DOMException} When IndexedDB clear operation fails
   * @example
   * ```
   */
  async clear(): Promise<boolean> {
    const success = await this.initDB();
    if (!success || !this.db) {
      return false;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        this.dbConfig.storeName,
        "readwrite",
      );
      const store = transaction.objectStore(this.dbConfig.storeName);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => {
        warn("Failed to clear IndexedDB store:", request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Checks if a key exists in the store context
   * @param key - The cache key to check
   * @returns Promise that resolves to true if the key exists
   * @example
   * ```ts
   * const exists = await StoreContext.has('codetable_123');
   * ```
   */
  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }
}

/**
 * Singleton instance of StoreContext
 */
export const StoreContext = new StoreContextStorage();
