---
category: Components
title: Dialog
subtitle: Dialog
group:
  title: Feedback
  order: 14
toc: 'content'
---

# Dialog

A modal dialog box that appears on top of the main content.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Dialog"></code>
<code src="./demo/custom-buttons.tsx" title="Custom Buttons" description="Customize button text and type"></code>
<code src="./demo/custom-footer.tsx" title="Custom Footer" description="Customize footer content"></code>
<code src="./demo/without-mask.tsx" title="Without Mask" description="Dialog without mask"></code>
<code src="./demo/draggable.tsx" title="Draggable" description="Draggable dialog"></code>

## API

### DialogProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Structured class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Structured styles | - |
| closable | `boolean` | Whether to show close button | `true` |
| footer | `boolean \| React.ReactNode` | Footer content | - |
| showMask | `boolean` | Whether to show mask | `true` |
| maskClosable | `boolean` | Whether to close dialog when clicking mask | `true` |
| width | `number \| string` | Width of dialog | - |
| children | `React.ReactNode` | Child nodes | - |
| title | `string` | Title | - |
| cancelText | `string` | Cancel button text | `'Cancel'` |
| cancelType | [ButtonType](/components/button) | Cancel button type | - |
| confirmText | `string` | Confirm button text | - |
| confirmType | [ButtonType](/components/button) | Confirm button type | - |
| open | `boolean` | Whether to show dialog, controlled mode | - |
| defaultOpen | `boolean` | Whether to show dialog by default | - |
| destroyOnClose | `boolean` | Whether to destroy DOM node after closing | - |
| keyboard | `boolean` | Close dialog with Esc key | `true` |
| getContainer | `() => HTMLElement` | Custom dialog mount node | - |
| onCancel | `() => void` | Callback when closing dialog | - |
| onConfirm | `() => void` | Callback when clicking confirm | - |
| draggable | `boolean` | Whether dialog is draggable | - |
| dragLimitInWindow | `boolean` | Limit dragging within window | `true` |
| openResetLocation | `boolean` | Reset position when reopened after dragging | `true` |
| fullscreen | `boolean` | Fullscreen mode | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticDOM

| Type |
| --- |
| `'content' \| 'footer' \| 'mask'` |