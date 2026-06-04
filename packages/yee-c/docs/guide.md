# 指南

欢迎使用 yee-c 组件库！本指南将帮助你快速上手并开始使用我们的组件。

## 简介

yee-c 是一个现代化、高质量的 React 组件库，提供了一系列常用的 UI 组件，帮助你快速构建美观、易用的 Web 应用。

## 特性

- **现代化设计**：采用最新的设计理念，提供一致的用户体验
- **TypeScript 支持**：完整的 TypeScript 类型定义
- **高度可定制**：支持主题定制和样式覆盖
- **无障碍访问**：遵循 WAI-ARIA 标准，提供良好的无障碍体验
- **性能优化**：组件性能优化，确保流畅的用户体验

## 安装

```bash
npm install yee-c
# 或
yarn add yee-c
# 或
pnpm add yee-c
```

## 快速开始

```txt
import { Button, Alert } from 'yee-c';

function App() {
  return (
    <div>
      <Button type="primary">点击我</Button>
      <Alert type="success" message="操作成功！" />
    </div>
  );
}
```

## 按需引入

yee-c 支持按需引入，减少打包体积：

```javascript
import Button from 'yee-c/es/button';
```

## 主题定制

### CSS 变量

yee-c 使用 CSS 变量进行主题定制，你可以覆盖这些变量来自定义主题：

```css
:root {
  --yee-primary-color: #1890ff;
  --yee-success-color: #52c41a;
  --yee-warning-color: #faad14;
  --yee-error-color: #f5222d;
  --yee-border-radius: 4px;
}
```

### 深色模式

```css
[data-theme='dark'] {
  --yee-bg-color: #1f1f1f;
  --yee-text-color: #ffffff;
}
```

## 下一步

- 查看 [组件列表](/components) 了解所有可用组件
- 阅读 [常见问题](/faq) 解决常见问题
- 了解如何 [贡献代码](/contributing)
