import { SessionContext } from "../cache/session-context";
import { LocalContext } from "../cache/local-context";
import { PageContext } from "../cache/page-context";

describe("Cache Context", () => {
  describe("SessionContext", () => {
    beforeEach(() => {
      SessionContext.clear();
    });

    it("should store and retrieve values", () => {
      SessionContext.put("key1", "value1");
      expect(SessionContext.get("key1")).toBe("value1");
    });

    it("should store and retrieve objects", () => {
      const obj = { a: 1, b: 2 };
      SessionContext.put("obj", obj);
      expect(SessionContext.get("obj")).toEqual(obj);
    });

    it("should return null for non-existent keys", () => {
      expect(SessionContext.get("nonexistent")).toBeNull();
    });

    it("should remove values", () => {
      SessionContext.put("key1", "value1");
      SessionContext.remove("key1");
      expect(SessionContext.get("key1")).toBeNull();
    });

    it("should clear all values", () => {
      SessionContext.put("key1", "value1");
      SessionContext.put("key2", "value2");
      SessionContext.clear();
      expect(SessionContext.get("key1")).toBeNull();
      expect(SessionContext.get("key2")).toBeNull();
    });

    it("should check if key exists", () => {
      SessionContext.put("key1", "value1");
      expect(SessionContext.has("key1")).toBe(true);
      expect(SessionContext.has("nonexistent")).toBe(false);
    });

    describe("mergeSet", () => {
      it("should merge objects when key already exists", () => {
        SessionContext.put("user", { name: "John", age: 30 });
        const result = SessionContext.mergeSet("user", { age: 31, city: "NYC" });

        expect(result).toEqual({ name: "John", age: 31, city: "NYC" });
        expect(SessionContext.get("user")).toEqual({ name: "John", age: 31, city: "NYC" });
      });

      it("should replace non-object values", () => {
        SessionContext.put("key", "string value");
        const result = SessionContext.mergeSet("key", { new: "value" });

        expect(result).toEqual({ new: "value" });
        expect(SessionContext.get("key")).toEqual({ new: "value" });
      });

      it("should set nested value using dot notation", () => {
        SessionContext.put("config", { theme: "dark" });
        const result = SessionContext.mergeSet("config.ui.language", "en");

        expect(result).toEqual({
          theme: "dark",
          ui: { language: "en" }
        });
      });

      it("should create nested structure if not exists", () => {
        const result = SessionContext.mergeSet("app.user.profile.name", "John");

        expect(result).toEqual({
          user: {
            profile: {
              name: "John"
            }
          }
        });
      });

      it("should not modify original objects during merge", () => {
        const original = { a: 1, b: { c: 2 } };
        SessionContext.put("data", original);

        SessionContext.mergeSet("data", { b: { d: 3 } });

        // Original object should not be modified
        expect(original).toEqual({ a: 1, b: { c: 2 } });
      });

      it("should support legacy set() method (deprecated)", () => {
        SessionContext.put("user", { name: "John" });
        const result = SessionContext.set("user", { age: 30 });

        expect(result).toEqual({ name: "John", age: 30 });
      });
    });

    it("should get all keys", () => {
      SessionContext.put("key1", "value1");
      SessionContext.put("key2", "value2");
      const keys = SessionContext.keys();
      expect(keys).toContain("key1");
      expect(keys).toContain("key2");
    });

    it("should return stored value from put", () => {
      const value = { test: "data" };
      const result = SessionContext.put("key", value);
      expect(result).toBe(value);
    });
  });

  describe("LocalContext", () => {
    beforeEach(() => {
      LocalContext.clear();
    });

    it("should store and retrieve values", () => {
      LocalContext.put("key1", "value1");
      expect(LocalContext.get("key1")).toBe("value1");
    });

    it("should store and retrieve objects", () => {
      const obj = { a: 1, b: 2 };
      LocalContext.put("obj", obj);
      expect(LocalContext.get("obj")).toEqual(obj);
    });

    it("should return null for non-existent keys", () => {
      expect(LocalContext.get("nonexistent")).toBeNull();
    });

    it("should remove values", () => {
      LocalContext.put("key1", "value1");
      LocalContext.remove("key1");
      expect(LocalContext.get("key1")).toBeNull();
    });

    it("should clear all values", () => {
      LocalContext.put("key1", "value1");
      LocalContext.put("key2", "value2");
      LocalContext.clear();
      expect(LocalContext.get("key1")).toBeNull();
      expect(LocalContext.get("key2")).toBeNull();
    });

    it("should check if key exists", () => {
      LocalContext.put("key1", "value1");
      expect(LocalContext.has("key1")).toBe(true);
      expect(LocalContext.has("nonexistent")).toBe(false);
    });

    it("should get all keys", () => {
      LocalContext.put("key1", "value1");
      LocalContext.put("key2", "value2");
      const keys = LocalContext.keys();
      expect(keys).toContain("key1");
      expect(keys).toContain("key2");
    });

    it("should return stored value from put", () => {
      const value = { test: "data" };
      const result = LocalContext.put("key", value);
      expect(result).toBe(value);
    });
  });

  describe("PageContext", () => {
    beforeEach(() => {
      PageContext.clear();
    });

    it("should store and retrieve values", () => {
      PageContext.put("key1", "value1");
      expect(PageContext.get("key1")).toBe("value1");
    });

    it("should store and retrieve objects", () => {
      const obj = { a: 1, b: 2 };
      PageContext.put("obj", obj);
      expect(PageContext.get("obj")).toEqual(obj);
    });

    it("should return undefined for non-existent keys", () => {
      expect(PageContext.get("nonexistent")).toBeUndefined();
    });

    it("should remove values", () => {
      PageContext.put("key1", "value1");
      PageContext.remove("key1");
      expect(PageContext.get("key1")).toBeUndefined();
    });

    it("should clear all values", () => {
      PageContext.put("key1", "value1");
      PageContext.put("key2", "value2");
      PageContext.clear();
      expect(PageContext.get("key1")).toBeUndefined();
      expect(PageContext.get("key2")).toBeUndefined();
    });

    it("should check if key exists", () => {
      PageContext.put("key1", "value1");
      expect(PageContext.has("key1")).toBe(true);
      expect(PageContext.has("nonexistent")).toBe(false);
    });

    it("should get size", () => {
      PageContext.put("key1", "value1");
      PageContext.put("key2", "value2");
      expect(PageContext.size()).toBe(2);
    });

    it("should iterate over keys", () => {
      PageContext.put("key1", "value1");
      PageContext.put("key2", "value2");
      const keys = Array.from(PageContext.keys());
      expect(keys).toContain("key1");
      expect(keys).toContain("key2");
    });

    it("should iterate over values", () => {
      PageContext.put("key1", "value1");
      PageContext.put("key2", "value2");
      const values = Array.from(PageContext.values());
      expect(values).toContain("value1");
      expect(values).toContain("value2");
    });

    it("should iterate over entries", () => {
      PageContext.put("key1", "value1");
      PageContext.put("key2", "value2");
      const entries = Array.from(PageContext.entries());
      expect(entries).toContainEqual(["key1", "value1"]);
      expect(entries).toContainEqual(["key2", "value2"]);
    });

    it("should warn when overwriting existing key", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      PageContext.put("key1", "value1");
      PageContext.put("key1", "value2");
      expect(consoleSpy).toHaveBeenCalledWith(
        "[yee-tools]",
        'Key "key1" already exists and will be overwritten',
      );
      consoleSpy.mockRestore();
    });
  });
});
