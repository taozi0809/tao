module.exports = {
    publicPath: '/jj/admin',// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    // publicPath: '/jj/test/admin',// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: '',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    lintOnSave: true,// 是否在保存的时候检查
    productionSourceMap: true,// 生产环境是否生成 sourceMap 文件
    pluginOptions: {// 第三方插件配置
        // ...
    },
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    },

    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        host: "0.0.0.0",
        port: 8081,
        // 端口号
        https: false,
        // https:{type:Boolean}
        open: false,
        //配置自动启动浏览器
        hotOnly: true,
        // 热更新
        // proxy: 'http://localhost:8080' // 配置跨域处理,只有一个代理
        // proxy: { //配置多个跨域
        //     "/api": {
        //         target: "http://172.11.11.11:7071",
        //         changeOrigin: true,
        //         // ws: true,//websocket支持
        //         secure: false,
        //         pathRewrite: {
        //             "^/api": "/"
        //         }
        //     },
        //     "/api2": {
        //         target: "http://172.12.12.12:2018",
        //         changeOrigin: true,
        //         //ws: true,//websocket支持
        //         secure: false,
        //         pathRewrite: {
        //             "^/api2": "/"
        //         }
        //     },
        // }
    }
};
