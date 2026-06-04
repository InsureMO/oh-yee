import { Rule } from '../Form/interface';

export type SemanticDOM = 'label' | 'content' | 'children' | 'message';

export interface FieldProps {
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
   * Semantic structure class names
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic structure styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Form field label
   */
  label?: React.ReactNode;
  /**
   * Field name
   */
  name: string;
  /**
   * Name of the parent form
   */
  formName: string;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Validation rules
   */
  rules?: Rule[];
  /**
   * Layout mode
   * @default vertical
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * Child element (must be a React element)
   */
  children: React.ReactElement;
  /**
   * Whether required
   */
  required?: boolean;
}
