#!/usr/bin/env node

/**
 * 将 yee-x 组件目录下的 index.zh-CN.md 文件复制到 yee-dev-skill/references/yee-x/
 * 并重命名为 ComponentName.md
 *
 * 使用方法：node copy-component-docs.js
 */

const fs = require('fs');
const path = require('path');

// 配置路径
const SOURCE_DIR = path.join(__dirname, '../src');
const TARGET_DIR = path.join(__dirname, '../../yee-dev-skill/references/yee-x');

// 确保目标目录存在
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  console.log('✓ 创建目标目录:', TARGET_DIR);
}

let count = 0;

console.log('开始复制 yee-x 组件文档...\n');

// 读取所有组件目录
const components = fs.readdirSync(SOURCE_DIR).filter((item) => {
  const itemPath = path.join(SOURCE_DIR, item);
  return (
    fs.statSync(itemPath).isDirectory() && item !== 'hooks' && item !== 'utils'
  );
});

/**
 * 解析 markdown 中的 <code src="./demo/xxx.tsx"> 标签，并替换为实际代码
 */
function processCodeTags(content, componentDir) {
  const codeTagRegex =
    /<code\s+src="\.\/demo\/([^"]+)"\s+title="([^"]+)"\s+description="([^"]+)"\s*><\/code>/g;

  return content.replace(
    codeTagRegex,
    (match, demoFile, title, description) => {
      const demoPath = path.join(componentDir, 'demo', demoFile);

      try {
        const codeContent = fs.readFileSync(demoPath, 'utf-8');

        return `### ${title}

${description}

\`\`\`tsx
${codeContent}
\`\`\``;
      } catch (error) {
        console.warn(`  ⚠ 无法读取 demo 文件: ${demoFile}`);
        return match; // 如果文件不存在，保留原标签
      }
    },
  );
}

/**
 * 解析组件文档的 frontmatter 和描述
 */
function parseComponentInfo(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
  const info = {
    title: '',
    description: '',
    group: '',
    firstParagraph: '',
  };

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];

    // 提取 title
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    if (titleMatch) info.title = titleMatch[1].trim();

    // 提取 description
    const descMatch = frontmatter.match(/description:\s*(.+)/);
    if (descMatch) info.description = descMatch[1].trim();

    // 提取 group.title
    const groupMatch = frontmatter.match(/group:\s*\n\s+title:\s*(.+)/);
    if (groupMatch) info.group = groupMatch[1].trim();
  }

  // 提取第一个非空段落（不包括标题）
  const lines = content.split('\n');
  let foundTitle = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (
      foundTitle &&
      line &&
      !line.startsWith('#') &&
      !line.startsWith('---') &&
      !line.startsWith('```') &&
      !line.startsWith('-')
    ) {
      info.firstParagraph = line;
      break;
    }
  }

  return info;
}

/**
 * 生成 INDEX.md 文件
 */
