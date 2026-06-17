---
category: Components
title: CodeBlock
subtitle: code block
group:
  title: 文本格式
  order: 3
toc: 'content'
---

# CodeBlock 代码块

用于显示带有操作栏的代码块

### 如何使用
<code src="./demo/basic.tsx" title="基础使用" description="带有操作栏的代码块"></code>

### API

### SemanticDOM

| 类型 |
|------|
| `'header' | 'content'` |

### CodeBlockProps

| 属性名       | 类型               | 描述         | 默认值 |
|------------|---------------------|------------|--------|
| prefixCls  | `string`            | 自定义类名前缀 | -      |
| className  | `string`                | 自定义根类名   | -      |
| style      | `React.CSSProperties`   | 自定义根行内样式 | -      |
| classNames| `Partial<Record<SemanticDOM, string>>`      | 语义化类名   | -      |
| styles     | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义化行内样式 | -     |
| code       | `string \| React.ReactNode`  | 代码内容     | -      |
| language   | `string`                     | 代码语言     | -      |