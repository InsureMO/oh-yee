import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Outside src/ so `father doctor` (publish prepublishOnly) does not scan
    // it and flag the dev-only `vitest` import as an undeclared dependency.
    setupFiles: ['./test/motion-mock.tsx'],
  },
});
