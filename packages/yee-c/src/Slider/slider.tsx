import clsx from 'clsx';
import React, { forwardRef, useCallback, useContext, useState } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import type { SliderProps } from './interface';
import './style/index.less';

const Slider = forwardRef<HTMLDivElement, SliderProps>((baseprops, ref) => {
  const { slider } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, slider);

  const {
    prefixCls = 'yee-slider',
    className,
    style,
    disabled = false,
    min = 0,
    max = 100,
    step = 1,
    defaultValue,
    value,
    range = false,
    defaultRangeValue,
    rangeValue,
    tooltipVisible = true,
    onChange,
    onAfterChange,
    ...rest
  } = props;

  const [mergedValue, setMergedValue] = useMergedState(min ?? 0, {
    value,
    defaultValue,
  });

  const [mergedRangeValue, setMergedRangeValue] = useMergedState<
    [number, number]
  >([min, max], {
    value: rangeValue,
    defaultValue: defaultRangeValue,
  });

  // Track whether currently dragging
  const [isDragging, setIsDragging] = useState<boolean>(false); // eslint-disable-line @typescript-eslint/no-unused-vars

  // Ensure value is within valid range
  const clamp = (val: number, minVal: number, maxVal: number) => {
    return Math.min(Math.max(val, minVal), maxVal);
  };

  // Calculate the real value after applying step
  const getStepValue = (val: number) => {
    const steps = Math.round((val - min) / step);
    return clamp(min + steps * step, min, max);
  };

  // Handle single slider value change
  const handleSingleChange = (val: number) => {
    const steppedValue = getStepValue(val);
    if (value === undefined) {
      setMergedValue(steppedValue);
    }
    onChange?.(steppedValue);
  };

  // Handle range slider value change
  const handleRangeChange = (val: [number, number]) => {
    const steppedValue: [number, number] = [
      getStepValue(val[0]),
      getStepValue(val[1]),
    ];
    // Ensure the first value is not greater than the second
    if (steppedValue[0] > steppedValue[1]) {
      steppedValue.reverse();
    }

    if (rangeValue === undefined) {
      setMergedRangeValue(steppedValue);
    }
    onChange?.(steppedValue);
  };

  // Keyboard stepping
  const handleKeyDown = useCallback(
    (type: 'single' | 'range-start' | 'range-end') =>
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        const increment = e.key === 'ArrowRight' || e.key === 'ArrowUp';
        const decrement = e.key === 'ArrowLeft' || e.key === 'ArrowDown';

        if (!increment && !decrement) return;
        e.preventDefault();

        const delta = increment ? step : -step;

        if (type === 'single') {
          handleSingleChange(mergedValue + delta);
          onAfterChange?.(getStepValue(mergedValue + delta));
        } else if (type === 'range-start') {
          handleRangeChange([mergedRangeValue[0] + delta, mergedRangeValue[1]]);
          onAfterChange?.([
            getStepValue(mergedRangeValue[0] + delta),
            mergedRangeValue[1],
          ] as [number, number]);
        } else {
          handleRangeChange([mergedRangeValue[0], mergedRangeValue[1] + delta]);
          onAfterChange?.([
            mergedRangeValue[0],
            getStepValue(mergedRangeValue[1] + delta),
          ] as [number, number]);
        }
      },
    [
      disabled,
      step,
      mergedValue,
      mergedRangeValue,
      handleSingleChange,
      handleRangeChange,
      onAfterChange,
      getStepValue,
    ],
  );

  // Handle mouse down event
  const handleMouseDown = (type: 'single' | 'range-start' | 'range-end') => {
    if (disabled) return;

    setIsDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      const sliderElement = document.getElementById(`${prefixCls}-rail`);
      if (!sliderElement) return;

      const railRect = sliderElement.getBoundingClientRect();
      const position = (e.clientX - railRect.left) / railRect.width;
      const val = min + position * (max - min);

      if (type === 'single') {
        handleSingleChange(val);
      } else if (type === 'range-start') {
        handleRangeChange([val, mergedRangeValue[1]]);
      } else if (type === 'range-end') {
        handleRangeChange([mergedRangeValue[0], val]);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Trigger onAfterChange callback
      if (type === 'single') {
        onAfterChange?.(mergedValue);
      } else {
        onAfterChange?.(mergedRangeValue);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Calculate the percentage of slider position
  const getPercentage = (val: number) => {
    return ((val - min) / (max - min)) * 100;
  };

  // Normal slider class names
  const sliderClass = clsx(prefixCls, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  // Range slider class names
  const rangeSliderClass = clsx(`${prefixCls}-range`, className, {
    [`${prefixCls}-disabled`]: disabled,
  });

  // If range slider
  if (range) {
    const [startValue, endValue] = mergedRangeValue;
    const startPercent = getPercentage(startValue);
    const endPercent = getPercentage(endValue);

    return (
      <div ref={ref} className={rangeSliderClass} style={style} {...rest}>
        <div className={`${prefixCls}-rail`} id={`${prefixCls}-rail`}>
          <div
            className={`${prefixCls}-track`}
            style={{
              left: `${startPercent}%`,
              width: `${endPercent - startPercent}%`,
            }}
          />
          <div
            className={`${prefixCls}-handler`}
            style={{ left: `${startPercent}%` }}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={startValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label="Range start"
            aria-disabled={disabled}
            onKeyDown={handleKeyDown('range-start')}
            onMouseDown={() => handleMouseDown('range-start')}
          />
          <div
            className={`${prefixCls}-handler`}
            style={{ left: `${endPercent}%` }}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuenow={endValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label="Range end"
            aria-disabled={disabled}
            onKeyDown={handleKeyDown('range-end')}
            onMouseDown={() => handleMouseDown('range-end')}
          />
          {tooltipVisible && (
            <>
              <div
                className={`${prefixCls}-tooltip`}
                style={{ left: `${startPercent}%` }}
              >
                {startValue}
              </div>
              <div
                className={`${prefixCls}-tooltip`}
                style={{ left: `${endPercent}%` }}
              >
                {endValue}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Normal slider
  const percent = getPercentage(mergedValue);

  return (
    <div ref={ref} className={sliderClass} style={style} {...rest}>
      <div className={`${prefixCls}-rail`} id={`${prefixCls}-rail`}>
        <div
          className={`${prefixCls}-track`}
          style={{ width: `${percent}%` }}
        />
        <div
          className={`${prefixCls}-handler`}
          style={{ left: `${percent}%` }}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuenow={mergedValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown('single')}
          onMouseDown={() => handleMouseDown('single')}
        />
        {tooltipVisible && (
          <div
            className={`${prefixCls}-tooltip`}
            style={{ left: `${percent}%` }}
          >
            {mergedValue}
          </div>
        )}
      </div>
    </div>
  );
});

export default Slider;
