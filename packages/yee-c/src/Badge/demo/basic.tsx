import { Avatar, Badge, Box } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <>
      <Box>
        <Badge count={5}>
          <Avatar
            shape="square"
            size="large"
            style={{ backgroundColor: '#aaa' }}
          />
        </Badge>
        <span style={{ marginLeft: '20px' }}></span>
        <Badge count={0} showZero>
          <Avatar
            shape="square"
            size="large"
            style={{ backgroundColor: '#aaa' }}
          />
        </Badge>
        <span style={{ marginLeft: '20px' }}></span>
        <Badge count={0}>
          <Avatar
            shape="square"
            size="large"
            style={{ backgroundColor: '#aaa' }}
          />
        </Badge>
      </Box>
    </>
  );
};
