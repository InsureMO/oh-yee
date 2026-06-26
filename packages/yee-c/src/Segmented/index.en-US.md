---
category: Components
title: Segmented
subtitle: Segmented
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# Segmented

Displays a group of mutually exclusive options, with the selected item highlighted by a sliding thumb. Commonly used for view/mode switching.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage, supports controlled/uncontrolled, options accept config objects or primitive shorthand"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disable a single option or the whole group"></code>
<code src="./demo/size.tsx" title="Size" description="small / default / large"></code>
<code src="./demo/block.tsx" title="Block & Icon" description="block fills the container width, options can carry icons"></code>
<code src="./demo/variant.tsx" title="Variant" description="pill style: selected item highlighted as a colored capsule, no container background"></code>

## API

### SegmentedProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<'item' \| 'thumb', string>>` | Semantic structure class names | - |
| styles | `Partial<Record<'item' \| 'thumb', React.CSSProperties>>` | Semantic structure styles | - |
| options | `Array<SegmentedOption>` | Options, supports config objects or `string \| number` shorthand | - |
| value | `string \| number` | Controlled selected value | - |
| defaultValue | `string \| number` | Default selected value | - |
| onChange | `(value: string \| number) => void` | Callback when selected value changes | - |
| disabled | `boolean` | Whether to disable all options | - |
| size | `'small' \| 'default' \| 'large'` | Size | - |
| variant | `'default' \| 'pill'` | Visual style variant, `pill` renders a capsule style | `default` |
| block | `boolean` | Whether to fill the container width, options share the space equally | - |
| name | `string` | Name of the underlying radio input, for form grouping | - |

### SegmentedOption

| Type | Description |
| --- | --- |
| `SegmentedLabeledOption` | `{ label?: ReactNode; value: string \| number; disabled?: boolean; icon?: ReactNode; className?: string }` |
| `SegmentedRawOption` | `string \| number`, shorthand form, label is the value cast to string |
