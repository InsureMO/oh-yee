import type { Placement } from '../Trigger/interface';
import type { DataAttributeProps } from '../utils/types';

export type TourTarget = (() => HTMLElement | null) | string | HTMLElement;

export type TourSemanticDOM =
  | 'highlight'
  | 'content'
  | 'header'
  | 'body'
  | 'footer';

export interface TourStep {
  /**
   * The element to highlight, supports a finder function, a CSS selector string, or an HTMLElement
   */
  target: TourTarget;
  /**
   * Card title
   */
  title?: React.ReactNode;
  /**
   * Card description
   */
  description?: React.ReactNode;
  /**
   * Card placement relative to the highlighted target
   * @default 'bottom'
   */
  placement?: Placement;
  /**
   * Whether to show the card arrow
   */
  arrow?: boolean;
  /**
   * Custom step class name
   */
  className?: string;
}

export interface TourProps extends DataAttributeProps {
  /**
   * Custom prefix class name
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
   * Semantic structure class names
   */
  classNames?: Partial<Record<TourSemanticDOM, string>>;
  /**
   * Semantic structure styles
   */
  styles?: Partial<Record<TourSemanticDOM, React.CSSProperties>>;
  /**
   * Whether the tour is visible (controlled)
   */
  open: boolean;
  /**
   * Tour steps
   */
  steps: TourStep[];
  /**
   * Controlled current step index
   */
  current?: number;
  /**
   * Default current step index
   */
  defaultCurrent?: number;
  /**
   * Callback when the tour is closed / skipped
   */
  onClose?: () => void;
  /**
   * Callback when all steps are finished
   */
  onFinish?: () => void;
  /**
   * Callback when current step changes
   */
  onChange?: (current: number) => void;
  /**
   * Default card placement relative to the highlighted target
   * @default 'bottom'
   */
  placement?: Placement;
  /**
   * Whether to show the card arrow by default
   */
  arrow?: boolean;
  /**
   * Whether to show the mask layer (highlight cutout + click lock)
   * @default true
   */
  mask?: boolean;
  /**
   * Whether the close button is shown at the top-right of the card
   * @default true
   */
  closable?: boolean;
  /**
   * Custom close icon
   */
  closeIcon?: React.ReactNode;
  /**
   * Whether clicking the mask closes the tour
   * @default false
   */
  maskClosable?: boolean;
  /**
   * Custom step indicators renderer, receives (current, total)
   */
  indicatorsRender?: (current: number, total: number) => React.ReactNode;
  /**
   * Options passed to target.scrollIntoView on each step
   */
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions;
}
