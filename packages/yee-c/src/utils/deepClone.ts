export default function deepClone(obj: unknown, hash = new WeakMap()) {
  // If primitive type, return directly
  if (obj === null) return null;
  if (typeof obj !== 'object') return obj;

  // If Date object, return a new Date
  if (obj instanceof Date) return new Date(obj);

  // If RegExp object, return a new RegExp
  if (obj instanceof RegExp) return new RegExp(obj);

  // If function, return as-is
  if (typeof obj === 'function') return obj;

  // If Array
  if (Array.isArray(obj)) {
    // If cached, return cached array
    if (hash.has(obj)) return hash.get(obj);
    const cloneArr = [] as Array<any>;
    hash.set(obj, cloneArr); // Store new array in cache
    for (let item of obj) {
      cloneArr.push(deepClone(item, hash)); // Recursively clone each item
    }
    return cloneArr;
  }

  // If Object
  if (obj.constructor === Object) {
    // If cached, return cached object
    if (hash.has(obj)) return hash.get(obj);
    const cloneObj = {} as Record<string, any>;
    hash.set(obj, cloneObj); // Store new object in cache
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Only copy own properties
        // @ts-ignore
        cloneObj[key] = deepClone(obj[key], hash); // Recursively clone each property value
      }
    }
    return cloneObj;
  }

  // Other cases: return as-is
  return obj;
}
