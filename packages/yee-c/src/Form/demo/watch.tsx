import {
  Button,
  Form,
  Grid,
  Input,
  Select,
  Space,
  Switch,
} from '@rainbow-oh/yee-c';
import React from 'react';

const UserTypeFields = () => {
  // No second form instance parameter needed, provided by Form component's internal context
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

  // Since this component is not wrapped by Form, the internal form instance is not available, so pass the form instance as the second parameter
  const notify = Form.useWatch<boolean>('notify', form);

  const onFinish = (values: Record<string, unknown>) => {
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

        <Form.Field
          name="notify"
          label="Enable notifications"
          initialValue={false}
          valuePropName="checked"
        >
          <Switch />
        </Form.Field>

        {notify && (
          <Form.Field name="email" label="Email">
            <Input.Email placeholder="Notification email" />
          </Form.Field>
        )}
      </Grid>

      <Space style={{ marginTop: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="reset">Reset</Button>
      </Space>
    </Form>
  );
};
