import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.base";

const prodConfig: Configuration = merge(baseConfig, {
    mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
    // 打包出口文件
    output: {
        filename: "static/js/[name].js", // 每个输出js的名称
        path: path.join(__dirname, "../dist"), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: "./", // 打包后文件的公共前缀路径
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
    ],
});

export default prodConfig;
