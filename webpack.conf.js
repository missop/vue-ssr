const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const {VueLoaderPlugin} = require('vue-loader')

const isDev = process.env.NODE_ENV == 'development'


const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [
             {
                 test:/\.vue/,
                 loader:'vue-loader'
             },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]

            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_DEV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin()
    ]
}

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: '8000',
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config
