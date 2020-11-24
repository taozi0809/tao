<template>
    <div class="head">
        2017联合会杯
        <span class="btn" @click="selectPage=true">赛季</span>

        <section class="select-page" v-if="selectPage">
           <div class="main">
               <ul>
                   <li>选择赛季</li>
                   <li @click="selectPage=false">2017赛季</li>
                   <li @click="selectPage=false">2013赛季</li>
                   <li @click="selectPage=false">2009赛季</li>
                   <li @click="selectPage=false">2005赛季</li>
                   <li @click="selectPage=false">2001赛季</li>
               </ul>
           </div>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                selectPage:false,
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/mixin";
    .head{
        width: 100%;
        height: 88px;
        line-height: 88px;
        background:#34C47C ;
        color: #fff;
        font-size: 30px;
        text-align: center;
        position: fixed;
        box-sizing: border-box;
        z-index: 10;
        .btn{
            position: absolute;
            right: 20px;
            top:50%;
            transform: translateY(-50%);
            width:120px;
            height: 100%;
            box-sizing: border-box;
            /*border: 1px solid red;*/
            font-size: 26px;
            text-align: right;
        }
        .select-page{
            position: fixed;
            top:0;
            bottom: 0;
            left:0;
            width: 100%;
            box-sizing: border-box;
            background: rgba(0,0,0,.7);
            padding-top: 88px;
            .main{
                background: #fff;
                ul{
                    li{
                        width: 100%;
                        height: 70px;
                        line-height: 70px;
                        @include borderBottom(#E6E6E6);
                        font-size: 22px;
                        color: #333;
                        font-weight: 700;
                    }
                    li:first-child{
                        font-weight: 500;
                        font-size: 24px;
                    }
                }
            }

        }
    }
</style>