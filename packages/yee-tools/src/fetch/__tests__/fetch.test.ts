import Ax from '../core';
import { createAxInstance } from '../index';

interface MockResponseOptions {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
}

function createFetchResponse(
  data: any,
  options: MockResponseOptions = {},
): Response {
  const status = options.status ?? 200;
  const headers = Object.fromEntries(
    Object.entries(
      options.headers ?? { 'content-type': 'application/json' },
    ).map(([key, value]) => [key.toLowerCase(), value]),
  );

  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: options.statusText ?? 'OK',
    headers: {
      get: (name: string) => headers[name.toLowerCase()] ?? null,
      forEach: (callback: (value: string, key: string) => void) => {
        Object.entries(headers).forEach(([key, value]) => callback(value, key));
      },
    },
    json: jest.fn().mockResolvedValue(data),
    text: jest
      .fn()
      .mockResolvedValue(
        typeof data === 'string' ? data : JSON.stringify(data),
      ),
    blob: jest.fn().mockResolvedValue(new Blob()),
    arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
    formData: jest.fn().mockResolvedValue(new FormData()),
  } as unknown as Response;
}

class FakeXMLHttpRequest {
  static readonly DONE = 4;
  static instances: FakeXMLHttpRequest[] = [];
  static nextStatus = 200;
  static nextResponse: any = '{"ok":true}';
  static nextResponseHeaders: Record<string, string> = {
    'content-type': 'application/json',
  };

