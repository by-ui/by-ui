module.exports = function (api) {
    api.cache(true);
    const presets = [
        ["@babel/env", {
            "modules": false
        }],
        "@vue/babel-preset-jsx"
    ];
    const plugins = [
        "@babel/transform-runtime",
        "@babel/syntax-dynamic-import", //支持babel语法动态导入的插件
        ["component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "~_intermediate/element-ui-theme"
            }
        ]
    ];

    return {
        presets,
        plugins
    };
}