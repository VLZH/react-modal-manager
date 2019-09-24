module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    plugins: ["react"],
    parser: "babel-eslint",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    },
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    }
};
