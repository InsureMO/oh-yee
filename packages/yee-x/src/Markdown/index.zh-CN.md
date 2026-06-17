---
category: Components
title: Markdown
subtitle: markdown
group:
  title: 文本格式
  order: 3
toc: 'content'
---

# Markdown 

用于渲染Markdown文本

## 代码演示
<code src="./demo/basic.tsx" title="基础使用" description="markdown文本渲染"></code>
<code src="./demo/url.tsx" title="重写url" description="重写url"></code>
<code src="./demo/components.tsx" title="重写html标签" description="使用<i>components</i>属性重写html标签"></code>
<code src="./demo/code.tsx" title="代码块" description="使用CodeBlock重写代码块"></code>

### API

### MarkdownProps

| 属性名         | 类型                                              | 描述               | 默认值  |
|---------------|---------------------------------------------------|--------------------|---------|
| prefixCls     | `string`                                          | 自定义类名前缀      | -       |
| className     | `string`                                          | 自定义根类名        | -       |
| markdown      | `string`                                          | markdown内容       | -       |
| components    | `Components & Record<string, ReactElement>`       | 自定义html标签转换  | -       |
| urlTransform  | `UrlTransform`                                    | url转换器          | -       |
| rehypePlugins | `Array<any>`                                      | 处理html的插件列表  | -       |
| remarkPlugins | `Array<any>`                                      | 处理文本的插件列表  | -       |
| escapeHtml    | `boolean`                                         | 是否不渲染html      | `false` |