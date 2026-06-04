import { defineConfig } from 'father';

export default defineConfig({
  // ESM output - for modern bundlers
  esm: {
    output: 'dist/esm',
    platform: 'browser',
    transformer: 'babel',
  },

  // CJS output - for Node.js and legacy projects
  cjs: {
    output: 'dist/cjs',
    platform: 'browser',
    transformer: 'esbuild',
  },

  // UMD output - single file full bundle
  umd: {
    output: 'dist/umd',
    name: 'YeeC',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react/jsx-runtime': 'React.jsxRuntime',
      dayjs: 'dayjs',
    },
    entry: 'src/index',
  },
});
