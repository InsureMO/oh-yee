---
category: Components
title: Tag
subtitle: Tag
group:
  title: Data Display
  order: 43
toc: 'content'
---

# Tag <span class="yee-mobile-badge" />

Tag for categorizing or markup.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Tag"></code>
<code src="./demo/type.tsx" title="Type" description="Different types of Tag"></code>
<code src="./demo/closable.tsx" title="Closable" description="Closable Tag"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Tag"></code>
<code src="./demo/checkable.tsx" title="Checkable" description="Checkable Tag"></code>
<code src="./demo/dashed.tsx" title="Dashed" description="Dashed border Tag"></code>
<code src="./demo/icon.tsx" title="Icon" description="Tag with icon"></code>

## API

### TagProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| children | `React.ReactNode` | Children elements | - |
| style | `React.CSSProperties` | Custom style | - |
| className | `string` | Custom class name | - |
| classNames | `Partial<Record<'icon' \| 'content' \| 'close', string>>` | Semantic structure class names | - |
| styles | `Partial<Record<'icon' \| 'content' \| 'close', React.CSSProperties>>` | Semantic structure styles | - |
| closable | `boolean \| React.ReactNode` | Whether closable or custom close icon | - |
| status | `TagType` | Built-in status | - |
| dashed | `boolean` | Whether dashed border | - |
| size | `'small' \| 'default' \| 'large'` | Size | `default` |
| icon | `React.ReactNode` | Icon | - |
| checkable | `boolean` | Whether checkable | - |
| checked | `boolean` | Checked state | - |
| bordered | `boolean` | Whether show border | `true` |
| onChange | `(checked: boolean) => void` | Callback when checked state changes | - |
| onClose | `(e: React.MouseEvent<HTMLSpanElement>) => void` | Callback when tag is closed | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### TagType

```typescript
type TagType = 'success' | 'error' | 'warning' | 'disabled' | 'info' | 'default';
```

### CheckableTagProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| defaultChecked | `boolean` | Default checked state | - |
| checked | `boolean` | Checked state | - |
| onChange | `(checked: boolean) => void` | Callback when checked state changes | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

> CheckableTagProps extends all properties from TagProps