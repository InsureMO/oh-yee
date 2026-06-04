export type CompositionDOM = 'prefix' | 'input' | 'suffix' | 'clear';

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'onChange'
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
   * Semantic structure class names
   */
  classNames?: Record<CompositionDOM, string>;
  /**
   * Semantic structure styles
   */
  styles?: Record<CompositionDOM, React.CSSProperties>;
  /**
   * Size
   */
  size?: 'small' | 'default' | 'large';
  /**
   * Controlled value
   */
  value?: string | number;
  /**
   * Default value
   */
  defaultValue?: string | number;
  /**
   * Whether to show border
   * @default true
   * */
  bordered?: boolean;
  /**
   * Prefix
   * */
  prefix?: React.ReactNode;
  /**
   * Suffix
   */
  suffix?: React.ReactNode;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Whether to allow clearing
   * @default true
   */
  allowClear?: boolean;
  /**
   * Callback when input value changes
   */
  onChange?: (
    value: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLSpanElement>,
  ) => void;
}

export interface PasswordProps extends InputProps {
  /**
   * Whether to show the password visibility toggle button
   * @default true
   */
  visibilityToggle?: boolean;
}

export interface EmailProps extends InputProps {}
