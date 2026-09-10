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
npm install @rainbow-oh/yee-c
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
  --yee-color-primary: #1890ff;
  --yee-color-success: #52c41a;
  --yee-color-warning: #faad14;
  --yee-color-error: #f5222d;
  --yee-color-text: #1d2129;
  --yee-color-border: #e5e8ef;
  --yee-radius: 4px; /* 全局基础圆角 */
  --yee-radius-lg: 8px; /* 全局大圆角 */
}
```

变量分三层，分别在 `src/style` 下维护：

| 文件                | 内容                                      | 产物                                                               |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------ |
| `color.css`         | 默认主题的全部颜色 token                  | `variables.css`                                                    |
| `size.css`          | 尺寸 / 圆角 / 字号 token                  | `variables.css`                                                    |
| `zindex.css`        | 层级                                      | `variables.css`                                                    |
| `color.<theme>.css` | 预置主题，选择器 `[data-theme='<theme>']` | `themes.css`，同时可单独引入 `@rainbow-oh/yee-c/color.<theme>.css` |

### 命名规范

全局语义色统一为 **`--yee-color-{语义}[-后缀]`**：

```
--yee-color-primary / -hover / -active / -border / -bg
--yee-color-success / -hover / -active / -bg / -border
--yee-color-error   / -hover / -active / -bg / -border
--yee-color-warning / -hover / -active / -bg / -border
--yee-color-info    / -hover / -active / -bg / -border
--yee-color-link    / -hover / -active
--yee-color-text    / -secondary / -description / -disabled / -auxiliary / -highlight
--yee-color-border  / -hover-focus
--yee-color-placeholder
--yee-color-bg-*    (layout / head / container / elevated / disabled / rail / fill / hover / …)
```

组件级 token 的前缀 **必须等于该组件的 CSS 类前缀**，即「看到 token 就知道属于哪个组件」：

| 组件 CSS 类         | token 前缀             |
| ------------------- | ---------------------- |
| `.yee-btn`          | `--yee-btn-*`          |
| `.yee-input`        | `--yee-input-*`        |
| `.yee-range-picker` | `--yee-range-picker-*` |
| `.yee-input-number` | `--yee-input-number-*` |
| `.yee-image-viewer` | `--yee-image-viewer-*` |

这条规范由 `pnpm lint:tokens`（`scripts/check-token-naming.js`）在 CI 中强制校验，新增 token
若前缀对不上任何组件类名会直接失败。

> **Deprecated**：旧命名 `--yee-{语义}-color*`（`--yee-primary-color`、`--yee-text-color`、
> `--yee-border-color`、`--yee-placeholder-color` 等）自 **v0.12** 起废弃。
> `color.css` 末尾保留了一段兼容别名，把旧名映射到新名，**保留一个版本周期后移除**。
> 请尽快改用 `--yee-color-*`。别名清单（旧 → 新）：
>
> | 旧命名                    | 新命名                    |
> | ------------------------- | ------------------------- |
> | `--yee-primary-color*`    | `--yee-color-primary*`    |
> | `--yee-success-color*`    | `--yee-color-success*`    |
> | `--yee-error-color*`      | `--yee-color-error*`      |
> | `--yee-warning-color*`    | `--yee-color-warning*`    |
> | `--yee-info-color*`       | `--yee-color-info*`       |
> | `--yee-link-color*`       | `--yee-color-link*`       |
> | `--yee-text-color*`       | `--yee-color-text*`       |
> | `--yee-border-color*`     | `--yee-color-border*`     |
> | `--yee-placeholder-color` | `--yee-color-placeholder` |
>
> （`*` 表示 `-hover` / `-active` / `-bg` / `-border` 等后缀原样保留。）

> **Deprecated**：以下组件级 token 前缀同样自 **v0.12** 起废弃，已按「前缀 = 组件 CSS 类前缀」统一，
> 兼容别名同样保留一个版本周期：
>
> | 旧前缀                  | 新前缀                   | 依据                     |
> | ----------------------- | ------------------------ | ------------------------ |
> | `--yee-rangepicker-*`   | `--yee-range-picker-*`   | `.yee-range-picker`      |
> | `--yee-image-preview-*` | `--yee-image-viewer-*`   | `.yee-image-viewer`      |
> | `--yee-tabitem-*`       | `--yee-tabs-tab-*`       | `.yee-tabs-tab`          |
> | `--yee-inputnumber-*`   | `--yee-input-number-*`   | `.yee-input-number`      |
> | `--yee-float-button-*`  | `--yee-float-btn-*`      | `.yee-float-btn`         |
> | `--yee-treeselect-*`    | `--yee-tree-select-*`    | `.yee-tree-select`       |
> | `--yee-timepicker-*`    | `--yee-time-picker-*`    | 消除同组件双拼法         |
> | `--yee-star-icon-*`     | `--yee-rate-star-icon-*` | 归属 Rate（`.yee-rate`） |
>
> 全部兼容别名集中在 `color.css` / `size.css` 的 `deprecated-aliases:start … end` 段内，
> 该段会被命名校验脚本跳过。

### 预置主题

内置 `blue` `crimson` `dark` `gemini` `green` `jam` `navy` `peach` `pine` `pitaya` `pumpkin` `ruby`。
引入 `themes.css` 后，在根节点设置 `data-theme` 即可切换：

```javascript
import '@rainbow-oh/yee-c/variables.css';
import '@rainbow-oh/yee-c/themes.css';

document.documentElement.dataset.theme = 'gemini';
```

### Gemini 主题

`gemini` 主题对齐 Gemini UI 设计规范，**同时覆写颜色与尺寸 token**（表单控件 40px / 圆角 12px、
按钮 36px / 圆角 8px、卡片与浮层圆角 14px、字体 Roboto）：

```css
[data-theme='gemini'] {
  --yee-color-primary: #6d5dfc;
  --yee-color-text: #1d2129;
  --yee-color-border: #e5e8ef;
  --yee-input-height: 40px;
  --yee-input-border-radius: 12px;
  --yee-btn-height: 36px;
  --yee-card-border-radius: 14px;
  /* … 完整清单见 src/style/color.gemini.css */
}
```

也可以只引入这一套主题：

```javascript
import '@rainbow-oh/yee-c/color.gemini.css';
```

字体需应用侧自行托管（规范要求 Roboto，yee-c 不内置字体文件）。

### 深色模式

```css
[data-theme='dark'] {
  --yee-color-bg-container: #1f1f1f;
  --yee-color-text: #ffffff;
}
```

## 下一步

- 查看 [组件列表](/components) 了解所有可用组件
- 阅读 [常见问题](/faq) 解决常见问题
- 了解如何 [贡献代码](/contributing)
