declare module '@rainbow-oh/yee-x';

declare module '*.less' {
  const css: Record<string, string>;
  export default css;
}

// Minimal ambient typing for `process.env.NODE_ENV` (the package does not depend
// on @types/node). Kept as the literal member expression so consumer bundlers
// can replace / dead-code-eliminate dev-only branches in production builds.
declare const process: {
  env: {
    NODE_ENV?: 'development' | 'production' | 'test' | string;
  };
};
