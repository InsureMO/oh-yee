import clsx from 'clsx';
import React, { ChangeEvent, createContext, useContext, useId } from 'react';
import { GlobalContext } from '../Config-Provider';
import useMergedState from '../hooks/useMergedState';
import mergeContextToProps from '../utils/mergeContextToProps';
import { RadioGroupProps } from './interface';
import Radio from './radio';

export const GroupCtx = createContext<{
  name?: string;
  buttonStyle?: 'solid' | 'outline' | 'cornermark';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}>({});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (baseprops, ref) => {
    const { radiogroup } = useContext(GlobalContext);
    const props = mergeContextToProps<RadioGroupProps>(baseprops, radiogroup);

    const uid = useId();

    const {
      prefixCls = 'yee-radio-group',
      className,
      name = uid,
      value,
      defaultValue,
      options,
      buttonStyle,
      disabled,
      size,
      onChange,
      ...rest
    } = props;

    const [mergedValue, setMergedValue] = useMergedState('', {
      value,
      defaultValue,
    });

    const cls = clsx(
      prefixCls,
      {
        [`${prefixCls}-${buttonStyle}`]: buttonStyle,
        [`${prefixCls}-${size}`]: size,
      },
      className,
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setMergedValue(event.target.value);
      onChange?.(event.target.value, event);
    };

    return (
      <div className={cls} ref={ref} role="radiogroup">
        <GroupCtx.Provider
          value={{ name, buttonStyle, onChange: handleChange }}
        >
          {options?.map((option, index) => (
            <Radio
              disabled={disabled}
              {...rest}
              {...option}
              checked={option.value == mergedValue}
              key={option.value || index}
            />
          ))}
        </GroupCtx.Provider>
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
