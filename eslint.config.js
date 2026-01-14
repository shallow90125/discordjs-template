import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import importX from 'eslint-plugin-import-x'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginReact from 'eslint-plugin-react'
import hooks from 'eslint-plugin-react-hooks'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  {
    extends: ['js/recommended'],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { js },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  hooks.configs.flat.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    plugins: {
      'import-x': importX,
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'import-x/no-named-as-default': 'off', // import importXにwarningが出る
      'import-x/no-named-as-default-member': 'off', // importX.flatConfigsにwarningが出る
      'import-x/no-unresolved': 'off', // cloudflare:workersでエラーになる
      'import/order': 'off', // perfectionistと競合
      'react/prop-types': 'off', // missing in props validation
      'react/react-in-jsx-scope': 'off', // 'React' must be in scope when using JSX
      'sort-imports': 'off', // perfectionistと競合
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  perfectionist.configs['recommended-natural'],
  prettier,
])
