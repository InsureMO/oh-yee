/**
 * YeeTools Fetch - Modern HTTP request library
 *
 * Provides HTTP request functionality based on XMLHttpRequest and Fetch API
 * Supports complete TypeScript type definitions and rich configuration options
 *
 * @example
 * ```typescript
 * import { ax, createAxInstance } from '@rainbow-oh/yee-tools/fetch';
 *
 * // Use default instance
 * const response = await ax.get('/api/users');
 *
 * // Create custom instance
 * const api = createAxInstance({
 *   baseUrl: 'https://api.example.com',
 *   timeout: 5000
 * });
 *
 * const users = await api.get('/users');
 * ```
 *
 * @example Interceptor usage
 * ```typescript
 * import { ax } from '@rainbow-oh/yee-tools/fetch';
 *
 * // Add authentication interceptor
 * ax.interceptors.request.use(({ config }) => {
 *   const token = localStorage.getItem('token');
 *   if (token) {
 *     config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
 *   }
 *   return config;
 * });
 *
 * // Response data processing
 * ax.interceptors.response.use(({ response }) => {
 *   if (response.code === 0) return response.data;
 *   throw new Error(response.message);
 * });
 *
 * // Error handling
 * ax.interceptors.error.use(({ error, type, httpStatus, response }) => {
 *   if (type === 'http' && httpStatus && httpStatus >= 500) {
 *     console.error('Server error:', response);
 *   }
 *   throw error;
 * });
 * ```
 *
 * @packageDocumentation
 */

import Ax from "./core";
import type {
  AxConfig,
  DefaultAxConfig,
  AxInstance,
  HttpMethod,
  ResponseType,
  Dispatcher,
  ErrorResponse,
  ErrorType,
  ProgressEvent,
  // Interceptor-related types
  Interceptors,
  InterceptorId,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
  RequestInterceptorContext,
  ResponseInterceptorContext,
  ErrorInterceptorContext,
} from "./interface";

/**
 * Default Ax instance
 * Can be used directly for HTTP requests
 */
export const ax = new Ax();

/** Merge header records case-insensitively, with later records taking precedence. */
function mergeHeaders(
  ...headerRecords: Array<Record<string, string> | undefined>
): Record<string, string> {
  const mergedHeaders: Record<string, string> = {};
  const headerNames = new Map<string, string>();

  headerRecords.forEach((headers) => {
    Object.entries(headers || {}).forEach(([name, value]) => {
      const normalizedName = name.toLowerCase();
      const existingName = headerNames.get(normalizedName);

      if (existingName !== undefined && existingName !== name) {
        delete mergedHeaders[existingName];
      }

      mergedHeaders[name] = value;
      headerNames.set(normalizedName, name);
    });
  });

  return mergedHeaders;
}

/**
 * Create a new Ax instance
 * @param defaultConfig - Default configuration, applied to all requests
 * @returns New Ax instance
 *
 * @example
 * ```typescript
 * const api = createAxInstance({
 *   baseUrl: 'https://api.example.com',
 *   timeout: 5000,
 *   headers: {
 *     'Authorization': 'Bearer token'
 *   }
 * });
 * ```
 */
export function createAxInstance(defaultConfig?: DefaultAxConfig): Ax {
  const instance = new Ax();

  if (defaultConfig) {
    // Wrap original request method to apply default config
    const originalRequest = instance.request.bind(instance);
    instance.request = function <T = any>(configOrUrl: AxConfig | string): Promise<T> {
      const requestConfig = (
        typeof configOrUrl === "string" ? { url: configOrUrl } : configOrUrl
      ) as AxConfig;
      const config = { ...defaultConfig, ...requestConfig } as AxConfig;

      if (config.noDefaultHeaders) {
        if (requestConfig.headers) {
          config.headers = { ...requestConfig.headers };
        } else {
          delete config.headers;
        }
      } else if (defaultConfig.headers || requestConfig.headers) {
        config.headers = mergeHeaders(
          defaultConfig.headers,
          requestConfig.headers
        );
      }

      return originalRequest<T>(config);
    };
  }

  return instance;
}

/**
 * Convenience GET request function
 * @param url - Request URL
 * @param config - Request configuration
 * @returns Promise<T> Request result
 */
export const get = <T = any>(url: string, config?: DefaultAxConfig): Promise<T> =>
  ax.get<T>(url, config);

/**
 * Convenience POST request function
 * @param url - Request URL
 * @param data - Request data
 * @param config - Request configuration
 * @returns Promise<T> Request result
 */
export const post = <T = any>(
  url: string,
  data?: any,
  config?: DefaultAxConfig,
): Promise<T> => ax.post<T>(url, data, config);

/**
 * Convenience PUT request function
 * @param url - Request URL
 * @param data - Request data
 * @param config - Request configuration
 * @returns Promise<T> Request result
 */
export const put = <T = any>(
  url: string,
  data?: any,
  config?: DefaultAxConfig,
): Promise<T> => ax.put<T>(url, data, config);

/**
 * Convenience DELETE request function
 * @param url - Request URL
 * @param config - Request configuration
 * @returns Promise<T> Request result
 */
export const del = <T = any>(url: string, config?: DefaultAxConfig): Promise<T> =>
  ax.delete<T>(url, config);

/**
 * Convenience PATCH request function
 * @param url - Request URL
 * @param data - Request data
 * @param config - Request configuration
 * @returns Promise<T> Request result
 */
export const patch = <T = any>(
  url: string,
  data?: any,
  config?: DefaultAxConfig,
): Promise<T> => ax.patch<T>(url, data, config);

// Export type definitions
export type {
  AxConfig,
  DefaultAxConfig,
  AxInstance,
  HttpMethod,
  ResponseType,
  Dispatcher,
  ErrorResponse,
  ErrorType,
  ProgressEvent,
  // Interceptor-related types
  Interceptors,
  InterceptorId,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
  RequestInterceptorContext,
  ResponseInterceptorContext,
  ErrorInterceptorContext,
};

// Export core class
export { Ax };

// Default export
export default ax;
