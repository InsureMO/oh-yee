---
category: Components
title: Collapse
subtitle: 折叠面板
group:
  title: 数据展示
  order: 11
toc: 'content'
---

# Collapse 折叠面板 <span class="yee-mobile-badge" />

可以折叠/展开的内容区域。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Collapse的基础用法"></code>
<code src="./demo/accordion.tsx" title="手风琴模式" description="手风琴模式的Collapse"></code>
<code src="./demo/borderless.tsx" title="无边框" description="无边框的Collapse"></code>
<code src="./demo/custom.tsx" title="自定义面板" description="自定义面板头部和额外内容"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的Collapse组件"></code>

## API

### CollapseProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<string, string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<string, React.CSSProperties>>` | 语义化结构样式 | - |
| accordion | `boolean` | 手风琴模式 | - |
| activeKey | `string \| number \| string[] \| number[]` | 展开的 key，受控 | - |
| defaultActiveKey | `string \| number \| string[] \| number[]` | 默认展开的折叠面板 | - |
| items | `Array<PanelProps>` | 面板项 | - |
| bordered | `boolean` | 是否显示边框 | - |
| onChange | `(key: string \| number \| string[] \| number[]) => void` | 展开面板的回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### PanelProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| key | `string \| number` | 唯一标识 | - |
| title | `React.ReactNode` | 标题 | - |
| children | `React.ReactNode` | 子元素 | - |
| extra | `React.ReactNode \| (() => React.ReactNode)` | 渲染右上角的内容 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义化结构样式 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

## 注意事项

- 已适配移动端（头部触控区域最小高度 44px）