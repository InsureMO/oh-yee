---
category: Components
title: AgentTimeline
subtitle: AgentTimeline
group:
  title: 编排
  order: 6
toc: 'content'
---

## AgentTimeline
A vertical timeline for one agent run: every event carries a kind icon (agent / tool / approval / handoff / note), an agent chip, a status badge, duration and clock time; nested runs (e.g. a sub-agent's own run) fold and unfold.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage" description="A handoff event expanded to its nested run"></code>

### API

### AgentEventKind / AgentEventStatus

| Type |
|------|
| `'agent' \| 'tool' \| 'approval' \| 'handoff' \| 'note'` |
| `'pending' \| 'running' \| 'success' \| 'error'` |

### AgentEvent

| property | type | description |
|------------|------------------|------------|
| key | `React.Key` | Stable key; falls back to a path-based id |
| agent | `React.ReactNode` | Agent chip on the event |
| kind | `AgentEventKind` | Icon variant |
| title | `React.ReactNode` | Event summary |
| detail | `React.ReactNode` | Optional detail under the title |
| status | `AgentEventStatus` | Status badge |
| duration | `number` | Duration in seconds |
| children | `AgentEvent[]` | Nested events |
| timestamp | `number` | Epoch ms, rendered as HH:mm:ss |

### AgentTimelineSemanticType

| Type |
|------|
| `'root' \| 'event' \| 'event-icon' \| 'event-main' \| 'event-head' \| 'event-agent' \| 'event-title' \| 'event-status' \| 'event-duration' \| 'event-time' \| 'event-expand' \| 'event-detail' \| 'event-children'` |

### AgentTimelineProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-agent-timeline` |
| className / style | - | Customize root class/style | |
| classNames / styles | `Partial<Record<AgentTimelineSemanticType, …>>` | Semantic class names/styles | |
| events | `AgentEvent[]` | Events in chronological order | |
| defaultExpandedKeys | `React.Key[]` | Nested runs expanded initially | |
| defaultExpandAll | `boolean` | Expand every nested run initially | `false` |
| showTimestamp | `boolean` | Render clock timestamps | `true` |
| locale | `AgentTimelineLocale` | Overrides for built-in labels | |
