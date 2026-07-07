import clsx from 'clsx';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { MarkdownProps } from './interface';

import './style/atom-one-light.css';
import './style/github-markdown-light.css';

const Markdown = (props: MarkdownProps) => {
  const {
    prefixCls = 'yee-markdown',
    markdown,
    className,
    rehypePlugins = [],
    remarkPlugins = [],
    escapeHtml = false,
    ...rest
  } = props;

  return (
    <ReactMarkdown
      {...rest}
      className={clsx(prefixCls, 'markdown-body', className)}
      remarkPlugins={[remarkGfm, ...remarkPlugins]}
      rehypePlugins={[
        escapeHtml ? null : rehypeRaw,
        rehypeHighlight,
        ...rehypePlugins,
      ].filter((plugin): plugin is NonNullable<typeof plugin> => Boolean(plugin))}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Markdown;
