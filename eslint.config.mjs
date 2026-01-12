import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'node_modules/**',
    'next-env.d.ts',
  ]),

  {
    plugins: {
      unicorn,
      'simple-import-sort': simpleImportSort,
      sonarjs,
    },
    rules: {
      // Import ordering (Next doesn't enforce deterministic ordering)
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Extra bug-prevention & code-smell rules (not in Next defaults)
      ...unicorn.configs.recommended.rules,
      ...sonarjs.configs.recommended.rules,
    },
  },
]);
