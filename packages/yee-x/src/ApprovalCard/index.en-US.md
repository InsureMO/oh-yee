---
category: Components
title: ApprovalCard
subtitle: ApprovalCard
group:
  title: 对话
  order: 4
toc: 'content'
---

## ApprovalCard
An agent asks before it acts: risk badge, payload preview, a countdown that pauses on hover (expiring resolves as denied and fires `onExpire`), approval scopes (once / session / always), then a smooth morph into a one-line resolved summary with optional undo.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage" description="Risk levels, preview, scopes and countdown"></code>
<code src="./demo/resolved.tsx" title="Resolved" description="Controlled<i>decision</i>with undo"></code>

### API

### ApprovalRisk / ApprovalDecision / ApprovalScope / ApprovalStatus

| Type |
|------|
| `'low' \| 'medium' \| 'high'` |
| `'approved' \| 'denied'` |
| `'once' \| 'session' \| 'always'` |
| `'approved' \| 'denied' \| 'expired'` |

### ApprovalCardSemanticType

| Type |
|------|
| `'root' \| 'head' \| 'agent' \| 'title' \| 'risk' \| 'countdown' \| 'description' \| 'preview' \| 'scopes' \| 'scope' \| 'actions' \| 'resolved'` |

### ApprovalCardProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-approval-card` |
| className / style | - | Customize root class/style | |
| classNames / styles | `Partial<Record<ApprovalCardSemanticType, …>>` | Semantic class names/styles | |
| title | `React.ReactNode` | The action the agent wants to take | |
| agent | `React.ReactNode` | Who is asking; chip in the header | |
| description | `React.ReactNode` | Why it is needed | |
| preview | `React.ReactNode` | Payload preview | |
| risk | `ApprovalRisk` | Risk badge | `'medium'` |
| countdown | `number` | Seconds before auto-expiry (denied); pauses on hover | |
| onExpire | `() => void` | Called when the countdown reaches zero | |
| scopes | `ApprovalScope[]` | Scope options; the selector renders when more than one | `['once', 'always']` |
| defaultScope | `ApprovalScope` | Initially selected scope | `scopes[0]` |
| onDecide | `(decision, scope) => void` | Approve/deny callback | |
| decision | `ApprovalStatus` | Controlled resolved state | |
| onUndo | `() => void` | Renders undo on the resolved row when provided; in uncontrolled mode undo reopens the card (countdown restarts), controlled mode waits for the decision prop to clear | |
| footer | `React.ReactNode` | Extra content under the actions | |
| locale | `ApprovalCardLocale` | Overrides for built-in labels | |
