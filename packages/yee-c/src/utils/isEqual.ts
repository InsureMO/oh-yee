export default function isEqual(a: unknown, b: unknown) {
  // Compare reference types
  if (a === b) return true;

  // Compare null
  if (a === null || b === null) return a === b;

  // Compare primitive types
  if (typeof a !== typeof b) return false;

  // Compare dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Compare regex
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // Compare arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Compare objects
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (let key of keysA) {
      if (
        !keysB.includes(key) ||
        !isEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
        )
      )
        return false;
    }
    return true;
  }

  // Compare functions
  if (typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }

  // Other cases
  return false;
}
