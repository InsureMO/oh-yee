---
category: Components
title: Watermark
subtitle: Watermark
group:
  title: Data Display
  order: 45
toc: 'content'
---

# Watermark <span class="yee-mobile-badge" />

Add watermarks to pages or components to prevent information leakage or identify document status. Supports text and image watermarks with deletion protection.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic text watermark"></code>
<code src="./demo/long-text.tsx" title="Long Text Auto-fit" description="Text watermark auto-calculates width and height"></code>
<code src="./demo/fixed-size.tsx" title="Fixed Size" description="Force using specified width and height"></code>
<code src="./demo/image.tsx" title="Image Watermark" description="Use image as watermark"></code>
<code src="./demo/custom-style.tsx" title="Custom Style" description="Custom watermark font style"></code>
<code src="./demo/custom-layout.tsx" title="Custom Layout" description="Custom watermark spacing and angle"></code>
<code src="./demo/multi-line.tsx" title="Multi-line Text" description="Display multiple lines of watermark text"></code>
<code src="./demo/dynamic.tsx" title="Dynamic Watermark" description="Dynamically modify watermark content"></code>
<code src="./demo/with-card.tsx" title="With Card" description="Use watermark in Card component"></code>

## API

### WatermarkProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | `yee-watermark` |
| children | `React.ReactNode` | Child nodes | - |
| style | `React.CSSProperties` | Custom root style | - |
| className | `string` | Custom root class name | - |
| classNames | `Record<'wrapper', string>` | Semantic structure class names | - |
| styles | `Record<'wrapper', React.CSSProperties>` | Semantic structure styles | - |
| content | `string \| string[]` | Watermark text content | - |
| image | `string` | Watermark image source (Base64 or URL) | - |
| width | `number` | Watermark width (optional for text, required for image) | - |
| height | `number` | Watermark height (optional for text, required for image) | - |
| rotate | `number` | Watermark rotation angle (degrees) | `-22` |
| gapX | `number` | Horizontal gap between watermarks (px) | `100` |
| gapY | `number` | Vertical gap between watermarks (px) | `0` |
| offsetLeft | `number` | X-axis offset from container top-left corner | `0` |
| offsetTop | `number` | Y-axis offset from container top-left corner | `0` |
| zIndex | `number` | Z-index of watermark layer | `9` |
| fontColor | `string` | Watermark text color | `rgba(0, 0, 0, 0.15)` |
| fontSize | `number` | Watermark text size (px) | `16` |
| fontFamily | `string` | Watermark text font family | `sans-serif` |
| fontWeight | `'normal' \| 'light' \| 'weight' \| number` | Watermark text font weight | `normal` |
| fontStyle | `'none' \| 'normal' \| 'italic' \| 'oblique'` | Watermark text font style | `normal` |
| opacity | `number` | Watermark opacity (0-1) | `1` |
| preventDelete | `boolean` | Whether to enable deletion protection | `true` |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

## Deletion Protection

The component has built-in deletion protection:

- Uses `MutationObserver` to monitor DOM changes
- Automatically restores watermark when deleted
- Automatically restores original values when attributes are modified
- Can be disabled with `preventDelete={false}`

## Notes

1. The watermark layer uses `pointer-events: none` and won't affect user interactions
2. Image watermarks have higher priority than text watermarks
3. **Text watermark**: width and height are optional; auto-calculated if not specified, forced if specified
4. **Image watermark**: width and height must be specified
5. It's recommended to use light semi-transparent watermarks to avoid affecting content readability
6. Multi-line text watermarks are vertically arranged in order
