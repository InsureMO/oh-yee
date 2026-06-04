---
category: Components
title: Switch
subtitle: Switch
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Switch

Switching between two states or on-off states.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Switch"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Switch"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disabled state"></code>
<code src="./demo/loading.tsx" title="Loading" description="Loading state"></code>
<code src="./demo/content.tsx" title="Custom Content" description="Custom content when checked or unchecked"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled Switch"></code>

## API

### SwitchProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom prefix class name | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Record<SemanticDOM, string>` | Semantic structure class names | - |
| styles | `Record<SemanticDOM, React.CSSProperties>` | Semantic structure styles | - |
| disabled | `boolean` | Disable the switch | - |
| size | `'small' \| 'default' \| 'large'` | Size of the switch | `default` |
| loading | `boolean` | Loading state | - |
| checkedChildren | `React.ReactNode` | Content to show when checked | - |
| unCheckedChildren | `React.ReactNode` | Content to show when unchecked | - |
| checked | `boolean` | Whether the switch is checked | - |
| defaultChecked | `boolean` | Whether the switch is checked by default | - |
| onChange | `(checked: boolean) => void` | Callback when the switch state changes | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticDOM

| Type | Description |
| --- | --- |
| handle | Handle element |
| inner | Inner element |
| unchecked | Unchecked state element |
| checked | Checked state element |