import {reqUserRegister,reqUserLogin,reqGetUserInfo} from '@/api'
import { setToken,getToken, removeToken } from '@/utils/token';
//state:仓库存储数据的地方
const state = {
   userinfo:{}
};

//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //解构出commit，将数据提交给mutations

    //注册
    async userRegister({commit},user){
        let res = await reqUserRegister(user)
        //无返回值则无需修改state数据
        if(res.code==200){
            return "ok"
        }else {
            return Promise.reject(new Error('failed'))
        }
        // console.log(res);
    },
    //登录
    async userLogin({commit},user){
        let res = await reqUserLogin(user)
        // console.log(res.data);
        //无返回值则无需修改state数据
        if(res.code==200){
            setToken(res.data.token)
            return "ok"
        }else {
            return Promise.reject(new Error('failed'))
        }
        // console.log(res);
    },
     //获取用户信息
     async getUserInfo({commit}){
        let res = await reqGetUserInfo()
        //无返回值则无需修改state数据
        if(res.code==200){
            commit("GETUSERINFO",res.data)
            // return "ok"
        }else {
            return Promise.reject(new Error('failed'))
        }
       
    },
    async userLoginOut({commit}){
        commit("CLEAR")
    },
    
  
};

//mutations:修改state的唯一手段
const mutations = {
    GETUSERINFO(state,userinfo){
        // console.log(state);
        state.userinfo = userinfo
    },
    CLEAR(state){
        state.token = ''
        state.userinfo = ''
        removeToken()
    }
};

//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

export default {
    //配置对象
    state,
    actions,
    mutations,
    getters
};