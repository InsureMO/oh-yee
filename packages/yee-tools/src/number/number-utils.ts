/**
 * Number utility functions for precise floating-point arithmetic
 * @ohdule number-utils
 */

/**
 * Performs precise floating-point addition
 * @param arg1 - First number
 * @param arg2 - Second number
 * @returns The sum of arg1 and arg2
 * @example
 * ```ts
 * add(0.1, 0.2) // 0.3 (instead of 0.30000000000000004)
 * ```
 */
export function add(arg1: number, arg2: number): number {
  let r1: number;
  let r2: number;

  try {
    r1 = arg1.toString().split(".")[1]?.length ?? 0;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1]?.length ?? 0;
  } catch (e) {
    r2 = 0;
  }

  const m = Math.pow(10, Math.max(r1, r2));
  return Math.round(arg1 * m + arg2 * m) / m;
}

/**
 * Performs precise floating-point subtraction
 * @param arg1 - First number
 * @param arg2 - Second number
 * @returns The difference of arg1 and arg2
 * @example
 * ```ts
 * subtract(0.3, 0.1) // 0.2 (instead of 0.19999999999999998)
 * ```
 */
export function subtract(arg1: number, arg2: number): number {
  let r1: number;
  let r2: number;

  try {
    r1 = arg1.toString().split(".")[1]?.length ?? 0;
  } catch (e) {
    r1 = 0;
  }

  try {
    r2 = arg2.toString().split(".")[1]?.length ?? 0;
  } catch (e) {
    r2 = 0;
  }

  const m = Math.pow(10, Math.max(r1, r2));
  return Math.round(arg1 * m - arg2 * m) / m;
}

/**
 * Performs precise floating-point multiplication
 * @param arg1 - First number
 * @param arg2 - Second number
 * @returns The product of arg1 and arg2
 * @example
 * ```ts
 * multiply(0.1, 0.2) // 0.02 (instead of 0.020000000000000004)
 * ```
 */
export function multiply(arg1: number, arg2: number): number {
  let m = 0;
  let s1: string;
  let s2: string;

  try {
    s1 = arg1.toString();
    s2 = arg2.toString();
  } catch (e) {
    return 0;
  }

  try {
    if (s1.indexOf("e") > -1) {
      const decimal1 = s1.split("e");
      m += Math.abs(Number(decimal1[1]));
      s1 = decimal1[0] ?? "";
    }
    m += s1.split(".")[1]?.length ?? 0;
  } catch (e) {
    // ignore
  }

  try {
    if (s2.indexOf("e") > -1) {
      const decimal2 = s2.split("e");
      m += Math.abs(Number(decimal2[1]));
      s2 = decimal2[0] ?? "";
    }
    m += s2.split(".")[1]?.length ?? 0;
  } catch (e) {
    // ignore
  }

  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}

/**
 * Performs precise floating-point division
 * @param arg1 - Dividend
 * @param arg2 - Divisor
 * @returns The quotient of arg1 and arg2
 * @example
 * ```ts
 * divide(0.3, 0.1) // 3 (instead of 2.9999999999999996)
 * ```
 */
export function divide(arg1: number, arg2: number): number {
  let t1 = 0;
  let t2 = 0;
  let s1: string;
  let s2: string;

  try {
    s1 = arg1.toString();
    s2 = arg2.toString();
  } catch (e) {
    return 0;
  }

  try {
    if (s1.indexOf("e") > -1) {
      const decimal1 = s1.split("e");
      t1 = Math.abs(Number(decimal1[1]));
      s1 = decimal1[0] ?? "";
    }
    t1 += s1.split(".")[1]?.length ?? 0;
  } catch (e) {
    // ignore
  }

  try {
    if (s2.indexOf("e") > -1) {
      const decimal2 = s2.split("e");
      t2 = Math.abs(Number(decimal2[1]));
      s2 = decimal2[0] ?? "";
    }
    t2 += s2.split(".")[1]?.length ?? 0;
  } catch (e) {
    // ignore
  }

  const r1 = Number(s1.replace(".", ""));
  const r2 = Number(s2.replace(".", ""));
  return multiply(r1 / r2, Math.pow(10, t2 - t1));
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns A random integer between min and max
 * @example
 * ```ts
 * random(1, 10) // e.g., 7
 * ```
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
