import { Menu } from 'lucide-react';
import React from 'react';
import { FloatButton, Tooltip } from '@rainbow-oh/yee-c';

export default () => {
  return (
    <div style={{ transform: 'scale(1)', height: '30vh' }}>
      <Tooltip title="FloatButton" placement="right">
        <FloatButton
          icon={<Menu size={18} />}
          type="primary"
          onClick={() => console.log('FloatButton clicked')}
        />
      </Tooltip>
    </div>
  );
};
