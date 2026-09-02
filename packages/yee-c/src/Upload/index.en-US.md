---
category: Components
title: Upload
subtitle: Upload
group:
  title: Data Entry
  order: 48
toc: 'content'
---

# Upload <span class="yee-mobile-badge" />

Upload files by selecting or dragging them.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Upload"></code>
<code src="./demo/pictureWall.tsx" title="Picture Wall" description="Picture wall upload"></code>
<code src="./demo/drag.tsx" title="Drag" description="Drag and drop upload"></code>
<code src="./demo/directory.tsx" title="Directory" description="Upload directory"></code>
<code src="./demo/multiple.tsx" title="Multiple" description="Multiple files upload"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled upload"></code>
<code src="./demo/auto-upload.tsx" title="Manual Upload" description="Collect files with autoUpload=false and trigger batch upload from an external button via the instance method upload()"></code>

## API

### UploadProps

| Property        | Type                                                                                                                                                                                                          | Description                                                                                                                                      | Default                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| name            | `string`                                                                                                                                                                                                      | File field name sent to the server                                                                                                               | `'file'`                                                              |
| children        | `React.ReactNode`                                                                                                                                                                                             | Child nodes                                                                                                                                      | -                                                                     |
| type            | `'drag' \| 'select'`                                                                                                                                                                                          | Upload type                                                                                                                                      | -                                                                     |
| prefixCls       | `string`                                                                                                                                                                                                      | Custom class name prefix                                                                                                                         | -                                                                     |
| className       | `string`                                                                                                                                                                                                      | Custom class name                                                                                                                                | -                                                                     |
| style           | `React.CSSProperties`                                                                                                                                                                                         | Custom inline style                                                                                                                              | -                                                                     |
| progress        | `boolean`                                                                                                                                                                                                     | Show upload progress                                                                                                                             | `true`                                                                |
| withCredentials | `boolean`                                                                                                                                                                                                     | Send cookies with the upload                                                                                                                     | -                                                                     |
| accept          | `string`                                                                                                                                                                                                      | Accepted file types; enforced for selection and drop                                                                                             | -                                                                     |
| action          | `string \| (() => string)`                                                                                                                                                                                    | Upload URL; required without `customRequest`                                                                                                     | -                                                                     |
| data            | `Record<string, any> \| ((file: File) => Record<string, any>)`                                                                                                                                                | Additional upload parameters                                                                                                                     | -                                                                     |
| directory       | `boolean`                                                                                                                                                                                                     | Support directory upload                                                                                                                         | -                                                                     |
| multiple        | `boolean`                                                                                                                                                                                                     | Support multiple files                                                                                                                           | -                                                                     |
| disabled        | `boolean`                                                                                                                                                                                                     | Disable upload                                                                                                                                   | -                                                                     |
| headers         | `Record<string, any>`                                                                                                                                                                                         | Request headers                                                                                                                                  | -                                                                     |
| maxFileSize     | `number`                                                                                                                                                                                                      | Maximum file size in bytes                                                                                                                       | -                                                                     |
| maxCount        | `number`                                                                                                                                                                                                      | Maximum file count                                                                                                                               | -                                                                     |
| listType        | `'text' \| 'picture-list' \| 'picture-wall'`                                                                                                                                                                  | Upload list type                                                                                                                                 | `'text'`                                                              |
| showUploadList  | `boolean \| { showTooltip?: boolean; showRemoveIcon?: boolean; showReload?: boolean; showPreviewIcon?: boolean; removeIcon?: React.ReactNode; reloadIcon?: React.ReactNode; previewIcon?: React.ReactNode; }` | Show upload file list                                                                                                                            | `true`                                                                |
| itemRender      | `(file: UploadFile, fileList: UploadFile[]) => React.ReactNode`                                                                                                                                               | Custom action content for a list item                                                                                                            | -                                                                     |
| defaultFileList | `UploadFile[]`                                                                                                                                                                                                | Default uploaded files                                                                                                                           | -                                                                     |
| fileList        | `UploadFile[]`                                                                                                                                                                                                | Uploaded files in controlled mode                                                                                                                | -                                                                     |
| autoUpload      | `boolean`                                                                                                                                                                                                     | Whether to upload automatically after selection; when `false` files only join the list and are uploaded later via the instance method `upload()` | `true`                                                                |
| beforeUpload    | `(file: File, fileList: File[]) => boolean \| File \| PromiseLike<File \| boolean>`                                                                                                                           | Callback before upload                                                                                                                           | -                                                                     |
| customRequest   | `(options: UploadRequestOptions) => void \| (() => void) \| { abort: () => void }`                                                                                                                            | Custom upload implementation; return an abort handle to cancel on remove, retry, and unmount                                                     | -                                                                     |
| onChange        | `(params: { file: UploadFile; fileList: UploadFile[]; event?: any }) => void`                                                                                                                                 | Upload state callback; `fileList` is the updated list                                                                                            | -                                                                     |
| onPreview       | `(file: UploadFile) => void`                                                                                                                                                                                  | File preview callback                                                                                                                            | -                                                                     |
| onRemove        | `(file: UploadFile) => boolean \| PromiseLike<boolean>`                                                                                                                                                       | File removal callback                                                                                                                            | -                                                                     |
| data-\*         | `string`                                                                                                                                                                                                      | -                                                                                                                                                | Supports all data-\* attributes and forwards them to the root element |

### UploadFile

| Property | Type                                             | Description                                                 | Default |
| -------- | ------------------------------------------------ | ----------------------------------------------------------- | ------- |
| status   | `'uploading' \| 'error' \| 'success' \| 'ready'` | File upload status                                          | -       |
| uid      | `string`                                         | Unique file ID; generated for files selected through Upload | -       |
| name     | `string`                                         | File name                                                   | -       |
| size     | `number`                                         | File size; optional for remote files                        | -       |
| percent  | `number`                                         | Upload progress                                             | -       |
| raw      | `File`                                           | Source file; optional for remote files                      | -       |
| type     | `string`                                         | MIME type or file extension                                 | -       |
| url      | `string`                                         | Preview URL for a remote file                               | -       |
| response | `any`                                            | Upload response data                                        | -       |
| error    | `Error`                                          | Upload error                                                | -       |

### UploadRequestOptions

| Property   | Type                        | Description                   |
| ---------- | --------------------------- | ----------------------------- |
| file       | `File`                      | Source file to upload         |
| onProgress | `(percent: number) => void` | Update upload progress        |
| onError    | `(error: Error) => void`    | Mark the upload as failed     |
| onSuccess  | `(response: any) => void`   | Mark the upload as successful |

### Instance Methods (Ref)

Access via `ref` as `UploadInstance` (root DOM element plus the methods below):

| Method | Type                                          | Description                                                                                                                                                                                   |
| ------ | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| upload | `(file?: UploadFile \| UploadFile[]) => void` | Upload files waiting in the list (`status` of `ready`); without arguments uploads all of them, or pass a single file or a list. Combine with `autoUpload={false}` to trigger uploads manually |

## Notes

- Adapted for mobile with reduced Dragger padding, always-visible picture-wall actions, and 44px list-item touch targets.
