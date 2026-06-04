---
category: Components
title: Ellipsis
subtitle: Ellipsis
group:
  title: Data Display
  order: 5
toc: 'content'
demo:
  cols: 2
---

# Ellipsis <span class="yee-mobile-badge" />

Display long text with automatic truncation and expand/collapse functionality.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Display 3 lines by default, with expand button to view full content"></code>
<code src="./demo/lines.tsx" title="Different Lines" description="Set the maximum number of lines to display with lines property"></code>
<code src="./demo/customText.tsx" title="Custom Button Text" description="Customize expand/collapse button text with expandText and collapseText"></code>
<code src="./demo/customEllipsis.tsx" title="Hide Expand Button" description="Set showExpandButton to false to only show ellipsis without expand button"></code>
<code src="./demo/defaultExpanded.tsx" title="Default Expanded" description="Set defaultExpanded to control initial expanded state"></code>
<code src="./demo/controlled.tsx" title="Controlled Mode" description="Use expanded and onExpand for controlled mode"></code>
<code src="./demo/noAnimation.tsx" title="Disable Animation" description="Set animated to false to disable expand/collapse animation"></code>

## API

### EllipsisProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| children | `React.ReactNode` | Text content | - |
| lines | `number` | Maximum number of lines to display | `3` |
| expandText | `string` | Expand button text | `"Expand"` |
| collapseText | `string` | Collapse button text | `"Collapse"` |
| defaultExpanded | `boolean` | Whether to expand by default | `false` |
| expanded | `boolean` | Controlled mode: whether expanded | - |
| onExpand | `(expanded: boolean) => void` | Expand/collapse callback | - |
| showExpandButton | `boolean` | Whether to show expand button | `true` |
| animated | `boolean` | Whether to enable animation | `true` |
| animationDuration | `number` | Animation duration (milliseconds) | `300` |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |
