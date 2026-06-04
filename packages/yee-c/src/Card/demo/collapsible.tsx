import React from 'react';
import { Card } from '@oh/yee-c';

export default () => {
  return (
    <Card title="Card title" expanded={false} extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};