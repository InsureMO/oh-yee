---
category: Components
title: WheelPicker
subtitle: Wheel Picker
group:
  title: Data Entry
  order: 13
toc: 'content'
demo:
  cols: 2
---

# WheelPicker <span class="yee-mobile-badge" />

A mobile-style scroll wheel picker for selecting values from columns.

## Code Demo

<code src="./demo/basic.tsx" title="Single Column" description="Basic single column wheel picker"></code>
<code src="./demo/multi-column.tsx" title="Multi Column" description="Multi-column picker for date selection"></code>

## API

### WheelPickerProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `'yee-wheel-picker'` |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom inline style | - |
| columns | `WheelColumn[]` | Column definitions with options | - |
| value | `number[]` | Selected index per column | - |
| onChange | `(value: number[]) => void` | Callback when value changes | - |
| itemHeight | `number` | Height of each item in pixels | `40` |
| visibleItemCount | `number` | Number of visible items | `5` |

### WheelColumn

| Property | Type | Description |
| --- | --- | --- |
| options | `WheelColumnOption[]` | Column options |

### WheelColumnOption

| Property | Type | Description |
| --- | --- | --- |
| label | `string` | Display text |
| value | `string \| number` | Option value |
