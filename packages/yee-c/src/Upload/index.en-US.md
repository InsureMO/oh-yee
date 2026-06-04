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

Upload file by selecting or dragging.

## Code Demo

<code src="./demo/basic.tsx" title="Basic" description="Basic usage of Upload"></code>
<code src="./demo/pictureWall.tsx" title="Picture Wall" description="Picture wall upload"></code>
<code src="./demo/drag.tsx" title="Drag" description="Drag and drop upload"></code>
<code src="./demo/directory.tsx" title="Directory" description="Upload directory"></code>
<code src="./demo/multiple.tsx" title="Multiple" description="Multiple files upload"></code>
<code src="./demo/controlled.tsx" title="Controlled" description="Controlled upload"></code>

## API

### UploadProps

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| name | `string` | File name passed to backend | `'file'` |
| children | `React.ReactNode` | Children elements | - |
| type | `'drag' \| 'select'` | Upload type | - |
| prefixCls | `string` | Custom class name prefix | - |
| className | `string` | Custom class name | - |
| style | `React.CSSProperties` | Custom style | - |
| progress | `boolean` | Show upload progress | `true` |
| withCredentials | `boolean` | Whether to carry cookies when uploading | - |
| accept | `string` | Accepted file types | - |
| action | `string \| (() => string)` | Upload URL | - |
| data | `Record<string, any> \| ((file: File) => Record<string, any>)` | Additional parameters for upload | - |
| directory | `boolean` | Support uploading folders | - |
| multiple | `boolean` | Support multiple file selection | - |
| disabled | `boolean` | Disabled | - |
| headers | `Record<string, any>` | Set request headers | - |
| maxFileSize | `number` | Max file size limit | - |
| maxCount | `number` | Max file count limit | - |
| listType | `'text' \| 'picture-list' \| 'picture-wall'` | Upload list type | - |
| showUploadList | `boolean \| { showTooltip?: boolean; showRemoveIcon?: boolean; showReload?: boolean; showPreviewIcon?: boolean; removeIcon?: React.ReactNode; reloadIcon?: React.ReactNode; previewIcon?: React.ReactNode; }` | Show upload file list | `true` |
| itemRender | `(file: UploadFile, fileList: UploadFile[]) => React.ReactNode` | Custom upload list item | - |
| defaultFileList | `Array<UploadFile>` | Default upload files | - |
| fileList | `Array<UploadFile>` | Controlled upload files | - |
| beforeUpload | `(file: File, fileList: Array<File>) => boolean \| Promise<File \| boolean>` | Callback before upload | - |
| customRequest | `(options: UploadRequestOptions) => void` | Custom upload implementation | - |
| onChange | `(params: { file: UploadFile; fileList: Array<UploadFile>; event?: any }) => void` | Callback when upload status changes | - |
| onPreview | `(file: UploadFile) => void` | File preview callback | - |
| onRemove | `(file: UploadFile) => boolean \| Promise<boolean>` | Callback when file is removed | - |
| data-* | `string` | - | Supports all data-* attributes, forwarded to root DOM element |

### UploadFile

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| status | `'uploading' \| 'error' \| 'success' \| 'ready'` | File upload status | - |
| uid | `string` | File unique id | - |
| name | `string` | File name | - |
| size | `number` | File size | - |
| percent | `number` | Upload progress | - |
| raw | `File` | Raw file | - |
| type | `string` | File type | - |
| response | `any` | Upload response data | - |
| error | `Error` | Upload error info | - |

## Notes

- Adapted for mobile (reduced Dragger padding, picture-wall actions always visible, list item touch targets 44px)