---
title: 贡献指南
order: 5
nav:
  title: 贡献指南
  order: 9
---

# 贡献指南

感谢你考虑为 yee-x 做出贡献！我们欢迎所有形式的贡献。

## 行为准则

请遵守我们的行为准则，保持友好和尊重的交流环境。

## 如何贡献

### 报告 Bug

如果你发现了 Bug，请：

1. 在 GitHub Issues 中搜索是否已有相关问题
2. 如果没有，创建新的 Issue
3. 使用 Bug 报告模板
4. 提供详细的复现步骤
5. 附上环境信息和截图

### 提出新功能

如果你有新功能建议：

1. 在 GitHub Discussions 中发起讨论
2. 说明使用场景和需求
3. 等待社区反馈
4. 获得认可后可以开始实现

### 提交代码

#### 开发流程

1. Fork 项目到你的账号
2. 克隆到本地：`git clone https://github.com/your-username/yee-x.git`
3. 创建新分支：`git checkout -b feature/your-feature`
4. 安装依赖：`pnpm install`
5. 进行开发
6. 运行测试：`pnpm test`
7. 提交代码：`git commit -m "feat: your feature"`
8. 推送分支：`git push origin feature/your-feature`
9. 创建 Pull Request

#### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 编写单元测试
- 添加必要的注释

#### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 新功能
fix: Bug 修复
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具相关
```

### 改进文档

文档改进同样重要：

1. 修正错别字和语法错误
2. 补充缺失的文档
3. 改进示例代码
4. 翻译文档

## 开发指南

### 项目结构

```
yee-x/
├── src/              # 源代码
│   ├── Bubble/       # 组件目录
│   ├── Markdown/
│   └── ...
├── docs/             # 文档
├── .dumi/            # Dumi 配置
└── package.json
```

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm start

# 构建文档
pnpm run docs:build

# 构建组件库
pnpm run build

# 运行测试
pnpm test
```

### 添加新组件

1. 在 `src/` 下创建组件目录
2. 创建组件文件和样式
3. 添加 TypeScript 类型定义
4. 编写单元测试
5. 添加文档和示例
6. 在 `src/index.ts` 中导出

## Pull Request 指南

### 提交前检查

- [ ] 代码通过 ESLint 检查
- [ ] 代码通过 TypeScript 检查
- [ ] 所有测试通过
- [ ] 添加了必要的文档
- [ ] 更新了 CHANGELOG

### PR 描述

请在 PR 中说明：

- 改动的目的和背景
- 实现方案
- 测试情况
- 相关 Issue

## 版本发布

版本发布由维护团队负责：

1. 更新版本号
2. 更新 CHANGELOG
3. 创建 Git Tag
4. 发布到 npm
5. 发布 GitHub Release

## 获取帮助

如果你在贡献过程中遇到问题：

- 查看现有文档
- 在 Discussions 中提问
- 联系维护团队

---

再次感谢你的贡献！
