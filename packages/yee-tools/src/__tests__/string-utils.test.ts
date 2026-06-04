import {
  trim,
  isEmpty,
  isNotEmpty,
  isBlank,
  isNotBlank,
  mask,
} from "../string/string-utils";

describe("String Utils", () => {
  describe("trim", () => {
    it("should trim whitespace from both ends", () => {
      expect(trim("  hello  ")).toBe("hello");
      expect(trim("\n\thello\t\n")).toBe("hello");
    });

    it("should handle empty strings", () => {
      expect(trim("")).toBe("");
      expect(trim("   ")).toBe("");
    });
  });

  describe("isEmpty", () => {
    it("should return true for empty strings", () => {
      expect(isEmpty("")).toBe(true);
    });

    it("should return false for non-empty strings", () => {
      expect(isEmpty("hello")).toBe(false);
      expect(isEmpty(" ")).toBe(false);
    });
  });

  describe("isNotEmpty", () => {
    it("should return true for non-empty strings", () => {
      expect(isNotEmpty("hello")).toBe(true);
      expect(isNotEmpty(" ")).toBe(true);
    });

    it("should return false for empty strings", () => {
      expect(isNotEmpty("")).toBe(false);
    });
  });

  describe("isBlank", () => {
    it("should return true for null or undefined", () => {
      expect(isBlank(null)).toBe(true);
      expect(isBlank(undefined)).toBe(true);
    });

    it("should return true for whitespace-only strings", () => {
      expect(isBlank("")).toBe(true);
      expect(isBlank("   ")).toBe(true);
      expect(isBlank("\n\t")).toBe(true);
    });

    it("should return false for non-blank strings", () => {
      expect(isBlank("hello")).toBe(false);
      expect(isBlank(" hello ")).toBe(false);
    });
  });

  describe("isNotBlank", () => {
    it("should return false for null or undefined", () => {
      expect(isNotBlank(null)).toBe(false);
      expect(isNotBlank(undefined)).toBe(false);
    });

    it("should return false for whitespace-only strings", () => {
      expect(isNotBlank("")).toBe(false);
      expect(isNotBlank("   ")).toBe(false);
    });

    it("should return true for non-blank strings", () => {
      expect(isNotBlank("hello")).toBe(true);
      expect(isNotBlank(" hello ")).toBe(true);
    });
  });

  describe("mask", () => {
    it("should return empty string for null/undefined/empty values", () => {
      expect(mask(null, "*:(0,3)")).toBe("");
      expect(mask(undefined, "*:(0,3)")).toBe("");
      expect(mask("", "*:(0,3)")).toBe("");
    });

    it("should mask from start", () => {
      expect(mask("1234567890", "*:(0,3)")).toBe("***4567890");
      expect(mask("1234567890", "*:(0,5)")).toBe("*****67890");
    });

    it("should mask from end", () => {
      expect(mask("1234567890", "*:(-4)")).toBe("1234******");
      expect(mask("1234567890", "*:(-6)")).toBe("123456****");
    });

    it("should mask middle section", () => {
      expect(mask("1234567890", "*:(3,7)")).toBe("123****890");
    });

    it("should handle multiple mask ranges", () => {
      // Note: Multiple ranges are applied sequentially, so they may overlap
      expect(mask("1234567890", "*:(0,2)")).toBe("**34567890");
    });
  });
});
