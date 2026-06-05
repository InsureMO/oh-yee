/**
 * title: Basic Usage
 * description: A single Reveal wraps multiple Cards, each rendered independently on demand. `offset` sets an early trigger distance of 200px.
 */
import { Card, Reveal } from '@rainbow-oh/yee-c';
import React from 'react';

const items = Array.from({ length: 20 }, (_, i) => i + 1);

export default () => (
  <Reveal offset="100px">
    {items.map((id) => (
      <Card key={id} title={`Card ${id}`}>
        <p>
          This is the content of card {id}, it will only render when scrolled
          into view.
        </p>
      </Card>
    ))}
  </Reveal>
);
