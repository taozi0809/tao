const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const webpack = require('webpack')
const path = require('path')

module.exports = {
    publicPath:'/',
    outputDir: 'dist',
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return
        return {
            plugins: [
                new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, 'dist'),
                    routes: ['/', '/movie', '/tv'],
                    // 这个很重要，如果没有配置这段，也不会进行预编译
                    renderer: new Renderer({
                        inject: {
                            foo: 'bar'
                        },
                        headless: false,
                        renderAfterDocumentEvent: 'render-event',
                    })
                })
            ]
        }
    },
}