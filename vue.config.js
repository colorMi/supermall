const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack:{
      resolve:{
          alias:{
              'assets':'@/assets',
              'common':'@/common',
              'components':'@/components',
              'nextwork':'@/nextwork',
              'views':'@/views',
              'plugins':'@/plugins',
          }
      }
  }
}