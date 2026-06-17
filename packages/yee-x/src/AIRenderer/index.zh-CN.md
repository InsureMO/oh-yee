---
title: AIRenderer
description: 为 AI 对话场景设计的动态 UI 渲染系统
nav:
  title: 组件
  path: /components
group:
  title: AI 组件
  order: 1
toc: 'content'
---

# AIRenderer

AIRenderer 是一个专为 AI 对话场景设计的动态 UI 渲染系统。它通过解析标准化的 JSON schema 来生成 React 组件，支持流式更新和增量渲染，特别适用于在聊天应用中创建交互式表单和数据展示界面。

## 核心特性

- 🎯 **声明式 UI 定义**：使用简洁的 JSON 描述 UI 结构
- 🌊 **流式渲染**：支持逐行解析的增量更新，边生成边显示
- 🔗 **数据绑定**：使用 `$data.` 前缀轻松绑定数据
- ⚡ **事件处理**：内置 API 调用和自定义事件支持
- 🎨 **渐进式渲染**：组件未生成时不会崩溃，提供流畅体验
- 🛡️ **错误处理**：内置错误边界和友好的错误提示
- 📘 **TypeScript 支持**：完整的类型定义

## 何时使用

- 需要 AI 在对话中动态生成交互式 UI（表单、卡片、表格等）
- 构建聊天应用，需要在消息气泡中嵌入可交互组件
- 需要支持流式生成 UI，提升用户体验
- 表单提交后需要在同一气泡中显示结果（增量更新）
- 需要在 Markdown 内容中嵌入动态 UI

## 代码演示

<code src="./demo/basic.tsx" title="基础使用" description="展示简单的表单渲染"></code>
<code src="./demo/streaming.tsx" title="流式渲染" description="模拟 AI 流式生成 UI 的过程"></code>
<code src="./demo/progressive.tsx" title="实时进度" description="模拟实时进度"></code>
<code src="./demo/incremental.tsx" title="增量更新" description="表单提交后在同一气泡中显示结果"></code>
<code src="./demo/markdown.tsx" title="Markdown 集成" description="在 Markdown 中嵌入 AI 生成的 UI"></code>
<code src="./demo/comprehensive.tsx" title="综合示例" description="展示所有功能的完整示例"></code>


## API

### AIRenderer Props

| 参数         | 说明           | 类型                                      | 默认值 |
| ------------ | -------------- | ----------------------------------------- | ------ |
| schema       | UI Schema 定义 | `UISchema`                                | -      |
| componentMap | 自定义组件映射 | `Record<string, ComponentMapping>`        | -      |
| onUpdate     | 更新回调       | `(update: Partial<UISchema>) => void`     | -      |
| className    | 容器类名       | `string`                                  | -      |
| style        | 容器样式       | `React.CSSProperties`                     | -      |

### StreamingAIRenderer Props

| 参数             | 说明           | 类型                                  | 默认值  |
| ---------------- | -------------- | ------------------------------------- | ------- |
| content          | 流式内容字符串 | `string`                              | -       |
| isStreaming      | 是否正在流式   | `boolean`                             | `false` |
| componentMap     | 自定义组件映射 | `Record<string, ComponentMapping>`    | -       |
| onUpdate         | 更新回调       | `(update: Partial<UISchema>) => void` | -       |
| loadingComponent | 自定义加载组件 | `React.ReactNode`                     | -       |
| errorComponent   | 自定义错误组件 | `React.ReactNode`                     | -       |
| className        | 容器类名       | `string`                              | -       |
| style            | 容器样式       | `React.CSSProperties`                 | -       |

### UISchema

| 参数       | 说明           | 类型                        | 必填 |
| ---------- | -------------- | --------------------------- | ---- |
| root       | 根组件 ID      | `string`                    | 否   |
| components | 组件定义       | `Record<string, Component>` | 是   |
| data       | 数据模型       | `Record<string, any>`       | 否   |

### Component

