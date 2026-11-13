import clsx from 'clsx';
import React, { useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../Config-Provider';
import useEvent from '../hooks/useEvent';
import mergeContextToProps from '../utils/mergeContextToProps';
import FieldContext from './FieldContext';
import FormContext from './FormContext';
import useForm from './hooks/useForm';
import type { FormProps, ValidateMessage } from './interface';
import { scrollToFieldByName } from './utils/scroll';

import './style/index.less';

const Form: React.FC<FormProps> = (baseprops) => {
  const { form: _form } = useContext(GlobalContext);
  const props = mergeContextToProps(baseprops, _form);
  const {
    prefixCls = 'yee-form',
    className,
    children,
    initialValues,
    form,
    disabled,
    name,
    layout = 'vertical',
    onFinish,
    onFinishFailed,
    onValuesChange,
    onValuesBeforeChange,
    onReset,
    scrollToFirstError,
    ...rest
  } = props;

  const cls = clsx(prefixCls, `${prefixCls}-${layout}`, className);

  const [formInstance] = useForm(form);

  const rootRef = useRef<HTMLFormElement | null>(null);

  const _onFinish = useEvent(onFinish);
  const _onFinishFailed = useEvent(onFinishFailed);
  const _onValuesChange = useEvent(onValuesChange);
  const _onValuesBeforeChange = useEvent(onValuesBeforeChange);
  const _onReset = useEvent(onReset);

  // user's onFinishFailed runs first, then the first error
  // field is scrolled into view.
  const onInternalFinishFailed = useEvent((errors: ValidateMessage[]) => {
    _onFinishFailed?.(errors);
    if (scrollToFirstError && errors.length > 0) {
      scrollToFieldByName(
        rootRef.current,
        errors[0].name,
        typeof scrollToFirstError === 'object' ? scrollToFirstError : undefined,
      );
    }
  });

  useEffect(() => {
    formInstance.initialize({
      initialValues,
      callbacks: {
        onFinish: _onFinish,
        onFinishFailed: onInternalFinishFailed,
        onValuesChange: _onValuesChange,
        onValuesBeforeChange: _onValuesBeforeChange,
        onReset: _onReset,
      },
    });
  }, []); // 空依赖数组，确保只执行一次

  return (
    <form
      {...rest}
      ref={rootRef}
      className={cls}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void formInstance.submit();
      }}
      onReset={(e) => {
        e.preventDefault();
        e.stopPropagation();
        formInstance.resetFields();
      }}
      autoComplete="off"
    >
      <FormContext.Provider value={{ prefixCls, name, disabled }}>
        <FieldContext.Provider value={formInstance}>
          {children}
        </FieldContext.Provider>
      </FormContext.Provider>
    </form>
  );
};

export default Form;
