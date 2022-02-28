module.exports = {
  env: {
    es6: true,
  },
  extends: ['react-app', 'prettier', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'arrow-body-style': ['error', 'always'],
    complexity: ['error', 5],
    curly: ['error', 'all'],
    'max-lines': ['error', 255],
    'prettier/prettier': 'error',
  },
}
