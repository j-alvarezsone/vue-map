// eslint.config.mjs
import antfu from "@antfu/eslint-config";

export default antfu({
  rules: {
    "curly": "off",
    "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "style/arrow-parens": ["error", "always"],
    "style/quotes": ["error", "double"],
    "style/max-statements-per-line": ["error", { max: 2 }],
    "jsonc/no-useless-escape": "off",
    "no-irregular-whitespace": "off",
    "no-console": "off",
    "vue/no-reserved-component-names": "off",
    "@stylistic/semi": ["error", "always"],
  },
  ignores: ["src/env.d.ts"],
});
