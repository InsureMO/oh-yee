import type {
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
  InterceptorId,
  InterceptorItem,
  AxConfig,
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
 * @returns The modified response after all interceptors have been applied
 */
export async function runResponseInterceptors(
  interceptors: InterceptorItem<ResponseInterceptor>[],
  config: AxConfig,
  response: any,
  status: number
): Promise<any> {
  let currentResponse = response;

  for (const { fn } of interceptors) {
    currentResponse = await fn({
      config,
      response: currentResponse,
      status,
    });
  }

  return currentResponse;
}

/**
 * Execute the error interceptor chain sequentially
 * @param interceptors - Array of error interceptor items to execute
 * @param config - The request configuration
 * @param error - The error that occurred
 * @param isTimeout - Whether the error was caused by a timeout
 * @returns An object indicating whether the error was handled, with the response or error
 */
export async function runErrorInterceptors(
  interceptors: InterceptorItem<ErrorInterceptor>[],
  config: AxConfig,
  error: any,
  isTimeout: boolean
): Promise<{ handled: boolean; response?: any; error?: any }> {
  let lastError = error;

  for (const { fn } of interceptors) {
    try {
      // If the interceptor returns a value, the error has been handled
      const result = await fn({
        config,
        error: lastError,
        isTimeout,
      });
      return { handled: true, response: result };
    } catch (err) {
      lastError = err;
    }
  }

  return { handled: false, error: lastError };
}
