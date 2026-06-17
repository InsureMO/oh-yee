---
category: Components
title: Resize
subtitle: Resizable Container
group:
  title: Layout
  order: 5
toc: 'content'
---

# Resize Resizable Container

Used in layouts, allows changing the container width by dragging.

## Code Demo
<code src="./demo/basic.tsx" title="Basic Usage" description="Drag to change the container width"></code>

## API

### ResizeProps

| Property   | Type                       | Description                       | Default  |
|------------|----------------------------|-----------------------------------|----------|
| prefixCls  | `string`                   | Custom class name prefix          |  -       |
| className  | `string`                   | Custom root class name            |  -       |
| style      | `React.CSSProperties`      | Custom root style                 | -        |
| width      | `string \| number`         | Container width                   | -        |
| children   | `React.ReactNode`          | Child elements                    | -        |
| placement  | `'left' \| 'right'`        | Position of the resize handle     |`'right'` |
| onResize   | `(width: number) => void`  | Callback when width changes       | -        |
