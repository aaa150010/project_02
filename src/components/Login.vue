<template>
  <div class="container">
    <div class="before">
      <div class="before_image">
        <div class="img">
          <van-image
            width="100"
            height="100"
            fit="cover"
            round
            src="https://pica.zhimg.com/v2-180a8a355dc2a5bfc97ac8d4c10921aa_720w.jpg?source=172ae18b"
          />
        </div>
      </div>
      <div class="before_text">APPSTART</div>
    </div>

    <div class="after">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px" class="fa">
          <button @click="clickSubmit" type="button" class="btn">登录</button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref} from "vue";
import { login } from "../api/user.js";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import { setToken,setStu } from "../api/utils.js";
import router from "@/router";

const store = useStore();
const username = ref("");
const password = ref("");


const fun1=()=>{
  (login(username, password).then((res) => {
    if (res.data.result=="ok") {
      store.commit("UpdateUser", res.data.data);
      setToken(res.data.data.token);
      setStu(res.data.data)
      const username1 = store.state.user.name;
      const grade = store.state.user.major;
      //弹出提示框显示登录成功
      ElNotification({
        title: "欢迎您~" + grade + username1,
        type: "success",
      });
      //跳转到主页
      router.push("/Main")
    } else {
      //提示错误
      ElNotification({
        title: "账号或密码错误",
        type: "warning",
      });
    }
  }))
}


const clickSubmit =()=>{(login(username, password).then((res) => {
  if (res.data.result=="ok") {
    store.commit("UpdateUser", res.data.data);
    setToken(res.data.data.token);
    setStu(res.data.data)
    const username1 = store.state.user.name;
    const grade = store.state.user.major;
    //弹出提示框显示登录成功
    ElNotification({
      title: "欢迎您~" + grade + username1,
      type: "success",
    });
    //跳转到主页
    router.push("/Main")
  } else {
    //提示错误
    ElNotification({
      title: "账号或密码错误",
      type: "warning",
    });
  }
}))}


//定义按钮节流
function throttle (callback, delay = 2000) {
  let timer = null
  return function () {
    if (timer) return
    callback()
    timer = setTimeout(() => {
      timer = null
    }, delay);
  }
}




</script>

<style lang="less" scoped>
.container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  .before {
    width: 100vw;
    height: 38vh;
    position: absolute;
    .before_image {
      position: relative;
      top: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    .before_image:hover .img {
      transform: rotate(-360deg);
    }
  }
}
.img {
  transition: all 1.6s;
}
.before_text {
  position: relative;
  text-align: center;
  color: red;
  font-size: 6vw;
  top: 55%;
}
.after {
  position: relative;
  top: 48%;
}
.fa{
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
  background: #0575E6;
  width: 75vw;
  height: 5vh;
  padding: 0;
  border: 0;
  border-radius: 30px;
}
</style>