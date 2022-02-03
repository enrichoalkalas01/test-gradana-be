const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
    return {
        entry: './src/main.ts',
        output: {
            path: __dirname + '/dist',
            filename: 'app.js'
        },

        plugins: [
            new CopyWebpackPlugin([
                { from: 'src/assets', to: 'assets' },
            ]),

            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html',
                output: __dirname + '/dist',
                inject: 'head'
            })
        ]
    }
}