import { Field, Input, useVirtualForm } from '@rainbow-oh/yee-c';
import React, { useEffect } from 'react';

export default () => {
  const { createForm } = useVirtualForm();

  useEffect(() => {
    createForm('disabledForm');
  }, []);

  return (
    <div style={{ maxWidth: 400 }}>
      <Field formName="disabledForm" name="readonly" label="Readonly Field">
        <Input value="Non-editable content" readOnly />
      </Field>
      <Field
        formName="disabledForm"
        name="disabled"
        label="Disabled Field"
        disabled
      >
        <Input placeholder="Entire Field is disabled" />
      </Field>
      <Field formName="disabledForm" name="normal" label="Normal Field">
        <Input placeholder="Normal input" />
      </Field>
    </div>
  );
};
