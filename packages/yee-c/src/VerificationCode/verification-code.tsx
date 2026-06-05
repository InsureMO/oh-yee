import clsx from 'clsx';
import React, { useContext } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import CodeInput from './code-input';
import {
  VerificationCodeContextType,
  VerificationCodeProps,
} from './interface';

import './style/index.less';

export const VerificationCodeContext =
  React.createContext<VerificationCodeContextType>(
    {} as VerificationCodeContextType,
  );

export default function VerificationCode(baseprops: VerificationCodeProps) {
  const { verificationcode } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, verificationcode);
  const {
    prefixCls = 'yee-verification-code',
    value,
    defaultValue,
    disabled,
    length = 4,
    masked,
    separator,
    readOnly,
    className,
    style,
    onChange,
    onFinish,
    ...rest
  } = props;

  const [activeIndex, setActiveIndex] = React.useState(-1);

  const handleState: any = (_value: string | undefined) => {
    if (_value) {
      return Array.from(_value);
    }
    return [];
  };

  const [mergedValue, setMergedValue] = useMergedState<string>('', {
    value,
    defaultValue,
    handleState,
  }) as unknown as [string[], React.Dispatch<string[]>];

  const cls = clsx(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled,
    },
    className,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (disabled) return;
    const newValue = [...mergedValue];
    newValue[index] = e.target.value;
    setMergedValue([...newValue]);
    const strValue = newValue.join('');
    onChange?.(strValue, index);

    if (index === length - 1 && strValue.length === length) {
      onFinish?.(strValue);
    }

    if (e.target.value && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement> & { target: { value: string } },
    index: number,
  ) => {
    if (e.key === 'Backspace') {
      if (!e.target.value && index > 0) {
        setActiveIndex(index - 1);
      }
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    const copy = e.clipboardData.getData('text/plain');
    const arr = Array.from(copy);
    for (let i = index, j = 0; i < length; i++, j++) {
      mergedValue[i] = arr[j];
    }
    setMergedValue([...mergedValue]);
  };

  const getSeparatorItem = (index: number) => {
    if (!separator || index === length - 1) return;
    const sep =
      typeof separator === 'function' ? separator({ index }) : separator;
    if (sep === '' || sep === undefined || sep === null) return;
    return <span className={`${prefixCls}-separator`}>{sep}</span>;
  };

  const renderCodeInput = () => {
    return new Array(length).fill(0).map((_, index) => {
      return (
        <React.Fragment key={index}>
          <CodeInput value={mergedValue[index]} index={index} key={index} />
          {getSeparatorItem(index)}
        </React.Fragment>
      );
    });
  };

  return (
    <div {...rest} className={cls} style={style}>
      <VerificationCodeContext.Provider
        value={{
          prefixCls,
          fullValue: mergedValue,
          masked,
          activeIndex,
          readOnly,
          onChange: handleChange,
          onKeyDown: handleKeyDown,
          onPaste: handlePaste,
        }}
      >
        {renderCodeInput()}
      </VerificationCodeContext.Provider>
    </div>
  );
}
