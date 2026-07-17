import * as Util from '../type/type-utils';
import { quoteBigInts } from './bigint';
import {
  createInterceptors,
  runErrorInterceptors,
  runRequestInterceptors,
  runResponseInterceptors,
} from './interceptor';
import { buildHeaders, getType, merger, omit } from './utils';

import {
  AxConfig,
  AxInstance,
  DefaultAxConfig,
  ErrorResponse,
} from './interface';

/**
 * Get default request configuration
 * @returns Default configuration object
 */
const getDefaultConfig = (): Partial<AxConfig> => {
  return {
    method: 'GET',
    responseType: 'json',
    withCredentials: false,
  };
};

/**
 * Build complete request URL
 * @param config - Request configuration
 * @returns Complete URL string
 */
function buildUrl(config: AxConfig): string {
  const { url, baseUrl, params } = config;
  let fullpath = baseUrl && !url.startsWith('http') ? baseUrl + url : url;

  if (getType(params) === 'Object' && params && Object.keys(params).length) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      fullpath += (fullpath.includes('?') ? '&' : '?') + queryString;
    }
  }

  return fullpath;
}

/**
 * Process error messages for display
 * @param config - Request configuration
 * @param response - Error response
 */
function postErrorMsg(config: AxConfig, response: any): void {
  if (config.onError) {
    config.onError(response, undefined);
  }
}

/**
 * Ax - Modern HTTP request library
 * Supports both XMLHttpRequest and Fetch API
 * Provides complete TypeScript type support and rich configuration options
 */
class Ax implements AxInstance {
  /** Interceptor manager */
  readonly interceptors;

  /**
   * Create Ax instance
   */
  constructor() {
    this.interceptors = createInterceptors();
    // Bind methods to instance
    this.request = this.request.bind(this);
  }

  /**
   * Send HTTP request
   * @param configOrUrl - Request configuration object or URL string
   * @returns Promise<T> request result
   * @throws {Error} When interceptors or the request itself fail
   */
  async request<T = any>(configOrUrl: AxConfig | string): Promise<T> {
    let config = getDefaultConfig() as AxConfig;

    // Process parameters: string URL or configuration object
    if (typeof configOrUrl === 'string') {
      config.url = configOrUrl;
    } else {
      if (configOrUrl.noDefaultHeaders) {
        delete config.headers;
      }
      config = merger(config, configOrUrl) as AxConfig;
    }

    try {
      // Execute request interceptors
      config = await runRequestInterceptors(
        this.interceptors.request.getItems(),
        config,
      );

      // Send actual request
      let response: any;
      if (config.dispatcher === 'fetch') {
        response = await this._fetchRequest(config);
      } else {
        response = await this._xhrRequest(config);
      }

      // Execute response interceptors
      response = await runResponseInterceptors(
        this.interceptors.response.getItems(),
        config,
        response,
        200,
      );

      return response;
    } catch (error: any) {
      // Execute error interceptors
      const result = await runErrorInterceptors(
        this.interceptors.error.getItems(),
        config,
        error,
        error?.status === 'timeout',
      );

      if (result.handled) {
        return result.response;
      }
      throw result.error;
    }
  }

  /**
   * Send request using Fetch API
   * @private
   * @param config - Request configuration
   * @returns Promise<any> request result
   */
  private async _fetchRequest(config: AxConfig): Promise<any> {
    const { dataFormat = true, data } = config;
    const method = config.method?.toUpperCase() || 'GET';

    try {
      const response = await fetch(buildUrl(config), {
        ...(omit(config as any, [
          'data',
          'url',
          'baseUrl',
          'params',
          'query',
          'noDefaultHeaders',
          'dispatcher',
          'dataFormat',
          'parseBigIntAsString',
        ]) as RequestInit),
        method: method,
        body:
          method === 'GET'
            ? undefined
            : !Util.isString(data) && dataFormat
              ? JSON.stringify(data)
              : data,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Lossless big-int parsing: read as text → quoteBigInts → JSON.parse (avoids response.json() precision loss).
      if (config.parseBigIntAsString) {
        return JSON.parse(quoteBigInts(await response.text()));
      }

      // Parse data based on response type
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        return await response.json();
      } else if (config.responseType === 'blob') {
        return await response.blob();
      } else if (config.responseType === 'arrayBuffer') {
        return await response.arrayBuffer();
      } else if (config.responseType === 'formData') {
        return await response.formData();
      } else {
        return await response.text();
      }
    } catch (error) {
      postErrorMsg(config, error);
      throw error;
    }
  }

  /**
   * Send request using XMLHttpRequest
   * @private
   * @param config - Request configuration
   * @returns Promise<any> request result
   */
  private _xhrRequest(config: AxConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const {
        headers,
        timeout,
        async = true,
        data,
        onSuccess = config.onSuccess || config.success,
        onError = config.onError || config.error,
        onProgress,
        onUploadProgress,
        onTimeout,
        onLoaded,
        formDataWithBoundary = true,
        dataFormat = true,
      } = config;

      // Unified cleanup function
      const cleanup = () => {
        xhr.onreadystatechange = null;
        xhr.onerror = null;
        xhr.ontimeout = null;
        xhr.onprogress = null;
        if (xhr.upload) {
          xhr.upload.onprogress = null;
        }
      };

      // Handle FormData Content-Type
      if ((!data || getType(data) === 'FormData') && headers) {
        if (formDataWithBoundary) {
          delete headers['Content-Type'];
        }
      }

      const method = config.method?.toUpperCase() || 'GET';
      const fullpath = buildUrl(config);

      xhr.open(method, fullpath, async);

      if (headers) {
        buildHeaders(xhr, headers, config);
      }

      if (timeout) {
        xhr.timeout = timeout;
      }

      // Upload progress listener
      if (xhr.upload && onUploadProgress) {
        xhr.upload.onprogress = function (event) {
          onUploadProgress(event as any, xhr);
        };
      }

      // State change listener
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          cleanup(); // Clean up event listeners

          const contentType =
            xhr.getResponseHeader('content-type') ||
            'application/json;charset=UTF-8';
          let response = xhr.response;

          // Try to parse JSON response
          if (contentType.indexOf('application/json') > -1) {
            try {
              // Lossless big-int parsing: quote large integers first, then JSON.parse.
              response = config.parseBigIntAsString
                ? JSON.parse(quoteBigInts(xhr.response))
                : JSON.parse(xhr.response);
            } catch (error) {
              response = xhr.response;
            }
          }

          if (xhr.status >= 200 && xhr.status <= 299) {
            if (onSuccess) {
              onSuccess(response, xhr);
            }
            resolve(response);
          } else if (xhr.status === 401) {
            const errorResult = this._handle401Error();
            reject(errorResult);
          } else {
            if (onError) {
              onError(response, xhr);
            }
            postErrorMsg(config, response);
            reject({ status: 'error', error: xhr.response } as ErrorResponse);
          }
        }
      };

