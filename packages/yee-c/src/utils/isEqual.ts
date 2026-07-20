export default function isEqual(
  a: unknown,
  b: unknown,
  seen?: Map<object, Set<object>>,
): boolean {
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

  // Compare functions
  if (typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }

  // For objects and arrays, detect circular references
  if (typeof a === 'object' && typeof b === 'object') {
    if (!seen) {
      seen = new Map();
    }

    // If we've already started comparing this pair, assume equal to break the cycle
    const seenForA = seen.get(a as object);
    if (seenForA && seenForA.has(b as object)) {
      return true;
    }

    // Mark this pair as being compared
    if (!seenForA) {
      seen.set(a as object, new Set([b as object]));
    } else {
      seenForA.add(b as object);
    }

    // Compare arrays
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i], seen)) return false;
      }
      return true;
    }

    // Compare objects
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (let key of keysA) {
      if (
        !keysB.includes(key) ||
        !isEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
          seen,
        )
      )
        return false;
    }
    return true;
  }

  // Other cases
  return false;
}
