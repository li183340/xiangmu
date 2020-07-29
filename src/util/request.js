import axios from 'axios'
import store from '../store/index'
import router from '../router'
import {warning} from '../util/alert'


const head = '/api'
// const head = ''


//请求拦截
axios.interceptors.request.use(req=>{
    if(req.url!=head+'/api/userlogin'){
            req.headers.authorization = store.state.user.token
    }
    return req
})


//响应拦截
axios.interceptors.response.use(res=>{
    console.log(res.config.url)
    console.log(res)
    if(res.data.msg =='登录已过期或访问权限受限'){
        warning('请重新登陆')
        router.push('/login')
    }
    return res
})

//meun 添加
export const httpmeunadd =(params)=>{
    return axios({
        url:head+'/api/menuadd',
        method:'post',
        data:params
    })
}

//meun 获取
export const httpmeunList = ()=>{
    return axios({
        url:head+'/api/menulist',
        method:'get',
        params:{
            istree:true
        }
    })
}

//meun 删除
export const httpmeundel=(id)=>{
    return axios({
        url:head+'/api/menudelete',
        method:'post',
        data:{
            id:id
        }
    })
}

//meun 修改
export const httpmeunedit = (params)=>{
    return axios({
        url:head+'/api/menuedit',
        method:'post',
        data:params
    })
}


//meun 一条
export const httpmeuninfo = (id)=>{
    return axios({
        url:head+'/api/menuinfo',
        method:'get',
        params:{
            id:id
        }
    })
}



//=======================role===========================

//role 添加
export const httproleadd=(params)=>{
    return axios({
        url:head+'/api/roleadd',
        method:'post',
        data:params
    })
}

//role 获取
export const httprolelist=()=>{
    return axios({
        url:head+'/api/rolelist',
        method:'get',
        
    })
}

