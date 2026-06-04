import { TextArea } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <TextArea
      placeholder="Show character count"
      showCount
      maxLength={100}
      style={{ width: '100%' }}
    />
  );
};
