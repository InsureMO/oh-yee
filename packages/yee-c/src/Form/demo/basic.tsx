import { Button, DatePicker, Form, Grid, Input, Select, Space, TextArea } from '@oh/yee-c';
import React, { useEffect } from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  const [state, setState] = React.useState({});

  useEffect(() => {
    setTimeout(() => {
      form.setFieldsValue({
        address: [
          {
            one: '123 Main St',
          },
        ],
      })
    }, 2000);
    
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      data-testid="basic-form"
      onValuesChange={(field) => {
        setState(field);
      }}
    >
      <Grid>
        <Grid.Item>
          <Form.Field
            name="username"
            label="Username"
            rules={[
              { required: true, message: 'Please input your username!', validateTrigger: ['onChange', 'onSubmit'] },
              {
                validateTrigger: 'onBlur',
                validator: (value: unknown) => {
                  console.log('Validating username:', value);
                  if (typeof value === 'string' && value.length < 5) {
                    return false;
                  }
                  return true;
                },
                message: 'Username must be at least 5 characters long',
              }
            ]}
          >
            <Input placeholder="Please input your username"/>
          </Form.Field>
        </Grid.Item>

        <Grid.Item>
          <Form.Field
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                minLength: 10,
                validateTrigger: 'onBlur',
                message: 'Password length must be longer than 10',
              },
            ]}
          >
            <Input.Password placeholder="Please input your password" />
          </Form.Field>
        </Grid.Item>
        <Grid.Item>
          <Form.Field name="gender" label="Gender" initialValue="male">
            <Select
              options={[
                { label: 'male', value: 'male' },
              { label: 'female', value: 'female' },
              { label: 'other', value: 'other' },
              ]}
            />
          </Form.Field>
        </Grid.Item>

        <Grid.Item>
          <Form.Field name="birthday" label="Birthday">
            <DatePicker />
          </Form.Field>
        </Grid.Item>

        <Grid.Item>
          <Form.Field name={["address", 0, "one"]} label="Address" initialValue={"zzz"}>
            <TextArea />
          </Form.Field>
        </Grid.Item>
      </Grid>
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" htmlType="submit" data-testid="submit-btn">
          Submit
        </Button>
        <Button
          htmlType="reset"
          data-testid="reset-btn"
        >
          Reset
        </Button>
      </Space>
    </Form>
  );
};
