import { Watermark } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Watermark
      content="Yee Design"
      fontColor="#1890ff"
      fontSize={20}
      fontFamily="Arial"
      fontStyle="italic"
    >
      <div style={{ height: 500, padding: 20, background: '#f5f5f5' }}>
        <h2>Custom Style Watermark</h2>
        <p>This is a watermark with custom styling:</p>
        <ul>
          <li>Font color: #1890ff</li>
          <li>Font size: 20px</li>
          <li>Font style: italic</li>
          <li>Font weight: bold</li>
        </ul>
      </div>
    </Watermark>
  );
};
