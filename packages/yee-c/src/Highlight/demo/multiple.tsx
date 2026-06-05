import { Highlight } from '@rainbow-oh/yee-c';
import React from 'react';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <h4>Highlight Numbers</h4>
        <Highlight
          text="Order #12345 was shipped on 2024-01-15 with tracking code ABC-987-XYZ"
          pattern={/\d+/g}
        />
      </div>

      <div>
        <h4>Highlight Email Addresses</h4>
        <Highlight
          text="Contact us at support@example.com or sales@company.org for more information"
          pattern={/[\w.-]+@[\w.-]+\.\w+/g}
        />
      </div>

      <div>
        <h4>Highlight Keywords</h4>
        <Highlight
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          pattern={/lorem|ipsum|dolor|amet/gi}
        />
      </div>

      <div>
        <h4>Highlight Phone Numbers</h4>
        <Highlight
          text="Call us at (123) 456-7890 or 987-654-3210 for support"
          pattern={/\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}/g}
        />
      </div>
    </div>
  );
};
