module.exports = {
    
    //close eslint
    lintOnSave:false,
    //打包时不带上map文件
    productionSourceMap:false,
    //代理解决跨域
    devServer:{
        proxy: {
            "/api": {
              target: "http://127.0.0.1:3007",
              pathRewrite: {"^/api" : ""}
            },
            '/socket.io':{
              target: 'http://127.0.0.1:8888/', // target host
              changeOrigin: true, // needed for virtual hosted sites
              logLevel: 'debug'
            },
            '/sockjs-node': {
              target: 'http://127.0.0.1:8888',
              ws: false,
              changeOrigin: true
            }
          
          }
    }
}