---
title: 资源
order: 4
nav:
  title: 资源
  order: 8
---

# 资源

## 设计资源

### 设计规范

- [设计原则](/design/principles) - 了解 yee-x 的设计理念
- [视觉规范](/design/visual) - 颜色、字体、间距等视觉规范
- [交互规范](/design/interaction) - 交互模式和动效规范

### 设计工具

- **Figma 组件库** - 即将推出
- **Sketch 组件库** - 即将推出
- **图标库** - 即将推出

## 开发资源

### 脚手架和模板

```bash
# 快速创建项目（即将推出）
npx create-yee-app my-app
```

### 示例项目

- [基础聊天应用](https://github.com/insureMO/oh-yee-examples/tree/main/basic-chat) - 展示基本的聊天功能
- [AI 助手应用](https://github.com/insureMO/oh-yee-examples/tree/main/ai-assistant) - 完整的 AI 助手示例
- [文档问答系统](https://github.com/insureMO/oh-yee-examples/tree/main/doc-qa) - 基于文档的问答系统
- [代码生成器](https://github.com/insureMO/oh-yee-examples/tree/main/code-generator) - AI 代码生成工具

### 代码片段

#### VS Code 代码片段

安装 yee-x 代码片段扩展（即将推出）：

```bash
code --install-extension yee-x.snippets
```

#### 常用代码片段

```tsx
// 快速创建聊天界面
import { Bubble, Sender, History } from '@rainbow-oh/yee-x';

function ChatApp() {
  return (
    <div className="chat-container">
      <History messages={messages} />
      <Sender onSend={handleSend} />
    </div>
  );
}
```

## 学习资源

### 教程

- [快速开始](/guide) - 5 分钟上手 yee-x
- [进阶指南](/advanced) - 深入了解高级特性
- [最佳实践](/best-practices) - 生产环境使用建议
- [性能优化](/performance) - 性能优化技巧

### 视频教程

- [yee-x 入门教程](https://example.com/video/intro) - 30 分钟快速入门
- [构建 AI 聊天应用](https://example.com/video/chat-app) - 从零开始构建
- [组件深度解析](https://example.com/video/components) - 详解核心组件
- [实战项目开发](https://example.com/video/project) - 完整项目实战

### 文章和博客

- [yee-x 设计思路](https://blog.example.com/yee-x-design)
- [如何构建高性能 AI 界面](https://blog.example.com/ai-ui-performance)
- [yee-x 最佳实践分享](https://blog.example.com/yee-x-best-practices)

## 社区资源

### 官方渠道

- [GitHub 仓库](https://github.com/insureMO/oh-yee) - 源码和问题追踪
- [GitHub Discussions](https://github.com/insureMO/oh-yee/discussions) - 社区讨论
- [更新日志](/changelog) - 版本更新记录

### 社区项目

- [awesome-yee-x](https://github.com/insureMO/awesome-yee-x) - 精选资源列表
- [yee-x-plugins](https://github.com/insureMO/oh-yee-plugins) - 社区插件集合
- [yee-x-themes](https://github.com/insureMO/oh-yee-themes) - 主题集合

### 第三方集成

- **状态管理**

  - Redux 集成示例
  - Zustand 集成示例
  - Jotai 集成示例

- **UI 框架**

  - Ant Design 集成
  - Material-UI 集成
  - Chakra UI 集成

- **AI 服务**
  - OpenAI 集成
  - Claude 集成
  - 本地模型集成

## 工具和插件

### 开发工具

- **Chrome DevTools 扩展** - 即将推出
- **VS Code 扩展** - 即将推出
- **ESLint 插件** - 代码规范检查
- **Prettier 配置** - 代码格式化

### 构建工具

- **Webpack 配置** - Webpack 集成指南
- **Vite 配置** - Vite 集成指南
- **Rollup 配置** - Rollup 集成指南

## API 参考

### 在线文档

- [组件 API](/components) - 完整的组件 API 文档
- [工具函数 API](/utils) - 工具函数文档
- [Hooks API](/hooks) - React Hooks 文档
- [类型定义](/types) - TypeScript 类型定义

### 离线文档

```bash
# 下载离线文档（即将推出）
npm run docs:download
```

## 相关项目

### 生态系统

- **yee-c** - 基础组件库
- **yee-tools** - 工具函数库
- **yee-chat** - 聊天应用示例
- **yee-mcp** - MCP 协议实现

### 推荐工具

- [React](https://react.dev/) - UI 框架
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [Dumi](https://d.umijs.org/) - 文档工具
- [Vitest](https://vitest.dev/) - 测试框架

## 贡献资源

### 参与贡献

- [贡献指南](/contributing) - 如何参与贡献
- [开发指南](/development) - 本地开发指南
- [代码规范](/code-style) - 代码风格指南
- [提交规范](/commit-convention) - Git 提交规范

### 社区活动

- **月度例会** - 每月第一个周五
- **代码审查** - 持续进行
- **版本发布** - 按需发布
- **社区分享** - 不定期举办

---

## 需要帮助？

如果你在使用过程中遇到问题：

- 查看 [常见问题](/faq)
- 提交 [Issue](https://github.com/insureMO/oh-yee/issues)
- 参与 [讨论](https://github.com/insureMO/oh-yee/discussions)
- 联系维护团队

## 保持更新

关注我们获取最新动态：

- ⭐ Star [GitHub 仓库](https://github.com/insureMO/oh-yee)
- 👀 Watch 仓库获取更新通知
- 📧 订阅邮件列表（即将推出）
- 🐦 关注官方社交媒体（即将推出）