      // Download progress listener
      if (onProgress) {
        xhr.onprogress = function (event) {
          onProgress(event as any, xhr);
        };
      }

      // Request complete listener
      if (onLoaded) {
        xhr.onloadend = function (event) {
          cleanup(); // Ensure cleanup
          onLoaded(event, xhr);
        };
      }

      // Error listener
      xhr.onerror = function (err) {
        cleanup(); // Clean up event listeners
        if (onError) {
          onError(xhr.response, xhr);
        }
        reject({ status: 'error', error: err } as ErrorResponse);
      };

      // Timeout listener
      if (onTimeout) {
        xhr.ontimeout = function (event) {
          cleanup(); // Clean up event listeners
          onTimeout(event, xhr);
          reject({ status: 'timeout', error: event } as ErrorResponse);
        };
      } else {
        // If onTimeout is not provided, use default timeout handling
        xhr.ontimeout = function () {
          // eslint-disable-line @typescript-eslint/no-unused-vars
          cleanup();
          reject({
            status: 'timeout',
            error: 'Request timeout',
          } as ErrorResponse);
        };
      }

      // Prepare request data
      let param = data || null;
      if (param != null && !Util.isString(param) && dataFormat) {
        // eslint-disable-line eqeqeq
        param = JSON.stringify(param);
      }

      xhr.send(param);
    });
  }

  /**
   * Handle 401 unauthorized error
   * @private
   */
  private _handle401Error(): { status: string; error: string } {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
      window.location.reload();
    }
    return { status: 'error', error: 'Unauthorized' };
  }

  /**
   * GET request
   * @param url - Request URL
   * @param config - Request configuration
   * @returns Promise<T> request result
   */
  get<T = any>(url: string, config?: DefaultAxConfig): Promise<T> {
    return this.request<T>(
      merger(config || {}, {
        url,
        method: 'GET',
      }) as AxConfig,
    );
  }

  /**
   * POST request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Request configuration
   * @returns Promise<T> request result
   */
  post<T = any>(url: string, data?: any, config?: DefaultAxConfig): Promise<T> {
    return this.request<T>(
      merger(config || {}, {
        url,
        data,
        method: 'POST',
      }) as AxConfig,
    );
  }

  /**
   * PUT request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Request configuration
   * @returns Promise<T> request result
   */
  put<T = any>(url: string, data?: any, config?: DefaultAxConfig): Promise<T> {
    return this.request<T>(
      merger(config || {}, {
        url,
        data,
        method: 'PUT',
      }) as AxConfig,
    );
  }

  /**
   * DELETE request
   * @param url - Request URL
   * @param config - Request configuration
   * @returns Promise<T> request result
   */
  delete<T = any>(url: string, config?: DefaultAxConfig): Promise<T> {
    return this.request<T>(
      merger(config || {}, {
        url,
        method: 'DELETE',
      }) as AxConfig,
    );
  }

  /**
   * PATCH request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Request configuration
   * @returns Promise<T> request result
   */
  patch<T = any>(
    url: string,
    data?: any,
    config?: DefaultAxConfig,
  ): Promise<T> {
    return this.request<T>(
      merger(config || {}, {
        url,
        data,
        method: 'PATCH',
      }) as AxConfig,
    );
  }

  /**
   * HEAD request
   * @param url - Request URL
   * @param config - Request configuration
   * @returns Promise<T> request result
   */
  head<T = any>(url: string, config?: DefaultAxConfig): Promise<T> {
    return this.request<T>(
      merger(config || {}, {
        url,
        method: 'HEAD',
      }) as AxConfig,
    );
  }

  /**
   * OPTIONS request
   * @param url - Request URL
   * @param config - Request configuration
   * @returns Promise<T> request result
   */
  options<T = any>(url: string, config?: DefaultAxConfig): Promise<T> {
    return this.request<T>(
      merger(config || {}, {
        url,
        method: 'OPTIONS',
      }) as AxConfig,
    );
  }
}

export default Ax;
