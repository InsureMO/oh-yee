---
category: Components
title: ModelPicker
subtitle: ModelPicker
group:
  title: Input
  order: 2
toc: 'content'
---

## ModelPicker
The model menu of an AI chat: the trigger shows the current model, the dropdown lists models in groups with quality/speed/cost bars that fill on hover; an extended-thinking toggle unfolds effort levels, and first-token latency plus price show at the bottom. Drop it into a `Sender` `header` panel.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage" description="Controlled selection, thinking toggle and effort"></code>

### API

### ThinkingEffort

| Type |
|------|
| `'low' \| 'medium' \| 'high'` |

### AIModel

| property | type | description |
|------------|------------------|------------|
| id | `string` | Unique model id |
| name | `React.ReactNode` | Display name |
| group | `string` | Group label |
| quality / speed / cost | `number` | 0-100 comparison scores (higher cost = pricier) |
| thinking | `boolean` | Supports extended thinking; renders the toggle |
| meta | `React.ReactNode` | Static info line |
| firstToken | `React.ReactNode` | First-token latency line |
| price | `React.ReactNode` | Price line |
| disabled | `boolean` | Not selectable |

### ModelPickerSemanticType

| Type |
|------|
| `'root' \| 'trigger' \| 'trigger-name' \| 'menu' \| 'group-label' \| 'item' \| 'item-name' \| 'item-meta' \| 'metrics' \| 'metric' \| 'metric-label' \| 'metric-bar' \| 'metric-fill' \| 'thinking-row' \| 'effort' \| 'effort-option' \| 'info-row'` |

### ModelPickerProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-model-picker` |
| className / style | - | Customize root class/style | |
| classNames / styles | `Partial<Record<ModelPickerSemanticType, …>>` | Semantic class names/styles | |
| models | `AIModel[]` | Available models | |
| value | `string` | Controlled selected id | |
| defaultId | `string` | Initial selection | `models[0].id` |
| onChange | `(id, model) => void` | Pick callback; also closes the menu | |
| thinkingEnabled | `boolean` | Controlled thinking toggle | |
| defaultThinkingEnabled | `boolean` | Initial toggle state | `false` |
| onThinkingChange | `(enabled) => void` | Toggle callback | |
| effort | `ThinkingEffort` | Controlled effort | |
| defaultEffort | `ThinkingEffort` | Initial effort | `'medium'` |
| onEffortChange | `(effort) => void` | Effort callback | |
| showMetrics | `boolean` | Show the comparison bars | `true` |
| disabled | `boolean` | Disable the trigger | `false` |
| renderTrigger | `(model) => ReactNode` | Custom trigger content (rc-trigger overwrites the root element's onClick — do not rely on it) | |
| locale | `ModelPickerLocale` | Overrides for built-in labels | |
