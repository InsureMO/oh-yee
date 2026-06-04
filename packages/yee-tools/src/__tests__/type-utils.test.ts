import {
  parseBool,
  isArray,
  isString,
  isNumber,
  isDate,
  isFunction,
  isObject,
  isNullOrUndefined,
  isIE,
} from "../type/type-utils";

describe("Type Utils", () => {
  describe("parseBool", () => {
    it('should parse string "true" to true', () => {
      expect(parseBool("true")).toBe(true);
      expect(parseBool("TRUE")).toBe(true);
      expect(parseBool(" true ")).toBe(true);
    });

    it('should parse string "false" to false', () => {
      expect(parseBool("false")).toBe(false);
      expect(parseBool("FALSE")).toBe(false);
      expect(parseBool(" false ")).toBe(false);
    });

    it('should parse "0" to false', () => {
      expect(parseBool("0")).toBe(false);
    });

    it('should parse "1" to true', () => {
      expect(parseBool("1")).toBe(true);
    });

    it('should parse "y" and "n" correctly', () => {
      expect(parseBool("y")).toBe(true);
      expect(parseBool("n")).toBe(false);
    });

    it('should parse "null" and "undefined" strings to false', () => {
      expect(parseBool("null")).toBe(false);
      expect(parseBool("undefined")).toBe(false);
    });

    it("should handle non-string values", () => {
      expect(parseBool(true)).toBe(true);
      expect(parseBool(false)).toBe(false);
      expect(parseBool(1)).toBe(true);
      expect(parseBool(0)).toBe(false);
      expect(parseBool(null)).toBe(false);
      expect(parseBool(undefined)).toBe(false);
    });
  });

  describe("isArray", () => {
    it("should return true for arrays", () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
    });

    it("should return false for non-arrays", () => {
      expect(isArray("hello")).toBe(false);
      expect(isArray(123)).toBe(false);
      expect(isArray({})).toBe(false);
      expect(isArray(null)).toBe(false);
    });
  });

  describe("isString", () => {
    it("should return true for strings", () => {
      expect(isString("hello")).toBe(true);
      expect(isString("")).toBe(true);
    });

    it("should return false for non-strings", () => {
      expect(isString(123)).toBe(false);
      expect(isString([])).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString(null)).toBe(false);
    });
  });

  describe("isNumber", () => {
    it("should return true for numbers", () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(0)).toBe(true);
      expect(isNumber(-1)).toBe(true);
      expect(isNumber(3.14)).toBe(true);
    });

    it("should return false for NaN", () => {
      expect(isNumber(NaN)).toBe(false);
    });

    it("should return false for non-numbers", () => {
      expect(isNumber("123")).toBe(false);
      expect(isNumber([])).toBe(false);
      expect(isNumber({})).toBe(false);
      expect(isNumber(null)).toBe(false);
    });
  });

  describe("isDate", () => {
    it("should return true for valid Date objects", () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date("2024-01-15"))).toBe(true);
    });

    it("should return false for invalid Date objects", () => {
      expect(isDate(new Date("invalid"))).toBe(false);
    });

    it("should return false for non-Date values", () => {
      expect(isDate("2024-01-15")).toBe(false);
      expect(isDate(123)).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate(null)).toBe(false);
    });
  });

  describe("isFunction", () => {
    it("should return true for functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(Date)).toBe(true);
    });

    it("should return false for non-functions", () => {
      expect(isFunction("hello")).toBe(false);
      expect(isFunction(123)).toBe(false);
      expect(isFunction({})).toBe(false);
      expect(isFunction(null)).toBe(false);
    });
  });

  describe("isObject", () => {
    it("should return true for plain objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    it("should return false for arrays", () => {
      expect(isObject([])).toBe(false);
    });

    it("should return false for null", () => {
      expect(isObject(null)).toBe(false);
    });

    it("should return false for non-objects", () => {
      expect(isObject("hello")).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(new Date())).toBe(false);
    });
  });

  describe("isNullOrUndefined", () => {
    it("should return true for null and undefined", () => {
      expect(isNullOrUndefined(null)).toBe(true);
      expect(isNullOrUndefined(undefined)).toBe(true);
    });

    it("should return false for other values", () => {
      expect(isNullOrUndefined(0)).toBe(false);
      expect(isNullOrUndefined("")).toBe(false);
      expect(isNullOrUndefined(false)).toBe(false);
      expect(isNullOrUndefined({})).toBe(false);
    });
  });

  describe("isIE", () => {
    it("should return false in non-IE environments", () => {
      expect(isIE()).toBe(false);
    });
  });
});
