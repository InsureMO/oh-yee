/**
 * Basic example - Simple form rendering
 */

import { AIRenderer } from '@rainbow-oh/yee-x';
import React from 'react';
import type { UISchema } from '../interface';

const BasicDemo: React.FC = () => {
  const schema: UISchema = {
    root: 'form-card',
    components: {
      'form-card': {
        type: 'card',
        props: {
          title: 'User Registration',
        },
        children: ['user-form'],
      },
      'user-form': {
        type: 'form',
        props: {
          layout: 'vertical',
        },
        children: ['user-grid'],
      },
      'user-grid': {
        type: 'grid',
        props: {
          cols: 1,
        },
        children: ['name-field', 'email-field', 'submit-btn'],
      },
      'name-field': {
        type: 'form-field',
        props: {
          name: 'name',
          label: 'Name',
          rules: [{ required: true, message: 'Please enter your name' }],
        },
        children: ['name-input'],
      },
      'name-input': {
        type: 'input',
        props: {
          defaultValue: '$data.form.name',
          placeholder: 'Please enter your name',
        },
      },
      'email-field': {
        type: 'form-field',
        props: {
          name: 'email',
          label: 'Email',
          rules: [
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Invalid email format' },
          ],
        },
        children: ['email-input'],
      },
      'email-input': {
        type: 'input',
        props: {
          placeholder: 'Please enter your email',
        },
      },
      'submit-btn': {
        type: 'button',
        props: {
          children: 'Submit',
          type: 'primary',
          htmlType: 'submit',
        },
      },
    },
    data: {
      form: {
        name: 'default name',
      },
    },
  };

  const handleUpdate = (update: any) => {
    console.log('Schema updated:', update);
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Basic Example</h2>
      <AIRenderer schema={schema} onUpdate={handleUpdate} />
    </div>
  );
};

export default BasicDemo;
