const path = require('path');

const HtmlPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MarkdownItContainer = require('markdown-it-container');

const striptags = require('./strip-tags');
const utils = require('./utils');


module.exports = {
    entry: {
        index: [path.resolve("docs/index.ts")]
    },
    output: {
        path: path.resolve('dist'),
        publicPath: "/",
    },
    resolve: {
        alias: {
            "@": path.resolve("src"),
            "@docs": path.resolve("docs"),
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: "vue-loader",
                options: {
                    parallel: false
                }
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader'
                    },
                    {
                        loader: 'vue-markdown-loader/lib/markdown-compiler',
                        options: {
                            raw: true,
                            // preprocess: (MarkdownIt, source) => {
                            //     MarkdownIt.renderer.rules.table_open = function () {
                            //       return '<table class="table">'
                            //     }
                            //     MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
                            //     return source
                            //   },
                            use: [
                                [MarkdownItContainer, 'demo', {
                                    validate: params => params.trim().match(/^demo\s*(.*)$/),
                                    render: (tokens, idx) => {
                                        if (tokens[idx].nesting === 1) {
                                            const html = utils.convertHtml(striptags(tokens[idx + 1].content, 'script'))

                                            return `<demo-box>
                                            <div slot="demo">${html}</div>
                                            <div slot="source-code">`
                                        }

                                        // closing tag
                                        return '</div></demo-box>'
                                    }
                                }]
                            ]
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader",
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.yml$/,
                loader: 'json-loader!yaml-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsxSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg)$/,
                include: /image/,
                loader: "url-loader",
                query: {
                    limit: 1,
                    name: "asset/images/[hash:16].[ext]"
                }
            },
            {
                test: /\.(ttf|woff2?|eot|svg)$/,
                include: /font/,
                loader: "url-loader",
                query: {
                    limit: 1,
                    name: "asset/fonts/[name].[hash:7].[ext]"
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: '[name].[contenthash].css'
        // }),
        new HtmlPlugin({
            filename: "index.html",
            title: "By-ui",
            template: path.resolve("docs/index.html"),
            showErrors: true,
        }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         domain: JSON.stringify(domain),
        //         host: JSON.stringify(host),
        //     },
        // }),
    ],
}
