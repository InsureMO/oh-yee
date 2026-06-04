import React from 'react';
import { Grid } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <Grid cols={4} colGap={16} rowGap={16}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid.Item key={index}>
          <div
            style={{
              background: '#f0f0f0',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            Item {index + 1}
          </div>
        </Grid.Item>
      ))}
    </Grid>
  );
};
