---
category: Components
title: ImageViewer
subtitle: 图片查看器
group:
  title: 数据展示
  order: 8
toc: 'content'
---

# ImageViewer 图片查看器 <span class="yee-mobile-badge" />

用于图片的缩放、旋转、翻转和下载等操作，支持内嵌和弹窗两种模式。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="内嵌模式下的图片查看器，支持缩放、旋转、翻转和下载"></code>
<code src="./demo/popup.tsx" title="弹窗模式" description="点击按钮在弹窗中查看图片"></code>
<code src="./demo/position.tsx" title="工具栏位置" description="设置操作工具栏的位置：上、下、左、右"></code>

## API

### ImageViewerProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `'yee-image-viewer'` |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义化结构样式 | - |
| src | `string` | 图片地址 | - |
| alt | `string` | 图片替代文本 | - |
| position | `'top' | 'bottom' | 'left' | 'right'` | 操作栏位置 | `'bottom'` |
| name | `string` | 下载文件名 | - |
| min | `number` | 最小缩放比例 | `0.5` |
| max | `number` | 最大缩放比例 | `3` |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### ImageViewerPopupProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `'yee-image-viewer'` |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| open | `boolean` | 是否显示弹窗 | - |
| defaultOpen | `boolean` | 默认是否显示弹窗 | - |
| destroyOnClose | `boolean` | 关闭时是否销毁 DOM | `true` |
| getContainer | `() => HTMLElement` | 自定义挂载节点 | - |
| maskClosable | `boolean` | 是否点击遮罩层关闭 | `true` |
| keyboard | `boolean` | 是否支持 ESC 关闭 | `true` |
| children | `React.ReactNode` | 子节点 | - |
| onClose | `() => void` | 关闭回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticDOM

| 类型 |
| --- |
| `'toolbar' | 'wrapper'` |

## 注意事项

- 已适配移动端（关闭按钮 44px、工具栏按钮 32px、减少内边距）
