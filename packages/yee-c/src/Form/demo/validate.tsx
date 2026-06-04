import { Button, Form, Input, Space, Grid } from '@oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Grid>
        <Form.Field
          name="username"
          label="Username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 3, message: 'Username must be at least 3 characters!' },
            { max: 12, message: 'Username must be at most 12 characters!' },
          ]}
        >
          <Input placeholder="Please input your username" />
        </Form.Field>

        <Form.Field
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Please input your email" />
        </Form.Field>

        <Form.Field
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input your password!' },
            {
              min: 6,
              message: 'Password must be at least 6 characters!',
            },
          ]}
        >
          <Input.Password placeholder="Please input your password" />
        </Form.Field>
      </Grid>

      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button
          htmlType='reset'
        >
          Reset
        </Button>
      </Space>
    </Form>
  );
};
