import React from 'react';
import { Grid } from '@oh/yee-c';

export default () => {
  return (
    <Grid cols={4} colGap={10} rowGap={10}>
      <Grid.Item colspan={2}>
        <div
          style={{
            background: '#f0f0f0',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          Span 2 columns
        </div>
      </Grid.Item>
      <Grid.Item>
        <div
          style={{
            background: '#f0f0f0',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          Item
        </div>
      </Grid.Item>
      <Grid.Item>
        <div
          style={{
            background: '#f0f0f0',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          Item
        </div>
      </Grid.Item>
      <Grid.Item colspan={3}>
        <div
          style={{
            background: '#f0f0f0',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          Span 3 columns
        </div>
      </Grid.Item>
      <Grid.Item>
        <div
          style={{
            background: '#f0f0f0',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          Item
        </div>
      </Grid.Item>
    </Grid>
  );
};
