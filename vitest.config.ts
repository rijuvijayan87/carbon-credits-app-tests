import { defineConfig } from "vitest/config";
import AllureReporter from "allure-vitest/reporter";

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 10000,
    include: ["tests/**/*.test.ts"],
    tags: [
      {
        name: "@smoke",
        description: "minimum required test as confidence gate",
      },
      { name: "@sanity", description: "response shape and contract sanity" },
      { name: "@regression", description: "full suite, runs on every push" },
    ],
    reporters: [
      "default",
      new AllureReporter({
        resultsDir: "allure-results",
      }),
    ],
  },
});
