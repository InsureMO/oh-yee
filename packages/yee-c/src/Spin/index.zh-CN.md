---
category: Components
title: Spin
subtitle: 加载中
group:
  title: 反馈
  order: 37
toc: 'content'
---

# Spin 加载中

用于页面和区块的加载中状态。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Spin的基础用法"></code>
<code src="./demo/types.tsx" title="各种类型" description="不同类型的Spin"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的Spin"></code>
<code src="./demo/color.tsx" title="颜色" description="不同颜色的Spin"></code>
<code src="./demo/custom.tsx" title="自定义尺寸" description="自定义宽高"></code>
<code src="./demo/container.tsx" title="容器" description="容器内的加载状态"></code>
<code src="./demo/tip.tsx" title="提示文字" description="带提示文字的加载"></code>

## API

### SpinProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| type | `SpinType` | 加载类型 | - |
| color | `'info' \| 'success' \| 'warning' \| 'error' \| 'default' \| string` | 颜色 | - |
| fullscreen | `boolean` | 全屏显示 | - |
| getContainer | `() => HTMLElement` | 获取Spin挂载节点，仅在fullscreen为true时生效 | - |
| size | `'small' \| 'default' \| 'large'` | 图标尺寸 | - |
| spinning | `boolean` | 是否为加载中状态 | - |
| width | `number` | 自定义宽度 | - |
| height | `number \| string` | 自定义高度 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根行内样式 | - |
| classNames | `Partial<Record<'tip' \| 'indicator', string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<'tip' \| 'indicator', React.CSSProperties>>` | 语义化结构样式 | - |
| tip | `React.ReactNode` | 加载状态的提示词 | - |
| delay | `number` | 延迟显示加载效果的时间（毫秒） | - |
| variant | `'dot' \| 'ring' \| 'spokes'` | 加载器样式变体，`ring` 为圆环转圈，`spokes` 为辐条旋转 | `'dot'` |
| indicator | `React.ReactNode` | 加载器指示符 | - |
| mask | `boolean` | 是否显示遮罩 | - |
| children | `React.ReactNode` | 子元素 | - |

### SpinType

| 类型 | 描述 |
| --- | --- |
| blank | 空白类型 |
| balls | 小球类型 |
| bars | 条形类型 |
| bubbles | 气泡类型 |
| cubes | 方块类型 |
| cylon | 赛隆类型 |
| spin | 旋转类型 |
| spinningBubbles | 旋转气泡类型 |
| spokes | 辐条类型 |