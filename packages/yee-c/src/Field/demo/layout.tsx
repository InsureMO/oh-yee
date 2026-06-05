import { Field, Input, Select, useVirtualForm } from '@rainbow-oh/yee-c';
import React, { useEffect } from 'react';

export default () => {
  const { createForm } = useVirtualForm();

  useEffect(() => {
    createForm('layoutForm');
  }, []);

  return (
    <div
      style={{
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Field
        formName="layoutForm"
        name="vertical"
        label="Vertical Layout (Default)"
      >
        <Input placeholder="Label on top, input below" />
      </Field>
      <Field
        formName="layoutForm"
        name="horizontal"
        label="Horizontal Layout"
        layout="horizontal"
      >
        <Input placeholder="Label on left, input on right" />
      </Field>
      <Field
        formName="layoutForm"
        name="style"
        label="Custom Style"
        style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}
        styles={{ label: { color: '#1677ff', fontWeight: 600 } }}
      >
        <Input placeholder="Custom container and label styles" />
      </Field>
      <Field
        formName="layoutForm"
        name="semantic"
        label="Semantic Styles"
        classNames={{ label: 'custom-label', content: 'custom-content' }}
      >
        <Select
          options={[]}
          placeholder="Customize class names via classNames"
        />
      </Field>
    </div>
  );
};
