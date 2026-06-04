---
category: Components
title: Steps
subtitle: 步骤条
group:
  title: 导航
  order: 2
toc: 'content'
---

# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Steps的基础用法"></code>
<code src="./demo/vertical.tsx" title="垂直方向" description="垂直方向的步骤条"></code>
<code src="./demo/size.tsx" title="小尺寸" description="小尺寸的步骤条"></code>
<code src="./demo/dot.tsx" title="点状步骤条" description="点状样式的步骤条"></code>
<code src="./demo/icon.tsx" title="自定义图标" description="自定义图标的步骤条"></code>
<code src="./demo/error.tsx" title="错误状态" description="错误状态的步骤条"></code>

## API

### StepsProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| items | `Array<StepItem>` | 步骤项 | - |
| children | `React.ReactNode` | 子元素 | - |
| current | `number` | 指定当前步骤 | `0` |
| size | `'small'` | 指定尺寸 | - |
| status | `'error' \| 'wait' \| 'process' \| 'finish'` | 指定当前步骤的状态 | - |
| dot | `boolean` | 点状步骤条 | - |
| direction | `'vertical' \| 'horizontal'` | 步骤条方向 | `horizontal` |
| type | `'navigation' \| 'ribbon'` | 步骤条类型 | - |
| onChange | `(current: number) => void` | 点击切换步骤时触发 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### StepItem

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| icon | `React.ReactNode` | 自定义图标 | - |
| disabled | `boolean` | 是否禁用 | - |
| title | `React.ReactNode` | 标题 | - |
| subTitle | `React.ReactNode` | 子标题 | - |
| description | `React.ReactNode` | 描述 | - |
| status | `'wait' \| 'process' \| 'finish' \| 'error'` | 步骤状态 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### StepProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| index | `number` | 步骤索引 | - |
| icon | `React.ReactNode` | 自定义图标 | - |
| disabled | `boolean` | 是否禁用 | - |
| title | `React.ReactNode` | 标题 | - |
| subTitle | `React.ReactNode` | 子标题 | - |
| description | `React.ReactNode` | 描述 | - |
| status | `'wait' \| 'process' \| 'finish' \| 'error'` | 步骤状态 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| onChange | `() => void` | 点击事件 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |