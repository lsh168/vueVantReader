import Vue from 'vue'
// 全局引用Tabs组件
import Tabs from './components/Tabs'
import router from './router'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import axios from './api/http'
import App from './App.vue'
import Vant from 'vant';
// 导入全局样式文件
import './styles/index.less'
import '../src/utils/dayjs';
import store from './store';

import 'vant/lib/index.css';
// 动态调整大小px
import 'amfe-flexible'
// 引入阅读器字体图标
import './assets/styles/icon.css'
// 引入阅读器全局样式文件
// import './assets/styles/global.scss'

import './mock'

Vue.use(Vant);
// Vue.use(ElementUI);
Vue.use(Tabs)
// Vue.prototype.$axios=axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
