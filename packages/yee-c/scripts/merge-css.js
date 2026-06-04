#!/usr/bin/env node

/**
 * Process CSS variable files:
 * 1. Copy src/style/*.css as-is to dist/esm/style/ and dist/cjs/style/
 * 2. Merge default files to generate variables.css
 * 3. Merge theme files to generate themes.css
 */

const fs = require('fs');
const path = require('path');

const srcStyleDir = path.join(__dirname, '../src/style');
const distEsmStyleDir = path.join(__dirname, '../dist/esm/style');
const distCjsStyleDir = path.join(__dirname, '../dist/cjs/style');

const cssFiles = ['color.css', 'size.css', 'zindex.css'];

const themeFiles = fs.readdirSync(srcStyleDir)
  .filter(f => f.startsWith('color.') && f.endsWith('.css') && f !== 'color.css')
  .sort();

const allFiles = [...cssFiles, ...themeFiles];

console.log('🎨 Processing CSS variable files...\n');

[distEsmStyleDir, distCjsStyleDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const defaultContents = [];
const themeContents = [];

allFiles.forEach((filename) => {
  const srcPath = path.join(srcStyleDir, filename);

  if (fs.existsSync(srcPath)) {
    const content = fs.readFileSync(srcPath, 'utf8');

    if (cssFiles.includes(filename)) {
      defaultContents.push(`/* ========== ${filename} ========== */\n${content}`);
    } else {
      themeContents.push(`/* ========== ${filename} ========== */\n${content}`);
    }

    fs.copyFileSync(srcPath, path.join(distEsmStyleDir, filename));
    fs.copyFileSync(srcPath, path.join(distCjsStyleDir, filename));

    console.log(`  ✅ Copied: ${filename}`);
  } else {
    console.warn(`  ⚠️  File not found: ${filename}`);
  }
});

const banner = `/*!
 * @oh/yee-c CSS Variables
 * Auto-generated, do not edit manually
 * Generated on ${new Date().toISOString()}
 */

`;

// variables.css: default theme + size + zindex
fs.writeFileSync(path.join(distEsmStyleDir, 'variables.css'), banner + defaultContents.join('\n\n'));
fs.writeFileSync(path.join(distCjsStyleDir, 'variables.css'), banner + defaultContents.join('\n\n'));
console.log('  ✅ Generated: variables.css (default theme)');

// themes.css: all themes
if (themeContents.length > 0) {
  fs.writeFileSync(path.join(distEsmStyleDir, 'themes.css'), banner + themeContents.join('\n\n'));
  fs.writeFileSync(path.join(distCjsStyleDir, 'themes.css'), banner + themeContents.join('\n\n'));
  console.log('  ✅ Generated: themes.css (all themes)');
}

console.log('\n🎉 Processing complete!');
