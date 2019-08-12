module.exports = function (api) {
    api.cache(true);

    const presets = [
        ["@babel/env", {
            // "useBuiltIns": "entry",
            "modules": false
        }],
        "@vue/babel-preset-jsx"
    ];
    const plugins = [
        "@babel/transform-runtime",
        "@babel/syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
    ];

    return {
        presets,
        plugins
    };
}
