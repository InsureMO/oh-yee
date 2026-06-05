import { Box } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Box style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <p>This is a basic Box component</p>
      </Box>

      <Box
        mode="header"
        style={{
          padding: '20px',
          backgroundColor: '#e6f7ff',
          marginTop: '20px',
        }}
      >
        <p>This is a header Box</p>
      </Box>

      <Box
        mode="footer"
        style={{
          padding: '20px',
          backgroundColor: '#f6ffed',
          marginTop: '20px',
        }}
      >
        <p>This is a footer Box</p>
      </Box>
    </div>
  );
};
