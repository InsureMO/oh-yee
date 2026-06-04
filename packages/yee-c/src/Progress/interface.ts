import type { DataAttributeProps } from '../utils/types';

export interface ProgressProps extends DataAttributeProps {
  /**
   * Custom prefix class name
   */
  prefixCls?: string;
  /**
   * Custom root class name
   */
  className?: string;
  /**
   * Custom root inline style
   */
  style?: React.CSSProperties;
  /**
   * Completion percentage
   */
  percent: number;
  /**
   * Status
   */
  status?: 'info' | 'success' | 'error' | 'default' | 'warning';
  /**
   * Progress bar type
   */
  type?: 'circle' | 'line' | 'dashboard';
  /**
   * Whether to show progress number or tip
   * @default true
   */
  showInfo?: boolean;
  /**
   * Progress bar color
   */
  strokeColor?: string | {
    '0%': string;
    '100%': string;
  };
  /**
   * Children elements
   */
  children?: React.ReactNode;
  /**
   * Format display content
   */
  format?: (percent: number) => React.ReactNode;

  /**
   * Progress bar stroke width
   */
  strokeWidth?: number;
  /**
   * Progress bar width
   */
  width?: number;
  /**
   * Completed progress config
   */
  done?: { percent: number };
  /**
   * Mouse enter callback
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Mouse leave callback
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Click callback
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export type gradientColorType = { '0%': string; '100%': string };

export interface LineProps extends Omit<ProgressProps, 'strokeColor'> {
  /**
   * Total steps of the progress bar
   */
  steps?: number;
  /**
   * Progress bar color
   */
  strokeColor?: string | gradientColorType;
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export interface StepsProps extends Omit<ProgressProps, 'strokeColor'> {
  /**
   * Number of segments
   * @default 5
   * */
  steps: number;
  /**
   * Progress bar color
   */
  strokeColor?: string | string[];
  /**
   * Children elements
   */
  children?: React.ReactNode;
}

export interface CircleProps extends Omit<ProgressProps, 'strokeColor'> {
  strokeColor?: string | Record<string, string>;
  /**
   * Children elements
   * */
  children?: React.ReactNode;
}
