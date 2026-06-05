import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import React, { FC, useReducer } from 'react';
import { FormStore } from '../Form/form-store';
import useVirtualField from './hooks/useVirtualField';
import type { FieldProps } from './interface';
import './style/index.less';

// Default value constants
const DEFAULT_ANIMATION_DURATION = 0.16;

const Field: FC<FieldProps> = (props) => {
  const {
    prefixCls = 'yee-field',
    className,
    style,
    classNames,
    styles,
    label,
    name,
    formName,
    children,
    rules,
    required,
    layout = 'vertical',
    disabled,
  } = props;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const { form } = useVirtualField(formName, name, {
    props,
    onStoreChange: forceUpdate,
  });

  const {
    getFieldsValue,
    getFieldValue,
    getCallbacks,
    setFieldsValue,
    validateField,
    getFieldValidate,
  } = form ?? ({} as Partial<FormStore>);

  const isRequired = () => {
    return (
      (Array.isArray(rules) && rules.some((rule) => rule.required)) || required
    );
  };

  const getControlled = (children: React.ReactElement) => {
    const mergedDisabled =
      disabled || (children as React.ReactElement<any>).props.disabled;

    const attr = {
      value: getFieldValue?.(name),
      name: formName,
      id: name,
      disabled: mergedDisabled,
      onChange: (value: unknown, ...rest: Array<unknown>) => {
        const callbacks = getCallbacks?.();
        let _value = value;
        const fieldsValue = getFieldsValue?.();
        const feedback = callbacks?.onValuesBeforeChange?.(
          { [name]: _value },
          fieldsValue,
        );

        if (feedback !== undefined) {
          _value = feedback;
        }

        setFieldsValue?.({ [name]: _value }, 'onChange');

        // Call child component's onChange
        if ((children.props as any)?.onChange) {
          (children.props as any).onChange(_value, ...rest);
        }

        callbacks?.['onValuesChange']?.({ [name]: _value }, fieldsValue);

        forceUpdate();
      },
      onBlur: (event: unknown) => {
        validateField?.(name, 'onBlur');

        // Call child component's onBlur
        if ((children.props as any).onBlur) {
          (children.props as any).onBlur(event);
        }
      },
    };

    return React.cloneElement(children, attr);
  };

  const validate = getFieldValidate?.(name);

  return (
    <div
      className={clsx(
        `${prefixCls}`,
        `${prefixCls}-${layout}`,
        {
          [`${prefixCls}-${validate?.status}`]: validate?.status,
        },
        className,
      )}
      style={style}
    >
      <label
        className={clsx(
          `${prefixCls}-label`,
          {
            [`${prefixCls}-required`]: isRequired(),
          },
          classNames?.label,
        )}
        style={styles?.label}
      >
        {label}
      </label>
      <div
        className={clsx(`${prefixCls}-content`, classNames?.content)}
        style={styles?.content}
      >
        <div
          className={clsx(`${prefixCls}-children`, classNames?.children)}
          style={styles?.children}
        >
          {getControlled(children)}
        </div>
        <AnimatePresence>
          {validate && (
            <motion.small
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: DEFAULT_ANIMATION_DURATION }}
              className={clsx(
                `${prefixCls}-${validate.status}-message`,
                classNames?.message,
              )}
              style={styles?.message}
            >
              {validate.message}
            </motion.small>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Field;
