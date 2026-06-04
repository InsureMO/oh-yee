import React from 'react';
import { JsonViewer } from '@rainbow-oh/yee-c';

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
    spouse: null,
  };

  return <JsonViewer data={data} />;
};
