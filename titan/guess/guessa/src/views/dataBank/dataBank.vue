<template>
    <div class="dataBank">
        <Head/>
        <div class="main">
            <div class="tabs">
                <a href="#slide1" :class="activeIndex=='0'?'active':''">国际</a>
                <a href="#slide2" :class="activeIndex=='1'?'active':''">欧洲</a>
                <a href="#slide3" :class="activeIndex=='2'?'active':''">美洲</a>
                <a href="#slide4" :class="activeIndex=='3'?'active':''">亚洲、大洋洲</a>
                <a href="#slide5" :class="activeIndex=='4'?'active':''">非洲</a>
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" data-hash="slide1">
                        <International/>
                    </div>
                    <div class="swiper-slide" data-hash="slide2">
                        <Europe/>
                    </div>
                    <div class="swiper-slide" data-hash="slide3">
                        <America/>
                    </div>
                    <div class="swiper-slide" data-hash="slide4">
                        <AsianOceania/>
                    </div>
                    <div class="swiper-slide" data-hash="slide4">
                        <Africa/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import Head from '../../components/head/Head'
    import International from '../../components/dataBank/International'
    import Europe from '../../components/dataBank/Europe'
    import America from '../../components/dataBank/America'
    import AsianOceania from '../../components/dataBank/AsianOceania'
    import Africa from '../../components/dataBank/Africa'

    export default {
        components:{Head,International,Europe,America,AsianOceania,Africa},
        data(){
            return{
                swiper:null,
                activeIndex:0,
            }
        },
        mounted:function(){
            let _this = this
            this.swiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                threshold : 30,
                hashNavigation: {
                    watchState: true,
                },
                on:{
                    slideChangeTransitionStart:function(){
                        _this.activeIndex = this.activeIndex
                    },
                }
            })
        },

    }
</script>

<style lang="scss" scoped>
    .dataBank{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        .main{
            position: fixed;
            top:88px;
            bottom: 0;
            width: 100%;
            left:0;
            box-sizing: border-box;
            .tabs{
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                position: relative;
                a{
                    color: #333333;
                    width: 18%;
                    height: 80px;
                    line-height: 80px;
                    font-size: 28px;
                    display:block;
                    text-align: center;
                    position: relative;
                }
                a:nth-child(4){
                    width: 28%;
                }
                .active{
                    color: #34C47C;
                }
                .active:after{
                    display: block;
                    content: '';
                    width: 74px;
                    height: 4px;
                    border-radius: 5px;
                    background: #34C47C;
                    position: absolute;
                    bottom: 0;
                    left:50%;
                    transform: translateX(-50%);
                }
            }
            .swiper-container{
                position:fixed;
                width: 100%;
                top:168px;
                bottom: 0;
                left:0;
                box-sizing: border-box;
                overflow: hidden;
            }
        }
    }
</style>