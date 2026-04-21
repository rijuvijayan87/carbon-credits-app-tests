export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "chore",
        "test",
        "docs",
        "refactor",
        "style",
        "ci",
        "perf",
      ],
    ],
  },
};
