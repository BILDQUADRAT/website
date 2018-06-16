const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

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
                chunks: ['index'],
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
        }
    }, {
        mode: !isDev ? 'production' : 'development',

        entry: {
            cms: [
                './template/cms.jsx',
                'netlify-cms/dist/cms.css'
            ],
        },

        output: {
            path: path.join(__dirname, "build/cms"),
            publicPath: "/cms/",
            filename: "[name].js"
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
                title: 'Netlify CMS',
                filename: 'index.html',
                hash: true,
            }),

            new CopyWebpackPlugin([
                { from: 'template/netlifycms.yml', to: 'config.yml' },
            ]),
        ],

        devtool: 'cheap-module-source-map',
    }];
};
