# 常见问题

这里收集了用户在使用 yee-c 过程中常见的问题和解答。

## 安装和引入

### Q: 如何安装 yee-c？

```bash
npm install @rainbow-oh/yee-c
# 或
yarn add yee-c
# 或
pnpm add yee-c
```

### Q: 支持哪些 React 版本？

yee-c 需要 React 18.0.0 或更高版本。

### Q: 如何按需引入组件？

```txt
// 方式一：从子包引入
import Button from 'yee-c/es/button';

// 方式二：使用 babel-plugin-import
import { Button } from 'yee-c';
```

配置 `babel-plugin-import`：

```json
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "yee-c",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```

## 样式和主题

### Q: 如何自定义主题？

通过 CSS 变量自定义主题：

```css
:root {
  --yee-primary-color: #1890ff;
  --yee-success-color: #52c41a;
  --yee-warning-color: #faad14;
  --yee-error-color: #f5222d;
  --yee-border-radius: 4px;
}
```

### Q: 如何启用深色模式？

```css
[data-theme='dark'] {
  --yee-bg-color: #1f1f1f;
  --yee-text-color: #ffffff;
}
```

### Q: 如何覆盖组件样式？

可以使用 `className` 自定义类名：

```txt
<Button className="my-custom-button">点击</Button>
```

或者使用内联样式：

```txt
<Button style={{ backgroundColor: 'red' }}>点击</Button>
```

## 使用问题

### Q: 组件样式不生效？

1. 确保已正确引入样式文件
2. 检查是否有其他样式库的冲突
3. 确认 CSS 变量是否正确设置

### Q: TypeScript 类型报错？

确保安装了 `@types/react` 和 `@types/react-dom`：

```bash
npm install @types/react @types/react-dom -D
```

### Q: 如何处理表单验证？

使用 Form 组件的验证功能：

```txt
<Form
  rules={{
    username: [
      { required: true, message: '请输入用户名' },
      { min: 3, message: '用户名至少3个字符' }
    ]
  }}
>
  <Form.Field name="username">
    <Input placeholder="用户名" />
  </Form.Field>
</Form>
```

## 兼容性

### Q: 支持哪些浏览器？

我们支持现代浏览器：

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

### Q: 支持 SSR 吗？

是的，yee-c 支持服务端渲染。某些组件（如 Dialog、Drawer）可能需要客户端渲染。

### Q: 支持移动端吗？

yee-c 主要针对桌面端设计，但大部分组件在移动端也能正常工作。

## 国际化

### Q: 如何设置组件的语言？

```javascript
import { ConfigProvider } from 'yee-c';
import zhCN from 'yee-c/es/locale/zh_CN';

<ConfigProvider locale={zhCN}>
  <App />
</ConfigProvider>;
```

## 性能优化

### Q: 如何优化组件渲染性能？

1. 使用 `React.memo` 包装组件
2. 合理使用 `useMemo` 和 `useCallback`
3. 对于列表，使用虚拟滚动
4. 按需引入组件，减少打包体积

### Q: 组件打包后体积太大？

1. 使用按需引入
2. 配置 Tree Shaking
3. 检查是否有重复的依赖

## 其他问题

### Q: 如何报告 Bug？

请在 [GitHub Issues](https://github.com/insureMO/oh-yee/issues) 中提交，包含：

- 复现步骤
- 预期行为
- 实际行为
- 代码示例
- 环境信息（浏览器、React 版本等）

### Q: 如何请求新功能？

欢迎提交 Feature Request，描述清楚需求和使用场景。

### Q: 是否有商业支持？

目前 yee-c 是开源项目，提供社区支持。如需商业支持，请联系我们。

---

仍有问题？欢迎在 [GitHub Discussions](https://github.com/insureMO/oh-yee/discussions) 中提问。
