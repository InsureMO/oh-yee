import { get, set, remove } from "../cookie/cookie-utils";

describe("Cookie Utils", () => {
  beforeEach(() => {
    // Clear all cookies before each test
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0]?.trim();
      if (name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  });

  describe("set", () => {
    it("should set a cookie", () => {
      set("test", "value");
      expect(document.cookie).toContain("test=value");
    });

    it("should encode cookie value by default", () => {
      set("test", "hello world");
      expect(document.cookie).toContain("test=hello%20world");
    });

    it("should not encode when raw option is true", () => {
      set("test", "hello world", { raw: true });
      expect(document.cookie).toContain("test=hello world");
    });

    it("should set cookie with path", () => {
      const result = set("test", "value", { path: "/admin" });
      expect(result).toContain("path=/admin");
    });

    it("should set cookie with domain", () => {
      const result = set("test", "value", { domain: ".example.com" });
      expect(result).toContain("domain=.example.com");
    });

    it("should set secure cookie", () => {
      const result = set("test", "value", { secure: true });
      expect(result).toContain("secure");
    });

    it("should set cookie with expiration date", () => {
      const date = new Date("2025-12-31");
      const result = set("test", "value", { expires: date });
      expect(result).toContain("expires=");
    });

    it("should set cookie with expiration in days", () => {
      const result = set("test", "value", { expires: 7 });
      expect(result).toContain("expires=");
    });
  });

  describe("get", () => {
    it("should get a cookie value", () => {
      set("test", "value");
      expect(get("test")).toBe("value");
    });

    it("should return undefined for non-existent cookie", () => {
      expect(get("nonexistent")).toBeUndefined();
    });

    it("should decode cookie value by default", () => {
      document.cookie = "test=hello%20world";
      expect(get("test")).toBe("hello world");
    });

    it("should not decode when raw option is true", () => {
      document.cookie = "test=hello%20world";
      expect(get("test", { raw: true })).toBe("hello%20world");
    });

    it("should use converter function", () => {
      set("test", JSON.stringify({ a: 1 }));
      const result = get("test", { converter: JSON.parse });
      expect(result).toEqual({ a: 1 });
    });

    it("should handle converter as function parameter", () => {
      set("test", "123");
      const result = get("test", (value) => parseInt(value, 10));
      expect(result).toBe(123);
    });
  });

  describe("remove", () => {
    it("should remove a cookie", () => {
      set("test", "value");
      remove("test");
      expect(get("test")).toBeUndefined();
    });

    it("should remove cookie with matching path", () => {
      set("test", "value", { path: "/admin" });
      remove("test", { path: "/admin" });
      expect(get("test")).toBeUndefined();
    });

    it("should remove cookie with matching domain", () => {
      set("test", "value", { domain: ".example.com" });
      remove("test", { domain: ".example.com" });
      expect(get("test")).toBeUndefined();
    });
  });

  describe("error handling", () => {
    it("should throw error for empty cookie name in get", () => {
      expect(() => get("")).toThrow("Cookie name must be a non-empty string");
    });

    it("should throw error for empty cookie name in set", () => {
      expect(() => set("", "value")).toThrow(
        "Cookie name must be a non-empty string",
      );
    });

    it("should throw error for empty cookie name in remove", () => {
      expect(() => remove("")).toThrow(
        "Cookie name must be a non-empty string",
      );
    });
  });
});
