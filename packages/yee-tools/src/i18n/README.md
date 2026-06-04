# YeeTools I18n - Internationalization Toolkit

A powerful internationalization toolkit that provides comprehensive multi-language support, message formatting, cache management, and more.

## Features

- 🌍 **Multi-language Support** - Supports any language and locale settings
- 📝 **Message Formatting** - Supports placeholder replacement and object formatting
- 💾 **Smart Caching** - Multi-level caching strategy for improved performance
- 🔧 **Highly Configurable** - Flexible configuration options
- 🚀 **TypeScript Support** - Complete type definitions
- 🔌 **API Integration** - Supports multiple backend API formats
- ⚡ **Lightweight** - No external dependencies

## Installation

```bash
npm install @rainbow-oh/yee-tools
# or
yarn add @rainbow-oh/yee-tools
# or
pnpm add @rainbow-oh/yee-tools
```

## Quick Start

### Basic Configuration

```typescript
import { configer, I18nUtils } from "@rainbow-oh/yee-tools";

// Configure I18n settings
configer.setConfig({
  i18n: {
    defaultLocale: "en_US",
    storageKey: "system_i18nKey",
    configurationGroup: ["common", "validation", "error"],
    cache: true,
  },
  http: {
    baseUrl: "https://api.example.com",
  },
});
```

### Basic Usage

```typescript
import { I18nUtils } from "@rainbow-oh/yee-tools/i18n";

// Get system language
const lang = I18nUtils.getSystemI18N();
console.log(lang); // 'en_US'

// Set system language
I18nUtils.setSystemI18N("zh_CN");

// Message formatting
const message = I18nUtils.format("Hello {0}, you have {1} messages", "John", 5);
console.log(message); // 'Hello John, you have 5 messages'
```

## API Documentation

### Core Methods

#### `I18nUtils.getSystemI18N()`

Gets the system default language setting.

```typescript
const lang = I18nUtils.getSystemI18N();
// Returns: 'en_US' | 'zh_CN' | other language codes
```

#### `I18nUtils.setSystemI18N(value)`

Sets the system language.

```typescript
I18nUtils.setSystemI18N("zh_CN");
```

**Parameters:**

- `value: string` - Language code (e.g. 'en_US', 'zh_CN')

#### `I18nUtils.getUserLang(langUrl, isLogin?)`

Gets the user language setting (requires API support).

```typescript
const userLang = I18nUtils.getUserLang("/api/user/language");
```

**Parameters:**

- `langUrl: string` - API URL for fetching the user language
- `isLogin?: boolean` - Whether the user is logged in

#### `I18nUtils.getI18nData(lang, i18nUrl)`

Gets internationalization data (requires API support).

```typescript
const i18nData = I18nUtils.getI18nData("en_US", "/api/i18n");
```

**Parameters:**

- `lang: string` - Language code
- `i18nUrl: string` - Internationalization data API URL

#### `I18nUtils.getDiMoI18nData(lang, i18nUrl)`

Gets internationalization data in DiMo format (requires API support).

```typescript
const dimoData = I18nUtils.getDiMoI18nData("en_US", "/api/dimo/i18n");
```

### Message Formatting

#### `I18nUtils.format(message, ...args)`

Formats a message with placeholder replacement.

```typescript
const msg = I18nUtils.format("Hello {0}, you have {1} messages", "John", 5);
// Returns: 'Hello John, you have 5 messages'

// Supports multiple data types
const orderMsg = I18nUtils.format(
  "Order #{0} for ${1} has been {2}",
  "ORD-12345",
  99.99,
  "confirmed",
);
```

**Parameters:**

- `message: string` - Message template containing placeholders
- `...args: any[]` - Replacement parameters

#### `I18nUtils.formatObject(message, ...args)`

Formats an object message, returning an array containing text and objects.

```typescript
const button = { type: "button", text: "Click me" };
const elements = I18nUtils.formatObject("Please {0} to continue", button);
// Returns: ['Please ', button, ' to continue']
```

This is particularly useful for React components:

```typescript
const LinkComponent = ({ href, children }) => <a href={href}>{children}</a>;
const link = <LinkComponent href="/terms">Terms of Service</LinkComponent>;

const elements = I18nUtils.formatObject(
  "By continuing, you agree to our {0}",
  link,
);
// These elements can be used directly in JSX
```

#### `I18nUtils.getMessage(message)`

Processes a message, ensuring it does not return null or undefined.

```typescript
const msg = I18nUtils.getMessage(null);
// Returns: 'MSG Not Found'
```

## Configuration Options

### I18n Configuration

```typescript
configer.setConfig({
  i18n: {
    // Default language
    defaultLocale: "en_US",

    // Storage key name
    storageKey: "system_i18nKey",

    // Configuration groups (used for API requests)
    configurationGroup: ["common", "validation", "error"],

    // Whether to enable caching
    cache: true,
  },
});
```

### HTTP Configuration

```typescript
configer.setConfig({
  http: {
    // API base URL
    baseUrl: "https://api.example.com",

    // Request timeout
    timeout: 10000,

    // Default request headers
    headers: {
      "X-App-Version": "1.0.0",
    },
  },
});
```

## Usage Examples

### React Component Integration

