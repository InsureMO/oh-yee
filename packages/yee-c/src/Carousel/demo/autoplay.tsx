import { Carousel } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <Carousel
      style={{ width: '500px', height: '300px' }}
      autoplay
      autoplaySpeed={1000}
    >
      <div
        style={{
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <h3>Auto Play 1</h3>
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
        <h3>Auto Play 2</h3>
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
        <h3>Auto Play 3</h3>
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
        <h3>Auto Play 4</h3>
      </div>
    </Carousel>
  );
};
