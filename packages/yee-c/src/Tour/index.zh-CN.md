---
category: Components
title: Tour
subtitle: 新手引导
group:
  title: 反馈
  order: 29
toc: 'content'
---

# Tour 新手引导

步骤式新手引导：全屏遮罩 + 高亮目标元素 + 贴附说明卡片，支持多步推进、进度指示、自动滚动定位。常用于产品功能向导、新用户 onboarding。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="多步引导，受控 open，支持上一步/下一步/完成/跳过"></code>
<code src="./demo/placement.tsx" title="气泡位置" description="卡片相对目标的 placement，靠近视口边缘时自动翻转"></code>
<code src="./demo/indicators.tsx" title="自定义进度指示" description="通过 indicatorsRender 自定义步骤进度点"></code>
<code src="./demo/scroll.tsx" title="滚动定位与容错" description="切换步骤时自动滚动到目标；目标不存在时卡片居中"></code>

## API

### TourProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| open | `boolean` | 是否显示引导（受控） | - |
| steps | `TourStep[]` | 引导步骤 | - |
| current | `number` | 受控当前步骤索引 | - |
| defaultCurrent | `number` | 默认当前步骤索引 | `0` |
| onClose | `() => void` | 关闭/跳过时的回调 | - |
| onFinish | `() => void` | 完成全部步骤时的回调 | - |
| onChange | `(current: number) => void` | 步骤变化时的回调 | - |
| placement | `Placement` | 卡片默认位置 | `'bottom'` |
| arrow | `boolean` | 是否显示卡片箭头 | - |
| mask | `boolean` | 是否显示遮罩（含高亮挖洞与点击锁定） | `true` |
| closable | `boolean` | 是否显示右上关闭按钮 | `true` |
| closeIcon | `React.ReactNode` | 自定义关闭图标 | - |
| maskClosable | `boolean` | 点击遮罩是否关闭 | `false` |
| indicatorsRender | `(current: number, total: number) => React.ReactNode` | 自定义进度指示 | 默认 `current+1 / total` |
| scrollIntoViewOptions | `boolean \| ScrollIntoViewOptions` | 切换步骤时目标 scrollIntoView 的参数 | `true` |
| className / style | | 自定义根类名/样式 | - |
| classNames / styles | `Partial<Record<'highlight' \| 'content' \| 'header' \| 'body' \| 'footer', …>>` | 语义化结构类名/样式 | - |

> `Placement` = `'top' \| 'right' \| 'bottom' \| 'left' \| 'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'leftTop' \| 'leftBottom' \| 'rightTop' \| 'rightBottom'`，与 `Trigger` 一致。

### TourStep

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| target | `(() => HTMLElement \| null) \| string \| HTMLElement` | 高亮目标（查找函数 / CSS 选择器 / 元素） | - |
| title | `React.ReactNode` | 卡片标题 | - |
| description | `React.ReactNode` | 卡片描述 | - |
| placement | `Placement` | 该步卡片位置，覆盖 TourProps.placement | - |
| arrow | `boolean` | 该步是否显示箭头 | - |
| className | `string` | 该步卡片自定义类名 | - |

### 内置文案

按钮（上一步/下一步/完成/跳过）与进度文案取自 `locale.tour`（`previous`/`next`/`finish`/`skip`），随 `ConfigProvider` 的 locale 切换；可通过语言包或 `ConfigProvider.value.tour` 覆盖。
