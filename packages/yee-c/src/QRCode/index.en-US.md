---
category: Components
title: QRCode
subtitle: QR Code
group:
  title: Data Display
  order: 5
toc: 'content'
---

# QRCode <span class="yee-mobile-badge" />

Component for generating and displaying QR codes.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of QRCode"></code>
<code src="./demo/size.tsx" title="Size" description="QR codes with different sizes"></code>
<code src="./demo/svg.tsx" title="SVG Mode" description="QR code rendered with SVG"></code>
<code src="./demo/color.tsx" title="Custom Color" description="QR code with custom color"></code>
<code src="./demo/icon.tsx" title="With Icon" description="QR code with icon"></code>
<code src="./demo/status.tsx" title="Status" description="QR codes with different statuses"></code>
<code src="./demo/bordered.tsx" title="Bordered" description="QR codes with or without border"></code>
<code src="./demo/errorLevel.tsx" title="Error Level" description="QR codes with different error correction levels"></code>

## API

### QRCodeProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| value | `string` | QR code value (required) | - |
| type | `'canvas' \| 'svg'` | Render method | `'canvas'` |
| size | `number` | QR code size | `160` |
| icon | `string` | Icon URL in QR code | - |
| iconSize | `number` | Icon size in QR code | - |
| color | `string` | QR code color | `#333` |
| bgColor | `string` | QR code background color | `'transparent'` |
| errorLevel | `'L' \| 'M' \| 'Q' \| 'H'` | QR code error correction level | `'M'` |
| bordered | `boolean` | Whether has border | `true` |
| status | `'active' \| 'loading' \| 'expired' \| 'scanned'` | QR code status | `'active'` |
| message | `string` | Status message | - |
| onRefresh | `() => void` | Callback when refresh button clicked | - |
| statusRender | `(info: { status, onRefresh }) => ReactNode` | Custom status render | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

## Notes

- `value` property is required
- When `status` is `'loading'`, loading animation will be displayed
- When `status` is `'expired'`, expired message and refresh button will be displayed
- When `status` is `'scanned'`, scanned message will be displayed
- Higher error correction level means more tolerance to damage, but also higher QR code density
