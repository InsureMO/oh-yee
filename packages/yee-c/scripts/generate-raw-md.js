#!/usr/bin/env node

/**
 * dumi post-build processing: generate raw markdown static files to docs-dist/raw/
 * Enable production ?md=raw parameter support (via client-side redirect to /raw/ path)
 */

const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const SRC_DIR = path.join(CWD, 'src');
const DOCS_DIR = path.join(CWD, 'docs');
const OUTPUT_DIR = path.join(CWD, 'docs-dist', 'raw');

/**
 * Replace <code src="..."> tags in Markdown with actual code content
 */
function replaceCodeTags(markdown, baseDir) {
  const codeTagRegex = /<code\s+src="([^"]+)"(?:[^>]*?)?>(?:<\/code>)?/g;

  return markdown.replace(codeTagRegex, (match, srcPath) => {
    const fullPath = path.join(baseDir, srcPath);

    if (!fs.existsSync(fullPath)) {
      return `\n<!-- Code file not found: ${srcPath} -->\n`;
    }

    try {
      const codeContent = fs.readFileSync(fullPath, 'utf-8');
      const ext = srcPath.split('.').pop();
      const langMap = {
        tsx: 'tsx', jsx: 'jsx', ts: 'ts', js: 'js',
        css: 'css', less: 'less', scss: 'scss', json: 'json', md: 'markdown',
      };
      const lang = langMap[ext || ''] || '';

      let result = '\n';

      const titleMatch = match.match(/title="([^"]*)"/);
      const descMatch = match.match(/description="([^"]*)"/);
      const title = titleMatch ? titleMatch[1] : '';
      const description = descMatch ? descMatch[1] : '';

      if (title || description) {
        result += '#### ' + (title || srcPath) + '\n\n';
        if (description) result += description + '\n\n';
      }

      result += '```' + lang + '\n';
      result += codeContent;
      result += '\n```\n';

      return result;
    } catch (err) {
      return `\n<!-- Failed to read code file: ${srcPath}: ${err.message} -->\n`;
    }
  });
}

function writeRawMd(destPath, srcPath) {
  const dir = path.dirname(destPath);
  fs.mkdirSync(dir, { recursive: true });

  let content = fs.readFileSync(srcPath, 'utf-8');
  content = replaceCodeTags(content, path.dirname(srcPath));
  fs.writeFileSync(destPath, content, 'utf-8');
}

function main() {
  // Clean up old raw directory
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }

  let count = 0;

  // Component docs: src/{Component}/index.zh-CN.md -> raw/components/{name}.md
  const componentsDir = path.join(OUTPUT_DIR, 'components');
  const entries = fs.readdirSync(SRC_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const zhPath = path.join(SRC_DIR, entry.name, 'index.zh-CN.md');
    const enPath = path.join(SRC_DIR, entry.name, 'index.en-US.md');
    const srcPath = fs.existsSync(zhPath) ? zhPath : enPath;

    if (!fs.existsSync(srcPath)) continue;

    const destPath = path.join(componentsDir, entry.name.toLowerCase() + '.md');
    writeRawMd(destPath, srcPath);
    count++;
  }

  // Regular docs: docs/{name}.md -> raw/{name}.md
  if (fs.existsSync(DOCS_DIR)) {
    const docFiles = fs.readdirSync(DOCS_DIR).filter(f => f.endsWith('.md'));
    for (const file of docFiles) {
      const destPath = path.join(OUTPUT_DIR, file);
      writeRawMd(destPath, path.join(DOCS_DIR, file));
      count++;
    }

    // English docs: docs/en/{name}.md -> raw/en/{name}.md
    const enDir = path.join(DOCS_DIR, 'en');
    if (fs.existsSync(enDir)) {
      const enFiles = fs.readdirSync(enDir).filter(f => f.endsWith('.md'));
      for (const file of enFiles) {
        const destPath = path.join(OUTPUT_DIR, 'en', file);
        writeRawMd(destPath, path.join(enDir, file));
        count++;
      }
    }
  }

  console.log(`✅ Generated ${count} raw markdown files in docs-dist/raw/`);
}

main();
