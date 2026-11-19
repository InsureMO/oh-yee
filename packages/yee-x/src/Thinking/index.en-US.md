---
category: Components
title: Thinking
subtitle: Thinking
group:
  title: 对话
  order: 4
toc: 'content'
---

## Thinking
A collapsible panel for the AI's reasoning process: status icon (spinning / success / error), a live timer, steps that appear one by one, and a foldable body. Fits reasoning models and agent runs.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage" description="Steps appear one by one, then it settles"></code>
<code src="./demo/status.tsx" title="Error state" description="Set via<i>status</i>with a static<i>duration"></code>

### API

### ThinkingStatus

| Type |
|------|
| `'pending' \| 'thinking' \| 'success' \| 'error'` |

### ThinkingStep

| property | type | description |
|------------|------------------|------------|
| key | `React.Key` | Stable key; falls back to the index |
| title | `React.ReactNode` | Step title |
| content | `React.ReactNode` | Optional step detail |

### ThinkingSemanticType

| Type |
|------|
| `'root' \| 'header' \| 'status' \| 'label' \| 'timer' \| 'collapse' \| 'body' \| 'steps' \| 'step' \| 'step-marker' \| 'step-title' \| 'step-content' \| 'content'` |

### ThinkingProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-thinking` |
| className | `string` | Customize root class name | |
| style | `React.CSSProperties` | Customize root style | |
| classNames | `Partial<Record<ThinkingSemanticType, string>>` | Semantic class names | |
| styles | `Partial<Record<ThinkingSemanticType, React.CSSProperties>>` | Semantic styles | |
| status | `ThinkingStatus` | Current state | `'thinking'` |
| label | `React.ReactNode` | Header label; falls back to a locale string per status | |
| duration | `number` | Elapsed seconds, shown as `m:ss`; while thinking and omitted the component counts from mount | |
| steps | `ThinkingStep[]` | Steps appended one by one | |
| content | `React.ReactNode` | Free-form reasoning content | |
| collapsible | `boolean` | Whether the body can be folded | `true` |
| collapsed | `boolean` | Controlled collapsed state | |
| defaultCollapsed | `boolean` | Initial collapsed state | `false` |
| onCollapseChange | `(collapsed: boolean) => void` | Collapse callback | |
| extra | `React.ReactNode` | Content appended to the header | |
| locale | `ThinkingLocale` | Overrides for default labels | |
