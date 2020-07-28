import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



import {state,mutations,getters} from './mutations'
import actions from './actions'

import meun from './modules/meun'
import role from './modules/role'
import manage from './modules/manage'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import member from './modules/member'
import banner from './modules/banner'
import seckill from './modules/seckill'
 const store= new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    meun,
    role,
    manage,
    cate,
    spec,
    goods,
    member,
    banner,
    seckill
  }
})

export default store