---
category: Components
title: Commands
subtitle: Commands
group:
  title: Input
  order: 2
toc: 'content'
---

# Quick Commands

A component for providing users with shortcut command input

### Usage Examples
<code src="./demo/basic.tsx" title="Basic Usage" description="Configure shortcut commands via items"></code>

### API

### CommandItem

| Type     |
|----------|
| `MenuItemType & { [prop: string]: any; }` |

### CommandsProps

| Property     | Type                    | Description               | Default    |
|-------------|-------------------------|---------------------------|------------|
| prefixCls   | `string`                | Custom class prefix       | -          |
| items       | `Record<string, Array<CommandItem>>` | Shortcut command list     | -          |
| children    | `({ onTrigger, onKeyDown }: { onTrigger: (key?: string) => void; onKeyDown?: (e: KeyboardEvent) => void; }) => React.ReactElement` | Custom input component    | -          |
| open        | `boolean`               | Controlled panel open state | -          |
| onSelect    | `(params: { item?: CommandItem; key?: string; keyPath?: Array<string>; selectedKeys?: Array<string>; }) => void` | Callback when command is selected | -          |
| onOpenChange| `(open: boolean) => void` | Callback when panel visibility changes | -          |