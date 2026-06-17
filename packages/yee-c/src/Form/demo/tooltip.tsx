import {
  Button,
  Form,
  Grid,
  Input,
  Space,
  TextArea,
} from '@rainbow-oh/yee-c';
import { Info } from 'lucide-react';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Received values:', values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      data-testid="tooltip-form"
    >
      <Grid>
        <Grid.Item>
          <Form.Field
            name="username"
            label="Username"
            tooltip="Used for login. 4-20 characters."
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}
          >
            <Input placeholder="Please input your username" />
          </Form.Field>
        </Grid.Item>

        <Grid.Item>
          <Form.Field
            name="nickname"
            label="Nickname"
            // Custom trigger icon via the object form
            tooltip={{
              title: 'Shown publicly instead of your username.',
              icon: <Info size={14} />,
            }}
          >
            <Input placeholder="Please input your nickname" />
          </Form.Field>
        </Grid.Item>

        <Grid.Item>
          <Form.Field
            name="bio"
            label="Bio"
            tooltip="A short introduction about yourself."
          >
            <TextArea />
          </Form.Field>
        </Grid.Item>
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
