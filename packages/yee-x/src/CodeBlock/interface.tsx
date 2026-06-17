export type SemanticDOM = 'header' | 'content';

export interface CodeBlockProps {
  /**
   * Custom class name prefix
   * */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root inline style
   */
  style?: React.CSSProperties;
  /**
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic inline styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Code content
   */
  code: string | React.ReactNode;
  /**
   * Code language
   */
  language?: string;
  /**
   * Custom header action buttons
   */
  renderActions?: (params: {
    language: string;
    code: string;
  }) => React.ReactNode;
}
