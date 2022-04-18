/**
 * 封装本地存储模块
 */

// 存储数据
export const setItem=(key,value)=>{
  // 将数组和对象转换成JSON
  if(typeof value==='object'){
    // console.log(typeof value,value);
    value=JSON.stringify(value)
    // console.log(typeof value,value);
  }
  window.localStorage.setItem(key,value)

}


// 获取数据
export const getItem=key=>{
  const data=window.localStorage.getItem(key)
  try {
    // return data
    return JSON.parse(data)
  } catch (error) {
    return data
    
  }
}

// 删除数据

export const removeItem=key=>{
  window.localStorage.removeItem(key)
}