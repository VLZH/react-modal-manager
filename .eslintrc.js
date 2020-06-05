module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended",
        "prettier/@typescript-eslint",
        "plugin:@typescript-eslint/recommended",
    ],
    plugins: ["react", "jest", "prettier", "@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
};
