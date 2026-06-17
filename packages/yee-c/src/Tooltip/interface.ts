import { TriggerProps } from '../Trigger';

export interface TooltipProps extends Omit<TriggerProps, 'popup'> {
  /**
   * Tooltip text
   * */
  title: React.ReactNode | (() => React.ReactNode);
  /**
   * mouse enter delay time, unit is second
   * @default 0.1
   */
  mouseEnterDelay?: number;
  /***
   * Tooltip custom background color
   * */
  color?: string;
}
