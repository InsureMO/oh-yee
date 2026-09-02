import React from 'react';
import type { DataAttributeProps } from '../utils/types';

export type UploadFile = {
  /** File upload status */
  status: 'uploading' | 'error' | 'success' | 'ready';
  /** Unique file id. Files selected by Upload receive an id automatically. */
  uid?: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size?: number;
  /** Upload progress */
  percent?: number;
  /** Source file. This can be omitted for files that already exist remotely. */
  raw?: File;
  /** MIME type or file extension */
  type?: string;
  /** Remote file URL */
  url?: string;
  /** Upload response content */
  response?: any;
  /** Upload error */
  error?: Error;
};

export type UploadRequestAbort = (() => void) | { abort: () => void };

export interface UploadRequestOptions {
  file: File;
  onProgress: (percent: number) => void;
  onError: (error: Error) => void;
  onSuccess: (response: any) => void;
}

export interface UploadProps extends DataAttributeProps {
  /** Custom prefix class name */
  prefixCls?: string;
  /** Child nodes */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
  /** Upload type */
  type?: 'drag' | 'select';
  /** File parameter name sent to the server @default 'file' */
  name?: string;
  /** Upload URL */
  action?: string | (() => string);
  /** Additional parameters for upload */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /** Whether to send cookies with upload */
  withCredentials?: boolean;
  /** Set upload request headers */
  headers?: Record<string, any>;
  /** Accepted file types for upload */
  accept?: string;
  /** Whether to support multiple file selection */
  multiple?: boolean;
  /** Whether to support folder upload */
  directory?: boolean;
  /** Whether disabled */
  disabled?: boolean;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Maximum number of files to upload */
  maxCount?: number;
  /** Set upload list type */
  listType?: 'text' | 'picture-list' | 'picture-wall';
  /** Whether to show upload progress @default true */
  progress?: boolean;
  /** Whether to show the uploaded file list @default true */
  showUploadList?:
    | boolean
    | {
        showTooltip?: boolean;
        showRemoveIcon?: boolean;
        showReload?: boolean;
        showPreviewIcon?: boolean;
        removeIcon?: React.ReactNode;
        reloadIcon?: React.ReactNode;
        previewIcon?: React.ReactNode;
      };
  /** Custom upload list item render */
  itemRender?: (file: UploadFile, fileList: UploadFile[]) => React.ReactNode;
  /** Default uploaded files */
  defaultFileList?: Array<UploadFile>;
  /** Uploaded files in controlled mode */
  fileList?: Array<UploadFile>;
  /**
   * Whether to upload automatically after files are selected.
   * Set to false to only collect files into the list and trigger them
   * later via the instance method `upload()`.
   * @default true
   */
  autoUpload?: boolean;
  /** Callback before uploading a file */
  beforeUpload?: (
    file: File,
    fileList: Array<File>,
  ) => boolean | File | PromiseLike<File | boolean>;
  /**
   * Custom upload implementation. Return an abort function or object to make
   * remove, retry, and unmount cancel the active request.
   */
  customRequest?: (options: UploadRequestOptions) => void | UploadRequestAbort;
  /** Callback when upload status changes */
  onChange?: (params: {
    file: UploadFile;
    fileList: Array<UploadFile>;
    event?: any;
  }) => void;
  /** Callback when file link or preview icon is clicked */
  onPreview?: (file: UploadFile) => void;
  /** Callback when a file is removed */
  onRemove?: (file: UploadFile) => boolean | PromiseLike<boolean>;
}

export interface UploadDraggerProps extends UploadProps {
  /** Upload hint */
  hint?: React.ReactNode;
}

export type UploadInstance = HTMLDivElement & {
  /**
   * Upload files waiting in the list (status 'ready'). Without arguments
   * uploads every ready file; accepts a single file or a list of files.
   * Combine with `autoUpload={false}` to trigger uploads manually.
   */
  upload: (file?: UploadFile | UploadFile[]) => void;
};
