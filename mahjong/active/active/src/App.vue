<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
  import Home from './view/home'
  export default {
    name: 'app',
    components: {Home}
  }
</script>

<style lang="scss">
  @import "assets/css/reset.css";
  @import "assets/css/mjapp.css";
</style>

