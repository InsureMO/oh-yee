import { TextArea } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <TextArea
      placeholder="No border"
      bordered={false}
      style={{ width: '100%' }}
    />
  );
};
