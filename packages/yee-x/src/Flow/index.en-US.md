---
category: Components
title: Flow
subtitle: Scroll Container
group:
  title: Layout
  order: 5
toc: 'content'
---

# Flow Scroll Container

Used in layouts to enable automatic scrolling when Prompt content is lengthy.

### Code Demo
<code src="./demo/basic.tsx" title="Basic Usage" description="Typically used in conjunction with Prompts components."></code>

### API

### CompositionDOM

| Type    |
|--------|
| `'inner'` |

### FlowProps

| Property    | Type            | Description               | Default    |
|------------|------------------|---------------------------|------------|
| prefixCls  | `string`         | Custom class prefix       | -          |
| className  | `string`         | Custom class name         | -          |
| style      | `React.CSSProperties` | Custom inline styles      | -          |
| classNames | `Partial<Record<CompositionDOM, string>>` | Structural class names | -          |
| styles     | `Partial<Record<CompositionDOM, React.CSSProperties>>` | Structural inline styles | -          |
| children   | `React.ReactNode` | Child elements           | -          |
| stopOnHover| `boolean`        | Pause animation on hover  | `true`     |
| distance   | `number \| { x: number; y: number }` | Movement distance per interval | `1`        |
| interval   | `number \| { x: number; y: number }` | Scroll interval (ms)     | `10`       |