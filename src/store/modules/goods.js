import {
  httpgoodscount,
  httpgoodslist
} from '../../util/request'
const state = {
  list:[],
  page:1,
  size:2,
  total:0,
  
}
const mutations = {
    changelist(state,arr){
        state.list = arr
    },
    changepage(state,page){
        state.page=page
    },
    changesize(state,size){
        state.size=size
    },
    changetotal(state,total){
        state.total=total
    },
}
const actions = {
    requestlist(context,bool){
        let json={}
        if(bool){
            json={}
        }else{
            json = {
                page:context.state.page,
                size:context.state.size,
            }
        }
        
        httpgoodslist(json).then(res=>{
            context.commit('changelist',res.data.list?res.data.list:[])
        })
    },
    requesttotal(context){
        httpgoodscount().then(res=>{
            context.commit('changetotal',res.data.list[0].total)
        })
    },
    changepage(context,page){
        context.commit('changepage',page)
    }
}
const getters = {
    list(){
        return state.list
    },
    page(){
        return state.page
    },
    size(){
        return state.size
    },
    total(){
        return state.total
    },
  
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true
}
