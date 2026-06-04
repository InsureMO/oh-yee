---
category: Components
title: Timeline
subtitle: 时间轴
group:
  title: 数据展示
  order: 45
toc: 'content'
---

# Timeline 时间轴 <span class="yee-mobile-badge" />

垂直展示的时间流信息。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Timeline的基础用法"></code>
<code src="./demo/mode.tsx" title="位置" description="不同的位置模式"></code>
<code src="./demo/status.tsx" title="状态" description="不同状态的时间轴"></code>
<code src="./demo/custom.tsx" title="自定义" description="自定义时间轴点"></code>
<code src="./demo/reverse.tsx" title="逆序" description="逆序的时间轴"></code>
<code src="./demo/pending.tsx" title="待处理" description="带有待处理项的时间轴"></code>

## API

### TimelineProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| mode | `'left' \| 'alternate' \| 'right'` | 设置时间轴和内容的相对位置 | `left` |
| children | `React.ReactElement[]` | 子元素 | - |
| items | `Array<TimelineItemProps>` | 时间轴项 | - |
| reverse | `boolean` | 逆序 | - |
| pending | `boolean` | 最后一个节点处于加载状态 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### TimelineItemProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| index | `number` | 序号 | - |
| children | `React.ReactNode` | 设置内容 | - |
| dot | `React.ReactNode` | 设置时间轴点 | - |
| label | `React.ReactNode` | 设置标签 | - |
| status | `TimelineItemStatus` | 设置状态 | - |
| color | `string` | 设置轴点颜色 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### TimelineItemStatus

```typescript
type TimelineItemStatus = 'success' | 'info' | 'error' | 'warning' | 'disabled';
```

## 注意事项

- 已适配移动端（alternate/left/right 模式自动降级为单列左对齐）