---
category: Components
title: Popconfirm
subtitle: 气泡确认框
group:
  title: 反馈
  order: 29
toc: 'content'
---

# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Popconfirm的基础用法"></code>
<code src="./demo/placement.tsx" title="位置" description="不同位置的Popconfirm"></code>
<code src="./demo/customText.tsx" title="自定义按钮文本" description="自定义确认和取消按钮文本"></code>
<code src="./demo/icon.tsx" title="自定义图标" description="自定义图标"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的Popconfirm"></code>
<code src="./demo/disabled.tsx" title="禁用" description="禁用的Popconfirm"></code>

## API

### PopconfirmProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | 子元素 | - |
| disabled | `boolean` | 禁用子元素点击 | - |
| icon | `React.ReactNode` | 图标 | - |
| title | `React.ReactNode \| (() => React.ReactNode)` | 标题 | - |
| description | `React.ReactNode \| (() => React.ReactNode)` | 描述 | - |
| style | `React.CSSProperties` | 确认框样式 | - |
| className | `string` | 确认框类名 | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | 结构化样式 | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | 结构化类名 | - |
| open | `boolean` | 是否打开，受控 | - |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | 弹出位置 | - |
| confirmText | `string` | 确认按钮文本 | - |
| cancelText | `string` | 取消按钮文本 | - |
| onConfirm | `() => void` | 确认回调 | - |
| onCancel | `() => void` | 取消回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### CompositionDOM

| 类型 |
| --- |
| `'header' \| 'title' \| 'description' \| 'footer'` |