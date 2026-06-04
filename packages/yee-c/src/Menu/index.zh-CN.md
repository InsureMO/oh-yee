---
category: Components
title: Menu
subtitle: 导航菜单
group:
  title: 导航
  order: 26
toc: 'content'
---

# Menu 导航菜单

为页面和功能提供导航的菜单。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Menu的基础用法"></code>
<code src="./demo/mode.tsx" title="三种模式" description="不同的菜单模式"></code>
<code src="./demo/icon.tsx" title="带图标" description="带图标的菜单"></code>
<code src="./demo/group.tsx" title="分组和分割线" description="支持分组和分割线的菜单"></code>
<code src="./demo/collapsed.tsx" title="折叠" description="inline 模式下折叠为只显示图标"></code>
<code src="./demo/controlled.tsx" title="受控菜单" description="受控的菜单"></code>
<code src="./demo/multiple.tsx" title="多选" description="支持多选的菜单"></code>
<code src="./demo/footer.tsx" title="底部区域" description="自定义菜单底部内容"></code>

## API

### MenuProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根节点类名 | - |
| style | `React.CSSProperties` | 自定义根节点样式 | - |
| classNames | `Partial<Record<SemanticType, string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<SemanticType, React.CSSProperties>>` | 语义化结构样式 | - |
| defaultOpenKeys | `Array<string>` | 默认展开的菜单项key数组 | - |
| defaultSelectedKeys | `Array<string>` | 初始选中的菜单项key数组 | - |
| openKeys | `Array<string>` | 受控展开的菜单项key数组 | - |
| selectedKeys | `Array<string>` | 受控选中的菜单项key数组 | - |
| mode | `'vertical' \| 'inline' \| 'horizontal'` | 菜单类型，支持vertical, inline 和 horizontal | - |
| items | [MenuItemCommonType\[\]](#menuitemtype) | 菜单项 | - |
| multiple | `boolean` | 是否允许多选 | `false` |
| keyboard | `boolean` | 是否启用键盘控制 | - |
| expandedOnHover | `boolean` | 鼠标移入时展开子菜单 | `true` |
| inlineCollapsed | `boolean` | inline 模式下是否折叠为只显示图标 | `false` |
| onOpenChange | `(openKeys: Array<string>) => void` | subMenu 展开收起时调用 | - |
| onSelect | `(params: { item: MenuItemType; key: string; keyPath: Array<string>; selectedKeys: Array<string>; event: KeyboardEvent \| MouseEvent }) => void` | 选中时调用 | - |
| onClick | `(params: { item: MenuItemType; key: string; keyPath: Array<string> }) => void` | 点击菜单项时调用 | - |
| onDeselect | `(params: { item: MenuItemType; key: string; keyPath: Array<string>; selectedKeys: Array<string>; event: KeyboardEvent \| MouseEvent }) => void` | 取消选中时调用（multiple 模式） | - |
| openOnly | `boolean` | 同级只展开一个子菜单 | - |
| footer | `React.ReactNode` | 菜单底部区域 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### MenuItemType

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | `'item'` | 菜单项类型 | `'item'` |
| disabled | `boolean` | 是否禁用 | - |
| icon | `React.ReactNode` | 菜单图标 | - |
| key | `string` | 唯一标识 | - |
| label | `React.ReactNode` | 菜单项标题 | - |
| title | `string` | 悬浮标题 | - |
| children | [MenuItemType\[\]](#menuitemtype) | 子菜单 | - |

### MenuItemGroupType

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | `'group'` | 分组类型 | - |
| label | `React.ReactNode` | 分组标题 | - |
| children | [MenuItemType\[\]](#menuitemtype) | 分组内的菜单项 | - |

### MenuDividerType

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | `'divider'` | 分割线类型 | - |
| key | `string` | 唯一标识 | - |
