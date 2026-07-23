import type { Rule } from '../interface';

function isEmpty(v: unknown) {
  return v === undefined || v === null || v === '' ? true : false;
}

function verifyRuleOfMin(min: number, value: unknown) {
  if (isEmpty(value)) return true;
  if (typeof value === 'string') {
    return parseFloat(value) >= min;
  } else if (typeof value === 'number') {
    return value >= min;
  } else {
    return true;
  }
}

function verifyRuleOfMax(max: number, value: unknown) {
  if (isEmpty(value)) return true;
  if (typeof value === 'string') {
    return parseFloat(value) <= max;
  } else if (typeof value === 'number') {
    return value <= max;
  } else {
    return true;
  }
}

function verifyRuleOfMinLength(minLength: number, value: unknown) {
  if (isEmpty(value)) return true;
  if (typeof value === 'number') {
    return String(value).length >= minLength;
  } else if (typeof value === 'string') {
    return value.length >= minLength;
  } else {
    return true;
  }
}

function verifyRuleOfMaxLength(maxLength: number, value: unknown) {
  if (isEmpty(value)) return true;
  if (typeof value === 'number') {
    return String(value).length <= maxLength;
  } else if (typeof value === 'string') {
    return value.length <= maxLength;
  } else {
    return true;
  }
}

function verifyRuleOfRegexp(regexp: RegExp, value: unknown) {
  if (isEmpty(value)) return true;
  if (typeof value === 'number') {
    return regexp.test(String(value));
  } else if (typeof value === 'string') {
    return regexp.test(value);
  } else {
    return true;
  }
}

export interface ValidateResult {
  passed: boolean;
  // Custom message from a thrown/rejected validator; falls back to rule.message upstream
  message?: string;
}

// Check the synchronous built-in rules (min/max/minLength/maxLength/regexp).
function verifySyncRules(rule: Rule, value: unknown): boolean {
  const { min, max, minLength, maxLength, regexp } = rule;

  if (typeof min !== 'undefined' && !verifyRuleOfMin(min, value)) {
    return false;
  }
  if (typeof max !== 'undefined' && !verifyRuleOfMax(max, value)) {
    return false;
  }
  if (
    typeof minLength !== 'undefined' &&
    !verifyRuleOfMinLength(minLength, value)
  ) {
    return false;
  }
  if (
    typeof maxLength !== 'undefined' &&
    !verifyRuleOfMaxLength(maxLength, value)
  ) {
    return false;
  }
  if (regexp instanceof RegExp && !verifyRuleOfRegexp(regexp, value)) {
    return false;
  }
  return true;
}

/**
 * Run a custom validator, dispatching between sync and async at runtime.
 *
 * Supports all of the following shapes (backwards compatible):
 *  - sync `return true` / `return undefined` → pass
 *  - sync `return false`                    → fail (use rule.message)
 *  - sync `throw new Error(msg)`            → fail (use msg)
 *  - async `return Promise.resolve()`       → pass
 *  - async `return Promise.resolve(false)`  → fail (use rule.message)
 *  - async `throw` / `return Promise.reject(new Error(msg))` → fail (use msg)
 */
export async function runValidator(
  validator: NonNullable<Rule['validator']>,
  value: unknown,
): Promise<ValidateResult> {
  try {
    const res = validator(value);
    if (res instanceof Promise) {
      const resolved = await res;
      if (resolved === false) {
        return { passed: false };
      }
      return { passed: true };
    }
    if (res === false) {
      return { passed: false };
    }
    return { passed: true };
  } catch (e) {
    return {
      passed: false,
      message: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * Validate a single rule against a value.
 * Returns { passed, message? }. Sync rules short-circuit; the custom validator
 * is awaited so async validators are supported.
 */
async function validate(rule: Rule, value: unknown): Promise<ValidateResult> {
  if (rule.required && isEmpty(value)) {
    return { passed: false };
  }

  if (!verifySyncRules(rule, value)) {
    return { passed: false };
  }

  if (typeof rule.validator === 'function') {
    return runValidator(rule.validator, value);
  }

  return { passed: true };
}

export default validate;
