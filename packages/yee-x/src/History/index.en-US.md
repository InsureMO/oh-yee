---
category: Components
title: History
subtitle: History
group:
  title: Input
  order: 3
toc: 'content'
---

# History

Chat session history list with date grouping, active highlight and a per-row menu.

## Code Demo

<code src="./demo/basic.tsx" title="Basic Usage" description="Grouping and active highlight"></code>

## API

### HistoryProps

| Prop        | Description                                                                    | Type                                             | Default |
| ----------- | ------------------------------------------------------------------------------ | ------------------------------------------------ | ------- |
| items       | Session items; consecutive items sharing the same group merge into one section | `HistoryItem[]`                                  | -       |
| menu        | Per-row ellipsis dropdown menu                                                 | `HistoryMenu[]`                                  | -       |
| triggerProps | Extra props for the per-row ellipsis Trigger (popupClassName, popupStyle, ...). `popup` is rendered by History; style the dropdown menu via classNames.menu / styles.menu | `TriggerProps`                                   | -       |
| width       | Panel width                                                                    | `number \| string`                               | `240`   |
| activeKey   | Key of the active item, rendered with the active highlight                     | `string \| number`                               | -       |
| onItemClick | Called when an item is clicked                                                 | `(item: HistoryItem) => void`                    | -       |
| onMenuClick | Called when a menu entry is clicked                                            | `(menu: HistoryMenu, item: HistoryItem) => void` | -       |

### HistoryItem

| Prop        | Description                                                                 | Type               |
| ----------- | --------------------------------------------------------------------------- | ------------------ |
| key         | Unique key                                                                  | `string \| number` |
| label       | First-line label                                                            | `React.ReactNode`  |
| group       | Group header (e.g. Today / Previous 7 days); consecutive equal values merge | `React.ReactNode`  |
| description | Muted second line (e.g. time)                                               | `React.ReactNode`  |
| extra       | Right-aligned node on the first line (e.g. status tag)                      | `React.ReactNode`  |
