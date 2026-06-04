import { Field, Input, TextArea, useVirtualForm } from '@oh/yee-c';
import React, { useEffect } from 'react';

export default () => {
  const { createForm } = useVirtualForm();

  useEffect(() => {
    createForm('basicForm');
  }, []);

  return (
    <div style={{ maxWidth: 400 }}>
      <Field formName="basicForm" name="username" label="用户名">
        <Input placeholder="请输入用户名" />
      </Field>
      <Field formName="basicForm" name="email" label="邮箱">
        <Input placeholder="请输入邮箱" />
      </Field>
      <Field formName="basicForm" name="remark" label="备注">
        <TextArea placeholder="请输入备注" rows={3} />
      </Field>
    </div>
  );
};
