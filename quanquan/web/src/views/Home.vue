<template>
    <div class="home">
        <div class="head">
            <div class="t">首页</div>
        </div>
        <div class="con">
            <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide>
                    <span class="bg"><img src="../assets/img/banner/quanquan.png" alt=""></span>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination" id="swiper-pagination"></div>
            </swiper>
        </div>
        <div class="footer-1">
            <div class="gs">
                <p class="gs-txt">深圳市游戏币网络科技有限公司</p>
                <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602004255" class="ba">
                    <span class="ba-img"><img src="../assets/img/ba.png" alt=""></span>
                    <span>粤公网安备 44030602004255号</span>
                </a>
            </div>
            <a href="https://beian.miit.gov.cn/#/Integrated/recordQuery">粤ICP备15001773号</a>
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
        min-width: 1280px;
        .head{
            width: 100%;
            height: 80px;
            background:#10101A;
            display: flex;
            align-content: center;
          box-sizing: border-box;
          overflow: hidden;
            .t{
                font-size: 16px;
                color: #C2C2C2;
                height: 80px;
                line-height: 80px;
                margin-left: 90px;
                cursor: pointer;
            }
        }
        .con{
            width: 100%;
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
                    .bei-an{
                        position: absolute;
                        bottom: 12px;
                        left: 20px;
                        font-family: 微软雅黑;
                        font-size: 12px;
                    }
                    .b{
                        color: #333;
                    }
                    .w{
                        color: rgb(230,230,230);
                    }
                }
            }
        }
        .footer-1{
            width: 100%;
            height: 46px;
            color:#898989;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            background: #1F1F1F;
            }
            .gs{
                display: flex;
                align-items: center;
                color:#898989;
                font-size: 13px;
                .ba{
                    display: flex;
                    align-items: center;
                    margin: 0 10px;
                    color:#898989;
                    font-size: 13px;
                    .ba-img{
                        width: 20px;
                        height: 20px;
                        overflow: hidden;
                        margin-right: 3px;
                        img{
                            width: 100%;
                        }
                    }
                }
            }
          a{
            color:#898989;
            margin-right: 5px;
            font-size: 13px;
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
