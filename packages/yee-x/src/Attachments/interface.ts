import type { UploadProps } from '@rainbow-oh/yee-c';

export interface FileCardProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Unique file identifier
   */
  uid: string | number;
  /**
   * File name
   */
  name: string;
  /**
   * File size
   */
  size?: number | string;
  /**
   * File description
   */
  description?: string;
  /**
   * File status
   */
  status?: 'uploading' | 'error' | 'success' | 'ready';
  /**
   * Whether the file card is closable
   * @default true
   */
  closable?: boolean;
  /**
   * Callback when the file card is closed
   */
  onClose?: () => void;
}

export interface AttachmentsProps extends UploadProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;

  /**
   * Whether the uploader is disabled
   */
  disabled?: boolean;
  /**
   * Child component (typically a trigger element)
   */
  children: React.ReactElement;
  /**
   * Whether multiple file upload is supported
   */
  multiple?: boolean;
  /**
   * Callback when files are uploaded/changed
   */
  onChange?: (params: any) => void;
}
