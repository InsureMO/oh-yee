import React from "react";
import type { DataAttributeProps } from '../utils/types';

export type UploadFile = {
  /**
   * File upload status
   */
  status: 'uploading' | 'error' | 'success' | 'ready';
  /**
   * Unique file id, auto-generated if not set
   */
  uid?: string;
  /**
   * File name
   */
  name: string;
  /**
   * File size
   */
  size: number;
  /**
   * Upload progress
   */
  percent?: number;
  /**
   * Source file
   */
  raw: File;
  /**
   * File type, determined by file extension
   */
  type?: string;
  /**
   * Upload response content
   */
  response?: any;
  /**
   * Upload error message
   */
  error?: Error;
};

export interface UploadProps extends DataAttributeProps {
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Child nodes
   */
  children?: React.ReactNode;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom inline style
   */
  style?: React.CSSProperties;
  /**
   * Upload type
   */
  type?: 'drag' | 'select';
  /**
   * File parameter name sent to the server
   * @default 'file'
   */
  name?: string;
  /**
   * Upload URL
   */
  action?: string | (() => string);
  /**
   * Additional parameters for upload
   */
  data?: Record<string, any> | ((file: File) => Record<string, any>);
  /**
   * Whether to send cookies with upload
   */
  withCredentials?: boolean;
  /**
   * Set upload request headers
   */
  headers?: Record<string, any>;
  /**
   * Accepted file types for upload
   */
  accept?: string;
  /**
   * Whether to support multiple file selection
   */
  multiple?: boolean;
  /**
   * Whether to support folder upload
   */
  directory?: boolean;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;
  /**
   * Maximum number of files to upload
   */
  maxCount?: number;
  /**
   * Set upload list type
   */
  listType?: 'text' | 'picture-list' | 'picture-wall';
  /**
   * Whether to show upload progress
   * @default true
   */
  progress?: boolean;
  /**
   * Whether to show the uploaded file list
   * @default true
   */
  showUploadList?: boolean | {
    showTooltip?: boolean;
    showRemoveIcon?: boolean;
    showReload?: boolean;
    showPreviewIcon?: boolean;
    removeIcon?: React.ReactNode;
    reloadIcon?: React.ReactNode;
    previewIcon?: React.ReactNode;
  };
  /**
   * Custom upload list item render
   */
  itemRender?: (file: UploadFile, fileList: UploadFile[]) => React.ReactNode;
  /**
   * Default uploaded files
   */
  defaultFileList?: Array<UploadFile>;
  /**
   * Uploaded files in controlled mode
   */
  fileList?: Array<UploadFile>;
  /**
   * Callback before uploading a file
   */
  beforeUpload?: (
    file: File,
    fileList: Array<File>,
  ) => boolean | Promise<File | boolean>;
  /**
   * Custom upload implementation
   */
  customRequest?: (options: {
    file: File;
    onProgress: (percent: number) => void;
    onError: (error: Error) => void;
    onSuccess: (response: any) => void;
  }) => void;
  /**
   * Callback when upload status changes
   */
  onChange?: (params: {
    file: UploadFile;
    fileList: Array<UploadFile>;
    event?: any;
  }) => void;
  /**
   * Callback when file link or preview icon is clicked
   */
  onPreview?: (file: UploadFile) => void;
  /**
   * Callback when a file is removed
   */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean>;
}

export interface UploadDraggerProps extends UploadProps {
  /**
   * Upload hint
   * */
  hint?: React.ReactNode;
}