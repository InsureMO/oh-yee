import clsx from 'clsx';
import { HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext, useLayoutEffect, useMemo, useReducer } from 'react';
import Tooltip from '../Tooltip';
import FieldContext from './FieldContext';
import FormContext from './FormContext';
import { ListNameContext } from './List';
import type {
  FieldConfigurableTooltip,
  FieldProps,
  InternalNamePath,
  NamePath,
} from './interface';

// Helper function: convert NamePath to InternalNamePath
function getNamePath(path: NamePath): InternalNamePath {
  if (path === undefined || path === null) return [];
  if (Array.isArray(path)) return path.map(String);
  return [String(path)];
}

// Helper function: convert InternalNamePath to string
function stringifyPath(path: InternalNamePath): string {
  return path.join('.');
}

const Field: React.FC<FieldProps> = (props) => {
  const {
    style,
    className,
    styles,
    classNames,
    children,
    name,
    rules,
    label,
    tooltip,
    required,
    disabled,
    valuePropName = 'value',
    layout = 'vertical',
    formatter,
  } = props;
  const {
    getCallbacks,
    getFieldValidate,
    getFieldValue,
    getFieldsValue,
    setFieldsValue,
    registerFieldEntities,
    validateField,
  } = useContext(FieldContext);

  const {
    prefixCls,
    disabled: formDisabled,
    name: formName,
  } = useContext(FormContext);

  // Get current List's prefixName (if any)
  const listPrefixName = useContext(ListNameContext) || [];

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  // Build full field path
  const fullFieldNamePath = useMemo(() => {
    const namePath = getNamePath(name);
    return [...listPrefixName, ...namePath];
  }, [name, listPrefixName]);

  // Normalize field name (used for store lookup)
  const normalizedName = useMemo(() => {
    return stringifyPath(fullFieldNamePath);
  }, [fullFieldNamePath]);

  useLayoutEffect(() => {
    const unregister = registerFieldEntities?.({
      props: { ...props, name: normalizedName },
      onStoreChange: forceUpdate,
    });
    return unregister;
  }, [normalizedName, registerFieldEntities]);

  const isRequired = () => {
    return (
      (Array.isArray(rules) && rules.find((rule) => rule.required)) || required
    );
  };

  const validate = getFieldValidate?.(normalizedName);

  // Normalize tooltip into { icon, ...tooltipProps }, or null when not provided.
  // Everything except `icon` is forwarded to <Tooltip>, so any Tooltip prop
  // (title, color, placement, ...) is supported automatically.
  const tooltipConfig = useMemo<{
    icon: React.ReactNode;
    tooltipProps: Omit<FieldConfigurableTooltip, 'icon'>;
  } | null>(() => {
    if (tooltip === undefined || tooltip === null || tooltip === false)
      return null;
    if (
      typeof tooltip === 'object' &&
      !React.isValidElement(tooltip) &&
      'title' in (tooltip as object)
    ) {
      const { icon, ...rest } = tooltip as FieldConfigurableTooltip;
      return { icon: icon ?? <HelpCircle size={14} />, tooltipProps: rest };
    }
    return {
      icon: <HelpCircle size={14} />,
      tooltipProps: { title: tooltip as React.ReactNode },
    };
  }, [tooltip]);

  const getControlled = (children: React.ReactElement) => {
    const props = children.props as any;
    const _value = getFieldValue?.(normalizedName) ?? undefined;
    const value = formatter ? formatter(_value) : _value;
    return {
      ...(valuePropName === 'value' ? { value } : { [valuePropName]: value }),
      name: normalizedName,
      formName: formName,
      id: normalizedName,
      'data-testid': props['data-testid'] ?? normalizedName,
      disabled: disabled ?? formDisabled ?? props.disabled,
      onChange: (value: unknown, ...rest: Array<unknown>) => {
        const callbacks = getCallbacks?.();
        let _value = value;
        const fieldsValue = getFieldsValue?.();
        const feedback = callbacks?.onValuesBeforeChange?.(
          { [normalizedName]: _value },
          fieldsValue,
        );
        if (feedback !== undefined) {
          _value = feedback;
        }
        setFieldsValue?.({ [normalizedName]: _value }, 'onChange');
        props?.onChange?.(_value, ...rest);
      },
      onBlur: (event: unknown) => {
        const err = validateField?.(normalizedName, 'onBlur');
        if (err.length) {
          forceUpdate();
        }
        props?.onBlur?.(event);
      },
    };
  };
  return (
    <div
      className={clsx(
        `${prefixCls}-item`,
        `${prefixCls}-item-${layout}`,
        {
          [`${prefixCls}-item-${validate?.status}`]:
            validate && validate.status,
        },
        className,
      )}
      style={style}
    >
      <div className={clsx(`${prefixCls}-item-row`)}>
        {label || tooltipConfig ? (
          <label
            htmlFor={normalizedName}
            className={clsx(
              `${prefixCls}-item-label`,
              {
                [`${prefixCls}-item-required`]: isRequired(),
              },
              classNames?.label,
            )}
            style={styles?.label}
          >
            {label}
            {isRequired() ? (
              <span className={`${prefixCls}-item-required-mark`}>*</span>
            ) : null}
            {tooltipConfig ? (
              <Tooltip {...tooltipConfig.tooltipProps}>
                <span className={`${prefixCls}-item-tooltip-icon`}>
                  {tooltipConfig.icon}
                </span>
              </Tooltip>
            ) : null}
          </label>
        ) : null}
        <div
          className={clsx(`${prefixCls}-item-control`, classNames?.control)}
          style={styles?.control}
        >
          {React.isValidElement(children) ? (
            React.cloneElement(
              children as React.ReactElement,
              getControlled(children),
            )
          ) : (
            <span>{children}</span>
          )}
        </div>
      </div>
      <AnimatePresence>
        {validate && (
          <motion.small
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16 }}
            className={clsx(`${prefixCls}-item-additional`, {
              [`${prefixCls}-item-additional-${validate.status}`]:
                validate.status,
            })}
          >
            {validate.message}
          </motion.small>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Field;
