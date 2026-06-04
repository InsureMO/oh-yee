---
category: Components
title: Space
subtitle: 间距
group:
  title: 布局
  order: 36
toc: 'content'
---

# Space 间距

设置组件之间的间距。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Space的基础用法"></code>
<code src="./demo/direction.tsx" title="方向" description="Space的方向"></code>
<code src="./demo/gap.tsx" title="间距" description="自定义间距大小"></code>
<code src="./demo/wrap.tsx" title="换行" description="空间不足时换行"></code>
<code src="./demo/align.tsx" title="对齐" description="项目对齐方式"></code>
<code src="./demo/compact.tsx" title="紧凑布局" description="紧凑布局"></code>

## API

### SpaceProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| children | `Array<React.ReactNode> \| React.ReactNode` | 子组件 | - |
| gap | `number` | 间距 | - |
| direction | `'horizontal' \| 'vertical'` | 布局方向 | `horizontal` |
| wrap | `boolean` | 是否自动换行 | - |
| align | `'center' \| 'start' \| 'end' \| 'baseline' \| 'flex-start'` | 对齐方式 | - |
| block | `boolean` | 是否占据整行 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| classNames | `Partial<Record<'item', string>>` | 语义化类名 | - |
| styles | `Partial<Record<'item', React.CSSProperties>>` | 语义化样式 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SpaceCompactProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| children | `React.ReactElement[]` | 子元素 | - |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| direction | `'horizontal' \| 'vertical'` | 布局方向 | `horizontal` |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |