<template>
    <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
                <div class="item"><img src="../../assets/image/index/swiper/banner/1.jpg" alt=""></div>
            </swiper-slide>
            <swiper-slide>
                <div class="item"><img src="../../assets/image/index/swiper/banner/2.jpg" alt=""></div>
            </swiper-slide>
            <swiper-slide>
                <div class="item"><img src="../../assets/image/index/swiper/banner/3.jpg" alt=""></div>
            </swiper-slide>
            <swiper-slide>
                <div class="item"><img src="../../assets/image/index/swiper/banner/4.jpg" alt=""></div>
            </swiper-slide>
            <swiper-slide>
                <div class="item"><img src="../../assets/image/index/swiper/banner/5.jpg" alt=""></div>
            </swiper-slide>
            <swiper-slide>
                <div class="item"><img src="../../assets/image/index/swiper/banner/6.jpg" alt=""></div>
            </swiper-slide>
        </swiper>
        <div class="swiper-nav">
            <ul>
                <li @click="swiper.slideTo('0'),activeIndex=0"><img :class="activeIndex==0?'active':''" src="../../assets/image/index/swiper/banner/1.jpg" alt=""></li>
                <li @click="swiper.slideTo('1'),activeIndex=1"><img :class="activeIndex==1?'active':''" src="../../assets/image/index/swiper/banner/2.jpg" alt=""></li>
                <li @click="swiper.slideTo('2'),activeIndex=2"><img :class="activeIndex==2?'active':''" src="../../assets/image/index/swiper/banner/3.jpg" alt=""></li>
                <li @click="swiper.slideTo('3'),activeIndex=3"><img :class="activeIndex==3?'active':''" src="../../assets/image/index/swiper/banner/4.jpg" alt=""></li>
                <li @click="swiper.slideTo('4'),activeIndex=4"><img :class="activeIndex==4?'active':''" src="../../assets/image/index/swiper/banner/5.jpg" alt=""></li>
                <li @click="swiper.slideTo('5'),activeIndex=5"><img :class="activeIndex==5?'active':''" src="../../assets/image/index/swiper/banner/6.jpg" alt=""></li>
            </ul>
        </div>

    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import vue from 'vue'
    export default {
        components: {swiper, swiperSlide},
        data () {
            return {
                activeIndex:0,
                swiperOption: {
                    autoplay: {
                       delay: 3000,
                       stopOnLastSlide: false,
                       disableOnInteraction: true,
                   },
                    on: {
                        slideChangeTransitionEnd:()=>{
                            this.activeIndex=this.$refs.mySwiper.swiper.activeIndex
                        }
                    }
                }
            }
        },
        computed:{
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted(){}
    }
</script>

<style lang="scss" scoped>
    .swiper{
        width:850px;
        height:476px;
        overflow: hidden;
        position: relative;
        margin-bottom: 10px;
        .item{
            width:850px;
            height:476px;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .swiper-nav{
            /*width: 540px;*/
            position: absolute;
            bottom: 10px;
            z-index: 10;
            width: 510px;
            left: 50%;
            transform: translateX(-50%);
            ul{
                display: flex;
                align-items: center;
                justify-content: space-around;
                li{
                    width: 85px;
                    padding: 2px 2px 2px 7px;
                    opacity: 0.7;
                    cursor: pointer;
                    img{
                        width: 100%;
                    }
                }
                .active{
                    border: 1px solid #e4b35a;
                }
            }
        }
    }
</style>