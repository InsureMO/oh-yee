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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // constructor() {}

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

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest() as any;
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
        formDataWithBoundary = true, // Set boundary for form-data upload type
      } = config;

      if ((!data || getType(data) === 'FormData') && headers) {
        // Delete to let browser auto-generate
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
        if (onUploadProgress) {
          onUploadProgress(event, xhr);
        }
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status >= 200 && xhr.status <= 299) {
            const type = this.getResponseHeader('content-type') || '';
            const isJsonType = type.indexOf('application/json') > -1;

            let data;

            if (isJsonType) {
              try {
                data = JSON.parse(xhr.response);
              } catch (err) {
                data = xhr.response;
              }
            } else {
              data = xhr.response;
            }

            if (onSuccess) {
              onSuccess(data, xhr);
            }
            resolve(data);
          } else {
            if (onError) {
              onError(xhr.response, xhr);
            }
            reject({ status: 'error', error: xhr.response });
          }
        }
      };

      xhr.onprogress = function (event: any) {
        if (onProgress) {
          onProgress(event, xhr);
        }
      };

      xhr.onloadend = function (event: any) {
        if (onLoaded) {
          onLoaded(event, xhr);
        }
        xhr = null;
      };

      xhr.onerror = function (err: any) {
        if (onError) {
          onError(xhr.response, xhr);
        }
        reject({ status: 'error', error: err });
        xhr = null;
      };

      xhr.ontimeout = function (event: any) {
        if (onTimeout) {
          onTimeout(event, xhr);
        }
        reject({ status: 'timeout', error: event });
        xhr = null;
      };

      xhr.send(data || null);
    });
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
