const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
    // 기존에 있는 다른 설정들...
    plugins: [
        new DotenvWebpackPlugin()
    ],
    watchOptions: {
        ignored: /node_modules/, // node_modules 폴더는 감시에서 제외
        aggregateTimeout: 300,   // 파일 변경 후 재빌드를 시작하기까지의 대기 시간 (밀리초)
        poll: 1000               // 폴링 간격 (밀리초)
    }
};
