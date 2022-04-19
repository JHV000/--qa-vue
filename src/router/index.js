//配置router
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//重写push和replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//解决函数式路由传参，重复点击报错问题，因为是push返回的是一个promise，需要手动传递结果捕获resolve、reject
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject){
        //call篡改this指向为调用者即VueRouter实例，否则直接调用则是window
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}
let router = new VueRouter({
    //配置路由,注意是routes，忘记加s或者写成routers都错，哭死~
    routes
})

//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach((to,from,next)=>{
    //to:可以获取到你要跳转到那个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数  next(path)
    let token = store.state.user.token
    if(token){
        //登陆后去login，休想
        if(to.path=='/login'){
            next('/home')
        }else {
            next()
        }
    }else {
        next()
    }
    next()
    
})

export default router