---
category: Components
title: Watermark
subtitle: 水印
group:
  title: 数据显示
  order: 45
toc: 'content'
---

# Watermark 水印 <span class="yee-mobile-badge" />

给页面或组件添加水印，防止信息泄露或标识文档状态。支持文本和图片水印，具备防删除保护功能。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="基本的文本水印"></code>
<code src="./demo/long-text.tsx" title="长文本自适应" description="文本水印自动计算宽高"></code>
<code src="./demo/fixed-size.tsx" title="固定尺寸" description="强制使用指定的宽高"></code>
<code src="./demo/image.tsx" title="图片水印" description="使用图片作为水印"></code>
<code src="./demo/custom-style.tsx" title="自定义样式" description="自定义水印字体样式"></code>
<code src="./demo/custom-layout.tsx" title="自定义布局" description="自定义水印间距和角度"></code>
<code src="./demo/multi-line.tsx" title="多行文本" description="显示多行水印文本"></code>
<code src="./demo/dynamic.tsx" title="动态水印" description="动态修改水印内容"></code>
<code src="./demo/with-card.tsx" title="配合卡片使用" description="在 Card 中使用水印"></code>

## API

### WatermarkProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `yee-watermark` |
| children | `React.ReactNode` | 子节点 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| className | `string` | 自定义根类名 | - |
| classNames | `Record<'wrapper', string>` | 语义化结构类名 | - |
| styles | `Record<'wrapper', React.CSSProperties>` | 语义化结构样式 | - |
| content | `string \| string[]` | 水印文本内容 | - |
| image | `string` | 水印图片源（Base64 或 URL） | - |
| width | `number` | 水印宽度（文本水印可选，图片水印必须） | - |
| height | `number` | 水印高度（文本水印可选，图片水印必须） | - |
| rotate | `number` | 水印旋转角度（度） | `-22` |
| gapX | `number` | 水印之间的水平间距（px） | `100` |
| gapY | `number` | 水印之间的垂直间距（px） | `0` |
| offsetLeft | `number` | 水印距离容器左上角的 x 轴偏移量 | `0` |
| offsetTop | `number` | 水印距离容器左上角的 y 轴偏移量 | `0` |
| zIndex | `number` | 水印的 z-index | `9` |
| fontColor | `string` | 水印文字颜色 | `rgba(0, 0, 0, 0.15)` |
| fontSize | `number` | 水印文字大小（px） | `16` |
| fontFamily | `string` | 水印文字字体 | `sans-serif` |
| fontWeight | `'normal' \| 'light' \| 'weight' \| number` | 水印文字粗细 | `normal` |
| fontStyle | `'none' \| 'normal' \| 'italic' \| 'oblique'` | 水印文字样式 | `normal` |
| opacity | `number` | 水印透明度（0-1） | `1` |
| preventDelete | `boolean` | 是否启用防删除保护 | `true` |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

## 防删除保护

组件内置了防删除保护机制：

- 使用 `MutationObserver` 监听 DOM 变化
- 检测水印节点被删除时自动恢复
- 检测水印属性被修改时自动恢复原始值
- 可通过 `preventDelete={false}` 关闭此功能

## 注意事项

1. 水印层使用 `pointer-events: none`，不会影响用户交互
2. 图片水印优先级高于文本水印
3. **文本水印**：width 和 height 可选，不指定时自动计算；指定时强制使用固定尺寸
4. **图片水印**：必须指定 width 和 height
5. 建议使用浅色半透明水印，避免影响内容阅读
6. 多行文本水印会按顺序垂直排列
