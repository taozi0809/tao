
module.exports = {
    // publicPath: '/',// 本地/线上
    publicPath: '/test',// 测试
    outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: '',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    lintOnSave: true,// 是否在保存的时候检查
    productionSourceMap: true,// 生产环境是否生成 sourceMap 文件
    pluginOptions: {// 第三方插件配置
    },

    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
    },
};
