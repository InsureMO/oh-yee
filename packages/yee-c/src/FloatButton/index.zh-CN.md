---
category: Components
title: FloatButton
subtitle: 悬浮按钮
group:
  title: 通用
  order: 1
toc: 'content'
---

# FloatButton 悬浮按钮

悬浮在页面任意位置的按钮。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="FloatButton的基础用法"></code>
<code src="./demo/shape.tsx" title="按钮形状" description="不同的按钮形状"></code>
<code src="./demo/description.tsx" title="描述信息" description="带描述信息的按钮"></code>
<code src="./demo/draggable.tsx" title="可拖拽" description="可拖拽的悬浮按钮"></code>
<code src="./demo/popup.tsx" title="弹出菜单" description="带弹出菜单的按钮"></code>
<code src="./demo/backtop.tsx" title="返回顶部" description="返回顶部按钮"></code>
<code src="./demo/group.tsx" title="按钮组" description="悬浮按钮组"></code>

## API

### FloatButtonProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| icon | `React.ReactNode \| ((props: FloatButtonProps) => React.ReactNode)` | 自定义图标 | - |
| shape | `'circle' \| 'square'` | 设置按钮形状 | `'circle'` |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根元素类名 | - |
| style | `React.CSSProperties` | 自定义根元素样式 | - |
| classNames | `Partial<Record<FloatButtonSemanticDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<FloatButtonSemanticDOM, React.CSSProperties>>` | 结构化样式 | - |
| description | `React.ReactNode \| (() => React.ReactNode)` | 设置按钮描述 | - |
| draggable | `boolean` | 设置按钮可拖拽 | - |
| popup | `React.ReactNode \| (() => React.ReactNode)` | 设置按钮弹出层 | - |
| type | `'default' \| 'primary'` | 类型 | `'default'` |
| dragLimitInWindow | `boolean` | 拖拽时是否限制在窗口内 | - |
| onClick | `(e: React.MouseEvent<HTMLButtonElement>) => void` | 点击事件回调 | - |
| onDragChange | `(draging: boolean, ref: React.RefObject<HTMLButtonElement>) => void` | 拖拽状态变化回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### BackTopProps

BackTopProps 继承 FloatButtonProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| scrollTop | `number` | 滚动条距离顶部多少高度时显示回到顶部按钮 | - |
| getContainer | `() => HTMLElement` | 获取滚动元素 | `document.body` |
| onClick | `(e: React.MouseEvent<HTMLButtonElement>) => void` | 点击事件 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### FloatButtonGroupProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根元素类名 | - |
| style | `React.CSSProperties` | 自定义根元素样式 | - |
| trigger | `'hover' \| 'click'` | 触发显示弹出层的事件 | - |
| shape | `'circle' \| 'square'` | 按钮形状 | - |
| children | `React.ReactNode \| React.ReactNode[]` | 子元素 | - |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | 弹出层位置 | - |
| popupClassName | `string` | - | - |
| onVisibleChange | `(visible: boolean) => void` | - | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### FloatButtonSemanticDOM

| 类型 |
| --- |
| `'icon' \| 'description'` |