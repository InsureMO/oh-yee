import { Button, Form, Input, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, unknown>) => {
    console.log('Received values:', values);
    alert('Form values: ' + JSON.stringify(values, null, 2));
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ background: '#fff', padding: 24, borderRadius: 8 }}
    >
      <Form.Field
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please enter username!' }]}
      >
        <Input placeholder="Please enter username" />
      </Form.Field>

      <h4>User List</h4>
      <Form.List name="users" initialValue={[{ name: '', age: '' }]}>
        {(fields, { add, remove, move }) => (
          <>
            {fields.map((field, index) => (
              <Space
                key={field.key}
                align="center"
                style={{ display: 'flex', alignItems: 'end', width: '100%' }}
              >
                <Form.Field
                  name={[field.name, 'name']}
                  label={`Name ${index + 1}`}
                  required
                >
                  <Input placeholder="Name" style={{ width: 150 }} />
                </Form.Field>

                <Form.Field
                  name={[field.name, 'age']}
                  label={`Age ${index + 1}`}
                  required
                  rules={[
                    {
                      type: 'number',
                      min: 0,
                      max: 120,
                      message: 'Age must be between 0-120',
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Age"
                    style={{ width: 100 }}
                  />
                </Form.Field>

                {fields.length > 1 && (
                  <Button onClick={() => remove(field.name)} color="danger">
                    Delete
                  </Button>
                )}

                {index > 0 && (
                  <Button onClick={() => move(index, index - 1)}>
                    Move Up
                  </Button>
                )}

                {index < fields.length - 1 && (
                  <Button onClick={() => move(index, index + 1)}>
                    Move Down
                  </Button>
                )}
              </Space>
            ))}
            <Space style={{ marginTop: 16 }}>
              <Button
                onClick={() => {
                  add({ name: '', age: '' });
                }}
              >
                Add User
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </>
        )}
      </Form.List>
    </Form>
  );
};
