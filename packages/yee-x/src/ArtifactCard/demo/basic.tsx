import { ArtifactCard } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Index() {
  return (
    <ArtifactCard.Group
      title="Generated documents"
      items={[
        {
          key: 'plan',
          title: 'Product Memo Plan',
          fileName: 'product-memo-plan.md',
          description: 'Generate time: 2026-11-20 14:32',
          onPreview: () => {},
          onDownload: () => {},
        },
        {
          key: 'memo',
          title: 'Product Memo',
          fileName: 'product-memo.md',
          description: 'Generate time: 2026-11-20 14:40',
          onPreview: () => {},
          onDownload: () => {},
        },
      ]}
    />
  );
}
