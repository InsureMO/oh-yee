---
category: Components
title: Highlight
subtitle: 高亮文本
group:
  title: 数据显示
  order: 44
toc: 'content'
---

# Highlight 高亮文本 <span class="yee-mobile-badge" />

根据正则表达式高亮显示文本中的匹配内容。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="使用正则表达式高亮文本中的指定内容"></code>
<code src="./demo/clickable.tsx" title="可点击" description="为高亮文本添加点击事件"></code>
<code src="./demo/custom.tsx" title="自定义样式" description="自定义高亮文本的样式、标签和类名"></code>
<code src="./demo/multiple.tsx" title="多种匹配模式" description="使用不同的正则表达式匹配数字、邮箱、电话等"></code>
<code src="./demo/dynamic.tsx" title="动态搜索" description="结合输入框实现动态搜索高亮"></code>

## API

### HighlightProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `yee-highlight` |
| text | `string` | 要高亮的文本内容 | - |
| pattern | `RegExp` | 匹配正则表达式 | - |
| style | `React.CSSProperties` | 自定义高亮文本样式 | - |
| className | `string` | 自定义高亮文本类名 | - |
| classNames | `Record<'item', string>` | 语义化结构类名 | - |
| styles | `Record<'item', React.CSSProperties>` | 语义化结构样式 | - |
| htmlTag | `string` | 高亮文本的 HTML 标签 | `span` |
| wrapperHtmlTag | `string` | 包裹文本的外层标签 | `span` |
| wrapperStyle | `React.CSSProperties` | 外层包裹样式 | - |
| wrapperClassName | `string` | 外层包裹类名 | - |
| onClick | `(e: React.MouseEvent<HTMLElement>, index: number) => void` | 点击高亮文本的回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

## CSS 变量

组件使用了以下 CSS 变量，可以通过自定义这些变量来改变组件样式：

| 变量名 | 描述 |
| --- | --- |
| `--yee-color-text` | 普通文本颜色 |
| `--yee-highlight-color` | 高亮文本颜色 |
| `--yee-highlight-hover-color` | 高亮文本悬停颜色 |
| `--yee-highlight-active-color` | 高亮文本激活颜色 |
