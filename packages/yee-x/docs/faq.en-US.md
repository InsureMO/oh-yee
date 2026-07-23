---
title: FAQ
order: 3
nav:
  title: FAQ
  order: 7
---

# Frequently Asked Questions

## Installation

### How to install yee-x?

```bash
# Using npm
npm install @rainbow-oh/yee-x

# Using yarn
yarn add yee-x

# Using pnpm
pnpm add yee-x
```

### What if it doesn't work after installation?

1. Check if React version >= 18.0.0
2. Verify correct component import
3. Check console for error messages
4. Confirm project configuration supports ES6+ syntax

### How to handle performance with many messages?

1. Use virtual scrolling (recommend react-window)
2. Implement message pagination
3. Use React.memo for optimization
4. Avoid complex calculations during rendering

## Compatibility

### Which browsers are supported?

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

### Does it support mobile?

Yes, yee-x components support mobile, but some may need additional adaptation.

### Can I use it with Next.js?

Yes, but note:

<!-- ```bash
// Use dynamic import to avoid SSR issues
import dynamic from 'next/dynamic';

const Bubble = dynamic(() => import('@rainbow-oh/yee-x').then(mod => mod.Bubble), {
  ssr: false,
});
``` -->

### Can I use it with React Native?

yee-x is designed for Web and doesn't support React Native.

## Performance

### How to optimize initial load speed?

1. Use lazy loading
2. Enable code splitting
3. Load resources from CDN
4. Compress and optimize images

### How to reduce bundle size?

1. Import only needed components
2. Use Tree Shaking
3. Configure Babel for on-demand loading
4. Check for duplicate dependencies

## Development

### How to contribute?

See [Contributing Guide](/contributing) for details.

### How to report bugs?

1. Submit an Issue on GitHub
2. Provide reproduction steps and environment info
3. Attach relevant code and screenshots
4. Describe expected vs actual behavior

### How to suggest new features?

1. Start a discussion in GitHub Discussions
2. Explain use case and requirements
3. Provide design ideas (if any)
4. Wait for community feedback

## Other Questions

### Do I need authorization for commercial use?

yee-x uses MIT license and can be freely used in commercial projects.

### How to get technical support?

1. Check documentation and FAQ
2. Submit an Issue on GitHub
3. Join community discussions
4. Contact the maintenance team

### How often are updates released?

- Bug fixes: Released promptly
- New features: Released as needed
- Major versions: Released according to roadmap

---

## Didn't find an answer?

If the above doesn't solve your problem, please:

- Submit an [Issue](https://github.com/insureMO/oh-yee/issues)
- Join the [Discussion](https://github.com/insureMO/oh-yee/discussions)
- Check the [Guide](/guide)
