import { AxConfig, DefaultAxConfig } from './interface';
import { buildHeaders, getType, merger, omit } from './utils';

const getDefaultConfig = () => {
  return {
    method: 'GET',
    responseType: 'application/json',
  };
};

function buildUrl(config: Record<string, any>) {
  const { url, baseUrl, params } = config;
  let fullpath = baseUrl && !url.startsWith('http') ? baseUrl + url : url;
  if (getType(params) === 'Object' && Object.keys(params).length) {
    fullpath += '?';
    const entries = Object.entries(params);

    entries.forEach((key, value) => {
      fullpath += `${key}=${value}&`;
    });
    fullpath = fullpath.slice(0, -1);
  }

  return fullpath;
}

class Ax {
  request(configOrUrl: AxConfig | string) {
    let config = getDefaultConfig() as any;
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = merger(config || {}, configOrUrl);
    }
    if (config.dispatcher === 'fetch') {
      return fetch(buildUrl(config), {
        ...omit(config, [
          'data',
          'url',
          'baseUrl',
          'query',
          'noDefaultHeaders',
        ]),
        method: config.method?.toUpperCase(),
        body: config.data,
      });
    }

    let xhr: any;
    const request = new Promise((resolve, reject) => {
      xhr = new XMLHttpRequest();
      const {
        headers,
        timeout,
        async = true,
        data,
        onSuccess,
        onError,
        onProgress,
        onUploadProgress,
        onTimeout,
        onLoaded,
        formDataWithBoundary = true,
      } = config;

      if ((!data || getType(data) === 'FormData') && headers) {
        if (formDataWithBoundary) {
          delete headers['Content-Type'];
        }
      }

      const method = config.method?.toUpperCase() || '';
      const fullpath = buildUrl(config);
      xhr.open(method, fullpath, async);
      buildHeaders(xhr, headers, config);
      if (timeout) {
        xhr.timeout = timeout;
      }

      xhr.upload.onprogress = function (event: any) {
        onUploadProgress?.(event, xhr);
      };

      xhr.onreadystatechange = function () {
        if (xhr?.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status <= 299) {
            const type = this.getResponseHeader('content-type') || '';
            const isJsonType = type.indexOf('application/json') > -1;

            let responseData;
            if (isJsonType) {
              try {
                responseData = JSON.parse(xhr.response);
              } catch (error) {
                responseData = xhr.response;
              }
            } else {
              responseData = xhr.response;
            }

            onSuccess?.(responseData, xhr);
            resolve(responseData);
          } else {
            onError?.(xhr.response, xhr);
            reject({ status: 'error', error: xhr.response });
          }
        }
      };

      xhr.onprogress = function (event: any) {
        onProgress?.(event, xhr);
      };

      xhr.onloadend = function (event: any) {
        onLoaded?.(event, xhr);
        xhr = null;
      };

      xhr.onerror = function (error: any) {
        onError?.(xhr.response, xhr);
        reject({ status: 'error', error });
      };

      xhr.onabort = function (event: any) {
        reject({ status: 'abort', error: event });
      };

      xhr.ontimeout = function (event: any) {
        onTimeout?.(event, xhr);
        reject({ status: 'timeout', error: event });
      };

      xhr.send(data || null);
    }) as Promise<any> & { abort: () => void };

    request.abort = () => xhr?.abort();
    return request;
  }
}

['delete', 'get', 'head', 'options'].forEach((method: string) => {
  // @ts-ignore
  Ax.prototype[method] = function (url: string, config?: DefaultAxConfig) {
    return this.request(
      merger(config || {}, {
        url,
        method,
      }) as AxConfig,
    );
  };
});

['post', 'put', 'patch'].forEach((method: string) => {
  // @ts-ignore
  Ax.prototype[method] = function (
    url: string,
    data: Record<string, any>,
    config?: DefaultAxConfig,
  ) {
    return this.request(
      merger(config || {}, {
        url,
        data,
        method,
      }) as AxConfig,
    );
  };
});

export default Ax;
