import clsx from 'clsx';
import React, { createContext, forwardRef, useRef } from 'react';
import useSelectKeyboard from './hooks/useSelectKeyboard';
import Option from './option';
import { useLocale } from '../locale';

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
    onSelect,
    ...rest
  } = props;

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
          {options.map((option: any) => (
            <Option {...option} key={option.value} />
          ))}
        </OptionsCtx.Provider>
      )}
    </div>
  );
});

export default Options;
