import { Box } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Box
        className="custom-box"
        style={{
          padding: '30px',
          backgroundColor: '#fffbe6',
          border: '1px solid #ffe58f',
          borderRadius: '8px',
        }}
      >
        <h3>Custom Styled Box</h3>
        <p>
          This box has custom styles applied through className and style props.
        </p>
      </Box>
    </div>
  );
};
