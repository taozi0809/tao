const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 项目部署的基础路径
    // publicPath:"/gametoken/dl",//游戏服务器
    // publicPath:"/",//chatlink
    // publicPath:"/regist",
    // publicPath:"/download",//titan  && token holdem  &&chat.link  &&tokenholdem0 &&竞技二打一 //golf
    publicPath:"/", //golf
    // publicPath:"/gdmj/dl",//快约财神麻将
    // publicPath:"/czddz/dl",//真人美女斗地主
    // publicPath:"/quanquan/download",//圈圈下载
    // 将构建好的文件输出到哪里
    outputDir: 'dist',
    //css相关
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px-to-viewport')({
                        viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                        // viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                        // viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
                        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
                        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
                        selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
                        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
                        mediaQuery: false // 允许在媒体查询中转换`px`
                    }),
                ]
            }
        },
    }
};
