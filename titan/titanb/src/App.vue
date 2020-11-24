<template>
  <div id="app">
    <Main v-if="isPc"/>
  </div>
</template>

<script>
import Main from './components/Main'
export default {
  name: 'app',
  components: {Main},
    data(){
      return{
          isPc:'',
      }
    },
  created:function () {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
          window.location.href="https://titan.link/download/"
      }else{
          this.isPc = true
      }
  }
}
</script>

<style lang="scss">
@import "./assets/css/reset.css";
</style>
