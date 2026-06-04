---
category: Components
title: Checkbox
subtitle: Checkbox
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Checkbox

Checkbox is used to select multiple items from a set of options.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Checkbox"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled Checkbox"></code>
<code src="./demo/indeterminate.tsx" title="Indeterminate" description="Checkbox with indeterminate state"></code>
<code src="./demo/group.tsx" title="Group" description="Checkbox group"></code>
<code src="./demo/button.tsx" title="Button Style" description="Checkbox with button style"></code>

## API

### CheckboxProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic labels | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic styles | - |
| checked | `boolean` | Whether the checkbox is checked | - |
| defaultChecked | `boolean` | Whether the checkbox is checked by default | - |
| disabled | `boolean` | Whether the checkbox is disabled | - |
| children | `React.ReactNode` | Child elements | - |
| value | `string \| number` | The value bound to the checkbox | - |
| indeterminate | `boolean` | Whether the checkbox is in indeterminate state | - |
| onChange | `(event: ChangeEvent<HTMLInputElement>) => void` | Callback when checked state changes | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### CheckboxGroupProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| buttonStyle | `'outline' \| 'solid'` | Button style | - |
| disabled | `boolean` | Whether the checkbox group is disabled | - |
| defaultValue | `Array<any>` | Default value | - |
| value | `Array<any>` | Controlled value | - |
| name | `string` | The name property of the checkbox | - |
| options | `Array<CheckboxOption>` | Options | - |
| onChange | `(value: Array<string \| number>) => void` | Callback when value changes | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticDOM

| Type |
| --- |
| `'label' \| 'inner'` |

### CheckboxOption

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| label | `React.ReactNode` | Label | - |
| value | `string \| number` | Value | - |
| disabled | `boolean` | Disabled state | - |