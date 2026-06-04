---
category: Components
title: Breadcrumb
subtitle: 面包屑
group:
  title: 导航
  order: 2
toc: 'content'
---

# Breadcrumb 面包屑

面包屑导航显示当前页面在网站结构中的位置。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Breadcrumb的基础用法"></code>
<code src="./demo/separator.tsx" title="自定义分隔符" description="带自定义分隔符的面包屑"></code>
<code src="./demo/click.tsx" title="点击事件" description="带点击事件处理的面包屑"></code>

## API

### BreadcrumbProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 类名前缀 | - |
| children | `React.ReactNode` | 子元素 | - |
| separator | `React.ReactNode` | 自定义分隔符 | `'/'` |
| className | `string` | 自定义根元素类名 | - |
| style | `React.CSSProperties` | 自定义根元素样式 | - |
| items | `Array<BreadcrumbItemProps>` | 项配置 | - |
| classNames | `Partial<Record<BreadcrumbSemanticDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<BreadcrumbSemanticDOM, React.CSSProperties>>` | 结构化样式 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### BreadcrumbItemProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| title | `React.ReactNode \| (() => React.ReactNode)` | 标题 | - |
| href | `string` | 链接地址 | - |
| onClick | `(params: { index: number; }) => void` | 自定义点击事件 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### BreadcrumbSemanticDOM

| 类型 |
| --- |
| `'item' \| 'separator' \| 'list'` |