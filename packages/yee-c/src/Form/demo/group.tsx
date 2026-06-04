import { Button, Form, Grid, Input, message, Select, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    message.success('Submit success!');
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Grid cols={1}>
        <Form.Field.Group label="Username" required cols={2}>
          <Form.Field name="surname">
            <Input placeholder="Surname" />
          </Form.Field>
          <Form.Field name="name">
            <Input placeholder="Name" />
          </Form.Field>
        </Form.Field.Group>

        <Form.Field.Group
          label="Address"
          required
          cols={3}
          rules={[
            {
              validator: (values: unknown) => {
                const v = values as Record<string, string>;
                if (v.city && /[\d]/.test(v.city)) return false;
                if (v.district && /[\d]/.test(v.district)) return false;
                return true;
              },
              message: 'City and district cannot include numbers',
            },
          ]}
        >
          <Form.Field name="country">
            <Select
              placeholder="Country"
              options={[
                { label: 'China', value: 'CN' },
                { label: 'USA', value: 'US' },
                { label: 'Japan', value: 'JP' },
              ]}
            />
          </Form.Field>
          <Form.Field name="city">
            <Input placeholder="City" />
          </Form.Field>
          <Form.Field name="district">
            <Input placeholder="District" />
          </Form.Field>
        </Form.Field.Group>
      </Grid>
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" htmlType="submit">Submit</Button>
        <Button htmlType="reset">Reset</Button>
      </Space>
    </Form>
  );
};
