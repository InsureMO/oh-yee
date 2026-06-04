import type { DataAttributeProps } from '../utils/types';

type SemanticDOM = 'item';

export interface HighlightProps extends DataAttributeProps {
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Text content to highlight
   */
  text: string;
  /**
   * Match regular expression
   */
  pattern: RegExp;
  /**
   * Custom root style
   */
  style?: React.CSSProperties;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Semantic structure class names
   */
  classNames?: Record<SemanticDOM, string>;
  /**
   * Semantic structure styles
   */
  styles?: Record<SemanticDOM, React.CSSProperties>;
  /**
   * HTML tag for highlighted text
   * @default 'span'
   */
  htmlTag?: string;
  /**
   * Outer wrapper HTML tag
   * @default 'span'
   */
  wrapperHtmlTag?: string;
  /**
   * Outer wrapper style
   */
  wrapperStyle?: React.CSSProperties;
  /**
   * Outer wrapper class name
   */
  wrapperClassName?: string;
  /**
   * Callback when highlighted text is clicked
   */
  onClick?: (e: React.MouseEvent<HTMLElement>, index: number) => void;
}
