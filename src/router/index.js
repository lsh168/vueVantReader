import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../pages/Login'
Vue.use(Router)

export default new Router({
  linkActiveClass:"active",
  routes:[
    {
      path:'/login',
      name:'login',
      // 懒加载
      component: () => import ('@/pages/Login')
    },
    {
      path:'/',
      //name:'layout',//如果父路由有默认路由，name没有意义
      component:() =>import('@/pages/Layout'),
      children:[
        {
          path:'',//默认子路由,只能由一个
          name:'home',
          component:() =>import('@/pages/Home')
        },
        {
          path:'/my',//默认子路由
          name:'My',
          component:() =>import('@/pages/My')
        },
        
        
      ]

    },
    {
      path:'/search',
      name:'search',
      component: ()=>import('@/pages/Search')
    },
    {
      path:'/bookDetail/:id',
      name:'bookDetail',
      component: ()=>import('@/pages/BookDetail'),
      // 开启props接收参数，传参
      props:true

    },
    {
      path:'/user/profile',
      name:'userProfile',
      component: ()=>import('@/pages/UserProfile'),
      // 开启props接收参数，传参
      // props:true

    },
    
    // {
    //   path:'/registe',
    //   component:Registe
    // },
    

  ]
})