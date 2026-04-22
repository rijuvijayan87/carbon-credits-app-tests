import { defineConfig } from "vitest/config";
import AllureReporter from "allure-vitest/reporter";

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 10000,
    include: ["tests/**/*.test.ts"],
    tags: [
      { name: "@smoke", description: "Bare-minimum confidence gate" },
      { name: "@sanity", description: "Broader shape and contract sanity" },
      { name: "@regression", description: "Full suite, runs on every push" },
    ],
    reporters: [
      "default",
      new AllureReporter({
        resultsDir: "allure-results",
      }),
    ],
  },
});
