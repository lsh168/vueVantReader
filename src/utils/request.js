// 请求模块
import axios from 'axios'
import JSONBig from 'json-bigint'

import store from '@/store'
// import qs from 'qs'
// import { config } from 'vue/types/umd'
const request = axios.create({
  baseURL:'http://localhost:8866',
  // 自定义后端返回的原始数据
  transformRequest: [function(data){
    // 默认就是json格式的字符串
    // axios默认会在内部这样处理数据
    // return JSON.parse(data)
    try {
      return JSONBig.parse(data)
    } catch (error) {
      return data
    }
    // return data

  }]

})

// 请求拦截器

// 携带请求头发送请求
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  const { user } =store.state
  if(user && user.token){
    // config.headers.Authorization = `Bearer ${user.token}`
    // 这里的Authorization不是固定的，具体看后端设置
    config.headers.token = user.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器


// 
// request.interceptors.request.use((config)=>{
//   if(config.method==='post'){
//     config.data=qs.stringify(config.data)
//     console.log('拦截器执行');
//     return config
//   }},(error)=>{
//     return Promise.reject(error);
//   }
// )
export default request