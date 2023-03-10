import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = 'admin-token'
const Cookies = useCookies(['admin-token'])
const StuXin='Stu'
//设置用户登录token存储到本地
export function setToken(token){
    return Cookies.set(TokenKey,token)
}

//清楚token
export function removeToken() {
    return Cookies.remove(TokenKey)
}


//获取token
export function getToken(){
    return Cookies.get(TokenKey)
}

//学生信息存储到本地
export function setStu(user){
    return Cookies.set(StuXin,user)
}
//学生信息清除
export function removeStu(){
    return Cookies.remove(StuXin)
}
//学生信息获取
export function getStu(){
    return Cookies.get(StuXin)
}