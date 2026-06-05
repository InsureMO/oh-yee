import { TriggerProps as RcTriggerProps } from '@rc-component/trigger';

export type Placement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom';

export type Point =
  | 'tl'
  | 'tc'
  | 'tr'
  | 'bl'
  | 'bc'
  | 'br'
  | 'lt'
  | 'lc'
  | 'lb'
  | 'rt'
  | 'rc'
  | 'rb'
  | 'cc'
  | 'cl'
  | 'cr';

export interface TriggerProps extends Omit<RcTriggerProps, 'children'> {
  /**
   * Custom class name prefix
   */
  prefixCls?: string;
  /**
   * Popup layer
   */
  popup: RcTriggerProps['popup'];
  /**
   * Popup class name
   */
  popupClassName?: string;
  /**
   * Popup style
   */
  popupStyle?: React.CSSProperties;
  /**
   * Popup alignment
   */
  popupAlign?: { points?: [Point, Point]; offset?: [number, number] };
  /**
   * Trigger element
   */
  children: React.ReactNode;
  /**
   * Actions that trigger the popup to show
   */
  trigger?: Array<'hover' | 'click' | 'focus'> | 'hover' | 'click' | 'focus';
  /**
   * Control whether the popup is visible
   */
  open?: boolean;
  /**
   * Control whether the popup is visible by default
   */
  defaultOpen?: boolean;
  /**
   * Popup placement relative to the trigger
   * @default top
   */
  placement?: Placement;
  /**
   * Whether to destroy the popup on hide
   */
  destroyPopupOnHide?: boolean;
  /**
   * Set the z-index of the popup
   */
  zIndex?: number;
  /**
   * Delay in seconds before showing the popup after mouse enters the trigger
   * @default 0.1
   */
  mouseEnterDelay?: number;
  /**
   * Delay in seconds before hiding the popup after mouse leaves the trigger
   * @default 0.1
   */
  mouseLeaveDelay?: number;
  /**
   * Whether to hide on click inside the popup
   * @default true
   */
  hideOnClick?: boolean;
  /**
   * When true, the popup aligns with the mouse click/right-click/hover position instead of the trigger node (commonly used for context menus and cursor-following tooltips)
   */
  alignPoint?: boolean;
  /**
   * When true, the popup is rendered to the DOM on first mount (only hidden), useful for SSR or pre-fetching node dimensions; otherwise it renders on first show
   */
  forceRender?: boolean;
  /**
   * Make the popup width/height follow the trigger node
   */
  stretch?: 'width' | 'minWidth' | 'height' | 'minHeight';
  /**
   * Custom popup render container
   */
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement;
  /**
   * Callback when popup visibility changes
   */
  onOpenChange?: (visible: boolean) => void;
}
