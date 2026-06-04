import { Button, Form, Grid, Input, Select, Space, Switch } from '@oh/yee-c';
import React from 'react';

const UserTypeFields = () => {

  // 无需第二个表单实例参数，由Form组件内部context提供
  const type = Form.useWatch<string>('type');

  return (
    <>
      {type === 'enterprise' && (
        <Form.Field name="company" label="Company" required>
          <Input placeholder="Company name" />
        </Form.Field>
      )}
      {type === 'personal' && (
        <>
          <Form.Field name="age" label="Age">
            <Input placeholder="Age" />
          </Form.Field>
          <Form.Field name="job" label="Job">
            <Input placeholder="Job title" />
          </Form.Field>
        </>
      )}
    </>
  );
};

export default () => {
  const [form] = Form.useForm();

  // 因为该组件没有被Form表单包裹，所以无法使用Form组件内部的表单实例，因此需要在第二个参数传入form实例
  const notify = Form.useWatch<boolean>('notify', form);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Grid cols={1}>
        <Form.Field name="name" label="Name" required>
          <Input placeholder="Please input your name" />
        </Form.Field>

        <Form.Field name="type" label="User Type" initialValue="personal">
          <Select
            options={[
              { label: 'Personal', value: 'personal' },
              { label: 'Enterprise', value: 'enterprise' },
            ]}
          />
        </Form.Field>

        <UserTypeFields />

        <Form.Field name="notify" label="Enable notifications" initialValue={false} valuePropName='checked'>
          <Switch />
        </Form.Field>

        {notify && (
          <Form.Field name="email" label="Email">
            <Input.Email placeholder="Notification email" />
          </Form.Field>
        )}

      </Grid>

      <Space style={{ marginTop: 16 }}>
        <Button type="primary" htmlType="submit">Submit</Button>
        <Button htmlType="reset">Reset</Button>
      </Space>
    </Form>
  );
};
