<template>
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="scss">
  @import "assets/css/normalize.css";
  @import "assets/css/public";
</style>