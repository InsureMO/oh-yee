export type SemanticDOM = 'dot' | 'prev' | 'next';

export interface CarouselContextProps {
  prefixCls: string;
  effect: 'fade' | 'scrollx';
  current: number;
}

export interface CarouselItemProps {
  index: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * Semantic element class names
   */
  classNames?: Partial<Record<SemanticDOM, string>>;
  /**
   * Semantic element styles
   */
  styles?: Partial<Record<SemanticDOM, React.CSSProperties>>;
  /**
   * Children
   */
  children: React.ReactNode;
  /**
   * Auto switch
   */
  autoplay?: boolean;
  /**
   * autoplay time gap, unit is ms
   * @default 500
   */
  autoplaySpeed?: number;
  /**
   * Pause auto switch on mouse enter, effective when autoPlay=true
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Whether to show arrows
   * @default false
   */
  arrows?: boolean | 'always' | 'hover';
  /**
   * Whether to show indicator dots
   */
  dots?: boolean;
  /**
   * Indicator dot position
   */
  dotPosition?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Dot shape
   */
  dotShape?: 'line' | 'dot';
  /**
   * Dot trigger method
   */
  trigger?: 'click' | 'hover'; // Dot trigger method
  /**
   * Whether infinite scroll
   */
  infinite?: boolean;
  /**
   * switch animate effect
   */
  effect?: 'fade' | 'scrollx';
  /**
   * switch before change event
   * */
  beforeChange?: (current: number, next: number) => void;
  /**
   * switch after change event
   */
  afterChange?: (current: number) => void;
  /**
   * Switch animation duration (ms)
   * @default 500
   */
  animationDuration?: number;
}
