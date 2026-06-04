/**
 * I18n (Internationalization) utility functions
 *
 * Provides internationalization utility functions including language acquisition, data caching, message formatting, etc.
 * Supports multiple backend API formats and caching strategies
 *
 * @example
 * ```typescript
 * import { I18nUtils } from '@oh/yee-tools/i18n';
 *
 * // Get user language
 * const lang = I18nUtils.getUserLang('/api/user/lang');
 *
 * // Get internationalization data
 * const i18nData = I18nUtils.getI18nData('en_US', '/api/i18n');
 *
 * // Format message
 * const message = I18nUtils.format('Hello {0}, welcome to {1}!', 'John', 'MooTools');
 * ```
 *
 * @packageDocumentation
 */

import { configer } from "../config/config-provider";
import { SessionContext } from "../cache/session-context";
import { LocalContext } from "../cache/local-context";
import { PageContext } from "../cache/page-context";
import { ax } from "../fetch";
import { updateUrlParams } from "../url/url-utils";
import { parseBool } from "../type/type-utils";
import { warn } from "../common/logger";

/**
 * Project configuration interface
 */
interface ProjectConfig {
  UI_X_MO_HEADER_ENABLE?: string | boolean;
  UI_API_GATEWAY_PROXY_WITH_TENANT?: string | boolean;
  UI_KEYS_WHITELIST_ENABLED?: string | boolean;
  UI_API_PLATFORM_PATHS?: string;
  UI_CAS?: string;
  UI_CAS_SERVICE_URL?: string;
}

/**
 * User information interface
 */
interface UserInfo {
  firmCode?: string;
  [key: string]: any;
}

/**
 * I18n data interface
 */
interface I18nData {
  [key: string]: any;
  $state?: string;
}

/**
 * DiMo i18n request data interface
 */
interface DiMoI18nRequest {
  categories: string[];
  language: string;
  tenantCode: string;
}

/**
 * Global counter for preventing duplicate requests
 */
let requestCount = 0;

/**
 * Helper function to get configuration values
 * @param key - Configuration key
 * @param defaultValue - Default value
 * @returns Configuration value
 */
function getConfigValue<T>(key: string, defaultValue?: T): T {
  return configer.get(key, defaultValue);
}

/**
 * Check whether MO headers are used
 * @param projectConfig - Project configuration
 * @returns Whether to use MO headers
 */
function isMoHeaderEnabled(projectConfig: ProjectConfig): boolean {
  return parseBool(projectConfig.UI_X_MO_HEADER_ENABLE);
}

/**
 * Handle logout logic
 * @param config - Project configuration
 */
function handleLogout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.clear();
  }
}

/**
 * Show error notification
 * @param message - Error message
 */
function showError(message: string): void {
  throw new Error(message);
}

/**
 * Build project path key
 * @returns Project path key
 */
function buildProjectPathKey(): string {
  // if (
  //   typeof window !== "undefined" &&
  //   (window as any).buildKey &&
  //   (window as any).currentUrl
  // ) {
  //   return (window as any).buildKey((window as any).currentUrl);
  // }
  // Fallback to simple processing of current URL
  if (typeof window !== "undefined" && window.location) {
    return btoa(window.location.pathname + window.location.search).replace(
      /[^a-zA-Z0-9]/g,
      "",
    );
  }
  return "default";
}

/**
 * I18n utility class
 */
