/* 
  create-react-app 配置反向代理的步骤：
  1 在 src 目录中创建一个名为： setupProxy.js 的文件
    注意：这个文件名称是约定好的，名称不能变
  2 安装代理中间件： yarn add http-proxy-middleware
  3 参考文档中给出的示例代理代码，修改为我们项目中功能即可

  注意：配置反向代理后，需要重启 yarn start 才会生效！！！
*/

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'https://api.douban.com/v2',
      pathRewrite: {
        '^/api': ''
      },
      changeOrigin: true
    })
  )
}
