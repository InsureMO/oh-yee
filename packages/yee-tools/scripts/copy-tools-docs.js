#!/usr/bin/env node

/**
 * 将 yee-tools 的工具函数 TypeScript 文件转换为 Markdown 文档
 * 并复制到 yee-dev-skill/references/yee-tools/
 *
 * 使用方法：node copy-tools-docs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置路径
const SOURCE_DIR = path.join(__dirname, '../src');
const TARGET_DIR = path.join(__dirname, '../../yee-dev-skill/references/yee-tools');

// 确保目标目录存在
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  console.log('✓ 创建目标目录:', TARGET_DIR);
}

let count = 0;

console.log('开始生成 yee-tools 工具文档...\n');

/**
 * 解析 TypeScript 文件内容
 */
function parseTypeScriptContent(content, filePath) {
  const result = {
    description: '',
    functions: [],
    constants: [],
    classes: []
  };

  const lines = content.split('\n');
  let i = 0;

  // 提取文件开头的模块级注释
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === '' || line.startsWith('//')) {
      i++;
      continue;
    }
    if (line.startsWith('/**')) {
      const jsdocLines = [line];
      i++;
      while (i < lines.length && !lines[i].includes('*/')) {
        jsdocLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        jsdocLines.push(lines[i]);
        const jsdocText = jsdocLines.join('\n');
        const jsdocInfo = parseJSDoc(jsdocText);
        result.description = jsdocInfo.description;
        i++;
      }
      break;
    }
    break;
  }

  // 重置 i，重新遍历
  i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();

    // 查找 JSDoc 注释开始
    if (line.startsWith('/**')) {
      const jsdocLines = [line];
      i++;

      // 读取完整的 JSDoc
      while (i < lines.length && !lines[i].includes('*/')) {
        jsdocLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        jsdocLines.push(lines[i]); // 添加 */
        const jsdocText = jsdocLines.join('\n');

        // 下一行应该是 export
        i++;
        if (i < lines.length) {
          const exportLine = lines[i];

          // 检查是否是常量
          if (exportLine.includes('export const')) {
            const constMatch = exportLine.match(/export\s+const\s+(\w+)\s*=\s*(.+)/);
            if (constMatch) {
              const constInfo = parseJSDoc(jsdocText);
              result.constants.push({
                name: constMatch[1],
                value: constMatch[2].trim(),
                description: constInfo.description
              });
            }
          }
          // 检查是否是函数
          else if (exportLine.includes('export function') || exportLine.includes('export async function')) {
            // 读取完整的函数签名（可能跨多行）
            let signature = exportLine;
            i++;
            while (i < lines.length && !lines[i].includes('{') && !lines[i].includes('}')) {
              signature += '\n' + lines[i];
              i++;
            }

            // 解析函数签名
            const funcMatch = signature.match(/export\s+(?:async\s+)?function\s+(\w+)\s*(?:<[^>]*>)?\s*\(([\s\S]*?)\)\s*(?::\s*([^{]+))?/);
            if (funcMatch) {
              const funcInfo = parseJSDoc(jsdocText);
              result.functions.push({
                name: funcMatch[1],
                params: funcMatch[2] ? funcMatch[2].trim() : '',
                returnType: funcMatch[3] ? funcMatch[3].trim() : 'void',
                description: funcInfo.description,
                paramDetails: funcInfo.params,
                returns: funcInfo.returns,
                examples: funcInfo.examples
              });
            }
          }
          // 检查是否是类
          else if (exportLine.includes('export class')) {
            const classMatch = exportLine.match(/export\s+class\s+(\w+)/);
            if (classMatch) {
              const classInfo = parseJSDoc(jsdocText);
              result.classes.push({
                name: classMatch[1],
                description: classInfo.description
              });
            }
          }
        }
      }
    }
    i++;
  }

  return result;
}

/**
 * 解析 JSDoc 注释
 */
