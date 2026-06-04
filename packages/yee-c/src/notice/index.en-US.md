---
category: Components
title: notice
subtitle: notice
group:
  title: Notification
  order: 1
toc: 'content'
---

# notice

Display notification messages globally, supporting multiple positions simultaneously.

## When To Use

- Display notification messages in the four corners or at the top/bottom of the system
- Commonly used for:
  - More complex notification content
  - Interactive notifications that provide users with next steps
  - System-initiated push notifications

## Examples

<code src="./demo/basic.tsx" title="Basic" desc="The most basic usage, supports multiple positions"></code>

## API

### notice

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | Notice title | ReactNode | - |
| content | Notice content | ReactNode | - |
| duration | Time in seconds before the notice disappears. If set to 0, it will not automatically close | number | `4.5` |
| icon | Custom icon | ReactNode | - |
| key | The unique identifier of the current notice | string \| number | - |
| placement | Display position | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'top' \| 'bottom'` | `'topRight'` |
| showProgress | Whether to show progress bar | boolean | - |
| pauseOnHover | Whether to pause auto-close on mouse hover | boolean | - |
| closable | Whether to show close button | boolean | `true` |
| onClose | Callback function when notice is closed | function | - |
| onClick | Callback function when notice is clicked | function | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### notice Methods

| Method | Description | Type | Default |
| --- | --- | --- | --- |
| notice.open(config) | Open a normal notice | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.info(config) | Open an info notice | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.success(config) | Open a success notice | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.warning(config) | Open a warning notice | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.error(config) | Open an error notice | string \| [NoticeConfigs](#noticeconfigs) | - |
| notice.destroy(key) | Manually destroy the notice with the specified key | string \| number | - |

### NoticeConfigs

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls | Custom class name prefix | string | - |
| className | Custom class name | string | - |
| style | Custom inline style | CSSProperties | - |
| title | Notice title | ReactNode | - |
| content | Notice content | ReactNode | - |
| duration | Time in seconds before the notice disappears. If set to 0, it will not automatically close | number | `4.5` |
| icon | Custom icon | ReactNode | - |
| key | The unique identifier of the current notice | string \| number | - |
| placement | Display position | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' \| 'top' \| 'bottom'` | `'topRight'` |
| showProgress | Whether to show progress bar | boolean | - |
| pauseOnHover | Whether to pause auto-close on mouse hover | boolean | - |
| closable | Whether to show close button | boolean | `true` |
| onClose | Callback function when notice is closed | function | - |
| onClick | Callback function when notice is clicked | function | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |
