<template>
    <div class="img">
        <div v-if="typeof this.imgList==='string'" class="box"><img :src="imgList" alt=""></div>
        <div v-if="typeof this.imgList==='object'" class="box-group">
            <span v-for="item in imgList"><img :src="item" alt=""></span>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        props: ['imgList'],
    }
</script>

<style lang="scss" scoped>
    .img{
        width: 100%;
        height: 100%;
        .box{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .box-group{
            width: 100%;
            height: 100%;
            /*display: grid;*/
            /*grid-template-columns:33.33% 33.33% 33.33%;*/
            /*grid-template-rows: 33.33% 33.33% 33.33%;*/
            display: flex;
            flex-wrap:wrap;
            span{
                display: flex;
                align-items: center;
                justify-content: center;
                /*width: 100%;*/
                width: 33.33%;
                height: 33.33%;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>