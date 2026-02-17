# Contributing to Valory Website

Thank you for your interest in contributing! This document provides guidelines for contributing code to this repository.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Quality](#code-quality)
- [Pull Request Process](#pull-request-process)
- [Getting Help](#getting-help)

## Getting Started

Before contributing, please:

1. Review the [README](README.md) for setup instructions
2. Copy `env.example` to `.env` and set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_KEY` (required for news/post pages and CMS images)
3. Check the Issues page for open tasks

## Development Workflow

### 1. Choose an Issue

- Find an issue you'd like to work on
- Comment on the issue to indicate you're working on it to avoid duplicate efforts
- If you're proposing a new feature, open an issue first to discuss it

### 2. Create a Branch

Follow the naming convention with kebab-case:

```bash
# For features
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/issue-description

# For chores/maintenance
git checkout -b chore/description
```

### 3. Make Changes

- Write clear, focused commits
- Follow the code quality guidelines below
- Test your changes thoroughly
- Update documentation if your changes affect user-facing features or developer workflows

### 4. Test Your Changes

```bash
# Run the development server
yarn dev

# Run linting
yarn lint

# Run linting with auto-fix
yarn lint:fix

# Run build to ensure no build errors
yarn build
```

Ensure all checks pass before submitting.

### 5. Submit a Pull Request

- Push your branch to GitHub
- Create a pull request with a clear description
- We use [conventional commits](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#types) for titles
- Reference any related issues
- Ensure all CI checks pass

## Code Quality

### JavaScript/TypeScript Standards

- **ESLint**: Follow the configured ESLint rules
- **Prettier**: Code formatting is enforced via Prettier
- **TypeScript**: Use TypeScript for new code where applicable

### Code Style Guidelines

- Use descriptive variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused
- Follow existing patterns in the codebase
- Avoid code duplication—extract shared logic to `utils/`

### File Organization

- `pages/` — Next.js pages (Pages Router)
- `components/` — React components (Layout, Meta, HomePage sections, Content/News, Content/Post, etc.)
- `utils/` — Shared utilities and CMS API client (`utils/api`)
- `public/` — Static assets
- `styles/` — Global styles
- `types/` — TypeScript type definitions (e.g. `Article`)

Content (blog posts, images) is managed in the backend CMS; this repo is the frontend only.

## Pull Request Process

### Commit Messages

Follow conventional commit format:

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring without changing functionality
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Examples:**

```
feat: add teammate
fix: resolve navigation issue on mobile
docs: update CONTRIBUTING.md
```

### Before Submitting

1. **Run code quality checks**

   ```bash
   yarn lint
   yarn build
   ```

2. **Ensure your branch is up to date** with the base branch

3. **Write a clear PR description** explaining what changes you made and why

4. **Add screenshots/recordings** for UI changes

5. **Update meta title and description** if modifying pages

### PR Review Process

1. **Automated checks** run via CI
2. **Code review** by maintainers—address all feedback
3. **Approval and merge** by maintainers

## Getting Help

- **Setup & Usage**: Check the [README](README.md)
- **Issues**: Search existing issues or create new ones

## License

By contributing to this project, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE).

---

Thank you for contributing! 🚀
