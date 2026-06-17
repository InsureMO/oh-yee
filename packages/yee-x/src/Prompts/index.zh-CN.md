---
category: Components
title: Prompts
subtitle: 提示集
group:
  title: 提示
  order: 1
toc: 'content'
---

### 代码演示
<code src="./demo/basic.tsx" title="基础使用"></code>

### API

### PromptProps

| 属性名       | 类型                                     | 描述         | 默认值 |
|------------|-------------------------------------------|------------|--------|
| key        | `string \| number`                        | 唯一标识     | -      |
| icon       | `React.ReactNode`                         | 图标         | -      |
| label      | `React.ReactNode`                         | 标题         | -      |
| description| `React.ReactNode`                         | 描述         | -      |
| children   | `Array<PromptProps>`                      | 嵌套提示词   | -      |
| onClick    | `(info: { data: Omit<PromptProps, 'onClick'> }) => void`|点击事件 | - |

### PromptsProps

| 属性名       | 类型                                    | 描述         | 默认值    |
|------------|------------------------------------------|--------------|----------|
| prefixCls  | `string`                                 | 样式类名前缀  |    -     |
| className  | `string`                                 | 自定义根类名   |    -     |
| style      | `React.CSSProperties`                    | 自定义根样式   |    -     |
| classNames | `Partial<Record<SemanticType, string>>`  | 各组成部分的类名 |   -   |
| styles     | `Partial<Record<SemanticType, React.CSSProperties>>` | 各组成部分的行类样式 | -  |
| title      | `React.ReactNode`                        | 标题          | -        |
| items      | `Array<PromptProps>`                     | 提示项列表    | -        |
| direction  | `'horizontal' \| 'vertical'`             | 布局方向      | `'horizontal'` |
| wrap       | `boolean`                                | 是否允许换行  | -        |
| onItemClick | `(info: { data: PromptProps }) => void` | 点击提示项时的回调函数 | -   |

### SemanticType

| 类型 |
|------|
| `'item' \| 'title' \| 'list'` |