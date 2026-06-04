import { Ellipsis } from '@oh/yee-c';
import React, { useState } from 'react';

const longText = `yee-c is a React UI component library. Its goal is to provide a set of high-quality, feature-rich, customizable, extensible, and accessibility-friendly enterprise-level components built with React. yee-c is a React UI component library. Its goal is to provide a set of high-quality, feature-rich, customizable, extensible, and accessibility-friendly enterprise-level components built with React.`;

export default () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <h3>Controlled Mode</h3>
      <Ellipsis
        lines={3}
        expanded={expanded}
        onExpand={setExpanded}
      >
        {longText}
      </Ellipsis>
      <p style={{ marginTop: 8 }}>
        Current state: {expanded ? 'Expanded' : 'Collapsed'}
      </p>
    </div>
  );
};
