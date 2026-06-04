import { builtinModules } from "node:module";
import { copyFile, mkdir } from "fs/promises";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import replace from "@rollup/plugin-replace";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf-8"));
const isProduction = process.env.NODE_ENV === "production";

const external = [
  ...builtinModules,
  ...builtinModules.map((m) => `node:${m}`),
  // Bundle dayjs to handle CJS-to-ESM conversion correctly
  // "dayjs",
  // "dayjs/plugin/customParseFormat",
];

const DOCS_FILES = [
  'README.md',
  'API.md',
  'LICENSE',
];

function copyDocsPlugin() {
  return {
    name: 'copy-docs',
    writeBundle: async () => {
      const distDir = join(__dirname, 'dist');

      for (const file of DOCS_FILES) {
        const srcPath = join(__dirname, file);
        const destPath = join(distDir, file);

        try {
          await mkdir(dirname(destPath), { recursive: true });
          await copyFile(srcPath, destPath);
          console.log(`[copy-docs] Copied ${file} to dist/`);
        } catch (error) {
          if (error.code !== 'ENOENT') {
            console.warn(`[copy-docs] Warning: Could not copy ${file}`, error.message);
          }
        }
      }

      console.log('[copy-docs] Documentation files copied successfully!');
    },
  };
}

const basePlugins = [
  replace({
    preventAssignment: true,
    values: {
      __yee_tools_version__: JSON.stringify(pkg.version),
    },
  }),
  resolve({
    extensions: [".mjs", ".js", ".json", ".ts"],
    preferBuiltins: true,
  }),
  commonjs(),
];

// Dynamically import optional plugins
const optionalPlugins = [];

try {
  const { default: terser } = await import("@rollup/plugin-terser");
  if (isProduction) {
    optionalPlugins.push(
      terser({
        compress: {
          drop_console: true,
          // drop_debugger: true, // disabled for debugging support
          pure_funcs: ["console.log", "console.info", "console.debug"],
        },
        format: {
          comments: false,
        },
      }),
    );
  }
} catch (e) {
  console.log("[@rollup/plugin-terser not installed, skipping minification]");
}

try {
  const { default: filesize } = await import("rollup-plugin-filesize");
  optionalPlugins.push(
    filesize({
      showMinifiedSize: true,
      showGzippedSize: true,
    }),
  );
} catch (e) {
  console.log("[rollup-plugin-filesize not installed, skipping size report]");
}

try {
  const { visualizer } = await import("rollup-plugin-visualizer");
  if (isProduction) {
    optionalPlugins.push(
      visualizer({
        filename: "dist/stats.html",
        open: false,
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
      }),
    );
  }
} catch (e) {
  console.log(
    "[rollup-plugin-visualizer not installed, skipping bundle analysis]",
  );
}

export default [
  // ESM build with preserved modules (best tree-shaking)
  {
    input: "src/index.ts",
    external,
    output: {
      dir: "dist/esm",
      format: "es",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].mjs",
      exports: "named",
    },
    plugins: [
      ...basePlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
        inlineSources: false,
        compilerOptions: {
          outDir: "dist/esm",
          declaration: true,
          declarationDir: "dist/esm",
          sourceMap: true,
        },
      }),
      ...optionalPlugins,
    ],
  },
  // CJS build with preserved modules
  {
    input: "src/index.ts",
    external,
    output: {
      dir: "dist/cjs",
      format: "cjs",
      sourcemap: true,
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].cjs",
      exports: "named",
      interop: "auto",
    },
    plugins: [
      ...basePlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
        inlineSources: false,
        compilerOptions: {
          outDir: "dist/cjs",
          declaration: false,
          declarationMap: false,
          sourceMap: true,
        },
      }),
      ...optionalPlugins,
    ],
  },
  // UMD build - single file bundle
  {
    input: "src/index.ts",
    external,
    output: {
      file: "dist/umd/yee-tools.min.js",
      format: "umd",
      name: "YeeTools",
      sourcemap: true,
      exports: "named",
      globals: {
        dayjs: "dayjs",
      },
    },
    plugins: [
      ...basePlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        sourceMap: true,
        inlineSources: false,
        compilerOptions: {
          outDir: "dist",
          declaration: false,
          declarationMap: false,
          sourceMap: true,
        },
      }),
      copyDocsPlugin(),
      ...optionalPlugins,
    ],
  },
  // Type definitions build
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
    external: [...external, "dayjs"],
  },
];
