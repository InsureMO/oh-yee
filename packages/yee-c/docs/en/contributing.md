# Contributing Guide

Thanks for your interest in contributing to yee-c! We welcome all forms of contributions.

## How to Contribute

### Report Issues

If you find a bug or have a feature request:

1. Search [GitHub Issues](https://github.com/insureMO/oh-yee/issues)
2. Create a new issue if not found
3. Provide detailed description and reproduction steps

### Submit Code

#### Development Setup

```bash
# Clone repository
git clone https://github.com/insureMO/oh-yee.git
cd yee-c

# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build
npm run build
```

#### Branch Convention

- `master`: Stable branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `docs/*`: Documentation updates

#### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style
- `refactor`: Refactor
- `perf`: Performance
- `test`: Tests
- `chore`: Build/tools

**Examples:**

```bash
feat(button): add loading state support
fix(dialog): fix close animation
docs: update quick start guide
```

#### Pull Request Process

1. **Fork** and create your branch

   ```bash
   git checkout -b feature/awesome-feature
   ```

2. **Make changes** and run checks

   ```bash
   npm run lint
   npm test
   ```

3. **Commit** your changes

   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

4. **Push** to your fork

   ```bash
   git push origin feature/awesome-feature
   ```

5. **Create Pull Request** with the template

### Code Standards

#### Component Development

```javascript
// File structure
// src/ComponentName/
// ├── index.ts          # Export entry
// ├── component.tsx     # Component implementation
// ├── interface.ts      # Type definitions
// ├── style/            # Styles
// └── __tests__/        # Tests

// Naming: PascalCase
export const Button: React.FC<ButtonProps> = (props) => {
  // ...
};

// Props: ComponentNameProps
export interface ButtonProps {
  type?: 'primary' | 'default';
  children?: React.ReactNode;
}
```

### Documentation

Each component should include:

1. Component description
2. API documentation
3. Code examples
4. Usage notes

## Become a Maintainer

To become a maintainer:

1. Submit at least 5 quality PRs
2. Participate in discussions and reviews
3. Understand codebase and conventions

## Code of Conduct

- Be respectful and professional
- Welcome different perspectives
- Focus on what, not who

## License

Contributions are licensed under [MIT License](LICENSE).

## Contact

- [GitHub Issues](https://github.com/insureMO/oh-yee/issues)
- [GitHub Discussions](https://github.com/insureMO/oh-yee/discussions)

Thanks for contributing! 🎉
