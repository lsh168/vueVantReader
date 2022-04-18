// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 如果是vant，37.5，如果是自己的代码75.
      rootValue({file}){
        return file.indexOf('vant')!== -1 ? 37.5:75
      },
      // 配置要转换的css属性
      propList: ['*'],

      exclude:'github-markdown-light'
    },
  },
};