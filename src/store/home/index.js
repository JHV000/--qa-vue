import {reqGetAllQuestion} from '@/api'

//state:仓库存储数据的地方
const state = {
    questionList:[],
};

//action:处理action,可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //解构出commit，将数据提交给mutations
    async getAllQuestion({commit},obj){
        let res = await reqGetAllQuestion(obj.num)
        if(res.code==200){
            commit("GETALLQUESTION",res.data)
        }  
    }
};

//mutations:修改state的唯一手段
const mutations = {
    GETALLQUESTION(state,questionList){
        state.questionList = questionList
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