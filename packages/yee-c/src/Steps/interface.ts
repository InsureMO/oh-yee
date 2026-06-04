import type { DataAttributeProps } from '../utils/types';

export type StepItem = {
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Whether disabled
   */
  disabled?: boolean;
  /**
   * Title
   */
  title?: React.ReactNode;
  /**
   * Subtitle
   */
  subTitle?: React.ReactNode;
  /**
   * Description
   */
  description?: React.ReactNode;
  /**
   * Status
   */
  status?: 'wait' | 'process' | 'finish' | 'error';
};

export interface StepProps extends StepItem {
  /**
   * Step index
   */
  index?: number;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom style
   */
  style?: React.CSSProperties;
}

export interface StepsProps extends DataAttributeProps {
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
   * Step configuration items
   */
  items?: Array<StepItem>;
  /**
   * Child elements
   */
  children?: React.ReactNode;
  /**
   * Current step
   * @default 0
   */
  current?: number;
  /**
   * Specified size
   */
  size?: 'small';
  /**
   * Status of the current step
   */
  status?: 'error' | 'wait' | 'process' | 'finish';
  /**
   * Dot-style step bar
   * @default false
   */
  dot?: boolean;
  /**
   * Step bar direction
   * @default horizontal
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Step bar type
   */
  type?: 'navigation' | 'ribbon';
  /**
   * Callback when a single step is clicked
   */
  onChange?: (current: number) => void;
}

export interface StepsContextType {
  prefixCls: string;
  current?: number;
  status?: 'error' | 'wait' | 'process' | 'finish';
  dot?: boolean;
  type?: 'navigation' | 'ribbon';
  onChange?: (current: number) => void;
}
