import type { DataAttributeProps } from '../utils/types';

export type NoticeConfig = {
  /**
   * test identifier
   */
  'data-testid'?: string;
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root style
   */
  style?: React.CSSProperties;
  /**
   * Notice title
   */
  title?: React.ReactNode;
  /**
   * Notice content
   */
  content: React.ReactNode;
  /**
   * Auto close time (ms), 0 means no auto close
   * @default 4500
   */
  duration?: number;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Unique identifier for the current notice
   */
  key?: string | number;
  /**
   * Display position
   * @default 'topRight'
   */
  placement?:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'top'
    | 'bottom';
  /**
   * Whether to show progress bar
  */
  showProgress?: boolean;
  /**
   * Whether to pause auto close on hover
  */
  pauseOnHover?: boolean;
  /**
   * Callback when notice is clicked
   */
  onClick?: () => void;
  /**
   * Callback when notice is closed
   */
  onClose?: () => void;
  /**
   * Whether to show close button
   * @default true
   */
  closable?: boolean;
};

// With status
export type WrapperedNoticeConfig = NoticeConfig & {
  status?: 'info' | 'success' | 'warning' | 'error';
};

// With key
export type NoticeType = WrapperedNoticeConfig & {
  key: string | number;
};

export interface NoticeProps extends NoticeType {
  /**
   * Destroy component callback
   */
  onDestroy?: (key: string | number) => void;
}
