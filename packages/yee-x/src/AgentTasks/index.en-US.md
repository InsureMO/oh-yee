---
category: Components
title: AgentTasks
subtitle: AgentTasks
group:
  title: 编排
  order: 6
toc: 'content'
---

## AgentTasks
All your background agent tasks in one calm list: filter tabs with counts, status tags, live clocks for queued/running/waiting tasks, static durations for finished ones, rows that unfold to recent steps, and Approve / Reject / Retry / Open actions mounted per status.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage" description="Filters, unfolding and per-status actions"></code>

### API

### AgentTaskStatus / AgentTaskStepStatus / AgentTaskFilter

| Type |
|------|
| `'queued' \| 'running' \| 'waiting' \| 'success' \| 'failed' \| 'cancelled'` |
| `'pending' \| 'running' \| 'success' \| 'error'` |
| `AgentTaskStatus \| 'all'` |

### AgentTask

| property | type | description |
|------------|------------------|------------|
| key | `string` | Unique task id |
| title | `React.ReactNode` | Task title |
| status | `AgentTaskStatus` | Task status |
| createdAt | `number` | Epoch ms when the task entered its current phase; drives the live clock |
| duration | `number` | Static duration in seconds for finished tasks |
| steps | `AgentTaskStep[]` | Recent steps shown when the row unfolds |
| meta | `React.ReactNode` | Secondary line, e.g. queue or model name |

### AgentTasksSemanticType

| Type |
|------|
| `'root' \| 'tabs' \| 'tab' \| 'tab-count' \| 'list' \| 'item' \| 'item-status' \| 'item-title' \| 'item-meta' \| 'item-time' \| 'item-toggle' \| 'item-actions' \| 'steps' \| 'step' \| 'empty'` |

### AgentTasksProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-agent-tasks` |
| className / style | - | Customize root class/style | |
| classNames / styles | `Partial<Record<AgentTasksSemanticType, …>>` | Semantic class names/styles | |
| tasks | `AgentTask[]` | Tasks to render | |
| filter | `AgentTaskFilter` | Controlled filter | |
| defaultFilter | `AgentTaskFilter` | Initial filter | `'all'` |
| onFilterChange | `(filter) => void` | Filter callback | |
| filters | `AgentTaskStatus[]` | Tabs to render; defaults to statuses present in tasks | |
| onApprove | `(task) => void` | Renders Approve on waiting rows | |
| onReject | `(task) => void` | Renders Reject on waiting rows | |
| onRetry | `(task) => void` | Renders Retry on failed rows | |
| onOpen | `(task) => void` | Renders Open on every row | |
| expandedKeys / defaultExpandedKeys / onExpandedKeysChange | - | Row unfolding state | |
| empty | `React.ReactNode` | Empty-state content | |
| locale | `AgentTasksLocale` | Overrides for built-in labels | |
