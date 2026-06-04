import { Rate } from '@oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const [value1, setValue1] = useState(3);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(3);

  return (
    <div>
      <div>
        <Rate value={value1} onChange={setValue1} character="A" count={6} />
        <span style={{ marginLeft: 8 }}>{value1} points</span>
      </div>

      <div style={{ marginTop: 16 }}>
        <Rate value={value2} onChange={setValue2} character="好" count={5} />
        <span style={{ marginLeft: 8 }}>{value2} stars</span>
      </div>

      <div style={{ marginTop: 16 }}>
        <Rate
          value={value3}
          onChange={setValue3}
          character={({ index }) => index + 1}
          count={10}
        />
        <span style={{ marginLeft: 8 }}>{value3} points</span>
      </div>
    </div>
  );
};
