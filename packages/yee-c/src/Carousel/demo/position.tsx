import { Carousel } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div>
      <Carousel
        style={{ width: '100%', height: '300px', marginBottom: '20px' }}
        dotPosition="top"
        dots
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
          <h3>Top Dots 1</h3>
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
          <h3>Top Dots 2</h3>
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
          <h3>Top Dots 3</h3>
        </div>
      </Carousel>

      <Carousel
        style={{ width: '500px', height: '300px' }}
        dotPosition="right"
        dots
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
          <h3>Right Dots 1</h3>
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
          <h3>Right Dots 2</h3>
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
          <h3>Right Dots 3</h3>
        </div>
      </Carousel>
    </div>
  );
};
