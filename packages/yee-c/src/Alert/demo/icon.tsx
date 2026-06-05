import { Alert } from '@rainbow-oh/yee-c';
import { Apple } from 'lucide-react';
import React from 'react';

export default () => {
  return (
    <>
      <Alert
        description="Alert with custom icon"
        icon={<Apple size={16} />}
        showIcon
      />
      <br />
      <Alert
        description="Success alert without default icon"
        status="success"
        showIcon={false}
      />
    </>
  );
};
