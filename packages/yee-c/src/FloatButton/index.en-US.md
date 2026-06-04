---
category: Components
title: FloatButton
subtitle: Float Button
group:
  title: General
  order: 1
toc: 'content'
---

# FloatButton

Floating button that can be placed anywhere on the page.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of FloatButton"></code>
<code src="./demo/shape.tsx" title="Shape" description="Different button shapes"></code>
<code src="./demo/description.tsx" title="Description" description="Button with description"></code>
<code src="./demo/draggable.tsx" title="Draggable" description="Draggable float button"></code>
<code src="./demo/popup.tsx" title="Popup" description="FloatButton with popup"></code>
<code src="./demo/backtop.tsx" title="BackTop" description="Back to top button"></code>
<code src="./demo/group.tsx" title="Group" description="FloatButton group"></code>

## API

### FloatButtonProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| icon | `React.ReactNode \| ((props: FloatButtonProps) => React.ReactNode)` | Custom icon | - |
| shape | `'circle' \| 'square'` | Set button shape | `'circle'` |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root element class name | - |
| style | `React.CSSProperties` | Custom root element style | - |
| classNames | `Partial<Record<FloatButtonSemanticDOM, string>>` | Structured class name | - |
| styles | `Partial<Record<FloatButtonSemanticDOM, React.CSSProperties>>` | Structured style | - |
| description | `React.ReactNode \| (() => React.ReactNode)` | Set button description | - |
| draggable | `boolean` | Set button draggable | - |
| popup | `React.ReactNode \| (() => React.ReactNode)` | Set button popup | - |
| type | `'default' \| 'primary'` | Type | `'default'` |
| dragLimitInWindow | `boolean` | Whether to limit dragging within window | - |
| onClick | `(e: React.MouseEvent<HTMLButtonElement>) => void` | Click event callback | - |
| onDragChange | `(draging: boolean, ref: React.RefObject<HTMLButtonElement>) => void` | Drag state change callback | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### BackTopProps

BackTopProps extends FloatButtonProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| scrollTop | `number` | When the scrollbar is at a certain height from the top, display the back to top button | - |
| getContainer | `() => HTMLElement` | Get scroll element | `document.body` |
| onClick | `(e: React.MouseEvent<HTMLButtonElement>) => void` | Click event | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### FloatButtonGroupProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom root element class name | - |
| style | `React.CSSProperties` | Custom root element style | - |
| trigger | `'hover' \| 'click'` | Trigger the event to display the pop-up layer | - |
| shape | `'circle' \| 'square'` | Button shape | - |
| children | `React.ReactNode \| React.ReactNode[]` | Children | - |
| placement | `'top' \| 'bottom' \| 'left' \| 'right'` | Popup layer position | - |
| popupClassName | `string` | - | - |
| onVisibleChange | `(visible: boolean) => void` | - | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### FloatButtonSemanticDOM

| Type |
| --- |
| `'icon' \| 'description'` |