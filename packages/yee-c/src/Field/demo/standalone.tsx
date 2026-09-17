import { Field, Input, TextArea } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [name, setName] = useState('');
  const [remark, setRemark] = useState('');

  return (
    <div style={{ maxWidth: 400 }}>
      <Field label="Name" required>
        <Input
          value={name}
          onChange={(v: string) => setName(v)}
          placeholder="Standalone controlled Input"
        />
      </Field>
      <Field label="Remark">
        <TextArea
          value={remark}
          onChange={(v: string) => setRemark(v)}
          placeholder="Standalone controlled TextArea"
          rows={3}
        />
      </Field>
      <Field>
        <Input placeholder="Field without label" />
      </Field>
    </div>
  );
};
