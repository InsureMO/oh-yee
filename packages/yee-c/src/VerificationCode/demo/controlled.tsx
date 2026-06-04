import { Button, VerificationCode } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value, setValue] = useState('');

  return (
    <>
      <VerificationCode
        value={value}
        onChange={(val) => setValue(val)}
        length={4}
      />
      <div style={{ marginTop: 16 }}>
        <Button onClick={() => setValue('1234')}>Set Value to 1234</Button>
      </div>
    </>
  );
};
