---
category: Components
title: Collapse
subtitle: Collapse
group:
  title: Data Display
  order: 11
toc: 'content'
---

# Collapse <span class="yee-mobile-badge" />

A content area which can be collapsed and expanded.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Collapse"></code>
<code src="./demo/accordion.tsx" title="Accordion" description="Collapse in accordion mode"></code>
<code src="./demo/borderless.tsx" title="Borderless" description="Collapse without borders"></code>
<code src="./demo/custom.tsx" title="Custom Panel" description="Customize panel header and extra content"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled Collapse component"></code>

## API

### CollapseProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<string, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<string, React.CSSProperties>>` | Semantic structure styles | - |
| accordion | `boolean` | Accordion mode | - |
| activeKey | `string \| number \| string[] \| number[]` | Active key, controlled | - |
| defaultActiveKey | `string \| number \| string[] \| number[]` | Default active key | - |
| items | `Array<PanelProps>` | Panel items | - |
| bordered | `boolean` | Whether to show border | - |
| onChange | `(key: string \| number \| string[] \| number[]) => void` | Callback when panel is expanded or collapsed | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### PanelProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| key | `string \| number` | Unique identifier | - |
| title | `React.ReactNode` | Panel header | - |
| children | `React.ReactNode` | Child elements | - |
| extra | `React.ReactNode \| (() => React.ReactNode)` | Content rendered in the top-right corner | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic structure styles | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

## Notes

- Adapted for mobile (header touch target min-height 44px)