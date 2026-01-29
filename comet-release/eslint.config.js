import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'
import * as importPlugin from 'eslint-plugin-import'

export default tseslint.config(
    { ignores: ['dist', 'config', '.husky', 'public', '**/*.config.{js,ts}'] },
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
            '@typescript-eslint/no-misused-promises': [
                2,
                {
                    checksVoidReturn: {
                        attributes: false,
                    },
                },
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin', // Node.js built-in modules
                        'external', // External libraries from node_modules
                        'internal', // Internal modules (local imports)
                        'sibling', // Sibling imports
                        'parent', // Parent imports
                        'index', // Index imports
                    ],
                    alphabetize: {
                        order: 'desc', // Sort alphabetically
                        caseInsensitive: true, // Case-insensitive sorting
                    },
                    'newlines-between': 'always',
                },
            ],
        },
    }
)
