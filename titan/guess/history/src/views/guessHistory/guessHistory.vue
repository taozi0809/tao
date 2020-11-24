<template>
    <div class="guessHistory">
        <div class="menu">
            <div class="item" :class="showActive==0?'active':''" @click="handleChange('0')">足球</div>
            <div class="item" :class="showActive==1?'active':''" @click="handleChange('1')">篮球</div>
            <div class="item" :class="showActive==2?'active':''" @click="handleChange('2')">串关</div>
            <div class="item" :class="showActive==3?'active':''" @click="handleChange('3')">滚球</div>
        </div>

        <div class="nav" v-if="isRelated==0">
            <span :class="activeIndex=='0'?'active':''" @click="handleToPage('0')">全部</span>
            <span :class="activeIndex=='1'?'active':''" @click="handleToPage('1')">待开奖</span>
            <span :class="activeIndex=='2'?'active':''" @click="handleToPage('2')">已中奖</span>
        </div>
        <div :class="isRelated==0?'swiper-container':'swiper-container swiper-container-related'">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-if="isRelated==0">
                    <all-list v-if="showActive==0"/>
                    <AllListBasketBall v-if="showActive==1"/>
                </div>
                <div class="swiper-slide" v-if="isRelated==0">
                    <lottery-list v-if="showActive==0"/>
                    <LotteryListBasketball v-if="showActive==1"/>
                </div>
                <div class="swiper-slide" v-if="isRelated==0">
                    <winning-list v-if="showActive==0"/>
                    <WinningListBasketball v-if="showActive==1"/>
                </div>
                <div class="swiper-slide swiper-no-swiping" v-if="isRelated==1">
                    <related-list/>
                </div>
                <div class="swiper-slide swiper-no-swiping" v-if="isRelated==3">
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

    import AllListBasketBall from '../../components/guessHistory/AllListBasketBall'
    import LotteryListBasketball from '../../components/guessHistory/LotteryListBasketball'
    import WinningListBasketball from '../../components/guessHistory/WinningListBasketball'

    import RelatedList from '../../components/guessHistory/RelatedList'
    import RollList from '../../components/guessHistory/RollList'

    import {mapState, mapMutations} from 'vuex'

    export default {
        components:{AllList,LotteryList,WinningList,AllListBasketBall,LotteryListBasketball,WinningListBasketball,RelatedList,RollList},
        data(){
            return{
                swiper:null,
                activeIndex:0,
                showActive:0,
                isRelated:0,
            }
        },
        mounted:function(){
            //安卓传参
            let _this = this
            window['get_android_userName'] = function(e){
                _this.USERNAME(e)
                // alert(e)
            }
            window['get_android_token'] = function(e){
                _this.TOKEN(e)
                // alert(e)
            }

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
            ...mapMutations(['USERNAME','TOKEN']),
            handleToPage(e){
                this.swiper.slideTo(e);
            },
            handleChange(i){
                this.showActive = i
                if(i==2){
                    this.isRelated=1
                    this.swiper.slideToLoop(0,0, false)
                }else if(i==3){
                    this.isRelated=3
                    this.swiper.slideToLoop(0,0, false)
                }else{
                    this.isRelated=0
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .guessHistory{
        width: 100%;
        height: 100%;
        .menu{
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #34c47c;
            .item{
                display: block;
                width: 160px;
                border: 1px solid #fff;
                box-sizing: border-box;
                overflow: hidden;
                height: 56px;
                line-height: 56px;
                text-align: center;
                color: #fff;
                border-right: none;
            }
            .item:nth-child(1){
                border-top-left-radius:30px;
                border-bottom-left-radius: 30px;
            }
            .item:nth-child(4){
                border-top-right-radius:30px;
                border-bottom-right-radius: 30px;
            }
            .item:last-child{
                border-right: 1px solid #fff;
            }
            .active{
                background: #fff;
                color: #34C47C;
            }
        }
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