import { VerificationCode } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const handleChange = (value: string) => {
    console.log('Verification code changed:', value);
  };

  const handleFinish = (value: string) => {
    console.log('Verification code finished:', value);
  };

  return (
    <VerificationCode
      length={6}
      onChange={handleChange}
      onFinish={handleFinish}
    />
  );
};
