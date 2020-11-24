<template>
  <div class="home">
    <div class="head">
      <div class="t">首页</div>
      <a href="https://android.myapp.com/myapp/detail.htm?apkName=com.tencent.tmgp.csmjky" class="t">APP下载</a>
    </div>
    <div class="con">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide>
          <span class="bg"><img src="../assets/img/change/1.png" alt=""></span>
        </swiper-slide>
        <swiper-slide>
          <span class="bg"><img src="../assets/img/change/1.png" alt=""></span>
        </swiper-slide>
        <swiper-slide>
          <span class="bg"><img src="../assets/img/change/1.png" alt=""></span>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination" id="swiper-pagination"></div>
      </swiper>
    </div>
    <div class="bot change">
      <div class="des">
        <a href="http://www.beian.miit.gov.cn/icp/publish/query/icpMemoInfo_searchExecute.action">粤ICP备16028195号-4</a>
        <a href="http://www.beian.miit.gov.cn/icp/publish/query/icpMemoInfo_searchExecute.action">粤网文[2019]1917-453号</a>
        深圳创想互娱科技有限公司
      </div>
    </div>

  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    directives: {
      swiper: directive
    },
    data(){
      return{
        swiperOptions:{
          pagination: {
            el: '.swiper-pagination',
          },
          autoplay: {
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          loop : true,
        },
      }
    },

  }
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
  }
  .head{
    width: 100%;
    height: 80px;
    background:#10101A;
    display: flex;
    align-content: center;
    .logo{
      padding-left: 220px;
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 132px;
      img{
        width: 100%;
      }

    }
    .t{
      font-size: 16px;
      color: #C2C2C2;
      height: 80px;
      line-height: 80px;
      margin-left: 90px;
      cursor: pointer;
    }
    .active{
      color: #fff;
    }
    .t:hover,.t:hover{
      color: #fff;
    }

  }
  .con{
    width: 100%;
    background: #ecf0f3;
    /*overflow: hidden;*/
    .swiper-container{
      width: 100%;
      .swiper-slide{
        position: relative;
        width: 100%;
        .bg{
          width: 100%;
          img{
            width: 100%;
          }
        }
      }
    }
  }
  .app-download{
    width: 100%;
    .bg{
      width: 100%;
      img{
        width: 100%;
      }
    }
  }

  .bot{
    width: 100%;
    min-width: 1000px;
    height: 120px;
    background: #10101a;
    margin-top: -2px;
    .des{
      margin: 0 auto;
      width: 1000px;
      height: 120px;
      display: flex;
      align-content: center;
      justify-content: space-between;
      .copyright,.regard{
        font-size: 14px;
        color: #fff;
        height: 120px;
        line-height: 120px;
      }
    }
  }
  .change{
    .des{
      a{
        color:#969696;
        margin-right: 10px;
      }
      color:#969696;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }



</style>
<style>
  #swiper-pagination .swiper-pagination-bullet{
    width: 54px;
    height: 8px;
    background: #6600cc;
    border-radius: 5px;
  }
</style>
