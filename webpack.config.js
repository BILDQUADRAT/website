const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require("@babel/register");
require("@babel/polyfill");
const { getContentMap } = require('./template/util/collect-content');

module.exports = (env = {}) => {
    const isDevServer = !!env.devServer;
    const isDev = process.env.NODE_ENV !== 'production' && isDevServer;

    return [{
        mode: !isDev ? 'production' : 'development',

        entry: {
            index: [
                '@babel/polyfill',
                './template/index.jsx',
                './template/styles/main.scss',
            ],
            content: './template/import-all.js',
        },

        output: {
            filename: '[name].js',
            path: path.join(__dirname, 'build'),
            publicPath: '/',
        },

        externals: {
            React: 'react',
            ReactDOM: 'react-dom'
        },

        resolve: {
            modules: [
                'node_modules',
            ],
            extensions: ['.js', '.jsx'],
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: [
                        { loader: 'babel-loader' },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader', options: { url: false } },
                        { loader: 'sass-loader' },
                    ],
                },
                {
                    test: /index\.html\.ejs$/,
                    use: isDevServer ? [] : ["raw-loader"],
                },
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles/[name].css',
            }),

            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    IS_DEV_SERVER: JSON.stringify(isDevServer),
                },
            }),

            new CopyWebpackPlugin([
                { from: 'template/assets/', to: '' },
                /*
                            { from: 'public/images/', to: 'images/' },
                            { from: 'public/fonts/', to: 'fonts/' },
                            { from: 'public/icons/', to: 'icons/' },
                            { from: 'public/favicon.ico', to: 'favicon.ico' },
                            { from: 'public/mock/', to: 'mock/' },
                            { from: 'public/static/', to: 'static/' },
                */
            ]),

            new HtmlWebpackPlugin({
                inject: 'body',
                chunks: ['index', 'content'],
                template: './template/index.html.ejs',
                templateParameters: {
                    html: "",
                    title: "BILDQUADRAT",
                    scriptInsert: "",
                },
                filename: isDevServer ? 'index.html' : '../.tmp/index.html.ejs',
                hash: true,
            }),

            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'async'
            }),
        ],

        devtool: 'cheap-module-source-map',
        devServer: {
            contentBase: [path.join(__dirname, 'template/assets'), __dirname],
            port: process.env.PORT || 8080,
            publicPath: '/',
            before: app => {
                app.get('/content.json', async (req, res) => {
                    const content = await getContentMap().catch(e => { console.error(e); res.status(500).end(); });
                    res.json(content);
                });
            },
            historyApiFallback: true,
        }
    }, {
        mode: !isDev ? 'production' : 'development',

        entry: {
            cms: [
                './template/cms.jsx',
                'netlify-cms/dist/cms.css'
            ],
            site: [
                './template/styles/cms.scss',
            ],
        },

        output: {
            path: path.join(__dirname, "build/cms"),
            publicPath: "/cms/",
            filename: "[name].js"
        },

        resolve: {
            modules: [
                'node_modules',
            ],
            extensions: ['.js', '.jsx'],
        },

        module: {
            rules: [
                {
                    test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file-loader?name=/[hash].[ext]"
                },
                {
                    loader: "babel-loader",
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    query: {cacheDirectory: true}
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader', options: { url: false } },
                        { loader: 'sass-loader' },
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' },
                    ],
                },
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),

            new HtmlWebpackPlugin({
                inject: 'body',
                chunks: ['cmsBase', 'cms'],
                title: 'Netlify CMS',
                filename: 'index.html',
                hash: true,
            }),

            new CopyWebpackPlugin([
                { from: 'template/cms.yml', to: 'config.yml' },
            ]),
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules\/netlify-cms/,
                        chunks: "initial",
                        name: "cmsBase",
                        priority: 10,
                        enforce: true
                    }
                }
            },
            minimizer: isDev ? [] : [
                new UglifyJsPlugin({
                    exclude: /cmsBase\.js/,
                })
            ],
        },

        devtool: 'cheap-module-source-map',
    }];
};
