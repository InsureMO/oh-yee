---
category: Components
title: Dialog
subtitle: 对话框
group:
  title: 反馈
  order: 14
toc: 'content'
---

# Dialog 对话框

在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Dialog的基础用法"></code>
<code src="./demo/custom-buttons.tsx" title="自定义按钮" description="自定义按钮文字和类型"></code>
<code src="./demo/custom-footer.tsx" title="自定义页脚" description="自定义页脚内容"></code>
<code src="./demo/without-mask.tsx" title="无遮罩" description="无遮罩的对话框"></code>
<code src="./demo/draggable.tsx" title="可拖拽" description="可拖拽的对话框"></code>

## API

### DialogProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义根类名 | - |
| style | `React.CSSProperties` | 自定义根样式 | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | 结构化类名 | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | 结构化样式 | - |
| closable | `boolean` | 是否显示关闭按钮 | `true` |
| footer | `boolean \| React.ReactNode` | 底部按钮 | - |
| showMask | `boolean` | 是否显示遮罩层 | `true` |
| maskClosable | `boolean` | 是否可以点击遮罩层关闭弹窗 | `true` |
| width | `number \| string` | 宽度 | - |
| children | `React.ReactNode` | 子节点 | - |
| title | `string` | 标题 | - |
| cancelText | `string` | 取消按钮文字 | `'Cancel'` |
| cancelType | [ButtonType](/components/button) | 取消按钮类型 | - |
| confirmText | `string` | 确认按钮文字 | - |
| confirmType | [ButtonType](/components/button) | 确认按钮类型 | - |
| open | `boolean` | 是否显示弹窗, 受控模式 | - |
| defaultOpen | `boolean` | 是否默认显示弹窗 | - |
| destroyOnClose | `boolean` | 是否关闭后销毁DOM节点 | - |
| keyboard | `boolean` | 使用Esc关闭弹窗 | `true` |
| getContainer | `() => HTMLElement` | 自定义弹窗挂载节点 | - |
| onCancel | `() => void` | 关闭弹窗时的回调 | - |
| onConfirm | `() => void` | 点击确认时的回调 | - |
| draggable | `boolean` | 是否可拖拽 | - |
| dragLimitInWindow | `boolean` | 拖动限制在当前窗口 | `true` |
| openResetLocation | `boolean` | 拖动之后关闭，再打开时是否重置位置 | `true` |
| fullscreen | `boolean` | 是否全屏 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### SemanticDOM

| 类型 |
| --- |
| `'content' \| 'footer' \| 'mask'` |