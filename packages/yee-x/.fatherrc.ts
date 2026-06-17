import { defineConfig } from 'father';

export default defineConfig({
  esm: { output: 'dist/esm', ignores: ['*/**/demo/*', '*/Tools/*'] },
  cjs: { output: 'dist/cjs', ignores: ['*/**/demo/*', '*/Tools/*'] },
  umd: {
    output: 'dist/umd',
    name: 'YeeX',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react/jsx-runtime': 'React.jsxRuntime',
      '@rainbow-oh/yee-c': 'YeeC',
    },
    entry: 'src/index',
  },
});
