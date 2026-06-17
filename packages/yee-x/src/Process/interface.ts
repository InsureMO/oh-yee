export type SemanticType = 'title' | 'message';

export interface ProcessProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root styles
   */
  style?: React.CSSProperties;
  /**
   * Class names for semantic sections
   */
  classNames?: Partial<Record<SemanticType, string>>;
  /**
   * Inline styles for semantic sections
   */
  styles?: Partial<Record<SemanticType, React.CSSProperties>>;
  /**
   * Title
   */
  title?: React.ReactNode;
  /**
   * Hint message
   */
  message?: string;
  /**
   * Animation duration in seconds
   * @default 0.2
   */
  duration?: number;
}
