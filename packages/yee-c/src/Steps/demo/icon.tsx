import { Steps } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [current, setCurrent] = useState(1);

  const onChange = (current: number) => {
    console.log('onChange:', current);
    setCurrent(current);
  };

  return (
    <Steps
      current={current}
      onChange={onChange}
      items={[
        {
          title: 'Login',
          description: 'This is a description.',
          icon: '🔑',
        },
        {
          title: 'Verification',
          description: 'This is a description.',
          icon: '✅',
        },
        {
          title: 'Done',
          description: 'This is a description.',
          icon: '🎉',
        },
      ]}
    />
  );
};
