import { Field, Input, useVirtualForm } from '@oh/yee-c';
import React, { useEffect } from 'react';

export default () => {
  const { createForm } = useVirtualForm();

  useEffect(() => {
    createForm('disabledForm');
  }, []);

  return (
    <div style={{ maxWidth: 400 }}>
      <Field formName="disabledForm" name="readonly" label="只读字段">
        <Input value="不可编辑的内容" readOnly />
      </Field>
      <Field formName="disabledForm" name="disabled" label="禁用字段" disabled>
        <Input placeholder="整个 Field 被禁用" />
      </Field>
      <Field formName="disabledForm" name="normal" label="正常字段">
        <Input placeholder="可正常输入" />
      </Field>
    </div>
  );
};
