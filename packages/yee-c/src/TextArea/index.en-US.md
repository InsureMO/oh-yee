---
category: Components
title: TextArea
subtitle: TextArea
group:
  title: Data Entry
  order: 3
toc: 'content'
---

# TextArea

A TextArea component for multi-line text input.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of TextArea"></code>
<code src="./demo/autosize.tsx" title="Autosize" description="TextArea with auto sizing"></code>
<code src="./demo/count.tsx" title="Count" description="TextArea with character count"></code>
<code src="./demo/allowClear.tsx" title="Allow Clear" description="TextArea with clear button"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled TextArea"></code>
<code src="./demo/borderless.tsx" title="Borderless" description="TextArea without border"></code>

## API

### TextAreaProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| classNames | `Record<CompositionDOM, string>` | Structured class names | - |
| styles | `Record<CompositionDOM, React.CSSProperties>` | Structured styles | - |
| value | `string` | Controlled value | - |
| defaultValue | `string` | Default value | - |
| autoSize | `boolean \| { minRows?: number; maxRows?: number }` | Auto size | - |
| showCount | `boolean` | Show character count | - |
| bordered | `boolean` | Show border | `true` |
| allowClear | `boolean` | Allow clear content | - |
| onChange | `(value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void` | Change callback | - |

CompositionDOM type:
```typescript
type CompositionDOM = 'input' | 'clear' | 'count';
```

Other props are the same as React's `TextArea` element.