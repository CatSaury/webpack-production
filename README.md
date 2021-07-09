# webpack 生产环境配置

# 1. css 文件提取成单独文件。 采用 mini-css-extract-plugin
# 2. css 兼容性。 采用 postcss-loader
# 3. css 压缩 1.23 KiB -> 407 bytes。采用 optimize-css-assets-webpack-plugin
# 4. js 语法检查(生产环境打包构建)。采用 eslint-webpack-plugin 
# 5. js 兼容。采用babel-loader 按需加载
# 6. js 压缩。 mode: 'produciton' 设定为生产环境会默认压缩代码 
