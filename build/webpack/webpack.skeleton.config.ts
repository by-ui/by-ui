import * as path from 'path';
import * as webpack from 'webpack';

import * as VueLoaderPlugin from 'vue-loader/lib/plugin';
import * as nodeExternals from 'webpack-node-externals';
import * as VueSSRServerPlugin from 'vue-server-renderer/server-plugin';

module.exports = {
    target: 'node',
    entry: {
        skeleton: './docs/skeleton/skeleton.entry.ts'
    },
    output: {
        path: path.resolve('dist'),
        publicPath: '/dist/',
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new VueSSRServerPlugin({
            filename: 'skeleton.json'
        })
    ]
}
