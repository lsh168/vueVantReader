import request from "../utils/request";


// 获取话题列表列表
export const getTopicList=()=>{
  return request({
    method:'GET',
    url:'/topic/list'
  })
}
export const uploadFiles=data=>{
  return request({
    method:'post',
    url:'/admin/upload',
    data
  })
}

export const insertTopic=params=>{
  return request({
    method:'post',
    url:'/topic/insert',
    params
  })
}

export const removeTopic=params=>{
  return request({
    method:'delete',
    url:'/topic/delete',
    params
  })
}



// label接口
export const getLabelList=()=>{
  return request({
    method:'GET',
    url:'/label/list'
  })
}
