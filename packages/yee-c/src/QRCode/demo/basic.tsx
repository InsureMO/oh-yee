import { QRCode } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <QRCode value="https://yee-c.example.com" />
    </div>
  );
};
