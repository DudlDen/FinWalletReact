const webpack = require('webpack');
const [clientConfig,serverConfig] = require('../webpack.config');
const nodeMon = require('nodemon');
const path = require('path');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require("express");

const hmrServer = express();
const clientCompiler = webpack(clientConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler,{
    writeToDisk: true,
    publicPath: clientConfig.output.publicPath,
    stats: 'errors-only',
    serverSideRender: true,

}));

hmrServer.use(webpackHotMiddleware(clientCompiler,{
    path: '/static/__webpack_hmr',
}));

hmrServer.listen(3001, () => {
    console.log('HMR done');
})

const compiler = webpack(serverConfig);

compiler.run((err) =>{
    if (err) {
        console.log('Compilation failed: ', err);
    }
    compiler.watch({},(err) => {
       if (err) {
           console.log('Compilation failed: ', err);
       }
       console.log('Compilation')
    });

    nodeMon({
        script: path.resolve(__dirname,'../dist/server/server.js'),
        watch: [
            path.resolve(__dirname,'../dist/server'),
            path.resolve(__dirname,'../dist/client'),
        ]
    });
});