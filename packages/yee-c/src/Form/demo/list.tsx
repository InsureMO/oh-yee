import { Button, Form, Input, Space } from '@oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
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
        label="用户名"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Field>

      <h4>用户列表</h4>
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
                  label={`姓名 ${index + 1}`}
                  required
                >
                  <Input placeholder="姓名" style={{ width: 150 }} />
                </Form.Field>

                <Form.Field
                  name={[field.name, 'age']}
                  label={`年龄 ${index + 1}`}
                  required
                  rules={[
                    { type: 'number', min: 0, max: 120, message: '年龄必须在 0-120 之间' },
                  ]}
                >
                  <Input type="number" placeholder="年龄" style={{ width: 100 }} />
                </Form.Field>

                {fields.length > 1 && (
                  <Button onClick={() => remove(field.name)} color="danger">
                    删除
                  </Button>
                )}

                {index > 0 && (
                  <Button onClick={() => move(index, index - 1)}>
                    上移
                  </Button>
                )}

                {index < fields.length - 1 && (
                  <Button onClick={() => move(index, index + 1)}>
                    下移
                  </Button>
                )}
              </Space>
            ))}
            <Space style={{ marginTop: 16 }}>
              <Button
                onClick={() => {
                  add({ name: '', age: '' })
                }}
              >
                添加用户
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Space>
          </>
        )}
      </Form.List>
    </Form>
  );
};
