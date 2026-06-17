---
category: Components
title: Markdown
subtitle: markdown
group:
  title: Text Format
  order: 3
toc: 'content'
---

# Markdown

Used to render Markdown text.

## Code Demo
<code src="./demo/basic.tsx" title="Basic Usage" description="Markdown text rendering"></code>
<code src="./demo/url.tsx" title="Rewrite URL" description="Rewrite URL"></code>
<code src="./demo/components.tsx" title="Custom HTML Tags" description="Use the <i>components</i> property to customize HTML tags"></code>
<code src="./demo/code.tsx" title="Code Block" description="Use CodeBlock to customize code blocks"></code>

### API

### MarkdownProps

| Property      | Type                                              | Description                        | Default  |
|---------------|---------------------------------------------------|------------------------------------|----------|
| prefixCls     | `string`                                          | Custom class prefix                | -        |
| className     | `string`                                          | Custom root class name             | -        |
| markdown      | `string`                                          | Markdown content                   | -        |
| components    | `Components & Record<string, ReactElement>`       | Custom HTML tag transformation     | -        |
| urlTransform  | `UrlTransform`                                    | URL transformer                    | -        |
| rehypePlugins | `Array<any>`                                      | Plugins for processing HTML        | -        |
| remarkPlugins | `Array<any>`                                      | Plugins for processing text        | -        |
| escapeHtml    | `boolean`                                         | Whether to escape HTML rendering   | `false`  |
