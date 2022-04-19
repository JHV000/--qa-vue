// 引入axios
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import { Message } from 'element-ui';
//创建axios实例
let requests = axios.create({
    //配置对象
    //配置基础路径，请求时会加上/api
    baseURL:'http://127.0.0.1:3007',
    //配置请求超时时间
    timeout:5000,
})

//请求拦截器，在发出请求之前，拦截器会检测，进行一些操作
requests.interceptors.request.use((config)=>{
    let token = localStorage.getItem("TOKEN")
    if(token){
        config.headers['Authorization'] = token
    }
    //配置对象config中包含了一个header，很重要
    nprogress.start()
    return config
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    nprogress.done()
    //成功回调
    return res.data
},(error)=>{
    //失败回调
    nprogress.done()
    Message.error("网络错误！")
    return Promise.reject(new Error("failed"))
})

export default requests