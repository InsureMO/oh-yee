/**
 * title: Staggered Rendering
 * description: In stagger mode, all Cards are eventually rendered, but incrementally frame by frame with automatic rate adjustment to avoid first-frame jank.
 */
import React from 'react';
import { Reveal, Card } from '@oh/yee-c';

const items = Array.from({ length: 20 }, (_, i) => i + 1);

export default () => (
  <Reveal mode="stagger">
    {items.map((id) => (
      <Card key={id} title={`Card ${id}`}>
        <p>This is card {id}, rendered frame by frame in stagger mode.</p>
      </Card>
    ))}
  </Reveal>
);
