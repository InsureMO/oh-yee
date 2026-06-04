/**
 * Simple safari detection based on user agent test
 */
export const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export const isJsons = (array: unknown) =>
  Array.isArray(array) &&
  array.every((row) => typeof row === 'object' && !(row instanceof Array));

export const isArrays = (array: unknown) =>
  Array.isArray(array) && array.every((row) => Array.isArray(row));

export const jsonsHeaders = (array: Record<string, any>) =>
  Array.from(
    array
      .map((json: Record<string, any>) => Object.keys(json))
      .reduce((a: Array<any>, b: Array<any>) => new Set([...a, ...b]), []),
  );

export const getHeaderValue = (property: any, obj: any) => {
  const foundValue = property
    .replace(/\[([^\]]+)]/g, '.$1')
    .split('.')
    // eslint-disable-next-line array-callback-return
    .reduce(function (
      o: Record<string, any>,
      p: string,
      i: number,
      arr: string[],
    ) {
      // if at any point the nested keys passed do not exist, splice the array so it doesnt keep reducing
      const value = o[p];
      if (value === undefined || value === null) {
        arr.splice(1);
      } else {
        return value;
      }
    },
    obj);
  // if at any point the nested keys passed do not exist then looks for key `property` in object obj
  return foundValue === undefined
    ? property in obj
      ? obj[property]
      : ''
    : foundValue;
};

export const jsons2arrays = (
  jsons: Record<string, any>,
  headers?: Array<{ label: string; key: string; [prop: string]: any }>,
) => {
  //   const _headers = headers || jsonsHeaders(jsons);
  const _headers = headers || [];

  // allow headers to have custom labels, defaulting to having the header data key be the label
  let headerLabels = headers as any;
  let headerKeys = headers as any;
  if (isJsons(headers)) {
    headerLabels = _headers.map((header) => header.label);
    headerKeys = _headers.map((header) => header.key);
  }

  const data = jsons.map((object: any) =>
    headerKeys.map((header: any) => getHeaderValue(header, object)),
  );
  return [headerLabels, ...data];
};

export const elementOrEmpty = (element: unknown) =>
  typeof element === 'undefined' || element === null ? '' : element;

export const joiner = (
  data: Array<Record<string, any>>,
  separator = ',',
  enclosingCharacter = '"',
) => {
  return data
    .filter((e) => e)
    .map((row) =>
      row
        .map((element: unknown) => elementOrEmpty(element))
        .map(
          (column: string) =>
            `${enclosingCharacter}${column}${enclosingCharacter}`,
        )
        .join(separator),
    )
    .join(`\n`);
};

export const arrays2csv = (
  data: Array<Record<string, any>>,
  headers?: Array<{ key: string; label: string; [prop: string]: any }>,
  separator?: string,
  enclosingCharacter?: string,
) => joiner(headers ? [headers, ...data] : data, separator, enclosingCharacter);

export const jsons2csv = (
  data: Array<Record<string, any>>,
  headers?: Array<{ label: string; key: string; [prop: string]: any }>,
  separator?: string,
  enclosingCharacter?: string,
) => joiner(jsons2arrays(data, headers), separator, enclosingCharacter);

export const string2csv = (
  data: string,
  headers?: Array<Record<string, any>>,
  separator?: string,
) =>
  headers ? `${headers.join(separator)}\n${data}` : data.replace(/"/g, '""');

export const toCSV = (
  data: Array<Record<string, any>>,
  headers?: Array<{ label: string; key: string; [prop: string]: any }>,
  separator?: string,
  enclosingCharacter?: string,
) => {
  if (isJsons(data))
    return jsons2csv(data, headers, separator, enclosingCharacter);
  if (isArrays(data))
    return arrays2csv(data, headers, separator, enclosingCharacter);
  if (typeof data === 'string') return string2csv(data, headers, separator);
  throw new TypeError(
    `Data should be a "String", "Array of arrays" OR "Array of objects" `,
  );
};

export const buildURI = (
  data: Array<Record<string, any>>,
  uFEFF?: boolean,
  headers?: Array<{ key: string; label: string }>,
  separator?: string,
  enclosingCharacter?: string,
) => {
  const csv = toCSV(data, headers, separator, enclosingCharacter);
  const type = isSafari() ? 'application/csv' : 'text/csv';
  const blob = new Blob([uFEFF ? '\uFEFF' : '', csv], { type });
  const dataURI = `data:${type};charset=utf-8,${uFEFF ? '\uFEFF' : ''}${csv}`;

  const URL = window.URL || window.webkitURL;

  return typeof URL.createObjectURL === 'undefined'
    ? dataURI
    : URL.createObjectURL(blob);
};
