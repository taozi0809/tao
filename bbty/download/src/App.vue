<template>
  <div id="app">
    <Bbty/>
  </div>
</template>

<script>
import Bbty from './components/Bbty'

export default {
  name: 'app',
  components: {Bbty}
}
</script>

<style lang="scss">
  @import "assets/css/reset.css";
  #app{
    background: #fff;
    width:750px;
    overflow-x: hidden;
  }
</style>
