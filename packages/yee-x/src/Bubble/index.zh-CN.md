---
category: Components
title: Bubble
subtitle: 气泡框
group:
  title: 通用
  order: 0
toc: 'content'
---

# 对话气泡组件

用于聊天的气泡组件

## 代码演示

<code src="./demo/basic.tsx" title="基础" description="基础使用"></code>
<code src="./demo/avator.tsx" title="头像" description="设置头像，通过<i>placement</i>设置头像位置, 可选<i>start</i>和<i>end</i>"></code>
<code src="./demo/list.tsx" title="气泡列表" description="气泡列表，通过配置roles信息，对气泡进行分类"></code>
<code src="./demo/header-footer.tsx" title="头和尾" description="通过<i>header</i>和<i>footer</i>设置气泡的头部和尾部"></code>

### API

### CompositionDOM

| 类型 |
|------|
| `'header' \| 'content' \| 'footer' \| 'avatar'` |

### BubbleProps

| 属性名      | 类型            | 描述         |  默认值    |
|------------|-----------------|--------------|-----------|
| classNames | `Partial<Record<CompositionDOM, string>>`  | 语义化结构的类名 |   -   |
| styles     | `Partial<Record<CompositionDOM, React.CSSProperties>>` | 语义化结构的行内样式 | -  |
| components | `Partial<Record<CompositionDOM, React.ReactNode \| (() => React.ReactNode)>` | 语义化结构组件 | -  |
| avatar     | `AvatarProps`     | 设置头像，属性参见Avatar | -   |
| header     | `React.ReactNode` | 头部内容                | -   |
| content    | `React.ReactNode` | 消息内容                | -   |
| prefix     | `React.ReactNode` | 消息前缀                | -   |
| suffix     | `React.ReactNode` | 消息后缀                | -   |
| footer     | `React.ReactNode \| ((props: { role: string; content: React.ReactNode; latest?: boolean; loading?: boolean; }) => React.ReactNode)` | 底部内容                | -   |
| loading    | `boolean`         | 加载状态                | -   |
| placement  | `'start' \| 'end'`| 消息位置                | `'start'` |
| shape      | `'round'`         | 气泡形状                | -   |
| typing     | `boolean`         | 打字效果                | -   |
| visible    | `boolean`         | 是否可见                | -   |

### RoleType

| 类型   |
|--------|
| `Omit<BubbleProps, 'content'> & { role: string; }` |

### BubbleListProps

| 属性名      | 类型           | 描述         |   默认值    |
|------------|----------------|--------------|-------------|
| items      | `Array<BubbleProps & { key?: string \| number; role?: string }>` | 气泡列表  | -  |
| autoScroll | `boolean`      | 自动滚动到最新为止，如果用户滚动则停止 | `true`   |
| prefixCls  | `string`       | 类名前缀                       | - |
| parser     | `'markdown' \| ((params: { role: string; content: string }) => React.ReactNode)` | 定义气泡内容解析器 | - |
| roles      | `Record<string, RoleType>` | 角色定义   |  -   |
| render     | `(props: BubbleProps) => React.ReactNode` | 自定义渲染气泡 | - |