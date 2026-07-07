import clsx from 'clsx';
import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Config-Provider';
import useEvent from '../hooks/useEvent';
import mergeContextToProps from '../utils/mergeContextToProps';
import FieldContext from './FieldContext';
import FormContext from './FormContext';
import useForm from './hooks/useForm';
import type { FormProps } from './interface';

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
    ...rest
  } = props;

  const cls = clsx(prefixCls, `${prefixCls}-${layout}`, className);

  const [formInstance] = useForm(form);

  const _onFinish = useEvent(onFinish);
  const _onFinishFailed = useEvent(onFinishFailed);
  const _onValuesChange = useEvent(onValuesChange);
  const _onValuesBeforeChange = useEvent(onValuesBeforeChange);
  const _onReset = useEvent(onReset);

  useEffect(() => {
    formInstance.initialize({
      initialValues,
      callbacks: {
        onFinish: _onFinish,
        onFinishFailed: _onFinishFailed,
        onValuesChange: _onValuesChange,
        onValuesBeforeChange: _onValuesBeforeChange,
        onReset: _onReset,
      },
    });
  }, []); // 空依赖数组，确保只执行一次

  return (
    <form
      {...rest}
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
