# Guide

Welcome to yee-c component library! This guide will help you get started quickly.

## Introduction

yee-c is a modern, high-quality React component library that provides a rich set of UI components to help you build beautiful and user-friendly web applications.

## Features

- **Modern Design**: Latest design concepts with consistent user experience
- **TypeScript Support**: Complete TypeScript type definitions
- **Highly Customizable**: Theme customization and style overrides
- **Accessibility**: WAI-ARIA compliant for better accessibility
- **Performance Optimized**: Components optimized for smooth experience

## Installation

```bash
npm install yee-c
# or
yarn add yee-c
# or
pnpm add yee-c
```

## Quick Start

```javascript
import { Button, Alert } from 'yee-c';

function App() {
  return (
    <div>
      <Button type="primary">Click Me</Button>
      <Alert type="success" message="Operation successful!" />
    </div>
  );
}
```

## Tree Shaking

yee-c supports tree shaking for optimal bundle size:

```javascript
import Button from 'yee-c/es/button';
```

## Theme Customization

### CSS Variables

Customize the theme by overriding CSS variables:

```css
:root {
  --yee-primary-color: #1890ff;
  --yee-success-color: #52c41a;
  --yee-warning-color: #faad14;
  --yee-error-color: #f5222d;
  --yee-border-radius: 4px;
}
```

### Dark Mode

```css
[data-theme='dark'] {
  --yee-bg-color: #1f1f1f;
  --yee-text-color: #ffffff;
}
```

## Next Steps

- Check out [Components](/components) for all available components
- Read [FAQ](/en/faq) for common questions
- Learn how to [Contribute](/en/contributing)
