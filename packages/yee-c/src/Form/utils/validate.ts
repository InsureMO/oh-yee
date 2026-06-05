// true: 校验通过；false校验未通过
import { Rule } from '../interface';

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

/**
 * @returns validated
 * */
function verifyMain(rule: Rule, value: any): boolean {
  const { min, max, minLength, maxLength, regexp, validator } = rule;

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
  if (typeof validator === 'function' && !validator(value)) {
    return false;
  }
  return true;
}

function validate(rule: Rule, value: unknown): boolean {
  if (rule.required && isEmpty(value)) {
    return false;
  }

  return verifyMain(rule, value);
}

export default validate;
