---
category: Components
title: Attachments
subtitle: 附件
group:
  title: 输入
  order: 2
toc: 'content'
---

# Attachments 输入附件

## 代码演示
<code src="./demo/basic.tsx" title="基础使用" description="通过prefix或actions可以控制上传图标的位置"></code>

### FileCardProps

| 属性名      | 类型                           | 描述         | 是否可选 |
|------------|--------------------------------|------------|--------|
| prefixCls  | `string`                       | 自定义类名前缀 | 是      |
| uid        | `string \| number`             | 文件唯一id   | 否      |
| name       | `string`                       | 文件名      | 否      |
| size       | `number \| string`             | 文件大小    | 是      |
| description| `string`                       | 文件描述    | 是      |
| status     | `'uploading' \| 'error' \| 'success' \| 'ready'` | 文件状态 | 是      |
| closable   | `boolean`                      | 可关闭      | 是（默认 `true`）   |
| onClose    | `() => void`                   | 关闭时的回调函数 | 是      |

### AttachmentsProps

| 属性名      | 类型                           | 描述         | 是否可选 |
|------------|--------------------------------|------------|--------|
| prefixCls  | `string`                       | 自定义类名前缀 | 是      |
| disabled   | `boolean`                      | 是否禁用     | 是      |
| children   | `React.ReactElement`           | 子组件       | 否      |
| multiple   | `boolean`                      | 是否支持多文件上传 | 是      |
| onChange   | `(params: any) => void`        | 上传文件回调事件 | 是      |