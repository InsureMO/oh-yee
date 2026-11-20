---
category: Components
title: PromptLibrary
subtitle: PromptLibrary
group:
  title: Input
  order: 2
toc: 'content'
---

## PromptLibrary
Saved prompt templates with variables: the template list sits on top, the selected template's body renders inline with `{{variable}}` placeholders turned into type-in inputs, and the assembled prompt updates live below — the use button unlocks once every variable is filled.

### 代码示例
<code src="./demo/basic.tsx" title="Basic usage" description="Fill variables in the sentence, live assembly, use when complete"></code>

### API

### PromptTemplate

| property | type | description |
|------------|------------------|------------|
| id | `string` | Unique template id |
| title | `React.ReactNode` | Template title |
| template | `string` | Template body; variables use the `{{name}}` syntax |
| icon | `React.ReactNode` | Optional icon |
| description | `React.ReactNode` | Optional one-line description |

### PromptLibrarySemanticType

| Type |
|------|
| `'root' \| 'list' \| 'item' \| 'item-icon' \| 'item-main' \| 'item-title' \| 'item-desc' \| 'editor' \| 'var-input' \| 'preview' \| 'preview-label' \| 'preview-text' \| 'footer' \| 'use-btn'` |

### PromptLibraryProps

| property | type | description | default |
|------------|------------------|------------|---------|
| prefixCls | `string` | Customize class name prefix | `yee-prompt-library` |
| className / style | - | Customize root class/style | |
| classNames / styles | `Partial<Record<PromptLibrarySemanticType, …>>` | Semantic class names/styles | |
| templates | `PromptTemplate[]` | Saved templates | |
| value | `string` | Controlled selected template id | |
| defaultId | `string` | Initial selection | `templates[0].id` |
| onSelect | `(template) => void` | Template pick callback (uncontrolled values reset) | |
| values | `Record<string, string>` | Controlled variable values keyed by variable name | |
| defaultValues | `Record<string, string>` | Initial values | |
| onValuesChange | `(values, template) => void` | Variable input callback | |
| onUse | `(prompt, template) => void` | Fired by the use button once every variable is filled, with the assembled prompt | |
| showPreview | `boolean` | Show the assembled-prompt preview | `true` |
| showList | `boolean` | Show the template list (turn off for single-template mode) | `true` |
| locale | `PromptLibraryLocale` | Overrides for built-in labels | |
