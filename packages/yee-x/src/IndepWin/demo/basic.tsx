import { Button, Tooltip } from '@rainbow-oh/yee-c';
import { IndepWin } from '@rainbow-oh/yee-x';
import React, { useState } from 'react';
import './index.less';

export default function Basic() {
  const [open, setOpen] = useState(false);

  const click = () => {
    setOpen(true);
  };

  const handleClick = () => {
    console.log('click');
  };

  return (
    <>
      <Tooltip title="Open independent window">
        <Button onClick={click}>Open</Button>
      </Tooltip>

      <div id="tst" className="tst-box" style={{ backgroundColor: 'red' }}>
        some content
        <span className="tst-box-inner">Inner content</span>
        <button type="button" onClick={handleClick}>
          click
        </button>
      </div>
      <IndepWin
        id="tst"
        extractPrefixCls="tst"
        // extractStyles={handleExtractStyle}
        open={open}
        onOpenChange={(o) => setOpen(o)}
      />
    </>
  );
}
