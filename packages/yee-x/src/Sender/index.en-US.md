---
category: Components
title: Sender
subtitle: Sender
group:
  title: Input
  order: 2
toc: 'content'
---

# Sender Input Box

A chat input box component with built-in send functionality

## Code Demo
<code src="./demo/basic.tsx" title="Basic Usage" description="Controlled component state management"></code>
<code src="./demo/loading.tsx" title="Loading State" description="Control loading state using loading property"></code>
<code src="./demo/autosize.tsx" title="Auto Size" description="Control height adaptation using autoSize property"></code>

## API

### SenderHeaderProps

| Property      | Type                     | Description                     | Default |
|--------------|--------------------------|---------------------------------|---------|
| title        | `React.ReactNode`        | Panel title                     | -       |
| closable     | `boolean`                | Whether panel can be closed     | `true`  |
| open         | `boolean`                | Controlled expanded state       | -       |
| children     | `React.ReactNode`        | Panel content                   | -       |
| onOpenChange | `(open: boolean) => void`| Callback when expansion changes | -       |

### SenderProps

| Property     | Type                     | Description                              | Default                     |
|-------------|--------------------------|------------------------------------------|-----------------------------|
| prefix      | `React.ReactNode`        | Input prefix content                     | -                           |
| affix       | `React.ReactNode`        | Content attached above input             | -                           |
| header      | `React.ReactNode`        | Input header panel content               | -                           |
| footer      | `React.ReactNode`        | Input footer panel content               | -                           |
| prefixCls   | `string`                 | Custom style prefix                      | -                           |
| classNames  | `Record<string, string>` | Component part class names               | -                           |
| styles      | `Record<string, React.CSSProperties>` | Component part inline styles | -                           |
| actions     | `React.ReactNode`        | Custom action buttons                    | -                           |
| loading     | `boolean`                | Loading state                            | -                           |
| disabled    | `boolean`                | Disabled state                           | -                           |
| defaultValue| `string`                 | Default input value                      | -                           |
| theme       | `'light' \| 'dark'`      | Color theme                              | `'light'`                   |
| value       | `string`                 | Input value                              | -                           |
| sendKey     | `'enter' \| 'altEnter'`  | Key binding for send/newline             | -                           |
| autoSize    | `{ minRows?: number; maxRows?: number }` | Auto-resize configuration | `{ minRows: 2, maxRows: 4 }`|
| onSend      | `(message: string) => void` | Send button callback                 | -                           |
| onChange    | `(value: string) => void` | Input change callback                 | -                           |
| onStop      | `() => void`             | Stop button callback                     | -                           |
| onKeyDown   | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void \| boolean` | Keyboard event handler | - |