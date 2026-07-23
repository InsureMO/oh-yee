# FAQ

Frequently asked questions about using yee-c.

## Installation & Imports

### Q: How to install yee-c?

```bash
npm install @rainbow-oh/yee-c
# or
yarn add yee-c
# or
pnpm add yee-c
```

### Q: Which React versions are supported?

yee-c requires React 18.0.0 or higher.

### Q: How to import components on demand?

```javascript
// Method 1: Import from subpackages
import Button from 'yee-c/es/button';

// Method 2: Use babel-plugin-import
import { Button } from 'yee-c';
```

Configure `babel-plugin-import`:

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

## Styling & Theming

### Q: How to customize the theme?

Use CSS variables:

```css
:root {
  --yee-primary-color: #1890ff;
  --yee-success-color: #52c41a;
  --yee-warning-color: #faad14;
  --yee-error-color: #f5222d;
}
```

### Q: How to enable dark mode?

```css
[data-theme='dark'] {
  --yee-bg-color: #1f1f1f;
  --yee-text-color: #ffffff;
}
```

## Usage Issues

### Q: Component styles not working?

1. Ensure styles are imported correctly
2. Check for conflicts with other style libraries
3. Verify CSS variables are set correctly

### Q: TypeScript type errors?

Install type definitions:

```bash
npm install @types/react @types/react-dom -D
```

## Compatibility

### Q: Which browsers are supported?

Modern browsers:

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

### Q: Is SSR supported?

Yes, most components support SSR. Some components like Dialog may need client-side rendering.

---

Still have questions? Ask in [GitHub Discussions](https://github.com/insureMO/oh-yee/discussions).
