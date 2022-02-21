import Vue from 'vue'
import Router from 'vue-router'

import Registe from '../pages/Registe'
import Home from '../pages/Home'
Vue.use(Router)

export default new Router({
  linkActiveClass:"active",
  routes:[
    {
      path:'/',
      component:Home
    },
    {
      path:'/registe',
      component:Registe
    },

  ]
})