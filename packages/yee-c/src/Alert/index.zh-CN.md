---
category: Components
title: Alert
subtitle: 警告提示
group:
  title: 反馈
  order: 0
toc: 'content'
---

# Alert 警告提示 <span class="yee-mobile-badge" />

警告提示组件，用于展示重要信息或消息。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Alert的基础用法"></code>
<code src="./demo/status.tsx" title="状态" description="Alert的不同状态：info、success、warning、error"></code>
<code src="./demo/banner.tsx" title="顶部公告" description="用作顶部公告的重要信息提示"></code>
<code src="./demo/icon.tsx" title="自定义图标" description="自定义图标或禁用默认图标"></code>

## API

### AlertProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 结构化样式 | - |
| title | `React.ReactNode` | 标题 | - |
| description | `React.ReactNode` | 提示内容 | - |
| icon | `React.ReactNode` | 自定义图标 | - |
| closable | `boolean` | 是否可关闭 | - |
| status | `'info' \| 'success' \| 'error' \| 'warning'` | 状态 | `'info'` |
| showIcon | `boolean` | 是否显示图标 | `true` |
| banner | `boolean` | 是否用作顶部公告 | - |
| onClose | `() => void` | 关闭回调函数 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### CycleProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| description | `string \| string[]` | 消息 | - |
| direction | `'vertical' \| 'horizontal'` | 循环滚动方向 | - |
| mode | `'turn'` | 滚动模式 | - |
| speed | `number` | 滚动速度 | - |
| delay | `number` | 延迟滚动时间 | - |
| pauseOnHover | `boolean` | 鼠标覆盖时暂停滚动 | `true` |
| pauseOnClick | `boolean` | 鼠标点击时暂停滚动 | - |
| row | `number` | 垂直滚动时，一次滚动几行 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

## 注意事项

- 已适配移动端（加大内边距、关闭按钮触控区域 44px）