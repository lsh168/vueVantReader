import Vue from 'vue'
// 全局引用Tabs组件
import Tabs from './components/Tabs'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './api/http'
import App from './App.vue'
// 导入全局样式文件
import './styles/index.less'

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(Tabs)
Vue.prototype.$axios=axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
