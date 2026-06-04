import { Button, Spin } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [spinning, setSpinning] = useState(false);

  const toggleSpinning = () => {
    setSpinning(!spinning);
  };

  return (
    <div>
      <Button onClick={toggleSpinning} style={{ marginBottom: 16 }}>
        Toggle Loading
      </Button>

      <div
        style={{
          border: '1px solid #d9d9d9',
          padding: 24,
          borderRadius: 4,
          position: 'relative',
        }}
      >
        <Spin spinning={spinning}>
          <div>
            <p>This is content</p>
            <p>This is content</p>
            <p>This is content</p>
          </div>
        </Spin>
      </div>
    </div>
  );
};
