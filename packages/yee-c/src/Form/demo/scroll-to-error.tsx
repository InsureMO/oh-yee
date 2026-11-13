import { Button, Form, Input, Space } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const [form] = Form.useForm();

  return (
    <div className="scroll-to-error-demo">
      {/* 演示站有吸顶页头：调大 scroll-margin 让滚到的字段不被遮挡（默认 8px） */}
      <style>{`.scroll-to-error-demo { --yee-form-item-scroll-margin-top: 80px; }`}</style>
      <Form
        form={form}
        scrollToFirstError
        onFinish={() => console.log('submit success')}
      >
        <Form.Field
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Required" />
        </Form.Field>

        {/* Spacer creates a field far below the fold to make the scroll visible */}
        <div style={{ height: 320 }} />

        <Form.Field
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Required, far below the fold" />
        </Form.Field>

        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => form.scrollToField('email')}>
            scrollToField(&apos;email&apos;)
          </Button>
        </Space>
      </Form>
    </div>
  );
};
