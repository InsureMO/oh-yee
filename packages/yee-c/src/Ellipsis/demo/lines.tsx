import { Ellipsis } from '@rainbow-oh/yee-c';
import React from 'react';

const longText = `This is a long text content used to demonstrate the ellipsis effect with different line counts.
yee-c is a React UI component library. Ant Design aims to provide a set of high-quality, feature-rich, customizable, extensible, and accessibility-friendly enterprise-level components built with React.
yee-c provides a complete set of UI components, including buttons, forms, tables, menus, modals, and more.
The design philosophy of yee-c is to enable users to quickly build beautiful, fully-functional interfaces while keeping code clean and maintainable.`;

export default () => {
  return (
    <div>
      <h3>1 Line</h3>
      <Ellipsis lines={1}>{longText}</Ellipsis>

      <h3 style={{ marginTop: 16 }}>2 Lines</h3>
      <Ellipsis lines={2}>{longText}</Ellipsis>

      <h3 style={{ marginTop: 16 }}>3 Lines</h3>
      <Ellipsis lines={3}>{longText}</Ellipsis>

      <h3 style={{ marginTop: 16 }}>5 Lines</h3>
      <Ellipsis lines={5}>{longText}</Ellipsis>
    </div>
  );
};
