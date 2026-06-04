---
category: Components
title: Trigger
subtitle: 触发器
group:
  title: 其他
  order: 61
toc: 'content'
demo:
  cols: 2
---

# Trigger 触发器

在 hover、click 或 focus 事件时显示弹出层的基础组件。是 Tooltip、Popover、Dropdown 等浮层组件的底层基础。

## 代码演示

<code src="./demo/basic.tsx" title="点击触发" description="点击时显示弹出层"></code>
<code src="./demo/hover.tsx" title="悬停触发" description="悬停时显示弹出层"></code>

## API

### TriggerProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `'yee-trigger'` |
| popup | `ReactNode \| (() => ReactNode)` | 弹出层内容 | - |
| popupClassName | `string` | 弹出层类名 | - |
| popupStyle | `React.CSSProperties` | 弹出层行内样式 | - |
| popupAlign | `{ points?: [Point, Point]; offset?: [number, number] }` | 弹出层对齐方式 | - |
| children | `React.ReactNode` | 触发元素 | - |
| trigger | `Array<'hover' \| 'click' \| 'focus'> \| 'hover' \| 'click' \| 'focus'` | 触发弹出层显示的动作 | `'click'` |
| open | `boolean` | 受控的弹出层可见性 | - |
| defaultOpen | `boolean` | 默认弹出层可见性 | - |
| placement | `Placement` | 弹出层相对于触发元素的位置 | `'top'` |
| destroyPopupOnHide | `boolean` | 隐藏时是否销毁弹出层 | - |
| zIndex | `number` | 弹出层 z-index | - |
| mouseEnterDelay | `number` | 鼠标移入后显示弹出层的延迟（秒） | `0` |
| mouseLeaveDelay | `number` | 鼠标移出后隐藏弹出层的延迟（秒） | `0.2` |
| hideOnClick | `boolean` | 是否在弹出层内点击时隐藏 | `true` |
| alignPoint | `boolean` | 弹出层是否对齐鼠标位置而非触发节点 | - |
| forceRender | `boolean` | 首次挂载时即渲染弹出层到 DOM | `false` |
| stretch | `'width' \| 'minWidth' \| 'height' \| 'minHeight'` | 让弹出层跟随触发节点的尺寸 | - |
| getPopupContainer | `(trigger: HTMLElement) => HTMLElement` | 自定义弹出层渲染容器 | - |
| onOpenChange | `(visible: boolean) => void` | 弹出层可见性变化回调 | - |

### Placement

| 类型 |
| --- |
| `'top' \| 'bottom' \| 'left' \| 'right' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'` |

### Point

| 类型 |
| --- |
| `'tl' \| 'tc' \| 'tr' \| 'bl' \| 'bc' \| 'br' \| 'lt' \| 'lc' \| 'lb' \| 'rt' \| 'rc' \| 'rb' \| 'cc' \| 'cl' \| 'cr'` |
