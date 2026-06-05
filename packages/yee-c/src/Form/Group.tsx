import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import React, {
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import Grid from '../Grid';
import FieldContext from './FieldContext';
import FormContext from './FormContext';
import type { FieldGroupProps, NamePath, ValidateMessage } from './interface';

const Group: React.FC<FieldGroupProps> = (props) => {
  const { label, required, rules, cols, children, style, className } = props;
  const formInstance = useContext(FieldContext);
  const { prefixCls } = useContext(FormContext);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const reactId = useId();
  const groupId = useRef(`__group__${reactId}`).current;

  // Extract child Field names
  const childNames = useMemo(() => {
    return React.Children.toArray(children)
      .filter(
        (child): child is React.ReactElement<{ name?: NamePath }> =>
          React.isValidElement<{ name?: NamePath }>(child) &&
          child.props.name !== undefined,
      )
      .map((child) => child.props.name as string);
  }, [children]);

  // touched: whether any child field has been interacted with
  const touchedRef = useRef(false);
  const [, forceValidate] = useReducer((x) => x + 1, 0); // eslint-disable-line @typescript-eslint/no-unused-vars

  // Group validation
  const validate = (force: boolean): ValidateMessage[] => {
    if (!required && (!rules || rules.length === 0)) return [];

    // Skip if not touched and not forced validation
    if (!force && !touchedRef.current) return [];

    const values: Record<string, any> = {};
    childNames.forEach((name) => {
      values[name] = formInstance.getFieldValue(name);
    });

    const errors: ValidateMessage[] = [];

    // Required validation: error if any child field is empty
    if (required) {
      const hasEmpty = childNames.some(
        (name) => !values[name] && values[name] !== 0,
      );
      if (hasEmpty) {
        errors.push({
          name: childNames,
          status: 'error',
          value: values,
          message: `${label || ''} is required`,
        });
      }
    }

    // Custom rules validation
    if (rules) {
      rules.forEach((rule) => {
        if (rule.validator) {
          const passed = rule.validator(values);
          if (!passed) {
            errors.push({
              name: childNames,
              status: 'error',
              value: values,
              message: rule.message,
            });
          }
        }
      });
    }

    return errors;
  };

  // Validation result state
  const [errors, setErrors] = useReducer(
    (prev: ValidateMessage[], next: ValidateMessage[]) => next,
    [],
  );

  const runValidation = () => {
    const result = validate(false);
    setErrors(result);
  };

  // Subscribe to child field changes
  useEffect(() => {
    const unsubscribes = childNames.map((name) =>
      formInstance.subscribe(name, () => {
        touchedRef.current = true;
        runValidation();
      }),
    );
    return () => unsubscribes.forEach((fn) => fn());
  }, [childNames, formInstance]);

  // Register group validator to FormStore
  useEffect(() => {
    const unregister = formInstance.registerGroupEntity(groupId, {
      validate: (force) => {
        const result = validate(force);
        setErrors(result);
        forceUpdate();
        return result;
      },
      reset: () => {
        touchedRef.current = false;
        setErrors([]);
      },
    });
    return unregister;
  }, [groupId, childNames, rules]);

  const hasError = errors.length > 0;
  const itemCls = `${prefixCls}-item`;

  const content = cols ? <Grid cols={cols}>{children}</Grid> : children;

  return (
    <div
      className={clsx(itemCls, className, {
        [`${itemCls}-${errors[0]?.status}`]: hasError,
      })}
      style={style}
    >
      <div className={`${itemCls}-row`}>
        {label && (
          <label
            className={clsx(`${itemCls}-label`, {
              [`${itemCls}-required`]: required,
            })}
          >
            {label}
          </label>
        )}
        <div className={`${itemCls}-control`}>{content}</div>
      </div>
      <AnimatePresence>
        {hasError && (
          <motion.small
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16 }}
            className={clsx(`${itemCls}-additional`, {
              [`${itemCls}-additional-${errors[0].status}`]: errors[0].status,
            })}
          >
            {errors[0].message}
          </motion.small>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Group;
