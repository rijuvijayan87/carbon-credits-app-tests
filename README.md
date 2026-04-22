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

Tests are tagged as `@smoke`, `@sanity`, or `@regression`.

> tags are defined in individual [tests](./tests).
> e.g. `{ tags: ["@smoke"] }`,

```bash
# run smoke tests
pnpm test:smoke

# run sanity tests
pnpm test:sanity

# run sanity tests
pnpm test:regression

# Override environment
TEST_ENV=stg pnpm test:smoke  # ⚠️ update config/.env.stg before use
TEST_ENV=prod pnpm test:smoke # ⚠️ update config/.env.prod before use

# Watch mode
pnpm test:watch

# Run specific file
pnpm test:run -- <path_to_file>
# e.g. pnpm test:regression -- src/tests/category.test.ts
```

## Allure Reports

Allure results are written to `allure-results/` automatically when tests run.

```bash
# Generate + open report in one command
pnpm allure:serve

# Or generate then open separately
pnpm allure:generate
pnpm allure:open
```

## Docker

Run tests in Docker and view the allure report locally.

```bash
# Build
docker build -f docker/Dockerfile -t carbon-credits-tests .

# Run tests. this is currently a hack.
#i.e. to volume mount reports into local disk and serve the report from there
# therefore make sure you run this command from the `carbon-credits-app-tests` repo
docker run --rm \
  -e TEST_TAGS=regression \
  -e TEST_ENV=dev \
  -v $(pwd)/allure-results:/app/allure-results \
  carbon-credits-tests

# Serve the report
pnpm allure:serve
```

## CI runs

Tests run automatically via GitHub Actions [.github/workflows/test.yaml](.github/workflows/test.yaml).

### Triggers

| Trigger             | Behaviour                                            |
| ------------------- | ---------------------------------------------------- |
| `push` to `main`    | Runs automatically with defaults                     |
| `pull_request`      | Runs automatically with defaults                     |
| `workflow_dispatch` | Manual run from GitHub Actions UI with custom inputs |

### Defaults (push / pull_request)

| Variable    | Default      |
| ----------- | ------------ |
| `TEST_TAGS` | `regression` |
| `TEST_ENV`  | `dev`        |
| `LOG_LEVEL` | `info`       |

### Manual run inputs (workflow_dispatch)

Trigger a run from **Actions → Carbon Credits API Tests → Run workflow**:

| Input         | Options                         | Default |
| ------------- | ------------------------------- | ------- |
| `tags`        | `smoke`, `sanity`, `regression` | `smoke` |
| `environment` | `dev`, `stg`, `prod`            | `dev`   |
| `logLevel`    | `info`, `warning`, `debug`      | `info`  |

> `workflow_dispatch` is only available when the workflow file exists on the default branch (`main`).

### Allure Report Artifact

After every run the Allure report is uploaded as a GitHub Actions artifact. To access it:

1. Go to **Actions → your run → Artifacts**
2. Download `allure-report.zip`
3. Unzip and run `pnpm allure:open` or serve it with `pnpm dlx serve allure-report`

## Contributing

1. Create a feature branch from `main`
2. Write tests for new functionality
3. Ensure all tests pass: `pnpm test:run`
4. Ensure Commit message complies to [Conventional Commits](https://www.conventionalcommits.org/). Commit message validation are enforced via git hooks
5. Open a pull request
