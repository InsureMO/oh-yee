# yee-c 开发模式说明

## 两种开发模式

### 模式 1：直接引用源码（推荐，热更新最快）

在 yee-x 中开发时，直接引用 yee-c 的源码：

```bash
# 终端 1：启动 yee-x
cd yee-x
npm run dev
```

**优点：**
- ✅ 修改 yee-c 代码后，yee-x 自动热更新
- ✅ 无需手动打包
- ✅ 开发体验最佳

**配置：**
- `.dumirc.ts` 中 `alias` 指向 `../yee-c/src`
- 开发环境自动使用源码

### 模式 2：Watch 构建（传统方式）

使用 father 的 watch 模式：

```bash
# 终端 1：监听 yee-c 变化并自动构建
cd yee-c
npm run watch

# 终端 2：启动 yee-x
cd ../yee-x
npm run dev
```

**适用场景：**
- 需要验证构建输出是否正确
- 测试打包后的代码
- CI/CD 环境

## 配置说明

### yee-c/package.json

```json
{
  "main": "./dist/index.js",      // CommonJS 入口
  "module": "./dist/index.js",    // ESM 入口
  "types": "./dist/index.d.ts",   // TypeScript 类型定义
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./style/*": "./dist/*/style/*"
  }
}
```

### yee-x/.dumirc.ts

```typescript
alias: {
  '@oh/yee-c': process.env.NODE_ENV === 'development'
    ? join(__dirname, '../yee-c/src')  // 开发：源码
    : join(__dirname, '../yee-c/dist'), // 生产：构建输出
}
```

## 为什么不再使用 `module: "./src/index.ts"`？

### 问题

```json
{
  "module": "./src/index.ts"  // ❌ 非标准配置
}
```

1. **违反规范**：`module` 字段应指向构建后的 ESM 输出
2. **类型问题**：TypeScript 文件不能被运行时直接使用
3. **工具不兼容**：某些工具不识别 `.ts` 扩展名
4. **样式缺失**：样式文件可能在构建时才被处理

### 解决方案

使用 `alias` 在开发环境指向源码：
- ✅ 符合 package.json 规范
- ✅ 构建产物正确
- ✅ 开发体验优秀
- ✅ 发布到 npm 时没有问题

## 样式文件解析

当直接引用源码时，样式文件通过相对路径导入：

```pure_tsx
// yee-c/src/Button/button.tsx
import './style/index.less';  // ✅ 相对路径正常工作
```

yee-x 的 webpack 会自动处理这些 less 文件。

## 故障排查

### 问题 1：样式丢失

**原因**：yee-x 没有配置 less-loader

**解决**：确保 `.dumirc.ts` 中有：
```typescript
chainWebpack(config: any) {
  config.resolve.extensions.add('.ts').add('.tsx').add('.less');
}
```

### 问题 2：类型错误

**原因**：TypeScript 配置问题

**解决**：
```bash
# 重新构建类型定义
cd yee-c
npm run build
```

### 问题 3：热更新不生效

**原因**：可能使用了构建输出而不是源码

**检查**：
```typescript
// yee-x/.dumirc.ts
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Alias:', join(__dirname, '../yee-c/src'));
```

## 发布前检查

发布到 npm 前：

```bash
# 1. 构建代码
npm run build

# 2. 检查 dist 目录
ls -la dist/

# 3. 验证导出
cat dist/index.js | grep export

# 4. 检查类型定义
cat dist/index.d.ts | head -20
```

确保：
- ✅ `dist/index.js` 存在且有正确导出
- ✅ `dist/index.d.ts` 存在
- ✅ 样式文件在 `dist/*/style/` 目录
