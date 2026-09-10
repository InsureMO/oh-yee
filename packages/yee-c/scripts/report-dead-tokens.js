#!/usr/bin/env node

/**
 * 死 token 盘点(只报告,不改动)
 *
 * 死 token = 在 src/style/{color,size,zindex}.css 里定义了,但整个 src 下
 * 没有任何地方通过 var(--xxx) 使用它。
 *
 * 消费方统计范围:
 *   - 组件 less / css(含 src/style/mobile.css 与各预置主题 color.*.css)
 *   - tsx / ts 里的内联 var() 与 setProperty()
 *
 * deprecated 兼容别名段里的定义会被跳过 —— 它们本来就只给下游用,
 * 组件内部不引用是预期行为。
 *
 * 用法: node scripts/report-dead-tokens.js [--json]
 * 始终以 0 退出(纯报告)。
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '../src');
const DEF_FILES = ['color.css', 'size.css', 'zindex.css'];

function walk(dir, exts, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, exts, acc);
    else if (exts.some((e) => name.endsWith(e))) acc.push(p);
  }
  return acc;
}

/** 定义:跳过 deprecated 别名段 */
function collectDefined() {
  const defined = new Map();
  for (const fn of DEF_FILES) {
    const p = path.join(SRC, 'style', fn);
    if (!fs.existsSync(p)) continue;
    let skipping = false;
    fs.readFileSync(p, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        if (line.includes('deprecated-aliases:start'))
          return void (skipping = true);
        if (line.includes('deprecated-aliases:end'))
          return void (skipping = false);
        if (skipping) return;
        const m = line.match(/^\s*(--yee-[a-z0-9-]+)\s*:/);
        if (m && !defined.has(m[1])) defined.set(m[1], `${fn}:${i + 1}`);
      });
  }
  return defined;
}

/** 消费:var(--x) 或 setProperty('--x', ...) */
function collectUsed() {
  const used = new Map();
  const files = walk(SRC, ['.less', '.css', '.ts', '.tsx']);
  for (const f of files) {
    const rel = path.relative(SRC, f);
    // 定义文件自身的「定义」不算消费,但它内部的 var() 引用算
    const txt = fs.readFileSync(f, 'utf8');
    for (const m of txt.matchAll(/var\(\s*(--yee-[a-z0-9-]+)/g)) {
      if (!used.has(m[1])) used.set(m[1], new Set());
      used.get(m[1]).add(rel);
    }
    for (const m of txt.matchAll(/setProperty\(\s*['"`](--yee-[a-z0-9-]+)/g)) {
      if (!used.has(m[1])) used.set(m[1], new Set());
      used.get(m[1]).add(rel);
    }
  }
  return used;
}

const defined = collectDefined();
const used = collectUsed();

const dead = [...defined.entries()].filter(([name]) => !used.has(name));

// 按前缀(前 3 段)归组
const groups = new Map();
for (const [name, where] of dead) {
  const key = name.split('-').slice(0, 4).join('-');
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push({ name, where });
}

if (process.argv.includes('--json')) {
  console.log(
    JSON.stringify(
      { definedCount: defined.size, deadCount: dead.length, dead },
      null,
      2,
    ),
  );
  process.exit(0);
}

console.log('🪦 死 token 盘点(定义了但无任何 var() 消费)');
console.log(
  `   受检定义 ${defined.size} 个,其中死 token ${dead.length} 个 (${((dead.length / defined.size) * 100).toFixed(1)}%)\n`,
);

for (const [key, items] of [...groups].sort(
  (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]),
)) {
  console.log(`   ${key}-*   ${items.length} 个`);
  for (const it of items) console.log(`      ${it.name}   [${it.where}]`);
}
console.log('\n说明:死 token 不影响运行,但会误导使用方(以为改了能生效)。');
console.log('建议按组件逐个确认:接进 less,或删除。');
