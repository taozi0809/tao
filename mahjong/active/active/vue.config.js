const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    publicPath:"/",
    outputDir: 'dist',
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
                    require('postcss-import')({}),
                    require('postcss-url')({}),
                    require('postcss-aspect-ratio-mini')({}),
                    require('postcss-write-svg')({utf8: false}),
                    require('postcss-cssnext')({}),
                    require('postcss-viewport-units')({}),
                    require('cssnano')({
                        preset: "advanced",
                        autoprefixer: false,
                        "postcss-zindex": false
                    }),

                ]
            }
        },
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            config.plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true,
                            drop_console: true,  //生产环境自动删除console
                        },
                        warnings: false,
                    },
                    sourceMap: false,
                    parallel: true,//使用多进程并行运行来提高构建速度。默认并发运行数：os.cpus().length - 1。
                })
            );
        }
    }
};
