const path = require('path');
const nodeExt = require('webpack-node-externals');
const NODE_ENV = process.env.NODE_ENV;
const { DefinePlugin } = require('webpack');

const GLOBAL_CSS_REGEXP = /\.global\.css$/;

module.exports = {
    target: 'node',
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, '../src/server/Server.js'),
    output: {
        path: path.resolve(__dirname,'../dist/server'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.js','.jsx','.ts','.tsx','.json']
    },
    externals: [nodeExt()],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|jp2|webp|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader:'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                mode: 'local',
                                localIdentName:'[name]__[local]--[hash:base64:5]',
                                exportOnlyLocals: true,
                            },

                        },
                    },
                ],
                exclude: GLOBAL_CSS_REGEXP,
            },
            {
                test:GLOBAL_CSS_REGEXP,
                use:['css-loader']
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    plugins: [new DefinePlugin({'process.env.CLIEN_ID':`'${process.env.CLIENT_ID}'`})]
};