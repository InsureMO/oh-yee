export type PlacementType =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'top'
  | 'bottom';

export type NoticeConfig = {
  [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
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
   * Auto close time (milliseconds), 0 means no auto close
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
  placement?: PlacementType;
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

export type NoticeClose = () => void;

export interface NoticeApi {
  open: (config: string | NoticeConfig) => NoticeClose;
  info: (config: string | NoticeConfig) => NoticeClose;
  success: (config: string | NoticeConfig) => NoticeClose;
  warning: (config: string | NoticeConfig) => NoticeClose;
  error: (config: string | NoticeConfig) => NoticeClose;
  destroy: (key: string | number) => void;
  clear: (placement?: PlacementType) => void;
}

// With status
export type WrapperedNoticeConfig = NoticeConfig & {
  status?: 'info' | 'success' | 'warning' | 'error';
};

// Internal notice state
export type NoticeType = WrapperedNoticeConfig & {
  key: string | number;
  placement: PlacementType;
  timerGeneration: number;
};

export interface NoticeProps extends NoticeType {
  /**
   * Destroy component callback
   */
  onDestroy?: (key: string | number, timerGeneration?: number) => void;
}
