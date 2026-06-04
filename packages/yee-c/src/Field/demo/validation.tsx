import { Field, Input, useVirtualForm, Button } from '@rainbow-oh/yee-c';
import React, { useLayoutEffect } from 'react';

export default () => {
  const { createForm, getForm } = useVirtualForm();

  useLayoutEffect(() => {
    createForm('validationForm');
  }, []);

  const handleSubmit = () => {
    const form = getForm('validationForm');
    console.log("form: ", form);
    const errors = form?.submit();
    console.log("errors: ", errors);
    if (errors && errors.length === 0) {
      console.log('Submit success:', form?.getFieldsValue());
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <Field
        formName="validationForm"
        name="username"
        label="Username"
        required
        rules={[
          { required: true, message: 'Username is required' },
          { minLength: 3, message: 'Username must be at least 3 characters' },
        ]}
      >
        <Input placeholder="Please enter username" />
      </Field>
      <Field
        formName="validationForm"
        name="phone"
        label="Phone"
        rules={[
          { regexp: /^1[3-9]\d{9}$/, message: 'Please enter a valid phone number' },
        ]}
      >
        <Input placeholder="Please enter phone number" />
      </Field>
      <Field
        formName="validationForm"
        name="age"
        label="Age"
        rules={[
          { validator: (v) => Number(v) >= 18, message: 'Must be at least 18 years old' },
        ]}
      >
        <Input placeholder="Please enter age" />
      </Field>
      <Field
        formName="validationForm"
        name="code"
        label="Verification Code"
        rules={[
          { minLength: 6, maxLength: 6, message: 'Verification code must be 6 digits', validateTrigger: 'onBlur' },
        ]}
      >
        <Input placeholder="Validate on blur only" />
      </Field>
      <Button type="primary" onClick={handleSubmit}>Submit</Button>
    </div>
  );
};
