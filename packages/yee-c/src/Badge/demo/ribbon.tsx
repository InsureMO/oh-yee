import { Badge, Card } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Badge.Ribbon text="HOT">
        <Card style={{ width: '200px', height: '100px' }}>Card Content</Card>
      </Badge.Ribbon>

      <div style={{ marginTop: '20px' }}>
        <Badge.Ribbon text="HOT">
          <Card style={{ width: '200px', height: '100px' }}>Custom Color</Card>
        </Badge.Ribbon>
      </div>
    </div>
  );
};
