import type { DataAttributeProps } from '../utils/types';

export interface RevealProps extends DataAttributeProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  /**
   * Render mode
   * - scroll: render each item when scrolled into viewport
   * - stagger: render frame by frame with automatic rate adjustment, all items eventually visible
   * @default 'scroll'
   */
  mode?: 'scroll' | 'stagger';
  /**
   * Early trigger distance (scroll mode only), e.g. '100px' means start loading when 100px from viewport
   * @default '0px'
   */
  offset?: string;
  /**
   * Scroll container (scroll mode only), defaults to viewport
   */
  scrollContainer?: Element | null;
}
