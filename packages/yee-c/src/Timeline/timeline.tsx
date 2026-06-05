import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';

import type { TimelineContextType, TimelineProps } from './interface';
import './style/index.less';

export const TimelineContext = React.createContext<TimelineContextType>(
  {} as TimelineContextType,
);

const Timeline = React.forwardRef(
  (baseprops: TimelineProps, ref: React.Ref<HTMLUListElement>) => {
    const { timeline } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, timeline);
    const {
      prefixCls = 'yee-timeline',
      children,
      mode = 'left',
      reverse,
      pending,
      className,
      ...rest
    } = props;

    const total = React.Children.count(children);
    const childs = React.Children.map(
      children as any,
      (child: React.ReactElement, index: number) =>
        React.cloneElement(child, { index } as any),
    );

    const cls = clsx(prefixCls, [`${prefixCls}-${mode}`], className);

    const attrs = { ...rest, className: cls };

    return (
      <ul {...attrs} ref={ref}>
        <TimelineContext.Provider
          value={{ prefixCls, total, mode, pending, reverse }}
        >
          {reverse ? childs.reverse() : childs}
        </TimelineContext.Provider>
      </ul>
    );
  },
);

Timeline.displayName = 'Timeline';

export default Timeline;
