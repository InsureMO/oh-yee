import { Button, Form, Grid, Input, Radio, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  return (
    <div>
      <Radio.Group
        defaultValue="vertical"
        onChange={(value) => {
          form.setFieldsValue({ layout: value });
        }}
        options={[
          { value: 'vertical', label: 'Vertical' },
          { value: 'horizontal', label: 'Horizontal' },
        ]}
      >
      </Radio.Group>

      <br />
      <br />

      <Form
        form={form}
        initialValues={{ layout: 'vertical' }}
        layout="vertical"
      >
        <Grid cols={1}>
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