function parseJSDoc(jsdocText) {
  const result = {
    description: '',
    params: [],
    returns: null,
    examples: []
  };

  // 清理 JSDoc 标记
  let cleanText = jsdocText
    .replace(/^\/\*\*\s*/, '')
    .replace(/\s*\*\/$/, '')
    .trim();

  const lines = cleanText
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim());

  let currentSection = 'description';
  let exampleCode = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('@param')) {
      currentSection = 'param';
      const paramMatch = line.match(/@param\s+(?:\{([^}]+)\}\s+)?(\S+)\s*-?\s*(.*)/);
      if (paramMatch) {
        result.params.push({
          type: paramMatch[1] || 'any',
          name: paramMatch[2],
          description: paramMatch[3] || ''
        });
      }
    } else if (line.startsWith('@returns')) {
      currentSection = 'returns';
      const returnMatch = line.match(/@returns?\s+(?:\{([^}]+)\}\s*-?\s*(.*))/);
      if (returnMatch) {
        result.returns = {
          type: returnMatch[1] || 'any',
          description: returnMatch[2] || ''
        };
      }
    } else if (line.startsWith('@example')) {
      currentSection = 'example';
    } else if (line.startsWith('```')) {
      if (currentSection === 'example') {
        exampleCode.push(line);
        currentSection = 'code';
      } else {
        currentSection = 'description';
      }
    } else if (currentSection === 'code') {
      if (line.startsWith('```')) {
        currentSection = 'example';
      } else {
        exampleCode.push(line);
      }
    } else {
      if (currentSection === 'description' && line && !line.startsWith('@')) {
        result.description += (result.description ? '\n' : '') + line;
      }
    }
  }

  result.examples = exampleCode.join('\n');
  return result;
}

/**
 * 生成 Markdown 文档
 */
function generateMarkdown(category, moduleName, parsed) {
  // 转换模块名 (string-utils -> StringUtils)
  const exportName = moduleName
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  let md = `# ${exportName}\n\n`;

  if (parsed.description) {
    md += `${parsed.description}\n\n`;
  }

  md += `**所属分类**: ${category}\n\n`;
  md += `**导入方式**:\n\n`;
  md += `\`\`\`typescript\n`;
  md += `import { ${exportName} } from '@rainbow-oh/yee-tools';\n`;
  md += `\`\`\`\n\n`;
  md += `---\n\n`;

  // 添加常量
  if (parsed.constants.length > 0) {
    md += `## 常量\n\n`;
    parsed.constants.forEach(constant => {
      md += `### ${constant.name}\n\n`;
      if (constant.description) {
        md += `${constant.description}\n\n`;
      }
      md += `\`\`\`typescript\n`;
      md += `export const ${constant.name} = ${constant.value};\n`;
      md += `\`\`\`\n\n`;
    });
  }

  // 添加函数
  if (parsed.functions.length > 0) {
    md += `## 函数列表\n\n`;
    parsed.functions.forEach(func => {
      md += `### ${func.name}\n\n`;

      if (func.description) {
        md += `${func.description}\n\n`;
      }

      // 函数签名
      md += `**函数签名**:\n\n`;
      md += `\`\`\`typescript\n`;
      md += `function ${func.name}(${func.params}): ${func.returnType}\n`;
      md += `\`\`\`\n\n`;

      // 参数说明
      if (func.paramDetails.length > 0) {
        md += `**参数**:\n\n`;
        md += `| 参数名 | 类型 | 描述 |\n`;
        md += `|--------|------|------|\n`;
        func.paramDetails.forEach(param => {
          md += `| ${param.name} | \`${param.type}\` | ${param.description || '-'} |\n`;
        });
        md += `\n`;
      }

      // 返回值说明
      if (func.returns) {
        md += `**返回值**: \`${func.returns.type}\` - ${func.returns.description || '-'}\n\n`;
      }

      // 示例代码
      if (func.examples && func.examples.length > 0) {
        md += `**示例**:\n\n`;
        md += `${func.examples}\n`;
      } else if (func.examples) {
        md += `**示例**:\n\n`;
        md += `\`\`\`ts\n`;
        md += `// 暂无示例\n`;
        md += `\`\`\`\n`;
      }

      md += `---\n\n`;
    });
  }

  // 添加类
  if (parsed.classes.length > 0) {
    md += `## 类\n\n`;
    parsed.classes.forEach(cls => {
      md += `### ${cls.name}\n\n`;
      if (cls.description) {
        md += `${cls.description}\n\n`;
      }
      md += `---\n\n`;
    });
  }

  return md;
}

/**
 * 生成索引文件
 */
