import {
  trimArray,
  isRepeat,
  repeatElement,
  unique,
  chunk,
} from "../array/array-utils";

describe("Array Utils", () => {
  describe("trimArray", () => {
    it("should trim all strings in array", () => {
      expect(trimArray([" hello ", " world "])).toEqual(["hello", "world"]);
      expect(trimArray(["\n\ttest\t\n"])).toEqual(["test"]);
    });

    it("should handle empty arrays", () => {
      expect(trimArray([])).toEqual([]);
    });

    it("should handle arrays with empty strings", () => {
      expect(trimArray(["", "  ", "hello"])).toEqual(["", "", "hello"]);
    });
  });

  describe("isRepeat", () => {
    it("should return true for arrays with duplicates", () => {
      expect(isRepeat([1, 2, 3, 2])).toBe(true);
      expect(isRepeat(["a", "b", "a"])).toBe(true);
    });

    it("should return false for arrays without duplicates", () => {
      expect(isRepeat([1, 2, 3])).toBe(false);
      expect(isRepeat(["a", "b", "c"])).toBe(false);
    });

    it("should handle empty arrays", () => {
      expect(isRepeat([])).toBe(false);
    });

    it("should handle single element arrays", () => {
      expect(isRepeat([1])).toBe(false);
    });
  });

  describe("repeatElement", () => {
    it("should return first duplicate element", () => {
      expect(repeatElement([1, 2, 3, 2, 4])).toBe(2);
      expect(repeatElement(["a", "b", "c", "b"])).toBe("b");
    });

    it("should return null for arrays without duplicates", () => {
      expect(repeatElement([1, 2, 3])).toBeNull();
      expect(repeatElement(["a", "b", "c"])).toBeNull();
    });

    it("should handle empty arrays", () => {
      expect(repeatElement([])).toBeNull();
    });

    it("should return first occurrence when multiple duplicates exist", () => {
      expect(repeatElement([1, 2, 3, 2, 3])).toBe(2);
    });
  });

  describe("unique", () => {
    it("should remove duplicate elements", () => {
      expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(unique(["a", "b", "b", "c"])).toEqual(["a", "b", "c"]);
    });

    it("should handle arrays without duplicates", () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("should handle empty arrays", () => {
      expect(unique([])).toEqual([]);
    });

    it("should preserve order of first occurrence", () => {
      expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });
  });

  describe("chunk", () => {
    it("should chunk array into specified size", () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
      expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([
        [1, 2, 3],
        [4, 5, 6],
      ]);
    });

    it("should handle arrays smaller than chunk size", () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });

    it("should handle empty arrays", () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it("should throw error for invalid chunk size", () => {
      expect(() => chunk([1, 2, 3], 0)).toThrow(
        "Chunk size must be greater than 0",
      );
      expect(() => chunk([1, 2, 3], -1)).toThrow(
        "Chunk size must be greater than 0",
      );
    });

    it("should handle chunk size of 1", () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });
  });
});
