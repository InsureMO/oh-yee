import {
  getUrlParam,
  buildQueryString,
  updateUrlParams,
  removeUrlParams,
  normalizeURL,
} from "../url/url-utils";

// Mock SessionContext for normalizeURL tests
jest.mock("../cache/session-context", () => ({
  SessionContext: {
    get: jest.fn(),
  },
}));

describe("URL Utils", () => {
  describe("getUrlParam", () => {
    it("should parse simple query string", () => {
      const result = getUrlParam("http://example.com?id=123&name=test");
      expect(result).toEqual({ id: "123", name: "test" });
    });

    it("should parse URL with hash routing", () => {
      const result = getUrlParam("http://example.com?lang=en#/page?id=123");
      expect(result).toEqual({ lang: "en", id: "123" });
    });

    it("should handle URL with only hash params", () => {
      const result = getUrlParam("http://example.com#/page?id=123&name=test");
      expect(result).toEqual({ id: "123", name: "test" });
    });

    it("should handle URL without query params", () => {
      const result = getUrlParam("http://example.com");
      expect(result).toEqual({});
    });

    it("should handle empty string", () => {
      const result = getUrlParam("");
      expect(result).toEqual({});
    });

    it("should decode URI components", () => {
      const result = getUrlParam(
        "http://example.com?name=John%20Doe&city=New%20York",
      );
      expect(result).toEqual({ name: "John Doe", city: "New York" });
    });

    it("should handle params without values", () => {
      const result = getUrlParam("http://example.com?flag&id=123");
      expect(result).toEqual({ flag: "", id: "123" });
    });

    it("should handle special characters", () => {
      const result = getUrlParam("http://example.com?email=test%40example.com");
      expect(result).toEqual({ email: "test@example.com" });
    });

    it("should handle multiple hash segments", () => {
      // Only first hash segment's query params are parsed
      const result = getUrlParam("http://example.com?a=1#/path?b=2");
      expect(result).toEqual({ a: "1", b: "2" });
    });

    it("should handle duplicate keys (last wins)", () => {
      const result = getUrlParam("http://example.com?id=1&id=2");
      expect(result).toEqual({ id: "2" });
    });

    it("should return empty object for undefined in non-browser environment", () => {
      const result = getUrlParam(undefined);
      // In Node.js test environment, location is not defined
      expect(result).toEqual({});
    });
  });

  describe("buildQueryString", () => {
    it("should build query string from object", () => {
      const result = buildQueryString({ id: "123", name: "test" });
      expect(result).toBe("id=123&name=test");
    });

    it("should handle numeric values", () => {
      const result = buildQueryString({ id: 123, page: 1 });
      expect(result).toBe("id=123&page=1");
    });

    it("should handle boolean values", () => {
      const result = buildQueryString({ active: true, deleted: false });
      expect(result).toBe("active=true&deleted=false");
    });

    it("should encode special characters", () => {
      const result = buildQueryString({
        email: "test@example.com",
        name: "John Doe",
      });
      expect(result).toContain("test%40example.com");
      expect(result).toContain("John%20Doe");
    });

    it("should skip null and undefined values", () => {
      const result = buildQueryString({
        id: "123",
        name: null as any,
        age: undefined as any,
      });
      expect(result).toBe("id=123");
    });

    it("should handle empty object", () => {
      const result = buildQueryString({});
      expect(result).toBe("");
    });

    it("should handle empty string values", () => {
      const result = buildQueryString({ id: "123", name: "" });
      expect(result).toBe("id=123&name=");
    });
  });

  describe("updateUrlParams", () => {
    it("should add params to URL without existing params", () => {
      const result = updateUrlParams("http://example.com", { id: "123" });
      expect(result).toBe("http://example.com?id=123");
    });

    it("should merge with existing params", () => {
      const result = updateUrlParams("http://example.com?name=test", {
        id: "123",
      });
      expect(result).toContain("name=test");
      expect(result).toContain("id=123");
    });

    it("should override existing param values", () => {
      const result = updateUrlParams("http://example.com?id=1", { id: "2" });
      expect(result).toBe("http://example.com?id=2");
    });

    it("should handle multiple params", () => {
      const result = updateUrlParams("http://example.com", {
        id: "123",
        name: "test",
        page: 1,
      });
      expect(result).toContain("id=123");
      expect(result).toContain("name=test");
      expect(result).toContain("page=1");
    });

    it("should preserve URL structure", () => {
      const result = updateUrlParams("http://example.com/path", { id: "123" });
      expect(result).toBe("http://example.com/path?id=123");
    });

    it("should handle empty params object", () => {
      const result = updateUrlParams("http://example.com?id=123", {});
      expect(result).toBe("http://example.com?id=123");
    });
  });

  describe("removeUrlParams", () => {
    it("should remove single param", () => {
      const result = removeUrlParams("http://example.com?id=123&name=test", [
        "id",
      ]);
      expect(result).toBe("http://example.com?name=test");
    });

    it("should remove multiple params", () => {
      const result = removeUrlParams(
        "http://example.com?id=123&name=test&page=1",
        ["id", "page"],
      );
      expect(result).toBe("http://example.com?name=test");
    });

    it("should remove all params", () => {
      const result = removeUrlParams("http://example.com?id=123", ["id"]);
      expect(result).toBe("http://example.com");
    });

    it("should handle non-existent params", () => {
      const result = removeUrlParams("http://example.com?id=123", ["name"]);
      expect(result).toBe("http://example.com?id=123");
    });

    it("should handle URL without params", () => {
      const result = removeUrlParams("http://example.com", ["id"]);
      expect(result).toBe("http://example.com");
    });

    it("should handle empty keys array", () => {
      const result = removeUrlParams("http://example.com?id=123", []);
      expect(result).toBe("http://example.com?id=123");
    });

    it("should preserve URL structure", () => {
      const result = removeUrlParams(
        "http://example.com/path?id=123&name=test",
        ["id"],
      );
      expect(result).toBe("http://example.com/path?name=test");
    });
  });

  describe("edge cases", () => {
    it("should handle malformed URLs gracefully", () => {
      // Malformed URLs may not parse correctly
      const result = getUrlParam("???id=123");
      expect(result).toEqual({});
    });

    it("should handle URLs with fragments", () => {
      // Fragments without hash routing are not parsed
      const result = getUrlParam("http://example.com?id=123");
      expect(result).toEqual({ id: "123" });
    });

    it("should handle Chinese characters", () => {
      const encoded = encodeURIComponent("测试");
      const result = getUrlParam(`http://example.com?name=${encoded}`);
      expect(result).toEqual({ name: "测试" });
    });

    it("should handle equals sign in value", () => {
      const result = getUrlParam("http://example.com?formula=a%3Db%2Bc");
      expect(result).toEqual({ formula: "a=b+c" });
    });
  });

  describe("normalizeURL", () => {
    beforeEach(() => {
      // Reset config and SessionContext before each test
      const { configer } = require("../config/config-provider");
      configer.reset();
      const { SessionContext } = require("../cache/session-context");
      SessionContext.get.mockReturnValue(null);
    });

    it("should add leading slash if missing for /api paths", () => {
      const result = normalizeURL("api/users");
      expect(result).toBe("/api/users");
    });

    it("should preserve leading slash if present for /api paths", () => {
      const result = normalizeURL("/api/users");
      expect(result).toBe("/api/users");
    });

    it("should throw error for empty string", () => {
      expect(() => normalizeURL("")).toThrow(TypeError);
      expect(() => normalizeURL("")).toThrow("URL must be a non-empty string");
    });

    it("should throw error for non-string values", () => {
      expect(() => normalizeURL(null as any)).toThrow(TypeError);
      expect(() => normalizeURL(undefined as any)).toThrow(TypeError);
      expect(() => normalizeURL(123 as any)).toThrow(TypeError);
    });

    it("should return http URLs as-is", () => {
      const result = normalizeURL("http://example.com/api/users");
      expect(result).toBe("http://example.com/api/users");
    });

    it("should return https URLs as-is", () => {
      const result = normalizeURL("https://example.com/api/users");
      expect(result).toBe("https://example.com/api/users");
    });

    it("should add platform prefix when first segment matches UI_API_PLATFORM_PATHS", () => {
      const { SessionContext } = require("../cache/session-context");
      SessionContext.get.mockReturnValue({
        UI_API_PLATFORM_PATHS: "urp,dd,i18n",
        UI_TENANT_CODE: "",
      });

      const result = normalizeURL("urp/some-api");
      expect(result).toBe("/api/platform/urp/some-api");
    });

    it("should add tenant code prefix for non-api non-platform paths", () => {
      const { SessionContext } = require("../cache/session-context");
      SessionContext.get.mockReturnValue({
        UI_API_PLATFORM_PATHS: "",
        UI_TENANT_CODE: "mytenant",
      });

      const result = normalizeURL("users/list");
      expect(result).toBe("/api/mytenant/users/list");
    });
  });
});
