# Carbon Credits API Tests

API test framework for the Carbon Credits application.

## Tools

- **Runtime**: Node
- **Language**: TypeScript
- **Test Framework**: Vitest
- **HTTP Client**: Got
- **Schema Validation**: Zod
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged + commitlint [[Conventional Commits](https://www.conventionalcommits.org/) is enforced in this repo to enforce commit message standards]

## Prerequisites

- Node.js >= 18
- pnpm >= 10.26.0

## Setup

```bash
git clone git@github.com:rijuvijayan87/carbon-credits-app-tests.git
cd carbon-credits-app-tests
pnpm install
```

## Running Tests

```bash
# Run all tests
pnpm test:run

# Watch mode for dev
pnpm test:watch

# Specific file
pnpm test:run -- <path_to_file>
# e.g.
pnpm test:run -- src/tests/category.test.ts
```

## Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Run ESLint with auto-fix
pnpm lint:fix

# Format code with Prettier
pnpm format
```

## Contributing

1. Create a feature branch from `main`
2. Write tests for new functionality
3. Ensure all tests pass: `pnpm test:run`
4. Ensure Commit message complies to [Conventional Commits](https://www.conventionalcommits.org/). Commit message validation are enforced via git hooks
5. Open a pull request
