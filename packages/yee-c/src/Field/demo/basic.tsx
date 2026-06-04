import { Field, Input, TextArea, useVirtualForm } from '@oh/yee-c';
import React, { useEffect } from 'react';

export default () => {
  const { createForm } = useVirtualForm();

  useEffect(() => {
    createForm('basicForm');
  }, []);

  return (
    <div style={{ maxWidth: 400 }}>
      <Field formName="basicForm" name="username" label="Username">
        <Input placeholder="Please enter username" />
      </Field>
      <Field formName="basicForm" name="email" label="Email">
        <Input placeholder="Please enter email" />
      </Field>
      <Field formName="basicForm" name="remark" label="Remark">
        <TextArea placeholder="Please enter remark" rows={3} />
      </Field>
    </div>
  );
};
