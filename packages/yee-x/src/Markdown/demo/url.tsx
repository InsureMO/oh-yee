import { Markdown } from '@rainbow-oh/yee-x';
import React from 'react';

export default function Index() {
  const markdown = `
# title one
content xxxx
this is a link: <a href="#">Click here</a>
  `;

  const handle = (url: string) => {
    return url + '?key=123';
  };

  return <Markdown markdown={markdown} urlTransform={handle} />;
}
