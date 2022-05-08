import request from "../utils/request";


// 获取图书分类列表
export const getTopicList=()=>{
  return request({
    method:'GET',
    url:'/topic/list'
  })
}



// label接口
export const getLabelList=()=>{
  return request({
    method:'GET',
    url:'/label/list'
  })
}
