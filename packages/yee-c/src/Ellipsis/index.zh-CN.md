---
category: Components
title: Ellipsis
subtitle: 文本省略
group:
  title: 数据展示
  order: 5
toc: 'content'
demo:
  cols: 2
---

# Ellipsis 文本省略 <span class="yee-mobile-badge" />

用于显示长文本，支持自动省略、展开/收起功能。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="默认显示 3 行，超出部分自动省略，点击展开按钮查看完整内容"></code>
<code src="./demo/lines.tsx" title="不同行数" description="通过 lines 属性设置最多显示的行数"></code>
<code src="./demo/customText.tsx" title="自定义按钮文本" description="通过 expandText 和 collapseText 自定义展开/收起按钮的文本"></code>
<code src="./demo/customEllipsis.tsx" title="不显示展开按钮" description="设置 showExpandButton 为 false，只显示省略号，不显示展开按钮"></code>
<code src="./demo/defaultExpanded.tsx" title="默认展开" description="通过 defaultExpanded 设置默认展开状态"></code>
<code src="./demo/controlled.tsx" title="受控模式" description="通过 expanded 和 onExpand 实现受控模式"></code>
<code src="./demo/noAnimation.tsx" title="禁用动画" description="设置 animated 为 false 禁用展开/收起动画"></code>

## API

### EllipsisProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| children | `React.ReactNode` | 文本内容 | - |
| lines | `number` | 最多显示几行 | `3` |
| expandText | `string` | 展开按钮文本 | `"展开"` |
| collapseText | `string` | 收起按钮文本 | `"收起"` |
| defaultExpanded | `boolean` | 是否默认展开 | `false` |
| expanded | `boolean` | 受控模式：是否展开 | - |
| onExpand | `(expanded: boolean) => void` | 展开/收起回调 | - |
| showExpandButton | `boolean` | 是否显示展开按钮 | `true` |
| animated | `boolean` | 是否启用动画 | `true` |
| animationDuration | `number` | 动画持续时间（毫秒） | `300` |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |
