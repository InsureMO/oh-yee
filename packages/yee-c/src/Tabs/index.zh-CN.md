---
category: Components
title: Tabs
subtitle: 标签页
group:
  title: 数据展示
  order: 42
toc: 'content'
---

# Tabs 标签页

选项卡切换组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Tabs的基础用法"></code>
<code src="./demo/position.tsx" title="位置" description="标签的位置"></code>
<code src="./demo/type.tsx" title="类型" description="不同类型的标签页"></code>
<code src="./demo/editable.tsx" title="可编辑" description="可添加和删除标签页"></code>
<code src="./demo/extra.tsx" title="额外内容" description="标签页中的额外内容"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的标签页"></code>

## API

### TabsProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根行内样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 自定义结构化类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 自定义结构化样式 | - |
| type | `'card' \| 'editable-card'` | 页签样式 | - |
| activeKey | `string \| number` | 当前激活tab面板的key | - |
| defaultActiveKey | `string \| number` | 默认激活的tab面板的key | - |
| items | `Array<TabItemType>` | tab选项卡内容 | - |
| position | `'top' \| 'bottom' \| 'left' \| 'right'` | 页签位置 | `top` |
| headerExtra | `{ prefix?: React.ReactNode \| (() => React.ReactNode); suffix?: React.ReactNode \| (() => React.ReactNode) }` | tab额外内容 | - |
| children | `Array<React.ReactElement>` | 子元素 | - |
| lazy | `boolean` | 是否懒加载，只有当切换到该tab时才将对应的content加载到dom中 | - |
| fixedHeader | `boolean` | 是否固定Header区域 | `false` |
| onEdit | `(type: 'add' \| 'remove', key?: number \| string) => void` | 编辑Tab时的回调 | - |
| onChange | `(key: string \| number) => void` | Tab改变时的回调 | - |
| onTabClick | `(key: string \| number) => void \| boolean` | 点击Tab时的回调，当返回false时，不会切换Tab, 不会触发onChange | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### TabItemType

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| key | `string \| number` | 唯一key对应activeKey | - |
| label | `React.ReactNode` | 选项卡显示内容 | - |
| icon | `React.ReactNode` | 选项卡显示图标 | - |
| disabled | `boolean` | 是否禁用 | - |
| closable | `boolean` | 是否可关闭，当type="editable-card"时生效 | `true` |
| badge | `number` | 角标 | - |
| items | `Array<TabItemType>` | 子tab | - |
| children | `React.ReactNode` | 显示内容 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |