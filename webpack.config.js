// resolve 用来拼接绝对路径的方法
const { resolve } = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

process.env.NODE_ENV === "production";

// 处理样式的loader
const STYLE_LOADER_LIST = {
  // 将处理好的css，通过<style></style>的形式挂载到html中。
  STYLE_LOADER: "style-loader",
  // 处理各个css文件之间的关系，并将css文件合并成一段css, 添加到js文件中。
  CSS_LOADER: "css-loader",
  // 将less处理成可识别的css
  LESS_LOADER: "less-loader",
  // 对css进行兼容性处理
  POSTCSS_LOADER: {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          [
            "postcss-preset-env",
            {
              // 其他选项
            },
          ],
        ],
      },
    },
  },
};

module.exports = {
  // 入口文件
  entry: "./src/js/index.js",
  // 输出
  output: {
    // 输出文件的路径
    path: resolve(__dirname, "dist"),
    // 输出文件的名称
    filename: "bundle.js",
  },
  // loader【装载器】
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          // 提取 js 中的 css 成单独文件
          MiniCssExtractPlugin.loader,
          STYLE_LOADER_LIST.CSS_LOADER,
          STYLE_LOADER_LIST.POSTCSS_LOADER,
        ],
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          // 提取 js 中的 css 成单独文件
          MiniCssExtractPlugin.loader,
          STYLE_LOADER_LIST.CSS_LOADER,
          STYLE_LOADER_LIST.POSTCSS_LOADER,
          STYLE_LOADER_LIST.LESS_LOADER,
        ],
      },
      // 处理js
      {
        test: /\.js$/,
        // 排除node_modules, 只检查自己写的代码
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              // 只能处理一些常见的js语法
              "@babel/preset-env",
              {
                // 添加按需加载
                useBuiltIns: "usage",
                // 指定core.js 的版本
                corejs: {
                  version: 3,
                },
                // 指定兼容性做到哪个版本浏览器
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  // 插件
  plugins: [
    // 复制index.html 文件，并将webpack打包的之后文件【css/js】，添加到html中
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // css单独提取文件存放的目录
    new MiniCssExtractPlugin({
      filename: "css/build.css",
    }),
    // css压缩插件
    new OptimizeCssAssetsPlugin(),
    // js 语法检查
    new ESLintWebpackPlugin({
      // 会自动修复js语法错误（注意:会更改源文件）
      fix: true,
    }),
  ],
  // 生产模式
  mode: "production",

  devServer: {
    // 项目构建后的目录
    contentBase: resolve(__dirname, "dist"),
    // 是否开启g-zip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 是否自动打开浏览器
    open: true,
  },
};
