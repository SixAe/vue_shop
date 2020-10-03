// vue.config.js
module.exports = {
    lintOnSave: false,
    devServer: {
        overlay: {
            warning: false,
            errors: false
        },
        /* 解决跨域问题 */
        proxy: {
            '/api': {
                target: 'https://www.xxx.com', //目标路径，别忘了加http和端口号
                changeOrigin: true, //是否跨域
                ws: true,
                pathRewrite: {
                    '^/api': '' //重写路径
                }
            }
        }
    }
}