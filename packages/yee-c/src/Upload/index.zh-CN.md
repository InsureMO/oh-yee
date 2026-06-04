---
category: Components
title: Upload
subtitle: 上传
group:
  title: 数据录入
  order: 48
toc: 'content'
---

# Upload 上传 <span class="yee-mobile-badge" />

通过选择或拖拽上传文件。

## 代码演示

<code src="./demo/basic.tsx" title="基础用法" description="Upload的基础用法"></code>
<code src="./demo/pictureWall.tsx" title="照片墙" description="照片墙上传"></code>
<code src="./demo/drag.tsx" title="拖拽上传" description="拖拽上传文件"></code>
<code src="./demo/directory.tsx" title="文件夹上传" description="上传文件夹"></code>
<code src="./demo/multiple.tsx" title="多文件上传" description="上传多个文件"></code>
<code src="./demo/controlled.tsx" title="受控" description="受控的上传"></code>

## API

### UploadProps

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| name | `string` | 传递到后台的文件名 | `'file'` |
| children | `React.ReactNode` | 子节点 | - |
| type | `'drag' \| 'select'` | 上传类型 | - |
| prefixCls | `string` | 自定义类名前缀 | - |
| className | `string` | 自定义类名 | - |
| style | `React.CSSProperties` | 自定义行内样式 | - |
| progress | `boolean` | 是否显示上传进度 | `true` |
| withCredentials | `boolean` | 上传是否携带cookie | - |
| accept | `string` | 接受上传的文件类型 | - |
| action | `string \| (() => string)` | 上传的地址 | - |
| data | `Record<string, any> \| ((file: File) => Record<string, any>)` | 上传额外需要的参数 | - |
| directory | `boolean` | 是否支持上传文件夹 | - |
| multiple | `boolean` | 是否支持多选文件 | - |
| disabled | `boolean` | 是否被禁用 | - |
| headers | `Record<string, any>` | 设置上传的请求头 | - |
| maxFileSize | `number` | 文件最大大小限制 | - |
| maxCount | `number` | 最大文件数量限制 | - |
| listType | `'text' \| 'picture-list' \| 'picture-wall'` | 设置上传列表类型 | - |
| showUploadList | `boolean \| { showTooltip?: boolean; showRemoveIcon?: boolean; showReload?: boolean; showPreviewIcon?: boolean; removeIcon?: React.ReactNode; reloadIcon?: React.ReactNode; previewIcon?: React.ReactNode; }` | 是否显示上传文件列表 | `true` |
| itemRender | `(file: UploadFile, fileList: UploadFile[]) => React.ReactNode` | 自定义上传列表项 | - |
| defaultFileList | `Array<UploadFile>` | 默认上传文件 | - |
| fileList | `Array<UploadFile>` | 受控状态的上传文件 | - |
| beforeUpload | `(file: File, fileList: Array<File>) => boolean \| Promise<File \| boolean>` | 上传文件之前的回调函数 | - |
| customRequest | `(options: UploadRequestOptions) => void` | 自定义上传实现 | - |
| onChange | `(params: { file: UploadFile; fileList: Array<UploadFile>; event?: any }) => void` | 上传状态变化的回调 | - |
| onPreview | `(file: UploadFile) => void` | 文件预览回调 | - |
| onRemove | `(file: UploadFile) => boolean \| Promise<boolean>` | 删除文件的回调 | - |
| data-* | `string` | - | 支持所有 data-* 属性，透传到组件根 DOM 元素 |

### UploadFile

| 属性名 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| status | `'uploading' \| 'error' \| 'success' \| 'ready'` | 文件上传状态 | - |
| uid | `string` | 文件唯一id，未设置会自动生成 | - |
| name | `string` | 文件名 | - |
| size | `number` | 文件大小 | - |
| percent | `number` | 上传进度 | - |
| raw | `File` | 源文件 | - |
| type | `string` | 文件类型，根据文件后缀名判断 | - |
| response | `any` | 上传响应数据 | - |
| error | `Error` | 上传错误信息 | - |

## 注意事项

- 已适配移动端（减小 Dragger 内边距、图片墙操作按钮常显、列表项触控区域 44px）