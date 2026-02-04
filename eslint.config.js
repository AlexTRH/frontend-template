import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'
import * as importPlugin from 'eslint-plugin-import'

export default tseslint.config(
    { ignores: ['dist', 'config', 'public', '**/*.config.{js,ts,mjs}'] },
    {
        files: ['**/*.{js,ts,tsx}'],
        settings: { react: { version: '19.0.0' } },
        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, prettier],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react,
            import: importPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            'import/extensions': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-misused-promises': [2, { checksVoidReturn: { attributes: false } }],
            '@typescript-eslint/consistent-type-imports': 'error',
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index'],
                    alphabetize: { order: 'desc', caseInsensitive: true },
                    'newlines-between': 'always',
                },
            ],
        },
    },
    {
        files: ['src/mocks/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
        },
    }
)
