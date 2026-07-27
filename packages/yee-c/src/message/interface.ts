export type MessageConfig = {
  [dataAttribute: `data-${string}`]:
    | string
    | number
    | boolean
    | undefined;
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
   * Message content
   */
  content: React.ReactNode;
  /**
   * Auto close time (seconds), 0 means no auto close
   * @default 3
   */
  duration?: number;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Unique identifier for the current message
   */
  key?: string | number;
  /**
   * Callback when message is clicked
   */
  onClick?: () => void;
  /**
   * Callback when message is closed
   */
  onClose?: () => void;
};

export type MessageClose = () => void;

export interface MessageApi {
  open: (config: string | MessageConfig) => MessageClose;
  info: (config: string | MessageConfig) => MessageClose;
  success: (config: string | MessageConfig) => MessageClose;
  warning: (config: string | MessageConfig) => MessageClose;
  error: (config: string | MessageConfig) => MessageClose;
  loading: (config: string | MessageConfig) => MessageClose;
  destroy: (key: string | number) => void;
  clear: () => void;
}

// With status
export type WrapperedMessageConfig = MessageConfig & {
  status?: 'info' | 'success' | 'warning' | 'error' | 'loading';
};

// With key
export type MessageType = WrapperedMessageConfig & {
  key: string | number;
  timerGeneration: number;
};

export interface MessageProps extends MessageType {
  /**
   * Destroy component callback
   */
  onDestroy?: (key: string | number, timerGeneration?: number) => void;
}
