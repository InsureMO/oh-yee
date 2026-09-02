import { quoteBigInts } from './bigint';
import {
  createInterceptors,
  runErrorInterceptors,
  runRequestInterceptors,
  runResponseInterceptors,
} from './interceptor';
import {
  buildHeaders,
  getType,
  merger,
  normalizeRequestHeaders,
  omit,
  parseResponseHeaders,
  serializeRequestData,
} from './utils';

import {
  AxConfig,
  AxInstance,
  DefaultAxConfig,
  ErrorInterceptorContext,
  ErrorResponse,
  ErrorType,
} from './interface';

/** Internal dispatcher result; public request methods still return data only. */
interface AxDispatchResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

type ErrorMetadata = Pick<
  ErrorInterceptorContext,
  'type' | 'httpStatus' | 'statusText' | 'headers' | 'response'
>;

const DISPATCH_FAILURE = Symbol('dispatchFailure');

interface DispatchFailure {
  [DISPATCH_FAILURE]: true;
  publicError: any;
  metadata: ErrorMetadata;
}

function createDispatchFailure(
  publicError: any,
  metadata: ErrorMetadata,
): DispatchFailure {
  return {
    [DISPATCH_FAILURE]: true,
    publicError,
    metadata,
  };
}

function isDispatchFailure(error: unknown): error is DispatchFailure {
  return (
    error !== null && typeof error === 'object' && DISPATCH_FAILURE in error
  );
}

/**
 * Get default request configuration
 * @returns Default configuration object
 */
