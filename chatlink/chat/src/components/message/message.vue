<template>
    <div class="message" ref="message" v-if="message.is_message">{{message.message}}</div>
</template>

<script>
  export default {
    data(){
      return{
        message:{
          is_message:false,
          message:"",
        },
      }
    },

    methods:{
      Message(message){
        this.message = {
          message:message,
          is_message: true,
          continue: setTimeout(() => {
            this.message.is_message = false
          }, 1500)
        }
      },
    }
  }
</script>

<style type="text/scss" scoped lang="scss">
  .message{
    position: absolute;
    z-index: 999;
    bottom:20%;
    color: #fff;
    font-size:12px;
    background: rgba(0,0,0,.5);
    border-radius: 2px;
    left:50%;
    transform: translate(-50%,100%);
    animation: message-top 1.5s forwards;
    padding:10px 15px;
  }
  @keyframes message-top {
    0%{
      transform: translate(-50%,100%);
      opacity: 0;
      filter:Alpha(opacity=0);
    }
    20%{
      transform: translate(-50%,0%);
      opacity: 1;
      filter:Alpha(opacity=100);
    }
    80%{
      transform: translate(-50%,0%);
      opacity: 1;
      filter:Alpha(opacity=100);
    }
    100%{
      transform: translate(-50%,100%);
      opacity: 0;
      filter:Alpha(opacity=0);
    }
  }
</style>
