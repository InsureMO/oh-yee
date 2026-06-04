---
category: Components
title: Dropdown
subtitle: 下拉菜单
group:
  title: 导航
  order: 2
toc: 'content'
---

# Dropdown 下拉菜单 <span class="yee-mobile-badge" />

向下或向上弹出的下拉菜单。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Dropdown的基础用法"></code>
<code src="./demo/placement.tsx" title="弹出位置" description="不同位置的下拉菜单"></code>
<code src="./demo/trigger.tsx" title="触发方式" description="不同的触发方式"></code>

## API

### DropdownProps

DropdownProps 继承 Omit<TriggerProps, 'placement' | 'popup'>

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行类样式 | - |
| placement | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight'` | 弹出位置 | `'bottom'` |
| menu | `MenuProps` | 菜单属性 | - |
| popup | `React.ReactNode \| (() => React.ReactNode)` | 自定义弹出层 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

## 注意事项

- 已适配移动端（弹窗限制最大宽度防止溢出、菜单项触控高度 44px）