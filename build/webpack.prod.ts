import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.base";
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const globAll = require('glob-all')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const glob = require('glob')

const prodConfig: Configuration = merge(baseConfig, {
    mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
    // 打包出口文件
    output: {
        filename: "static/js/[name]_[chunkhash:8].js", // 每个输出js的名称
        path: path.join(__dirname, "../dist"), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: "./", // 打包后文件的公共前缀路径
        assetModuleFilename: 'static/images/[chunkhash][ext][query]', // ... 这里自定义输出文件名的方式是，将某些资源发送到指定目录
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"), // 复制public下文件
                    to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
                    filter: (source) => !source.includes("index.html"), // 忽略index.html
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name]_[contenthash:8].css' // 抽离css的输出目录和名称
        }),
        // 清理无用css，检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
        // 只打包这些文件中用到的样式
        new PurgeCSSPlugin({
            // paths: globAll.sync(
            //     [`${path.join(__dirname, '../src')}/**/*`, path.join(__dirname, '../public/index.html')],
            //     {
            //         nodir: true
            //     }
            // ),
            paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, {
                nodir: true
            }),
            // 用 only 来指定 purgecss-webpack-plugin 的入口
            // https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin
            only: ["dist"],
            safelist: {
                standard: [/^ant-/] // 过滤以ant-开头的类名，哪怕没用到也不删除
            }
        }),
        // 打包时生成gzip文件
        new CompressionPlugin({
            test: /.(js|css)$/, // 只生成css,js压缩文件
            filename: '[path][base].gz', // 文件命名
            algorithm: 'gzip', // 压缩格式,默认是gzip
            threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
            minRatio: 0.8 // 压缩率,默认值是 0.8
        }),
    ],
    optimization: {
        // splitChunks: {
        //   chunks: "all",
        // },
        runtimeChunk: {
            name: 'mainifels'
        },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(), // 压缩css
            new TerserPlugin({
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'] // 删除console.log
                    }
                }
            })
        ],
        splitChunks: { // 分隔代码
            cacheGroups: {
                vendors: { // 提取node_modules代码
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1, // 提取优先级为1
                },
                commons: { // 提取页面公共代码
                    name: 'commons', // 提取文件命名为commons
                    minChunks: 2, // 只要使用两次就提取出来
                    chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                }
            }
        }
    },
    performance: {
        hints: false,
        maxAssetSize: 4000000, // 整数类型（以字节为单位）
        maxEntrypointSize: 5000000 // 整数类型（以字节为单位）
    }
});

export default prodConfig;
