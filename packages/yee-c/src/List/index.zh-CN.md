---
category: Components
title: List
subtitle: 列表
group:
  title: 数据展示
  order: 25
toc: 'content'
---

# List 列表 <span class="yee-mobile-badge" />

用于显示一组项目的列表组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="List的基础用法"></code>
<code src="./demo/bordered.tsx" title="带边框" description="带边框的列表"></code>
<code src="./demo/renderItem.tsx" title="自定义渲染" description="自定义列表项渲染"></code>
<code src="./demo/disabled.tsx" title="禁用项" description="包含禁用项的列表"></code>

## API

### ListProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| items | [ListItemProps\[\]](#listitemprops) | 列表集合 | - |
| bordered | `boolean` | 是否显示边框 | - |
| focusedKey | `string \| number` | 聚焦项的 key | - |
| itemRender | `(item: ListItemProps) => React.ReactNode` | 函数形式返回列表项 | - |
| onClick | `(item: ListItemProps) => void` | 列表项的点击事件 | - |

### ListItemProps

ListItemProps 继承 React.HtmlHTMLAttributes<`HTMLLIElement`>

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| key | `string \| number` | 唯一键 | - |
| label | `React.ReactNode` | 显示内容 | - |
| value | `unknown` | 值 | - |
| disabled | `boolean` | 是否禁用 | - |
| className | `string` | 自定义类名 | - |
| [prop: string] | `any` | 其他自定义属性 | - |