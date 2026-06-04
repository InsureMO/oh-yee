#!/usr/bin/env node

/**
 * Copy index.zh-CN.md files from component directories to yee-dev-skill/references/components/
 * and rename them to ComponentName.md
 *
 * Usage: node copy-component-docs.js
 */

const fs = require('fs');
const path = require('path');

// Configure paths
const SOURCE_DIR = path.join(__dirname, '../src');
const TARGET_DIR = path.join(__dirname, '../../yee-dev-skill/references/yee-c');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
  console.log('✓ Created target directory:', TARGET_DIR);
}

let count = 0;

console.log('Copying component docs...\n');

// Read all component directories
const components = fs.readdirSync(SOURCE_DIR).filter((item) => {
  const itemPath = path.join(SOURCE_DIR, item);
  return fs.statSync(itemPath).isDirectory();
});

/**
 * Parse <code src="./demo/xxx.tsx"> tags in markdown and replace with actual code
 */
function processCodeTags(content, componentDir) {
  const codeTagRegex =
    /<code\s+src="\.\/demo\/([^"]+)"\s+title="([^"]+)"\s+description="([^"]+)"\s*><\/code>/g;

  return content.replace(
    codeTagRegex,
    (match, demoFile, title, description) => {
      const demoPath = path.join(componentDir, 'demo', demoFile);

      try {
        const codeContent = fs.readFileSync(demoPath, 'utf-8');

        return `### ${title}

${description}

\`\`\`tsx
${codeContent}
\`\`\``;
      } catch (error) {
        console.warn(`  ⚠ Cannot read demo file: ${demoFile}`);
        return match; // Keep original tag if file not found
      }
    },
  );
}

/**
 * Parse component doc frontmatter and description
 */
function parseComponentInfo(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
  const info = {
    title: '',
    subtitle: '',
    group: '',
    description: '',
  };

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];

    // Extract title
    const titleMatch = frontmatter.match(/title:\s*(.+)/);
    if (titleMatch) info.title = titleMatch[1].trim();

    // Extract subtitle
    const subtitleMatch = frontmatter.match(/subtitle:\s*(.+)/);
    if (subtitleMatch) info.subtitle = subtitleMatch[1].trim();

    // Extract group.title
    const groupMatch = frontmatter.match(/group:\s*\n\s+title:\s*(.+)/);
    if (groupMatch) info.group = groupMatch[1].trim();
  }

  // Extract description (first non-empty paragraph, excluding headings)
  const lines = content.split('\n');
  let foundTitle = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (
      foundTitle &&
      line &&
      !line.startsWith('#') &&
      !line.startsWith('---') &&
      !line.startsWith('```')
    ) {
      info.description = line;
      break;
    }
  }

  return info;
}

/**
 * Generate INDEX.md file
 */
