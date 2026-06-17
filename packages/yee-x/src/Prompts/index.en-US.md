---
category: Components
title: Prompts
subtitle: Prompt Collection
group:
  title: Feedback
  order: 1
toc: 'content'
---

### Code Demo
<code src="./demo/basic.tsx" title="Basic Usage"></code>

### API

### PromptProps

| Property    | Type                                     | Description          | Default |
|-------------|------------------------------------------|----------------------|---------|
| key         | `string \| number`                       | Unique identifier    | -       |
| icon        | `React.ReactNode`                        | Icon component       | -       |
| label       | `React.ReactNode`                        | Title text           | -       |
| description | `React.ReactNode`                        | Description text     | -       |
| children    | `Array<PromptProps>`                     | Nested prompt items  | -       |
| onClick     | `(info: { data: Omit<PromptProps, 'onClick'> }) => void` | Click handler | -       |

### PromptsProps

| Property     | Type                                    | Description               | Default         |
|--------------|-----------------------------------------|---------------------------|-----------------|
| prefixCls    | `string`                                | CSS class prefix          | -               |
| className    | `string`                                | Custom root class name    | -               |
| style        | `React.CSSProperties`                   | Custom root style         | -               |
| classNames   | `Partial<Record<SemanticType, string>>` | Component part class names| -               |
| styles       | `Partial<Record<SemanticType, React.CSSProperties>>` | Component part inline styles | -            |
| title        | `React.ReactNode`                       | Collection title          | -               |
| items        | `Array<PromptProps>`                    | Prompt items array        | -               |
| direction    | `'horizontal' \| 'vertical'`            | Layout direction          | `'horizontal'`  |
| wrap         | `boolean`                               | Whether to allow wrapping | -               |
| onItemClick  | `(info: { data: PromptProps }) => void` | Prompt item click handler | -               |

### SemanticType

| Type |
|------|
| `'item' \| 'title' \| 'list'` |