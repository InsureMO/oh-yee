# Yee

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A collection of React UI components, AI workflow components, and TypeScript utilities for building modern web applications.

## Packages

| Package | Version | Description |
|---|---|---|
| [`@rainbow-oh/yee-c`](./packages/yee-c) | [![npm](https://img.shields.io/npm/v/@rainbow-oh/yee-c.svg)](https://www.npmjs.com/package/@rainbow-oh/yee-c) | 65+ foundational UI components |
| [`@rainbow-oh/yee-x`](./packages/yee-x) | [![npm](https://img.shields.io/npm/v/@rainbow-oh/yee-x.svg)](https://www.npmjs.com/package/@rainbow-oh/yee-x) | AI-powered conversational components |
| [`@rainbow-oh/yee-tools`](./packages/yee-tools) | [![npm](https://img.shields.io/npm/v/@rainbow-oh/yee-tools.svg)](https://www.npmjs.com/package/@rainbow-oh/yee-tools) | TypeScript utility functions |

## Features

- **65+ UI Components** — Forms, tables, navigation, feedback, and more, built for enterprise applications
- **AI Workflow** — Schema-driven rendering, streaming chat, markdown, and conversation primitives
- **Utility Library** — Type-safe string, number, date, security, HTTP, and cache utilities with zero `any`
- **TypeScript First** — Full type definitions across all packages
- **Tree-shakeable** — Modular exports for optimal bundle size
- **Theming** — CSS variables and 10+ built-in color themes

## Quick Start

Install the packages you need:

```bash
# UI components
pnpm add @rainbow-oh/yee-c

# AI workflow components (requires @rainbow-oh/yee-c)
pnpm add @rainbow-oh/yee-x @rainbow-oh/yee-c

# Utility functions
pnpm add @rainbow-oh/yee-tools
```

Start using them:

```tsx
import { Button, Form, Input, Card, Table } from '@rainbow-oh/yee-c';
import { AIRenderer, Bubble, Markdown, Sender } from '@rainbow-oh/yee-x';
import { FetchUtils, DateUtils, StringUtils } from '@rainbow-oh/yee-tools';
```

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development mode (dumi docs)
pnpm dev

# Run tests
pnpm test

# Lint
pnpm lint

# Clean build artifacts
pnpm clean
```

## Versioning & Release

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing:

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm version

# Publish to npm
pnpm release
```

## License

[MIT](./LICENSE) © [InsureMO](https://github.com/InsureMO)
