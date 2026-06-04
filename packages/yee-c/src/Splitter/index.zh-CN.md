---
category: Components
title: Splitter
subtitle: 分割面板
group:
  title: 布局
  order: 38
toc: 'content'
---

# Splitter 分割面板

用于布局的分割面板。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Splitter的基础用法"></code>
<code src="./demo/vertical.tsx" title="垂直布局" description="垂直方向布局"></code>
<code src="./demo/multiple.tsx" title="多面板" description="多个面板布局"></code>
<code src="./demo/collapsible.tsx" title="可折叠" description="可折叠面板"></code>
<code src="./demo/size.tsx" title="尺寸控制" description="控制面板尺寸"></code>
<code src="./demo/nested.tsx" title="嵌套" description="嵌套分割面板"></code>
<code src="./demo/bordered.tsx" title="边框" description="带边框的分割面板"></code>

## API

### SplitterProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根元素类名 | - |
| style | `React.CSSProperties` | 自定义根元素样式 | - |
| layout | `'horizontal' \| 'vertical'` | 布局方向 | `horizontal` |
| children | `React.ReactElement[]` | 子元素 | - |
| bordered | `boolean` | 是否显示边框 | - |
| itemPadding | `number \| string` | 项目内边距 | - |
| onResize | `(sizes: number[]) => void` | 面板尺寸变化事件 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SplitterItemProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义项目元素类名前缀 | - |
| className | `string` | 自定义项目元素类名 | - |
| style | `React.CSSProperties` | 自定义项目元素样式 | - |
| collapsible | `boolean \| { start?: boolean; end?: boolean }` | 快速折叠 | - |
| resizable | `boolean` | 是否启用拖拽缩放 | - |
| children | `React.ReactNode` | 子元素 | - |
| min | `string \| number` | 面板最小尺寸 | - |
| max | `string \| number` | 面板最大尺寸 | - |
| size | `string \| number` | 面板尺寸，受控 | - |
| defaultSize | `string \| number` | 默认面板尺寸，非受控 | - |
| onExpand | `(expanded: boolean) => void` | 展开事件 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

## 注意事项

- 移动端暂未适配，拖拽交互在触摸屏上体验不佳