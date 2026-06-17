module.exports = {
  plugins: [
        require.resolve('prettier-plugin-organize-imports'),
        require.resolve('prettier-plugin-packagejson'),
    ],
    tabWidth: 2,
    printWidth: 80,
    proseWrap: 'never',
    singleQuote: true,
    trailingComma: 'all',
    semi: true,
    bracketSpacing: true,
    endOfLine: 'lf',
    jsxSingleQuote: false,
    overrides: [
        {
            files: '*.md',
            options: {
                proseWrap: 'preserve',
            },
        },
        {
            files: ['*.less', '*.css'],
            options: {
                tabWidth: 2,
            },
        },
    ],
};
