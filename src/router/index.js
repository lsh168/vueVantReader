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
      path:'/forget',
      name:'forget',
      // 懒加载
      component: () => import ('@/pages/Forget')
    },
    {
      path:'/signIn',
      name:'signIn',
      // 懒加载
      component: () => import ('@/pages/SignIn')
    },
    {
      path:'/publish',
      name:'publish',
      // 懒加载
      component: () => import ('@/pages/Publish')
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
          path:'/piazza',
          name:'piazza',
          component:() =>import('@/pages/Piazza')
        },
        {
          path:'/gc',
          name:'gc',
          component:() =>import('@/pages/Gc')
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
    {
      path:'/ranking',
      name:'ranking',
      component: ()=>import('@/pages/Ranking'),
      // 开启props接收参数，传参
      // props:true

    },
    {
      path:'/recommend',
      name:'recommend',
      component: ()=>import('@/pages/Recommend'),
    },

    // {
    //   path:'/ebook',
    //   name:'ebook',
    //   // 懒加载
    //   component: () => import ('@/pages/EBook'),
    //   children:[
    //     {
    //       path: ':fileName',
    //       component: () => import ('@/components/ebook/EBookReader'),
    //     }
    //   ]
    // },

    // {
    //   path:'/registe',
    //   component:Registe
    // },


  ]
})
