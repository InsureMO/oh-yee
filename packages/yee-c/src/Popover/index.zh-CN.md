---
category: Components
title: Popover
subtitle: 气泡卡片
group:
  title: 数据展示
  order: 30
toc: 'content'
---

# Popover 气泡卡片

点击、聚焦或悬停在元素上时，弹出气泡式的卡片浮层。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Popover的基础用法"></code>
<code src="./demo/trigger.tsx" title="触发方式" description="不同的触发方式"></code>
<code src="./demo/placement.tsx" title="位置" description="不同位置的Popover"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的Popover"></code>
<code src="./demo/custom.tsx" title="自定义内容" description="自定义内容的Popover"></code>
<code src="./demo/arrow.tsx" title="无箭头" description="无箭头的Popover"></code>

## API

### PopoverProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| children | `React.ReactElement` | 子元素 | - |
| title | `React.ReactNode \| (() => React.ReactNode)` | 标题 | - |
| content | `React.ReactNode \| (() => React.ReactNode)` | 内容 | - |
| className | `string` | 自定义根元素类名 | - |
| style | `React.CSSProperties` | 自定义根元素样式 | - |
| styles | `Partial<Record<CompositionDOM, React.CSSProperties>>` | 结构化样式 | - |
| classNames | `Partial<Record<CompositionDOM, string>>` | 结构化类名 | - |
| onOpenChange | `(open: boolean) => void` | 显示隐藏状态改变回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### CompositionDOM

| 类型 |
| --- |
| `'header' \| 'content'` |

其他属性继承自 [Trigger](/components/trigger)。