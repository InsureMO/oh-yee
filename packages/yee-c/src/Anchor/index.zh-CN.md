---
category: Components
title: Anchor
subtitle: 锚点
group:
  title: 导航
  order: 2
toc: 'content'
---

# Anchor 锚点

锚点组件，用于链接到页面内的特定部分。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Anchor的基础用法"></code>
<code src="./demo/direction.tsx" title="方向" description="垂直和水平方向"></code>
<code src="./demo/controlled.tsx" title="受控模式" description="通过activeKey控制激活项"></code>
<code src="./demo/auto.tsx" title="自动生成" description="从 DOM 自动生成锚点列表"></code>

## API

### AnchorProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根元素的类名 | - |
| style | `React.CSSProperties` | 自定义根元素的样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 结构化样式 | - |
| items | `Array<AnchorItemType>` | 锚点配置项 | - |
| children | `React.ReactNode` | 子元素 | - |
| auto | `boolean` | 是否自动生成锚点 | `false` |
| name | `string` | 锚点组名称（用于自动生成） | - |
| defaultActiveKey | `string` | 锚点默认位置 | - |
| activeKey | `string` | 锚点位置（受控） | - |
| affix | `boolean` | 是否固定 | `true` |
| direction | `'vertical' \| 'horizontal'` | 设置导航方向 | `'vertical'` |
| offsetTop | `number` | 距离顶部距离为多少时，触发锚点改变 | `0` |
| getContainer | `() => HTMLElement \| Window` | 获取滚动的元素 | - |
| onChange | `(key: string) => void` | 锚点改变回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### AnchorItemType

| 属性名 | 类型 | 描述 |
| --- | --- | --- |
| key | `string` | 唯一标志 |
| title | `React.ReactNode` | 标题 |
| status | `'success' \| 'error' \| 'warning'` | 状态 |

### AnchorItemProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| targetKey | `string` | 目标元素的 key | - |
| title | `React.ReactNode` | 标题 | - |
| status | `'success' \| 'error' \| 'warning'` | 状态 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| level | `number` | 层级 | - |
| children | `React.ReactNode` | 子元素 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticDOM

| 类型 |
| --- |
| `'item' \| 'active' \| 'content'` |

## 自动生成模式（auto）

设置 `auto` 并提供 `name` 时，组件会从 DOM 中扫描带 `data-anchor-group="<name>"` 的元素，自动生成锚点列表。每个目标元素需标注以下属性：

| 属性 | 说明 |
| --- | --- |
| `data-anchor-group` | 分组名，必须等于 `name` |
| `id` | 作为锚点 key 与滚动目标（必填） |
| `data-anchor-title` | 导航项标题（必填，缺失则该项被跳过） |
| `data-anchor-status` | 可选状态，`success` / `error` / `warning` |

注意事项：

- `auto` 与 `items` 互斥，同时传入时以 `auto` 扫描结果为准，`items` 被忽略。
- 组件在挂载时扫描一次 DOM；若目标区块为异步渲染，请保证其在组件挂载时已存在于 DOM 中，否则扫描不到。

## 注意事项

- 移动端暂未适配，affix 模式依赖 hover 交互，触摸设备不支持