function generateIndex(componentsInfo) {
  // Organize components by group
  const groups = {};
  componentsInfo.forEach((info) => {
    const group = info.group || 'Other';
    if (!groups[group]) groups[group] = [];
    groups[group].push(info);
  });

  // Define group order
  const groupOrder = [
    '通用',
    '布局',
    '数据录入',
    '数据展示',
    '反馈',
    '导航',
    '通知',
    'Other',
  ];

  let indexContent = `# 组件文档索引
  
> 最后更新时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}

快速查找组件 API 文档。

---

## 📊 统计信息

- **组件总数**: ${componentsInfo.length}
- **分组数**: ${Object.keys(groups).length}

---

## 📦 组件列表

`;

  // Generate table per group
  groupOrder.forEach((groupName) => {
    if (!groups[groupName]) return;

    indexContent += `### ${groupName}\n\n`;
    indexContent += '| 组件名 | 中文名 | 描述 | 文档 |\n';
    indexContent += '|--------|--------|------|------|\n';

    groups[groupName].forEach((info) => {
      const fileName = `${info.title}.md`;
      indexContent += `| ${info.title} | ${info.subtitle} | ${info.description} | [查看 API](./${fileName}) |\n`;
    });

    indexContent += '\n';
  });

  // Add usage guide
  indexContent += `---

## 🎯 按场景查找

### 表单相关

- [Form](./Form.md) - 表单容器
- [Input](./Input.md) - 输入框
- [TextArea](./TextArea.md) - 文本域
- [InputNumber](./InputNumber.md) - 数字输入
- [Select](./Select.md) - 选择器
- [Checkbox](./Checkbox.md) - 复选框
- [Radio](./Radio.md) - 单选框
- [DatePicker](./DatePicker.md) - 日期选择
- [RangePicker](./RangePicker.md) - 日期范围选择
- [Upload](./Upload.md) - 文件上传
- [Switch](./Switch.md) - 开关
- [Slider](./Slider.md) - 滑动输入条
- [Rate](./Rate.md) - 评分
- [Cascader](./Cascader.md) - 级联选择
- [TreeSelect](./TreeSelect.md) - 树选择
- [Transfer](./Transfer.md) - 穿梭框
- [VerificationCode](./VerificationCode.md) - 验证码输入

### 数据展示

- [Table](./Table.md) - 数据表格
- [List](./List.md) - 列表
- [Card](./Card.md) - 卡片
- [Tabs](./Tabs.md) - 标签页
- [Tag](./Tag.md) - 标签
- [Badge](./Badge.md) - 徽标
- [Avatar](./Avatar.md) - 头像
- [Tree](./Tree.md) - 树形控件
- [Timeline](./Timeline.md) - 时间轴
- [Carousel](./Carousel.md) - 走马灯
- [Collapse](./Collapse.md) - 折叠面板
- [QRCode](./QRCode.md) - 二维码
- [JsonViewer](./JsonViewer.md) - JSON 查看器
- [Ellipsis](./Ellipsis.md) - 文本省略

### 布局容器

- [Box](./Box.md) - 布局容器
- [Grid](./Grid.md) - 栅格布局
- [Space](./Space.md) - 间距布局
- [Divider](./Divider.md) - 分割线
- [Splitter](./Splitter.md) - 分割面板

### 交互反馈

- [Button](./Button.md) - 按钮
- [Dialog](./Dialog.md) - 对话框
- [Drawer](./Drawer.md) - 抽屉
- [Message](./message.md) - 全局提示
- [Notice](./notice.md) - 通知提醒
- [Popconfirm](./Popconfirm.md) - 气泡确认
- [Popover](./Popover.md) - 气泡卡片
- [Tooltip](./Tooltip.md) - 文字提示
- [Alert](./Alert.md) - 警告提示
- [Progress](./Progress.md) - 进度条
- [Spin](./Spin.md) - 加载中
- [Skeleton](./Skeleton.md) - 骨架屏

### 导航

- [Menu](./Menu.md) - 菜单
- [Breadcrumb](./Breadcrumb.md) - 面包屑
- [Pagination](./Pagination.md) - 分页
- [Steps](./Steps.md) - 步骤条
- [Dropdown](./Dropdown.md) - 下拉菜单
- [Anchor](./Anchor.md) - 锚点
- [FloatButton](./FloatButton.md) - 悬浮按钮

### 其他

- [Config-Provider](./Config-Provider.md) - 全局配置
- [ErrorBoundary](./ErrorBoundary.md) - 错误边界
- [Label](./Label.md) - 标签
- [PickerPanel](./PickerPanel.md) - 选择面板
- [TableSelect](./TableSelect.md) - 表格选择器
- [Search](./Search.md) - 搜索框

---

## 📖 使用方法

### 1. 查找组件

在上方表格中找到需要的组件，点击"查看 API"链接。

### 2. 查看 API

打开组件文档，查看：
- 组件描述和使用场景
- 代码示例
- TypeScript 接口定义
- 所有可用属性

### 3. 使用组件

\`\`\`tsx
// Example: using the Form component
import { Form } from '@oh/yee-c';

// See docs: references/components/Form.md
// Learn about all properties and methods

const [form] = Form.useForm();
\`\`\`

---

## 🔍 快速搜索

### 在 VSCode 中搜索

\`\`\`bash
# 搜索组件文档
Ctrl+P → 输入组件名（如 Form.md）
\`\`\`

### 使用 Grep 工具

\`\`\`typescript
// Search for specific properties
Grep({
  path: "yee-dev-skill/references/components",
  pattern: "onFinish",
  output_mode: "content"
})
\`\`\`

---

## ⚠️ 注意事项

1. **文档版本** - 文档对应 @oh/yee-c 的当前版本
2. **更新频率** - 组件库更新时需重新运行脚本同步文档
3. **实际 API 优先** - 如有疑问，以组件库实际 API 为准
4. **代码示例** - 所有代码示例已从 demo 文件中提取并嵌入文档

`;

  return indexContent;
}

const componentsInfo = [];

// Iterate over component directories
components.forEach((componentName) => {
  const zhCNFile = path.join(SOURCE_DIR, componentName, 'index.zh-CN.md');

  // Check if index.zh-CN.md file exists
  if (fs.existsSync(zhCNFile)) {
    const targetFile = path.join(TARGET_DIR, `${componentName}.md`);
    const componentDir = path.join(SOURCE_DIR, componentName);

    // Read file content
    let content = fs.readFileSync(zhCNFile, 'utf-8');

    // Parse component info
    const info = parseComponentInfo(content);
    info.fileName = `${componentName}.md`;
    componentsInfo.push(info);

    // Process <code> tags, replace with actual code
    content = processCodeTags(content, componentDir);

    // Write to target file
    fs.writeFileSync(targetFile, content, 'utf-8');
    count++;
    console.log(`✓ ${componentName} -> ${componentName}.md`);
  }
});

console.log(`\nDone! Copied ${count} component docs to ${path.resolve(TARGET_DIR)}`);

// Generate INDEX.md file
console.log('\nGenerating index file...');
const indexContent = generateIndex(componentsInfo);
const indexFile = path.join(TARGET_DIR, 'INDEX.md');
fs.writeFileSync(indexFile, indexContent, 'utf-8');
console.log(`✓ Generated index file: ${indexFile}`);
