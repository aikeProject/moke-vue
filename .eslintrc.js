module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 单引号
    quotes: [1, 'single'],
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: false,
      },
    ],
    // indent: ['error', 2],
    'prettier/prettier': [
      'warn',
      {
        // jsxBracketSameLine: true,
        // jsxSingleQuote: true,
        // disableLanguages: ['vue'],
      },
    ],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
