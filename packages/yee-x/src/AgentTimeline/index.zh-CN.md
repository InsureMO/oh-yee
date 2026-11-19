---
category: Components
title: AgentTimeline
subtitle: 执行时间线
group:
  title: 编排
  order: 6
toc: 'content'
---

## AgentTimeline 执行时间线
一次 agent 运行的垂直时间线：每个事件带类型图标（agent/工具/审批/交接/备注）、agent 标识、状态徽章、耗时与时刻，嵌套子运行（如子 agent 的执行）可折叠展开。

### 代码示例
<code src="./demo/basic.tsx" title="基础使用" description="交接事件展开嵌套运行"></code>

### API

### AgentEventKind / AgentEventStatus

| 类型 |
|------|
| `'agent' \| 'tool' \| 'approval' \| 'handoff' \| 'note'` |
| `'pending' \| 'running' \| 'success' \| 'error'` |

### AgentEvent

| 属性名 | 类型 | 描述 |
|------------|------------------|------------|
| key | `React.Key` | 唯一标识，缺省按路径生成 |
| agent | `React.ReactNode` | 事件所属 agent 标识 |
| kind | `AgentEventKind` | 图标类型 | 
| title | `React.ReactNode` | 事件摘要 |
| detail | `React.ReactNode` | 事件详情 |
| status | `AgentEventStatus` | 状态徽章 | 
| duration | `number` | 耗时（秒） |
| children | `AgentEvent[]` | 嵌套子事件 |
| timestamp | `number` | 时间戳（ms），显示 HH:mm:ss |

### AgentTimelineSemanticType

| 类型 |
|------|
| `'root' \| 'event' \| 'event-icon' \| 'event-main' \| 'event-head' \| 'event-agent' \| 'event-title' \| 'event-status' \| 'event-duration' \| 'event-time' \| 'event-expand' \| 'event-detail' \| 'event-children'` |

### AgentTimelineProps

| 属性名 | 类型 | 描述 | 默认值 |
|------------|------------------|------------|---------|
| prefixCls | `string` | 自定义类名前缀 | `yee-agent-timeline` |
| className / style | - | 自定义根类名/样式 | |
| classNames / styles | `Partial<Record<AgentTimelineSemanticType, …>>` | 语义化类名/样式 | |
| events | `AgentEvent[]` | 按时间顺序的事件 | |
| defaultExpandedKeys | `React.Key[]` | 初始展开的嵌套运行 | |
| defaultExpandAll | `boolean` | 初始展开全部嵌套 | `false` |
| showTimestamp | `boolean` | 是否显示时刻 | `true` |
| locale | `AgentTimelineLocale` | 内置文案覆盖 | |
