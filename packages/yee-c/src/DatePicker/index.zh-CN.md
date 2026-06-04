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
| order | `boolean` | 是否自动排序，日期范围有效 | - |
| getPopupContainer | `() => HTMLElement` | 日期面板弹窗容器 | - |
| picker | `'date' \| 'week' \| 'month' \| 'quarter' \| 'year'` | 选择器类型 | `'date'` |
| format | `string` | 日期显示格式 | `YYYY-MM-DD` |
| saveFormat | `string` | 保存的日期格式 | `YYYY-MM-DD` |
| onCell | `(currentDate: Dayjs) => React.HTMLAttributes<HTMLTableCellElement>` | 自定义日期表格的原生属性 | - |
| onChange | `(date: string, dateObj?: Dayjs) => void` | 日期变化回调 | - |
| responsive | `boolean` | 是否根据屏幕宽度自动切换移动端（WheelPicker）/ 桌面端（Calendar）渲染模式 | `true` |

## 注意事项

- 已适配移动端（双面板纵向堆叠显示）