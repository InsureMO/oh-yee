export interface ResponsiveCols {
  /** Mobile columns (<=768px) */
  mobile?: number;
  /** Desktop columns (>768px) */
  desktop?: number;
}

export interface GridProps {
  /**
   * id
   */
  id?: string;
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
   * Child elements
   */
  children?: React.ReactNode;
  /**
   * Number of columns, supports number or responsive configuration
   * @default 4
   */
  cols?: number | ResponsiveCols;
  /***
   * Number of rows
   */
  rows?: number;
  /**
   * Row and column gap
   * @default 16
   */
  gap?: number;
  /**
   * Column gap
   */
  colGap?: number;
  /**
   * Row gap
   */
  rowGap?: number;
}

export interface RowSpan {
  /**
   * Start row
   */
  start: number;
  /**
   * End row
   */
  end: number;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * Number of columns to span
   */
  colspan?: number;
  /**
   * Number of rows to span
   */
  rowspan?: RowSpan;
  /**
   * Child elements
   */
  children: React.ReactNode;
  /**
   * spanStyle
   */
  spanStyle?: {
    gridColumnStart?: number;
    gridColumnEnd?: number;
    gridRowStart?: number;
    gridRowEnd?: number;
  };
}
