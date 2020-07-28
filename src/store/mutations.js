
export const state = {
    user:sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem('user')):null
    
}
export const mutations = {
    changeuser(state,user){
        state.user=user
        sessionStorage.setItem('user',JSON.stringify(state.user))
    }
}
export const getters = {
    user(){
        return state.user
    }
}