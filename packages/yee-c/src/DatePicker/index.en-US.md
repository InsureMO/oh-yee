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
<code src="./demo/disabled-time.tsx" title="Disabled Time" description="Disable specific hours/minutes with disabledTime; minutes cascade on the selected hour"></code>
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
| size | `'small' \| 'middle' \| 'large'` | Input size | `'middle'` |
| status | `'error' \| 'warning'` | Set validation status | - |
| getPopupContainer | `() => HTMLElement` | Date panel popup container | - |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'datetime' \| 'time'` | Picker type | `'date'` |
| showTime | `boolean \| ShowTimeConfig` | Whether to show the time panel (date + time columns); when unset, enabled automatically if format contains an hour token; object form supports `timeFormat`, `hourStep`, `minuteStep`, `secondStep`, `defaultValue` (time used when a date is picked without adjusting time columns) | enabled when format has hours |
| timeFormat | `string` | Time columns format, e.g. `HH:mm`, `HH:mm:ss` | `HH:mm:ss` |
| format | `string` | Date display format | `YYYY-MM-DD` |
| saveFormat | `string` | Saved date format; when unset and time picking is on, defaults to format | `YYYY-MM-DD` |
| inputReadOnly | `boolean` | Whether the input is read-only (panel-only picking) | `false` |
| onCell | `(currentDate: Dayjs) => React.HTMLAttributes<HTMLTableCellElement>` | Custom date table cell attributes | - |
| onChange | `(date: string, dateObj?: Dayjs) => void` | Date change callback | - |
| onPanelChange | `(date: Dayjs, panel?: PickerType) => void` | Callback when the panel view switches (e.g. date → month/year) | - |
| responsive | `boolean` | Whether to automatically switch between mobile (WheelPicker) and desktop (Calendar) rendering based on screen width | `true` |
| open | `boolean` | Controlled open state of the panel | - |
| defaultOpen | `boolean` | Open the panel by default (uncontrolled) | - |
| onOpenChange | `(open: boolean) => void` | Callback when the panel open state changes | - |
| disabledDate | `(current: Dayjs) => boolean` | Disabled date function (inherited from PickerPanelProps) | - |
| disabledTime | `(current: Dayjs) => { disabledHours?: () => number[]; disabledMinutes?: (hour) => number[]; disabledSeconds?: (hour, minute) => number[] }` | Disabled time values; minutes/seconds cascade on the selected hour/minute (inherited from PickerPanelProps) | - |
| minDate | `Dayjs` | Minimum selectable date (inherited from PickerPanelProps) | - |
| maxDate | `Dayjs` | Maximum selectable date (inherited from PickerPanelProps) | - |
| unit | `'day' \| 'hour' \| 'minute' \| 'second'` | Comparison granularity for minDate/maxDate (inherited from PickerPanelProps) | - |
| showNow | `boolean` | Whether to show the "Now" button (inherited from PickerPanelProps) | `true` |
| pickerView | `Dayjs` | Controlled panel view date (inherited from PickerPanelProps) | - |
| defaultPickerView | `Dayjs` | Default panel view date, reset each time the panel opens (inherited from PickerPanelProps) | - |

## Notes

- Adapted for mobile (dual panels stacked vertically)
- With time picking on (`showTime` or a format containing hours), clicking date/time cells only updates the value; click the footer confirm button to commit and close the panel
- The input supports manual typing: valid text commits on blur or Enter; clearing the input fires `onChange('')`; unparseable text reverts to the selected value on blur