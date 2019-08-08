import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import * as baseConfig from './webpack.base.config';
import byui from '../config/by-ui';

let notes = [
    `Compile Building Components Successful!`
];

module.exports = merge(baseConfig, {
    mode: 'production',
    entry: {
        main: './src/index.ts'
    },
    output: {
        filename: 'by.js',
        library: 'by',
        libraryTarget: 'umd'
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    optimization: {
        splitChunks: false,
        runtimeChunk: false
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `/*! BY-UI v${require('../../package.json').version} | MIT License */`,
            raw: true,
            entryOnly: true
        }),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...byui
                ],
                notes: [
                    ...notes
                ],
            },
        }),
    ]
})
