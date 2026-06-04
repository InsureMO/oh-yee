#!/usr/bin/env node

/**
 * yee-c component library doc scanning script
 * Automatically scans index.zh-CN.md for all components under src, generates agents.md navigation file
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const OUTPUT_FILE = path.join(__dirname, '../agents.md');
const DOC_BASE_URL = 'src';

// Component group mapping (sorted by order)
const GROUP_ORDER = {
  '通用': 1,
  '布局': 2,
  '数据录入': 3,
  '数据展示': 4,
  '反馈': 5,
  '导航': 6,
  '其他': 99,
};

/**
 * Parse Markdown frontmatter
 */
function parseFrontmatter(content) {
  // Support both Unix (\n) and Windows (\r\n) line endings
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  // Normalize line endings to \n
  const lines = match[1].split(/\r?\n/);
  let currentSection = null;
  let sectionIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const indent = line.search(/\S/);

    // Handle nested fields like group
    if (currentSection && indent > sectionIndent) {
      const subColonIndex = line.indexOf(':');
      if (subColonIndex !== -1) {
        const subKey = line.slice(0, subColonIndex).trim();
        let subValue = line.slice(subColonIndex + 1).trim();

        // Strip quotes
        if ((subValue.startsWith("'") && subValue.endsWith("'")) ||
            (subValue.startsWith('"') && subValue.endsWith('"'))) {
          subValue = subValue.slice(1, -1);
        }

        frontmatter[currentSection][subKey] = subValue;
      }
      continue;
    }

    // Check if this field has sub-sections (e.g. group:)
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const valuePart = line.slice(colonIndex + 1).trim();

    // If the next line is more indented, this is a nested object
    if (i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const nextIndent = nextLine.search(/\S/);
      if (nextIndent > indent && nextLine.includes(':')) {
        currentSection = key;
        sectionIndent = indent;
        frontmatter[key] = {};
        continue;
      }
    }

    // Regular field
    let value = valuePart;

    // Strip quotes
    if ((value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
    currentSection = null;
  }

  return frontmatter;
}

/**
 * Extract component description (first paragraph content)
 */
function extractDescription(content) {
  // Remove frontmatter (support both Unix and Windows line endings)
  const withoutFrontmatter = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

  // Find the first paragraph after # heading
  const lines = withoutFrontmatter.split(/\r?\n/);
  let foundTitle = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip heading lines
    if (line.startsWith('#')) {
      foundTitle = true;
      continue;
    }

    // Find the first non-empty line after heading
    if (foundTitle && line) {
      return line;
    }
  }

  return '';
}

/**
 * Scan component directories
 */
function scanComponents() {
  const components = [];

  // Read all subdirectories under src
  const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const componentDir = path.join(SRC_DIR, entry.name);
    const docFile = path.join(componentDir, 'index.zh-CN.md');

    // Check if Chinese documentation exists
    if (!fs.existsSync(docFile)) continue;

    const content = fs.readFileSync(docFile, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter || frontmatter.category !== 'Components') continue;

    const description = extractDescription(content);

    components.push({
      name: frontmatter.title,        // Component English name
      subtitle: frontmatter.subtitle,  // Component Chinese name
      group: frontmatter.group?.title || '其他',
      order: parseInt(frontmatter.group?.order) || 99,
      description,
      url: `${DOC_BASE_URL}/${entry.name.toLowerCase()}?md=raw`,
    });
  }

  return components;
}

/**
 * Generate agents.md content
 */
function generateAgentsMd(components) {
  // Group by category
  const grouped = {};
  for (const component of components) {
    if (!grouped[component.group]) {
      grouped[component.group] = [];
    }
    grouped[component.group].push(component);
  }

  // Sort by group order
  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    const orderA = GROUP_ORDER[a] ?? 99;
    const orderB = GROUP_ORDER[b] ?? 99;
    return orderA - orderB;
  });

  let md = `# yee-c 组件库 AI 导航

> 本文件用于 AI Agent 快速索引组件文档
> 最后更新时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

## 📖 使用说明

本文件为 yee-c 组件库的组件索引，方便 AI Agent 快速了解所有可用组件及其文档位置。

- **组件总数**: ${components.length}
- **分组数**: ${sortedGroups.length}
- **文档格式**: Markdown
- **获取方式**: 在文档 URL 后添加 \`?md=raw\` 参数获取原始 Markdown

### 文档 URL 格式

\`\`\`
http://localhost:8000/components/{component-name}?md=raw
\`\`\`

例如，访问 Form 组件的原始文档：
\`\`\`
http://localhost:8000/components/form?md=raw
\`\`\`

---

## 📦 组件列表

`;

  // Generate content for each group
  for (const group of sortedGroups) {
    const groupComponents = grouped[group].sort((a, b) => a.order - b.order);

    md += `### ${group}\n\n`;
    md += '| 组件名 | 中文名 | 描述 | 文档地址 |\n';
    md += '|--------|--------|------|----------|\n';

    for (const component of groupComponents) {
      const name = component.name || '-';
      const subtitle = component.subtitle || '-';
      const desc = (component.description || '-').replace(/\|/g, '\\|').replace(/\n/g, ' ');
      const url = `[文档](${component.url})`;

      md += `| ${name} | ${subtitle} | ${desc} | ${url} |\n`;
    }

    md += '\n';
  }

  return md;
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Scanning yee-c component docs...');

  try {
    const components = scanComponents();
    console.log(`✅ Found ${components.length} components`);

    const content = generateAgentsMd(components);
    fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');

    console.log(`✅ Generated ${OUTPUT_FILE}`);
    console.log('\n📊 Component group statistics:');
    const grouped = {};
    for (const component of components) {
      grouped[component.group] = (grouped[component.group] || 0) + 1;
    }
    for (const [group, count] of Object.entries(grouped)) {
      console.log(`   ${group}: ${count} components`);
    }
  } catch (error) {
    console.error('❌ Generation failed:', error.message);
    process.exit(1);
  }
}

main();
