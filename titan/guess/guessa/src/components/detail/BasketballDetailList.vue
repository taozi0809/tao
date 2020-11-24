<template>
    <div class="detail-list">
        <div class="tabs">
            <div class="item" :class="activeIndex=='0'?'active':''" @click="handleTabs('0')">指数</div>
            <div class="item" :class="activeIndex=='1'?'active':''" @click="handleTabs('1')">分析</div>
            <div class="item" :class="activeIndex=='2'?'active':''" @click="handleTabs('2')">文字</div>
            <div class="item" :class="activeIndex=='3'?'active':''" @click="handleTabs('3')">实况</div>
            <div class="item" :class="activeIndex=='4'?'active':''" @click="handleTabs('4')">统计</div>
            <div class="item" :class="activeIndex=='5'?'active':''" @click="handleTabs('5')">阵容</div>
            <div class="item" :class="activeIndex=='6'?'active':''" @click="handleTabs('6')">交易所</div>
        </div>
        <div class="swiper-container1">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <exponent-list/>
                </div>
                <div class="swiper-slide">
                    <analyze-list/>
                </div>
                <div class="swiper-slide">
                    <word-live/>
                </div>
                <div class="swiper-slide">
                    <game-scene/>
                </div>
                <div class="swiper-slide">
                    <span class="no-character"><img src="../../assets/img/detail/no-statistics.png" alt=""></span>
                </div>
                <div class="swiper-slide">
                    <battle-array/>
                </div>
                <div class="swiper-slide">
                    <span class="no-character"><img src="../../assets/img/detail/no-exchange.png" alt=""></span>
                    <!--<Exchange/>-->
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Swiper from 'swiper';
    import ExponentList from '../../components/detail/BasketballExponentList'
    import AnalyzeList from '../../components/detail/AnalyzeList'
    import Exchange from '../../components/detail/Exchange'
    import WordLive from '../../components/detail/WordLive'
    import GameScene from '../../components/detail/GameScene'
    import BattleArray from '../../components/detail/BattleArray'
    export default {
        components:{ExponentList,AnalyzeList,Exchange,WordLive,GameScene,BattleArray},
        data(){
            return{
                swiper2:null,
                activeIndex:0,
            }
        },
        mounted:function(){
            let _this = this
            this.swiper2 = new Swiper ('.swiper-container1', {
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
            handleTabs(index){
                this.swiper2.slideTo(index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .detail-list{
        width: 100%;
        position: absolute;
        top:240px;
        left:0;
        bottom: 0;
        .tabs{
            width: 100%;
            height: 72px;
            display: flex;
            align-items: center;
            .item{
                width: 14.28%;
                height: 72px;
                line-height: 72px;
                color: #333;
                font-size: 24px;
                text-align: center;
                position: relative;
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
        .swiper-container1{
            width: 100%;
            position: absolute;
            top:72px;
            bottom: 0;
            overflow: hidden;
            box-sizing: border-box;
            left:0;
            .swiper-slide{
                position: relative;
                .no-data{
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    color: #333;
                    font-size: 26px;
                }
                .no-character{
                    display: block;
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    width: 140px;
                    img{
                        width: 100%;
                    }
                }
                .ball-pack{
                    margin-top: 20px;
                    display: block;
                    width:100%;
                    height:390px;
                    background: url("../../assets/img/detail/ball-pack.png") no-repeat;
                    background-size: 100% 100%;
                    @include flex;
                    p{
                        color: #fff;
                        font-size: 30px;
                        font-weight: 700;
                    }
                }

            }
        }
    }
</style>