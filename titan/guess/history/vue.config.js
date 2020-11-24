// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    // 项目部署的基础路径
    baseUrl:"/web/guess/history/",//我的竞猜
    // baseUrl:"/web/guess/suppliedDetails/",
    // baseUrl:"/web/guess/supplied/",
    // baseUrl:"/web/guess/recommend/",
    // 将构建好的文件输出到哪里
    outputDir: 'dist',
    // 是否在保存的时候使用 `eslint-loader` 进行检查。
    // 有效的值：`ture` | `false` | `"error"`
    // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave: true,
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    //去除console
    // configureWebpack:{
    //     optimization: {
    //         minimizer: [
    //             new UglifyJsPlugin({
    //                 uglifyOptions: {
    //                     compress: {
    //                         warnings: false,
    //                         drop_console: true,//console
    //                         drop_debugger: false,
    //                         pure_funcs: ['console.log']//移除console
    //                     }
    //                 }
    //             })
    //         ]
    //     }
    // },
    //css相关
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px-to-viewport')({
                        viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
                        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
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
