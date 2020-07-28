import {httpuserlist,httpusercount} from '../../util/request'

const state ={
    list:[],
    
    size:2,
    page:1,
    total:0,
   
}

const mutations={
    changelist(state,arr){
        state.list = arr
    },
    changetotal(state,total){
        state.total = total
    },
    changepage(state,page){
        state.page=page
    },
    changesize(state,size){
        state.size = size
    }   
}

const actions = {
     
    requestuser(context){
        httpuserlist({page:context.state.page,size:context.state.size}).then(res=>{
            context.commit('changelist',res.data.list?res.data.list:[])
        })
    },
    requesttotal(context){
        httpusercount().then(res=>{
            context.commit('changetotal',res.data.list[0].total)
        })
    },
    changepage(context,page){
        context.commit('changepage',page)
    }
}

const getters={
    list(){
        return state.list
    },
    total(){
        return state.total
    },
    page(){
        return state.page
    },
    size(){
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}