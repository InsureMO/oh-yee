import { Button, Dialog, Form, Input } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleOpen = () => {
    setOpen(true);
    form.setFieldsValue({
      username: 'John Doe',
    });
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        title="Edit User"
        open={open}
        onCancel={() => { 
          setOpen(false);
          // form.resetFields();
        }}
        onConfirm={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={(values) => {
            console.log('Submit:', values);
            setOpen(false);
          }}
          onFinishFailed={(errors) => {
            console.log('Failed:', errors);
          }}
        >
          <Form.Field name="username" label="Username" required>
            <Input placeholder="Please enter username" />
          </Form.Field>
        </Form>
      </Dialog>
    </>
  );
};
