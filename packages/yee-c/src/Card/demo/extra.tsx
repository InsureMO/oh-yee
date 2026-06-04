import { Card } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Card title="Card title" extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};
