<template>
    <div class="home">
        <div class="head">
            <span @click="handleClick('1')" class="logo"><img src="../assets/img/logo.png" alt=""></span>
            <div :class="head_active=='2'?'active':''" @click="handleClick('2')" class="t">APP DOWNLOAD</div>
        </div>
        <div class="con" v-if="head_active=='1'">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="bg"><img :src="img1" alt=""></div>
                    </div>
                    <div class="swiper-slide">
                        <div class="bg"><img :src="img2" alt=""></div>
                    </div>
                    <div class="swiper-slide">
                        <div class="bg"><img :src="img3" alt=""></div>
                    </div>
                </div>
                <div class="swiper-pagination" id="swiper-pagination"></div>
            </div>
        </div>
        <div class="app-download" v-if="head_active=='2'">
            <div class="bg"><img src="../assets/img/en/app-download.png" alt=""></div>
        </div>
        <div class="bot">
            <div class="des">
                <p class="copyright">©2018-2022 CHAT.LINK All Rights Reserved</p>
                <p class="regard">ABOUT US&nbsp;&nbsp;|&nbsp;&nbsp;PRIVACY POLICY&nbsp;&nbsp;|&nbsp;&nbsp;LINKS</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    export default {
        data(){
            return{
                head_active:1,
                img1:require("../assets/img/en/1.png"),
                img2:require("../assets/img/en/2.png"),
                img3:require("../assets/img/en/3.png"),
            }
        },
        mounted:function(){
            this.$nextTick(() => {
                this.init_swiper()
            })
        },
        methods:{
            handleClick(i){
                if(this.head_active!=0){
                    if(i==1){
                        setTimeout(()=>{
                            this.init_swiper()
                        },100)
                    }
                }
                this.head_active = i
            },
            init_swiper(){
                new Swiper ('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    autoplay: {
                        delay: 5000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                    },
                    loop : true,
                })
            },
        }
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
</style>
<style>
    #swiper-pagination .swiper-pagination-bullet{
        width: 54px;
        height: 8px;
        /*background: #363636;*/
        /*background: #666;*/
        /*background: #ff33ff;*/
        background: #6600cc;
        border-radius: 5px;
    }
</style>
