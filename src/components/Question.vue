<template>
  <div class="title">{{title}}</div>
<!--  一级指标容器-->
  <div class="title_small" v-for="(item,index) in title_small" :key="index">
<!--    <div class="top">{{item.name}}</div>-->
<!--    二级指标以及选项-->
    <div class="bottom" v-for="(item1,index) in item.indicator" :key="index">
      {{item1.basis}}
<!--      选项部分-->
      <div v-if="item1.question_type=='多选'">
<!--        多选框-->
        <el-checkbox-group v-model="checkbox" @change="checkboxChange(item1)">
          <el-checkbox :label="item11.option" v-for="(item11,index) in item1.options" :key="index"/>
        </el-checkbox-group>
      </div>
      <div v-else-if="item1.question_type=='问答'">
<!--        问答框-->
       <div class="inp">
         <el-input
             v-model="item1.answer"
             :rows="2"
             type="textarea"
             placeholder="Please input"
         />
       </div>
      </div>
      <div v-else-if="item1.question_type=='单选'">
<!--        单选框-->
        <div class="mb-2 flex items-center text-sm">
          <el-radio-group v-model="item1.answer" class="ml-4" @change="handle(item1)">
            <el-radio :label="item2.option" size="small" v-for="(item2,index) in item1.options" :key="index">{{item2.option}}
            </el-radio>
            <div class="bbt">
              <van-stepper v-model="item1.default_score" input-width="8vw" button-size="6vw" min="60" max="100" @change="mychange(item1)"/>
            </div>
          </el-radio-group>
        </div>
      </div>
    </div>
    <button>111</button>
  </div>
</template>
<script setup>
import {useRoute} from "vue-router";
import {getOneForm} from "@/api/user";
import {onMounted,ref,reactive} from "vue";
import {ElNotification} from "element-plus";


const textarea = ref('')

let res=ref('')

let checkbox=ref([])

const checkboxChange=(item1)=> {

  item1.answer = checkbox.value
}

//接受路由传参
const route=useRoute();
// const id=JSON.parse(route.params.list)
let data = JSON.parse(route.query.res)

const title=ref('')
const title_small=ref('')
// 获取单一问卷
onMounted(()=> {
  getOneForm(data.code, data.type).then((res)=>{
    if(res.data.result=="ok"){
      ElNotification({
        title: "查询成功",
        type: "success",
      });
      res.value=res
      //请求成功之后的逻辑
      const testt=res.value.data.data.questionnaire.indicators[0]
      // testt.answer=danxuan.value
      for (var i=0;i<res.value.data.data.questionnaire.indicators.length;i++){
        for (var j=0;j<res.value.data.data.questionnaire.indicators[i].indicator.length;j++){
          let myres1=res.value.data.data.questionnaire.indicators[i].indicator[j]
          let myres=res.value.data.data.questionnaire.indicators[i].indicator[j].default_score
          if(myres>=60&&myres<70){
            myres1.answer='差'
          }else if(myres>=70&&myres<80){
            myres1.answer='中'
          }else if(myres>=80&&myres<90){
            myres1.answer='良'
          }else if(myres>=90){
            myres1.answer='优'
          }else {
            myres1.answer="描述"
          }
        }
      }
      console.log(testt)
      console.log(res)
      title.value=res.data.data.questionnaire.name
      // title_small.value=res.data.data.questionnaire.indicators
      title_small.value=res.value.data.data.questionnaire.indicators
    }else {
      ElNotification({
        title: res.data.msg,
        type: "warning",
      });
    }
  })
})


const handle=(item)=>{
  console.log(item)
  if(item.answer=='优'){
    item.default_score=90;
  }else if (item.answer=='良'){
    item.default_score=80;
  }else if (item.answer=='中'){
    item.default_score=70;
  }else if (item.answer=='优'){
    item.default_score=60;
  }
}
const mychange=(myres)=>{
 let myres1=myres.default_score
  if(myres1<70){
    myres.answer='差'
  }else if(myres1<80){
    myres.answer='中'
  }else if(myres1<90){
    myres.answer='良'
  }else if(myres1>=90){
    myres.answer='优'
  }
  console.log(res)
}

</script>

<style scoped>
.title{
  width: 100vw;
  height: 10vh;
  text-align: center;
  line-height: 10vh;
  font-size: large;
  font-weight: bold;
}
.top{
  text-align: center;
  margin-left: -8vw;
}
.title_small{
  width: 100vw;
  padding-left: 7vw;
  padding-right: 7vw;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}
.bottom{
  margin-bottom: 3vh;
}
.ml-4{
  margin-top: 8vh;
  display: flex;
align-items: center;
}
.bbt{
margin-bottom: 3vh;
}
.inp{
  width: 85vw;
  margin-top: 3vh;
}
</style>