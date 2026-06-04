import { Field, Input, useVirtualForm, Button } from '@oh/yee-c';
import React, { useLayoutEffect } from 'react';

export default () => {
  const { createForm, getForm } = useVirtualForm();

  useLayoutEffect(() => {
    createForm('validationForm');
  }, []);

  const handleSubmit = () => {
    const form = getForm('validationForm');
    console.log("form: ", form);
    const errors = form?.submit();
    console.log("errors: ", errors);
    if (errors && errors.length === 0) {
      console.log('提交成功:', form?.getFieldsValue());
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Field
        formName="validationForm"
        name="username"
        label="用户名"
        required
        rules={[
          { required: true, message: '用户名不能为空' },
          { minLength: 3, message: '用户名至少3个字符' },
        ]}
      >
        <Input placeholder="请输入用户名" />
      </Field>
      <Field
        formName="validationForm"
        name="phone"
        label="手机号"
        rules={[
          { regexp: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
        ]}
      >
        <Input placeholder="请输入手机号" />
      </Field>
      <Field
        formName="validationForm"
        name="age"
        label="年龄"
        rules={[
          { validator: (v) => Number(v) >= 18, message: '年龄必须满18岁' },
        ]}
      >
        <Input placeholder="请输入年龄" />
      </Field>
      <Field
        formName="validationForm"
        name="code"
        label="验证码"
        rules={[
          { minLength: 6, maxLength: 6, message: '验证码为6位', validateTrigger: 'onBlur' },
        ]}
      >
        <Input placeholder="仅失焦时校验" />
      </Field>
      <Button type="primary" onClick={handleSubmit}>提交</Button>
    </div>
  );
};
