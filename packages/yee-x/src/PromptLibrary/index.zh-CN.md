---
category: Components
title: PromptLibrary
subtitle: 提示词模板库
group:
  title: 输入
  order: 2
toc: 'content'
---

## PromptLibrary 提示词模板库
带变量的 prompt 模板库：上方模板列表，选中模板的正文以行内输入框形式嵌入句子（`{{变量}}` 语法），变量直接在句中填写，下方实时组装最终 prompt，全部填齐后 Use 按钮可用并触发 `onUse`。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用" description="句中填变量、实时组装、填齐后使用"></code>

### API

### PromptTemplate

| 属性名 | 类型 | 描述 |
|------------|------------------|------------|
| id | `string` | 唯一标识 |
| title | `React.ReactNode` | 模板标题 |
| template | `string` | 模板正文，变量用 `{{name}}` 语法 |
| icon | `React.ReactNode` | 图标 |
| description | `React.ReactNode` | 一行描述 |

### PromptLibrarySemanticType

| 类型 |
|------|
| `'root' \| 'list' \| 'item' \| 'item-icon' \| 'item-main' \| 'item-title' \| 'item-desc' \| 'editor' \| 'var-input' \| 'preview' \| 'preview-label' \| 'preview-text' \| 'footer' \| 'use-btn'` |

### PromptLibraryProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-prompt-library` |
| className / style | - | 自定义根类名/样式 | |
| classNames / styles | `Partial<Record<PromptLibrarySemanticType, …>>` | 语义化类名/样式 | |
| templates | `PromptTemplate[]` | 模板列表 | |
| value | `string` | 受控选中模板 id | |
| defaultId | `string` | 非受控初始选中 | `templates[0].id` |
| onSelect | `(template) => void` | 选中模板回调（非受控 values 同时重置） | |
| values | `Record<string, string>` | 受控变量值（键为变量名） | |
| defaultValues | `Record<string, string>` | 非受控初始变量值 | |
| onValuesChange | `(values, template) => void` | 变量输入变化回调 | |
| onUse | `(prompt, template) => void` | 全部变量填齐后由 Use 按钮触发，携带组装好的 prompt | |
| showPreview | `boolean` | 是否显示组装预览 | `true` |
| showList | `boolean` | 是否显示模板列表（单模板模式可关） | `true` |
| locale | `PromptLibraryLocale` | 内置文案覆盖 | |
