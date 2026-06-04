# 贡献指南

感谢你对 yee-c 的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果你发现了 Bug 或有功能建议：

1. 在 [GitHub Issues](https://github.com/InsureMO/oh-yee/issues) 搜索现有问题
2. 如果没有找到相关问题，创建新的 Issue
3. 提供详细的问题描述和复现步骤

### 提交代码

#### 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/InsureMO/oh-yee.git
cd yee-c

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm test

# 构建项目
npm run build
```

#### 分支规范

- `master`：主分支，稳定版本
- `feature/*`：新功能开发
- `fix/*`：问题修复
- `docs/*`：文档更新

#### 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型 (type)：**
- `feat`：新功能
- `fix`：问题修复
- `docs`：文档更新
- `style`：代码格式调整
- `refactor`：代码重构
- `perf`：性能优化
- `test`：测试相关
- `chore`：构建过程或辅助工具的变动

**示例：**

```bash
feat(button): 添加 loading 状态支持

fix(dialog): 修复关闭时的动画问题

docs: 更新快速开始文档
```

#### Pull Request 流程

1. **Fork 仓库**并创建你的分支
   ```bash
   git checkout -b feature/awesome-feature
   ```

2. **进行修改**并确保代码通过检查
   ```bash
   npm run lint
   npm test
   ```

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

4. **推送到你的 Fork**
   ```bash
   git push origin feature/awesome-feature
   ```

5. **创建 Pull Request**，填写 PR 模板

### 代码规范

#### 组件开发

```javascript
// 组件文件结构
// src/ComponentName/
// ├── index.ts          # 导出入口
// ├── component.tsx     # 组件实现
// ├── interface.ts      # 类型定义
// ├── style/
// │   ├── index.less    # 样式文件
// │   └── ...
// └── __tests__/        # 测试文件

// 组件命名：PascalCase
export const Button: React.FC<ButtonProps> = (props) => {
  // ...
};

// Props 接口命名：ComponentNameProps
export interface ButtonProps {
  type?: 'primary' | 'default';
  size?: 'large' | 'middle' | 'small';
  children?: React.ReactNode;
}
```

#### 样式规范

```less
// 使用 BEM 命名规范
.yee-button {
  // Block
  display: inline-block;

  &--primary {
    // Modifier
    background: var(--yee-primary-color);
  }

  &__icon {
    // Element
    margin-right: 4px;
  }
}

// 使用 CSS 变量
.yee-button {
  color: var(--yee-text-color);
  background: var(--yee-bg-color);
}
```

#### 测试规范

```javascript
import { render, screen } from '@testing-library/react';
import { Button } from '../index';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click</Button>);
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### 文档贡献

#### 组件文档

每个组件都应该包含：

1. **组件描述**：组件的功能和用途
2. **API 文档**：所有 Props 的说明
3. **代码示例**：常见用例的示例代码
4. **注意事项**：使用时需要注意的地方

#### 文档结构

```markdown
# ComponentName

组件描述

## 基础用法

\`\`\`javascript
import { ComponentName } from 'yee-c';

\`\`\`

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| ... | ... | ... | ... |

## 注意事项

...
```

## 成为维护者

如果你长期为 yee-c 贡献代码或文档，可以申请成为维护者：

1. 至少提交 5 个高质量的 PR
2. 积极参与 Issue 讨论和 Code Review
3. 熟悉项目的代码规范和架构

## 行为准则

- 尊重他人，保持友好和专业
- 欢迎不同观点的讨论
- 关注问题本身，而非个人

## 许可证

提交代码即表示你同意将你的贡献按照 [MIT License](LICENSE) 进行授权。

## 联系方式

如有任何问题，欢迎：

- 提交 [GitHub Issue](https://github.com/InsureMO/oh-yee/issues)
- 在 [GitHub Discussions](https://github.com/InsureMO/oh-yee/discussions) 中讨论

---

再次感谢你的贡献！🎉
