import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
const index = () => {
  return import('../pages/index/index')
}
const login = () => {
  return import('../pages/login/login')
}
Vue.use(Router)

function root(url){
  
 return store.state.user.menus_url.some(item=>item==url)
  
}

const router= new Router({
  routes: [{
      path: '/',
      component: index,
      children: [
        {
          path:'home',
          component: ()=>import('../pages/home/home'),
          name:''
        },
        {
          path:'menu',
          component: ()=>import('../pages/meun/menu'),
          name:'菜单管理',
          beforeEnter(to,from,next){
            root('/menu')?next():next('/home')
          }
        }, 
        {
          path:'role',
          component: ()=>import('../pages/role/role'),
          name:'角色管理',
          beforeEnter(to,from,next){
            root('/role')?next():next('/home')
          }

        },
        {
          path:'manage',
          component: ()=>import('../pages/manage/manage'),
          name:'管理员管理',
          beforeEnter(to,from,next){
            root('/manage')?next():next('/home')
          }
        },
        {
          path:'cate',
          component: ()=>import('../pages/cate/cate'),
          name:'商品分类',
          beforeEnter(to,from,next){
            root('/cate')?next():next('/home')
          }
        },
        {
          path:'spec',
          component: ()=>import('../pages/spec/spec'),
          name:'商品规格',
          beforeEnter(to,from,next){
            root('/spec')?next():next('/home')
          }
        },
        {
          path:'member',
          component: ()=>import('../pages/member/member'),
          name:'会员管理',
          beforeEnter(to,from,next){
            root('/member')?next():next('/home')
          }
        },
        {
          path:'goods',
          component: ()=>import('../pages/goods/goods'),
          name:'商品管理',
          beforeEnter(to,from,next){
            root('/goods')?next():next('/home')
          }
        },
        {
          path:'seckill',
          component: ()=>import('../pages/seckill/seckill'),
          name:'秒杀活动',
          beforeEnter(to,from,next){
            root('/seckill')?next():next('/home')
          }
        },
        {
          path:'banner',
          component: ()=>import('../pages/banner/banner'),
          name:'轮播图管理',
          beforeEnter(to,from,next){
            root('/banner')?next():next('/home')
          }
        },
        {
          path:'',
          redirect:'home'
        }
    ]
    },
    {
      path: '/login',
      component: login
    },

  ]
})


router.beforeEach((to,from,next)=>{
    if(to.path=='/login'){
      next()
      return
    }
    if(store.state.user){
      next()
      return
    }
    next('/login')
})


export default router