import Vue from 'vue'
import Vuex from 'vuex'
import { getItem,setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY='READER_USER'
export default new Vuex.Store({
  state:{
    // 一个对象，存储当前用户登陆信息（token数据）
    // user:null
    user:getItem(TOKEN_KEY)
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
  },
  mutations:{
    setUser(state,data){
      state.user=data
      // 为防止刷新丢失，把数据存到本地
      setItem(TOKEN_KEY,state.user)
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
    }
  },
  actions:{},
  modules:{}
})