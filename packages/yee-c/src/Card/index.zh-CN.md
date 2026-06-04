---
category: Components
title: Card
subtitle: 卡片
group:
  title: 数据展示
  order: 7
toc: 'content'
---

# Card 卡片 <span class="yee-mobile-badge" />

卡片是一种以结构化和简洁的方式展示信息的容器。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Card的基础用法"></code>
<code src="./demo/card-group.tsx" title="卡片分组" description="使用 Card.Group 包裹多个卡片"></code>
<code src="./demo/collapsible.tsx" title="可折叠" description="可折叠的卡片"></code>
<code src="./demo/extra.tsx" title="额外内容" description="带有额外内容的卡片"></code>
<code src="./demo/expandIcon.tsx" title="自定义展开图标" description="带有自定义展开图标的卡片"></code>

## API

### CardProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义化结构样式 | - |
| title | `React.ReactNode` | 标题 | - |
| children | `React.ReactNode` | 子元素 | - |
| defaultExpanded | `boolean` | 默认是否展开 | - |
| expanded | `boolean` | 受控是否展开 | - |
| showHeader | `boolean` | 是否显示 header 区域 | `true` |
| extra | `React.ReactNode \| ((params: { expanded: boolean }) => React.ReactNode)` | header右边自定义内容 | - |
| headerClickable | `boolean` | 是否整个header都可以通过点击控制展开收起 | `true` |
| iconPosition | `'left' \| 'right'` | 设置展开图标的位置 | `'right'` |
| expandIcon | `(expanded: boolean) => React.ReactNode \| null` | 自定义展开图标, 返回null时不显示展开图标 | - |
| bordered | `boolean` | 是否显示边线 | - |
| onExpand | `(expanded: boolean) => void` | 展开收起时的回调 | - |
| animationDuration | `number` | 展开收起动画时长（秒） | `0.15` |

### CardGroupProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 根节点类名 | - |
| style | `React.CSSProperties` | 根节点样式 | - |
| children | `React.ReactNode` | Card子节点 | - |
| inner | `boolean` | 是否在另一个card-group中 | - |

### SemanticDOM

| 类型 |
| --- |
| `'expandIcon' \| 'header' \| 'content' \| 'title' \| 'actions'` |