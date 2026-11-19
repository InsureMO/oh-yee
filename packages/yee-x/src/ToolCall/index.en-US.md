---
category: Components
title: ToolCall
subtitle: ToolCall
group:
  title: 对话
  order: 4
toc: 'content'
---

## ToolCall
An agent's tool call in one line: status, timer and summary, folding open to arguments and result with copy, retry on errors. `ToolCall.Group` sums multiple calls into one collapsible group.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage"></code>
<code src="./demo/group.tsx" title="Group summary"></code>

### API

### ToolCallStatus

| Type |
|------|
| `'pending' \| 'running' \| 'success' \| 'error'` |

### ToolCallSemanticType

| Type |
|------|
| `'root' \| 'header' \| 'icon' \| 'name' \| 'status' \| 'duration' \| 'collapse' \| 'body' \| 'section' \| 'section-label' \| 'section-copy' \| 'pre'` |

### ToolCallProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-toolcall` |
| className | `string` | Customize root class name | |
| style | `React.CSSProperties` | Customize root style | |
| classNames | `Partial<Record<ToolCallSemanticType, string>>` | Semantic class names | |
| styles | `Partial<Record<ToolCallSemanticType, React.CSSProperties>>` | Semantic styles | |
| status | `ToolCallStatus` | Call status | `'running'` |
| name | `string` | Tool name | |
| icon | `React.ReactNode` | Icon before the name; a status glyph by default | |
| title | `React.ReactNode` | Override for the whole summary line | |
| args | `unknown` | Arguments object, shown as JSON when expanded | |
| result | `unknown` | Result object, shown as JSON when expanded | |
| error | `unknown` | Error object, shown in its own section | |
| duration | `number` | Elapsed seconds | |
| startTime | `number` | Epoch ms start time for a running call; enables the live timer | |
| collapsible | `boolean` | Whether the body can be folded | `true` |
| collapsed | `boolean` | Controlled collapsed state | |
| defaultCollapsed | `boolean` | Initial collapsed state | `true` |
| onCollapseChange | `(collapsed: boolean) => void` | Collapse callback | |
| onRetry | `() => void` | Renders a retry button on error when provided | |
| locale | `ToolCallLocale` | Overrides for built-in labels | |

### ToolCallGroupProps

| property | type | description | default |
|------------|------------------|------------|---------|
| items | `ToolCallProps[]` | Tool calls to render; unique `name` or `id` keeps row state stable | |
| summary | `React.ReactNode` | Override the auto summary (e.g. `3 tool calls · 2 success · 1 failed`) | |
| collapsible | `boolean` | Whether the group can be folded | `true` |
| collapsed | `boolean` | Controlled collapsed state | |
| defaultCollapsed | `boolean` | Initial collapsed state | `false` |
| onCollapseChange | `(collapsed: boolean) => void` | Collapse callback | |
