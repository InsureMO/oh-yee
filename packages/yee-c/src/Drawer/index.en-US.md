---
category: Components
title: Drawer
subtitle: Drawer
group:
  title: Feedback
  order: 16
toc: 'content'
---

# Drawer

A panel that slides out from the edge of the screen.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Drawer"></code>
<code src="./demo/placement.tsx" title="Placement" description="Different placement directions"></code>
<code src="./demo/without-mask.tsx" title="Without Mask" description="Drawer without mask"></code>
<code src="./demo/footer.tsx" title="Footer" description="Custom footer"></code>
<code src="./demo/closable.tsx" title="Closable" description="Drawer without close button"></code>

## API

### DrawerProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom prefix class name | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic structure styles | - |
| title | `React.ReactNode` | Title | - |
| footer | `React.ReactNode \| (() => React.ReactNode)` | Drawer footer | - |
| showMask | `boolean` | Whether to show mask | `true` |
| maskClosable | `boolean` | Whether to close when clicking mask | `true` |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | Drawer placement direction | `'right'` |
| height | `number \| string` | Height; only effective when placement is top or bottom | - |
| width | `number \| string` | Width; only effective when placement is left or right | - |
| open | `boolean` | Whether to open drawer | - |
| destroyOnClose | `boolean` | Whether to destroy DOM when closing | - |
| children | `React.ReactNode` | Child elements | - |
| closable | `boolean \| { icon: React.ReactNode; placement: 'left' \| 'right' }` | Whether to show close button | - |
| getContainer | `() => HTMLElement` | Specify drawer mount point | - |
| keyboard | `boolean` | Whether to support keyboard esc to close | `true` |
| onClose | `() => void` | Callback when closing drawer | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticDOM

| Type |
| --- |
| `'mask' \| 'wrapper' \| 'close' \| 'header' \| 'content' \| 'body' \| 'footer'` |