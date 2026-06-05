import clsx from 'clsx';
import { CircleCheck, CircleX } from 'lucide-react';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import mergeContextToProps from '../utils/mergeContextToProps';
import { pickDataAttrs } from '../utils/types';
import Circle from './circle';
import type { ProgressProps } from './interface';
import Line from './line';

import './style/index.less';

export const statusList = [
  'info',
  'success',
  'error',
  'default',
  'warning',
  'done',
];

export const statusColor = {
  info: 'var(--yee-progress-info-color)',
  success: 'var(--yee-progress-success-color)',
  warning: 'var(--yee-progress-info-color)',
  error: 'var(--yee-progress-error-color)',
  done: 'var(--yee-progress-done-color)',
} as Record<string, string>;

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (baseprops, ref) => {
    const { progress: _progress } = useContext(GlobalContext);
    const props = mergeContextToProps(baseprops, _progress);
    const {
      prefixCls = 'yee-progress',
      type = 'line',
      children,
      status = 'default',
      percent,
      className,
      style,
      format,
      onMouseEnter,
      onMouseLeave,
      onClick,
      ...rest
    } = props;

    const dataAttrs = pickDataAttrs(rest as Record<string, unknown>);

    // progressInfo
    const getProgressInfo = () => {
      if (children) {
        return children;
      }

      if (format) {
        return format(percent);
      }

      if (percent === 100) {
        return <CircleCheck />;
      }

      if (status === 'error') {
        return <CircleX />;
      }

      return percent + '%';
    };

    const progressInfo = getProgressInfo();

    // progress
    let progress;
    if (type === 'line') {
      progress = (
        <Line prefixCls={prefixCls} percent={percent}>
          {progressInfo}
        </Line>
      );
    } else {
      progress = (
        <Circle prefixCls={prefixCls} percent={percent}>
          {progressInfo}
        </Circle>
      );
    }

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-${props.status}`]: props.status,
      },
      className,
    );

    return (
      <div
        className={cls}
        style={{ ...style, width: type === 'line' ? '100%' : undefined }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        ref={ref}
        {...dataAttrs}
      >
        {progress}
      </div>
    );
  },
);

Progress.displayName = 'Progress';

export default Progress;
