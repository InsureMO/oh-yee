---
category: Components
title: Sender
subtitle: 发送器
group:
  title: 输入
  order: 2
toc: 'content'
---

# Sender 输入框

用于聊天的输入框，自带发送按钮

## 代码演示
<code src="./demo/basic.tsx" title="基础使用" description="受控组件状态管理"></code>
<code src="./demo/loading.tsx" title="加载状态" description="使用loading属性控制加载状态"></code>
<code src="./demo/autosize.tsx" title="自适应高度" description="使用autoSize属性控制高度自适应"></code>

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
| prefix      | `React.ReactNode`        | Prefix content                           | -                           |
| affix       | `React.ReactNode`        | Content attached above input             | -                           |
| header      | `React.ReactNode`        | Input header panel                       | -                           |
| footer      | `React.ReactNode`        | Input footer panel                       | -                           |
| prefixCls   | `string`                 | Custom prefix class name                 | -                           |
| classNames  | `Record<string, string>` | Structural class names                   | -                           |
| styles      | `Record<string, React.CSSProperties>` | Structural inline styles       | -                           |
| actions     | `React.ReactNode`        | Custom buttons                           | -                           |
| loading     | `boolean`                | Loading state                            | -                           |
| disabled    | `boolean`                | Disabled state                           | -                           |
| defaultValue| `string`                 | Default value                            | -                           |
| theme       | `'light' \| 'dark'`      | Color theme                              | `'light'`                   |
| value       | `string`                 | Input value                              | -                           |
| sendKey     | `'enter' \| 'altEnter'`  | Key behavior for sending/newline         | -                           |
| autoSize    | `{ minRows?: number; maxRows?: number }` | Auto-resize config     | `{ minRows: 2, maxRows: 4 }`|
| onSend      | `(message: string) => void` | Send button callback                 | -                           |
| onChange    | `(value: string) => void` | Input change callback                 | -                           |
| onStop      | `() => void`             | Stop button callback                     | -                           |
| onKeyDown   | `(event: React.KeyboardEvent<HTMLTextAreaElement>) => void \| boolean` | Key press handler | - |