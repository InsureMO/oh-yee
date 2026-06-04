---
category: Components
title: ImageViewer
subtitle: Image Viewer
group:
  title: Data Display
  order: 8
toc: 'content'
---

# ImageViewer <span class="yee-mobile-badge" />

A component for zooming, rotating, flipping, and downloading images. Supports inline and popup modes.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Inline image viewer with zoom, rotate, flip, and download"></code>
<code src="./demo/popup.tsx" title="Popup Mode" description="View image in a popup overlay"></code>
<code src="./demo/position.tsx" title="Toolbar Position" description="Set toolbar position: top, bottom, left, right"></code>

## API

### ImageViewerProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `'yee-image-viewer'` |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Semantic structure class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Semantic structure styles | - |
| src | `string` | Image URL | - |
| alt | `string` | Image alternate text | - |
| position | `'top' | 'bottom' | 'left' | 'right'` | Toolbar position | `'bottom'` |
| name | `string` | Download file name | - |
| min | `number` | Minimum scale ratio | `0.5` |
| max | `number` | Maximum scale ratio | `3` |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### ImageViewerPopupProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `'yee-image-viewer'` |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| open | `boolean` | Whether the popup is visible | - |
| defaultOpen | `boolean` | Default visible state | - |
| destroyOnClose | `boolean` | Whether to destroy DOM on close | `true` |
| getContainer | `() => HTMLElement` | Custom mount node | - |
| maskClosable | `boolean` | Whether clicking mask closes popup | `true` |
| keyboard | `boolean` | Whether ESC key closes popup | `true` |
| children | `React.ReactNode` | Child nodes | - |
| onClose | `() => void` | Close callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### SemanticDOM

| Type |
| --- |
| `'toolbar' | 'wrapper'` |

## Notes

- Adapted for mobile (close button 44px, toolbar buttons 32px, reduced padding)
