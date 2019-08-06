import * as path from 'path';
import * as merge from 'webpack-merge';
import * as TerserPlugin  from 'terser-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

const baseConfig = require('./webpack.base.config.ts');

import CleanWebpackPlugin from 'clean-webpack-plugin';

const byui = require('./by-ui');
let notes = new Array();

const timeReverse = new Date().getTime().toString().split('').reverse().join('');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: `[name].[contenthash].${timeReverse}.js`,
        chunkFilename: `[name].[contenthash].${timeReverse}.js`
    },
    devtool: false,
    stats: false,
    plugins: [
        new CleanWebpackPlugin(),
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
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true,
                },
            }),
        ]
    }
})
