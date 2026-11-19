---
category: Components
title: InlineDiff
subtitle: InlineDiff
group:
  title: 对话
  order: 4
toc: 'content'
---

## InlineDiff
AI edits to prose shown inline: deletions struck through and additions highlighted, each change click-cycled through accept → reject → reset, with the resolved text emitted through `onResolve` after every decision; a toolbar accepts all, rejects all or resets.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage" description="Decide change by change, resolved text updates live"></code>

### API

### DiffDecision

| Type |
|------|
| `'accepted' \| 'rejected'` |

### InlineDiffSemanticType

| Type |
|------|
| `'root' \| 'toolbar' \| 'text' \| 'del' \| 'ins'` |

### InlineDiffProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-inline-diff` |
| className / style | - | Customize root class/style | |
| classNames / styles | `Partial<Record<InlineDiffSemanticType, …>>` | Semantic class names/styles | |
| original | `string` | Original text | |
| modified | `string` | AI-proposed text | |
| decisions | `Record<string, DiffDecision>` | Controlled decisions keyed by change id (`"0"`, `"1"`, …) | |
| defaultDecisions | `Record<string, DiffDecision>` | Initial decisions | `{}` |
| onDecide | `(id, decision?) => void` | Per-change callback; `decision` is `undefined` when reset | |
| onResolve | `(text: string) => void` | Emits the current resolved text after decisions change | |
| showToolbar | `boolean` | Show the accept all / reject all / reset toolbar | `true` |
| locale | `InlineDiffLocale` | Overrides for built-in labels | |

> The word-level diff runs inside the component (LCS); texts beyond 1000 words degrade to a single whole-text change.