export class I18nUtils {
  /**
   * Get user language setting
   *
   * @param langUrl - API URL for getting language
   * @param isLogin - Whether in login state
   * @returns User language code
   *
   * @example
   * ```typescript
   * const lang = I18nUtils.getUserLang('/api/user/language');
   * console.log(lang); // 'en_US'
   * ```
   */
  static async getUserLang(langUrl: string, isLogin?: boolean): Promise<string | null> {
    const i18nStorageKey = getConfigValue<string>(
      "i18n.storageKey",
    );
    const projectKey = getConfigValue<string>("storageKeys.projectConfig") || "project_config";
    const authKey = getConfigValue<string>("storageKeys.authorization") || "Authorization";

    let lang = sessionStorage.getItem(i18nStorageKey);
    const projectConfig: ProjectConfig = JSON.parse(
      sessionStorage.getItem(projectKey) || "{}",
    );

    if (!lang || isLogin) {
      const authorization = sessionStorage.getItem(authKey);

      if (!authorization) {
        lang = this.getSystemI18N();
      } else {
        try {
          // Use async request to get user language
          const data = await ax.request({
            method: "GET",
            url: langUrl,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
            withCredentials: false,
          });

          // Process environment and tenant information
          const isMoHeader = isMoHeaderEnabled(projectConfig);
          if (isMoHeader) {
            // Note: Async requests cannot get response headers via callback
            // If you need to handle response headers, please process manually after the call
          }

          if (data && i18nStorageKey) {
            sessionStorage.setItem(i18nStorageKey, data as string);
            return data as string;
          }
        } catch (error) {
          warn("Failed to get user language:", error);
          lang = this.getSystemI18N();
          return lang;
        }
      }
    }

    return lang;
  }

  /**
   * Get internationalization data
   *
   * @param lang - Language code
   * @param i18nUrl - Internationalization data API URL
   * @returns Internationalization data object
   *
   * @example
   * ```typescript
   * const i18nData = I18nUtils.getI18nData('en_US', '/api/i18n');
   * console.log(i18nData.welcome); // 'Welcome'
   * ```
   */
  static async getI18nData(lang: string, i18nUrl: string): Promise<I18nData> {
    const projectKey = configer.get("storageKeys.projectConfig") || "project_config";
    const config: ProjectConfig = JSON.parse(
      sessionStorage.getItem(projectKey) || "{}",
    );
    let i18nCacheData: I18nData | null = null;
    const projectPathKey = buildProjectPathKey();
    const cacheKey = `i18n_Cache_${lang}_${projectPathKey}`;

    // Check cache
    const enableCache = getConfigValue("i18n.cache");
    if (enableCache) {
      i18nCacheData =
        LocalContext.get<I18nData>(cacheKey) ||
        PageContext.get<I18nData>(cacheKey) ||
        null;
    }

    if (i18nCacheData) {
      return i18nCacheData;
    }

    // Get configuration group
    let group: string[] = getConfigValue(
      "i18n.configurationGroup",
    );
    if (!Array.isArray(group)) {
      group = [group as string];
    }

    // Process API gateway proxy configuration
    if (
      parseBool(config.UI_API_GATEWAY_PROXY_WITH_TENANT) &&
      parseBool(config.UI_KEYS_WHITELIST_ENABLED) &&
      !config.UI_API_PLATFORM_PATHS
    ) {
      config.UI_API_PLATFORM_PATHS = "i18n";
      SessionContext.put(projectKey, config);
    }

    // Prevent duplicate requests
    if (requestCount > 0) {
      return { $state: "i18n_api_error" };
    }

    try {
      const url = updateUrlParams(i18nUrl, {
        languageId: lang,
      });

      const data = await ax.request({
        method: "POST",
        url,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: group,
        withCredentials: false,
      });
      if (enableCache) {
        LocalContext.put(cacheKey, data);
        PageContext.put(cacheKey, data);
      }
      requestCount = 0;
      return data;
    } catch (error) {
      warn("Failed to get i18n data:", error);
      requestCount++;
      return {};
    }
  }

  /**
   * Get internationalization data in DiMo format
   *
   * @param lang - Language code
   * @param i18nUrl - DiMo internationalization API URL
   * @returns Internationalization data object
   *
   * @example
   * ```typescript
   * const i18nData = await I18nUtils.getDiMoI18nData('en_US', '/api/dimo/i18n');
   * ```
   */
  static async getDiMoI18nData(lang: string, i18nUrl: string): Promise<I18nData> {
    let i18nCacheData: I18nData | null = null;
    const projectPathKey = buildProjectPathKey();
    const cacheKey = `i18n_Cache_${lang}_${projectPathKey}`;

    // Check cache
    const enableCache = getConfigValue(
      "i18n.cache"
    );
    if (enableCache) {
      i18nCacheData = LocalContext.get<I18nData>(cacheKey);
    }

    if (i18nCacheData) {
      return i18nCacheData;
    }

    // Get configuration group
    let group: string[] = getConfigValue(
      "i18n.configurationGroup"
    );
    if (!Array.isArray(group)) {
      group = [group as string];
    }

    // Get user information
    const userInfo: UserInfo | null = SessionContext.get<UserInfo>("userInfo");
    const tenantCode: string = userInfo?.firmCode || "";

    const postData: DiMoI18nRequest = {
      categories: group,
      language: lang.split("_")[0] || "en",
      tenantCode,
    };

    try {
      const data = await ax.request({
        method: "POST",
        url: i18nUrl,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: postData,
        withCredentials: false,
      });

      if (enableCache && data) {
        LocalContext.put(cacheKey, data as I18nData);
      }
      return data as I18nData;
    } catch (error) {
      warn("Failed to get DiMo i18n data:", error);
      return {};
    }
  }

