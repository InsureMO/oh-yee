import type { MenuProps } from '../Menu';
import type { TriggerProps } from '../Trigger';

export interface DropdownProps extends Omit<
  TriggerProps,
  'placement' | 'popup'
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
   * Custom root style
   */
  style?: React.CSSProperties;
  /**
   * Popup position
   * @default bottom
   */
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight';
  /**
   * Menu configuration items
   */
  menu?: MenuProps;
  /**
   * Custom popup content
   */
  popup?: React.ReactNode | (() => React.ReactNode);
}
