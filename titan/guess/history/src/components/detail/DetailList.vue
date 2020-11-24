<template>
    <div class="detail-list">
        <div class="tabs">
            <a href="#slide1" :class="activeIndex=='0'?'active':''">指数</a>
            <a href="#slide2" :class="activeIndex=='1'?'active':''">分析</a>
            <a href="#slide3" :class="activeIndex=='2'?'active':''">文字</a>
            <a href="#slide4" :class="activeIndex=='3'?'active':''">实况</a>
            <a href="#slide5" :class="activeIndex=='4'?'active':''">统计</a>
            <a href="#slide6" :class="activeIndex=='5'?'active':''">阵容</a>
            <a href="#slide7" :class="activeIndex=='6'?'active':''">交易所</a>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" data-hash="slide1">
                    <exponent-list/>
                </div>
                <div class="swiper-slide" data-hash="slide2">
                    <analyze-list/>
                </div>
                <div class="swiper-slide" data-hash="slide3">
                    <word-live/>
                </div>
                <div class="swiper-slide" data-hash="slide4">
                   <game-scene/>
                </div>
                <div class="swiper-slide" data-hash="slide5">
                    <span class="no-character"><img src="../../assets/img/detail/no-statistics.png" alt=""></span>
                </div>
                <div class="swiper-slide" data-hash="slide6">
                    <battle-array/>
                </div>
                <div class="swiper-slide" data-hash="slide7">
                    <span class="no-character"><img src="../../assets/img/detail/no-exchange.png" alt=""></span>
                    <!--<Exchange/>-->
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Swiper from 'swiper';
    import ExponentList from '../../components/detail/ExponentList'
    import AnalyzeList from '../../components/detail/AnalyzeList'
    import Exchange from '../../components/detail/Exchange'
    import WordLive from '../../components/detail/WordLive'
    import GameScene from '../../components/detail/GameScene'
    import BattleArray from '../../components/detail/BattleArray'
    export default {
        components:{ExponentList,AnalyzeList,Exchange,WordLive,GameScene,BattleArray},
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
            a{
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
        .swiper-container{
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