/**
 * I18n utils test file
 */

import { I18nUtils } from "../i18n-utils";
import { configer } from "../../config/config-provider";

// Mock sessionStorage and localStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Mock global objects
(global as any).sessionStorage = mockSessionStorage;
(global as any).localStorage = mockLocalStorage;

// Mock window object
(global as any).window = {
  buildKey: jest.fn((url: string) => btoa(url).replace(/[^a-zA-Z0-9]/g, "")),
  currentUrl: "http://localhost:3000/test",
  location: {
    pathname: "/test",
    search: "?param=value",
  },
};

describe("I18nUtils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    configer.reset();
  });

  describe("getSystemI18N", () => {
    test("should return language from sessionStorage", () => {
      mockSessionStorage.getItem.mockReturnValue("zh_CN");

      const result = I18nUtils.getSystemI18N();

      expect(result).toBe("zh_CN");
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith("system_i18nKey");
    });

    test("should return language from localStorage", () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      mockLocalStorage.getItem.mockReturnValue("ja_JP");

      const result = I18nUtils.getSystemI18N();

      expect(result).toBe("ja_JP");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("system_i18nKey");
    });

    test("should return default language and save to sessionStorage", () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = I18nUtils.getSystemI18N();

      expect(result).toBe("en_US");
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        "system_i18nKey",
        "en_US",
      );
    });

    test("should use configured default language", () => {
      configer.setConfig({
        i18n: {
          defaultLocale: "fr_FR",
        },
      });

      mockSessionStorage.getItem.mockReturnValue(null);
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = I18nUtils.getSystemI18N();

      expect(result).toBe("fr_FR");
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        "system_i18nKey",
        "fr_FR",
      );
    });
  });

  describe("setSystemI18N", () => {
    test("should set language to sessionStorage", () => {
      I18nUtils.setSystemI18N("ko_KR");

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        "system_i18nKey",
        "ko_KR",
      );
    });

    test("should use configured storage key", () => {
      configer.setConfig({
        i18n: {
          storageKey: "custom_lang_key",
        },
      });

      I18nUtils.setSystemI18N("es_ES");

      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        "custom_lang_key",
        "es_ES",
      );
    });
  });

  describe("format", () => {
    test("should format message correctly", () => {
      const result = I18nUtils.format(
        "Hello {0}, you have {1} messages",
        "John",
        5,
      );

      expect(result).toBe("Hello John, you have 5 messages");
    });

    test("should handle multiple identical placeholders", () => {
      const result = I18nUtils.format("{0} + {0} = {1}", 2, 4);

      expect(result).toBe("2 + 2 = 4");
    });

    test("should handle empty message", () => {
      const result = I18nUtils.format("", "test");

      expect(result).toBe("MSG Not Found");
    });

    test("should handle null message", () => {
      const result = I18nUtils.format(null as any, "test");

      expect(result).toBe("MSG Not Found");
    });

    test("should handle insufficient arguments", () => {
      const result = I18nUtils.format(
        "Hello {0}, you have {1} messages",
        "John",
      );

      expect(result).toBe("Hello John, you have {1} messages");
    });

    test("should handle extra arguments", () => {
      const result = I18nUtils.format("Hello {0}", "John", "Extra");

      expect(result).toBe("Hello John");
    });

    test("should handle different argument types", () => {
      const result = I18nUtils.format(
        "User {0}, Age {1}, Active {2}",
        "John",
        25,
        true,
      );

      expect(result).toBe("User John, Age 25, Active true");
    });
  });

  describe("formatObject", () => {
    test("should split message and objects correctly", () => {
      const button = { type: "button", text: "Click" };
      const result = I18nUtils.formatObject("Please {0} to continue", button);

      expect(result).toEqual(["Please ", button, " to continue"]);
    });

    test("should handle multiple objects", () => {
      const button = { type: "button" };
      const link = { type: "link" };
      const result = I18nUtils.formatObject("Click {0} or {1}", button, link);

      expect(result).toEqual(["Click ", button, " or ", link, ""]);
    });

    test("should handle empty message", () => {
      const result = I18nUtils.formatObject("", "test");

      expect(result).toEqual(["MSG Not Found"]);
    });

    test("should handle message without placeholders", () => {
      const result = I18nUtils.formatObject("No placeholders here", "unused");

      expect(result).toEqual(["No placeholders here"]);
    });
  });

  describe("getMessage", () => {
    test("should return original message", () => {
      const result = I18nUtils.getMessage("Hello World");

      expect(result).toBe("Hello World");
    });

    test("should handle null", () => {
      const result = I18nUtils.getMessage(null);

      expect(result).toBe("MSG Not Found");
    });

    test("should handle undefined", () => {
      const result = I18nUtils.getMessage(undefined);

      expect(result).toBe("MSG Not Found");
    });

    test("should handle empty string", () => {
      const result = I18nUtils.getMessage("");

      expect(result).toBe("");
    });
  });

  describe("config integration", () => {
    test("should use configured storage key", () => {
      configer.setConfig({
        i18n: {
          storageKey: "my_lang_key",
        },
      });

      mockSessionStorage.getItem.mockReturnValue(null);
      mockLocalStorage.getItem.mockReturnValue(null);

      I18nUtils.getSystemI18N();

      expect(mockSessionStorage.getItem).toHaveBeenCalledWith("my_lang_key");
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith("my_lang_key");
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        "my_lang_key",
        "en_US",
      );
    });

    test("should use configured default language", () => {
      configer.setConfig({
        i18n: {
          defaultLocale: "de_DE",
        },
      });

      mockSessionStorage.getItem.mockReturnValue(null);
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = I18nUtils.getSystemI18N();

      expect(result).toBe("de_DE");
    });
  });

  describe("edge cases", () => {
    test("should handle placeholders with special characters", () => {
      const result = I18nUtils.format("Price: ${0} (${1}% off)", "99.99", "20");

      expect(result).toBe("Price: $99.99 ($20% off)");
    });

    test("should handle many placeholders", () => {
      const template = Array.from({ length: 10 }, (_, i) => `{${i}}`).join(" ");
      const args = Array.from({ length: 10 }, (_, i) => `arg${i}`);
      const expected = args.join(" ");

      const result = I18nUtils.format(template, ...args);

      expect(result).toBe(expected);
    });

    test("should handle nested braces", () => {
      const result = I18nUtils.format("Object: {{key: {0}}}", "value");

      expect(result).toBe("Object: {{key: value}}");
    });
  });
});

describe("type safety", () => {
  test("format should accept arguments of any type", () => {
    const obj = { name: "test" };
    const arr = [1, 2, 3];
    const date = new Date("2024-01-01");

    const result = I18nUtils.format(
      "Object: {0}, Array: {1}, Date: {2}",
      obj,
      arr,
      date,
    );

    expect(result).toContain("[object Object]");
    expect(result).toContain("1,2,3");
    expect(result).toContain("2024");
  });

  test("formatObject should preserve object type", () => {
    const button = { type: "button", onClick: jest.fn() };
    const result = I18nUtils.formatObject("Click {0}", button);

    expect(result[1]).toBe(button);
    expect(typeof result[1]).toBe("object");
    expect(result[1].onClick).toBe(button.onClick);
  });
});
