import { Highlight } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  const handleClick = (e: React.MouseEvent<HTMLElement>, index: number) => {
    console.log(`Clicked highlight item ${index}`, e);
  };

  return (
    <div style={{ lineHeight: '2em' }}>
      <p>
        <Highlight
          text="React is a JavaScript library for building user interfaces"
          pattern={/React|JavaScript/g}
          onClick={handleClick}
        />
      </p>
      <p>
        <Highlight
          text="Click on the highlighted words to see console output"
          pattern={/highlighted|click/gi}
          onClick={handleClick}
        />
      </p>
    </div>
  );
};
