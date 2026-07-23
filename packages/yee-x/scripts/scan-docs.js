#!/usr/bin/env node

/**
 * yee-x component docs scanner
 * Scans index.en-US.md under src/ and generates agents.md for AI Agent navigation
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');
const OUTPUT_FILE = path.join(__dirname, '../agents.md');
const GITHUB_BASE_URL =
  'https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src';

const GROUP_ORDER = {
  Core: 1,
  'Text Format': 2,
  'UI Components': 3,
  Interaction: 4,
  Tools: 5,
  Other: 99,
};

/**
 * Parse Markdown frontmatter
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split(/\r?\n/);
  let currentSection = null;
  let sectionIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const indent = line.search(/\S/);

    if (line.trim() === '') continue;

    if (currentSection && indent > sectionIndent) {
      const subColonIndex = line.indexOf(':');
      if (subColonIndex !== -1) {
        const subKey = line.slice(0, subColonIndex).trim();
        let subValue = line.slice(subColonIndex + 1).trim();

        if (
          (subValue.startsWith("'") && subValue.endsWith("'")) ||
          (subValue.startsWith('"') && subValue.endsWith('"'))
        ) {
          subValue = subValue.slice(1, -1);
        }

        if (frontmatter[currentSection]) {
          frontmatter[currentSection][subKey] = subValue;
        }
      }
      continue;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const valuePart = line.slice(colonIndex + 1).trim();

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

    let value = valuePart;

    if (
      (value.startsWith("'") && value.endsWith("'")) ||
      (value.startsWith('"') && value.endsWith('"'))
    ) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
    currentSection = null;
  }

  return frontmatter;
}

/**
 * Extract component description (first paragraph after title)
 */
function extractDescription(content) {
  const withoutFrontmatter = content.replace(
    /^---\r?\n[\s\S]*?\r?\n---\r?\n/,
    '',
  );

  const lines = withoutFrontmatter.split(/\r?\n/);
  let foundTitle = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('#')) {
      foundTitle = true;
      continue;
    }

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

  const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const componentDir = path.join(SRC_DIR, entry.name);
    const docFile = path.join(componentDir, 'index.en-US.md');

    if (!fs.existsSync(docFile)) continue;

    const content = fs.readFileSync(docFile, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter || frontmatter.category !== 'Components') continue;

    const description = extractDescription(content);

    components.push({
      name: frontmatter.title,
      subtitle: frontmatter.subtitle,
      group: frontmatter.group?.title || 'Other',
      order: parseInt(frontmatter.group?.order) || 99,
      dirName: entry.name,
      description,
      url: `${GITHUB_BASE_URL}/${entry.name}/index.en-US.md`,
    });
  }

  return components;
}

/**
 * Generate agents.md content
 */
function generateAgentsMd(components) {
  const grouped = {};
  for (const component of components) {
    if (!grouped[component.group]) {
      grouped[component.group] = [];
    }
    grouped[component.group].push(component);
  }

  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    const orderA = GROUP_ORDER[a] ?? 99;
    const orderB = GROUP_ORDER[b] ?? 99;
    return orderA - orderB;
  });

  let md = `# yee-x Component Library AI Navigation

> Last updated: ${new Date().toISOString()}

## Overview

This file is a component index for the yee-x library, helping AI Agents quickly discover all available components and their documentation.

- **Components**: ${components.length}
- **Groups**: ${sortedGroups.length}
- **Doc format**: Markdown

### Doc URL Format

\`\`\`
https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/{ComponentName}/index.en-US.md
\`\`\`

Example - Markdown component docs:
\`\`\`
https://github.com/insureMO/oh-yee/blob/main/packages/yee-x/src/Markdown/index.en-US.md
\`\`\`

---

## Components

`;

  for (const group of sortedGroups) {
    const groupComponents = grouped[group].sort((a, b) => a.order - b.order);

    md += `### ${group}\n\n`;
    md += '| Component | Subtitle | Description | Docs |\n';
    md += '|-----------|----------|-------------|------|\n';

    for (const component of groupComponents) {
      const name = component.name || '-';
      const subtitle = component.subtitle || '-';
      const desc = (component.description || '-')
        .replace(/\|/g, '\\|')
        .replace(/\n/g, ' ');
      const url = `[Docs](${component.url})`;

      md += `| ${name} | ${subtitle} | ${desc} | ${url} |\n`;
    }

    md += '\n';
  }

  return md;
}

/**
 * Main
 */
function main() {
  console.log('Scanning yee-x component docs...');

  try {
    const components = scanComponents();
    console.log(`Found ${components.length} components`);

    const content = generateAgentsMd(components);
    fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');

    console.log(`Generated ${OUTPUT_FILE}`);
    console.log('\nGroup stats:');
    const grouped = {};
    for (const component of components) {
      grouped[component.group] = (grouped[component.group] || 0) + 1;
    }
    for (const [group, count] of Object.entries(grouped)) {
      console.log(`   ${group}: ${count}`);
    }
  } catch (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }
}

main();
