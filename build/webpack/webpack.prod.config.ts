import * as path from 'path';
import * as merge from 'webpack-merge';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

import * as baseConfig from './webpack.base.config';

import byui from './by-ui';

let notes = [
    `Compile Successful!`
];

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: `[name].[contenthash].js`,
        chunkFilename: `[name].[contenthash].js`,
        publicPath: './',
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
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true,
                },
            }),
        ]
    }
})
