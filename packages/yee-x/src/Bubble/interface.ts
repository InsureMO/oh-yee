import type { AvatarProps } from '@rainbow-oh/yee-c';
import React from 'react';

export type CompositionDOM = 'header' | 'content' | 'footer' | 'avatar';

export interface BubbleProps {
  /**
   * Class names for semantic structure sections
   */
  classNames?: Partial<Record<CompositionDOM, string>>;
  /**
   * Inline styles for semantic structure sections
   */
  styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
  /**
   * Custom components for semantic structure sections
   */
  components?: Partial<
    Record<CompositionDOM, React.ReactNode | (() => React.ReactNode)>
  >;

  /**
   * Avatar configuration, see Avatar for available properties
   */
  avatar?: AvatarProps;

  /**
   * Header content
   */
  header?: React.ReactNode;
  /**
   * Message content
   */
  content: React.ReactNode;
  /**
   * Message prefix
   */
  prefix?: React.ReactNode;
  /**
   * Message suffix
   */
  suffix?: React.ReactNode;
  /**
   * Footer content
   */
  footer?:
    | React.ReactNode
    | ((props: {
        role: string;
        content: React.ReactNode;
        latest?: boolean;
        loading?: boolean;
        item?: BubbleProps;
      }) => React.ReactNode);
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Message placement
   * @default start
   */
  placement?: 'start' | 'end';
  /**
   * Bubble shape
   */
  shape?: 'round';
  /**
   * Typing effect
   */
  typing?: boolean;
  /**
   * Whether to display the bubble
   */
  visible?: boolean;
}

export type RoleType = Omit<BubbleProps, 'content'> & {
  role: string;
};

export interface BubbleListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Bubble list items
   */
  items: Array<BubbleProps & { key?: string | number; role?: string }>;
  /**
   * Auto-scroll to the latest item; stops if the user scrolls manually
   * @default true
   */
  autoScroll?: boolean;
  /**
   * Class name prefix
   */
  prefixCls?: string;
  /**
   * Bubble content parser
   */
  parser?:
    | 'markdown'
    | ((params: { role: string; content: string }) => React.ReactNode);
  /**
   * Role definitions
   */
  roles?: Record<string, RoleType>;
  /***
   * Custom Bubble renderer
   * */
  render?: (props: BubbleProps) => React.ReactNode;
}