  readyState = 0;
  status = 0;
  response: any = null;
  responseText = '';
  responseType: XMLHttpRequestResponseType = '';
  timeout = 0;
  withCredentials = false;
  upload = { onprogress: null as ((event: Event) => void) | null };
  onreadystatechange: (() => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  ontimeout: ((event: Event) => void) | null = null;
  onprogress: ((event: Event) => void) | null = null;
  onloadend: ((event: Event) => void) | null = null;
  requestHeaders: Record<string, string> = {};
  sentBody: any;
  method = '';
  url = '';

  constructor() {
    FakeXMLHttpRequest.instances.push(this);
  }

  static reset(): void {
    FakeXMLHttpRequest.instances = [];
    FakeXMLHttpRequest.nextStatus = 200;
    FakeXMLHttpRequest.nextResponse = '{"ok":true}';
    FakeXMLHttpRequest.nextResponseHeaders = {
      'content-type': 'application/json',
    };
  }

  open(method: string, url: string): void {
    this.method = method;
    this.url = url;
    this.readyState = 1;
  }

  setRequestHeader(key: string, value: string): void {
    this.requestHeaders[key] = value;
  }

  getResponseHeader(name: string): string | null {
    const entry = Object.entries(FakeXMLHttpRequest.nextResponseHeaders).find(
      ([key]) => key.toLowerCase() === name.toLowerCase(),
    );
    return entry?.[1] ?? null;
  }

  getAllResponseHeaders(): string {
    return Object.entries(FakeXMLHttpRequest.nextResponseHeaders)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\r\n');
  }

  send(body: any): void {
    this.sentBody = body;
    this.status = FakeXMLHttpRequest.nextStatus;
    this.response = FakeXMLHttpRequest.nextResponse;
    this.responseText =
      typeof FakeXMLHttpRequest.nextResponse === 'string'
        ? FakeXMLHttpRequest.nextResponse
        : JSON.stringify(FakeXMLHttpRequest.nextResponse);
    this.readyState = FakeXMLHttpRequest.DONE;
    this.onreadystatechange?.();
  }
}

const originalFetch = globalThis.fetch;
const originalXMLHttpRequest = globalThis.XMLHttpRequest;
const fetchMock = jest.fn<
  Promise<Response>,
  [RequestInfo | URL, RequestInit?]
>();

function getFetchInit(callIndex = 0): RequestInit {
  return fetchMock.mock.calls[callIndex]?.[1] ?? {};
}

describe('YeeTools fetch', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    FakeXMLHttpRequest.reset();
    Object.defineProperty(globalThis, 'fetch', {
      configurable: true,
      writable: true,
      value: fetchMock,
    });
    Object.defineProperty(globalThis, 'XMLHttpRequest', {
      configurable: true,
      writable: true,
      value: FakeXMLHttpRequest,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  afterAll(() => {
    Object.defineProperty(globalThis, 'fetch', {
      configurable: true,
      writable: true,
      value: originalFetch,
    });
    Object.defineProperty(globalThis, 'XMLHttpRequest', {
      configurable: true,
      writable: true,
      value: originalXMLHttpRequest,
    });
  });

  describe('Fetch dispatcher', () => {
    it('sends FormData unchanged and lets the browser generate its boundary', async () => {
      fetchMock.mockResolvedValue(createFetchResponse({ ok: true }));
      const instance = new Ax();
      const formData = new FormData();
      formData.append('name', 'value');
      const headers = {
        'content-type': 'multipart/form-data',
        'X-Trace-Id': 'trace-id',
      };

      await instance.post('/upload', formData, {
        dispatcher: 'fetch',
        headers,
      });

      const init = getFetchInit();
      expect(init.body).toBe(formData);
      expect(init.headers).toEqual({ 'X-Trace-Id': 'trace-id' });
      expect(headers).toHaveProperty('content-type', 'multipart/form-data');
    });

    it('maps withCredentials to native Fetch credentials', async () => {
      fetchMock.mockResolvedValue(createFetchResponse({ ok: true }));
      const instance = new Ax();

      await instance.get('/private', {
        dispatcher: 'fetch',
        withCredentials: true,
      });
      await instance.get('/public', {
        dispatcher: 'fetch',
        withCredentials: false,
      });

      expect(getFetchInit(0).credentials).toBe('include');
      expect(getFetchInit(1).credentials).toBe('same-origin');
    });

    it('passes real response status and headers to interceptors without wrapping data', async () => {
      const data = { id: 'created' };
      fetchMock.mockResolvedValue(
        createFetchResponse(data, {
          status: 201,
          headers: {
            'content-type': 'application/json',
            'x-request-id': 'request-id',
          },
        }),
      );
      const instance = new Ax();
      const interceptor = jest.fn(({ response }) => response);
      instance.interceptors.response.use(interceptor);

      const result = await instance.post(
        '/items',
        { name: 'item' },
        {
          dispatcher: 'fetch',
        },
      );

      expect(result).toEqual(data);
      expect(interceptor).toHaveBeenCalledWith(
        expect.objectContaining({
          response: data,
          status: 201,
          headers: expect.objectContaining({
            'x-request-id': 'request-id',
          }),
        }),
      );
    });

    it('calls the error alias exactly once and preserves the original failure', async () => {
      const requestError = new Error('Network error');
      const errorHandler = jest.fn();
      fetchMock.mockRejectedValue(requestError);
      const instance = new Ax();

      await expect(
        instance.get('/failure', {
          dispatcher: 'fetch',
          error: errorHandler,
        }),
      ).rejects.toBe(requestError);
      expect(errorHandler).toHaveBeenCalledTimes(1);
      expect(errorHandler).toHaveBeenCalledWith(requestError, undefined);
    });

    it('preserves the HTTP failure while exposing metadata to error interceptors', async () => {
      fetchMock.mockResolvedValue(
        createFetchResponse(
          { message: 'server exploded' },
          {
            status: 500,
            statusText: 'Internal Server Error',
            headers: {
              'content-type': 'application/json',
              'x-trace-id': 'trace-1',
            },
          },
        ),
      );
      const errorHandler = jest.fn();
      const instance = new Ax();
      const interceptor = jest.fn(({ error }) => {
        throw error;
      });
      instance.interceptors.error.use(interceptor);

      const rejection = await instance
        .get('/broken', {
          dispatcher: 'fetch',
          error: errorHandler,
        })
        .catch((error) => error);

      expect(rejection).toBeInstanceOf(Error);
      expect(rejection).toHaveProperty(
        'message',
        'HTTP 500: Internal Server Error',
      );
      expect(errorHandler).toHaveBeenCalledWith(rejection, undefined);
      expect(interceptor).toHaveBeenCalledWith(
        expect.objectContaining({
          error: rejection,
          type: 'http',
          httpStatus: 500,
          statusText: 'Internal Server Error',
          headers: expect.objectContaining({ 'x-trace-id': 'trace-1' }),
          response: { message: 'server exploded' },
          isTimeout: false,
        }),
      );
    });

    it('classifies malformed JSON without replacing the parse error', async () => {
      const response = createFetchResponse(undefined);
      const parseError = new SyntaxError('Unexpected token');
      (response.json as unknown as jest.Mock).mockRejectedValueOnce(parseError);
      fetchMock.mockResolvedValue(response);
      const instance = new Ax();
      const interceptor = jest.fn(({ error }) => {
        throw error;
      });
      instance.interceptors.error.use(interceptor);

      await expect(
        instance.get('/invalid-json', { dispatcher: 'fetch' }),
      ).rejects.toBe(parseError);
      expect(interceptor).toHaveBeenCalledWith(
        expect.objectContaining({
          error: parseError,
          type: 'parse',
        }),
      );
    });

    it('enforces timeout only when a positive timeout is provided', async () => {
      jest.useFakeTimers();
      fetchMock.mockImplementation((_input, init) => {
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        });
      });
      const instance = new Ax();
      const requestResult = instance
        .get('/slow', {
          dispatcher: 'fetch',
          timeout: 25,
        })
        .catch((error) => error);

      await jest.advanceTimersByTimeAsync(25);
      await expect(requestResult).resolves.toEqual({
        status: 'timeout',
        error: expect.any(DOMException),
      });
    });
  });

  describe('XHR dispatcher', () => {
    it('preserves nested unsafe integers as strings', async () => {
      FakeXMLHttpRequest.nextResponse =
        '{"data":{"id":9223372036854775807},"ids":[9223372036854775806]}';
      const instance = new Ax();

      const result = await instance.get<any>('/bigints', {
        parseBigIntAsString: true,
        headers: { Authorization: 'Bearer token' },
      });

      expect(result).toEqual({
        data: { id: '9223372036854775807' },
        ids: ['9223372036854775806'],
      });
      expect(FakeXMLHttpRequest.instances[0]?.responseType).toBe('text');
    });

    it('leaves the default response type unset and maps arrayBuffer for XHR', async () => {
      const instance = new Ax();

      await instance.get('/default-response');
      await instance.get('/binary-response', {
        responseType: 'arrayBuffer',
      });

      expect(FakeXMLHttpRequest.instances[0]?.responseType).toBe('');
      expect(FakeXMLHttpRequest.instances[1]?.responseType).toBe('arraybuffer');
    });

    it('rejects formData responses because XHR does not support them', async () => {
      const instance = new Ax();

      await expect(
        instance.get('/form-response', {
          responseType: 'formData',
        }),
      ).rejects.toThrow(
        "XHR does not support responseType 'formData'; use the Fetch dispatcher instead.",
      );

      expect(FakeXMLHttpRequest.instances).toHaveLength(0);
    });

    it('sends FormData unchanged, removes Content-Type, and enables credentials', async () => {
      const instance = new Ax();
      const formData = new FormData();
      formData.append('name', 'value');
      const headers = {
        'Content-Type': 'multipart/form-data',
        'X-Trace-Id': 'trace-id',
      };

      await instance.post('/upload', formData, {
        headers,
        withCredentials: true,
      });

      const xhr = FakeXMLHttpRequest.instances[0];
      expect(xhr?.sentBody).toBe(formData);
      expect(xhr?.withCredentials).toBe(true);
      expect(xhr?.requestHeaders).toEqual({ 'X-Trace-Id': 'trace-id' });
      expect(headers).toHaveProperty('Content-Type', 'multipart/form-data');
    });

    it('preserves the XHR HTTP failure while exposing interceptor metadata', async () => {
      FakeXMLHttpRequest.nextStatus = 500;
      FakeXMLHttpRequest.nextResponse = '{"message":"failed"}';
      const onError = jest.fn();
      const instance = new Ax();
      const interceptor = jest.fn(({ error }) => {
        throw error;
      });
      instance.interceptors.error.use(interceptor);

      await expect(instance.get('/failure', { onError })).rejects.toEqual({
        status: 'error',
        error: '{"message":"failed"}',
      });

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(
        { message: 'failed' },
        FakeXMLHttpRequest.instances[0],
      );
      expect(interceptor).toHaveBeenCalledWith(
        expect.objectContaining({
          error: {
            status: 'error',
            error: '{"message":"failed"}',
          },
          type: 'http',
          httpStatus: 500,
          response: { message: 'failed' },
        }),
      );
    });
  });

  describe('custom instances', () => {
    it('merges default and request headers', async () => {
      fetchMock.mockResolvedValue(createFetchResponse({ ok: true }));
      const instance = createAxInstance({
        dispatcher: 'fetch',
        headers: {
          Authorization: 'Bearer token',
          'X-App-Id': 'app-id',
        },
      });

      await instance.get('/items', {
        headers: {
          authorization: 'Bearer override',
          'X-Trace-Id': 'trace-id',
        },
      });

      expect(getFetchInit().headers).toEqual({
        authorization: 'Bearer override',
        'X-App-Id': 'app-id',
        'X-Trace-Id': 'trace-id',
      });
    });

    it('removes instance defaults but preserves request headers when requested', async () => {
      fetchMock.mockResolvedValue(createFetchResponse({ ok: true }));
      const instance = createAxInstance({
        dispatcher: 'fetch',
        headers: {
          Authorization: 'Bearer token',
          'X-App-Id': 'app-id',
        },
      });

      await instance.get('/public', {
        noDefaultHeaders: true,
        headers: { 'X-Request-Only': 'request-value' },
      });
      await instance.get('/without-headers', {
        noDefaultHeaders: true,
      });

      expect(getFetchInit(0).headers).toEqual({
        'X-Request-Only': 'request-value',
      });
      expect(getFetchInit(1).headers).toBeUndefined();
    });
  });
});
