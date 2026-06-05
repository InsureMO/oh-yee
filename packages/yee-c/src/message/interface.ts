export type MessageConfig = {
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
   * Message content
   */
  content: React.ReactNode;
  /**
   * Auto close time (ms), 0 means no auto close
   * @default 3000
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

// With status
export type WrapperedMessageConfig = MessageConfig & {
  status?: 'info' | 'success' | 'warning' | 'error' | 'loading';
};

// With key
export type MessageType = WrapperedMessageConfig & {
  key: string | number;
};

export interface MessageProps extends MessageType {
  /**
   * Destroy component callback
   */
  onDestroy?: (key: string | number) => void;
}
