export default function pick(
  object: Record<string, any>,
  keys: Array<string> | string,
) {
  const result = {} as any;
  if (typeof keys === 'string') {
    if (typeof object[keys] !== 'undefined') {
      result[keys] = object[keys];
    }
  } else if (Array.isArray(keys)) {
    keys.map((key) =>
      typeof object[key] !== 'undefined' ? (result[key] = object[key]) : null,
    );
  }
  return result;
}
