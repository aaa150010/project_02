import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    sessionId:'',
  },
  mutations: {
    UpdateUser(state,userConfig){
      state.user=userConfig
    },
    setSessionId(state,ses){
      state.sessionId=ses
    }
  },
  actions: {
   
  },
  modules: {
  }
})
