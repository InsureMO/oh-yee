export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Class name prefix
   */
  prefixCls?: string;
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * Root element class name
   */
  className?: string;
  /**
   * Root element style
   */
  style?: React.CSSProperties;
  /**
   * Box display mode
   * - header: Fixed at the top, automatically adds a placeholder above
   * - footer: Fixed at the bottom, automatically adds a placeholder below
   */
  mode?: 'header' | 'footer';
}