const getDefaultConfig = (): Partial<AxConfig> => {
  return {
    method: 'GET',
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

function getFetchResponseHeaders(response: Response): Record<string, string> {
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return headers;
}

async function parseFetchErrorResponse(
  response: Response,
  parseBigIntAsString?: boolean,
): Promise<any> {
  const responseText = await response.text();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json') || !responseText) {
    return responseText;
  }

  try {
    return JSON.parse(
      parseBigIntAsString ? quoteBigInts(responseText) : responseText,
    );
  } catch {
    return responseText;
  }
}

/**
 * Notifies the configured error handler without replacing the request failure.
 * @param config - Request configuration
 * @param response - Error response
 * @param xhr - XMLHttpRequest instance when using the XHR dispatcher
 */
function notifyError(
  config: AxConfig,
  response: any,
  xhr?: XMLHttpRequest,
): void {
  const handler = config.onError || config.error;
  if (!handler) {
    return;
  }

  try {
    handler(response, xhr);
  } catch {
    // Error handlers must not prevent the original request from rejecting.
  }
}

function createAbortError(signal?: AbortSignal): Error {
  if (signal?.reason instanceof Error) {
    return signal.reason;
  }

  if (typeof DOMException !== 'undefined') {
    return new DOMException('The operation was aborted', 'AbortError');
  }

  const error = new Error('The operation was aborted');
  error.name = 'AbortError';
  return error;
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
      let dispatchResponse: AxDispatchResponse;
      if (config.dispatcher === 'fetch') {
        dispatchResponse = await this._fetchRequest(config);
      } else {
        dispatchResponse = await this._xhrRequest(config);
      }

      // Execute response interceptors and keep the public return value as data.
      return await runResponseInterceptors(
        this.interceptors.response.getItems(),
        config,
        dispatchResponse.data,
        dispatchResponse.status,
        dispatchResponse.headers,
      );
    } catch (error: any) {
      const failure = isDispatchFailure(error) ? error : undefined;
      const publicError = failure?.publicError ?? error;

      // Execute error interceptors with dispatcher metadata kept separate from
      // the public rejection value.
      const result = await runErrorInterceptors(
        this.interceptors.error.getItems(),
        config,
        publicError,
        publicError?.status === 'timeout',
        failure?.metadata,
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
  private async _fetchRequest(config: AxConfig): Promise<AxDispatchResponse> {
    const { dataFormat = true, data, formDataWithBoundary = true } = config;
    const method = config.method?.toUpperCase() || 'GET';
    const requestHeaders = normalizeRequestHeaders(
      config.headers,
      data,
      formDataWithBoundary,
    );

    const requestInit = omit(config as any, [
      'data',
      'url',
      'baseUrl',
      'params',
      'query',
      'noDefaultHeaders',
      'dispatcher',
      'dataFormat',
      'formDataWithBoundary',
      'parseBigIntAsString',
      'timeout',
      'withCredentials',
    ]) as RequestInit;
    const externalSignal = requestInit.signal;
    const timeout = config.timeout;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let abortSource: 'external' | 'timeout' | undefined;
    let externalAbortListener: (() => void) | undefined;
    let responseReceived = false;

    if (
      typeof timeout === 'number' &&
      Number.isFinite(timeout) &&
      timeout > 0
    ) {
      const controller = new AbortController();
      externalAbortListener = () => {
        if (!abortSource) {
          abortSource = 'external';
          controller.abort(externalSignal?.reason);
        }
      };

      if (externalSignal?.aborted) {
        externalAbortListener();
      } else {
        externalSignal?.addEventListener('abort', externalAbortListener, {
          once: true,
        });
        timeoutId = setTimeout(() => {
          if (!abortSource) {
            abortSource = 'timeout';
            controller.abort();
          }
        }, timeout);
      }

      requestInit.signal = controller.signal;
    }

    try {
      const response = await fetch(buildUrl(config), {
        ...requestInit,
        ...(requestHeaders ? { headers: requestHeaders } : {}),
        credentials: config.withCredentials ? 'include' : 'same-origin',
        method: method,
        body:
          method === 'GET' ? undefined : serializeRequestData(data, dataFormat),
      });
      responseReceived = true;

      const responseHeaders = getFetchResponseHeaders(response);

      if (!response.ok) {
        let errorResponse: any;
        try {
          errorResponse = await parseFetchErrorResponse(
            response,
            config.parseBigIntAsString,
          );
        } catch {
          errorResponse = undefined;
        }

        const httpError = new Error(
          `HTTP ${response.status}: ${response.statusText}`,
        );
        throw createDispatchFailure(httpError, {
          type: 'http',
          httpStatus: response.status,
          statusText: response.statusText,
          headers: responseHeaders,
          response: errorResponse,
        });
      }

      let responseData: any;

      // Lossless big-int parsing: read as text → quoteBigInts → JSON.parse.
      if (config.parseBigIntAsString) {
        responseData = JSON.parse(quoteBigInts(await response.text()));
      } else {
        // Parse data based on response type
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          responseData = await response.json();
        } else if (config.responseType === 'blob') {
          responseData = await response.blob();
        } else if (config.responseType === 'arrayBuffer') {
          responseData = await response.arrayBuffer();
        } else if (config.responseType === 'formData') {
          responseData = await response.formData();
        } else {
          responseData = await response.text();
        }
      }

      return {
        data: responseData,
        status: response.status,
        headers: responseHeaders,
      };
    } catch (error) {
      if (isDispatchFailure(error)) {
        notifyError(config, error.publicError);
        throw error;
      }

      const errorName = error instanceof Error ? error.name : undefined;
      const type: ErrorType =
        abortSource === 'timeout'
          ? 'timeout'
          : abortSource === 'external' ||
              externalSignal?.aborted ||
              errorName === 'AbortError'
            ? 'abort'
            : responseReceived
              ? 'parse'
              : 'network';

      if (abortSource === 'timeout') {
        const timeoutError = {
          status: 'timeout',
          error,
        } as ErrorResponse;
        notifyError(config, timeoutError);
        throw createDispatchFailure(timeoutError, { type });
      }

      notifyError(config, error);
      throw createDispatchFailure(error, { type });
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      if (externalSignal && externalAbortListener) {
        externalSignal.removeEventListener('abort', externalAbortListener);
      }
    }
  }

  /**
   * Send request using XMLHttpRequest
   * @private
   * @param config - Request configuration
   * @returns Promise<any> request result
   */
  private _xhrRequest(config: AxConfig): Promise<AxDispatchResponse> {
    const responseType = config.responseType;
    if (responseType === 'formData') {
      return Promise.reject(
        new TypeError(
          "XHR does not support responseType 'formData'; use the Fetch dispatcher instead.",
        ),
      );
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const {
        headers,
        timeout,
        async = true,
        data,
        onSuccess = config.onSuccess || config.success,
        onProgress,
        onUploadProgress,
        onTimeout,
        onLoaded,
        formDataWithBoundary = true,
        dataFormat = true,
        withCredentials = false,
        signal,
      } = config;

      let settled = false;
      let handleSignalAbort = () => undefined;

      // Unified cleanup function
      const cleanup = () => {
        signal?.removeEventListener('abort', handleSignalAbort);
        xhr.onreadystatechange = null;
        xhr.onerror = null;
        xhr.onabort = null;
        xhr.ontimeout = null;
        xhr.onprogress = null;
        if (xhr.upload) {
          xhr.upload.onprogress = null;
        }
      };

      const resolveOnce = (response: AxDispatchResponse) => {
        if (settled) {
          return;
        }
        settled = true;
        cleanup();
        resolve(response);
      };

      const rejectOnce = (error: unknown) => {
        if (settled) {
          return;
        }
        settled = true;
        cleanup();
        reject(error);
      };

      const rejectAbort = () => {
        const abortError = createAbortError(signal);
        notifyError(config, abortError, xhr);
        rejectOnce(createDispatchFailure(abortError, { type: 'abort' }));
      };

      handleSignalAbort = () => {
        if (!settled) {
          xhr.abort();
          // Some XHR mocks/environments do not dispatch an abort event.
          if (!settled) {
            rejectAbort();
          }
        }
      };

      const requestHeaders = normalizeRequestHeaders(
        headers,
        data,
        formDataWithBoundary,
      );

      const method = config.method?.toUpperCase() || 'GET';
      const fullpath = buildUrl(config);

      xhr.open(method, fullpath, async);
      xhr.withCredentials = withCredentials;

      if (async) {
        if (config.parseBigIntAsString) {
          xhr.responseType = 'text';
        } else if (responseType) {
          xhr.responseType =
            responseType === 'arrayBuffer' ? 'arraybuffer' : responseType;
        }
      }

      if (requestHeaders) {
        buildHeaders(xhr, requestHeaders);
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
        if (
          xhr.readyState === XMLHttpRequest.DONE &&
          xhr.status !== 0 &&
          !settled
        ) {
          const contentType =
            xhr.getResponseHeader('content-type') ||
            'application/json;charset=UTF-8';
          const rawResponse = config.parseBigIntAsString
            ? xhr.responseText
            : xhr.response;
          let response = rawResponse;

          // Parse JSON from its original text so unsafe integers can be quoted
          // before JSON.parse converts them to imprecise JavaScript numbers.
          if (
            contentType.includes('application/json') &&
            typeof rawResponse === 'string'
          ) {
            try {
              response = JSON.parse(
                config.parseBigIntAsString
                  ? quoteBigInts(rawResponse)
                  : rawResponse,
              );
            } catch (error) {
              response = rawResponse;
            }
          }

          const responseHeaders = parseResponseHeaders(
            xhr.getAllResponseHeaders(),
          );

          if (xhr.status >= 200 && xhr.status <= 299) {
            const dispatchResponse = {
              data: response,
              status: xhr.status,
              headers: responseHeaders,
            };
            // Settle and detach the abort listener before invoking user code so
            // a synchronous abort from onSuccess cannot reverse the result.
            resolveOnce(dispatchResponse);
            onSuccess?.(response, xhr);
          } else if (xhr.status === 401) {
            rejectOnce(this._handle401Error());
          } else {
            notifyError(config, response, xhr);
            const publicError = {
              status: 'error',
              error: xhr.response,
            } as ErrorResponse;
            rejectOnce(
              createDispatchFailure(publicError, {
                type: 'http',
                httpStatus: xhr.status,
                statusText: xhr.statusText,
                headers: responseHeaders,
                response,
              }),
            );
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
          onLoaded(event, xhr);
          xhr.onloadend = null;
        };
      }

      // Error listener
      xhr.onerror = function (event) {
        notifyError(config, xhr.response, xhr);
        const publicError = {
          status: 'error',
          error: event,
        } as ErrorResponse;
        rejectOnce(
          createDispatchFailure(publicError, {
            type: 'network',
            response: xhr.response,
          }),
        );
      };

      xhr.onabort = rejectAbort;

      // Timeout listener
      xhr.ontimeout = function (event) {
        onTimeout?.(event, xhr);
        const publicError = {
          status: 'timeout',
          error: onTimeout ? event : 'Request timeout',
        } as ErrorResponse;
        rejectOnce(
          createDispatchFailure(publicError, {
            type: 'timeout',
          }),
        );
      };

      if (signal?.aborted) {
        rejectAbort();
        return;
      }
      signal?.addEventListener('abort', handleSignalAbort, { once: true });

      let param: XMLHttpRequestBodyInit | null;
      try {
        param = serializeRequestData(data, dataFormat);
      } catch (error) {
        notifyError(config, error, xhr);
        rejectOnce(createDispatchFailure(error, { type: 'unknown' }));
        return;
      }

      try {
        xhr.send(param);
      } catch (error) {
        notifyError(config, error, xhr);
        rejectOnce(createDispatchFailure(error, { type: 'network' }));
      }
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
