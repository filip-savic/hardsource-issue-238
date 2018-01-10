var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: "./style.src.css",
    output: {
        path: __dirname,
        filename: "style.dist.css"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new HardSourceWebpackPlugin({
        cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
        recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
        configHash: function(webpackConfig) {
            return require('node-object-hash')({sort: false}).hash(webpackConfig);
        },
        environmentHash: {
            root: process.cwd(),
            directories: [],
            files: ['package-lock.json', 'yarn.lock'],
            },
        })
    ]
};
