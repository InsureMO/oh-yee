---
category: Components
title: PickerPanel
subtitle: Picker Panel
group:
  title: Data Entry
  order: 28
toc: 'content'
---

# PickerPanel

A panel component for selecting dates or times.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of PickerPanel"></code>
<code src="./demo/picker.tsx" title="Picker Types" description="Different picker types"></code>
<code src="./demo/showTime.tsx" title="Show Time" description="PickerPanel with time selection"></code>
<code src="./demo/cellRender.tsx" title="Custom Cell Render" description="Custom cell rendering"></code>
<code src="./demo/range.tsx" title="Date Range" description="PickerPanel with min and max dates"></code>
<code src="./demo/footer.tsx" title="Custom Footer" description="PickerPanel with custom footer"></code>

## API

### PickerPanelProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticType, string>>` | Structured class names | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | Structured styles | - |
| components | `Partial<Record<SemanticType, React.ReactNode>>` | Custom structure | - |
| showNow | `boolean` | Whether to show the current time button | `true` |
| picker | [PickerType](#pickertype) | Specify date panel | - |
| footer | `boolean \| React.ReactNode` | Set panel footer | `true` |
| cellRender | `(date: Dayjs, panel: PickerType) => React.ReactNode` | Custom cell date content | - |
| minDate | `Dayjs` | Minimum value | - |
| maxDate | `Dayjs` | Maximum value | - |
| unit | [UnitType](#unittype) | Date comparison granularity when minDate or maxDate exists | - |
| defaultPickerView | `Dayjs` | Default panel value, reset to this date each time the panel opens | - |
| pickerView | `Dayjs` | Controlled panel value | - |
| value | `Dayjs` | Selected value of the date panel | - |
| showTime | `boolean` | Whether to show time | - |
| offset | `{ year?: number; month?: number; day?: number }` | Date offset relative to a certain date | - |
| onPanelChange | `(date: Dayjs) => void` | Callback function when panel switches | - |
| onChange | `(date: Dayjs \| undefined, panel: PickerType) => void` | Callback when date changes | - |
| onCellMouse | `(date: Dayjs) => void` | Callback event when mouse enters date cell | - |
| hoverRange | `Array<Dayjs \| null>` | Hover range dates [start date, end date] | - |
| selectedRange | `Array<Dayjs \| null>` | Selected range dates [start date, end date] | - |
| disabledDate | `(current: Dayjs) => boolean` | Disabled date function | - |

### PickerType

| Type |
| --- |
| `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'decade' \| 'datetime' \| 'time'` |

### SemanticType

| Type |
| --- |
| `'prevIcon' \| 'nextIcon' \| 'superPrevIcon' \| 'superNextIcon' \| 'footer'` |

### UnitType

| Type |
| --- |
| `'day' \| 'hour' \| 'minute' \| 'second'` |