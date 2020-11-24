<template>
    <div class="titanlink2">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div v-if="!is_weixin">
<!--                    <span class="chatLink-bg"><img src="../assets/img/titanLink2/titan.jpg" alt=""></span>-->
                    <span class="chatLink-bg"><img src="../assets/img/titanLink2/titan_2019_12_24.jpg" alt=""></span>

                    <div class="btn d" @click="goScroll"></div>
                    <a :href="ios_url" class="btn ios" @click="skip('1')"></a>
                    <a :href="android_url" class="btn android" @click="skip('2')"></a>
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
                android_url:'http://api.resource.titan.shenzhouxing.com/web/apk/titan.apk',
                ios_url:'https://www.hema91.com/itunes/iRTK9'
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
            goScroll(){
                this.scroll.scrollTo(0,this.scroll.maxScrollY,300)
            },
            skip:function(e){
                this.is_loading=true
                setTimeout(()=>{
                    this.is_loading=false
                },1500)
                if(e==2){if (isYouxibi()) {downloadApk(this.android_url)}}
            },
        }
    }
</script>

<style lang="scss" scoped>
    .titanlink2{
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
                    height: 3971px;
                    display: block;
                    font-size: 0px;
                    img{
                        width: 100%;
                    }
                }
                .btn{
                    position: absolute;
                    width: 400px;
                    height: 90px;
                    display: block;
                    left:50%;
                    transform: translateX(-50%);
                    /*border: 1px solid red;*/
                }
                .d{
                    top: 1010px;
                }
                .ios{
                    bottom:260px;
                }
                .android{
                    bottom: 125px;
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
