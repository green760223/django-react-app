module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'off',
    'no-debugger': 'off',
    'no-var': 'error',
    'no-console': 'off',
    'react/jsx-no-undef': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-extra-semi': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    unresolved: 'off'
  }
}
