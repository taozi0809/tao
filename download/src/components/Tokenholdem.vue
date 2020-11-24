<template>
    <div class="Tokenholdem">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div v-if="!is_weixin">
                    <!--<span class="chatLink-bg"><img src="../assets/img/tokenholdem/Tokenholdem.png" alt=""></span>-->
                    <div class="chatLink-bg">
                        <span><img src="../assets/img/tokenholdem/v2/1.jpg" alt=""></span>
                        <span><img src="../assets/img/tokenholdem/v2/2.png" alt=""></span>
                        <span><img src="../assets/img/tokenholdem/v2/3.png" alt=""></span>
                        <span><img src="../assets/img/tokenholdem/v2/4.png" alt=""></span>
                    </div>


                    <span class="btn" @click="download"><img src="../assets/img/tokenholdem/btn.png" alt=""></span>
                </div>
                <div class="loading" v-if="is_loading"><p>请稍等...</p></div>
                <div class="weixin" v-if="is_weixin"><img src="../assets/img/weixin.png" alt=""></div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {isYouxibi,downloadApk} from "../assets/js/app";
    import {isIos,isWeiXin} from "../assets/js/tool";

    export default {
        data(){
            return{
                scroll:null,
                is_ios:'',
                is_android:'',
                is_weixin:'',
                is_loading:'',
            }
        },
        created:function(){
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
        },
        mounted:function(){
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.wrapper, {
                    click:true,
                    scrollY:true,
                })
            })
        },
        methods:{
            download(){
                window.location.href = 'https://gametoken.link/download/'
            },
        }
    }
</script>

<style lang="scss" scoped>
    .Tokenholdem{
        width: 100%;
        height: 100%;
        .wrapper{
            width: 100%;
            height: 100%;
            position: fixed;
            top:0;
            bottom: 0;
            z-index: 0;
            left:0;
            overflow: hidden;
            .content{
                width: 100%;
                .chatLink-bg{
                    width: 100%;
                    height: 5275.7px;
                    display: block;
                    font-size: 0px;
                    span{
                        width: 100%;
                        display:inline-block;
                        img{
                            width: 100%;
                        }
                    }
                }
                .btn{
                    position: absolute;
                    bottom: 170px;
                    width: 660px;
                    display: block;
                    left:50%;
                    transform: translateX(-50%);
                    img{
                        width: 100%;
                    }

                }
            }
        }
        .loading{
            position: fixed;
            z-index: 9;
            top:0;
            left:0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.6);
            display: flex;
            align-items: center;
            justify-content: center;
            p{
                color: #fff;
                font-size: 28px;
            }
        }
        .weixin{
            width: 100%;
            position: absolute;
            z-index: 9;
            top:0;
            left:0;
            img{
                width: 100%;
            }
        }
    }
</style>