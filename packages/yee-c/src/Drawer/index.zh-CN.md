---
category: Components
title: Drawer
subtitle: 抽屉
group:
  title: 反馈
  order: 16
toc: 'content'
---

# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Drawer的基础用法"></code>
<code src="./demo/placement.tsx" title="不同方向" description="不同方向的抽屉"></code>
<code src="./demo/without-mask.tsx" title="无遮罩" description="无遮罩的抽屉"></code>
<code src="./demo/footer.tsx" title="自定义页脚" description="自定义页脚的抽屉"></code>
<code src="./demo/closable.tsx" title="可关闭" description="不显示关闭按钮的抽屉"></code>

## API

### DrawerProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义前缀类名 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 语义化结构类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 语义化结构样式 | - |
| title | `React.ReactNode` | 标题 | - |
| footer | `React.ReactNode \| (() => React.ReactNode)` | 抽屉的页脚 | - |
| showMask | `boolean` | 是否展示遮罩 | `true` |
| maskClosable | `boolean` | 点击遮罩是否可关闭 | `true` |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | 抽屉的方向 | `'right'` |
| height | `number \| string` | 高度；仅在placement为top或bottom时生效 | - |
| width | `number \| string` | 宽度；仅在placement为left或right时生效 | - |
| open | `boolean` | 是否打开抽屉 | - |
| destroyOnClose | `boolean` | 关闭时是否销毁DOM | - |
| children | `React.ReactNode` | 子元素 | - |
| closable | `boolean \| { icon: React.ReactNode; placement: 'left' \| 'right' }` | 是否显示右上角的关闭按钮 | - |
| getContainer | `() => HTMLElement` | 指定抽屉的挂载点 | - |
| keyboard | `boolean` | 是否支持键盘 esc 关闭 | `true` |
| onClose | `() => void` | 关闭抽屉的回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticDOM

| 类型 |
| --- |
| `'mask' \| 'wrapper' \| 'close' \| 'header' \| 'content' \| 'body' \| 'footer'` |