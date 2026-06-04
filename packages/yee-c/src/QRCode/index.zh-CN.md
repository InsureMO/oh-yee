---
category: Components
title: QRCode
subtitle: 二维码
group:
  title: 数据展示
  order: 5
toc: 'content'
---

# QRCode 二维码 <span class="yee-mobile-badge" />

用于生成和展示二维码的组件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="基础的二维码用法"></code>
<code src="./demo/size.tsx" title="尺寸" description="不同尺寸的二维码"></code>
<code src="./demo/svg.tsx" title="SVG 模式" description="使用 SVG 渲染二维码"></code>
<code src="./demo/color.tsx" title="自定义颜色" description="自定义二维码颜色"></code>
<code src="./demo/icon.tsx" title="带图标" description="带图标的二维码"></code>
<code src="./demo/status.tsx" title="状态" description="不同状态的二维码"></code>
<code src="./demo/bordered.tsx" title="边框" description="有无边框的二维码"></code>
<code src="./demo/errorLevel.tsx" title="容错级别" description="不同容错级别的二维码"></code>

## API

### QRCodeProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| value | `string` | 二维码的值（必填） | - |
| type | `'canvas' \| 'svg'` | 渲染方式 | `'canvas'` |
| size | `number` | 二维码大小 | `160` |
| icon | `string` | 二维码中图标地址 | - |
| iconSize | `number` | 二维码中图标大小 | - |
| color | `string` | 二维码颜色 | `#333` |
| bgColor | `string` | 二维码背景色 | `'transparent'` |
| errorLevel | `'L' \| 'M' \| 'Q' \| 'H'` | 二维码容错级别 | `'M'` |
| bordered | `boolean` | 是否有边框 | `true` |
| status | `'active' \| 'loading' \| 'expired' \| 'scanned'` | 二维码状态 | `'active'` |
| message | `string` | 状态提示信息 | - |
| onRefresh | `() => void` | 点击刷新按钮的回调 | - |
| statusRender | `(info: { status, onRefresh }) => ReactNode` | 自定义状态渲染 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义样式 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

## 注意事项

- `value` 属性是必填的
- 当 `status` 为 `'loading'` 时，会显示加载动画
- 当 `status` 为 `'expired'` 时，会显示过期提示和刷新按钮
- 当 `status` 为 `'scanned'` 时，会显示已扫描提示
- 容错级别越高，二维码能容忍的破损程度越大，但二维码密度也会越大
