<template>
    <div class="load" ref="load" v-if="load.is_load">
        <span><img src="../../assets/img/loading.png" alt=""></span>
    </div>
</template>

<script>
  export default {
    data(){
      return{
        load:{
          is_load:false,
          message:"",
        },
      }
    },

    methods:{
      Load(isLoad){
        this.load = {
          is_load:isLoad
        }
      },
    }
  }
</script>

<style type="text/scss" scoped lang="scss">
  .load{
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,.7);
    display: flex;
    align-items: center;
    justify-content: center;

    span{
        display: block;
        width: 100px;
        height: 100px;
        img{
            width: 100%;
            -webkit-animation:haha1 1s linear infinite;
        }
    }
      @-webkit-keyframes haha1 {
          0% {
              -webkit-transform: rotate(0deg);
          }

          25% {
              -webkit-transform: rotate(90deg);
          }

          50% {
              -webkit-transform: rotate(180deg);
          }

          75% {
              -webkit-transform: rotate(270deg);
          }

          100% {
              -webkit-transform: rotate(360deg);
          }
      }
  }

</style>
