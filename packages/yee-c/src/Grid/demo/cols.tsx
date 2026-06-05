import { Grid, Slider } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [cols, setCols] = useState(3);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        Columns: {cols}
        <Slider
          min={1}
          max={6}
          value={cols}
          onChange={(value) => setCols(value as number)}
          style={{ width: '200px', marginLeft: '10px' }}
        />
      </div>
      <Grid cols={cols} colGap={10} rowGap={10}>
        {Array.from({ length: 12 }).map((_, index) => (
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
    </div>
  );
};
