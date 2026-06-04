import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Card } from '@oh/yee-c';

export default () => {
  return (
    <Card
      title="Custom Expand Icon"
      style={{ width: '300px' }}
      expandIcon={(collapsed) =>
        collapsed ? <ArrowRight /> : <Download />
      }
      defaultExpanded={false}
    >
      <p>Card content with custom expand icon</p>
      <p>The expand icon is customized using the expandIcon prop</p>
    </Card>
  );
};
