export type SemanticDOM = 'title' | 'description' | 'extra' | 'content';

export interface WelcomeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root inline styles
   */
  style?: React.CSSProperties;
  /**
   * Class names for semantic structure sections
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Inline styles for semantic structure sections
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Title
   */
  title?: React.ReactNode;
  /**
   * Description
   */
  description?: React.ReactNode;
  /**
   * Child components
   */
  children?: React.ReactNode;
}
