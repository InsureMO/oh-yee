import { Anchor } from '@rainbow-oh/yee-c';
import React from 'react';

/**
 * `auto` mode: the anchor list is generated from the DOM. Decorate each target
 * section with the following attributes:
 *   - data-anchor-group="<name>"  must match the Anchor's `name` prop
 *   - id="<key>"                  used as the anchor key and scroll target
 *   - data-anchor-title="<title>"  the nav label (required; a section without it is skipped)
 *   - data-anchor-status="success | error | warning"  optional status badge color
 */
export default () => {
  return (
    <div
      id="auto-container"
      style={{ display: 'flex', height: 300, overflow: 'auto' }}
    >
      <Anchor
        auto
        name="article"
        affix={false}
        defaultActiveKey="auto-intro"
        getContainer={() => document.getElementById('auto-container')!}
      />
      <div style={{ flex: 1, padding: 20 }}>
        <section
          id="auto-intro"
          data-anchor-group="article"
          data-anchor-title="Introduction"
          style={{ height: 300, background: '#f0f0f0', marginBottom: 20 }}
        >
          Introduction
        </section>
        <section
          id="auto-usage"
          data-anchor-group="article"
          data-anchor-title="Usage"
          data-anchor-status="success"
          style={{ height: 300, background: '#e0e0e0', marginBottom: 20 }}
        >
          Usage
        </section>
        <section
          id="auto-caveats"
          data-anchor-group="article"
          data-anchor-title="Caveats"
          data-anchor-status="warning"
          style={{ height: 300, background: '#d0d0d0' }}
        >
          Caveats
        </section>
      </div>
    </div>
  );
};
