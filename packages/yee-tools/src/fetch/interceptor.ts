import type {
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
  InterceptorId,
  InterceptorItem,
  AxConfig,
  ErrorResponse,
  ErrorType,
  Interceptors,
} from "./interface";

let idCounter = 0;

function createInterceptorManager<T>() {
  const interceptors: InterceptorItem<T>[] = [];

  return {
    getItems: () => interceptors,
    use: (fn: T): InterceptorId => {
      const id = ++idCounter;
      interceptors.push({ id, fn });
      return id;
    },
    eject: (id: InterceptorId): boolean => {
      const index = interceptors.findIndex((item) => item.id === id);
      if (index > -1) {
        interceptors.splice(index, 1);
        return true;
      }
      return false;
    },
    clear: () => {
      interceptors.length = 0;
    },
  };
}

/**
 * Create interceptor managers for request, response, and error handling
 * @returns An object containing request, response, and error interceptor managers
 */
export function createInterceptors(): Interceptors {
  const request = createInterceptorManager<RequestInterceptor>();
  const response = createInterceptorManager<ResponseInterceptor>();
  const error = createInterceptorManager<ErrorInterceptor>();

  return {
    request,
    response,
    error,
    clearAll: () => {
      request.clear();
      response.clear();
      error.clear();
    },
  };
}

/**
 * Execute the request interceptor chain sequentially
 * @param interceptors - Array of request interceptor items to execute
 * @param config - The initial request configuration
 * @returns The modified request configuration after all interceptors have been applied
 */
export async function runRequestInterceptors(
  interceptors: InterceptorItem<RequestInterceptor>[],
  config: AxConfig
): Promise<AxConfig> {
  let currentConfig = config;

  for (const { fn } of interceptors) {
    const result = await fn({ config: currentConfig });
    if (result) {
      currentConfig = result;
    }
  }

  return currentConfig;
}

/**
 * Execute the response interceptor chain sequentially
 * @param interceptors - Array of response interceptor items to execute
 * @param config - The request configuration
 * @param response - The response data to process
 * @param status - The HTTP status code
 * @param headers - The response headers
 * @returns The modified response after all interceptors have been applied
 */
export async function runResponseInterceptors(
  interceptors: InterceptorItem<ResponseInterceptor>[],
  config: AxConfig,
  response: any,
  status: number,
  headers: Record<string, string> = {}
): Promise<any> {
  let currentResponse = response;

  for (const { fn } of interceptors) {
    currentResponse = await fn({
      config,
      response: currentResponse,
      status,
      headers,
    });
  }

  return currentResponse;
}

/**
 * Copy the optional error metadata fields that are present on the error.
 * @param error - The error value thrown or rejected by a dispatcher
 * @returns An object with whichever metadata fields the error carries
 */
function pickErrorMetadata(error: unknown): {
  httpStatus?: number;
  statusText?: string;
  headers?: Record<string, string>;
  response?: any;
} {
  const source =
    error !== null && typeof error === "object"
      ? (error as Partial<ErrorResponse>)
      : undefined;

  return {
    ...(source?.httpStatus !== undefined
      ? { httpStatus: source.httpStatus }
      : {}),
    ...(source?.statusText !== undefined
      ? { statusText: source.statusText }
      : {}),
    ...(source?.headers !== undefined ? { headers: source.headers } : {}),
    ...(source?.response !== undefined ? { response: source.response } : {}),
  };
}

export interface ErrorInterceptorMetadata {
  type?: ErrorType;
  httpStatus?: number;
  statusText?: string;
  headers?: Record<string, string>;
  response?: any;
}

/**
 * Execute the error interceptor chain sequentially
 * @param interceptors - Array of error interceptor items to execute
 * @param config - The request configuration
 * @param error - The error that occurred
 * @param isTimeout - Whether the error was caused by a timeout
 * @param metadata - Dispatcher metadata that should not alter the public error
 * @returns An object indicating whether the error was handled, with the response or error
 */
export async function runErrorInterceptors(
  interceptors: InterceptorItem<ErrorInterceptor>[],
  config: AxConfig,
  error: any,
  isTimeout: boolean,
  metadata: ErrorInterceptorMetadata = {},
): Promise<{ handled: boolean; response?: any; error?: any }> {
  let lastError = error;

  for (const { fn } of interceptors) {
    try {
      const errorResponse =
        lastError && typeof lastError === "object"
          ? (lastError as Partial<ErrorResponse>)
          : undefined;

      // If the interceptor returns a value, the error has been handled
      const result = await fn({
        config,
        error: lastError,
        type:
          metadata.type ??
          errorResponse?.type ??
          ((isTimeout ? "timeout" : "unknown") as ErrorType),
        ...pickErrorMetadata(lastError),
        ...metadata,
        isTimeout,
      });
      return { handled: true, response: result };
    } catch (err) {
      lastError = err;
    }
  }

  return { handled: false, error: lastError };
}
