---
category: Components
title: Tooltip
subtitle: 文字提示
group:
  title: 数据展示
  order: 46
toc: 'content'
---

# Tooltip 文字提示 <span class="yee-mobile-badge" />

简单的文字提示气泡框。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Tooltip的基础用法"></code>
<code src="./demo/placement.tsx" title="位置" description="Tooltip的不同位置"></code>
<code src="./demo/trigger.tsx" title="触发方式" description="不同的触发方式"></code>
<code src="./demo/custom.tsx" title="自定义内容" description="自定义提示内容"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的Tooltip"></code>

## API

### TooltipProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| title | `React.ReactNode \| (() => React.ReactNode)` | 提示文字 | - |
| mouseEnterDelay | `number` | 鼠标移入后延时多少秒才显示 Tooltip | `0.1` |

其他属性继承自 [Trigger](/components/trigger)，包括：

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| popupClassName | `string` | 弹出层类名 | - |
| popupStyle | `React.CSSProperties` | 弹出层样式 | - |
| popupAlign | `{ points?: [Point, Point]; offset?: [number, number] }` | 弹出层对齐 | - |
| children | `React.ReactNode` | 触发元素 | - |
| trigger | `Array<'hover' \| 'click' \| 'focus'> \| 'hover' \| 'click' \| 'focus'` | 触发弹出层显示的动作 | - |
| open | `boolean` | 控制弹出层是否显示 | - |
| defaultOpen | `boolean` | 控制弹出层是否默认显示 | - |
| placement | `Placement` | 弹出层相对触发器的位置 | `top` |
| destroyPopupOnHide | `boolean` | 关闭时是否销毁弹出层 | - |
| zIndex | `number` | 设置弹出层的z-index | - |
| mouseLeaveDelay | `number` | 鼠标移出后延时多少秒才隐藏 Tooltip | `0.1` |
| hideOnClick | `boolean` | 点击弹出层后隐藏 | `true` |
| getPopupContainer | `() => HTMLElement` | 自定义弹出层渲染节点 | - |
| onOpenChange | `(visible: boolean) => void` | 弹出层显示隐藏的回调函数 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### Placement

```typescript
type Placement = 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
```

## 注意事项

- 已适配移动端（限制最大宽度防止溢出视口）
```