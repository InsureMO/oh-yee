import clsx from 'clsx';
import React from 'react';
import { SpinProps } from './interface';

const sizeMap = {
  small: 16,
  default: 24,
  large: 40,
};

/**
 * Ring spinner - classic circular ring that rotates
 */
const RingSpinner: React.FC<SpinProps> = (props) => {
  const {
    prefixCls = 'yee-spin',
    size = 'default',
    classNames,
    styles,
    width,
    height,
  } = props;

  const containerSize = sizeMap[size];
  const borderWidth = size === 'small' ? 2 : size === 'large' ? 4 : 3;

  return (
    <div
      className={clsx(
        `${prefixCls}-indicator`,
        `${prefixCls}-indicator-ring`,
        classNames?.indicator,
      )}
      style={{
        width: width || containerSize,
        height: height || containerSize,
        ...styles?.indicator,
      }}
    >
      <div
        className={`${prefixCls}-ring`}
        style={{
          width: '100%',
          height: '100%',
          borderWidth,
        }}
      />
    </div>
  );
};

/**
 * Spokes spinner - radiating lines that rotate like wheel spokes
 */
const SpokesSpinner: React.FC<SpinProps> = (props) => {
  const {
    prefixCls = 'yee-spin',
    size = 'default',
    classNames,
    styles,
    width,
    height,
    color
  } = props;

  const containerSize = sizeMap[size];
  const count = 8;

  return (
    <div
      className={clsx(
        `${prefixCls}-indicator`,
        `${prefixCls}-indicator-spokes`,
        classNames?.indicator,
      )}
      style={{
        width: width || containerSize,
        height: height || containerSize,
        ...styles?.indicator,
      }}
    >
      <div className={`${prefixCls}-spokes`}>
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className={`${prefixCls}-spokes-line`}
            style={{
              transform: `rotate(${i * (360 / count)}deg)`,
              animationDelay: `${(i * 1) / count}s`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Dot spinner - three dots rotating in a circle
 */
const DotSpinner: React.FC<SpinProps> = (props) => {
  const {
    prefixCls = 'yee-spin',
    size = 'default',
    color = 'default',
    classNames,
    styles,
    width,
    height,
  } = props;

  const containerSize = sizeMap[size];
  const dotSizeMap = {
    small: 6,
    default: 8,
    large: 12,
  };
  const dotSize = dotSizeMap[size];

  return (
    <div
      className={clsx(`${prefixCls}-indicator`, classNames?.indicator)}
      style={{
        width: width || containerSize,
        height: height || containerSize,
        ...styles?.indicator,
      }}
    >
      <div
        className={`${prefixCls}-indicator-container`}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          animation: `spinner-rotate 2s linear infinite`,
        }}
      >
        {[0, 1, 2].map((index) => {
          const angle = index * 120 * (Math.PI / 180);
          const radius = containerSize / 3;
          const x = containerSize / 2 + radius * Math.sin(angle) - dotSize / 2;
          const y = containerSize / 2 - radius * Math.cos(angle) - dotSize / 2;

          return (
            <div
              key={index}
              className={`${prefixCls}-indicator-dot`}
              style={{
                position: 'absolute',
                width: dotSize,
                height: dotSize,
                backgroundColor: color,
                borderRadius: '50%',
                left: x,
                top: y,
                transformOrigin: 'center',
                animation: `spinner-pulse 1.5s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes spinner-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spinner-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.6);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

/**
 * Bounce spinner - three dots that bounce up and down sequentially
 */
const BounceSpinner: React.FC<SpinProps> = (props) => {
  const {
    prefixCls = 'yee-spin',
    size = 'default',
    classNames,
    styles,
    width,
    height,
    color,
  } = props;

  const containerSize = sizeMap[size];
  const dotSizeMap = { small: 4, default: 6, large: 10 };
  const dotSize = dotSizeMap[size];

  return (
    <div
      className={clsx(
        `${prefixCls}-indicator`,
        `${prefixCls}-indicator-bounce`,
        classNames?.indicator,
      )}
      style={{
        width: width || containerSize,
        height: height || containerSize,
        ...styles?.indicator,
      }}
    >
      <div className={`${prefixCls}-bounce`}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`${prefixCls}-bounce-dot`}
            style={{
              width: dotSize,
              height: dotSize,
              animationDelay: `${i * 0.15}s`,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Pulse spinner - a circle that pulses (scales up and fades out) repeatedly
 */
const PulseSpinner: React.FC<SpinProps> = (props) => {
  const {
    prefixCls = 'yee-spin',
    size = 'default',
    classNames,
    styles,
    width,
    height,
    color,
  } = props;

  const containerSize = sizeMap[size];

  return (
    <div
      className={clsx(
        `${prefixCls}-indicator`,
        `${prefixCls}-indicator-pulse`,
        classNames?.indicator,
      )}
      style={{
        width: width || containerSize,
        height: height || containerSize,
        ...styles?.indicator,
      }}
    >
      <span
        className={`${prefixCls}-pulse-circle`}
        style={{ backgroundColor: color }}
      />
      <span
        className={`${prefixCls}-pulse-circle ${prefixCls}-pulse-circle-delay`}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

/**
 * Wheel spinner - similar to spokes but each line is offset from center,
 * creating a visible hollow circle in the middle
 */
const WheelSpinner: React.FC<SpinProps> = (props) => {
  const {
    prefixCls = 'yee-spin',
    size = 'default',
    classNames,
    styles,
    width,
    height,
    color,
  } = props;

  const containerSize = sizeMap[size];
  const count = 10;
  const innerRadius = 0.38; // start at 38% from center (larger hollow area)
  const spokeLength = containerSize * 0.22;

  return (
    <div
      className={clsx(
        `${prefixCls}-indicator`,
        `${prefixCls}-indicator-wheel`,
        classNames?.indicator,
      )}
      style={{
        width: width || containerSize,
        height: height || containerSize,
        ...styles?.indicator,
      }}
    >
      <div className={`${prefixCls}-wheel-spokes`}>
        {Array.from({ length: count }, (_, i) => {
          const angle = (i * 360) / count;
          const rad = (angle * Math.PI) / 180;
          // Position each spoke: starts at innerRadius from center
          const cx = containerSize / 2;
          const cy = containerSize / 2;
          const x = cx + innerRadius * containerSize * Math.sin(rad);
          const y = cy - innerRadius * containerSize * Math.cos(rad);

          return (
            <div
              key={i}
              className={`${prefixCls}-wheel-spoke`}
              style={{
                top: y,
                left: x,
                height: spokeLength,
                marginLeft: -1,
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'top center',
                animationDelay: `${(i * 1.2) / count}s`,
                backgroundColor: color,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

interface IndicatorProps extends SpinProps {
  variant?: 'dot' | 'ring' | 'spokes' | 'bounce' | 'pulse' | 'wheel';
}

const Indicator: React.FC<IndicatorProps> = ({ variant = 'dot', ...props }) => {
  if (variant === 'ring') {
    return <RingSpinner {...props} />;
  }
  if (variant === 'spokes') {
    return <SpokesSpinner {...props} />;
  }
  if (variant === 'bounce') {
    return <BounceSpinner {...props} />;
  }
  if (variant === 'pulse') {
    return <PulseSpinner {...props} />;
  }
  if (variant === 'wheel') {
    return <WheelSpinner {...props} />;
  }
  return <DotSpinner {...props} />;
};

export default Indicator;
