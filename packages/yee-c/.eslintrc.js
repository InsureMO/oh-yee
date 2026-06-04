module.exports = {
    extends: require.resolve('@umijs/lint/dist/config/eslint'),
    rules: {
        'import/order': 'off',
        'import/newline-after-import': 'off',
        'import/first': 'off',
        // 你可以在这里添加其他需要覆盖的规则
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
    },
};
