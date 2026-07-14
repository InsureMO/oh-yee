import { Button, Form, Grid, Input, Radio, Space } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');

  return (
    <div>
      <Radio.Group
        value={layout}
        onChange={(value) => setLayout(value as 'vertical' | 'horizontal')}
        options={[
          { value: 'vertical', label: 'Vertical' },
          { value: 'horizontal', label: 'Horizontal' },
        ]}
      />

      <br />
      <br />

      <Form form={form} initialValues={{}} layout={layout}>
        <Grid cols={2}>
          <Form.Field name="name" label="Name" required>
            <Input placeholder="Please input your name" />
          </Form.Field>

          <Form.Field name="email" label="Email" required>
            <Input placeholder="Please input your email" />
          </Form.Field>

          <Form.Field name="phone" label="Phone">
            <Input placeholder="Please input your phone" />
          </Form.Field>
        </Grid>
        <Space style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form>
    </div>
  );
};
