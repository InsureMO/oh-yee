import { QRCode } from '@oh/yee-c';
import React, { useState } from 'react';
import { Button } from '@oh/yee-c';

export default () => {
  const [status, setStatus] = useState<'active' | 'loading' | 'expired' | 'scanned'>('active');

  const handleRefresh = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('active');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <QRCode
        value="https://yee-c.example.com"
        status={status}
        message={status === 'expired' ? 'QR code has expired' : status === 'scanned' ? 'Scanned successfully' : undefined}
        onRefresh={handleRefresh}
      />
      <div>
        <Button onClick={() => setStatus('loading')} style={{ marginRight: 8 }}>
          Loading
        </Button>
        <Button onClick={() => setStatus('expired')} style={{ marginRight: 8 }}>
          Expired
        </Button>
        <Button onClick={() => setStatus('scanned')} style={{ marginRight: 8 }}>
          Scanned
        </Button>
        <Button onClick={() => setStatus('active')}>Active</Button>
      </div>
    </div>
  );
};