| 参数     | 说明         | 类型                          | 必填 |
| -------- | ------------ | ----------------------------- | ---- |
| type     | 组件类型     | `string`                      | 是   |
| props    | 组件属性     | `Record<string, any>`         | 是   |
| children | 子组件 ID 数组 | `string[]`                    | 否   |
| events   | 事件配置     | `Record<string, EventConfig>` | 否   |

### EventConfig

| 参数       | 说明                           | 类型                                      | 必填 |
| ---------- | ------------------------------ | ----------------------------------------- | ---- |
| type       | 事件类型                       | `'api' \| 'update' \| 'custom'`           | 是   |
| url        | API 地址                       | `string`                                  | 否   |
| method     | HTTP 方法                      | `'GET' \| 'POST' \| 'PUT' \| 'DELETE' \| 'PATCH'` | 否   |
| body       | 请求体（支持 $data. 引用）     | `any`                                     | 否   |
| headers    | 请求头                         | `Record<string, string>`                  | 否   |
| updatePath | 数据更新路径（用于 update 类型）| `string`                                  | 否   |
| action     | 自定义动作名称（用于 custom 类型）| `string`                                | 否   |
| payload    | 自定义数据（用于 custom 类型）  | `any`                                     | 否   |

### StreamMessage

| 参数  | 说明     | 类型                                          | 必填 |
| ----- | -------- | --------------------------------------------- | ---- |
| op    | 操作类型 | `'init' \| 'add' \| 'update' \| 'delete' \| 'setData'` | 是   |
| path  | 操作路径 | `string`                                      | 是   |
| value | 值       | `any`                                         | 否   |

## 流式消息格式

AIRenderer 支持 5 种流式操作：

### 1. init - 设置根组件

```json
{"op":"init","path":"root","value":"card-1"}
```

### 2. add - 添加组件

```json
{"op":"add","path":"components.card-1","value":{"type":"card","props":{"title":"Hello"}}}
```

### 3. update - 更新组件

```json
{"op":"update","path":"components.card-1","value":{"type":"card","props":{"title":"Updated"}}}
```

### 4. delete - 删除组件

```json
{"op":"delete","path":"components.card-1"}
```

### 5. setData - 设置数据

```json
{"op":"setData","path":"user.name","value":"John"}
```

## 支持的组件类型

AIRenderer 默认支持以下 yee-c 组件：

### 容器组件

- `card` → Card

### 表单组件

- `form` → Form
- `form-field` → Form.Field
- `input` → Input
- `input-number` → InputNumber
- `textarea` → Textarea
- `select` → Select
- `button` → Button

### 数据展示

- `table` → Table
- `alert` → Alert
- `text` → Text (自定义文本组件)

更多组件支持请查看 `defaultComponentMap.ts`。

## 数据绑定

使用 `$data.` 前缀引用数据模型中的值：

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

支持嵌套路径：`$data.user.profile.address.city`

## 注意事项

1. **组件 ID 唯一性**：确保每个组件的 ID 在 schema 中是唯一的
2. **数据绑定格式**：必须使用 `$data.` 前缀，后跟点号分隔的路径
3. **流式消息格式**：每行必须是一个有效的 JSON 对象
4. **事件处理**：Form 组件使用 `onFinish` 事件，Button 使用 `htmlType="submit"`
5. **错误处理**：解析失败的消息会被跳过，未知组件会显示 fallback
6. **渐进式渲染**：组件引用不存在时会跳过，不会崩溃

## 最佳实践

1. **组件 ID 命名**：使用描述性的 kebab-case 命名，如 `user-form`, `name-field`
2. **数据绑定优先**：优先使用数据绑定而不是硬编码值
3. **错误边界**：使用 `AIRendererErrorBoundary` 包裹组件
4. **增量更新**：避免频繁替换整个 schema，使用流式消息增量更新
5. **类型安全**：使用 TypeScript 类型定义确保类型安全

## 相关链接

- [快速开始指南](./QUICKSTART.md)
- [AI 提示词指南](./prompts/README.md)
- [实现总结](./IMPLEMENTATION_SUMMARY.md)
- [完整 API 文档](./README.md)
