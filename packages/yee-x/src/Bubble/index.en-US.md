---
category: Components
title: Bubble
subtitle: Bubble Box
group:
  title: General
  order: 0
toc: 'content'
---

# Chat Bubble Component

A bubble component for chat interfaces

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage"></code>
<code src="./demo/avator.tsx" title="Avatar" description="Set avatar with <i>placement</i> to position it (options: <i>start</i> or <i>end</i>)"></code>
<code src="./demo/list.tsx" title="Bubble List" description="Bubble list with role-based categorization"></code>
<code src="./demo/header-footer.tsx" title="Header & Footer" description="Configure bubble header and footer using <i>header</i> and <i>footer</i>"></code>

### API

### CompositionDOM

| Type |
|------|
| `'header' \| 'content' \| 'footer' \| 'avatar'` |

### BubbleProps

| Property    | Type            | Description          | Default     |
|------------|-----------------|----------------------|-------------|
| classNames | `Partial<Record<CompositionDOM, string>>`  | Semantic structure class names | - |
| styles     | `Partial<Record<CompositionDOM, React.CSSProperties>>` | Semantic structure inline styles | - |
| components | `Partial<Record<CompositionDOM, React.ReactNode \| (() => React.ReactNode)>` | Semantic structure components | - |
| avatar     | `AvatarProps`     | Avatar settings (see Avatar component) | - |
| header     | `React.ReactNode` | Header content       | - |
| content    | `React.ReactNode` | Message content      | - |
| prefix     | `React.ReactNode` | Message prefix       | - |
| suffix     | `React.ReactNode` | Message suffix       | - |
| footer     | `React.ReactNode \| ((props: { role: string; content: React.ReactNode; latest?: boolean; loading?: boolean; }) => React.ReactNode)` | Footer content       | - |
| loading    | `boolean`         | Loading state        | - |
| placement  | `'start' \| 'end'`| Message position     | `'start'` |
| shape      | `'round'`         | Bubble shape         | - |
| typing     | `boolean`         | Typing animation     | - |
| visible    | `boolean`         | Whether visible      | - |

### RoleType

| Type   |
|--------|
| `Omit<BubbleProps, 'content'> & { role: string; }` |

### BubbleListProps

| Property    | Type           | Description          | Default     |
|------------|----------------|----------------------|-------------|
| items      | `Array<BubbleProps & { key?: string \| number; role?: string }>` | Bubble items array | - |
| autoScroll | `boolean`      | Auto-scroll to latest (stops if user scrolls) | `true` |
| prefixCls  | `string`       | Class name prefix    | - |
| parser     | `'markdown' \| ((params: { role: string; content: string }) => React.ReactNode)` | Content parser definition | - |
| roles      | `Record<string, RoleType>` | Role definitions | - |
| render     | `(props: BubbleProps) => React.ReactNode` | Custom render for bubble | - |