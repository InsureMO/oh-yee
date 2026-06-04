import { Ellipsis } from '@oh/yee-c';
import React from 'react';

const longText = `yee-c is a React UI component library. Its goal is to provide a set of high-quality, feature-rich, customizable, extensible, and accessibility-friendly enterprise-level components built with React. yee-c is a React UI component library. Its goal is to provide a set of high-quality, feature-rich, customizable, extensible, and accessibility-friendly enterprise-level components built with React.`;

export default () => {
  return (
    <div>
      <h3>Default Expanded</h3>
      <Ellipsis 
        lines={3}
        defaultExpanded
      >
        {longText}
      </Ellipsis>
    </div>
  );
};
