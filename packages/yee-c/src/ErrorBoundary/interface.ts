import type { DataAttributeProps } from '../utils/types';

export type ErrorCategory =
  | 'type'
  | 'reference'
  | 'range'
  | 'syntax'
  | 'uri'
  | 'chunk'
  | 'network'
  | 'resource'
  | 'unknown';

export interface ErrorBoundaryProps extends DataAttributeProps {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Custom root style
   */
  style?: React.CSSProperties;
  /**
   * Error event callback
   */
  onError?: (params: { error: Error; errorInfo: React.ErrorInfo }) => void;
  /**
   * Custom error display component
   */
  renderError?: () => React.ReactNode;
  /**
   * Callback when error panel is dismissed
   */
  onDismiss?: () => void;
  /**
   * Child elements
   */
  children: React.ReactNode;
}
