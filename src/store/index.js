//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//引入小仓库
import home from './home'
import user from './user'
//需要使用插件一次
Vue.use(Vuex)

//暴露一个Store类的一个实例
export default new Vuex.Store({
    //配置对象
    modules:{
        home,
        user
    }
});
