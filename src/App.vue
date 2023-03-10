<template>
  <div id="nav">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent} from 'vue';
import {useStore} from "vuex";

declare const devUserInfo:any;
declare const settingParam:any;

export default defineComponent({
  computed:{
    userid(){
      return devUserInfo.userid;
    },
    sessionID(){
      return settingParam.sessionId;
    }
  },
  created() {
    useStore().commit('setSessionId',settingParam.sessionId)
  }
});
</script>
<style lang="less">
#nav{
  width: 100vw;
  height: 300vh;
  background: linear-gradient(#00F260, #0575E6);
}
</style>
