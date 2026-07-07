/**
 * Comprehensive example - Shows all features
 */

import React, { useState } from 'react';
import { AIRenderer } from '../AIRenderer';
import type { UISchema } from '../interface';

const ComprehensiveDemo: React.FC = () => {
  const [schema, setSchema] = useState<UISchema>({
    root: 'main-card',
    components: {
      'main-card': {
        type: 'card',
        props: {
          title: 'Comprehensive Example - User Management',
        },
        children: ['user-form', 'user-table'],
      },
      'user-form': {
        type: 'form',
        props: {
          layout: 'vertical',
          initialValues: '$data.form',
        },
        children: [
          'name-field',
          'email-field',
          'age-field',
          'role-field',
          'submit-btn',
        ],
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
      'age-field': {
        type: 'form-field',
        props: {
          name: 'age',
          label: 'Age',
        },
        children: ['age-input'],
      },
      'age-input': {
        type: 'input-number',
        props: {
          placeholder: 'Please enter your age',
          min: 0,
          max: 150,
        },
      },
      'role-field': {
        type: 'form-field',
        props: {
          name: 'role',
          label: 'Role',
        },
        children: ['role-select'],
      },
      'role-select': {
        type: 'select',
        props: {
          placeholder: 'Please select a role',
          options: '$data.roles',
        },
      },
      'submit-btn': {
        type: 'button',
        props: {
          children: 'Add User',
          type: 'primary',
          htmlType: 'submit',
        },
      },
      'user-table': {
        type: 'table',
        props: {
          dataSource: '$data.users',
          columns: [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'Role', dataIndex: 'role', key: 'role' },
          ],
        },
      },
    },
    data: {
      form: {
        name: '',
        email: '',
        age: null,
        role: undefined,
      },
      roles: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Guest', value: 'guest' },
      ],
      users: [
        {
          key: 1,
          name: 'John Doe',
          email: 'john@example.com',
          age: 30,
          role: 'admin',
        },
        {
          key: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          age: 25,
          role: 'user',
        },
        {
          key: 3,
          name: 'Bob Johnson',
          email: 'bob@example.com',
          age: 35,
          role: 'user',
        },
      ],
    },
  });

  const handleUpdate = (update: any) => {
    console.log('Schema updated:', update);

    // Simulate API response
    if (update.data) {
      // Add success alert
      const newSchema = { ...schema };

      // Add success alert component
      newSchema.components['success-alert'] = {
        type: 'alert',
        props: {
          type: 'success',
          message: 'Added successfully',
          description: `User ${update.data.name} has been added to the list`,
        },
      };

      // Update main card's children
      newSchema.components['main-card'] = {
        ...newSchema.components['main-card'],
        children: ['success-alert', 'user-form', 'user-table'],
      };

      // Add new user to table
      const existingUsers =
        (newSchema.data?.users as Array<Record<string, unknown>> | undefined) ||
        [];
      newSchema.data = {
        ...newSchema.data,
        users: [
          ...existingUsers,
          { key: existingUsers.length + 1, ...update.data },
        ],
      };

      setSchema(newSchema);

      // Remove alert after 3 seconds
      setTimeout(() => {
        const updatedSchema = { ...newSchema };
        delete updatedSchema.components['success-alert'];
        updatedSchema.components['main-card'] = {
          ...updatedSchema.components['main-card'],
          children: ['user-form', 'user-table'],
        };
        setSchema(updatedSchema);
      }, 3000);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2>Comprehensive Example</h2>
      <p>
        Demonstrates all features: forms, data binding, event handling,
        incremental updates, data display
      </p>

      <div
        style={{
          marginTop: '16px',
          padding: '16px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
        }}
      >
        <h3>Features:</h3>
        <ul>
          <li>Form inputs (Input, InputNumber, Select)</li>
          <li>Form validation (required, email format)</li>
          <li>Data binding (initialValues, options, dataSource)</li>
          <li>Event handling (form submission)</li>
          <li>Incremental updates (success alert after submission)</li>
          <li>Data display (Table)</li>
        </ul>
        <p style={{ marginTop: '8px', color: '#666' }}>
          Note: Since this is a demo, API calls are simulated. In real use,
          actual HTTP requests will be sent.
        </p>
      </div>

      <div style={{ marginTop: '24px' }}>
        <AIRenderer schema={schema} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ComprehensiveDemo;
