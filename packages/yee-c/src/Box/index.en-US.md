---
category: Components
title: Box
subtitle: Box
group:
  title: Layout
  order: 4
toc: 'content'
---

# Box <span class="yee-mobile-badge" />

A basic layout container with predefined styles for header or footer sections.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Box"></code>
<code src="./demo/custom.tsx" title="Custom Style" description="Box with custom styles"></code>

## API

### BoxProps

BoxProps extends React.HTMLAttributes<`HTMLDivElement`>

| Property  | Type                   | Description             | Default |
| --------- | ---------------------- | ----------------------- | ------- |
| prefixCls | `string`               | Class name prefix       | -       |
| children  | `React.ReactNode`      | Child elements          | -       |
| className | `string`               | Root element class name | -       |
| style     | `React.CSSProperties`  | Root element style      | -       |
| mode      | `'footer' \| 'header'` | Display mode            | -       |
