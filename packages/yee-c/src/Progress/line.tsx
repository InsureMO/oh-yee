import React from 'react';
import { statusList } from './progress';
import type { LineProps } from './interface';

const Line = React.forwardRef<HTMLDivElement, LineProps>((props, ref) => {
  const {
    prefixCls,
    percent,
    showInfo = true,
    strokeColor,
    strokeWidth = 8,
    done,
    children,
  } = props;

  let progressColor;
  if (strokeColor) {
    if (typeof strokeColor === 'string') {
      progressColor = { backgroundColor: strokeColor };
    } else if (strokeColor instanceof Object) {
      const start = strokeColor['0%'];
      const end = strokeColor['100%'];

      const _start = statusList.includes(start)
        ? `var(--yee-progress-${start}-color)`
        : start;
      const _end = statusList.includes(end)
        ? `var(--yee-progress-${end}-color)`
        : end;

      progressColor = {
        backgroundImage: `linear-gradient(to right, ${_start} 0%, ${_end} 100%)`,
      };
    }
  }

  return (
    <div className={`${prefixCls}-outer`} ref={ref}>
      <div className={`${prefixCls}-inner`} style={{ height: strokeWidth }}>
        <div
          className={`${prefixCls}-bg`}
          style={{ width: percent + '%', ...progressColor }}
        ></div>
        {done && done.percent && (
          <div
            className={`${prefixCls}-done-bg`}
            style={{ width: done.percent + '%' }}
          ></div>
        )}
      </div>
      {showInfo && <span className={`${prefixCls}-text`}>{children}</span>}
    </div>
  );
});

Line.displayName = 'Line';

export default Line;
