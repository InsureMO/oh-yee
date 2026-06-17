import clsx from 'clsx';
import React, { createContext, forwardRef, useRef } from 'react';
import { useLocale } from '../locale';
import Option from './option';

export const OptionsCtx = createContext({} as any);

const Options = forwardRef((props: any, ref: React.Ref<HTMLDivElement>) => {
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
          value={{ prefixCls, selectedKeys, focusedKey, onSelect }}
        >
          {options.map((option: any, index: number) => (
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
});

export default Options;
