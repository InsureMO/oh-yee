# AI 辅助开发

使用 **yee-dev-skill** 进行 yee-\* 技术栈的工程开发。yee-dev-skill 是一个 AI 辅助开发工具，帮助你快速构建基于 Yee 组件库的 React 项目。

## 两种模式

### 分析模式

从 BSD（Business Solution Document）业务设计文档自动生成前端开发文档。

**使用方式：**

```
/yee-dev-skill analyze [BSD文档路径]
```

**输出：**

- `docs/project-structure.md` — 项目结构 + 路由 + 菜单
- `docs/page-specs.md` — 页面详细规格
- `docs/api-and-types.md` — TypeScript 类型 + API + CodeTable + Mock

### 开发模式

使用 Yee 组件库进行前端编码开发。

**使用方式：**

```
/yee-dev-skill
```

## 支持的组件库

| 库                | 说明            | 组件数 |
| ----------------- | --------------- | ------ |
| **@oh/yee-c**     | 基础 UI 组件库  | 62     |
| **@oh/yee-x**     | AI 工作流组件库 | 16     |
| **@oh/yee-biz**   | 业务组件库      | 2      |
| **@oh/yee-tools** | 工具函数库      | 13     |

## 安装

通过 VS Code 插件 **Yee Skill Manager** 安装 yee-dev-skill，插件会自动同步最新版本的 Skill。

## 快速开始

### 1. 创建项目

```bash
npx @oh/yee-cli@latest create my-project -y
cd my-project
pnpm install
pnpm dev
```

### 2. 启动 AI 开发

在 Claude Code 中进入项目目录，输入：

```
/yee-dev-skill
```

然后描述你要开发的功能，例如：

- "创建一个用户管理的列表页"
- "添加一个新增表单页"
- "开发一个审批详情页"

## 开发流程

1. **理解需求** — 描述页面类型、主要功能、API 接口
2. **需求规划** — AI 自动创建任务清单
3. **逐步实现** — 按任务清单编码，包含状态管理、数据获取、事件处理、错误处理
4. **自动验证** — TypeScript 类型检查 + ESLint 检查
5. **完成总结** — 汇总已完成功能和注意事项

## 常用组件快速参考

### 表单类

- **Form** / **Form.Field** — 表单容器与字段
- **Input** / **InputNumber** / **TextArea** — 文本输入
- **Select** / **TreeSelect** / **Cascader** — 选择器
- **DatePicker** / **RangePicker** — 日期选择
- **Checkbox** / **Radio** / **Switch** — 开关选择

### 展示类

- **Table** — 数据表格（搜索 + 分页 + 排序）
- **Card** / **Box** — 容器布局
- **Grid** / **Space** — 网格与间距
- **Descriptions** — 描述列表

### 交互类

- **Button** — 按钮
- **Dialog** / **Drawer** — 弹窗与抽屉
- **message** / **notice** — 消息提示
- **Upload** — 文件上传

### 工具函数

- **FetchUtils** — HTTP 请求（get, post, put, delete）
- **StringUtils** — 字符串处理（trim, isEmpty, isBlank）
- **DateUtils** — 日期处理（format, parse）
- **ArrayUtils** — 数组处理（unique, chunk, isRepeat）

## 最佳实践

1. **先规划后编码** — 使用 AI 生成任务清单
2. **查看组件文档** — 不确定的属性先查阅文档
3. **完整业务逻辑** — 包含状态、数据、事件、错误处理
4. **自动验证** — 编码完成后运行 TypeScript 和 ESLint 检查
