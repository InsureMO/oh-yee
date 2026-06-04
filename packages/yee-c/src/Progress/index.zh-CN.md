---
category: Components
title: Progress
subtitle: 进度条
group:
  title: 反馈
  order: 31
toc: 'content'
---

# Progress 进度条

展示操作的当前进度。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Progress的基础用法"></code>
<code src="./demo/type.tsx" title="类型" description="不同类型的Progress"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的Progress"></code>
<code src="./demo/color.tsx" title="颜色" description="自定义颜色的Progress"></code>
<code src="./demo/steps.tsx" title="步骤条" description="步骤进度条"></code>
<code src="./demo/format.tsx" title="格式化" description="自定义文本格式"></code>

## API

### ProgressProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根行内样式 | - |
| percent | `number` | 完成的百分比 | - |
| status | `'info' \| 'success' \| 'error' \| 'default' \| 'warning'` | 状态 | - |
| type | `'circle' \| 'line' \| 'dashboard'` | 进度条类型 | - |
| showInfo | `boolean` | 是否显示进度数字或提示 | `true` |
| strokeColor | `string | { '0%': string; '100%': string }` | 进度条颜色 | - |
| children | `React.ReactNode` | 子元素 | - |
| format | `(percent: number) => React.ReactNode` | 格式化显示的内容 | - |
| strokeWidth | `number` | 进度条线的宽度 | - |
| width | `number` | 圆形进度条的宽度 | - |
| done | `{ percent: number }` | 完成状态 | - |
| onMouseEnter | `(event: React.MouseEvent<HTMLDivElement>) => void` | 鼠标移入的回调事件 | - |
| onMouseLeave | `(event: React.MouseEvent<HTMLDivElement>) => void` | 鼠标移出的回调事件 | - |
| onClick | `(event: React.MouseEvent<HTMLDivElement>) => void` | 点击的回调事件 | - |

### LineProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| steps | `number` | 进度条总步数 | - |
| strokeColor | `string \| gradientColorType` | 进度条颜色 | - |
| children | `React.ReactNode` | 子元素 | - |

### StepsProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| steps | `number` | 段数 | `5` |
| strokeColor | `string \| string[]` | 进度条颜色 | - |
| children | `React.ReactNode` | 子元素 | - |

### CircleProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| strokeColor | `string \| Record<string, string>` | 进度条颜色 | - |
| children | `React.ReactNode` | 子元素 | - |