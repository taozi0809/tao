<template>
    <div class="chatLink">
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div class="content" v-if="!is_weixin">
                    <span class="chatLink-bg"><img src="../assets/img/titanLink/titan.png" alt=""></span>
                    <div class="go-bot" @click="go_bot"></div>
                    <a :href="ios_url" class="download-ios" @click="skip('1')"></a>
                    <a :href="android_url" class="download-android" @click="skip('2')"></a>
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
                is_loading:'',
                is_weixin:'',
                android_url:"http://api.resource.titan.shenzhouxing.com/web/apk/titan.apk",
                // ios_url:"itms-services://?action=download-manifest&url=https://www.titan.link/ipa/titan_1.0.0.plist",
                ios_url:"https://wyuq.com/supersign/RTK9",
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
            skip:function(e){
                this.is_loading=true
                setTimeout(()=>{
                    this.is_loading=false
                },1500)
                if(e==1){
                    if (isYouxibi()) {
                        downloadApk(this.android_url)
                    }
                }
            },
            go_bot:function(){
                this.scroll.scrollTo(0,this.scroll.maxScrollY,300)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .chatLink{
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
                    height: 3659px;
                    display: block;
                    img{
                        width: 100%;
                    }
                }
                .go-bot{
                    position: absolute;
                    box-sizing: border-box;
                    /*border: 1px solid red;*/
                    width: 240px;
                    height: 110px;
                    top:450px;
                    left:450px;
                }
                .download-ios{
                    position: absolute;
                    top:3150px;
                    left:200px;
                    width: 350px;
                    height: 140px;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
                }
                .download-android{
                    position: absolute;
                    top:3390px;
                    left:200px;
                    width: 350px;
                    height: 140px;
                    /*border: 1px solid red;*/
                    box-sizing: border-box;
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