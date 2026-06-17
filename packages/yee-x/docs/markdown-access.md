# Markdown 文件访问功能

本功能支持通过 URL 后缀和查询参数直接访问 yee-x 组件库的 Markdown 文档。

## 功能特性

### 1. `.md` 后缀支持

可以直接在 URL 后添加 `.md` 后缀来访问文档页面，系统会自动重定向到正确的文档页面。

**示例：**

- `http://localhost:8000/components/markdown.md` → 自动重定向到 `/components/markdown`
- `http://localhost:8000/guide.md` → 自动重定向到 `/guide`

### 2. `?md=raw` 参数支持（**获取原始 Markdown 源文件**）

可以在任意文档 URL 后添加 `?md=raw` 查询参数，直接获取**原始的 Markdown 源文件内容**（纯文本格式）。

**示例：**

- `http://localhost:8000/components/markdown?md=raw` - 返回 `src/Markdown/index.zh-CN.md` 的原始内容
- `http://localhost:8000/guide?md=raw` - 返回 `docs/guide.zh-CN.md` 的原始内容

**返回内容：**

- 原始 Markdown 源文件（包括 frontmatter、代码示例等）
- 自动将 `<code src="./demo/basic.tsx">` 标签替换为实际的代码内容
- `Content-Type: text/plain; charset=utf-8`
- 可直接用于查看、复制或进一步处理

**代码替换效果：**

原始 Markdown：

```markdown
<code src="./demo/basic.tsx" title="基础用法" description="Markdown的基础用法"></code>
```

`?md=raw` 返回：

````
#### 基础用法

Markdown的基础用法

```tsx
import { Markdown } from '@rainbow-oh/yee-x';
import React from 'react';

export default () => {
  const content = '# Hello World\n\n这是示例内容。';
  return <Markdown content={content} />;
};
````

````

## 快速开始

启动开发服务器：

```bash
cd yee-x
npm run dev
````

访问以下 URL 测试功能：

```bash
# .md 后缀（自动重定向）
open http://localhost:8000/components/markdown.md
open http://localhost:8000/guide.md

# ?md=raw 参数（获取原始 Markdown 源文件）
curl "http://localhost:8000/components/markdown?md=raw"
curl "http://localhost:8000/guide?md=raw"

# 在浏览器中查看原始内容
open http://localhost:8000/components/markdown?md=raw
```

## 使用场景

### 分享文档链接

分享文档时可以直接使用带 `.md` 后缀的 URL：

```
https://your-docs.com/components/markdown.md
```

### 获取原始 Markdown 内容

需要引用或复制原始 Markdown 文档时，使用 `?md=raw` 参数：

```bash
# 使用 curl 获取原始内容
curl "https://your-docs.com/components/markdown?md=raw" > markdown-doc.md

# 在脚本中使用
wget "https://your-docs.com/components/markdown?md=raw" -O markdown-doc.md
```

### 技术写作和文档生成

在编写技术文档或博客时，可以直接引用组件库的 Markdown 源文件：

```markdown
查看 [Markdown 组件文档](https://your-docs.com/components/markdown?md=raw) 的完整内容。
```

## 支持的路径格式

| URL 类型 | 示例                          | 对应文件                      |
| -------- | ----------------------------- | ----------------------------- |
| 组件文档 | `/components/markdown?md=raw` | `src/Markdown/index.zh-CN.md` |
| 英文组件 | `/components/markdown?md=raw` | `src/Markdown/index.en-US.md` |
| 中文指南 | `/guide?md=raw`               | `docs/guide.zh-CN.md`         |
| 英文指南 | `/en/guide?md=raw`            | `docs/guide.en-US.md`         |

## 实现原理

- **`.md` 后缀**：通过客户端 JavaScript 检测 URL，自动重定向
- **`?md=raw` 参数**：通过服务器中间件直接读取并返回 Markdown 源文件内容
- **代码标签替换**：自动解析 `<code src="...">` 标签，读取并替换为实际代码内容

## 配置文件

相关配置位于：

- 插件文件：[`.dumi/plugin-md-raw.ts`](./.dumi/plugin-md-raw.ts)
- 配置文件：[`.dumirc.ts`](./.dumirc.ts)

## 注意事项

1. `?md=raw` 返回的是 Markdown 源文件的原始内容，包括所有 frontmatter 和代码块
2. 组件文档优先返回中文版本（`index.zh-CN.md`），如果不存在则返回英文版本（`index.en-US.md`）
3. 代码文件读取失败时会在输出中显示 HTML 注释形式的错误信息
4. 建议在生产环境测试这些功能，确保 URL 路由正常工作
