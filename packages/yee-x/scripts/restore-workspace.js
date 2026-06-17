#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
const backupPath = path.join(__dirname, '..', '.workspace-backup.json');

if (!fs.existsSync(backupPath)) {
  console.log('No workspace backup found, nothing to restore.');
  process.exit(0);
}

const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

let changed = false;
for (const [key, version] of Object.entries(backup)) {
  const [section, name] = [key.split(':')[0], key.slice(key.indexOf(':') + 1)];
  if (pkg[section] && pkg[section][name]) {
    pkg[section][name] = version;
    console.log(`  ${name}: restored → ${version}`);
    changed = true;
  }
}

if (changed) {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  fs.unlinkSync(backupPath);
  console.log('Done. workspace:^ restored, backup removed.');
} else {
  fs.unlinkSync(backupPath);
  console.log('Nothing to restore.');
}
