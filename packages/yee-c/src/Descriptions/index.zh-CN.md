---
category: Components
title: Descriptions
subtitle: 描述列表
group:
  title: 数据展示
  order: 9
toc: 'content'
---

# Descriptions 描述列表

以键值对的形式展示只读的详情数据，常用于详情页、信息展示等场景。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Descriptions 的基础用法"></code>
<code src="./demo/bordered.tsx" title="带边框" description="带边框和背景色的列表样式"></code>
<code src="./demo/column.tsx" title="自定义列数" description="通过 column 和 span 控制布局"></code>
<code src="./demo/vertical.tsx" title="垂直布局" description="标签和内容上下排列"></code>
<code src="./demo/items.tsx" title="Items 配置" description="通过 items 属性配置数据"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的描述列表"></code>

## API

### DescriptionsProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义结构样式 | - |
| bordered | `boolean` | 是否展示边框 | `false` |
| column | `number` | 每行显示的描述项数量 | `3` |
| layout | `'horizontal' \| 'vertical'` | 布局方式 | `'horizontal'` |
| size | `'small' \| 'default' \| 'large'` | 尺寸 | `'default'` |
| title | `React.ReactNode` | 标题 | - |
| extra | `React.ReactNode` | 右上角操作区 | - |
| items | `DescriptionsItem[]` | 描述项配置（推荐） | - |
| children | `React.ReactNode` | 使用 Descriptions.Item 子组件 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### DescriptionsItem

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| key | `React.Key` | 唯一标识 | - |
| label | `React.ReactNode` | 标签内容 | - |
| children | `React.ReactNode` | 描述内容 | - |
| span | `number \| 'filled'` | 占用的列数，`'filled'` 填充剩余空间 | `1` |

### DescriptionsItemProps（子组件模式）

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| label | `React.ReactNode` | 标签内容 | - |
| span | `number \| 'filled'` | 占用的列数 | `1` |
| children | `React.ReactNode` | 描述内容 | - |

### SemanticDOM

| 类型 |
| --- |
| `'header' \| 'title' \| 'extra' \| 'label' \| 'content'` |
