import { TextArea } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <TextArea
      placeholder="Autosize height based on content lines"
      autoSize
      style={{ width: '100%' }}
    />
  );
};
