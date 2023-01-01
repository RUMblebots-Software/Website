const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        liveReload: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/html/meet-the-team.html',
            filename: 'meet-the-team.html'
        })],
    module: {
        rules: [
            {

                test: /\.css$/i,

                use: ['style-loader', 'css-loader'],

            },
            {

                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: () => [
                                    require('autoprefixer')
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            warnRuleAsWarning: true,
                        },
                    }
                ]
            },
            {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                type: 'asset/resource',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },

        ]
    },
    ignoreWarnings: [(warning) => true]
}