function generateIndex(categories) {
  let indexContent = `# yee-tools 工具函数库文档索引

> 最后更新时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

yee-tools 是 Moo 前端的工具函数库，提供常用的工具函数和类型定义。

---

## 📊 统计信息

- **工具分类数**: ${Object.keys(categories).length}
- **工具模块数**: ${Object.values(categories).reduce((acc, arr) => acc + arr.length, 0)}

---

## 📦 工具分类

`;

  Object.keys(categories).sort().forEach(category => {
    indexContent += `### ${category}\n\n`;
    indexContent += `| 工具模块 | 描述 | 文档 |\n`;
    indexContent += `|----------|------|------|\n`;

    categories[category].forEach(tool => {
      indexContent += `| ${tool.name} | ${tool.description || '暂无描述'} | [查看 API](./${tool.fileName}) |\n`;
    });

    indexContent += '\n';
  });

  indexContent += `---

## 📖 使用方法

### 1. 安装

\`\`\`bash
npm install @rainbow-oh/yee-tools
# 或
pnpm add @rainbow-oh/yee-tools
\`\`\`

### 2. 导入工具函数

\`\`\`typescript
// 导入整个模块
import { StringUtils } from '@rainbow-oh/yee-tools';
const trimmed = StringUtils.trim('  hello  ');

// 按分类导入
import { DateUtils, ArrayUtils } from '@rainbow-oh/yee-tools';
\`\`\`

### 3. 使用示例

\`\`\`typescript
import { ArrayUtils, DateUtils } from '@rainbow-oh/yee-tools';

// 数组去重
const unique = ArrayUtils.unique([1, 2, 2, 3, 3, 4]);
console.log(unique); // [1, 2, 3, 4]

// 获取当前时间
const now = DateUtils.getCurrentDateTime();
console.log(now); // '2024-01-15 14:30:00'
\`\`\`

---

## 🎯 按场景查找

### 字符串处理
- **StringUtils** - trim, isEmpty, isNotEmpty, mask

### 数组处理
- **ArrayUtils** - unique, chunk, isRepeat

### 日期处理
- **DateUtils** - getCurrentDateTime, formatStringToDate, add

### 网络请求
- **FetchUtils** - HTTP 请求和拦截器

### URL 处理
- **UrlUtils** - URL 解析和构建

### 数据缓存
- **SessionContext** - Session 缓存
- **PageContext** - 页面级缓存
- **LocalContext** - LocalStorage 缓存

---

## ⚠️ 注意事项

1. **模块化导入** - 推荐按模块导入（如 \`StringUtils\`）而不是单个函数
2. **Tree Shaking** - 使用 ES Module 导入以支持 Tree Shaking
3. **类型支持** - 所有工具函数都有完整的 TypeScript 类型定义
4. **单元测试** - 所有工具函数都有对应的单元测试

---

**维护者:** Moo 前端团队
`;

  return indexContent;
}

// 工具分类映射
const categoryMap = {
  'string': '字符串处理',
  'number': '数字处理',
  'date': '日期处理',
  'array': '数组处理',
  'object': '对象处理',
  'security': '安全工具',
  'cookie': 'Cookie 工具',
  'type': '类型工具',
  'url': 'URL 处理',
  'common': '通用工具',
  'i18n': '国际化',
  'fetch': '网络请求',
  'cache': '缓存工具',
  'config': '配置工具',
  'codetable': '代码表工具'
};

const categories = {};

// 查找所有工具模块目录
const dirs = fs.readdirSync(SOURCE_DIR).filter(item => {
  const itemPath = path.join(SOURCE_DIR, item);
  return fs.statSync(itemPath).isDirectory() && !item.startsWith('__') && !item.startsWith('.');
});

dirs.forEach(item => {
  const itemPath = path.join(SOURCE_DIR, item);

  // 查找目录下的主文件
  const possibleFiles = [
    path.join(itemPath, `${item}-utils.ts`),
    path.join(itemPath, `${item}-context.ts`),
    path.join(itemPath, `${item}-provider.ts`),
    path.join(itemPath, `index.ts`)
  ];

  let mainFile = null;
  for (const file of possibleFiles) {
    if (fs.existsSync(file)) {
      mainFile = file;
      break;
    }
  }

  if (mainFile && fs.existsSync(mainFile)) {
    try {
      const content = fs.readFileSync(mainFile, 'utf-8');
      const parsed = parseTypeScriptContent(content, mainFile);
      const moduleName = path.basename(mainFile, '.ts');
      const category = categoryMap[item] || '其他';

      // 生成 Markdown
      const markdown = generateMarkdown(category, moduleName, parsed);
      const targetFile = path.join(TARGET_DIR, `${moduleName}.md`);

      fs.writeFileSync(targetFile, markdown, 'utf-8');

      // 添加到分类
      if (!categories[category]) {
        categories[category] = [];
      }

      const exportName = moduleName
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

      categories[category].push({
        name: exportName,
        fileName: `${moduleName}.md`,
        description: parsed.description.split('\n')[0]
      });

      count++;
      console.log(`✓ ${moduleName} -> ${moduleName}.md`);
    } catch (error) {
      console.error(`✗ 处理 ${item} 时出错:`, error.message);
    }
  }
});

console.log(`\n完成！共生成 ${count} 个工具文档到 ${path.resolve(TARGET_DIR)}`);

// 生成索引文件
if (Object.keys(categories).length > 0) {
  console.log('\n生成索引文件...');
  const indexContent = generateIndex(categories);
  const indexFile = path.join(TARGET_DIR, 'INDEX.md');
  fs.writeFileSync(indexFile, indexContent, 'utf-8');
  console.log(`✓ 生成索引文件: ${indexFile}`);
}
