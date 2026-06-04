# 工具函数

`@rainbow-oh/yee-tools` 是一组轻量级、零依赖的 JavaScript/TypeScript 工具函数库，提供日常开发中常用的工具方法。

## 安装

```bash
npm install @rainbow-oh/yee-tools
# 或
pnpm add @rainbow-oh/yee-tools
```

## 引入方式

### 方式一：命名空间导入（推荐）

适合需要使用某个分类下多个函数的场景：

```typescript
// 字符串工具
import { StringUtils } from '@rainbow-oh/yee-tools';

// 日期工具
import { DateUtils } from '@rainbow-oh/yee-tools';

// 数组工具
import { ArrayUtils } from '@rainbow-oh/yee-tools';
```

### 方式二：按需引入

适合只需要使用单个函数的场景，可以进一步减少打包体积：

```typescript
// 字符串工具
import { trim } from '@rainbow-oh/yee-tools/string';

// 日期工具
import { formatDate } from '@rainbow-oh/yee-tools/date';

// 数组工具
import { uniq } from '@rainbow-oh/yee-tools/array';
```

## 分类

### [字符串 (StringUtils)](./string)
字符串处理相关的工具函数，包括格式化、截断、转换等。

### [数字 (NumberUtils)](./number)
数字处理相关的工具函数，包括格式化、精度处理等。

### [日期 (DateUtils)](./date)
日期时间处理相关的工具函数，基于 dayjs 扩展。

### [数组 (ArrayUtils)](./array)
数组操作相关的工具函数，包括去重、排序、查找等。

### [对象 (ObjectUtils)](./object)
对象操作相关的工具函数，包括深拷贝、合并、路径访问等。

### [安全 (SecurityUtils)](./security)
安全相关的工具函数，包括加密、编码等。

### [Cookie (CookieUtils)](./cookie)
Cookie 操作相关的工具函数。

### [类型 (TypeUtils)](./type)
类型判断和转换相关的工具函数。

### [URL (UrlUtils)](./url)
URL 处理相关的工具函数。

### [缓存 (Cache)](./cache)
缓存管理工具，包括 Session、Local、Page 缓存。

### [配置 (Config)](./config)
配置管理工具，包括配置提供者和会话配置。

### [请求 (Fetch)](./fetch)
基于 Fetch API 的请求封装，支持拦截器和缓存优化。

### [国际化 (I18n)](./i18n)
国际化工具，支持多语言切换。

## 特性

- 📦 **轻量级**: 零依赖（除 dayjs）
- 🎯 **按需引入**: 支持按模块导入
- 🔒 **TypeScript**: 完整的类型定义
- ✅ **测试覆盖**: 完善的单元测试
- 🚀 **性能优化**: 高性能实现

## 快速开始

### 使用命名空间导入

```typescript
import { StringUtils, DateUtils, ArrayUtils } from '@rainbow-oh/yee-tools';

// 字符串格式化
const str = StringUtils.trim('  hello  ');
// => 'hello'

// 日期格式化
const date = DateUtils.getCurrentDateTime();
// => '2026-03-02 14:30:00'

// 数组去重
const arr = ArrayUtils.uniq([1, 2, 2, 3, 3, 3]);
// => [1, 2, 3]
```

### 使用按需引入

```typescript
import { trim } from '@rainbow-oh/yee-tools/string';
import { getCurrentDateTime } from '@rainbow-oh/yee-tools/date';
import { uniq } from '@rainbow-oh/yee-tools/array';

// 字符串格式化
const str = trim('  hello  ');
// => 'hello'

// 日期格式化
const date = getCurrentDateTime();
// => '2026-03-02 14:30:00'

// 数组去重
const arr = uniq([1, 2, 2, 3, 3, 3]);
// => [1, 2, 3]
```
