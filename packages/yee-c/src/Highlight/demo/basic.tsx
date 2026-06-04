import React from 'react';
import { Highlight } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div>
      <Highlight text="The quick brown fox jumps over the lazy dog" pattern={/fox/gi} />
    </div>
  );
};
