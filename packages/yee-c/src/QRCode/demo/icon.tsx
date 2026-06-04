import { QRCode } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <QRCode
        value="https://yee-c.example.com"
        icon="https://avatars.githubusercontent.com/u/1718635?v=4"
        size={200}
        iconSize={40}
      />
    </div>
  );
};
