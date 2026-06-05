export type AxConfig = {
  /**
   * Request URL
   */
  url: string;
  /**
   * Common request URL prefix
   */
  baseUrl?: string;
  /**
   * Request method
   */
  method?:
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'patch'
    | 'PATCH';
  /**
   * Request data payload
   */
  data?: any; // post | put patch
  /**
   * GET request parameters
   */
  params?: Record<string, any>; // get
  /**
   * Request headers
   */
  headers?: Record<string, any>;

  responseType?: string; //
  /**
   * Whether to send async request
   */
  async?: boolean;
  /**
   * Request timeout
   */
  timeout?: number;
  /**
   * Request dispatcher: xhr or fetch
   * @default xhr
   */
  dispatcher?: 'xhr' | 'fetch';
  /**
   * Whether to skip default request headers
   */
  noDefaultHeaders?: boolean; // No default headers
  /**
   * Transform request
   */
  transformRequest?: (data: any, headers?: Record<string, any>) => AxConfig;
  /**
   * Transform response
   * */
  transformResponse?: (data: any) => any;
  /**
   * Callback on request success
   */
  onSuccess?: (response: any, xhr: any) => void;
  /**
   * Callback during request
   */
  onProgress?: (event: any, xhr: any) => void;
  onUploadProgress?: (event: any, xhr: any) => void;
  onError?: (response: any, xhr: any) => void;
  onLoaded?: (event: any, xhr: any) => void;
  onTimeout?: (event: any, xhr: any) => void;
};

export type DefaultAxConfig = Omit<AxConfig, 'url'> & {
  url?: string;
};
