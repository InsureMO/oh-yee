---
category: Components
title: Reveal
subtitle: 渐进渲染
group:
  title: 其他
  order: 50
toc: 'content'
---

# Reveal 渐进渲染

包裹多个子元素，支持两种渲染模式，减少首屏渲染开销。

## 代码演示

<code src="./demo/basic.tsx" title="滚动加载" description="scroll 模式，滚动到可见区域时逐个渲染"></code>
<code src="./demo/stagger.tsx" title="渐进渲染" description="stagger 模式，逐帧渲染所有子元素，自动调节速率"></code>

## API

### RevealProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | 要渐进渲染的子元素列表 | - |
| mode | `'scroll' \| 'stagger'` | 渲染模式：scroll 滚动到视口时渲染；stagger 逐帧渲染，最终全部可见 | `'scroll'` |
| offset | `string` | 提前触发距离，仅 scroll 模式生效（如 `'100px'`） | `'0px'` |
| scrollContainer | `Element \| null` | 滚动容器，仅 scroll 模式生效，默认视口 | `null` |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |
