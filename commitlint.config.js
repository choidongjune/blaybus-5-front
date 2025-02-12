/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "refactor",
        "perf",
        "style",
        "comment",
        "rename",
        "remove",
        "test",
        "deps",
        "!HOTFIX",
      ],
    ],
  },
};

export default config;
