import request from "../utils/request";

export const evaluate= (query)=> {
  return request({
    url: '/member/evaluate',
    method: 'POST',
    params: query,
    // baseURL: 'http://localhost:8081', // 直接通过覆盖的方式
    
  })
}