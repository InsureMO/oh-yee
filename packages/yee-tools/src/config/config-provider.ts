/**
 * Configuration provider for managing application settings
 * Provides a centralized way to manage and access configuration values
 *
 * @module config-provider
 *
 * @example
 * ```typescript
 * import { configer } from '@oh/yee-tools';
 *
 * // Set configuration
 * configer.setConfig({
 *   date: { defaultSubmitFormat: 'YYYY-MM-DD' },
 *   http: { baseUrl: 'https://api.example.com' }
 * });
 *
 * // Get configuration value
 * const baseUrl = configer.get('http.baseUrl');
 * const timeout = configer.get('http.timeout', 5000);
 * ```
 */

/**
 * YeeTools configuration interface
 */
interface YeeToolsConfig {
  /** Date formatting configuration */
  date?: {
    /** Default date format for form submission */
    defaultSubmitFormat?: string;
    /** Default date format for display */
    defaultViewFormat?: string;
    /** Default date picker timeout in milliseconds */
    defaultTimeout?: number;
  };
  /** HTTP request configuration */
  http?: {
    /** Request timeout in milliseconds */
    timeout?: number;
    /** Base URL for API requests */
    baseUrl?: string;
    /** Default request headers */
    headers?: Record<string, string>;
  };
  /** Internationalization configuration */
  i18n?: {
    /** Default locale code */
    defaultLocale?: string;
    /** Storage key for the current locale */
    storageKey?: string;
    /** Configuration groups for i18n */
    configurationGroup?: string[];
  };
  /** Cache configuration */
  cache?: {
    /** Whether to enable local caching */
    enableLocalCache?: boolean;
    /** Specific cache keys to manage */
    cacheKeys?: string[];
  };
  /** Whether to include tenant info in API gateway proxy path */
  UI_API_GATEWAY_PROXY_WITH_TENANT?: boolean;
  /** API gateway proxy path */
  UI_API_GATEWAY_PROXY?: string;
  /** API endpoint for code table list definitions */
  DEFINE_CODETABLE_LIST_API?: string;
  /** API endpoint for code table value object list */
  DEFINE_CODETABLE_VO_LIST_API?: string;
  /** Default code table API endpoint */
  DEFAULT_CODETABLE_API?: string;
  /** Key-value field mapping for code tables */
  DEFAULT_CODETABLE_KEYVALUE?: {
    KEY: string;
    VALUE: string;
  };
  /** Whether to use default project configuration */
  DEFAULT_PROJECT?: boolean;
}

/**
 * Configuration provider for managing application settings
 */
class ConfigProvider {
  private config: YeeToolsConfig = {};
  private initialized = false;

  /**
   * Set global configuration, merging with existing values
   * @param config - Configuration object to merge
   */
  setConfig(config: YeeToolsConfig): void {
    this.config = { ...this.config, ...config };
    this.initialized = true;
  }

  /**
   * Get a configuration value by dot-notation path
   * @param path - Dot-notation path to the configuration value (e.g. 'http.baseUrl')
   * @param defaultValue - Default value to return if the path is not found
   * @returns The configuration value or the default value
   */
  get<T = any>(path: string, defaultValue?: T): T {
    const keys = path.split(".");
    let value: any = this.config;

    for (const key of keys) {
      if (value && typeof value === "object" && key in value) {
        value = value[key];
      } else {
        return defaultValue as T;
      }
    }

    return value ?? defaultValue;
  }
  /**
   * Get all configuration values
   * @returns The complete configuration object
   */
  getAll() {
    return this.config;
  }
  /**
   * Check if the configuration has been initialized
   * @returns true if setConfig has been called, false otherwise
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Reset configuration to initial state (primarily for testing)
   */
  reset(): void {
    this.config = {};
    this.initialized = false;
  }
}

export const configer = new ConfigProvider();

export type { YeeToolsConfig };
