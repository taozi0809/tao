<template>
  <div id="app">
    <router-view/>
    <div class="weixin" v-if="is_weixin"><img src="./assets/img/weixin.png" alt=""></div>
  </div>
</template>

<script>
  import {isWeiXin} from "./assets/js/tool";

  export default {
    data(){
      return{
        is_weixin:false,
      }
    },
    created:function(){
      isWeiXin()?this.is_weixin=true:this.is_weixin=false
    },
  }
</script>


<style lang="scss">
  @import "./assets/css/reset.css";
  @import "./assets/css/global.css";

  .weixin{
    width: 100%;
    position: absolute;
    z-index: 9;
    top:0;
    left:0;
    img{
      width: 100%;
    }
  }
</style>
