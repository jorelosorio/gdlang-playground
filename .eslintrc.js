module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    'no-console': ['error', { allow: ['debug', 'error'] }],
  },
  ignorePatterns: [
    'dist/**',
    'node_modules/**',
    'webpack.config.js',
    'src/static/*.js',
  ],
};
