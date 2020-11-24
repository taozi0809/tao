<template>
    <div class="guessHistory">
        <div class="nav-item">
            <div class="item" :class="isRelated==0?'active':''" @click="handleRelated('0')">单关</div>
            <div class="item" :class="isRelated==1?'active':''" @click="handleRelated('1')">串关</div>
            <div class="item" :class="isRelated==2?'active':''" @click="handleRelated('2')">滚球</div>
        </div>

        <div class="nav" v-if="isRelated==0">
            <span :class="activeIndex=='0'?'active':''" @click="handleToPage('0')">全部</span>
            <span :class="activeIndex=='1'?'active':''" @click="handleToPage('1')">待开奖</span>
            <span :class="activeIndex=='2'?'active':''" @click="handleToPage('2')">已中奖</span>
        </div>
        <div :class="isRelated==0?'swiper-container':'swiper-container swiper-container-related'">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-if="isRelated==0">
                    <all-list/>
                </div>
                <div class="swiper-slide" v-if="isRelated==0">
                    <lottery-list/>
                </div>
                <div class="swiper-slide" v-if="isRelated==0">
                    <winning-list/>
                </div>

                <div class="swiper-slide swiper-no-swiping" v-if="isRelated==1">
                    <related-list/>
                </div>

                <div class="swiper-slide swiper-no-swiping" v-if="isRelated==2">
                    <roll-list/>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import AllList from '../../components/guessHistory/AllList'
    import LotteryList from '../../components/guessHistory/LotteryList'
    import WinningList from '../../components/guessHistory/WinningList'
    import RelatedList from '../../components/guessHistory/RelatedList'
    import RollList from '../../components/guessHistory/RollList'
    export default {
        components:{AllList,LotteryList,WinningList,RelatedList,RollList},
        data(){
            return{
                swiper:null,
                activeIndex:0,
                isRelated:0,
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
                noSwiping : true,
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
            },
            handleRelated(num){
                this.isRelated=num
                this.swiper.slideToLoop(0,0, false)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .guessHistory{
        width: 100%;
        height: 100%;
        .nav-item{
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #34c47c;
            .item{
                width: 160px;
                border: 1px solid #fff;
                box-sizing: border-box;
                height: 56px;
                line-height: 56px;
                text-align: center;
                color: #fff;
                border-right: 0;
            }
            .item:nth-child(1){
                border-top-left-radius:30px;
                border-bottom-left-radius: 30px;
            }
            .item:nth-child(3){
                border-top-right-radius:30px;
                border-bottom-right-radius: 30px;
                border-right: 1px solid #fff;
            }
            .active{
                background: #fff;
                color: #34C47C;
            }
        }
        .nav{
            width: 100%;
            height: 160px;
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
            top:160px;
            bottom: 0;
            width: 100%;
            .swiper-wrapper{
                .swiper-slide{
                   position: relative;
                }
            }
        }
        .swiper-container-related{
            top: 80px;
        }
    }
</style>