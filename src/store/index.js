import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
// import book from './modules/book'
// import user from './modules/user'
// import getters from './getters'
// import actions from './actions'

Vue.use(Vuex)

const TOKEN_KEY = 'READER_USER'
export default new Vuex.Store({

  
  state: {
    // 一个对象，存储当前用户登陆信息（token数据）
    user: getItem(TOKEN_KEY),
    rankingText:'',
    rankingBooks:[],
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
 


  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 为防止刷新丢失，把数据存到本地
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
    },
    'SET_RankingBooks':(state,rankingBooks)=>{
      state.rankingBooks=rankingBooks

    },
    'SET_RankingText':(state,rankingText)=>{
      state.rankingText=rankingText

    },
    
  },
  actions: {
    // commit 方法，用于调用mutations。
    // state  获取值
    // book-------------------------
    setRankingBooks: ({ commit }, rankingBooks) => {
      return commit('SET_RankingBooks', rankingBooks)
    },
    setRankingText: ({ commit }, rankingText) => {
      return commit('SET_RankingText', rankingText)
    },

  },
  getters: {
    rankingBooks: state => state.fileName,
  
  }

})