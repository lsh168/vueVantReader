import request from "../utils/request";
export const verifyCode = () =>{
  return request({
    method:'GET',
    url:'verifyCode'
  })
}

