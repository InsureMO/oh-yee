import clsx from 'clsx';
import { Check } from 'lucide-react';
import React, { useContext } from 'react';

import type { OptionProps } from './interface';
import { OptionsCtx } from './options';

const Option = (props: OptionProps) => {
  const { label, value, disabled, title, dataTestId, style } = props;
  const {
    prefixCls,
    selectedKeys,
    focusedKey,
    multiple,
    looseMatch,
    onSelect,
  } = useContext(OptionsCtx);

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (!disabled) {
      onSelect(value, e);
    }
  };

  const htmlTitle = title
    ? title
    : typeof label === 'string'
      ? label
      : undefined;

  const selected = looseMatch
    ? selectedKeys.some((k) => String(k) === String(value))
    : selectedKeys.includes(value);

  const focused = looseMatch
    ? String(focusedKey) === String(value)
    : focusedKey === value;

  return (
    <div
      className={clsx(`${prefixCls}-option`, {
        [`${prefixCls}-option-selected`]: selected,
        [`${prefixCls}-option-focused`]: focused,
        [`${prefixCls}-option-disabled`]: disabled,
      })}
      aria-label="option"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick(e);
        }
      }}
      role="option"
      tabIndex={disabled ? undefined : 0}
      title={htmlTitle}
      data-testid={dataTestId}
      style={style}
    >
      <div className={`${prefixCls}-option-content`}>{label}</div>
      {multiple && selected && (
        <span className={`${prefixCls}-option-state`}>
          <Check size={16} />
        </span>
      )}
    </div>
  );
};

export default Option;
