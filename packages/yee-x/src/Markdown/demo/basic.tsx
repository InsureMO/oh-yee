import { Markdown } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Index() {
  const markdown = `
# title one
content xxxx
  `;
  return <Markdown markdown={markdown} />;
}
