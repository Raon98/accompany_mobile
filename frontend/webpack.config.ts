const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    // 기본 설정...
    plugins: [
        new DotenvWebpackPlugin()
    ]
};