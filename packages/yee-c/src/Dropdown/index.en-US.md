---
category: Components
title: Dropdown
subtitle: Dropdown
group:
  title: Navigation
  order: 2
toc: 'content'
---

# Dropdown <span class="yee-mobile-badge" />

A dropdown menu that pops down or up.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Dropdown"></code>
<code src="./demo/placement.tsx" title="Placement" description="Different placement positions"></code>
<code src="./demo/trigger.tsx" title="Trigger" description="Different trigger methods"></code>

## API

### DropdownProps

DropdownProps extends Omit<TriggerProps, 'placement' | 'popup'>

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom row class styles | - |
| placement | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight'` | Popup position | `'bottom'` |
| menu | `MenuProps` | Menu properties | - |
| popup | `React.ReactNode \| (() => React.ReactNode)` | Custom popup | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

## Notes

- Adapted for mobile (popup max-width to prevent overflow, menu item touch height 44px)