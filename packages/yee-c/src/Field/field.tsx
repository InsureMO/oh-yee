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

  const { form } = useVirtualField(formName ?? '', name ?? '', {
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
    const childProps = (children as React.ReactElement<any>).props;

    // Pure layout mode (no form): children keep their own value/onChange.
    // Only a Field-level disabled is merged down.
    // Pure layout mode (no form or no field name): children keep their own
    // value/onChange. Only a Field-level disabled is merged down.
    if (!form || name === undefined) {
      if (disabled === undefined) return children;
      return React.cloneElement(children as React.ReactElement<any>, {
        disabled: disabled || childProps.disabled,
      });
    }

    const mergedDisabled = disabled || childProps.disabled;
    const fieldName = name;

    const attr = {
      value: getFieldValue?.(fieldName),
      name: formName,
      id: fieldName,
      disabled: mergedDisabled,
      onChange: (value: unknown, ...rest: Array<unknown>) => {
        const callbacks = getCallbacks?.();
        let _value = value;
        const fieldsValue = getFieldsValue?.();
        const feedback = callbacks?.onValuesBeforeChange?.(
          { [fieldName]: _value },
          fieldsValue,
        );

        if (feedback !== undefined) {
          _value = feedback;
        }

        setFieldsValue?.({ [fieldName]: _value }, 'onChange');

        // Call child component's onChange
        if ((children.props as any)?.onChange) {
          (children.props as any).onChange(_value, ...rest);
        }

        callbacks?.['onValuesChange']?.({ [fieldName]: _value }, fieldsValue);

        forceUpdate();
      },
      onBlur: (event: unknown) => {
        // Fire-and-forget async validation; store notifies onStoreChange on completion.
        void validateField?.(fieldName, 'onBlur');

        // Call child component's onBlur
        if ((children.props as any).onBlur) {
          (children.props as any).onBlur(event);
        }
      },
    };

    return React.cloneElement(children, attr);
  };

  const validate =
    name !== undefined ? getFieldValidate?.(name) : undefined;

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
      {label ? (
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
      ) : null}
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
