---
title: 常见问题
order: 3
nav:
  title: 常见问题
  order: 7
---

# 常见问题

## 安装相关

### 如何安装 yee-x？

```bash
# 使用 npm
npm install @rainbow-oh/yee-x

# 使用 yarn
yarn add yee-x

# 使用 pnpm
pnpm add yee-x
```

### 安装后无法使用怎么办？

1. 检查 React 版本是否 >= 18.0.0
2. 检查是否正确导入组件
3. 查看控制台是否有错误信息
4. 确认项目配置是否支持 ES6+ 语法

## 使用相关

### 如何导入组件？

```pure
// 按需导入
import { Bubble, Markdown } from '@rainbow-oh/yee-x';

// 样式已内置在组件中，无需单独导入
```

### 组件样式不生效怎么办？

1. 确认是否导入了样式文件
2. 检查 CSS 加载顺序
3. 查看是否有样式冲突
4. 尝试使用 `!important` 提高优先级

### 如何自定义主题？

yee-x 支持通过 CSS 变量自定义主题：

```css
:root {
  --yee-primary-color: #1890ff;
  --yee-text-color: #333;
  --yee-border-radius: 4px;
  /* 更多变量... */
}
```

### TypeScript 类型提示不完整？

1. 确认安装了 `@types/react`
2. 检查 `tsconfig.json` 配置
3. 重启 IDE 或 TypeScript 服务
4. 更新到最新版本

## 组件相关

### 如何自定义 Markdown 渲染？

```pure
import { Markdown } from '@rainbow-oh/yee-x';

function App() {
  return (
    <Markdown
      content="# Hello"
      components={{
        h1: ({ children }) => <h1 className="custom-h1">{children}</h1>,
      }}
    />
  );
}
```

### CodeBlock 如何自定义语言高亮？

````pure
import { CodeBlock } from '@rainbow-oh/yee-x';

function App() {
  return (
    <CodeBlock
      code="const a = 1;"
      language="javascript"
      theme="v

### Bubble 组件如何实现流式输出？

```tsx
import { Bubble } from '@rainbow-oh/yee-x';
import { useState, useEffect } from 'react';

function StreamingBubble() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // 模拟流式输出
    const text = 'Hello, this is streaming text...';
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setContent(prev => prev + text[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return <Bubble content={content} />;
}
````

### 如何处理大量消息的性能问题？

1. 使用虚拟滚动（推荐 react-window）
2. 实现消息分页加载
3. 使用 React.memo 优化渲染
4. 避免在渲染中进行复杂计算

## 兼容性相关

### 支持哪些浏览器？

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

### 支持移动端吗？

是的，yee-x 组件支持移动端，但部分组件可能需要额外的适配。

### 可以在 Next.js 中使用吗？

可以，但需要注意：

```pure
// 使用动态导入避免 SSR 问题
import dynamic from 'next/dynamic';

const Bubble = dynamic(() => import('@rainbow-oh/yee-x').then(mod => mod.Bubble), {
  ssr: false,
});
```

### 可以在 React Native 中使用吗？

yee-x 是为 Web 设计的，不支持 React Native。

## 性能优化

### 如何优化首屏加载速度？

1. 使用按需加载
2. 启用代码分割
3. 使用 CDN 加载资源
4. 压缩和优化图片

### 如何减少包体积？

1. 只导入需要的组件
2. 使用 Tree Shaking
3. 配置 Babel 按需加载
4. 检查是否有重复依赖

## 开发相关

### 如何参与贡献？

查看 [贡献指南](/contributing) 了解详情。

### 如何报告 Bug？

1. 在 GitHub 上提交 Issue
2. 提供复现步骤和环境信息
3. 附上相关代码和截图
4. 说明期望行为和实际行为

### 如何提出新功能建议？

1. 在 GitHub Discussions 中发起讨论
2. 说明使用场景和需求
3. 提供设计思路（如果有）
4. 等待社区反馈

## 其他问题

### 商业使用需要授权吗？

yee-x 采用 MIT 协议，可以免费用于商业项目。

### 如何获取技术支持？

1. 查看文档和常见问题
2. 在 GitHub 上提交 Issue
3. 参与社区讨论
4. 联系维护团队

### 更新频率如何？

- Bug 修复：及时发布
- 新功能：按需发布
- 大版本：根据规划发布

---

## 没有找到答案？

如果以上内容没有解决你的问题，欢迎：

- 提交 [Issue](https://github.com/InsureMO/oh-yee/issues)
- 参与 [讨论](https://github.com/InsureMO/oh-yee/discussions)
- 查看 [使用指南](/guide)
