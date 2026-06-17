module.exports = {
  extends: require.resolve('@umijs/lint/dist/config/eslint'),
  rules: {
    'import/order': 'off',
    'import/newline-after-import': 'off',
    'import/first': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
};
