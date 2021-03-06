const path = require('path');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    version: '>=0.7.12',
    type: 'app',
    staticPath: './static/',
    srcPath: './client/',
    docs: false,
    extractCSS: false,
    sourceMap: false,
    entry: {
        prepend: ['babel-polyfill', 'whatwg-fetch'],
        pages: ['index', 'dashboard', 'login'],
        commons: true,
    },
    webpack: {
        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '/public/',
        },
        resolve: {
            alias: {
                vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
                'vue-router$': path.resolve(__dirname, 'node_modules/vue-router/dist/vue-router.esm.js'),
                '@': path.resolve(__dirname, 'client'),
            },
        },
        plugins: [
            // 关联生成的 dll 信息文件
            new webpack.DllReferencePlugin({
                manifest: require('./dll/vendor.manifest.json'),
            }),
            // 将 vendor.js 带上 hash 并注入到 html 中
            new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, 'dll/vendor.js'),
                hash: true,
                includeSourcemap: false,
            }),
        ],
    },
    webpackDevServer: {
        // host: 'http://localhost',
        publicPath: '/public/',
        contentBase: path.resolve(__dirname, 'public'),
    },
};
