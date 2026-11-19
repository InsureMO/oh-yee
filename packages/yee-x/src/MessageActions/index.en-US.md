---
category: Components
title: MessageActions
subtitle: MessageActions
group:
  title: 对话
  order: 4
toc: 'content'
---

## MessageActions
The quiet action bar under an AI message: copy (turns into a check), regenerate, version switcher, like/dislike, read aloud, plus a slot for custom actions.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage"></code>
<code src="./demo/feedback.tsx" title="Controlled" description="Controlled via<i>feedback</i>and<i>version"></code>

### API

### MessageActionFeedback

| Type |
|------|
| `'like' \| 'dislike'` |

### MessageActionsSemanticType

| Type |
|------|
| `'root' \| 'item' \| 'item-icon' \| 'item-label' \| 'version' \| 'version-text' \| 'extra'` |

### MessageActionsProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-message-actions` |
| className | `string` | Customize root class name | |
| style | `React.CSSProperties` | Customize root style | |
| classNames | `Partial<Record<MessageActionsSemanticType, string>>` | Semantic class names | |
| styles | `Partial<Record<MessageActionsSemanticType, React.CSSProperties>>` | Semantic styles | |
| text | `string` | Text used by the built-in copy button; written to the clipboard internally | |
| onCopy | `(text: string \| undefined, succeeded: boolean) => void` | Called after the copy button is clicked; `succeeded` reports whether the built-in write worked | |
| regenerating | `boolean` | Regeneration in progress (spinning, disabled) | `false` |
| onRegenerate | `() => void` | Renders the regenerate button when provided | |
| version | `number` | Current version (1-based), controlled | |
| defaultVersion | `number` | Initial version for the uncontrolled mode | `1` |
| total | `number` | Total versions; the switcher renders when `total > 1` | |
| onVersionChange | `(version: number) => void` | Called when the version changes | |
| feedback | `MessageActionFeedback` | Controlled feedback state | |
| defaultFeedback | `MessageActionFeedback` | Initial feedback for the uncontrolled mode | |
| onFeedbackChange | `(feedback?: MessageActionFeedback) => void` | Feedback callback; `undefined` when toggled off | |
| onReadAloud | `(speaking: boolean) => void` | Renders the read-aloud button when provided | |
| speaking | `boolean` | Controlled speaking state | |
| extra | `React.ReactNode` | Custom actions appended at the end | |
| locale | `MessageActionsLocale` | Overrides for built-in tooltips | |
