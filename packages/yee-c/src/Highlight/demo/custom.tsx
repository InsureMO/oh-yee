import React from 'react';
import { Highlight } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h4>Custom Style</h4>
        <Highlight
          text="This text has custom highlight styles"
          pattern={/custom|highlight/gi}
          style={{ color: '#ff4d4f', fontWeight: 'bold', backgroundColor: '#fff1f0' }}
          wrapperStyle={{ padding: '8px', backgroundColor: '#f5f5f5' }}
        />
      </div>

      <div>
        <h4>Custom HTML Tag</h4>
        <Highlight
          text="Using strong tag for highlighted text"
          pattern={/strong|highlighted/gi}
          htmlTag="strong"
          wrapperHtmlTag="div"
        />
      </div>

      <div>
        <h4>Custom Class Names</h4>
        <Highlight
          text="Custom classNames and styles"
          pattern={/custom|styles/gi}
          classNames={{ item: 'custom-highlight-item' }}
          styles={{ item: { borderBottom: '2px solid #1890ff' } }}
          className="my-highlight-wrapper"
        />
      </div>
    </div>
  );
};
