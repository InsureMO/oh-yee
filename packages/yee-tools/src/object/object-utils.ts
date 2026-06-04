/**
 * Object utility functions for object manipulation
 * @ohdule object-utils
 */

/**
 * Deep clones an object or array
 * @param obj - The object to clone
 * @returns A deep clone of the object
 * @example
 * ```ts
 * const original = { a: 1, b: { c: 2 } };
 * const cloned = clone(original);
 * cloned.b.c = 3;
 * console.log(original.b.c); // 2
 * ```
 */
export function clone<T>(obj: T): T {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => clone(item)) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = clone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Extends a target object with properties from a source object
 * @param target - The target object to extend
 * @param source - The source object to copy properties from
 * @param deep - Whether to perform a deep merge (default: false)
 * @returns The extended target object (new object, does not modify original)
 * @example
 * ```ts
 * const target = { a: 1 };
 * const source = { b: 2 };
 * extend(target, source); // { a: 1, b: 2 }
 *
 * // Deep merge example
 * const target = { a: { x: 1, y: 2 } };
 * const source = { a: { y: 3, z: 4 } };
 * extend(target, source, true); // { a: { x: 1, y: 3, z: 4 } }
 * // Original target is not modified
 * ```
 */
export function extend<
  T extends Record<string, unknown>,
  S extends Record<string, unknown>,
>(target: T, source: S, deep: boolean = false): T & S {
  if (!deep) {
    return { ...target, ...source };
  }

  // Deep merge: create a new object to avoid modifying original
  const result = {} as T & S;

  // First, deep clone all properties from target
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      const value = target[key];
      if (isPlainObject(value)) {
        result[key as keyof typeof result] = clone(value) as (T & S)[keyof (T & S)];
      } else {
        result[key as keyof typeof result] = value as (T & S)[keyof (T & S)];
      }
    }
  }

  // Then, merge properties from source
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = result[key as keyof typeof result];

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        // Recursively merge nested objects
        result[key as keyof typeof result] = extend(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>,
          true,
        ) as (T & S)[keyof (T & S)];
      } else if (isPlainObject(sourceValue)) {
        // Deep clone source object if target doesn't have this property
        result[key as keyof typeof result] = clone(sourceValue) as (T & S)[keyof (T & S)];
      } else {
        result[key as keyof typeof result] = sourceValue as (T & S)[keyof (T & S)];
      }
    }
  }

  return result;
}

/**
 * Checks if a value is a plain object
 * @param value - The value to check
 * @returns True if the value is a plain object
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 * Merges multiple objects into a single object
 * @param objects - The objects to merge
 * @returns A new object with all properties merged
 * @example
 * ```ts
 * merge({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }
 * ```
 */
export function merge<T extends Record<string, unknown>>(
  ...objects: Partial<T>[]
): Partial<T> {
  return objects.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {} as Partial<T>);
}

/**
 * Picks specified properties from an object
 * @param obj - The source object
 * @param keys - The keys to pick
 * @returns A new object with only the specified properties
 * @example
 * ```ts
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omits specified properties from an object
 * @param obj - The source object
 * @param keys - The keys to omit
 * @returns A new object without the specified properties
 * @example
 * ```ts
 * omit({ a: 1, b: 2, c: 3 }, ['b']) // { a: 1, c: 3 }
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
}