function generateIndex(componentsInfo) {
  // 按分组组织组件
  const groups = {};
  componentsInfo.forEach((info) => {
    const group = info.group || '其他';
    if (!groups[group]) groups[group] = [];
    groups[group].push(info);
  });

  // 定义分组顺序
  const groupOrder = ['AI 组件', '数据展示', '交互组件', '其他'];

  let indexContent = `# yee-x AI 组件文档索引

> 最后更新时间: ${new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
  })}

yee-x 是专为 AI 对话场景设计的 React 组件库，支持流式渲染、Markdown 渲染、代码高亮等功能。

---

## 📊 统计信息

- **组件总数**: ${componentsInfo.length}
- **分组数**: ${Object.keys(groups).length}

---

## 📦 组件列表

`;

  // 按分组生成表格
  groupOrder.forEach((groupName) => {
    if (!groups[groupName]) return;

    indexContent += `### ${groupName}\n\n`;
    indexContent += '| 组件名 | 描述 | 文档 |\n';
    indexContent += '|--------|------|------|\n';

    groups[groupName].forEach((info) => {
      const fileName = `${info.title}.md`;
      const desc = info.description || info.firstParagraph || '暂无描述';
      indexContent += `| ${info.title} | ${desc} | [查看 API](./${fileName}) |\n`;
    });

    indexContent += '\n';
  });

  // 添加核心组件说明
  indexContent += `---

## 🎯 核心组件

### AIRenderer
动态 UI 渲染系统，通过 JSON Schema 生成交互式界面。
- 支持流式渲染和增量更新
- 表单提交后原地显示结果
- 完美集成到对话气泡中
- [查看详细文档](./AIRenderer.md)

### Markdown
高性能 Markdown 渲染组件，支持代码高亮、数学公式、Mermaid 图表。
- 支持 GFM (GitHub Flavored Markdown)
- 代码语法高亮
- 数学公式渲染
- [查看详细文档](./Markdown.md)

### Bubble
对话气泡组件，用于构建聊天界面。
- 支持头像、时间戳、状态显示
- 灵活的布局和样式定制
- [查看详细文档](./Bubble.md)

### Sender
消息发送器组件，支持文本输入、文件上传、快捷键。
- 多行文本输入
- 文件拖拽上传
- 支持快捷键发送
- [查看详细文档](./Sender.md)

---

## 📖 使用方法

### 1. 安装

\`\`\`bash
npm install @rainbow-oh/yee-x
# 或
pnpm add @rainbow-oh/yee-x
\`\`\`

### 2. 导入组件

\`\`\`tsx
import { AIRenderer, Bubble, Markdown } from '@rainbow-oh/yee-x';

// 查看文档：references/yee-x/AIRenderer.md
\`\`\`

### 3. 使用 AIRenderer

\`\`\`tsx
import { StreamingAIRenderer } from '@rainbow-oh/yee-x';

function ChatMessage({ content, isStreaming }) {
  return (
    <StreamingAIRenderer
      content={content}
      isStreaming={isStreaming}
    />
  );
}
\`\`\`

---

## 🔍 快速搜索

### 在 VSCode 中搜索

\`\`\`bash
# 搜索组件文档
Ctrl+P → 输入组件名（如 AIRenderer.md）
\`\`\`

### 使用 Grep 工具

\`\`\`typescript
// 搜索特定属性
Grep({
  path: "yee-dev-skill/references/yee-x",
  pattern: "StreamingAIRenderer",
  output_mode: "content"
})
\`\`\`

---

## 🌟 特色功能

### 1. 流式渲染支持

AIRenderer 支持流式 JSON Schema，可以实现边生成边显示：
\`\`\`tsx
<StreamingAIRenderer
  content={streamingContent}
  isStreaming={true}
/>
\`\`\`

### 2. Markdown 增强

支持代码高亮、数学公式、Mermaid 图表：
\`\`\`tsx
<Markdown content={markdownText} />
\`\`\`

### 3. 对话界面构建

使用 Bubble 和 Sender 快速构建聊天应用：
\`\`\`tsx
<Bubble
  avatar={<Avatar />}
  content={<Markdown content={text} />}
/>
\`\`\`

---

## ⚠️ 注意事项

1. **流式消息格式** - AIRenderer 的流式消息每行必须是有效 JSON
2. **组件 ID 唯一性** - Schema 中的组件 ID 必须唯一
3. **数据绑定** - 使用 \`$data.\` 前缀引用数据
4. **依赖关系** - yee-x 依赖 @rainbow-oh/yee-c 组件库

---

## 📚 相关资源

- [AIRenderer 快速开始](./AIRenderer.md#快速开始)
- [Markdown 配置选项](./Markdown.md#api)
- [Bubble 组件示例](./Bubble.md#代码演示)
- [完整组件列表](#📦-组件列表)

---

**维护者:** Rainbow 前端团队
`;

  return indexContent;
}

const componentsInfo = [];

// 遍历组件目录
components.forEach((componentName) => {
  const zhCNFile = path.join(SOURCE_DIR, componentName, 'index.zh-CN.md');

  // 检查是否存在 index.zh-CN.md 文件
  if (fs.existsSync(zhCNFile)) {
    const targetFile = path.join(TARGET_DIR, `${componentName}.md`);
    const componentDir = path.join(SOURCE_DIR, componentName);

    // 读取文件内容
    let content = fs.readFileSync(zhCNFile, 'utf-8');

    // 解析组件信息
    const info = parseComponentInfo(content);
    // 使用目录名作为文件名和标题（如果 frontmatter 中没有标题）
    info.title = info.title || componentName;
    info.fileName = `${componentName}.md`;
    componentsInfo.push(info);

    // 处理 <code> 标签，替换为实际代码
    content = processCodeTags(content, componentDir);

    // 写入目标文件
    fs.writeFileSync(targetFile, content, 'utf-8');
    count++;
    console.log(`✓ ${componentName} -> ${componentName}.md`);
  }
});

console.log(`\n完成！共复制 ${count} 个组件文档到 ${path.resolve(TARGET_DIR)}`);

// 生成 INDEX.md 文件
console.log('\n生成索引文件...');
const indexContent = generateIndex(componentsInfo);
const indexFile = path.join(TARGET_DIR, 'INDEX.md');
fs.writeFileSync(indexFile, indexContent, 'utf-8');
console.log(`✓ 生成索引文件: ${indexFile}`);
