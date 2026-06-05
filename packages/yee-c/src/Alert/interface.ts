import type { DataAttributeProps } from '../utils/types';

export type AlertSemanticDOM =
  | 'icon'
  | 'close'
  | 'title'
  | 'description'
  | 'content';

export interface CycleProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Message content
   */
  description?: string | string[];
  /**
   * Cycle scroll direction
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Scroll mode
   */
  mode?: 'turn';
  /**
   * Scroll speed (seconds)
   */
  speed?: number;
  /**
   * Delay scroll time (seconds)
   */
  delay?: number;
  /**
   * Pause scrolling on mouse hover
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Pause scrolling on mouse click
   */
  pauseOnClick?: boolean;
  /**
   * Number of rows to scroll continuously in vertical mode
   */
  row?: number;
}

export interface AlertProps extends DataAttributeProps {
  /**
   * Custom class name prefix
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
   * Semantic class names
   */
  classNames?: Partial<Record<AlertSemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<AlertSemanticDOM, React.CSSProperties>>;
  /**
   * Title
   */
  title?: React.ReactNode;
  /**
   * Alert content
   */
  description?: React.ReactNode;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Whether closable
   */
  closable?: boolean;
  /**
   * Status
   * @default info
   */
  status?: 'info' | 'success' | 'error' | 'warning';
  /**
   * Whether to show icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * Whether to use as top banner
   */
  banner?: boolean;
  /**
   * Close callback
   */
  onClose?: () => void;
}
