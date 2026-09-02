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
<code src="./demo/auto-upload.tsx" title="手动上传" description="autoUpload=false 先收集文件，通过实例方法 upload() 在外部按钮触发批量上传"></code>

## API

### UploadProps

| 属性名          | 类型                                                                                                                                                                                                          | 描述                                                                                      | 默认值                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------- |
| name            | `string`                                                                                                                                                                                                      | 传递到后台的文件名                                                                        | `'file'`                                     |
| children        | `React.ReactNode`                                                                                                                                                                                             | 子节点                                                                                    | -                                            |
| type            | `'drag' \| 'select'`                                                                                                                                                                                          | 上传类型                                                                                  | -                                            |
| prefixCls       | `string`                                                                                                                                                                                                      | 自定义类名前缀                                                                            | -                                            |
| className       | `string`                                                                                                                                                                                                      | 自定义类名                                                                                | -                                            |
| style           | `React.CSSProperties`                                                                                                                                                                                         | 自定义行内样式                                                                            | -                                            |
| progress        | `boolean`                                                                                                                                                                                                     | 是否显示上传进度                                                                          | `true`                                       |
| withCredentials | `boolean`                                                                                                                                                                                                     | 上传是否携带 cookie                                                                       | -                                            |
| accept          | `string`                                                                                                                                                                                                      | 接受上传的文件类型；选择和拖放均会校验                                                    | -                                            |
| action          | `string \| (() => string)`                                                                                                                                                                                    | 上传地址；未设置 `customRequest` 时必填                                                   | -                                            |
| data            | `Record<string, any> \| ((file: File) => Record<string, any>)`                                                                                                                                                | 上传额外需要的参数                                                                        | -                                            |
| directory       | `boolean`                                                                                                                                                                                                     | 是否支持上传文件夹                                                                        | -                                            |
| multiple        | `boolean`                                                                                                                                                                                                     | 是否支持多选文件                                                                          | -                                            |
| disabled        | `boolean`                                                                                                                                                                                                     | 是否被禁用                                                                                | -                                            |
| headers         | `Record<string, any>`                                                                                                                                                                                         | 设置上传请求头                                                                            | -                                            |
| maxFileSize     | `number`                                                                                                                                                                                                      | 文件最大大小限制，单位字节                                                                | -                                            |
| maxCount        | `number`                                                                                                                                                                                                      | 最大文件数量限制                                                                          | -                                            |
| listType        | `'text' \| 'picture-list' \| 'picture-wall'`                                                                                                                                                                  | 设置上传列表类型                                                                          | `'text'`                                     |
| showUploadList  | `boolean \| { showTooltip?: boolean; showRemoveIcon?: boolean; showReload?: boolean; showPreviewIcon?: boolean; removeIcon?: React.ReactNode; reloadIcon?: React.ReactNode; previewIcon?: React.ReactNode; }` | 是否显示上传文件列表                                                                      | `true`                                       |
| itemRender      | `(file: UploadFile, fileList: UploadFile[]) => React.ReactNode`                                                                                                                                               | 自定义上传列表项操作内容                                                                  | -                                            |
| defaultFileList | `UploadFile[]`                                                                                                                                                                                                | 默认上传文件                                                                              | -                                            |
| fileList        | `UploadFile[]`                                                                                                                                                                                                | 受控状态的上传文件                                                                        | -                                            |
| autoUpload      | `boolean`                                                                                                                                                                                                     | 选择文件后是否自动上传；为 `false` 时文件仅进入列表，稍后通过实例方法 `upload()` 触发上传 | `true`                                       |
| beforeUpload    | `(file: File, fileList: File[]) => boolean \| File \| PromiseLike<File \| boolean>`                                                                                                                           | 上传文件之前的回调                                                                        | -                                            |
| customRequest   | `(options: UploadRequestOptions) => void \| (() => void) \| { abort: () => void }`                                                                                                                            | 自定义上传实现；返回取消句柄后，删除、重试和卸载会取消请求                                | -                                            |
| onChange        | `(params: { file: UploadFile; fileList: UploadFile[]; event?: any }) => void`                                                                                                                                 | 上传状态变化回调，`fileList` 为变化后的列表                                               | -                                            |
| onPreview       | `(file: UploadFile) => void`                                                                                                                                                                                  | 文件预览回调                                                                              | -                                            |
| onRemove        | `(file: UploadFile) => boolean \| PromiseLike<boolean>`                                                                                                                                                       | 删除文件的回调                                                                            | -                                            |
| data-\*         | `string`                                                                                                                                                                                                      | -                                                                                         | 支持所有 data-\* 属性，透传到组件根 DOM 元素 |

### UploadFile

| 属性名   | 类型                                             | 描述                                  | 默认值 |
| -------- | ------------------------------------------------ | ------------------------------------- | ------ |
| status   | `'uploading' \| 'error' \| 'success' \| 'ready'` | 文件上传状态                          | -      |
| uid      | `string`                                         | 文件唯一 ID；组件选择的文件会自动生成 | -      |
| name     | `string`                                         | 文件名                                | -      |
| size     | `number`                                         | 文件大小；服务端文件可省略            | -      |
| percent  | `number`                                         | 上传进度                              | -      |
| raw      | `File`                                           | 源文件；服务端文件可省略              | -      |
| type     | `string`                                         | MIME 类型或文件扩展名                 | -      |
| url      | `string`                                         | 服务端文件的预览地址                  | -      |
| response | `any`                                            | 上传响应数据                          | -      |
| error    | `Error`                                          | 上传错误信息                          | -      |

### UploadRequestOptions

| 属性名     | 类型                        | 描述         |
| ---------- | --------------------------- | ------------ |
| file       | `File`                      | 待上传源文件 |
| onProgress | `(percent: number) => void` | 更新上传进度 |
| onError    | `(error: Error) => void`    | 标记上传失败 |
| onSuccess  | `(response: any) => void`   | 标记上传成功 |

### 实例方法（Ref）

通过 `ref` 获取 `UploadInstance`（根 DOM 元素 + 以下方法）：

| 方法   | 类型                                          | 描述                                                                                                                      |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| upload | `(file?: UploadFile \| UploadFile[]) => void` | 上传列表中等待的文件（`status` 为 `ready`）；不传参数上传全部，也可指定单个或多个。配合 `autoUpload={false}` 手动触发上传 |

## 注意事项

- 已适配移动端（减小 Dragger 内边距、图片墙操作按钮常显、列表项触控区域 44px）
