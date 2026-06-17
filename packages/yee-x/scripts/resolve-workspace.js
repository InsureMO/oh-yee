#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim();
const pkgPath = path.join(repoRoot, 'yee-x', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const backup = {};

function resolveWorkspace(deps, section) {
  if (!deps) return false;
  let changed = false;
  for (const [name, version] of Object.entries(deps)) {
    if (typeof version === 'string' && version.startsWith('workspace:')) {
      const range = version.replace('workspace:', '') || '*';
      const depPkgPath = path.join(repoRoot, name.split('/')[1], 'package.json');
      if (fs.existsSync(depPkgPath)) {
        const depVersion = JSON.parse(fs.readFileSync(depPkgPath, 'utf8')).version;
        const prefix = range === '*' ? '' : range;
        backup[`${section}:${name}`] = version;
        deps[name] = prefix + depVersion;
        console.log(`  ${name}: ${version} → ${deps[name]}`);
        changed = true;
      } else {
        console.warn(`  ⚠ ${name}: not found at ${depPkgPath}`);
      }
    }
  }
  return changed;
}

let changed = false;
console.log('Resolving workspace dependencies...');
if (resolveWorkspace(pkg.dependencies, 'dependencies')) changed = true;
if (resolveWorkspace(pkg.devDependencies, 'devDependencies')) changed = true;

if (changed) {
  const backupPath = path.join(repoRoot, 'yee-x', '.workspace-backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2) + '\n');
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  // Stage the file using repo-root-relative path
  execSync(`git add yee-x/package.json`, { cwd: repoRoot, stdio: 'inherit' });
  console.log('Done. package.json updated and staged.');
} else {
  console.log('No workspace dependencies found.');
}
