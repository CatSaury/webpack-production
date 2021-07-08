# webpack 生产环境配置

# 1. css 文件提取成单独文件。 采用 mini-css-extract-plugin
# 2. 处理css兼容性。 采用 postcss-loader
# 3. css压缩 1.23 KiB -> 407 bytes。采用 optimize-css-assets-webpack-plugin
# 4. js语法检查(生产环境打包构建)。采用 eslint-webpack-plugin 
