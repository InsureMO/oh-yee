/**
 * Security utility functions for escaping and encoding
 * @ohdule security-utils
 */

/**
 * HTML entity map for escaping
 */
const HTML_ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

/**
 * Reverse HTML entity map for unescaping
 */
const OPPOSITE_HTML_ENTITY_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#x2F;": "/",
};

/**
 * OWASP Guidelines: Escapes HTML special characters
 * @param text - The text to escape
 * @returns The escaped text
 * @example
 * ```ts
 * escapeHTML('<script>alert("XSS")</script>')
 * // '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
 * ```
 */
export function escapeHTML(text: string): string {
  const HTML_CHARACTERS_EXPRESSION = /[&"'<>/]/gm;
  return text.replace(
    HTML_CHARACTERS_EXPRESSION,
    (c) => HTML_ENTITY_MAP[c] ?? c,
  );
}

/**
 * Unescapes HTML entities
 * @param text - The text to unescape
 * @returns The unescaped text
 * @example
 * ```ts
 * unescapeHTML('&lt;div&gt;') // '<div>'
 * ```
 */
export function unescapeHTML(text: string): string {
  const OPPOSITE_HTML_CHARACTERS_EXPRESSION = /&(?:amp|lt|gt|quot|#x27|#x2F);/g;
  return text.replace(
    OPPOSITE_HTML_CHARACTERS_EXPRESSION,
    (c) => OPPOSITE_HTML_ENTITY_MAP[c] ?? c,
  );
}

/**
 * OWASP Guidelines: Escapes all non-alphanumeric characters in ASCII space for HTML attributes
 * @param text - The text to escape
 * @returns The escaped text
 * @example
 * ```ts
 * escapeHTMLAttribute('value="test"') // 'value&#x3D;&#x22;test&#x22;'
 * ```
 */
export function escapeHTMLAttribute(text: string): string {
  const HTML_ATTRIBUTE_CHARACTERS_EXPRESSION =
    /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]/gm;
  return text.replace(HTML_ATTRIBUTE_CHARACTERS_EXPRESSION, (c) => {
    return (
      HTML_ENTITY_MAP[c] ??
      "&#x" + ("00" + c.charCodeAt(0).toString(16)).slice(-2) + ";"
    );
  });
}

/**
 * OWASP Guidelines: Encodes JavaScript identifier by escaping all non-alphanumeric characters
 * @param text - The text to encode
 * @returns The encoded text
 * @example
 * ```ts
 * encodeJavaScriptIdentifier('alert("test")') // 'alert\\u0028\\u0022test\\u0022\\u0029'
 * ```
 */
export function encodeJavaScriptIdentifier(text: string): string {
  const JAVASCRIPT_CHARACTERS_EXPRESSION =
    /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF\u2028\u2029]/gm;
  return text.replace(JAVASCRIPT_CHARACTERS_EXPRESSION, (c) => {
    return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
  });
}

/**
 * Encodes a JavaScript string with quotes
 * @param text - The text to encode
 * @returns The encoded string with quotes
 * @example
 * ```ts
 * encodeJavaScriptString('test') // '"test"'
 * ```
 */
export function encodeJavaScriptString(text: string): string {
  return '"' + encodeJavaScriptIdentifier(text) + '"';
}

/**
 * Encodes JavaScript data (objects) safely
 * @param data - The data to encode
 * @returns The encoded JSON string
 * @example
 * ```ts
 * encodeJavaScriptData({ name: 'test' }) // '{"name":"test"}'
 * ```
 */
export function encodeJavaScriptData(data: unknown): string {
  const JSON_STRING_LITERAL_EXPRESSION = /"(?:\\.|[^"])*"/gm;
  return JSON.stringify(data).replace(JSON_STRING_LITERAL_EXPRESSION, (str) => {
    return encodeJavaScriptString(JSON.parse(str) as string);
  });
}

/**
 * OWASP Guidelines: Encodes CSS identifier by escaping all non-alphanumeric characters
 * @param text - The text to encode
 * @returns The encoded text
 * @example
 * ```ts
 * encodeCSSIdentifier('my-class') // 'my\\00002dclass'
 * ```
 */
export function encodeCSSIdentifier(text: string): string {
  const CSS_CHARACTERS_EXPRESSION = /[\x00-\x2F\x3A-\x40\x5B-\x60\x7B-\xFF]/gm;
  return text.replace(CSS_CHARACTERS_EXPRESSION, (c) => {
    return "\\" + ("000000" + c.charCodeAt(0).toString(16)).slice(-6);
  });
}

/**
 * Encodes a CSS string with quotes
 * @param text - The text to encode
 * @returns The encoded string with quotes
 * @example
 * ```ts
 * encodeCSSString('my-class') // '"my\\00002dclass"'
 * ```
 */
export function encodeCSSString(text: string): string {
  return '"' + encodeCSSIdentifier(text) + '"';
}
