import { Thinking } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Status() {
  return (
    <Thinking
      status="error"
      label="Retrieving context"
      duration={3}
      content="Connection to the retrieval service timed out after 3s."
      style={{ width: 420 }}
    />
  );
}
