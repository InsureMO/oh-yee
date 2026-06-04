import type { DataAttributeProps } from '../utils/types';

export interface QRCodeProps extends DataAttributeProps {
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
   * QR code content
   */
  value: string;
  /**
   * Render type
   */
  type?: 'canvas' | 'svg';
  /**
   * Icon URL in the QR code
   */
  icon?: string;
  /**
   * QR code size
   */
  size?: number;
  /**
   * Icon size
   */
  iconSize?: number;
  /**
   * QR code color
   */
  color?: string;
  /**
   * QR code background color
   */
  bgColor?: string;
  /**
   * Error correction level
   */
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
  /**
   * Whether to show border
   */
  bordered?: boolean;
  /**
   * QR code status
   */
  status?: 'active' | 'loading' | 'expired' | 'scanned';
  /**
   * Status message
   */
  message?: string;
  /**
   * Click refresh callback
   */
  onRefresh?: () => void;
  /**
   * Custom status render
   */
  statusRender?: (info: {
    status: 'active' | 'loading' | 'expired' | 'scanned';
    onRefresh?: () => void;
  }) => React.ReactNode;
}
