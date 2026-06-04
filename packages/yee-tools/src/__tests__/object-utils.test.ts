import { clone, extend, merge, pick, omit } from "../object/object-utils";

describe("Object Utils", () => {
  describe("clone", () => {
    it("should deep clone objects", () => {
      const original = { a: 1, b: { c: 2 } };
      const cloned = clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);

      cloned.b.c = 3;
      expect(original.b.c).toBe(2);
    });

    it("should deep clone arrays", () => {
      const original = [1, 2, [3, 4]];
      const cloned = clone(original);

      expect(cloned).toEqual(original);
      expect(cloned).not.toBe(original);
      expect(cloned[2]).not.toBe(original[2]);
    });

    it("should handle primitive values", () => {
      expect(clone(123)).toBe(123);
      expect(clone("hello")).toBe("hello");
      expect(clone(true)).toBe(true);
      expect(clone(null)).toBe(null);
    });

    it("should handle nested structures", () => {
      const original = {
        a: 1,
        b: [2, 3, { d: 4 }],
        c: { e: 5, f: [6, 7] },
      };
      const cloned = clone(original);

      expect(cloned).toEqual(original);
      // Type-safe access to nested object
      const clonedItem = cloned.b[2] as { d: number };
      clonedItem.d = 10;
      const originalItem = original.b[2] as { d: number };
      expect(originalItem.d).toBe(4);
    });
  });

  describe("extend", () => {
    it("should perform shallow extend by default", () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = extend(target, source);

      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it("should perform deep extend when flag is true", () => {
      const target = { a: 1, b: { c: 2, d: 3 } };
      const source = { b: { c: 4, e: 5 }, f: 6 };
      const result = extend(target, source, true);

      expect(result).toEqual({ a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 });
    });

    it("should not mutate original objects", () => {
      const target = { a: 1 };
      const source = { b: 2 };
      const result = extend(target, source);

      expect(target).toEqual({ a: 1 });
      expect(source).toEqual({ b: 2 });
    });

    it("should not mutate original objects during deep extend", () => {
      const target = { a: 1, b: { c: 2, d: 3 } };
      const source = { b: { c: 4, e: 5 }, f: 6 };
      const result = extend(target, source, true);

      // Original objects should not be modified
      expect(target).toEqual({ a: 1, b: { c: 2, d: 3 } });
      expect(source).toEqual({ b: { c: 4, e: 5 }, f: 6 });

      // Result should be correctly merged
      expect(result).toEqual({ a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 });

      // Result should be a new object
      expect(result).not.toBe(target);
      expect(result).not.toBe(source);

      // Nested objects should be cloned, not referenced
      expect(result.b).not.toBe(target.b);
      expect(result.b).not.toBe(source.b);
    });

    it("should deeply clone nested objects in target during deep extend", () => {
      const target = { a: { x: 1, y: { z: 2 } } };
      const source = { b: 3 };
      const result = extend(target, source, true);

      // Modify the result
      (result.a as any).y.z = 100;

      // Original target should not be affected
      expect((target.a as any).y.z).toBe(2);
      expect((result.a as any).y.z).toBe(100);
    });
  });

  describe("merge", () => {
    it("should merge multiple objects", () => {
      const result = merge<Record<string, number>>(
        { a: 1 },
        { b: 2 },
        { c: 3 },
      );
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it("should handle overlapping keys (last wins)", () => {
      const result = merge<Record<string, number>>(
        { a: 1, b: 2 },
        { b: 3, c: 4 },
      );
      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it("should handle empty objects", () => {
      const result = merge<Record<string, number>>({}, { a: 1 }, {});
      expect(result).toEqual({ a: 1 });
    });
  });

  describe("pick", () => {
    it("should pick specified properties", () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = pick(obj, ["a", "c"]);

      expect(result).toEqual({ a: 1, c: 3 });
    });

    it("should handle non-existent keys", () => {
      const obj = { a: 1, b: 2 };
      const result = pick(obj, ["a", "c"] as Array<keyof typeof obj>);

      expect(result).toEqual({ a: 1 });
    });

    it("should handle empty key array", () => {
      const obj = { a: 1, b: 2 };
      const result = pick(obj, []);

      expect(result).toEqual({});
    });
  });

  describe("omit", () => {
    it("should omit specified properties", () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 };
      const result = omit(obj, ["b", "d"]);

      expect(result).toEqual({ a: 1, c: 3 });
    });

    it("should handle non-existent keys", () => {
      const obj = { a: 1, b: 2 };
      // @ts-expect-error - testing runtime behavior with invalid key
      const result = omit(obj, ["c"]);

      expect(result).toEqual({ a: 1, b: 2 });
    });

    it("should handle empty key array", () => {
      const obj = { a: 1, b: 2 };
      const result = omit(obj, []);

      expect(result).toEqual({ a: 1, b: 2 });
    });
  });
});
