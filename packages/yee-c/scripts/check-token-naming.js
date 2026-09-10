#!/usr/bin/env node

/**
 * Token 命名规范校验
 *
 * 规范:组件级 CSS 变量的前缀必须等于该组件的 CSS 类前缀。
 *   .yee-range-picker  ->  --yee-range-picker-*
 *   .yee-input-number  ->  --yee-input-number-*
 * 这样「看到 token 就知道属于哪个组件」,也避免同一组件出现 rangepicker /
 * range-picker 两种拼法。
 *
 * 校验逻辑:
 *   1. 从组件源码收集权威类前缀(tsx/ts 里的 prefixCls 默认值、less 里的
 *      @pls 定义、以及 less/css 里出现的字面类名 .yee-xxx)。
 *   2. 读取 src/style/{color,size,zindex}.css 里定义的所有 --yee-* token。
 *   3. 跳过全局(非组件)前缀白名单,跳过 deprecated 兼容别名段。
 *   4. 剩下的每个 token,必须能匹配到某个类前缀,否则报错。
 *
 * 用法: node scripts/check-token-naming.js
 * 退出码: 0 通过 / 1 有不合规 token
 */

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '../src');
const STYLE_FILES = ['color.css', 'size.css', 'zindex.css'];

/** 全局(非组件)token 前缀:语义色、层级、字体、通用圆角与浮层等 */
const GLOBAL_PREFIXES = [
  'color',
  'z-index',
  'global',
  'font-family',
  'radius',
  'popup',
  'box-shadow',
  'mask',
  'remove-icon',
  'close-icon',
  'placement-arrow',
  'title-prefix',
  'tab-active-border-color',
  'filter-menu',
  'placeholder',
];

/**
 * 已知待处理的历史遗留,允许暂时存在。
 * 每条都必须写清原因和后续计划,清空即为目标。
 */
const ALLOWLIST = [
  // Switch 组件的 token 用了 switchbox- 前缀(类名是 .yee-switch)。
  // 直译会得到 --yee-switch-switch-*,与已有 --yee-switch-* 语义重叠,
  // 需要重新设计命名(如 --yee-switch-handle-bg-color);且其中 17/20 已是
  // 死 token。留待专项处理。
  'switchbox',
  // Calendar / TimePicker 组件目前不存在(源码中无对应目录与类名),
  // 这些 token 无任何消费方,属历史残留,待确认后删除。
  'calendar',
  'time-picker',
  // 零散历史 token,无对应组件,无消费方,待确认后删除。
  'top-count',
  'suffix-counter',
  'icon-success',
  'icon-info',
  'icon-warning',
  'icon-danger',
];

function walk(dir, exts, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walk(p, exts, acc);
    } else if (exts.some((e) => name.endsWith(e))) {
      acc.push(p);
    }
  }
  return acc;
}

/** 1. 收集权威类前缀 */
function collectClassPrefixes() {
  const prefixes = new Set();
  for (const f of walk(SRC, ['.ts', '.tsx'])) {
    const txt = fs.readFileSync(f, 'utf8');
    for (const m of txt.matchAll(
      /prefixCls[a-zA-Z]*\s*=\s*'(yee-[a-z0-9-]+)'/g,
    )) {
      prefixes.add(m[1]);
    }
  }
  for (const f of walk(SRC, ['.less', '.css'])) {
    const txt = fs.readFileSync(f, 'utf8');
    for (const m of txt.matchAll(
      /@[a-zA-Z]*[Pp]refix[Cc]ls\s*:\s*\.(yee-[a-z0-9-]+)/g,
    )) {
      prefixes.add(m[1]);
    }
    for (const m of txt.matchAll(/@pls\s*:\s*\.(yee-[a-z0-9-]+)/g)) {
      prefixes.add(m[1]);
    }
    for (const m of txt.matchAll(/\.(yee-[a-z0-9-]+)/g)) {
      prefixes.add(m[1]);
    }
  }
  return prefixes;
}

/** 2. 收集已定义 token,跳过 deprecated 别名段 */
function collectTokens() {
  const tokens = [];
  for (const fn of STYLE_FILES) {
    const p = path.join(SRC, 'style', fn);
    if (!fs.existsSync(p)) continue;
    let skipping = false;
    fs.readFileSync(p, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        if (line.includes('deprecated-aliases:start')) {
          skipping = true;
          return;
        }
        if (line.includes('deprecated-aliases:end')) {
          skipping = false;
          return;
        }
        if (skipping) return;
        const m = line.match(/^\s*(--yee-[a-z0-9-]+)\s*:/);
        if (m) tokens.push({ name: m[1], file: fn, line: i + 1 });
      });
  }
  return tokens;
}

function startsWithSeg(rest, key) {
  return rest === key || rest.startsWith(key + '-');
}

function main() {
  const classPrefixes = collectClassPrefixes();
  const tokens = collectTokens();
  const classKeys = [...classPrefixes].map((c) => c.slice('yee-'.length));

  const offenders = [];
  for (const t of tokens) {
    const rest = t.name.slice('--yee-'.length);
    if (GLOBAL_PREFIXES.some((g) => startsWithSeg(rest, g))) continue;
    if (ALLOWLIST.some((a) => startsWithSeg(rest, a))) continue;
    if (classKeys.some((k) => startsWithSeg(rest, k))) continue;
    offenders.push(t);
  }

  console.log('🔎 Token 命名规范校验');
  console.log(
    `   权威类前缀 ${classPrefixes.size} 个,受检 token ${tokens.length} 个`,
  );
  console.log(
    `   全局前缀白名单 ${GLOBAL_PREFIXES.length} 条,历史遗留 allowlist ${ALLOWLIST.length} 条`,
  );

  if (offenders.length === 0) {
    console.log('\n✅ 全部 token 前缀均可对应到组件 CSS 类前缀');
    return;
  }

  console.error(
    `\n❌ 发现 ${offenders.length} 个 token 的前缀无法对应任何组件类前缀:\n`,
  );
  const byPrefix = new Map();
  for (const t of offenders) {
    const key = t.name.split('-').slice(0, 4).join('-');
    if (!byPrefix.has(key)) byPrefix.set(key, []);
    byPrefix.get(key).push(t);
  }
  for (const [key, items] of [...byPrefix].sort()) {
    console.error(`   ${key}-*  (${items.length} 个)`);
    for (const t of items) {
      console.error(`      ${t.name}   ${t.file}:${t.line}`);
    }
  }
  console.error(
    '\n修复方式(任选其一):\n' +
      '  1. 把 token 前缀改成组件真实的 CSS 类前缀(推荐),并在 color.css /\n' +
      '     size.css 的 deprecated-aliases 段加旧名 -> 新名的兼容别名;\n' +
      '  2. 若确为全局(非组件)token,加入本脚本的 GLOBAL_PREFIXES;\n' +
      '  3. 若为暂不处理的历史遗留,加入 ALLOWLIST 并写明原因与后续计划。\n',
  );
  process.exit(1);
}

main();
