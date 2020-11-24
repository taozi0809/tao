<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    metaInfo () {
      return {
        meta: this.meta
      }
    },
    data(){
      return{
          metaPc:[{name: 'viewport', content:'width=device-width,initial-scale=1.0' }],
          metaMobile:[{name: 'viewport', content:'initial-scale=0.3, maximum-scale=0.5, minimum-scale=0.3, user-scalable=yes' }],
          meta:null,
      }
    },
    created(){
      if (this._isMobile()) {this.meta=this.metaMobile} else {this.meta=this.metaPc}
    },
    mounted() {
      // if (this._isMobile()) {this.meta=this.metaMobile} else {this.meta=this.metaPc}
    },
    methods:{
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      }
    }
  }
</script>
<style lang="scss">
  @import "assets/css/reset.css";
  html, body{
    min-width: 1200px;
    font-size: 10px;
    background:#000;
    font-family: sans-serif;
    height: 100%;
    color: #afb0b2;
  }
  *{box-sizing: border-box;}
  a{text-decoration: none;color: #fff;}
  body{
    background: #02070b url("./assets/image/dota2-bg-0.jpg") top/100% no-repeat;
  }
</style>

<style type="text/css">
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
