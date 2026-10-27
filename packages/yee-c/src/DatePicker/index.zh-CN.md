---
category: Components
title: DatePicker
subtitle: 日期选择框
group:
  title: 数据录入
  order: 3
toc: 'content'
---

# DatePicker 日期选择框 <span class="yee-mobile-badge" />

输入或选择日期的控件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="DatePicker的基础用法"></code>
<code src="./demo/picker.tsx" title="选择器类型" description="不同的选择器类型"></code>
<code src="./demo/format.tsx" title="日期格式" description="自定义日期格式"></code>
<code src="./demo/disabled.tsx" title="禁用" description="禁用状态"></code>
<code src="./demo/disabled-time.tsx" title="禁用时间" description="使用 disabledTime 禁用指定小时/分钟，分钟禁用级联依赖已选小时"></code>
<code src="./demo/range.tsx" title="范围选择" description="日期范围选择器"></code>

## API

### DatePickerProps

DatePickerProps 继承 PickerPanelProps 和 TriggerProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| allowClear | `boolean` | 是否允许清除 | - |
| value | `string \| Dayjs` | 受控值 | - |
| defaultValue | `string \| Dayjs` | 默认值 | - |
| placeholder | `string` | 占位符 | - |
| cellRender | `(date: Dayjs, panel: PickerType) => React.ReactNode` | 自定义日期内容 | - |
| disabled | `boolean` | 是否禁用 | - |
| size | `'small' \| 'middle' \| 'large'` | 输入框尺寸 | `'middle'` |
| status | `'error' \| 'warning'` | 校验状态 | - |
| getPopupContainer | `() => HTMLElement` | 日期面板弹窗容器 | - |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'datetime' \| 'time'` | 选择器类型 | `'date'` |
| showTime | `boolean \| ShowTimeConfig` | 是否显示时间选择（日期 + 时间列）；未传时 format 含小时部分自动开启；对象形式支持 `timeFormat`、`hourStep`、`minuteStep`、`secondStep`、`defaultValue`（点选日期未调时间列时使用的默认时间） | format 含小时时开启 |
| timeFormat | `string` | 时间列格式，如 `HH:mm`、`HH:mm:ss` | `HH:mm:ss` |
| format | `string` | 日期显示格式 | `YYYY-MM-DD` |
| saveFormat | `string` | 保存的日期格式；未传时若开启时间选择则与 format 一致 | `YYYY-MM-DD` |
| inputReadOnly | `boolean` | 输入框是否只读（仅通过面板选择） | `false` |
| onCell | `(currentDate: Dayjs) => React.HTMLAttributes<HTMLTableCellElement>` | 自定义日期表格的原生属性 | - |
| onChange | `(date: string, dateObj?: Dayjs) => void` | 日期变化回调 | - |
| onPanelChange | `(date: Dayjs, panel?: PickerType) => void` | 面板视图切换（如日期 → 月/年）时的回调 | - |
| responsive | `boolean` | 是否根据屏幕宽度自动切换移动端（WheelPicker）/ 桌面端（Calendar）渲染模式 | `true` |
| open | `boolean` | 受控面板展开状态 | - |
| defaultOpen | `boolean` | 默认展开面板（非受控） | - |
| onOpenChange | `(open: boolean) => void` | 面板展开状态变化回调 | - |
| disabledDate | `(current: Dayjs) => boolean` | 禁用日期函数（继承自 PickerPanelProps） | - |
| disabledTime | `(current: Dayjs) => { disabledHours?: () => number[]; disabledMinutes?: (hour) => number[]; disabledSeconds?: (hour, minute) => number[] }` | 禁用时间值，分钟/秒级联依赖已选时/分（继承自 PickerPanelProps） | - |
| minDate | `Dayjs` | 最小可选日期（继承自 PickerPanelProps） | - |
| maxDate | `Dayjs` | 最大可选日期（继承自 PickerPanelProps） | - |
| unit | `'day' \| 'hour' \| 'minute' \| 'second'` | minDate/maxDate 的比较颗粒度（继承自 PickerPanelProps） | - |
| showNow | `boolean` | 是否显示「此刻」按钮（继承自 PickerPanelProps） | `true` |
| pickerView | `Dayjs` | 受控面板视图日期（继承自 PickerPanelProps） | - |
| defaultPickerView | `Dayjs` | 默认面板视图日期，每次打开面板会重置（继承自 PickerPanelProps） | - |

## 注意事项

- 已适配移动端（双面板纵向堆叠显示）
- 开启时间选择（`showTime` 或 format 含小时）时，点击日期/时间单元格只更新值，需点击面板底部「确定」按钮提交并关闭
- 输入框支持手动键入：blur 或 Enter 时提交合法日期；清空输入会触发 `onChange('')`；无法解析的文本在失焦后回退为已选值