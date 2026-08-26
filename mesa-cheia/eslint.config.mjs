import expo from "eslint-config-expo/flat.js";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    ".expo/**",
    "build/**",
    "node_modules/**",
  ]),
  ...expo,
]);

export default eslintConfig;
