FROM node:24.12.0-slim

RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY src/ ./src/
COPY tests/ ./tests/
COPY config/ ./config/
COPY vitest.config.ts tsconfig.json ./

ARG TEST_TAGS=smoke
ARG TEST_ENV=dev
ARG LOG_LEVEL=info

ENV TEST_TAGS=${TEST_TAGS} \
    TEST_ENV=${TEST_ENV} \
    LOG_LEVEL=${LOG_LEVEL} \
    CI=1

VOLUME ["/app/allure-results"]

CMD pnpm test:${TEST_TAGS}
