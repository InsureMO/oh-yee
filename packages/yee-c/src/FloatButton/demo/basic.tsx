import { Menu } from 'lucide-react';
import { FloatButton, Tooltip } from '@oh/yee-c';
import React from 'react';

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
