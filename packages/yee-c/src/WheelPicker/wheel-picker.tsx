import React, { FC, useCallback } from 'react';
import type { WheelPickerProps } from './interface';
import WheelColumn from './wheel-column';

import './style/index.less';

const WheelPicker: FC<WheelPickerProps> = ({
  prefixCls = 'yee-wheel-picker',
  className,
  style,
  columns,
  value,
  onChange,
  itemHeight = 40,
  visibleItemCount = 5,
  ...rest
}) => {
  const handleChange = useCallback(
    (colIndex: number) => (itemIndex: number) => {
      const newValue = [...value];
      newValue[colIndex] = itemIndex;
      onChange?.(newValue);
    },
    [value, onChange],
  );

  const indicatorStyle = {
    height: itemHeight,
    top: Math.floor(visibleItemCount / 2) * itemHeight,
  };

  return (
    <div
      {...rest}
      className={`${prefixCls}${className ? ` ${className}` : ''}`}
      style={{ height: visibleItemCount * itemHeight, ...style }}
    >
      <div className={`${prefixCls}-columns`}>
        {columns.map((col, i) => (
          <WheelColumn
            key={i}
            column={col}
            selectedIndex={value[i] ?? 0}
            onChange={handleChange(i)}
            itemHeight={itemHeight}
            visibleItemCount={visibleItemCount}
            prefixCls={prefixCls}
          />
        ))}
      </div>
      <div className={`${prefixCls}-indicator`} style={indicatorStyle} />
    </div>
  );
};

export default WheelPicker;
