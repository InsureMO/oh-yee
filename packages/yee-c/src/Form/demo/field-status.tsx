import {
  Button,
  Form,
  Input,
  Space,
  type FieldStatusData,
} from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [form] = Form.useForm();
  const [currentStatus, setCurrentStatus] = useState<FieldStatusData | null>(
    null,
  );
  const [submitResult, setSubmitResult] = useState('');

  const applyStatus = (status: FieldStatusData | null) => {
    form.setFieldStatus('username', status);
    setCurrentStatus(form.getFieldStatus('username'));
    setSubmitResult('');
  };

  return (
    <Form
      form={form}
      initialValues={{ username: 'demo-user' }}
      onFinish={() => setSubmitResult('Submit succeeded')}
      onFinishFailed={() =>
        setSubmitResult('Submit blocked by the blocking error')
      }
    >
      <Form.Field
        name="username"
        label="Username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input placeholder="Please input your username" />
      </Form.Field>

      <Space style={{ marginTop: 28, flexWrap: 'wrap' }}>
        <Button
          onClick={() =>
            applyStatus({
              status: 'error',
              message: 'This username is unavailable',
            })
          }
        >
          Error
        </Button>
        <Button
          onClick={() =>
            applyStatus({
              status: 'error',
              message: 'This error prevents submission',
              blocking: true,
            })
          }
        >
          Blocking error
        </Button>
        <Button
          onClick={() =>
            applyStatus({
              status: 'warning',
              message: 'This username is commonly used',
            })
          }
        >
          Warning
        </Button>
        <Button
          onClick={() =>
            applyStatus({
              status: 'success',
              message: 'This username is available',
            })
          }
        >
          Success
        </Button>
        <Button
          onClick={() =>
            applyStatus({
              status: 'info',
              message: 'The username can be changed later',
            })
          }
        >
          Info
        </Button>
        <Button onClick={() => applyStatus(null)}>Clear</Button>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Space>

      <pre style={{ marginTop: 16 }}>
        Current status: {JSON.stringify(currentStatus, null, 2)}
      </pre>
      {submitResult ? <div>{submitResult}</div> : null}
      <div style={{ marginTop: 8, color: '#999' }}>
        Tip: set Success, then clear the input — the rule error takes display
        precedence over the manually set status.
      </div>
    </Form>
  );
};
