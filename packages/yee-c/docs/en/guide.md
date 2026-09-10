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
npm install @rainbow-oh/yee-c
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
  --yee-color-primary: #1890ff;
  --yee-color-success: #52c41a;
  --yee-color-warning: #faad14;
  --yee-color-error: #f5222d;
  --yee-color-text: #1d2129;
  --yee-color-border: #e5e8ef;
  --yee-radius: 4px; /* global base radius */
  --yee-radius-lg: 8px; /* global large radius */
}
```

Variables live in three layers under `src/style`:

| File                | Contents                                        | Build output                                                           |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| `color.css`         | All color tokens of the default theme           | `variables.css`                                                        |
| `size.css`          | Size / radius / font-size tokens                | `variables.css`                                                        |
| `zindex.css`        | Stacking layers                                 | `variables.css`                                                        |
| `color.<theme>.css` | Preset theme, selector `[data-theme='<theme>']` | `themes.css`, also importable as `@rainbow-oh/yee-c/color.<theme>.css` |

### Naming convention

Global semantic colors are named **`--yee-color-{semantic}[-suffix]`**:

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

A component-level token prefix **must equal that component's CSS class prefix**, so a token always
tells you which component it belongs to:

| Component CSS class | Token prefix           |
| ------------------- | ---------------------- |
| `.yee-btn`          | `--yee-btn-*`          |
| `.yee-input`        | `--yee-input-*`        |
| `.yee-range-picker` | `--yee-range-picker-*` |
| `.yee-input-number` | `--yee-input-number-*` |
| `.yee-image-viewer` | `--yee-image-viewer-*` |

This rule is enforced in CI by `pnpm lint:tokens` (`scripts/check-token-naming.js`): a new token
whose prefix matches no component class name fails the build.

> **Deprecated**: the old `--yee-{semantic}-color*` names (`--yee-primary-color`, `--yee-text-color`,
> `--yee-border-color`, `--yee-placeholder-color`, …) are deprecated as of **v0.12**.
> A compatibility alias block at the end of `color.css` maps the old names onto the new ones and
> **will be removed after one release cycle**. Please migrate to `--yee-color-*`. Alias list:
>
> | Old                       | New                       |
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
> (`*` means suffixes such as `-hover` / `-active` / `-bg` / `-border` are carried over as-is.)

> **Deprecated**: the following component-level token prefixes are also deprecated as of **v0.12**,
> now unified under "prefix = component CSS class prefix", with aliases kept for one release cycle:
>
> | Old prefix              | New prefix               | Based on                      |
> | ----------------------- | ------------------------ | ----------------------------- |
> | `--yee-rangepicker-*`   | `--yee-range-picker-*`   | `.yee-range-picker`           |
> | `--yee-image-preview-*` | `--yee-image-viewer-*`   | `.yee-image-viewer`           |
> | `--yee-tabitem-*`       | `--yee-tabs-tab-*`       | `.yee-tabs-tab`               |
> | `--yee-inputnumber-*`   | `--yee-input-number-*`   | `.yee-input-number`           |
> | `--yee-float-button-*`  | `--yee-float-btn-*`      | `.yee-float-btn`              |
> | `--yee-treeselect-*`    | `--yee-tree-select-*`    | `.yee-tree-select`            |
> | `--yee-timepicker-*`    | `--yee-time-picker-*`    | removes a double spelling     |
> | `--yee-star-icon-*`     | `--yee-rate-star-icon-*` | belongs to Rate (`.yee-rate`) |
>
> All aliases live inside the `deprecated-aliases:start … end` blocks in `color.css` / `size.css`,
> which the naming check skips.

### Preset themes

Built-in: `blue` `crimson` `dark` `gemini` `green` `jam` `navy` `peach` `pine` `pitaya` `pumpkin` `ruby`.
Import `themes.css` and set `data-theme` on the root element:

```javascript
import '@rainbow-oh/yee-c/variables.css';
import '@rainbow-oh/yee-c/themes.css';

document.documentElement.dataset.theme = 'gemini';
```

### Gemini theme

The `gemini` theme follows the Gemini UI design spec and overrides **both color and size tokens**
(form controls 40px / radius 12px, buttons 36px / radius 8px, cards and popups radius 14px, Roboto):

```css
[data-theme='gemini'] {
  --yee-color-primary: #6d5dfc;
  --yee-color-text: #1d2129;
  --yee-color-border: #e5e8ef;
  --yee-input-height: 40px;
  --yee-input-border-radius: 12px;
  --yee-btn-height: 36px;
  --yee-card-border-radius: 14px;
  /* … see src/style/color.gemini.css for the full list */
}
```

Or import just this theme:

```javascript
import '@rainbow-oh/yee-c/color.gemini.css';
```

Fonts must be self-hosted by the application (the spec requires Roboto; yee-c ships no font files).

### Dark Mode

```css
[data-theme='dark'] {
  --yee-color-bg-container: #1f1f1f;
  --yee-color-text: #ffffff;
}
```

## Next Steps

- Check out [Components](/components) for all available components
- Read [FAQ](/en/faq) for common questions
- Learn how to [Contribute](/en/contributing)
