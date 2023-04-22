module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        react: { pragma: 'React', version: 'detect' },
    },
    extends: [
        'eslint:recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'prettier',
        'prettier/prettier',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['jsx-a11y', 'react', 'prettier'],
    rules: {
        'prettier/prettier': [
            'warn',
            { endOfLine: 'auto', singleQuote: true, jsxSingleQuote: true },
        ],
        'no-duplicate-imports': ['warn', { includeExports: true }],
        'no-template-curly-in-string': 'warn',
        'camelcase': ['warn', { properties: 'always' }],
        'default-case': 'warn',
        'no-lone-blocks': 'warn',
        'prefer-const': 'warn',
        'yoda': 'error',

        'react/boolean-prop-naming': ['warn', { validateNested: true }],
        'react/button-has-type': 'warn',
        'react/no-array-index-key': 'warn',
        'react/no-unstable-nested-components': 'error',
        'react/no-unused-prop-types': 'warn',
        'react/no-unused-state': 'warn',
        'react/self-closing-comp': 'warn',
        'react/jsx-no-constructed-context-values': 'warn',
        'react/jsx-no-leaked-render': [
            'warn',
            { validStrategies: ['ternary', 'coerce'] },
        ],
        'react/prop-types': 'off',
        'jsx-a11y/click-events-have-key-events': 'warn',
        'jsx-a11y/no-static-element-interactions': 'warn',
    },
};
