---
category: Components
title: Radio
subtitle: Radio
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Radio

Radio button for selecting one option from a set of options.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Radio"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disabled Radio"></code>
<code src="./demo/button.tsx" title="Button Style" description="Radio with button style"></code>
<code src="./demo/size.tsx" title="Size" description="Different sizes of Radio button style"></code>
<code src="./demo/options.tsx" title="Options" description="Generate radio by configuring options"></code>
<code src="./demo/vertical.tsx" title="Vertical Layout" description="Vertical layout of Radio"></code>

## API

### RadioProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| classNames | `Partial<Record<'inner' \| 'label', string>>` | Semantic structure class names | - |
| styles | `Partial<Record<'inner' \| 'label', React.CSSProperties>>` | Semantic structure styles | - |
| defaultChecked | `boolean` | Default checked | - |
| checked | `boolean` | Controlled checked | - |
| disabled | `boolean` | Disabled | - |
| value | `string \| number` | Value | - |
| label | `React.ReactNode` | Label | - |
| children | `React.ReactNode` | Children | - |
| toggleable | `boolean` | Whether toggleable | - |

### RadioGroupProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| defaultValue | `string \| number` | Default selected value | - |
| value | `string \| number` | Controlled selected value | - |
| size | `'large' \| 'default' \| 'small'` | Size | - |
| name | `string` | Group name | - |
| disabled | `boolean` | Disable all options | - |
| buttonStyle | `'outline' \| 'solid' \| 'cornermark'` | Button style | - |
| options | `Array<RadioProps & { label: React.ReactNode }>` | Options in configuration form | - |
| toggleable | `boolean` | Whether selection can be toggled (click again to deselect) | - |
| gap | `number` | Set the interval between radios | - |
| onChange | `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void` | Callback when value changes | - |