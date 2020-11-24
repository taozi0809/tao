<template>
    <div class="guessHistoryBasketball">
        <div class="nav">
            <span :class="activeIndex=='0'?'active':''" @click="handleToPage('0')">全部</span>
            <span :class="activeIndex=='1'?'active':''" @click="handleToPage('1')">待开奖</span>
            <span :class="activeIndex=='2'?'active':''" @click="handleToPage('2')">已中奖</span>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <all-list-basketball/>
                </div>
                <div class="swiper-slide">
                    <lottery-list-basketball/>
                </div>
                <div class="swiper-slide">
                    <winning-list-basketball/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import AllListBasketball from '../../components/guessHistory/AllListBasketball'
    import LotteryListBasketball from '../../components/guessHistory/LotteryListBasketball'
    import WinningListBasketball from '../../components/guessHistory/WinningListBasketball'
    export default {
        components:{AllListBasketball,LotteryListBasketball,WinningListBasketball},
        data(){
            return{
                swiper:null,
                activeIndex:0,
            }
        },
        mounted:function(){
            let _this = this
            this.swiper = new Swiper ('.swiper-container', {
                threshold : 30,
                direction: 'horizontal',
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
        methods:{
            handleToPage(e){
                this.swiper.slideTo(e);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .guessHistoryBasketball{
        width: 100%;
        height: 100%;
        .nav{
            width: 100%;
            height: 80px;
            padding:0 60px;
            box-sizing: border-box;
            display: flex;
            align-content: center;
            span{
                display: block;
                width: 33.3%;
                height: 80px;
                line-height: 80px;
                box-sizing: border-box;
                text-align: center;
                color: #808080;
                font-size: 28px;
                position: relative;
            }
            .active{
                color:#34C47C ;
            }
            .active:after{
                display: block;
                content: '';
                width: 100px;
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
            top:80px;
            bottom: 0;
            width: 100%;
            .swiper-wrapper{
                .swiper-slide{
                    position: relative;
                }
            }
        }
    }
</style>