  /**
   * Get system default language
   *
   * @returns System language code
   *
   * @example
   * ```typescript
   * const systemLang = I18nUtils.getSystemI18N();
   * console.log(systemLang); // 'en_US'
   * ```
   */
  static getSystemI18N(): string {
    const storageKey = getConfigValue(
      "i18n.storageKey"
    );

    let systemI18N = typeof storageKey === "string" ?
      (sessionStorage.getItem(storageKey) || localStorage.getItem(storageKey)) : null;

    if (systemI18N) {
      return systemI18N;
    }

    const defaultLang = getConfigValue(
      "i18n.defaultLocale",
      "en_US"
    );
    this.setSystemI18N(defaultLang);
    return defaultLang;
  }

  /**
   * Set system language
   *
   * @param value - Language code
   *
   * @example
   * ```typescript
   * I18nUtils.setSystemI18N('zh_CN');
   * ```
   */
  static setSystemI18N(value: string): void {
    const storageKey = getConfigValue(
      "i18n.storageKey"
    );
    typeof storageKey === "string" && sessionStorage.setItem(storageKey, value);
  }

  /**
   * Format message with placeholder replacement
   *
   * @param message - Message template with placeholders
   * @param args - Replacement parameters
   * @returns Formatted message
   *
   * @example
   * ```typescript
   * const message = I18nUtils.format('Hello {0}, you have {1} messages', 'John', 5);
   * console.log(message); // 'Hello John, you have 5 messages'
   * ```
   */
  static format(message: string, ...args: any[]): string {
    if (!message) {
      return this.getMessage(message);
    }

    let result = message;
    args.forEach((arg, index) => {
      const placeholder = `{${index}}`;
      result = result.replace(
        new RegExp(placeholder.replace(/[{}]/g, "\\$&"), "g"),
        String(arg),
      );
    });

    return result;
  }

  /**
   * Format object message, returns array containing text and objects
   *
   * @param message - Message template with placeholders
   * @param args - Replacement parameters (can be objects)
   * @returns Array containing text fragments and objects
   *
   * @example
   * ```typescript
   * const button = { type: 'button', text: 'Click me' };
   * const elements = I18nUtils.formatObject('Click {0} to continue', button);
   * // ['Click ', button, ' to continue']
   * ```
   */
  static formatObject(message: string, ...args: any[]): any[] {
    if (!message) {
      return [this.getMessage(message)];
    }

    const elementArray: any[] = [];
    let remainingMessage = message;

    args.forEach((element, index) => {
      const placeholder = `{${index}}`;
      const parts = remainingMessage.split(placeholder);

      if (parts.length === 2) {
        elementArray.push(parts[0]);
        elementArray.push(element);
        remainingMessage = parts[1] || "";
      }
    });

    elementArray.push(remainingMessage);
    return elementArray;
  }

  /**
   * Get internationalization message, handles null values
   *
   * @param message - Message content
   * @returns Processed message
   *
   * @example
   * ```typescript
   * const msg = I18nUtils.getMessage(null);
   * console.log(msg); // 'MSG Not Found'
   * ```
   */
  static getMessage(message: string | null | undefined): string {
    if (message == null || message == undefined) {
      return "MSG Not Found";
    }
    return message;
  }
}

export const I18nUtil = I18nUtils;

export type { ProjectConfig, UserInfo, I18nData, DiMoI18nRequest };
