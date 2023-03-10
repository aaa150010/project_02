import axios from '../axios';
import store from '../store/index';
import {getToken,getStu} from "@/api/utils";
const token=getToken()
const stu=getStu()
//登录接口
export function login(username,password){
    return axios.post(`AWSDEVURL/r/jd?sid=${store.state.sessionId}&cmd=com.awspaas.user.apps.StudentController_Login`, {
            // sid:'8f473b8e-e0d3-4491-8bf4-ba24a8a7a02b',
            // sid:store.state.sessionId,
            username: username.value,
            password: password.value,
            // subject_code: "10004",
            // cmd: "com.awspaas.user.apps.app20230213113024_json,
            // cmd:"com.awspaas.user.apps.StudentController_Login"},
        }
    )
}
export function getCompleted(id){
    return axios.post(`AWSDEVURL/r/jd?sid=${store.state.sessionId}&cmd=com.awspaas.user.apps.StudentController_GetQuestionnaires`,{
        token:token,
        username:stu.username,
        type:id,
    })
}

export function getOneForm(code,id){
    return axios.post(`AWSDEVURL/r/jd?sid=${store.state.sessionId}&cmd=com.awspaas.user.apps.StudentController_GetQuestionnairesByCode`,{
        token:token,
        username:stu.username,
        code:code,
        type:id
    })
}