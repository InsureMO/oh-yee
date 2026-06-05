import { JsonViewer } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const data = {
    name: 'John Doe',
    age: 30,
    isStudent: false,
    address: {
      street: '123 Main St',
      city: 'New York',
      zipcode: '10001',
    },
    hobbies: ['reading', 'swimming', 'coding'],
    scores: [95, 87, 92],
    spouse: null,
  };

  return (
    <JsonViewer
      data={data}
      colors={{
        key: '#8e44ad',
        string: '#27ae60',
        number: '#e74c3c',
        boolean: '#3498db',
        null: '#95a5a6',
        array: ['#e67e22', '#f39c12'],
        object: ['#9b59b6', '#8e44ad'],
      }}
    />
  );
};
