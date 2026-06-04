/**
 * IndexedDB service for CodeTable storage
 * @ohdule indexed-db-service
 */

import { CodeTableConstant } from "../constant/code-table-constant";

/**
 * Code table object stored in IndexedDB
 */
interface CodeTableObject {
  /** Code table name */
  name: string;
  /** Product identifier */
  productId: string;
  /** Additional properties */
  [key: string]: any;
}

/**
 * IndexedDB service for managing CodeTable data persistence
 */
export class IndexedDBService {
  private db: IDBDatabase | null = null;
  private transaction?: IDBTransaction | null = null;

  /**
   * Initialize the IndexedDB database
   * @returns Promise that resolves to true if successful, false otherwise
   */
  async initDatabase(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!indexedDB) {
        resolve(false);
        return;
      }

      if (this.db) {
        resolve(true);
        return;
      }

      const request = indexedDB.open(
        CodeTableConstant.DB_NAME,
        CodeTableConstant.DB_VERSION,
      );

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        if (
          !this.db.objectStoreNames.contains(CodeTableConstant.DB_STORE_NAME)
        ) {
          this.db.createObjectStore(CodeTableConstant.DB_STORE_NAME);
        }
        this.transaction = (event.target as IDBOpenDBRequest).transaction;
        resolve(true);
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(true);
      };

      request.onerror = () => {
        this.db = null;
        resolve(false);
      };
    });
  }

  /**
   * Store data in IndexedDB
   * @param codeTableObj - The code table object to store
   * @returns Promise that resolves to true if successful
   * @throws {Error} When IndexedDB initialization fails
   * @throws {Event} When the IndexedDB put or transaction operation fails
   */
  async putData(codeTableObj: CodeTableObject): Promise<boolean> {
    if (!this.db) {
      const initialized = await this.initDatabase();
      if (!initialized) {
        throw new Error("Failed to initialize IndexedDB");
      }
    }

    return new Promise((resolve, reject) => {
      const transaction =
        this.transaction ||
        this.db!.transaction(
          CodeTableConstant.DB_STORE_NAME,
          CodeTableConstant.TRANSACTION_OPTION_READWRITE,
        );
      const store = transaction.objectStore(CodeTableConstant.DB_STORE_NAME);
      const key = `${codeTableObj.name}-${codeTableObj.productId}`;
      const request = store.put(codeTableObj, key);

      let result = false;

      request.onsuccess = () => {
        result = true;
      };

      request.onerror = (event) => {
        reject(event);
      };

      transaction.oncomplete = () => {
        this.transaction = null;
        resolve(result);
      };

      transaction.onerror = (event) => {
        this.transaction = null;
        reject(event);
      };
    });
  }

  /**
   * Delete data from IndexedDB
   * @param codeTableObj - The code table object to delete
   * @returns Promise that resolves to true if successful
   * @throws {Error} When IndexedDB initialization fails
   * @throws {Event} When the IndexedDB delete or transaction operation fails
   */
  async deleteData(codeTableObj: CodeTableObject): Promise<boolean> {
    if (!this.db) {
      const initialized = await this.initDatabase();
      if (!initialized) {
        throw new Error("Failed to initialize IndexedDB");
      }
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(
        CodeTableConstant.DB_STORE_NAME,
        CodeTableConstant.TRANSACTION_OPTION_READWRITE,
      );
      const store = transaction.objectStore(CodeTableConstant.DB_STORE_NAME);
      const key = `${codeTableObj.name}-${codeTableObj.productId}`;
      const request = store.delete(key);

      let result = false;

      request.onsuccess = () => {
        result = true;
      };

      request.onerror = (event) => {
        reject(event);
      };

      transaction.oncomplete = () => {
        resolve(result);
      };

      transaction.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * Load data from IndexedDB
   * @param codeTableObj - The code table object to load
   * @returns Promise that resolves to the stored data or undefined if not found
   * @throws {Error} When IndexedDB initialization fails
   * @throws {Event} When the IndexedDB get or transaction operation fails
   */
  async loadData(
    codeTableObj: CodeTableObject,
  ): Promise<CodeTableObject | undefined> {
    if (!this.db) {
      const initialized = await this.initDatabase();
      if (!initialized) {
        throw new Error("Failed to initialize IndexedDB");
      }
    }

    return new Promise((resolve, reject) => {
      const transaction =
        this.transaction ||
        this.db!.transaction(
          CodeTableConstant.DB_STORE_NAME,
          CodeTableConstant.TRANSACTION_OPTION_READWRITE,
        );
      const store = transaction.objectStore(CodeTableConstant.DB_STORE_NAME);
      const key = `${codeTableObj.name}-${codeTableObj.productId}`;
      const request = store.get(key);

      let result: CodeTableObject | undefined;

      request.onsuccess = () => {
        result = request.result;
      };

      request.onerror = (event) => {
        reject(event);
      };

      transaction.oncomplete = () => {
        this.transaction = null;
        resolve(result);
      };

      transaction.onerror = (event) => {
        this.transaction = null;
        reject(event);
      };
    });
  }
}

export default IndexedDBService;
