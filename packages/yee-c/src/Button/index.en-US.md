---
category: Components
title: Button
subtitle: Button
group:
  title: General
  order: 1
toc: 'content'
demo:
  cols: 2
---

# Button <span class="yee-mobile-badge" />

Buttons are used to start an immediate action.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Button"></code>
<code src="./demo/variant.tsx" title="Variant & Color" description="All combinations of type / color / variant"></code>
<code src="./demo/size.tsx" title="Size" description="Different button sizes"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disabled button"></code>
<code src="./demo/loading.tsx" title="Loading" description="Loading button"></code>
<code src="./demo/icon.tsx" title="Icon" description="Button with icon"></code>
<code src="./demo/ghost.tsx" title="Ghost" description="Ghost style button"></code>

## API

### ButtonProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic styles | - |
| htmlType | `'button' \| 'reset' \| 'submit'` | HTML button type | - |
| type | `ButtonType` | Preset button styles | - |
| color | `'default' \| 'primary' \| 'success' \| 'danger' \| 'warning' \| string` | Button color | - |
| variant | `'solid' \| 'outlined' \| 'dashed' \| 'filled' \| 'text' \| 'link'` | Button variant | - |
| ghost | `boolean` | Ghost style with transparent background | - |
| shape | `'default' \| 'circle' \| 'round'` | Button shape | `'default'` |
| size | `'default' \| 'small' \| 'large'` | Button size | `'default'` |
| block | `boolean` | Take up the whole row | - |
| icon | `React.ReactNode \| ((props: ButtonProps) => React.ReactNode)` | Icon element | - |
| disabled | `boolean` | Disabled state | - |
| loading | `boolean` | Loading state | - |
| title | `string` | Title attribute | - |
| href | `string` | Link href | - |
| children | `React.ReactNode` | Child elements | - |
| onClick | `(event: React.MouseEvent<HTMLButtonElement>) => void` | Click callback | - |

### ButtonType

| Type |
| --- |
| `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` |

### ButtonStatus

| Type |
| --- |
| `'info' \| 'success' \| 'warning' \| 'danger' \| 'default'` |

### SemanticDOM

| Type |
| --- |
| `'icon' \| 'content'` |

## Notes

- Adapted for mobile (touch height 44px, circle/icon-only buttons 44px, touch feedback)