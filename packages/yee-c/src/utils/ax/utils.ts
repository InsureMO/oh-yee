export function buildHeaders(
  xhr: XMLHttpRequest,
  headers: Record<string, any>,
  config: Record<string, any>,
) {
  // eslint-disable-next-line guard-for-in
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }

  if (config.responseType) {
    xhr.setRequestHeader('response-type', config.responseType);
  }
}

export function getType(param: any) {
  return Object.prototype.toString.call(param).slice(8, -1);
}

export function merger(
  state: Record<string, any>,
  params: Record<string, any>,
) {
  return Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (getType(acc[key]) !== 'Object' || getType(value) !== 'Object') {
        acc[key] = value;
      } else {
        acc[key] = merger(acc[key], value);
      }
      return acc;
    },
    { ...state },
  );
}

export function rebind(
  a: Record<string, any>,
  b: Record<string, any>,
  thisArg: any,
) {
  if (getType(b) === 'Object') {
    Object.entries(b).forEach(([key, val]) => {
      if (typeof val === 'function') {
        a[key] = val.bind(thisArg);
      } else {
        a[key] = val;
      }
    });
  }
  return a;
}

export function omit(obj: Record<string, any>, keys: string[]) {
  const res = { ...obj };
  const oks = Object.keys(res);
  keys.forEach((key: string) => {
    if (oks.indexOf(key) > -1) {
      delete res[key];
    }
  });
  return res;
}
