import type { DataAttributeProps } from '../utils/types';

export type TimelineItemStatus =
  | 'success'
  | 'info'
  | 'error'
  | 'warning'
  | 'disabled';

export interface TimelineItemProps extends DataAttributeProps {
  /**
   * Index
   */
  index?: number;
  /**
   * Set content
   */
  children: React.ReactNode;
  /**
   * Set timeline dot
   */
  dot?: React.ReactNode;
  /**
   * Set label
   */
  label?: React.ReactNode;
  /**
   * Set status
   */
  status?: TimelineItemStatus;
  /**
   * Set dot color
   */
  color?: string;
}

export interface TimelineProps extends DataAttributeProps {
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
   * Set the relative position of the timeline and content
   * @default left
   */
  mode?: 'left' | 'alternate' | 'right';
  /**
   * Child elements
   */
  children?: React.ReactElement[];
  /**
   * Child items
   */
  items?: Array<TimelineItemProps>;
  /**
   * Whether to reverse order
   */
  reverse?: boolean;
  /**
   * Whether the last node is in loading state
   */
  pending?: boolean;
}

export type TimelineContextType = {
  prefixCls: string;
  total: number;
  mode?: string;
  pending?: boolean;
  reverse?: boolean;
  crossDisplayDate?: boolean;
};
