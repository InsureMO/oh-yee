export type SemanticDOM =
  | 'expandIcon'
  | 'header'
  | 'content'
  | 'title'
  | 'actions';

export interface CardProps {
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
   * Semantic class names
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Title
   */
  title?: React.ReactNode;
  /**
   * Children
   */
  children?: React.ReactNode;
  /**
   * Whether expanded by default
   */
  defaultExpanded?: boolean;
  /**
   * Whether expanded (controlled)
   */
  expanded?: boolean;
  /**
   * @description Whether to show the header area (header area is preserved even without title)
   * @default true
   */
  showHeader?: boolean;
  /**
   * Custom content on the right side of the header
   */
  extra?:
    | React.ReactNode
    | ((params: { expanded: boolean }) => React.ReactNode);
  /**
   * Whether the entire header can toggle expand/collapse on click
   * @default true
   */
  headerClickable?: boolean;
  /**
   * Expand icon position
   * @default 'right'
   */
  iconPosition?: 'left' | 'right';
  /**
   * Custom expand icon
   * @param expanded - Current expanded state
   * @returns Returns a React node to display the icon, returns null to hide the expand icon (for fully custom header scenarios)
   */
  expandIcon?: ((expanded: boolean) => React.ReactNode) | null;
  /**
   * Whether to show border
   */
  bordered?: boolean;
  /**
   * Callback when expanding/collapsing
   */
  onExpand?: (expanded: boolean) => void;
  /**
   * Expand/collapse animation duration (seconds)
   * @default 0.15
   */
  animationDuration?: number;
}

export interface CardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @description Custom class name prefix
   * */
  prefixCls?: string;
  /**
   * @description Card children
   *
   */
  children: React.ReactNode;
  /**
   * @description Root node class name
   * */
  className?: string;
  /**
   * @description Root node style
   */
  style?: React.CSSProperties;
  /**
   * @description Whether inside another card-group
   */
  inner?: boolean;
}
