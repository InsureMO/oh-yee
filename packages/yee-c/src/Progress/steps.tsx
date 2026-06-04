/* eslint-disable indent */
import React from 'react';
import clsx from 'clsx';
import { statusList, statusColor } from './progress';

import type { StepsProps } from './interface';

const Steps = React.forwardRef<HTMLDivElement, StepsProps>((props, ref) => {
  const {
    prefixCls,
    steps,
    percent,
    showInfo = true,
    strokeColor,
    strokeWidth = 8,
    done,
    children,
  } = props;

  const renderSteps = () => {
    return new Array(steps).fill(0).map((item, index: number) => {
      const active = index + 1 <= Math.ceil((steps * percent) / 100);
      let color =
        typeof strokeColor === 'string'
          ? strokeColor
          : Array.isArray(strokeColor)
            ? strokeColor[index]
            : '';
      color =
        statusList.includes(color) && statusColor[color]
          ? statusColor[color]
          : color;
      let successActive = false;
      if (done && done.percent) {
        const successIndex = Math.ceil((steps * done.percent) / 100);
        if (index + 1 <= successIndex) {
          successActive = true;
        }
      }
      const style = {
        height: strokeWidth,
        backgroundColor: active ? color : undefined,
      };
      return (
        <div
          className={clsx(`${prefixCls}-step`, {
            [`${prefixCls}-step-active`]: active,
            [`${prefixCls}-step-done`]: successActive,
          })}
          style={style}
          key={index}
        ></div>
      );
    });
  };

  return (
    <div className={`${prefixCls}-steps`} ref={ref}>
      {renderSteps()}
      {showInfo && <span className={`${prefixCls}-text`}>{children}</span>}
    </div>
  );
});

Steps.displayName = 'Steps';

export default Steps;
