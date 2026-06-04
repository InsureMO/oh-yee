import clsx from 'clsx';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { statusColor, statusList } from './progress';

import type { CircleProps } from './interface';

const CIRCLE_CIRCUMFERENCE = 351.86;

const Circle = React.forwardRef<HTMLDivElement, CircleProps>((props, ref) => {
  const {
    prefixCls,
    showInfo = true,
    percent,
    width = 120,
    strokeColor,
    strokeWidth = 8,
    done,
    children,
  } = props;

  const path1Ref = useRef<SVGCircleElement>(null);
  const path2Ref = useRef<SVGCircleElement>(null);
  const path3Ref = useRef<SVGCircleElement>(null);

  useLayoutEffect(() => {
    if (!path1Ref.current) return;
    path1Ref.current.style.cssText = `stroke-dasharray: ${CIRCLE_CIRCUMFERENCE}px, ${CIRCLE_CIRCUMFERENCE}px;
        stroke-dashoffset: ${CIRCLE_CIRCUMFERENCE * (1 - percent / 100)};
        transform: rotate(-90deg);
        transform-origin: 50% 50%`;
  }, [percent, strokeWidth, width]);

  useLayoutEffect(() => {
    if (strokeColor || !path1Ref.current) return;
    if (done && done.percent) {
      path2Ref.current!.style.cssText = `stroke-dasharray: ${CIRCLE_CIRCUMFERENCE}px, ${CIRCLE_CIRCUMFERENCE}px;
            stroke-dashoffset: ${CIRCLE_CIRCUMFERENCE * (1 - done.percent / 100)};
            transform: rotate(-90deg);
            transform-origin: 50% 50%;`;
    }
  }, [done, strokeWidth]);

  useEffect(() => {
    if (!(strokeColor && path3Ref.current)) return;
    path3Ref.current.style.cssText = `stroke-dashoffset: ${CIRCLE_CIRCUMFERENCE * (1 - percent / 100)};`;
  }, [percent, strokeWidth]);

  let progressColor;
  if (strokeColor) {
    if (typeof strokeColor === 'string') {
      let color = strokeColor;
      color =
        statusList.includes(color) && statusColor[color]
          ? statusColor[color]
          : color;
      progressColor = { stroke: color };
    } else if (strokeColor instanceof Object) {
      progressColor = { stroke: 'url(#yee-progress-gradient-conic)' };
    }
  }

  const renderForeignObject = () => {
    const entries = Object.entries(strokeColor || {});

    let color = '';

    entries.forEach(([key, value]: [string, string]) => {
      const c = statusList.includes(value)
        ? `var(--yee-progress-${value}-color)`
        : value;
      color += `,${c} ${key}`;
    });

    return (
      <foreignObject
        x="0"
        y="0"
        width="120"
        height="120"
        mask="url(#yee-progress-gradient-conic)"
      >
        <div
          className={`${prefixCls}-gradient-conic-foreign`}
          style={{ background: `conic-gradient(from 0deg${color})` }}
        ></div>
      </foreignObject>
    );
  };

  const renderConicGradient = () => {
    return (
      <mask id={`${prefixCls}-gradient-conic`}>
        <circle
          className={`${prefixCls}-gradient-conic-circle`}
          cx="60"
          cy="60"
          r="56"
          stroke="#FFF"
          strokeLinecap="butt"
          strokeWidth={strokeWidth}
          opacity="1"
          ref={path3Ref}
        />
      </mask>
    );
  };

  return (
    <div className={`${prefixCls}-circle`} style={{ width, height: width }} ref={ref}>
      <svg className={`${prefixCls}-circle`} viewBox="0 0 120 120">
        <circle
          className={`${prefixCls}-circle-trail`}
          cx="60"
          cy="60"
          r="56"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {strokeColor instanceof Object && renderConicGradient()}
        {strokeColor instanceof Object && renderForeignObject()}
        {
          <>
            <circle
              className={`${progressColor ? '' : `${prefixCls}-circle-path`}`}
              cx="60"
              cy="60"
              r="56"
              strokeWidth={strokeWidth}
              {...progressColor}
              fill="transparent"
              ref={path1Ref}
            />
            {done && done.percent && (
              <circle
                className={clsx(`${prefixCls}-circle-segment-path2`, {
                  [`${prefixCls}-circle-segment-done`]: done && done.percent,
                })}
                cx="60"
                cy="60"
                r="56"
                strokeWidth={strokeWidth}
                fill="transparent"
                ref={path2Ref}
              />
            )}
          </>
        }
      </svg>
      {showInfo && <span className={`${prefixCls}-text`}>{children}</span>}
    </div>
  );
});

Circle.displayName = 'Circle';

export default Circle;
