import clsx from 'clsx';
import React, { forwardRef, useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import Step from './step';

import type { StepsContextType, StepsProps } from './interface';
import './style/index.less';

export const StepsContext = React.createContext<StepsContextType>(
  {} as StepsContextType,
);

const Steps = forwardRef<HTMLDivElement, StepsProps>((baseprops, ref) => {
  const { steps } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, steps);
  const {
    prefixCls = 'yee-steps',
    current = 0,
    size,
    status,
    className,
    style,
    dot,
    direction = 'horizontal',
    type,
    items = [],
    children,
    onChange,
    ...rest
  } = props;

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-${direction}`]: direction,
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-label-vertical`]: dot,
      [`${prefixCls}-navigation`]: type === 'navigation',
      [`${prefixCls}-ribbon`]: type === 'ribbon',
    },
    className,
  );

  const contextValue: StepsContextType = {
    prefixCls,
    current,
    status,
    dot,
    type,
    onChange,
  };

  const renderSteps = () => {
    if (children) {
      return React.Children.map(
        children as React.ReactElement[],
        (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { index } as any);
          }
          return child;
        },
      );
    }

    return items.map((item, index) => (
      <Step {...item} index={index} key={index} />
    ));
  };

  return (
    <div
      {...rest}
      className={cls}
      style={style}
      ref={ref}
      role="list"
      aria-label="Steps"
    >
      <StepsContext.Provider value={contextValue}>
        {renderSteps()}
      </StepsContext.Provider>
    </div>
  );
});

Steps.displayName = 'Steps';

export default Steps;
