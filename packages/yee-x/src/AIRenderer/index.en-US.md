---
title: AIRenderer
description: Dynamic UI rendering system designed for AI conversation scenarios
nav:
  title: Components
  path: /components
group:
  title: AI Components
  order: 2
toc: 'content'
---

# AIRenderer

AIRenderer is a dynamic UI rendering system designed specifically for AI conversation scenarios. It generates React components by parsing standardized JSON schemas, supports streaming updates and incremental rendering, and is particularly suitable for creating interactive forms and data display interfaces in chat applications.

## Core Features

- 🎯 **Declarative UI Definition**: Describe UI structure using concise JSON
- 🌊 **Streaming Rendering**: Supports line-by-line incremental updates, render as you generate
- 🔗 **Data Binding**: Easily bind data using `$data.` prefix
- ⚡ **Event Handling**: Built-in API calls and custom event support
- 🎨 **Progressive Rendering**: Won't crash when components aren't generated yet, provides smooth experience
- 🛡️ **Error Handling**: Built-in error boundaries and friendly error messages
- 📘 **TypeScript Support**: Complete type definitions

## When to Use

- AI needs to dynamically generate interactive UIs in conversations (forms, cards, tables, etc.)
- Building chat applications that need to embed interactive components in message bubbles
- Need to support streaming UI generation for better user experience
- Display results in the same bubble after form submission (incremental updates)
- Need to embed dynamic UIs in Markdown content

## Examples

<code src="./demo/basic.tsx" title="Basic Usage" description="Simple form rendering"></code>
<code src="./demo/streaming.tsx" title="Streaming Rendering" description="Simulate AI streaming UI generation"></code>
<code src="./demo/progressive.tsx" title="Real-time Progress" description="Simulate real-time progress"></code>
<code src="./demo/incremental.tsx" title="Incremental Updates" description="Display results in the same bubble after form submission"></code>
<code src="./demo/markdown.tsx" title="Markdown Integration" description="Embed AI-generated UI in Markdown"></code>
<code src="./demo/comprehensive.tsx" title="Comprehensive Example" description="Complete example showing all features"></code>

## API

### AIRenderer Props

| Property     | Description              | Type                                  | Default |
| ------------ | ------------------------ | ------------------------------------- | ------- |
| schema       | UI Schema definition     | `UISchema`                            | -       |
| componentMap | Custom component mapping | `Record<string, ComponentMapping>`    | -       |
| onUpdate     | Update callback          | `(update: Partial<UISchema>) => void` | -       |
| className    | Container class name     | `string`                              | -       |
| style        | Container style          | `React.CSSProperties`                 | -       |

### StreamingAIRenderer Props

| Property         | Description              | Type                                  | Default |
| ---------------- | ------------------------ | ------------------------------------- | ------- |
| content          | Streaming content string | `string`                              | -       |
| isStreaming      | Is streaming             | `boolean`                             | `false` |
| componentMap     | Custom component mapping | `Record<string, ComponentMapping>`    | -       |
| onUpdate         | Update callback          | `(update: Partial<UISchema>) => void` | -       |
| loadingComponent | Custom loading component | `React.ReactNode`                     | -       |
| errorComponent   | Custom error component   | `React.ReactNode`                     | -       |
| className        | Container class name     | `string`                              | -       |
| style            | Container style          | `React.CSSProperties`                 | -       |

### UISchema

| Property   | Description        | Type                        | Required |
| ---------- | ------------------ | --------------------------- | -------- |
| root       | Root component ID  | `string`                    | No       |
| components | Component definitions | `Record<string, Component>` | Yes      |
| data       | Data model         | `Record<string, any>`       | No       |

### Component

| Property | Description          | Type                          | Required |
| -------- | -------------------- | ----------------------------- | -------- |
| type     | Component type       | `string`                      | Yes      |
| props    | Component properties | `Record<string, any>`         | Yes      |
| children | Child component IDs  | `string[]`                    | No       |
| events   | Event configuration  | `Record<string, EventConfig>` | No       |

### EventConfig

| Property   | Description                           | Type                                      | Required |
| ---------- | ------------------------------------- | ----------------------------------------- | -------- |
| type       | Event type                            | `'api' \| 'update' \| 'custom'`           | Yes      |
| url        | API URL                               | `string`                                  | No       |
| method     | HTTP method                           | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH'` | No       |
| body       | Request body (supports $data.)        | `any`                                     | No       |
| headers    | Request headers                       | `Record<string, string>`                  | No       |
| updatePath | Data update path (for update type)    | `string`                                  | No       |
| action     | Custom action name (for custom type)  | `string`                                  | No       |
| payload    | Custom data (for custom type)         | `any`                                     | No       |

### StreamMessage

| Property | Description    | Type                                          | Required |
| -------- | -------------- | --------------------------------------------- | -------- |
| op       | Operation type | `'init' \| 'add' \| 'update' \| 'delete' \| 'setData'` | Yes      |
| path     | Operation path | `string`                                      | Yes      |
| value    | Value          | `any`                                         | No       |

## Stream Message Format

AIRenderer supports 5 streaming operations:

### 1. init - Set root component

```json
{"op":"init","path":"root","value":"card-1"}
```

### 2. add - Add component

```json
{"op":"add","path":"components.card-1","value":{"type":"card","props":{"title":"Hello"}}}
```

### 3. update - Update component

```json
{"op":"update","path":"components.card-1","value":{"type":"card","props":{"title":"Updated"}}}
```

### 4. delete - Delete component

```json
{"op":"delete","path":"components.card-1"}
```

### 5. setData - Set data

```json
{"op":"setData","path":"user.name","value":"John"}
```

## Supported Component Types

AIRenderer supports the following yee-c components by default:

### Container Components

- `card` → Card

### Form Components

- `form` → Form
- `form-field` → Form.Field
- `input` → Input
- `input-number` → InputNumber
- `textarea` → Textarea
- `select` → Select
- `button` → Button

### Data Display

- `table` → Table
- `alert` → Alert
- `text` → Text (custom text component)

For more component support, see `defaultComponentMap.ts`.

## Data Binding

Use `$data.` prefix to reference values in the data model:

```json
{
  "props": {
    "content": "$data.user.name",
    "title": "$data.page.title"
  },
  "data": {
    "user": { "name": "John" },
    "page": { "title": "Welcome" }
  }
}
```

Supports nested paths: `$data.user.profile.address.city`

## Notes

1. **Component ID Uniqueness**: Ensure each component ID is unique within the schema
2. **Data Binding Format**: Must use `$data.` prefix followed by dot-separated path
3. **Stream Message Format**: Each line must be a valid JSON object
4. **Event Handling**: Form components use `onFinish` event, Button uses `htmlType="submit"`
5. **Error Handling**: Failed messages are skipped, unknown components show fallback
6. **Progressive Rendering**: Skips non-existent component references without crashing

## Best Practices

1. **Component ID Naming**: Use descriptive kebab-case names like `user-form`, `name-field`
2. **Data Binding First**: Prefer data binding over hardcoded values
3. **Error Boundaries**: Wrap components with `AIRendererErrorBoundary`
4. **Incremental Updates**: Avoid frequent full schema replacement, use streaming messages
5. **Type Safety**: Use TypeScript type definitions for type safety

## Related Links

- [Quick Start Guide](./QUICKSTART.md)
- [AI Prompts Guide](./prompts/README.md)
- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)
- [Complete API Documentation](./README.md)
