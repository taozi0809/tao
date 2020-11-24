<template>
    <div class="swiper-containera">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in data">
                <div class="item">
                    <span class="active">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';

    export default {
        data(){
            return{
                swiper:null,
                data:[
                    {
                        name:'小组A'
                    },
                    {
                        name:'小组B'
                    },
                    {
                        name:'小组C'
                    },
                    {
                        name:'小组D'
                    },
                    {
                        name:'小组E'
                    },
                    {
                        name:'小组F'
                    },
                    {
                        name:'小组G'
                    },
                    {
                        name:'小组H'
                    },
                ],
            }
        },
        mounted:function(){
            let _this = this
            this.swiper = new Swiper ('.swiper-containera', {
                direction: 'horizontal',
                threshold : 30,
                slidesPerView :4,
            })
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .swiper-containera{
        height: 100px;
        box-sizing: border-box;
        overflow: hidden;
        .swiper-slide{
            display: flex;
            align-items: center;
        }
        .item{
            width: 187.5px;
            @include flex;
            box-sizing: border-box;
            span{
                width: 150px;
                display: block;
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 22px;
                color: #333;
                box-sizing: border-box;
                border-radius: 5px;
            }
            .active{
                border: 1px solid #34C47C;
                color: #34C47C;
            }
        }
    }

</style>