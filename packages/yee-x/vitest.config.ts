import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Outside src/ so `father doctor` (publish prepublishOnly) does not scan
    // it and flag the dev-only file as an undeclared dependency.
    setupFiles: ['./test/resize-observer.ts'],
  },
});
