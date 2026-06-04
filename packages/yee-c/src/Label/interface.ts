export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Custom prefix class name
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
   * Children elements
   */
  children?: React.ReactNode;
}
