import axios from 'axios'
import {getToken} from './api/utils.js'
import router from "@/router";
import {ElNotification} from "element-plus";

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: "http://ceshi13.dishait.cn"
    baseURL: ""
})

// request拦截器
service.interceptors.request.use(config => {
    const token=getToken()
    if (token){
        config.headers['token']=token
    }else {
        router.push('/')
        ElNotification({
            title: "非法错误-请先登录",
            type: "warning",
        });
    }
    return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(

)

export default service;