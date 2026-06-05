export default function omit(
  object: Record<string, any>,
  keys: Array<string> | string,
) {
  const result = { ...object } as any;
  if (typeof keys === 'string') {
    delete result[keys];
  } else if (Array.isArray(keys)) {
    keys.map((key) => delete result[key]);
  }
  return result;
}
