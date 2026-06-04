---
category: Components
title: PickerPanel
subtitle: 选择面板
group:
  title: 数据录入
  order: 28
toc: 'content'
---

# PickerPanel 选择面板

用于选择日期或时间的面板组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="PickerPanel的基础用法"></code>
<!-- <code src="./demo/picker.tsx" title="面板类型" description="不同的面板类型"></code>
<code src="./demo/showTime.tsx" title="显示时间" description="带时间选择的PickerPanel"></code>
<code src="./demo/cellRender.tsx" title="自定义单元格渲染" description="自定义单元格渲染"></code>
<code src="./demo/range.tsx" title="日期范围" description="受限日期范围的PickerPanel"></code>
<code src="./demo/footer.tsx" title="自定义页脚" description="带自定义页脚的PickerPanel"></code> -->

## API

### PickerPanelProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticType, string>>` | 结构化类名 | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | 结构化样式 | - |
| components | `Partial<Record<SemanticType, React.ReactNode>>` | 自定义结构 | - |
| showNow | `boolean` | 是否显示当前时间的按钮 | `true` |
| picker | [PickerType](#pickertype) | 指定日期面板 | - |
| footer | `boolean \| React.ReactNode` | 设置面板页脚 | `true` |
| cellRender | `(date: Dayjs, panel: PickerType) => React.ReactNode` | 自定义单元格日期内容 | - |
| minDate | `Dayjs` | 最小值 | - |
| maxDate | `Dayjs` | 最大值 | - |
| unit | [UnitType](#unittype) | 日期对比时的颗粒度，当存在minDate或maxDate时生效 | - |
| defaultPickerView | `Dayjs` | 默认面板值, 每次打开面板会重置到这个日期 | - |
| pickerView | `Dayjs` | 受控面板值 | - |
| value | `Dayjs` | 日期面板选中的值 | - |
| showTime | `boolean` | 是否显示时间 | - |
| offset | `{ year?: number; month?: number; day?: number }` | 日期相较于某个日期的偏移量 | - |
| onPanelChange | `(date: Dayjs) => void` | 面板切换时的回调函数 | - |
| onChange | `(date: Dayjs \| undefined, panel: PickerType) => void` | 日期发生变化时的回调 | - |
| onCellMouse | `(date: Dayjs) => void` | 鼠标移入日期单元格的回调事件 | - |
| hoverRange | `Array<Dayjs \| null>` | 悬停范围日期 [开始日期, 结束日期] | - |
| selectedRange | `Array<Dayjs \| null>` | 选中范围日期 [开始日期, 结束日期] | - |
| disabledDate | `(current: Dayjs) => boolean` | 禁用日期函数 | - |

### PickerType

| 类型 |
| --- |
| `'date' \| 'week' \| 'month' \| 'quarter' \| 'year' \| 'decade' \| 'datetime' \| 'time'` |

### SemanticType

| 类型 |
| --- |
| `'prevIcon' \| 'nextIcon' \| 'superPrevIcon' \| 'superNextIcon' \| 'footer'` |

### UnitType

| 类型 |
| --- |
| `'day' \| 'hour' \| 'minute' \| 'second'` |