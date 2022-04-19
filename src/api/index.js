//API统一管理
import requests from './request'

//获取验证码 /api/user/passport/sendCode/{phone} 模板字符串案例
// export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'GET'})

/**
 * 用户模块api
 */
//注册
export const reqUserRegister = (data) => requests({
    url: '/api/register',
    data,
    method: 'post'
})

//登录
export const reqUserLogin = (data) => requests({
    url: '/api/login',
    data,
    method: 'post'
})

//获取用户信息
export const reqGetUserInfo = () => requests({
    url: '/my/getUserInfo',
    method: 'get'
})


/**
 * 问答模块api
 */
//
export const reqGetAllQuestion = (num) => {
    return requests({
        url: '/api/getAllQuestion?num='+num,
        method: "GET"
    })
}

export const reqGetAllComment = (id) => {
    return requests({
        url: '/api/getAllComment?qid=' + id,
        method: "GET"
    })
}

export const reqAddQuestion = (data) => requests({
    url: '/api/addQuestion',
    data,
    method: 'post'
})

export const reqAddComment = (data) => requests({
    url: '/api/addComment',
    data,
    method: 'post'
})