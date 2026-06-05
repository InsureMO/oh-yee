export type CompositionDOM = 'input' | 'clear' | 'count';

export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange'
> {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom inline style
   */
  style?: React.CSSProperties;
  /**
   * Semantic class names
   */
  classNames?: Record<CompositionDOM, string>;
  /**
   * Semantic inline styles
   * */
  styles?: Record<CompositionDOM, React.CSSProperties>;
  /**
   * Controlled value
   */
  value?: string;
  /**
   * Default value
   */
  defaultValue?: string;
  /**
   * Auto-adjust content height
   */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /**
   * Whether to show character count
   */
  showCount?: boolean;
  /**
   * Whether to show border
   * @default true
   * */
  bordered?: boolean;
  /**
   * Whether to allow clearing
   */
  allowClear?: boolean;
  /**
   * Callback when value changes
   * */
  onChange?: (
    value: string,
    event:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLSpanElement>,
  ) => void;
}
