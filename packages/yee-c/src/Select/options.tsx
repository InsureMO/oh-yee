import clsx from 'clsx';
import React, { createContext, forwardRef, useRef } from 'react';
import { useLocale } from '../locale';
import type { OptionsContextValue, OptionsProps } from './interface';
import Option from './option';

export const OptionsCtx = createContext<OptionsContextValue>(
  {} as OptionsContextValue,
);

const Options = forwardRef<HTMLDivElement, OptionsProps>(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { locale } = useLocale();
    const { select } = locale;

    const {
      prefixCls,
      options,
      popupClassName,
      popupStyle,
      selectedKeys,
      focusedKey,
      dataTestId,
      multiple,
      onSelect,
      ...rest
    } = props;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const componentRef = ref || useRef<HTMLDivElement>(null);

    return (
      <div
        {...rest}
        className={clsx(`${prefixCls}-popup`, popupClassName)}
        style={popupStyle}
        ref={componentRef}
        tabIndex={-1}
      >
        {options.length === 0 ? (
          <div className={`${prefixCls}-empty`}>{select.noData}</div>
        ) : (
          <OptionsCtx.Provider
            value={{ prefixCls, selectedKeys, focusedKey, multiple, onSelect }}
          >
            {options.map((option, index: number) => (
              <Option
                {...option}
                key={option.value}
                dataTestId={`${dataTestId}-${index}`}
              />
            ))}
          </OptionsCtx.Provider>
        )}
      </div>
    );
  },
);

export default Options;
