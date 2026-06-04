---
category: Components
title: Skeleton
subtitle: 骨架屏
group:
  title: 反馈
  order: 35
toc: 'content'
---

# Skeleton 骨架屏 <span class="yee-mobile-badge" />

在需要等待加载内容的位置提供一个占位图形组合。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Skeleton的基础用法"></code>
<code src="./demo/complex.tsx" title="复杂组合" description="包含头像、标题和段落的复杂Skeleton"></code>
<code src="./demo/active.tsx" title="动画效果" description="用于加载状态的动画效果"></code>
<code src="./demo/custom.tsx" title="自定义" description="自定义头像、标题和段落"></code>
<code src="./demo/avatar.tsx" title="仅头像" description="只显示头像占位符"></code>
<code src="./demo/title.tsx" title="仅标题" description="只显示标题占位符"></code>
<code src="./demo/paragraph.tsx" title="仅段落" description="只显示段落占位符"></code>

## API

### SkeletonProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| active | `boolean` | 激活动画 | - |
| avatar | `boolean \| AvatarProps` | 设置头像占位符 | - |
| title | `boolean \| TitleProps` | 设置标题占位符 | `true` |
| paragraph | `boolean \| ParagraphProps` | 设置段落占位符 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### AvatarProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| shape | `'circle' \| 'square'` | 设置头像形状 | `circle` |

### TitleProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| width | `number \| string` | 设置标题宽度 | - |

### ParagraphProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| rows | `number` | 设置段落有几行 | - |
| width | `number \| string \| Array<string \| number>` | 段落宽度 | - |