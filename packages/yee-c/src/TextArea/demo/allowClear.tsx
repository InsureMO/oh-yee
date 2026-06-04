import { TextArea } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <TextArea
      placeholder="Allow clear content"
      allowClear
      style={{ width: '100%' }}
    />
  );
};
