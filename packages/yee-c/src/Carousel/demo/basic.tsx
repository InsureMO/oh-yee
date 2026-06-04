import React from 'react';
import { Carousel } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <Carousel style={{ width: '100%', height: '300px' }}>
      <div
        style={{
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h3>1</h3>
      </div>
      <div
        style={{
          backgroundColor: '#e6f7ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h3>2</h3>
      </div>
      <div
        style={{
          backgroundColor: '#f6ffed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h3>3</h3>
      </div>
      <div
        style={{
          backgroundColor: '#fffbe6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h3>4</h3>
      </div>
    </Carousel>
  );
};
