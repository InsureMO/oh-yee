/**
 * Incremental update example - Shows incremental updates after form submission
 */

import React, { useState } from 'react';
import { AIRenderer } from '../AIRenderer';
import type { UISchema } from '../interface';

const IncrementalDemo: React.FC = () => {
  const [schema, setSchema] = useState<UISchema>({
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
          initialValues: '$data.form',
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
          placeholder: 'Please enter your name',
        },
      },
      'email-field': {
        type: 'form-field',
        props: {
          name: 'email',
          label: 'Email',
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
        name: '',
        email: '',
      },
    },
  });

  const handleUpdate = (update: any) => {
    console.log('Schema updated:', update);

    // Simulate incremental update after API response
    if (update.data) {
      // Add success alert component
      setSchema((prev) => ({
        ...prev,
        components: {
          ...prev.components,
          'success-alert': {
            type: 'alert',
            props: {
              status: 'success',
              title: 'Registration successful!',
              message: `Welcome, ${update.data.name}!`,
            },
          },
          'form-card': {
            ...prev.components['form-card'],
            children: ['success-alert', 'user-form'],
          },
        },
        data: { form: update.data },
      }));
    }
  };
  console.log('schema: ', schema);
  return (
    <div style={{ padding: '24px' }}>
      <h2>Incremental Update Example</h2>
      <p>
        After submitting the form, a success message will be displayed in the
        same bubble
      </p>
      <AIRenderer schema={schema} onUpdate={handleUpdate} />
    </div>
  );
};

export default IncrementalDemo;
