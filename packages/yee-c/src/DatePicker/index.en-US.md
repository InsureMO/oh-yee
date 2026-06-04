---
category: Components
title: DatePicker
subtitle: Date Picker
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# DatePicker <span class="yee-mobile-badge" />

To select or input a date.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of DatePicker"></code>
<code src="./demo/picker.tsx" title="Picker Types" description="Different picker types"></code>
<code src="./demo/format.tsx" title="Date Format" description="Customize date format"></code>
<code src="./demo/disabled.tsx" title="Disabled" description="Disabled state"></code>
<code src="./demo/range.tsx" title="Range Picker" description="Date range picker"></code>

## API

### DatePickerProps

DatePickerProps extends PickerPanelProps and TriggerProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| allowClear | `boolean` | Whether to allow clearing | - |
| value | `string \| Dayjs` | Controlled value | - |
| defaultValue | `string \| Dayjs` | Default value | - |
| placeholder | `string` | Placeholder | - |
| cellRender | `(date: Dayjs, panel: PickerType) => React.ReactNode` | Custom date cell content | - |
| disabled | `boolean` | Whether disabled | - |
| order | `boolean` | Whether to auto sort, valid for date range | - |
| getPopupContainer | `() => HTMLElement` | Date panel popup container | - |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | Picker type | `'date'` |
| format | `string` | Date display format | `YYYY-MM-DD` |
| saveFormat | `string` | Saved date format | `YYYY-MM-DD` |
| onCell | `(currentDate: Dayjs) => React.HTMLAttributes<HTMLTableCellElement>` | Custom date table cell attributes | - |
| onChange | `(date: string, dateObj?: Dayjs) => void` | Date change callback | - |
| responsive | `boolean` | Whether to automatically switch between mobile (WheelPicker) and desktop (Calendar) rendering based on screen width | `true` |

## Notes

- Adapted for mobile (dual panels stacked vertically)