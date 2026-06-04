import { ImageViewer } from '@oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ height: 400 }}>
      <ImageViewer src="https://picsum.photos/id/1/800/600" />
    </div>
  );
};
