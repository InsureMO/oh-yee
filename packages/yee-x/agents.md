# yee-x Component Library AI Navigation

> Last updated: 2026-11-20T06:35:08.304Z

## Overview

This file is a component index for the yee-x library, helping AI Agents quickly discover all available components and their documentation.

- **Components**: 27
- **Groups**: 12
- **Doc format**: Markdown

### Doc URL Format

```
https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/{ComponentName}/index.en-US.md
```

Example - Markdown component docs:
```
https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Markdown/index.en-US.md
```

---

## Components

### Text Format

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Markdown | markdown | Used to render Markdown text. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Markdown/index.en-US.md) |

### 编排

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| AgentTasks | AgentTasks | All your background agent tasks in one calm list: filter tabs with counts, status tags, live clocks for queued/running/waiting tasks, static durations for finished ones, rows that unfold to recent steps, and Approve / Reject / Retry / Open actions mounted per status. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/AgentTasks/index.en-US.md) |
| AgentTimeline | AgentTimeline | A vertical timeline for one agent run: every event carries a kind icon (agent / tool / approval / handoff / note), an agent chip, a status badge, duration and clock time; nested runs (e.g. a sub-agent's own run) fold and unfold. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/AgentTimeline/index.en-US.md) |

### 对话

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| ApprovalCard | ApprovalCard | An agent asks before it acts: risk badge, payload preview, a countdown that pauses on hover (expiring resolves as denied and fires `onExpire`), approval scopes (once / session / always), then a smooth morph into a one-line resolved summary with optional undo. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/ApprovalCard/index.en-US.md) |
| Citations | Citations | Source display for RAG answers: source cards / numbered chips with a hover preview of snippet and quote, click to open. The inline `Citations.Chip` links to sources through `CitationsProvider` and can be wired into a Markdown renderer. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Citations/index.en-US.md) |
| InlineDiff | InlineDiff | AI edits to prose shown inline: deletions struck through and additions highlighted, each change click-cycled through accept → reject → reset, with the resolved text emitted through `onResolve` after every decision; a toolbar accepts all, rejects all or resets. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/InlineDiff/index.en-US.md) |
| MessageActions | MessageActions | The quiet action bar under an AI message: copy (turns into a check), regenerate, version switcher, like/dislike, read aloud, plus a slot for custom actions. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/MessageActions/index.en-US.md) |
| PlanCard | PlanCard | An agent's step-by-step plan. Review mode: rename, reorder (buttons or drag), remove and add steps, then confirm. Run mode: steps advance with a `current` cursor, the running step ticks live, and a failed step can be retried. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/PlanCard/index.en-US.md) |
| Thinking | Thinking | A collapsible panel for the AI's reasoning process: status icon (spinning / success / error), a live timer, steps that appear one by one, and a foldable body. Fits reasoning models and agent runs. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Thinking/index.en-US.md) |
| ToolCall | ToolCall | An agent's tool call in one line: status, timer and summary, folding open to arguments and result with copy, retry on errors. `ToolCall.Group` sums multiple calls into one collapsible group. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/ToolCall/index.en-US.md) |

### Input

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Attachments | Attachments | <code src="./demo/basic.tsx" title="Basic Usage" description="Control upload icon position via `prefix` or `actions`"></code> | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Attachments/index.en-US.md) |
| Commands | Commands | A component for providing users with shortcut command input | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Commands/index.en-US.md) |
| ModelPicker | ModelPicker | The model menu of an AI chat: the trigger shows the current model, the dropdown lists models in groups with quality/speed/cost bars that fill on hover; an extended-thinking toggle unfolds effort levels, and first-token latency plus price show at the bottom. Drop it into a `Sender` `header` panel. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/ModelPicker/index.en-US.md) |
| PromptLibrary | PromptLibrary | Saved prompt templates with variables: the template list sits on top, the selected template's body renders inline with `{{variable}}` placeholders turned into type-in inputs, and the assembled prompt updates live below — the use button unlocks once every variable is filled. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/PromptLibrary/index.en-US.md) |
| Sender | Sender | A chat input box component with built-in send functionality | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Sender/index.en-US.md) |
| History | History | Chat input box with built-in send button. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/History/index.en-US.md) |

### General

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Bubble | Bubble Box | A bubble component for chat interfaces | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Bubble/index.en-US.md) |

### Text Formatting

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| CodeBlock | Code Block | A component for displaying code blocks with action bar | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/CodeBlock/index.en-US.md) |

### Dev Tooling

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| ElementInspector | Element Inspector | A **dev-only** helper: once enabled, moving the mouse highlights element | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/ElementInspector/index.en-US.md) |

### Layout

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Flow | Scroll Container | Used in layouts to enable automatic scrolling when Prompt content is lengthy. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Flow/index.en-US.md) |
| IndepWin | Independent Window | Display elements in a separate independent window. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/IndepWin/index.en-US.md) |
| Resize | Resizable Container | Used in layouts, allows changing the container width by dragging. | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Resize/index.en-US.md) |

### 提示

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Process | Process | Dynamically display the processing flow | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Process/index.en-US.md) |

### Feedback

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Prompts | Prompt Collection | <code src="./demo/basic.tsx" title="Basic Usage"></code> | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Prompts/index.en-US.md) |
| Welcome | Welcome | <code src="./demo/basic.tsx" title="Basic Usage"></code> | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Welcome/index.en-US.md) |

### Utilities

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Tools | Tools | Used for parsing stream data | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Tools/index.en-US.md) |

### Orchestration

| Component | Subtitle | Description | Docs |
|-----------|----------|-------------|------|
| Workflow | Workflow canvas | A canvas for viewing and editing AI workflows. The data model is Dify's | [Docs](https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Workflow/index.en-US.md) |

