import { Watermark } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Watermark content={['Yee Design', '2024-01-01']}>
      <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
        <h2>Multi-line Text Watermark</h2>
        <p>This is a container with a multi-line text watermark.</p>
        <p>
          You can display multiple lines of content, such as a company name and
          date.
        </p>
      </div>
    </Watermark>
  );
};
