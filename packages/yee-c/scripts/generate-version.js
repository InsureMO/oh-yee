const fs = require('fs');
const path = require('path');

const pkg = require(path.join(__dirname, '..', 'package.json'));
const outputPath = path.join(__dirname, '..', 'src', 'version.ts');

fs.writeFileSync(
  outputPath,
  `declare global {
  interface Window {
    __yee_c_version__: string;
  }
}

export const version = ${JSON.stringify(pkg.version)};

if (typeof window !== 'undefined') {
  window.__yee_c_version__ = version;
}
`,
);
