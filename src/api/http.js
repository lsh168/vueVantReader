import base from './base'
import axios from 'axios'

const getData={
  registe(username,password,vc,nickname){
    return axios.post(base.baseUrl+'/member/registe', {
      username,password,vc,nickname
    })
  },
  getTodayRecommend(){
    return axios.get(base.baseUrl+"/book/categoryList")
  }

}
export default getData