---
category: Components
title: Alert
subtitle: Alert
group:
  title: Feedback
  order: 0
toc: 'content'
---

# Alert <span class="yee-mobile-badge" />

Alert component for displaying important information or messages.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Alert"></code>
<code src="./demo/status.tsx" title="Status" description="Different status of Alert: info, success, warning, error"></code>
<code src="./demo/banner.tsx" title="Banner" description="Use as a banner for important announcements"></code>
<code src="./demo/icon.tsx" title="Custom Icon" description="Customize icon or disable default icon"></code>

## API

### AlertProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root class name | - |
| style | `React.CSSProperties` | Custom root style | - |
| classNames | `Partial<Record<SemanticDOM, string>>` | Structured class names | - |
| styles | `Partial<Record<SemanticDOM, React.CSSProperties>>` | Structured styles | - |
| title | `React.ReactNode` | Title | - |
| description | `React.ReactNode` | Alert content | - |
| icon | `React.ReactNode` | Custom icon | - |
| closable | `boolean` | Whether can be closed | - |
| status | `'info' \| 'success' \| 'error' \| 'warning'` | Status | `'info'` |
| showIcon | `boolean` | Whether to show icon | `true` |
| banner | `boolean` | Whether to use as top announcement | - |
| onClose | `() => void` | Callback when closed | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### CycleProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| description | `string \| string[]` | Messages | - |
| direction | `'vertical' \| 'horizontal'` | Scroll direction | - |
| mode | `'turn'` | Scroll mode | - |
| speed | `number` | Scroll speed | - |
| delay | `number` | Delay scroll time | - |
| pauseOnHover | `boolean` | Pause scroll on mouse hover | `true` |
| pauseOnClick | `boolean` | Pause scroll on mouse click | - |
| row | `number` | Number of rows to scroll vertically | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

## Notes

- Adapted for mobile (increased padding, close button touch target 44px)