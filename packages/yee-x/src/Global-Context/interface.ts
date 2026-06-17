import type { AvatarProps } from '@rainbow-oh/yee-c';
import React from 'react';

export type CompositionDOM = 'header' | 'content' | 'footer' | 'avatar';

export type GlobalContextType = {
  bubble?: {
    classNames?: Partial<Record<CompositionDOM, string>>;
    styles?: Partial<Record<CompositionDOM, React.CSSProperties>>;
    components?: Partial<
      Record<CompositionDOM, React.ReactNode | (() => React.ReactNode)>
    >;
    avatar?: AvatarProps;
    header?: React.ReactNode;
    content?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    footer?: React.ReactNode;
    loading?: boolean;
    placement?: 'start' | 'end';
    shape?: 'round';
    typing?: boolean;
    visible?: boolean;
  };
};
