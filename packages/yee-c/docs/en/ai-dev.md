# AI Development

Build React projects with the **yee-\*** tech stack using **yee-dev-skill**, an AI-assisted development tool.

## Two Modes

### Analyze Mode

Generate frontend development documents from BSD (Business Solution Document) files.

**Usage:**

```
/yee-dev-skill analyze [BSD document path]
```

**Output:**

- `docs/project-structure.md` — Project structure + routes + menus
- `docs/page-specs.md` — Detailed page specifications
- `docs/api-and-types.md` — TypeScript types + API + CodeTable + Mock

### Develop Mode

Code frontend features using Yee component libraries.

**Usage:**

```
/yee-dev-skill
```

## Supported Libraries

| Library           | Description            | Count |
| ----------------- | ---------------------- | ----- |
| **@oh/yee-c**     | UI component library   | 62    |
| **@oh/yee-x**     | AI workflow components | 16    |
| **@oh/yee-biz**   | Business components    | 2     |
| **@oh/yee-tools** | Utility functions      | 13    |

## Installation

Install yee-dev-skill via the VS Code extension **Yee Skill Manager**, which automatically syncs the latest version.

## Quick Start

### 1. Create a Project

```bash
npx @oh/yee-cli@latest create my-project -y
cd my-project
pnpm install
pnpm dev
```

### 2. Start AI Development

In Claude Code, navigate to the project directory and enter:

```
/yee-dev-skill
```

Then describe what you want to build, for example:

- "Create a user management list page"
- "Add a form page for creating records"
- "Build an approval detail page"

## Development Workflow

1. **Understand requirements** — Describe page type, features, and APIs
2. **Plan tasks** — AI creates a task checklist automatically
3. **Implement step by step** — State management, data fetching, event handling, error handling
4. **Auto-validate** — TypeScript type checking + ESLint
5. **Summary** — Review completed features and notes

## Component Quick Reference

### Form Components

- **Form** / **Form.Field** — Form container and fields
- **Input** / **InputNumber** / **TextArea** — Text input
- **Select** / **TreeSelect** / **Cascader** — Selectors
- **DatePicker** / **RangePicker** — Date pickers
- **Checkbox** / **Radio** / **Switch** — Toggle controls

### Display Components

- **Table** — Data table (search + pagination + sorting)
- **Card** / **Box** — Container layout
- **Grid** / **Space** — Grid and spacing
- **Descriptions** — Description list

### Interaction Components

- **Button** — Buttons
- **Dialog** / **Drawer** — Modals and drawers
- **message** / **notice** — Message notifications
- **Upload** — File upload

### Utilities

- **FetchUtils** — HTTP requests (get, post, put, delete)
- **StringUtils** — String utilities (trim, isEmpty, isBlank)
- **DateUtils** — Date utilities (format, parse)
- **ArrayUtils** — Array utilities (unique, chunk, isRepeat)

## Best Practices

1. **Plan before coding** — Use AI to generate task checklists
2. **Check component docs** — Look up props before using
3. **Complete business logic** — Include state, data, events, and error handling
4. **Auto-validate** — Run TypeScript and ESLint checks after coding
