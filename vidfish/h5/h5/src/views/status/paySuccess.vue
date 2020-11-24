<template>
    <div class="paySuccess">
        <div class="bg"><img src="../../assets/images/status/pay/bg.png" alt=""></div>
        <div class="mask"></div>
        <div class="status">
            <span><img src="../../assets/images/status/pay/success.png" alt=""></span>
            <p class="text1">{{$t('status.success.text1')}}</p>
            <p class="text2">{{$t('status.success.text2')}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        created:function(){

        },
    }
</script>

<style lang="scss" scoped>
    .paySuccess{
        width: 100%;
        .bg{
            width: 100%;
            img{
                width: 100%;
            }
            position: relative;
            z-index: 1;
        }
        .mask{
            width: 100%;
            position: absolute;
            top: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 1;
        }
        .status{
            width: 100%;
            position: absolute;
            top: 0;
            left:0;
            z-index: 2;
            span{
                display: block;
                width: 200px;
                margin: 0 auto;
                margin-top: 180px;
                img{
                    width: 100%;
                }
            }
            .text1{
                text-align: center;
                font-size: 50px;
                margin-top: 80px;
            }
            .text2{
                text-align: center;
                font-size: 32px;
                margin-top: 30px;
            }

        }
    }
</style>