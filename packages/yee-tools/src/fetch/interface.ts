/**
 * HTTP request method types
 */
export type HttpMethod =
  | "GET"
  | "get"
  | "POST"
  | "post"
  | "PUT"
  | "put"
  | "DELETE"
  | "delete"
  | "PATCH"
  | "patch"
  | "HEAD"
  | "head"
  | "OPTIONS"
  | "options";

/**
 * Response types
 */
export type ResponseType =
  | "json"
  | "text"
  | "blob"
  | "arrayBuffer"
  | "formData"
  | "document";

/**
 * Request dispatcher type
 */
export type Dispatcher = "xhr" | "fetch";

/**
 * Progress event handler
 */
export interface ProgressEvent {
  /** Bytes loaded */
  loaded: number;
  /** Total bytes */
  total: number;
  /** Whether progress is computable */
  lengthComputable: boolean;
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  /** Error status */
  status: "error" | "timeout";
  /** Error message */
  error: any;
  /** Trace ID */
  traceId?: string;
  /** Trace info */
  trace?: string;
}

/**
 * Request configuration interface
 */
export interface AxConfig {
  /** Request URL */
  url: string;
  /** Base URL, will be concatenated with url */
  baseUrl?: string;
  /** HTTP request method */
  method?: HttpMethod;
  /** Request data, used for POST/PUT/PATCH */
  data?: any;
  /** URL query parameters, used for GET requests */
  params?: Record<string, any>;
  /** Request headers */
  headers?: Record<string, string>;
  /** Response type */
  responseType?: ResponseType;
  /** Whether to send request asynchronously */
  async?: boolean;
  /** Request timeout (ms) */
  timeout?: number;
  /** Request dispatcher */
  dispatcher?: Dispatcher;
  /** Whether to disable default headers */
  noDefaultHeaders?: boolean;
  /** Whether to disable error notifications */
  noErrorNotice?: boolean;
  /** Whether to format data as JSON */
  dataFormat?: boolean;
  /** Whether FormData includes boundary */
  formDataWithBoundary?: boolean;
  /** Whether to include credentials */
  withCredentials?: boolean;

  // Data transformation functions
  /** Request data transformer */
  transformRequest?: (data: any, headers?: Record<string, string>) => any;
  /** Response data transformer */
  transformResponse?: (data: any) => any;

  // Event handlers
  /** Request success callback */
  onSuccess?: (response: any, xhr?: XMLHttpRequest) => void;
  /** Request success callback (alias) */
  success?: (response: any, xhr?: XMLHttpRequest) => void;
  /** Download progress callback */
  onProgress?: (event: ProgressEvent, xhr?: XMLHttpRequest) => void;
  /** Upload progress callback */
  onUploadProgress?: (event: ProgressEvent, xhr?: XMLHttpRequest) => void;
  /** Request error callback */
  onError?: (response: any, xhr?: XMLHttpRequest) => void;
  /** Request error callback (alias) */
  error?: (response: any, xhr?: XMLHttpRequest) => void;
  /** Request complete callback */
  onLoaded?: (event: Event, xhr?: XMLHttpRequest) => void;
  /** Request timeout callback */
  onTimeout?: (event: Event, xhr?: XMLHttpRequest) => void;
}

/**
 * Default request config (url is optional)
 */
export type DefaultAxConfig = Omit<AxConfig, "url"> & {
  url?: string;
};

/**
 * Request interceptor context
 */
export interface RequestInterceptorContext {
  /** Request config */
  config: AxConfig;
}

/**
 * Response interceptor context
 */
export interface ResponseInterceptorContext {
  /** Request config */
  config: AxConfig;
  /** Response data */
  response: any;
  /** HTTP status code */
  status: number;
  /** Response headers */
  headers?: Record<string, string>;
}

/**
 * Error interceptor context
 */
export interface ErrorInterceptorContext {
  /** Request config */
  config: AxConfig;
  /** Error message */
  error: any;
  /** Whether it is a timeout error */
  isTimeout: boolean;
}

/**
 * Request interceptor function
 * - Returning AxConfig replaces the original config
 * - Returning void/undefined keeps the original config
 * - throw error will abort the request
 */
export type RequestInterceptor = (
  context: RequestInterceptorContext
) => AxConfig | void | Promise<AxConfig | void>;

/**
 * Response interceptor function
 * - Return value becomes the final response
 * - throw error enters error handling
 */
export type ResponseInterceptor = (
  context: ResponseInterceptorContext
) => any | Promise<any>;

/**
 * Error interceptor function
 * - Return value becomes the final response (can implement retry logic)
 * - throw error continues to propagate
 */
export type ErrorInterceptor = (
  context: ErrorInterceptorContext
) => any | Promise<any>;

/**
 * Interceptor ID, used to remove interceptor
 */
export type InterceptorId = number;

/**
 * Interceptor item (internal use)
 * @internal
 */
export interface InterceptorItem<T> {
  id: InterceptorId;
  fn: T;
}

/**
 * Interceptor manager - single type
 */
interface InterceptorManager<T> {
  /** Add interceptor, returns ID for removal */
  use(fn: T): InterceptorId;
  /** Remove interceptor by ID */
  eject(id: InterceptorId): boolean;
  /** Clear all interceptors of this type */
  clear(): void;
  /** Get all interceptors (internal use) */
  getItems(): InterceptorItem<T>[];
}

/**
 * Interceptor collection
 */
export interface Interceptors {
  /** Request interceptor */
  request: InterceptorManager<RequestInterceptor>;
  /** Response interceptor */
  response: InterceptorManager<ResponseInterceptor>;
  /** Error interceptor */
  error: InterceptorManager<ErrorInterceptor>;
  /** Clear all interceptors */
  clearAll(): void;
}

/**
 * Request instance interface
 */
export interface AxInstance {
  /** Interceptor manager */
  interceptors: Interceptors;
  /** GET request */
  get<T = any>(url: string, config?: DefaultAxConfig): Promise<T>;
  /** POST request */
  post<T = any>(url: string, data?: any, config?: DefaultAxConfig): Promise<T>;
  /** PUT request */
  put<T = any>(url: string, data?: any, config?: DefaultAxConfig): Promise<T>;
  /** DELETE request */
  delete<T = any>(url: string, config?: DefaultAxConfig): Promise<T>;
  /** PATCH request */
  patch<T = any>(url: string, data?: any, config?: DefaultAxConfig): Promise<T>;
  /** HEAD request */
  head<T = any>(url: string, config?: DefaultAxConfig): Promise<T>;
  /** OPTIONS request */
  options<T = any>(url: string, config?: DefaultAxConfig): Promise<T>;

  /** Send request (method form) */
  request<T = any>(config: AxConfig | string): Promise<T>;
}
