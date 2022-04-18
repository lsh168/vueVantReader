import request from "../utils/request";
import qs from 'qs'

// import store from '@/store'
export const login=(username,password,vc)=>{
  return qs.stringify(request({
    method:'POST',
    url:'/member/check_login',
    username,
    password,
    vc
  }))
}

// 登录
export const getLogin= (query)=> {
  return request({
    url: '/user/login',
    method: 'POST',
    params: query,
    baseURL: 'http://localhost:8866', // 直接通过覆盖的方式
    
  })
}
// 获取用户信息
export const getUserInfo= ()=> {
  return request({
    url: '/user/info',
    method: 'POST',
    // params: query,
    baseURL: 'http://localhost:8866', // 直接通过覆盖的方式

    // headers:{
    //   Authorization:`Bearer ${store.user.token}`
    // }
    
  })
}
// 点赞
export const addEnjoy= (query)=> {
  return request({
    url: '/member/enjoy',
    method: 'POST',
    params: query,
    // baseURL: 'http://localhost:8866', // 直接通过覆盖的方式
    
  })
}

export const updateUserProfile= (query)=> {
  return request({
    // baseURL: 'http://localhost:8866', // 直接通过覆盖的方式
    url: '/user/updateUserProfile',
    method: 'PATCH',
    params: query,
    
    
  })
}
// 更新阅读状态
export const updateReadState= params => {
  return request({
    url: '/member/update_read_state',
    method: 'POST',
    params
  })
}
