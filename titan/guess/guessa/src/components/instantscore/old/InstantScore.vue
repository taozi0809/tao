<template>
    <div class="main-list">
        <div class="tabs">
            <a href="#slide1" :class="activeIndex=='0'?'active':''">全部</a>
            <a href="#slide2" :class="activeIndex=='1'?'active':''">竞猜</a>
            <a href="#slide3" :class="activeIndex=='2'?'active':''">北单</a>
            <a href="#slide4" :class="activeIndex=='3'?'active':''">足球</a>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" data-hash="slide1">
                    <all-list/>
                </div>
                <div class="swiper-slide" data-hash="slide2">
                    <guess-list/>
                </div>
                <div class="swiper-slide" data-hash="slide3">
                    <beidgs-list/>
                </div>
                <div class="swiper-slide" data-hash="slide4">
                    <football-list/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import {mapState, mapMutations} from 'vuex'
    import AllList from '../../components/instantscore/AllList'
    import GuessList from '../../components/instantscore/GuessList'
    import BeidgsList from '../../components/instantscore/BeidgsList'
    import FootballList from '../../components/instantscore/FootballList'

    export default {
        components:{AllList,GuessList,BeidgsList,FootballList},
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
                        switch (_this.activeIndex) {
                            case 0:
                                _this.COMPETITION(_this.allScore)
                                break;
                            case 1:
                                _this.COMPETITION(_this.guessScore)
                                break;
                            case 2:
                                _this.COMPETITION(_this.beidgsScore)
                                break;
                            case 3:
                                _this.COMPETITION(_this.footballScore)
                                break;
                        }
                    },
                }
            })
        },
        methods:{
            ...mapMutations(['COMPETITION']),
        },
    }
</script>

<style lang="scss">
    @import "../../assets/css/mixin";
    .main-list{
        width: 100%;
        height: 100%;
        .tabs{
            width: 100%;
            height: 80px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            position: relative;
            a{
                color: #333333;
                width: 25%;
                height: 80px;
                line-height: 80px;
                font-size: 28px;
                display:block;
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
            position:fixed;
            width: 100%;
            top:168px;
            bottom: 0;
            left:0;
            box-sizing: border-box;
            overflow: hidden;
        }
    }
</style>