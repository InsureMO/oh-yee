---
category: Components
title: Welcome
subtitle: Welcome
group:
  title: Feedback
  order: 1
toc: 'content'
---

### Code Demo
<code src="./demo/basic.tsx" title="Basic Usage"></code>
<code src="./demo/style.tsx" title="Custom Styles" description="Customize styles via `styles` and `classNames`"></code>

### API

### SemanticDOM

| Type |
|------|
| `'title' | 'description' | 'extra' | 'content'` |

### WelcomeProps

| Property    | Type                                     | Description          | Default |
|------------|-------------------------------------------|----------------------|---------|
| prefixCls  | `string`                                  | Custom class prefix  | -       |
| className  | `string`                                  | Custom root class    | -       |
| style      | `React.CSSProperties`                     | Custom root inline styles | -       |
| classNames | `Partial<Record<SemanticDOM, string>>`    | Semantic structure class names | -       |
| styles     | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic structure inline styles | -       |
| title      | `React.ReactNode`                         | Title                | -       |
| description| `React.ReactNode`                         | Description          | -       |
| children   | `React.ReactNode`                         | Child elements       | -       |