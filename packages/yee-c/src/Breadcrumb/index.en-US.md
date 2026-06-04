---
category: Components
title: Breadcrumb
subtitle: Breadcrumb
group:
  title: Navigation
  order: 2
toc: 'content'
---

# Breadcrumb

Breadcrumb displays the current location within a navigation hierarchy.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Breadcrumb"></code>
<code src="./demo/separator.tsx" title="Custom Separator" description="Breadcrumb with custom separators"></code>
<code src="./demo/click.tsx" title="Click Event" description="Breadcrumb with click event handlers"></code>

## API

### BreadcrumbProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Class name prefix | - |
| children | `React.ReactNode` | Children elements | - |
| separator | `React.ReactNode` | Custom separator | `'/'` |
| className | `string` | Custom root element class name | - |
| style | `React.CSSProperties` | Custom root element style | - |
| items | `Array<BreadcrumbItemProps>` | Items configuration | - |
| classNames | `Partial<Record<BreadcrumbSemanticDOM, string>>` | Semantic class names | - |
| styles | `Partial<Record<BreadcrumbSemanticDOM, React.CSSProperties>>` | Semantic styles | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### BreadcrumbItemProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| title | `React.ReactNode \| (() => React.ReactNode)` | Title | - |
| href | `string` | Href link | - |
| onClick | `(params: { index: number; }) => void` | Custom click event | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### BreadcrumbSemanticDOM

| Type |
| --- |
| `'item' \| 'separator' \| 'list'` |