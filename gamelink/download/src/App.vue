<template>
  <div id="app">
    <router-view v-if="isPc"/>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        isPc:'',
      }
    },
    created:function () {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.isPc = true
      }else{
        // window.location.href=""
      }
      this.isPc = true
    }
  }
</script>

<style lang="scss">
  @import "./assets/css/reset.css";
  @import "./assets/css/global.css";
</style>
