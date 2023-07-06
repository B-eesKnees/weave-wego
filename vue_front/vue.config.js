const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete('prefatch');  //prefatch 삭제
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api/',
        changeOrigin: true,
        pathRewrite: { "^/api": '' }
      },
      '/oauth2.0': {
        target: 'http://nid.naver.com'
      }
    },
    headers: { "Access-Control-Allow-Origin": "*" },
    allowedHosts: "all",
  }
})