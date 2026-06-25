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
        "config",
        "docs",
        "refactor",
        "test",
        "ci",
        "perf",
        "build",
        "revert",
        "style",
      ],
    ],
  },
};
