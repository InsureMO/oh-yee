---
category: Components
title: message
subtitle: message
group:
  title: Notification
  order: 0
toc: 'content'
---

# message

Display global messages as feedback in response to user operations.

## When To Use

- To provide feedback such as success, warning and error.
- A message is displayed at the top center of the screen and disappears automatically. It is a lightweight way of informing users without interrupting their work.

## Examples

<code src="./demo/base.tsx">Basic Usage</code>

<code src="./demo/duration.tsx">Custom Duration</code>

<code src="./demo/custom-icon.tsx">Custom Icon</code>

<code src="./demo/closable.tsx">Closable and Callback</code>

<code src="./demo/update.tsx">Update Message</code>

## API

### message

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| content | The content of the message | ReactNode | - |
| duration | Time in seconds before the message disappears. If set to 0, it will not automatically close | number | 3 |
| icon | Custom icon | ReactNode | - |
| key | The unique identifier of the current message | string \| number | - |
| onClose | Callback function when message is closed | function | - |
| onClick | Callback function when message is clicked | function | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### message Methods

| Method | Description | Type | Default |
| --- | --- | --- | --- |
| message.open(config) | Open a normal message | string \| [MessageConfigs](#messageconfigs) | - |
| message.info(config) | Open an info message | string \| [MessageConfigs](#messageconfigs) | - |
| message.success(config) | Open a success message | string \| [MessageConfigs](#messageconfigs) | - |
| message.warning(config) | Open a warning message | string \| [MessageConfigs](#messageconfigs) | - |
| message.error(config) | Open an error message | string \| [MessageConfigs](#messageconfigs) | - |
| message.loading(config) | Open a loading message | string \| [MessageConfigs](#messageconfigs) | - |
| message.destroy(key) | Manually destroy the message with the specified key | string \| number | - |

### MessageConfigs

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| className | Custom class name | string | - |
| content | The content of the message | ReactNode | - |
| duration | Time in seconds before the message disappears. If set to 0, it will not automatically close | number | 3 |
| icon | Custom icon | ReactNode | - |
| key | The unique identifier of the current message | string \| number | - |
| onClose | Callback function when message is closed | function | - |
| onClick | Callback function when message is clicked | function | - |
| prefixCls | Custom class name prefix | string | - |
| style | Custom inline style | CSSProperties | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |
