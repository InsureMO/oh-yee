---
category: Components
title: Badge
subtitle: 徽标数
group:
  title: 数据展示
  order: 3
toc: 'content'
---

# Badge 徽标数 <span class="yee-mobile-badge" />

徽标数组件，用于展示小的数值信息，如未读数或状态指示。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Badge的基础用法"></code>
<code src="./demo/status.tsx" title="状态" description="Badge的不同状态"></code>
<code src="./demo/dot.tsx" title="红点" description="显示红点徽标"></code>
<code src="./demo/size-color.tsx" title="尺寸和颜色" description="不同尺寸和自定义颜色"></code>
<code src="./demo/ribbon.tsx" title="缎带徽标" description="用于特殊强调的缎带徽标"></code>

## API

### BadgeProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<BadgeSemanticDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<BadgeSemanticDOM, React.CSSProperties>>` | 结构化样式 | - |
| children | `React.ReactNode` | 子组件 | - |
| count | `number \| React.ReactNode` | 展示的数字或自定义内容 | - |
| showZero | `boolean` | 当count为0时，是否显示Badge | `false` |
| active | `boolean` | 是否显示呼吸效果 | `false` |
| dot | `boolean` | 显示红点 | `false` |
| size | `'default' \| 'small' \| 'large'` | 尺寸 | `'default'` |
| status | `'success' \| 'info' \| 'warning' \| 'error' \| 'processing'` | 设置状态 | - |
| color | `string` | 自定义颜色 | - |
| offset | `[number, number]` | 自定义Badge偏移量 | - |
| overflowCount | `number` | 当count超出overflowCount时，显示overflowCount+ | `99` |
| text | `string` | 状态点的文本内容（配合 status 使用） | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### RibbonProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| text | `React.ReactNode` | 描述文本 | - |
| placement | `'start' \| 'end'` | 缎带位置 | `'end'` |
| color | `string` | 自定义颜色 | - |
| children | `React.ReactNode` | 子节点 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |