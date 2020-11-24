<template>
    <div class="season">
        <Head/>
        <div class="main">
            <div class="tabs">
                <a href="#slide1" :class="activeIndex=='0'?'active':''">赛程</a>
                <a href="#slide2" :class="activeIndex=='1'?'active':''">积分</a>
                <a href="#slide3" :class="activeIndex=='2'?'active':''">射手榜</a>
            </div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" data-hash="slide1">
                        <agenda-list/>
                    </div>
                    <div class="swiper-slide" data-hash="slide2">
                        <integral-list/>
                    </div>
                    <div class="swiper-slide" data-hash="slide3">
                        <scorer-list/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Head from '../../components/season/Head'
    import AgendaList from '../../components/season/AgendaList'
    import IntegralList from '../../components/season/IntegralList'
    import ScorerList from '../../components/season/ScorerList'

    import Swiper from 'swiper';

    export default {
        components:{Head,AgendaList,IntegralList,ScorerList},
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
    .season{
        width: 100%;
        height: 100%;
        .main{
            width: 100%;
            position: fixed;
            top:88px;
            left:0;
            bottom: 0;
            .tabs{
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                position: relative;
                a{
                    color: #333333;
                    width: 33.33%;
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
    }
</style>