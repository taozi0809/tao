<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="message" v-if="message.show">{{message.msg}}</div>
  </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    export default {
        computed:{
            ...mapState(['message']),
        },
    }
</script>

<style lang="scss">
  @import "./assets/css/reset.css";
  @import "./assets/css/global.css";
</style>
