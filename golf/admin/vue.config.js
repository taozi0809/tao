// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //分析文件体积

const CompressionPlugin = require("compression-webpack-plugin") //开启gzip
const TerserPlugin = require("terser-webpack-plugin")//去除console.log&代码压缩

module.exports ={
    publicPath:"/admin",//线上
    outputDir: 'dist',
    productionSourceMap: false,
    configureWebpack:config=>{
        return{
            plugins: [
                // new BundleAnalyzerPlugin(),
                new CompressionPlugin({
                    filename:'[path].gz[query]',
                    algorithm:"gzip",
                    test:new RegExp('\\.(js|css)$'),
                    threshold:10240,
                    minRatio:0.8,
                }),
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        },
                        sourceMap: true,
                    }
                })
            ]
        }
    }

};
