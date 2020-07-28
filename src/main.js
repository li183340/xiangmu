// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//重置css
import './assets/css/reset.css'


//vuex
import store from './store'


Vue.prototype.$img = 'http://localhost:3000'
//公共组件
import commonComponents from './components'
for(var i in commonComponents){
  Vue.component(i,commonComponents[i])
}


//公共过滤器
import filters from './filters'
for(var i in filters){
  Vue.filter(i,filters[i])
}


//全局守卫
router.beforeEach((to,from,next)=>{
      if(to.path=='/login'){
        next()
        return
      }
      var isLogin = localStorage.getItem('adm')
      if(isLogin){
        next()
        return
      }
      next('/login')
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
})
