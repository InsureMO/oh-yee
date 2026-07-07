import { Button, Form, Grid, Input, Space } from '@rainbow-oh/yee-c';
import React from 'react';

// Simulate an async uniqueness check against a backend API.
const TAKEN_USERNAMES = new Set(['admin', 'root', 'test']);
function checkUsernameUnique(username: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(!TAKEN_USERNAMES.has(username)), 600);
  });
}

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Grid>
        <Form.Field
          name="username"
          label="Username"
          rules={[
            { required: true, message: 'Please input your username!' },
            {
              // Async validator: resolve to pass, throw / reject to fail.
              // The thrown Error's message overrides rule.message.
              validator: async (value) => {
                const isUnique = await checkUsernameUnique(String(value));
                if (!isUnique) {
                  throw new Error('This username is already taken');
                }
              },
              // Validate on blur so we don't hit the "API" on every keystroke.
              validateTrigger: 'onBlur',
            },
          ]}
        >
          <Input placeholder="Try admin / root / test (already taken)" />
        </Form.Field>

        <Form.Field
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {
              regexp: /^[\w.+-]+@[\w-]+\.[\w.-]+$/,
              message: 'Please enter a valid email!',
            },
          ]}
        >
          <Input placeholder="Please input your email" />
        </Form.Field>
      </Grid>

      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="reset">Reset</Button>
      </Space>
    </Form>
  );
};