```typescript
import React from "react";
import { I18nUtils } from "@rainbow-oh/yee-tools/i18n";

const WelcomeMessage = ({ username, messageCount }) => {
  const message = I18nUtils.format(
    "Welcome back {0}! You have {1} new messages.",
    username,
    messageCount,
  );

  return <div>{message}</div>;
};

// Using object formatting to create complex messages
const TermsMessage = () => {
  const link = <a href="/terms">Terms of Service</a>;
  const button = <button onClick={handleSignup}>Sign Up</button>;

  const elements = I18nUtils.formatObject(
    "By clicking {0}, you agree to our {1}",
    button,
    link,
  );

  return <div>{elements}</div>;
};
```

### Vue Component Integration

```vue
<template>
  <div>
    <p>{{ welcomeMessage }}</p>
    <div v-for="(element, index) in termsElements" :key="index">
      <span v-if="typeof element === 'string'">{{ element }}</span>
      <component v-else :is="element.component" v-bind="element.props" />
    </div>
  </div>
</template>

<script>
import { I18nUtils } from "@rainbow-oh/yee-tools/i18n";

export default {
  props: ["username", "messageCount"],
  computed: {
    welcomeMessage() {
      return I18nUtils.format(
        "Welcome {0}! You have {1} messages.",
        this.username,
        this.messageCount,
      );
    },
    termsElements() {
      const linkComponent = {
        component: "router-link",
        props: { to: "/terms" },
      };

      return I18nUtils.formatObject(
        "Please read our {0} before continuing",
        linkComponent,
      );
    },
  },
};
</script>
```

### Multi-language Switching

```typescript
import { I18nUtils } from "@rainbow-oh/yee-tools/i18n";

class LanguageManager {
  private supportedLanguages = [
    { code: "en_US", name: "English" },
    { code: "zh_CN", name: "中文" },
    { code: "ja_JP", name: "日本語" },
    { code: "ko_KR", name: "한국어" },
  ];

  getCurrentLanguage() {
    return I18nUtils.getSystemI18N();
  }

  switchLanguage(langCode: string) {
    I18nUtils.setSystemI18N(langCode);

    // Reload internationalization data
    this.loadI18nData(langCode);

    // Trigger UI update
    this.notifyLanguageChange(langCode);
  }

  private async loadI18nData(langCode: string) {
    try {
      const data = I18nUtils.getI18nData(langCode, "/api/i18n");
      // Process loaded data
      console.log("Loaded i18n data for", langCode, data);
    } catch (error) {
      console.error("Failed to load i18n data:", error);
    }
  }

  private notifyLanguageChange(langCode: string) {
    // Dispatch custom event
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("languageChanged", {
          detail: { language: langCode },
        }),
      );
    }
  }
}
```

### Cache Management

```typescript
import { I18nUtils, LocalContext, PageContext } from "@rainbow-oh/yee-tools";

class I18nCacheManager {
  // Clear cache for a specific language
  clearLanguageCache(lang: string) {
    const projectPathKey = this.buildProjectPathKey();
    const cacheKey = `i18n_Cache_${lang}_${projectPathKey}`;

    LocalContext.remove(cacheKey);
    PageContext.remove(cacheKey);
  }

  // Clear all I18n caches
  clearAllCache() {
    const keys = LocalContext.keys();
    keys.forEach((key) => {
      if (key.startsWith("i18n_Cache_")) {
        LocalContext.remove(key);
      }
    });
  }

  // Preload multi-language data
  async preloadLanguages(languages: string[]) {
    const promises = languages.map((lang) =>
      I18nUtils.getI18nData(lang, "/api/i18n"),
    );

    try {
      await Promise.all(promises);
      console.log("All languages preloaded");
    } catch (error) {
      console.error("Failed to preload languages:", error);
    }
  }

  private buildProjectPathKey(): string {
    // Implement project path key building logic
    return "default";
  }
}
```

## Error Handling

```typescript
import { I18nUtils } from "@rainbow-oh/yee-tools/i18n";

// Safe message formatting
function safeFormat(template: string, ...args: any[]): string {
  try {
    return I18nUtils.format(template, ...args);
  } catch (error) {
    console.error("Message formatting failed:", error);
    return template; // Return the original template
  }
}

// Message retrieval with fallback
function getMessageWithFallback(
  key: string,
  fallback: string = "Message not found",
): string {
  const message = I18nUtils.getMessage(key);
  return message === "MSG Not Found" ? fallback : message;
}
```

## Best Practices

### 1. Message Key Naming Conventions

```typescript
// Recommended naming conventions
const messages = {
  "common.welcome": "Welcome {0}!",
  "validation.required": "This field is required",
  "error.network": "Network error occurred",
  "success.saved": "Data saved successfully",
};
```

### 2. Componentized Messages

```typescript
// Create reusable message components
const createMessage =
  (template: string) =>
  (...args: any[]) =>
    I18nUtils.format(template, ...args);

const welcomeMessage = createMessage("Welcome {0}! You have {1} messages.");
const orderMessage = createMessage("Order #{0} for ${1} has been {2}.");

// Usage
console.log(welcomeMessage("John", 5));
console.log(orderMessage("ORD-123", "99.99", "confirmed"));
```

### 3. Type-safe Messages

```typescript
// Define message types
interface MessageTemplates {
  welcome: [username: string, messageCount: number];
  order: [orderId: string, amount: string, status: string];
}

// Type-safe formatting function
function formatMessage<K extends keyof MessageTemplates>(
  key: K,
  template: string,
  ...args: MessageTemplates[K]
): string {
  return I18nUtils.format(template, ...args);
}
```

## Browser Compatibility

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79
- IE >= 11

## License

MIT License

## Contributing

Issues and Pull Requests are welcome!
