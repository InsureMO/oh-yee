import {
  escapeHTML,
  unescapeHTML,
  escapeHTMLAttribute,
  encodeJavaScriptIdentifier,
  encodeJavaScriptString,
  encodeCSSIdentifier,
  encodeCSSString,
} from "../security/security-utils";

describe("Security Utils", () => {
  describe("escapeHTML", () => {
    it("should escape HTML special characters", () => {
      expect(escapeHTML("<div>Hello</div>")).toBe(
        "&lt;div&gt;Hello&lt;&#x2F;div&gt;",
      );
      expect(escapeHTML("Tom & Jerry")).toBe("Tom &amp; Jerry");
      expect(escapeHTML('"Hello"')).toBe("&quot;Hello&quot;");
      expect(escapeHTML("It's")).toBe("It&#x27;s");
    });

    it("should handle XSS attempts", () => {
      const xss = '<script>alert("XSS")</script>';
      const escaped = escapeHTML(xss);
      expect(escaped).toBe(
        "&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;",
      );
    });

    it("should handle strings without special characters", () => {
      expect(escapeHTML("Hello World")).toBe("Hello World");
    });
  });

  describe("unescapeHTML", () => {
    it("should unescape HTML entities", () => {
      expect(unescapeHTML("&lt;div&gt;")).toBe("<div>");
      expect(unescapeHTML("Tom &amp; Jerry")).toBe("Tom & Jerry");
      expect(unescapeHTML("&quot;Hello&quot;")).toBe('"Hello"');
      expect(unescapeHTML("It&#x27;s")).toBe("It's");
    });

    it("should handle mixed content", () => {
      const escaped = "&lt;div&gt;Hello &amp; Goodbye&lt;&#x2F;div&gt;";
      expect(unescapeHTML(escaped)).toBe("<div>Hello & Goodbye</div>");
    });
  });

  describe("escapeHTMLAttribute", () => {
    it("should escape HTML attribute values", () => {
      const result = escapeHTMLAttribute('value="test"');
      expect(result).toContain("&#x");
    });

    it("should handle special characters", () => {
      const result = escapeHTMLAttribute("<script>");
      expect(result).not.toContain("<");
      expect(result).not.toContain(">");
    });
  });

  describe("encodeJavaScriptIdentifier", () => {
    it("should encode JavaScript identifiers", () => {
      const result = encodeJavaScriptIdentifier('alert("test")');
      expect(result).toContain("\\u");
      expect(result).not.toContain("(");
      expect(result).not.toContain(")");
    });

    it("should handle alphanumeric characters", () => {
      const result = encodeJavaScriptIdentifier("abc123");
      expect(result).toBe("abc123");
    });
  });

  describe("encodeJavaScriptString", () => {
    it("should encode JavaScript string with quotes", () => {
      const result = encodeJavaScriptString("test");
      expect(result).toMatch(/^".*"$/);
    });

    it("should handle special characters", () => {
      const result = encodeJavaScriptString("alert()");
      expect(result).toContain("\\u");
    });
  });

  describe("encodeCSSIdentifier", () => {
    it("should encode CSS identifiers", () => {
      const result = encodeCSSIdentifier("my-class");
      expect(result).toContain("\\");
    });

    it("should handle alphanumeric characters", () => {
      const result = encodeCSSIdentifier("abc123");
      expect(result).toBe("abc123");
    });
  });

  describe("encodeCSSString", () => {
    it("should encode CSS string with quotes", () => {
      const result = encodeCSSString("my-class");
      expect(result).toMatch(/^".*"$/);
    });

    it("should handle special characters", () => {
      const result = encodeCSSString("test:hover");
      expect(result).toContain("\\");
    });
  });
});
