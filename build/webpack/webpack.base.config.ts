import * as path from 'path';
import * as webpack from 'webpack';
import * as VueLoaderPlugin from 'vue-loader/lib/plugin';
import * as MarkdownItContainer from 'markdown-it-container';
import * as markdownItAnchor from 'markdown-it-anchor';
const slugify = require('transliteration').slugify;
const toc = require('markdown-it-table-of-contents');

import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import env from '../config/env';

const striptags = require('./tools/strip-tags');
const utils = require('./tools/utils');

const mode = process.env.ENV;
const isProduction = (mode === "production");

module.exports = {
    output: {
        path: path.resolve('dist'),
    },
    resolve: {
        alias: {
            "@": path.resolve("src"),
            "@docs": path.resolve("docs"),
            "mixins": path.resolve("docs/resources/mixins"),
            "By-UI": path.resolve("src")
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
                            preprocess: (MarkdownIt, source) => {
                                MarkdownIt.renderer.rules.table_open = function () {
                                    return '<table class="table">'
                                }
                                // 对于代码块去除v-pre,添加高亮样式
                                MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence)
                                return source
                            },
                            use: [
                                [markdownItAnchor, {
                                    level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
                                    slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
                                    permalinkClass: 'anchor',
                                    permalink: true, // 开启标题锚点功能
                                    permalinkBefore: true, // 在标题前创建锚点
                                    permalinkHref: (slug, state) => `javascript:toAnchor('${slug}')`,
                                }],
                                [toc, {
                                    includeLevel: [2, 3]
                                }],
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: !isProduction,
                            // publicPath: '../'
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: !isProduction
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: !isProduction
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
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
            minSize: 2048,
            cacheGroups: {
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                    minChunks: 20,
                },
                'vendors/library': {
                    name: 'vendors/library',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                'vendors/vue-bucket': {
                    name: 'vendors/vue-bucket',
                    test: /[\\/]node_modules[\\/](vue|vue-router|vuex|vue-class-component)[\\/]/,
                    priority: -1
                },
            }
        },
        runtimeChunk: {
            name: 'vendors/manifest',
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[contenthash].css' : '[name].css',
            chunkFilename: isProduction ? '[name].[contenthash].css' : '[name].css'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                domain: JSON.stringify(env.domain),
                host: JSON.stringify(env.host),
                customize: JSON.stringify(env.customize),
            },
        }),
    ],
}
