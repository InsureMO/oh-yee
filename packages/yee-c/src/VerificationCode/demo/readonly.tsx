import { VerificationCode } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return <VerificationCode readOnly defaultValue="123456" length={6} />;
};
