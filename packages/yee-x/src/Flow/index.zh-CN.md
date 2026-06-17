---
category: Components
title: Flow
subtitle: 滚动容器
group:
  title: 布局
  order: 5
toc: 'content'
---

# Flow 滚动容器

用于布局中，当Prompt内容较多时，可使用自动滚动。

### 代码演示
<code src="./demo/basic.tsx" title="基础使用" description="一般用于配合Prompts组件使用。"></code>

### API

### CompositionDOM

| 类型    |
|--------|
| `'inner'` |

### FlowProps

| 属性名       | 类型            | 描述                   |  默认值    |
|------------|------------------|------------------------|-----------|
| prefixCls  | `string`         | 自定义类名前缀          | -         |
| className  | `string`         | 自定义类名              | -          |
| style      | `React.CSSProperties`       | 自定义行内元素         | -      |
| classNames| `Partial<Record<CompositionDOM, string>>`  | 结构化类名       | -   |
| styles     | `Partial<Record<CompositionDOM, React.CSSProperties>>` | 结构化行内样式  | -    |
| children   | `React.ReactNode`  | 子元素                 | -  |
| stopOnHover| `boolean`  | 鼠标移入时动画停止              |  `true`   |
| distance   | `number \| { x: number; y: number }`       | 每一时间间隔移动距离  | `1`  |
| interval   | `number \| { x: number; y: number }`       | 多久滚动一次    |  `10`     |