import { Bubble } from '@rainbow-oh/yee-x';
import { Copy } from 'lucide-react';
import React from 'react';

export default function Semantic() {
  return (
    <div>
      <div>
        <Bubble
          header="yee-x"
          avatar={{ icon: 'A' }}
          content="Bubble text content"
          footer={<Copy size={14} />}
        />
      </div>
      <div></div>
    </div>
  );
}
