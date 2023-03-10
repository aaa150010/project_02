import { createApp } from 'vue'
import App from './App.vue'
//import './registerServiceWorker' pwa配置，暂时不用
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
/* eslint-disable */
import awsui from "../lib/awsui.es"; //注意awsui组件库根据情况指定路径
import "../lib/awsui.css";
import DataVVue3 from '@kjgl77/datav-vue3'



const app = createApp(App);
app.use(DataVVue3)
app.use(store);
app.use(router);
app.use(ElementPlus);
app.use(awsui); 


// app.use(ElementPlus, { size: 'small', zIndex: 3000 });
const mountApp = ()=>{
    app.mount('#app');
}
const getSid = awsui.getSid;
if(app.config.globalProperties.AWSPageContext.production){
    mountApp();
}else{
    getSid.exec(app).then(()=>{
        mountApp();
    });
}
