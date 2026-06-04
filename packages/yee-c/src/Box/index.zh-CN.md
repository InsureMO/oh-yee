---
category: Components
title: Box
subtitle: 盒子
group:
  title: 布局
  order: 4
toc: 'content'
---

# Box 盒子 <span class="yee-mobile-badge" />

一个基础的布局容器，为页眉或页脚部分提供预定义样式。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Box的基础用法"></code>
<code src="./demo/custom.tsx" title="自定义样式" description="带有自定义样式的Box"></code>

## API

### BoxProps

BoxProps 继承自 React.HTMLAttributes<`HTMLDivElement`>

| 属性名    | 类型                   | 描述       | 默认值 |
| --------- | ---------------------- | ---------- | ------ |
| prefixCls | `string`               | 类名前缀   | -      |
| children  | `React.ReactNode`      | 子元素     | -      |
| className | `string`               | 根元素类名 | -      |
| style     | `React.CSSProperties`  | 根元素样式 | -      |
| mode      | `'footer' \| 'header'` | 显示模式   | -      |
