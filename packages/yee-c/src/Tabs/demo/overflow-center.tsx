import { Tabs } from '@rainbow-oh/yee-c';
import React, { useState } from 'react';

export default () => {
  const items = Array.from({ length: 24 }, (_, i) => ({
    key: `tab-${i + 1}`,
    label: `Tab ${i + 1}`,
    children: `Content of Tab Pane ${i + 1}`,
  }));

  const [centerKey, setCenterKey] = useState<string | number>('tab-1');
  const [autoKey, setAutoKey] = useState<string | number>('tab-1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8 }}>activeAlign=&quot;center&quot;</p>
        <div style={{ maxWidth: 480 }} data-testid="center-wrap">
          <Tabs
            activeAlign="center"
            items={items}
            activeKey={centerKey}
            onChange={setCenterKey}
          />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8 }}>default (auto)</p>
        <div style={{ maxWidth: 480 }} data-testid="auto-wrap">
          <Tabs items={items} activeKey={autoKey} onChange={setAutoKey} />
        </div>
      </div>
    </div>
  );
};