//role获取一条
export const httproleinfo =(id)=>{
    return axios({
        url:head+'/api/roleinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

//role修改
export const httproleedit=(params)=>{
    return axios({
        url:head+'/api/roleedit',
        method:'post',
        data:params
    })
}

//role删除
export const httproledelete=(id)=>{
    return axios({
        url:head+'/api/roledelete',
        method:'post',
        data:{
            id:id
        }
    })
}


//======================manage=========================================
// manage 添加
export const httpuseradd = (params)=>{
    return axios({
        url:head+'/api/useradd',
        method:'post',
        data:params
    })
}

//manage 管理员总数
export const httpusercount = ()=>{
    return axios({
        url:head+'/api/usercount',
        method:'get'
    })
}
//管理员列表
export const httpuserlist = (data)=>{
    return axios({
        url:head+'/api/userlist',
        method:'get',
        params:data
    })
}

//管理员获取（一条）
export const httpuserinfo = (uid)=>{
    return axios({
        url:head+"/api/userinfo",
        method:'get',
        params:{
            uid:uid
        }
    })
}

//管理员修改
export const httpuseredit = (params)=>{
    return axios({
        url:head+"/api/useredit",
        method:'post',
        data:params
    })
}
//管理员删除
export const httpuserdelete = (uid)=>{
    return axios({
        url:head+'/api/userdelete',
        method:'post',
        data:{
            uid:uid
        }
    })
}

//=============login==================================================
export const httpuserlogin =(params)=>{
    return axios({
        url:head+'/api/userlogin',
        method:'post',
        data:params
    })
}



//================cate==============================================
//商品分类添加
export const httpcateadd = (params)=>{
    var form =new FormData()
    for(let i in params){
        form.append(i,params[i])
    }
    return axios({
        url:head+'/api/cateadd',
        method:'post',
        data:form
    })
}

//商品分类列表
export const httpcatelist = ()=>{
    return axios({
        url:head+'/api/catelist',
        method:'get',
        params:{
            istree:true
        }
    })
}
//商品分类获取（一条）
export const httpcateinfo = (id)=>{
    return axios({
        url:head+'/api/cateinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

//商品分类修改
export const httpcateedit = (params)=>{
    var form =new FormData()
    for(let i in params){
        form.append(i,params[i])
    }
    return axios({
        url:head+'/api/cateedit',
        method:'post',
        data:form

    })
}
// 商品分类删除
export const httpcatedelete = (id)=>{
    return axios({
        url:head+"/api/catedelete",
        method:'post',
        data:{
            id:id
        }
    })
}


//===========================spec商品规格管理======================================================
//商品规格添加
export const httpspecsadd=(params)=>{
    return axios({
        url:head+'/api/specsadd',
        method:'post',
        data:params
    })
}
//商品规格总数（用于计算分页）

export const httpspecscount = ()=>{
    return axios({
        url:head+'/api/specscount',
        method:"get",
        
    })
}

//商品规格列表（分页）
export const httpspecslist =(ps)=>{
    return axios({
        url:head+'/api/specslist',
        method:"get",
        params:ps
    })
}

//商品规格获取（一条）
export const httpspecsinfo = (id)=>{
    return axios({
        url:head+'/api/specsinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

//商品规格修改
export const httpspecsedit = (params)=>{
    return axios({
        url:head+"/api/specsedit",
        method:'post',
        data:params
    })
}
//商品规格删除
export const httpspecsdelete = (id)=>{
    return axios({
        url:head+'/api/specsdelete',
        method:'post',
        data:{
            id:id
        }
    })
}

//=============================goods商品管理======================================
//商品添加
export const httpgoodsadd =(params)=>{
    var form = new FormData()
    for(let i in params){
        form.append(i,params[i])
    }
    return axios({
        url:head+"/api/goodsadd",
        method:'post',
        data:form
    })
}
// 商品总数（用于计算分页）
export const httpgoodscount = ()=>{
    return axios({
        url:head+"/api/goodscount",
        method:'get'
    })
}

//商品列表（分页）
export const httpgoodslist = (json)=>{
    return axios({
        url:head+"/api/goodslist",
        method:'get',
        params:json
    })
}

//商品获取（一条）
export const httpgoodsinfo = (id)=>{
    return axios({
        url:head+'/api/goodsinfo',
        method:'get',
        params:{
            id:id
        }
    })
}

//商品修改
export const httpgoodsedit =(params)=>{
    var form = new FormData()
    for(let i in params){
        form.append(i,params[i])
    }
    return axios({
        url:head+"/api/goodsedit",
        method:'post',
        data:form
    })
}

//商品删除
export const httpgoodsdelete = (id)=>{
    return axios({
        url:head+"/api/goodsdelete",
        method:"post",
        data:{
            id:id
        }
    })
}

//======================member七、会员管理==============================

//会员列表
export const httpmemberlist =()=>{
    return axios({
        url:head+"/api/memberlist",
        method:'get',
    })
}

//会员获取（一条）
export const httpmemberinfo = (uid)=>{
    return axios({
        url:head+'/api/memberinfo',
        method:'get',
        params:{
            uid:uid
        }
    })
}

//会员修改
export const httpmemberedit = (params)=>{
    return axios({
        url:head+'/api/memberedit',
        method:'post',
        data:params
    })
}

//====================================banner轮播图管理===============================

//轮播图添加
export const httpbanneradd=(params)=>{
    var form = new FormData()
    for(let i in params){
        form.append(i,params[i])
    }
    return axios({
        url:head+'/api/banneradd',
        method:'post',
        data:form
    })
}

//轮播图列表
export const httpbannerlist = ()=>{
    return axios({
        url:head+"/api/bannerlist",
        method:'get',

    })
}

//轮播图获取（一条）
export const httpbannerinfo = (id)=>{
    return axios({
        url:head+"/api/bannerinfo",
        method:'get',
        params:{
            id:id
        }
    })
}

//轮播图修改
export const httpbanneredit = (params)=>{
    var form = new FormData()
    for(let i in params){
        form.append(i,params[i])
    }
    return axios({
        url:head+"/api/banneredit",
        method:'post',
        data:form
    })
}

//轮播图删除
export const httpbannerdelete = (id)=>{
    return axios({
        url:head+"/api/bannerdelete",
        method:'post',
        data:{
            id:id
        }
    })
}


//===========================seckill限时秒杀管理=============================

//限时秒杀添加
export const httpseckadd = (params)=>{
    return axios({
        url:head+'/api/seckadd',
        method:"post",
        data:params

    })
}

//限时秒杀列表
export const httpsecklist = ()=>{
    return axios({
        url:head+"/api/secklist",
        method:'get'
    })
}

//限时秒杀获取（一条）
export const httpseckinfo = (id)=>{
    return axios({
        url:head+'/api/seckinfo',
        method:'get',
        params:{
            id:id
        }

    })
}

//限时秒杀修改
export const httpseckedit= (params)=>{
    return axios({
        url:head+'/api/seckedit',
        method:'post',
        data:params
    })
}

//限时秒杀删除
export const httpseckdelete=(id)=>{
    return axios({
        url:head+'/api/seckdelete',
        method:"post",  
        data:{
            id:id
        }
    })
}

  
//=====================================前台模块相关接口=================================================
//获取分类信息(首页)

export const httpgetcate=()=>{
    return axios({
        url:head+'/api/getcate',
        method:'get'
    })
}