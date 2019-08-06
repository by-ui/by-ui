const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const baseConfig = require('./webpack.base.config.ts');

const os = require("os");
const networkInterfaces = os.networkInterfaces();

import byui from './by-ui';

let ip = "";
const port = '11111';
for (var key in networkInterfaces) {
    networkInterfaces[key].forEach(item => {
        if (!item.internal && item.family === "IPv4") {
            ip = item.address;
        }
    });
}

module.exports = merge(baseConfig, {
    output: {
        publicPath: "/",
    },
    devServer: {
        host: ip,
        port: port,
        hot: true,
        open: true,
        quiet: true,
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    ...byui,
                ],
                notes: [
                    `start at: http://${ip}:${port}`,
                ],
            }
        }),
    ],

})
