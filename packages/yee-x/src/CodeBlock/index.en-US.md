---
category: Components
title: CodeBlock
subtitle: Code Block
group:
  title: Text Formatting
  order: 3
toc: 'content'
---

# CodeBlock

A component for displaying code blocks with action bar

### Usage
<code src="./demo/basic.tsx" title="Basic Usage" description="Code block with action bar"></code>

### API

### SemanticDOM

| Type |
|------|
| `'header' | 'content'` |

### CodeBlockProps

| Property    | Type               | Description          | Default |
|------------|---------------------|----------------------|---------|
| prefixCls  | `string`            | Custom class prefix  | -       |
| className  | `string`            | Root class name      | -       |
| style      | `React.CSSProperties` | Root inline styles   | -       |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic class names | -       |
| styles     | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic inline styles | - |
| code       | `string \| React.ReactNode` | Code content | -       |
| language   | `string`            | Programming language | -       |