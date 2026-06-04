---
category: Components
title: Highlight
subtitle: Highlight Text
group:
  title: Data Display
  order: 44
toc: 'content'
---

# Highlight <span class="yee-mobile-badge" />

Highlight text matching a regular expression pattern.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Use regex to highlight specific text"></code>
<code src="./demo/clickable.tsx" title="Clickable" description="Add click events to highlighted text"></code>
<code src="./demo/custom.tsx" title="Custom Style" description="Customize styles, tags, and class names"></code>
<code src="./demo/multiple.tsx" title="Multiple Patterns" description="Match numbers, emails, phone numbers, etc"></code>
<code src="./demo/dynamic.tsx" title="Dynamic Search" description="Combine with input for dynamic search highlighting"></code>

## API

### HighlightProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `yee-highlight` |
| text | `string` | Text content to highlight | - |
| pattern | `RegExp` | Matching regular expression | - |
| style | `React.CSSProperties` | Custom style for highlighted text | - |
| className | `string` | Custom class name for highlighted text | - |
| classNames | `Record<'item', string>` | Semantic structure class names | - |
| styles | `Record<'item', React.CSSProperties>` | Semantic structure styles | - |
| htmlTag | `string` | HTML tag for highlighted text | `span` |
| wrapperHtmlTag | `string` | Outer wrapper HTML tag | `span` |
| wrapperStyle | `React.CSSProperties` | Outer wrapper style | - |
| wrapperClassName | `string` | Outer wrapper class name | - |
| onClick | `(e: React.MouseEvent<HTMLElement>, index: number) => void` | Click callback for highlighted text | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

## CSS Variables

The component uses the following CSS variables which can be customized:

| Variable | Description |
| --- | --- |
| `--yee-color-text` | Normal text color |
| `--yee-highlight-color` | Highlighted text color |
| `--yee-highlight-hover-color` | Highlighted text hover color |
| `--yee-highlight-active-color` | Highlighted text active color |
