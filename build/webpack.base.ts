import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
const webpack = require('webpack');
const path = require("path");

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式
const styleLoadersArray = [
    isDev ? "style-loader" : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
    {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: "[path][name]__[local]--[contenthash:5]",
            },
        },
    },
    'postcss-loader'
];

const baseConfig: Configuration = {
    entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    // loader 配置
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                // use:  ['thread-loader', 'babel-loader'],
                use:"babel-loader",
            },
            {
                test: /\.css$/, //匹配 css 文件
                exclude: /node_modules/,
                use: styleLoadersArray,
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    ...styleLoadersArray,
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                // 如果要在less中写类型js的语法，需要加这一个配置
                                javascriptEnabled: true
                            },
                        },

                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
                type: "asset", // type选择asset
                parser: {
                    dataUrlCondition: {
                        maxSize: 9 * 1024, // 小于10kb转base64
                    }
                },
                generator: {
                    filename: 'static/images/[contenthash][ext][query]', // 文件输出目录和命名
                },
            },
            {
                // 匹配json文件
                test: /\.json$/,
                type: "asset/resource", // 将json文件视为文件类型
                generator: {
                    // 这里专门针对json文件的处理
                    filename: "static/json/[name].[contenthash][ext][query]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
        // 别名需要配置两个地方，这里和 tsconfig.json
        alias: {
            "@": path.join(__dirname, "../src")
        },
        modules: [path.resolve(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找
    },
    // plugins
    plugins: [
        new HtmlWebpackPlugin({
            // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
          template: path.join(__dirname, "../public/index.html"),
          favicon: path.join(__dirname, "../public/favico.png"),
          title:'测试标题',
            // 压缩html资源
            minify: {
                collapseWhitespace: true, //去空格
                removeComments: true, // 去注释
            },
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ],
};

export default baseConfig
