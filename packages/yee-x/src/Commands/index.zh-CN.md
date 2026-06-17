---
category: Components
title: Commands
subtitle: 命令
group:
  title: 输入
  order: 2
toc: 'content'
---

# 快捷命令

用于给予用户输入快捷指令的组件

### 使用示例
<code src="./demo/basic.tsx" title="基础使用" description="通过items配置快捷指令"></code>

### API

### CommandItem

| 类型     |
|----------|
| `MenuItemType & { [prop: string]: any; }` |

### CommandsProps

| 属性名       | 类型                    | 描述        | 默认值    |
|------------|--------------------------|------------------------|-------------|
| prefixCls  | `string`                  | 自定义类名前缀         |  -         |
| items      | `Record<string, Array<CommandItem>>`     | 快捷项列表               | -  |
| children   | `({ onTrigger, onKeyDown }: { onTrigger: (key?: string) => void; onKeyDown?: (e: KeyboardEvent) => void; }) => React.ReactElement` | 自定义输入框        | -  |
| open       | `boolean`                             | 是否受控打开快捷命令面板   | - |
| onSelect   | `(params: { item?: CommandItem; key?: string; keyPath?: Array<string>; selectedKeys?: Array<string>; }) => void` | 选中快捷项的回调事件     | - |
| onOpenChange | `(open: boolean) => void`           | 快捷命令面板状态变化回调事件 |  -  |