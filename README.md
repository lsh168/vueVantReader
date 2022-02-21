# demo-reader

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


笔记
引入element-ui
npm install --save element-ui
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  Vue.use(ElementUI);

// q全局引用，在main.js中引用
import Tabs from "./components/Tabs"
Vue.use(Tabs)

全局引入Axios
  import Axios from "axios"
  Vue.prototype.$axios=Axios;

引入路由
  npm install --save vue-router

配置，动态设置px
  npm i amfe-flexible   用于设置rem基准值
  导入import ‘amfe-flexible’
  
  px转换rem   开发过程中的工具
$ npm install postcss postcss-pxtorem@5.1.1 --save-dev
 根目录创建文件进行配置

