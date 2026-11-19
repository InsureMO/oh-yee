---
category: Components
title: AgentTasks
subtitle: 任务列表
group:
  title: 编排
  order: 6
toc: 'content'
---

## AgentTasks 任务列表
后台 agent 任务的总览列表：带计数的过滤 tab、行内状态标签、queued/running/waiting 任务的实时时钟、完成任务的静态耗时，行展开显示最近步骤，并按状态挂载 Approve / Reject / Retry / Open 操作。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用" description="过滤、展开与按状态的操作"></code>

### API

### AgentTaskStatus / AgentTaskStepStatus / AgentTaskFilter

| 类型 |
|------|
| `'queued' \| 'running' \| 'waiting' \| 'success' \| 'failed' \| 'cancelled'` |
| `'pending' \| 'running' \| 'success' \| 'error'` |
| `AgentTaskStatus \| 'all'` |

### AgentTask

| 属性名 | 类型 | 描述 |
|------------|------------------|------------|
| key | `string` | 任务唯一标识 |
| title | `React.ReactNode` | 任务标题 |
| status | `AgentTaskStatus` | 任务状态 |
| createdAt | `number` | 进入当前阶段的时间戳（ms），驱动实时时钟 |
| duration | `number` | 已完成任务的静态耗时（秒） |
| steps | `AgentTaskStep[]` | 行展开后的最近步骤 |
| meta | `React.ReactNode` | 次要信息（队列/模型名等） |

### AgentTasksSemanticType

| 类型 |
|------|
| `'root' \| 'tabs' \| 'tab' \| 'tab-count' \| 'list' \| 'item' \| 'item-status' \| 'item-title' \| 'item-meta' \| 'item-time' \| 'item-toggle' \| 'item-actions' \| 'steps' \| 'step' \| 'empty'` |

### AgentTasksProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-agent-tasks` |
| className / style | - | 自定义根类名/样式 | |
| classNames / styles | `Partial<Record<AgentTasksSemanticType, …>>` | 语义化类名/样式 | |
| tasks | `AgentTask[]` | 任务列表 | |
| filter | `AgentTaskFilter` | 受控过滤 | |
| defaultFilter | `AgentTaskFilter` | 初始过滤 | `'all'` |
| onFilterChange | `(filter) => void` | 过滤变化回调 | |
| filters | `AgentTaskStatus[]` | 渲染哪些 tab，缺省取任务中出现的状态 | |
| onApprove | `(task) => void` | waiting 行渲染 Approve | |
| onReject | `(task) => void` | waiting 行渲染 Reject | |
| onRetry | `(task) => void` | failed 行渲染 Retry | |
| onOpen | `(task) => void` | 所有行渲染 Open | |
| expandedKeys / defaultExpandedKeys / onExpandedKeysChange | - | 行展开状态 | |
| empty | `React.ReactNode` | 空态内容 | |
| locale | `AgentTasksLocale` | 内置文案覆盖 | |
