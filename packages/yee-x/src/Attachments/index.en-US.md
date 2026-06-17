---
category: Components
title: Attachments
subtitle: Attachments
group:
  title: Input
  order: 2
toc: 'content'
---

# Attachments Input

## Code Demo
<code src="./demo/basic.tsx" title="Basic Usage" description="Control upload icon position via `prefix` or `actions`"></code>

### FileCardProps

| Property    | Type                           | Description          | Optional |
|------------|--------------------------------|----------------------|----------|
| prefixCls  | `string`                       | Custom class prefix  | Yes      |
| uid        | `string \| number`             | File unique ID       | No       |
| name       | `string`                       | File name            | No       |
| size       | `number \| string`             | File size            | Yes      |
| description| `string`                       | File description     | Yes      |
| status     | `'uploading' \| 'error' \| 'success' \| 'ready'` | File status | Yes      |
| closable   | `boolean`                      | Whether closable     | Yes (default `true`) |
| onClose    | `() => void`                   | Callback when closed | Yes      |

### AttachmentsProps

| Property    | Type                           | Description          | Optional |
|------------|--------------------------------|----------------------|----------|
| prefixCls  | `string`                       | Custom class prefix  | Yes      |
| disabled   | `boolean`                      | Whether disabled     | Yes      |
| children   | `React.ReactElement`           | Child component      | No       |
| multiple   | `boolean`                      | Multiple upload support | Yes      |
| onChange   | `(params: any) => void`        | File upload callback | Yes      |