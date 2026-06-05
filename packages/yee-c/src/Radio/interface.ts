type SemanticDOM = 'inner' | 'label';

export interface RadioProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  /**
   * Custom prefix class name
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
   * */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic structure styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Whether checked by default
   */
  defaultChecked?: boolean;
  /**
   * Controlled checked state
   */
  checked?: boolean;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Value
   */
  value?: string | number;
  /**
   * Label
   */
  label?: React.ReactNode;
  /**
   * Children elements
   */
  children?: React.ReactNode;
  /**
   * Whether to toggle checked state
   */
  toggleable?: boolean;
}

export interface RadioGroupProps {
  /**
   * Custom prefix class name
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
   * Default selected value
   */
  defaultValue?: string | number;
  /**
   * Controlled selected value
   */
  value?: string | number;
  /**
   * Size
   */
  size?: 'large' | 'default' | 'small';
  /**
   * Group name
   */
  name?: string;
  /**
   * Whether to disable all options
   */
  disabled?: boolean;
  /**
   * Button style
   */
  buttonStyle?: 'outline' | 'solid' | 'cornermark';
  /**
   * Options in config form
   */
  options?: Array<RadioProps & { label: React.ReactNode }>;
  /**
   * Whether to toggle checked state
   */
  toggleable?: boolean;
  /**
   * Callback when value changes
   */
  onChange?: (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}
