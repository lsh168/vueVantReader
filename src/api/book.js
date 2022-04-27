import request from "../utils/request";


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
// rankingBooks
// 查询热门图书
export const rankingBooks = () =>{
  return request({
    method:'POST',
    url:`/book/rankingBooks`
  })
}
// 通过用户查询阅读状态
export const selectReadStateByUser = (query) =>{
  return request({
    method:'POST',
    url:`/book/selectReadStateByUser`,
    params:query,
  })
}

// 查询图书列表
export const selectBooks = () =>{
  return request({
    method:'GET',
    url:`/admin/list`
  })
}