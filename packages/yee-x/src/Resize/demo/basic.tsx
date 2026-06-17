import { Resize } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Index() {
  return (
    <div className="resize-demo">
      <Resize width={200}>
        <div
          style={{ height: '300px', backgroundColor: 'red', width: '100%' }}
        ></div>
      </Resize>
    </div>
  );
}
