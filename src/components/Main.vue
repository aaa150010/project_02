<template>
  <van-tabs v-model:active="active">
    <van-tab title="未完成">
<!--      //未完成部分-->
      <div v-for="(item,index) in complete" :key="index" class="box1">
        <div class="title">{{item.subject.name}}</div>
        <div class="box2">
          <div class="tea">教师：{{item.teacher}}{{item.code}}</div>
          <div><el-button type="primary" plain class="btn" size="small" round @click="handleClick({username:user.username,code:item.code,type:0})">去评阅</el-button></div>
        </div>
      </div>
    </van-tab>
    <van-tab title="已完成">
<!--    //已完成部分-->

    </van-tab>
  </van-tabs>
<!--<button @click="handleClick">按钮</button>-->
</template>

<script setup>
import {getStu} from "@/api/utils";
import {onMounted,ref} from "vue";
import {getCompleted} from '../api/user.js'
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";


const user=getStu()
const router=useRouter()
let complete=ref([])
// console.log(getStu())
onMounted(()=>{
  getCompleted(0,).then((res)=>{
    if(res.data.result=="ok"){
      ElNotification({
        title: "查询成功",
        type: "success",
      });
      //请求成功之后的逻辑
       complete.value=res.data.data.questionnaires
    }else {
      ElNotification({
        title: res.data.msg,
        type: "warning",
      });
    }
  })
})


const handleClick=(option)=>{
  const data=JSON.stringify(option)
  router.push({path:'/Question',query:{res:data}})
}
</script>

<!--/*获取单一的一条问卷信息
    请求参数：
    token
    username-----账户（学号）
    code-----测评问卷的code
    type:
            0---为完成
            1---已完成
     */-->
<style lang="less" scoped>
.box1{
  width: 100vw;
  height: 15vh;
  padding-left: 2vw;
  padding-bottom: 2vw;
  border: 2px solid #0ca72d;
}

@keyframes animated-border {
  0% {
    box-shadow: 0 0 0 0 rgba(255,255,255,0.4);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255,255,255,0);
  }
}
.box1 {
  animation: animated-border 1.5s infinite;
  font-family: Arial;
  font-size: 16px;
  line-height: 30px;
  font-weight: bold;
  color: white;
  border: 2px solid;
  border-radius: 10px;
}

.title{
  font-size: 2.2vh;
  color: #A68064;
  font-weight: bold;
}
.box2{
  padding-top:6vh;
  padding-left: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tea{
  color: #CC3299;
  font-size: 1.8vh;
}
.btn{
  margin-right: 4vw;
}

</style>