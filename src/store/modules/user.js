import { getItem,setItem } from '@/utils/storage'


// const TOKEN_KEY='READER_USER'
const user={
  state:{
    // 一个对象，存储当前用户登陆信息（token数据）
    user:getItem("READER_USER"),
    // user:JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // fileName:'',

  },
  mutations:{
    setUser(state,data){
      state.user=data
      // 为防止刷新丢失，把数据存到本地
      setItem("READER_USER",state.user)
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
    },
    // 'SET_FILENAME':(state, fileName)=>{
    //   state.fileName=fileName
    // }
  },

}
export default  user 