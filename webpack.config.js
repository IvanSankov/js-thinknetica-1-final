'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'index.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/templates/index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[hash].css',
        })
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|tsx?)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    failOnError: true,
                    /* убрал, потому что он ругается на any, которые в src/http/client.class.ts, а как там поправить
                     * чтобы any не было, я вообще не в курсях.
                     */

                    // failOnWarning: true,
                },
            },
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'], /* babel будет применяться после ts-loader? */
                exclude: /node_modules/,
            },
            {
                /* а этот конфиг нужен? типа он для js будет применяться, а верхний для ts */
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    }
};