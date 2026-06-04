import { Field, Input, Select } from '@oh/yee-c';
import React, { useEffect } from 'react';
import { useVirtualForm } from '@oh/yee-c';

export default () => {
  const { createForm } = useVirtualForm();

  useEffect(() => {
    createForm('layoutForm');
  }, []);

  return (
    <div style={{ maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Field formName="layoutForm" name="vertical" label="垂直布局（默认）">
        <Input placeholder="label 在上，input 在下" />
      </Field>
      <Field formName="layoutForm" name="horizontal" label="水平布局" layout="horizontal">
        <Input placeholder="label 在左，input 在右" />
      </Field>
      <Field formName="layoutForm" name="style" label="自定义样式"
        style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}
        styles={{ label: { color: '#1677ff', fontWeight: 600 } }}
      >
        <Input placeholder="自定义容器和标签样式" />
      </Field>
      <Field formName="layoutForm" name="semantic" label="语义化样式"
        classNames={{ label: 'custom-label', content: 'custom-content' }}
      >
        <Select placeholder="通过 classNames 定制各部分类名" />
      </Field>
    </div>
  );
};
