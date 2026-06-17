---
title: Contributing Guide
order: 5
nav:
  title: Contributing
  order: 9
---

# Contributing Guide

Thank you for considering contributing to yee-x! We welcome all forms of contributions.

## Code of Conduct

Please follow our code of conduct and maintain a friendly and respectful environment.

## How to Contribute

### Reporting Bugs

If you find a bug:

1. Search GitHub Issues for existing reports
2. If none exist, create a new Issue
3. Use the Bug report template
4. Provide detailed reproduction steps
5. Include environment info and screenshots

### Suggesting Features

If you have a feature suggestion:

1. Start a discussion in GitHub Discussions
2. Explain the use case and requirements
3. Wait for community feedback
4. Begin implementation after approval

### Submitting Code

#### Development Workflow

1. Fork the project to your account
2. Clone locally: `git clone https://github.com/your-username/yee-x.git`
3. Create a branch: `git checkout -b feature/your-feature`
4. Install dependencies: `pnpm install`
5. Develop your feature
6. Run tests: `pnpm test`
7. Commit: `git commit -m "feat: your feature"`
8. Push: `git push origin feature/your-feature`
9. Create a Pull Request

#### Code Standards

- Use TypeScript
- Follow ESLint rules
- Format with Prettier
- Write unit tests
- Add necessary comments

#### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: new feature
fix: bug fix
docs: documentation update
style: code formatting
refactor: code refactoring
test: testing related
chore: build/tooling related
```

### Improving Documentation

Documentation improvements are equally important:

1. Fix typos and grammar
2. Add missing documentation
3. Improve code examples
4. Translate documentation

## Development Guide

### Project Structure

```
yee-x/
├── src/              # Source code
│   ├── Bubble/       # Component directory
│   ├── Markdown/
│   └── ...
├── docs/             # Documentation
├── .dumi/            # Dumi config
└── package.json
```

### Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm start

# Build docs
pnpm run docs:build

# Build library
pnpm run build

# Run tests
pnpm test
```

### Adding New Components

1. Create component directory in `src/`
2. Create component files and styles
3. Add TypeScript type definitions
4. Write unit tests
5. Add documentation and examples
6. Export in `src/index.ts`

## Pull Request Guidelines

### Pre-submission Checklist

- [ ] Code passes ESLint
- [ ] Code passes TypeScript checks
- [ ] All tests pass
- [ ] Documentation added
- [ ] CHANGELOG updated

### PR Description

Please include in your PR:

- Purpose and background
- Implementation approach
- Testing details
- Related Issues

## Release Process

Releases are handled by maintainers:

1. Update version number
2. Update CHANGELOG
3. Create Git Tag
4. Publish to npm
5. Create GitHub Release

## Getting Help

If you need help while contributing:

- Check existing documentation
- Ask in Discussions
- Contact the maintainers

---

Thank you again for your contribution!
