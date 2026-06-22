import { Card } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Card
      title="Card title"
      expanded={false}
      extra={<a href="#">More</a>}
      style={{ width: 300 }}
      bordered
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};
