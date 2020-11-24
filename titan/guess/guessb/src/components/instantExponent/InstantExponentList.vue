<template>
    <div class="instant-exponent-list">
        <div class="nav">
            <span :class="activeIndex=='0'?'active':''">欧赔</span>
            <span :class="activeIndex=='1'?'active':''">亚盘</span>
            <span :class="activeIndex=='2'?'active':''">大小</span>
        </div>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <europe-list/>
                </div>
                <div class="swiper-slide">
                    <asian-list/>
                </div>
                <div class="swiper-slide">
                    <size-list/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Swiper from 'swiper';
    import EuropeList from '../../components/instantExponent/EuropeList'
    import AsianList from '../../components/instantExponent/AsianList'
    import SizeList from '../../components/instantExponent/SizeList'

    export default {
        components:{EuropeList,AsianList,SizeList},
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
    .instant-exponent-list{
        width: 100%;
        height: 100%;
        .nav{
            width: 100%;
            height: 72px;
            position:fixed;
            top:88px;
            left:0;
            box-sizing: border-box;
            display: flex;
            align-content: center;
            span{
                display: block;
                width: 33.33%;
                height: 72px;
                line-height: 72px;
                text-align: center;
                font-size: 24px;
                color: #333;
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
            position: absolute;
            top:72px;
            left:0;
            width: 100%;
            bottom: 0;
            .swiper-wrapper{
                .swiper-slide{
                    position: relative;
                }
            }
        }
    }
</style>