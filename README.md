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

- **Node.js** `22.15.0` (pinned in `.nvmrc` — see [Setup](#setup) for install instructions)
- **pnpm** `10.26.0` (pinned in `package.json` via `packageManager`. (this is setup via [Corepack](https://pnpm.io/installation#using-corepack)). Make sure to run the `corepack` command in [Setup](#setup) below.

## Setup

> This assumes that you have already cloned the repo and are in project's root directory.

```bash
# Install and switch to the pinned correct Node version (please make sure nvm is installed)
nvm install

# Setup correct pnpm version
corepack enable pnpm

# Install project deps
pnpm install
```

## Environment Configuration

Tests run against different environments controlled by the `TEST_ENV` variable.

| `TEST_ENV` | Config file        | Test Status                                       |
| ---------- | ------------------ | ------------------------------------------------- |
| `dev`      | `config/.env.dev`  | ✅ Working                                        |
| `stg`      | `config/.env.stg`  | ⚠️ `APP_URL` is a placeholder — update before use |
| `prod`     | `config/.env.prod` | ⚠️ `APP_URL` is a placeholder — update before use |

> config file defaults to `dev` if not set.

Each `.env.*` file captures env specific configuration. An example of such env variable is in [dev config](./config/.env.dev)

> ⚠️ never commit real URLs or secrets. we will use sops with gpg key later to encrypt and decrypt config/.env.\* files

## Running Tests

```bash
# Run all tests (defaults to dev)
pnpm test:run

# Run against a specific environment
TEST_ENV=dev pnpm test:run
TEST_ENV=stg pnpm test:run # ⚠️ this won't work until the ./config/.env.stg is updated
TEST_ENV=prod pnpm test:run # ⚠️ this won't work until the ./config/.env.prod is updated

# Watch mode while doing dev
pnpm test:watch

# Run specific file
pnpm test:run -- <path_to_file>
# e.g. pnpm test:run -- src/tests/category.test.ts
```

## CI runs

Tests run automatically via GitHub Actions [.github/workflows/test.yaml](.github/workflows/test.yaml).

## Code Formatting

```bash
# Run linting across the codebase
pnpm lint

# Run lint with auto-fix
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
