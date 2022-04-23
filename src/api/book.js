import request from "../utils/request";
// import qs from 'qs'
// export const login=(username,password,vc)=>{
//   return qs.stringify(request({
//     method:'POST',
//     url:'/member/check_login',
//     username,
//     password,
//     vc
//   }))
// }

// 获取图书分类列表
export const getCategoryList=()=>{
  return request({
    method:'GET',
    url:'/book/categoryList'
  })
}

export const getBooks = params =>{
  return request({
    method:'GET',
    url:'/book/selectBooks',
    params
  })
}
export const getBookById = bookId =>{
  return request({
    method:'GET',
    url:`/book/${bookId}`,
    
  })
}

export const getUploadImgUrl = data =>{
  return request({
    method:'POST',
    url:`/admin/upload`,
    data
  })
}
// GET 请求参数用data表示，及收不到参数。
// 后台显示为空
export const getReadState = params =>{
  return request({
    method:'GET',
    url:`/book/SelectReadState`,
    params
  })
}

// 查询热门图书
export const selectHotBooks = params =>{
  return request({
    method:'POST',
    url:`/book/selectHotBooks`,
    params
  })
}