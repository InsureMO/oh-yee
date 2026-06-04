export type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';

export type ButtonSemanticDOM = 'icon' | 'content';

export interface ButtonProps extends Partial<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick' | 'type'> &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'type'>
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
  classNames?: Partial<Record<ButtonSemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<ButtonSemanticDOM, React.CSSProperties>>;
  /**
   * Native HTML button type attribute
   * */
  htmlType?: 'button' | 'reset' | 'submit';
  /**
   * Preset button style, a shorthand for color and variant
   */
  type?: ButtonType;
  /**
   * Button color
   */
  color?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | string;
  /**
   * Button variant
   */
  variant?: 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
  /**
   * Ghost property, makes button background transparent
   * */
  ghost?: boolean;
  /**
   * Button shape
   * @default default
   * */
  shape?: 'default' | 'circle' | 'round'; // Shape
  /**
   * Button size
   * @default default
   */
  size?: 'default' | 'small' | 'large';
  /**
   * Fill the entire row
   */
  block?: boolean;
  /**
   * Icon
   * */
  icon?: React.ReactNode | ((props: ButtonProps) => React.ReactNode); // Icon button
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Whether to show loading state
   * */
  loading?: boolean;
  /**
   * Tooltip title
   */
  title?: string;
  /**
   * Navigation link
   */
  href?: string;
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * Click callback event
   * */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
