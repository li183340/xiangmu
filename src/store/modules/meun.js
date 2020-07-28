import {httpmeunList} from '../../util/request'
const state={
    list:[]
}
const mutations={
    changelist(state,arr){  
        state.list = arr
    }
}
const actions={
    requestmeunList(context){
        httpmeunList().then(res=>{
            context.commit('changelist',res.data.list?res.data.list:[])
        })
    }
}
const getters={
    list(){
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}