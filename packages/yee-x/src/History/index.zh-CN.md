---
category: Components
title: History
subtitle: 历史记录
group:
  title: 输入
  order: 3
toc: 'content'
---

# History 历史记录

聊天会话历史列表，支持时间分组、选中高亮、行内菜单。

## 代码演示

<code src="./demo/basic.tsx" title="基础使用" description="分组与选中高亮"></code>

## API

### HistoryProps

| 属性        | 说明                                                | 类型                                             | 默认值 |
| ----------- | --------------------------------------------------- | ------------------------------------------------ | ------ |
| items       | 会话条目（分组按出现顺序，相邻同 group 合并为一段） | `HistoryItem[]`                                  | -      |
| menu        | 每行省略号下拉菜单                                  | `HistoryMenu[]`                                  | -      |
| triggerProps | 透传给每行省略号 Trigger 的属性（popupClassName、popupStyle 等；popup 由组件内部控制，样式下拉菜单用 classNames.menu / styles.menu） | `TriggerProps`                                   | -      |
| width       | 面板宽度                                            | `number \| string`                               | `240`  |
| activeKey   | 当前选中项 key，渲染高亮背景                        | `string \| number`                               | -      |
| onItemClick | 点击条目回调                                        | `(item: HistoryItem) => void`                    | -      |
| onMenuClick | 菜单项点击回调                                      | `(menu: HistoryMenu, item: HistoryItem) => void` | -      |

### HistoryItem

| 属性        | 说明                                                 | 类型               |
| ----------- | ---------------------------------------------------- | ------------------ |
| key         | 唯一标识                                             | `string \| number` |
| label       | 首行标题                                             | `React.ReactNode`  |
| group       | 分组标题（如 Today / Previous 7 days），相邻同值合并 | `React.ReactNode`  |
| description | 次行弱化文案（如时间）                               | `React.ReactNode`  |
| extra       | 首行右侧节点（如状态标签）                           | `React.ReactNode`  |
