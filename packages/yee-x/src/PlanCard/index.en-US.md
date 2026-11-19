---
category: Components
title: PlanCard
subtitle: PlanCard
group:
  title: 对话
  order: 4
toc: 'content'
---

## PlanCard
An agent's step-by-step plan. Review mode: rename, reorder (buttons or drag), remove and add steps, then confirm. Run mode: steps advance with a `current` cursor, the running step ticks live, and a failed step can be retried.

### 代码示例
<code src="./demo/review.tsx" title="Review mode" description="Rename, reorder, add/remove, confirm"></code>
<code src="./demo/run.tsx" title="Run mode" description="Advances via the current cursor, retry on failure"></code>

### API

### PlanStepStatus

| Type |
|------|
| `'pending' \| 'running' \| 'success' \| 'error' \| 'skipped'` |

### PlanStep

| property | type | description |
|------------|------------------|------------|
| key | `React.Key` | Stable key; falls back to the index |
| title | `string` | Step title |
| description | `React.ReactNode` | Optional longer explanation |
| status | `PlanStepStatus` | Explicit status, overrides the `current` cursor |
| duration | `number` | Static duration in seconds, shown once settled |

### PlanCardSemanticType

| Type |
|------|
| `'root' \| 'header' \| 'title' \| 'collapse' \| 'body' \| 'step' \| 'step-index' \| 'step-title' \| 'step-desc' \| 'step-status' \| 'step-duration' \| 'step-actions' \| 'footer' \| 'add-step'` |

### PlanCardProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-plan-card` |
| className / style | - | Customize root class/style | |
| classNames / styles | `Partial<Record<PlanCardSemanticType, …>>` | Semantic class names/styles | |
| steps | `PlanStep[]` | Plan steps | |
| mode | `'review' \| 'run'` | Mode | `'review'` |
| title | `React.ReactNode` | Header title | |
| collapsible | `boolean` | Whether the body can be folded | `false` |
| collapsed / defaultCollapsed / onCollapseChange | - | Collapsed state | `false` |
| editable | `boolean` | Allow editing while reviewing | `true` |
| onStepsChange | `(steps: PlanStep[]) => void` | Called after any step edit | |
| onConfirm | `(steps: PlanStep[]) => void` | Confirm button callback | |
| onCancel | `() => void` | Renders a cancel button when provided | |
| current | `number` | Run mode index of the running step | |
| startedAt | `number` | Epoch ms the current step started; enables the live timer | |
| onStepRetry | `(index: number) => void` | Retry callback for a failed step | |
| onStepClick | `(index: number) => void` | Step row click callback | |
| locale | `PlanCardLocale` | Overrides for built-in labels | |
