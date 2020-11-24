<template>
    <div class="game-token">
        <div class="wrapper" ref="wrapper">
            <div class="content">

                <div v-if="!is_weixin">
                    <div class="bg"><span><img src="../assets/img/gameToken/bg.png" alt=""></span></div>
                    <a :href="ios_url" v-if="is_ios" class="btn" @click="skip('1')"><img src="../assets/img/gameToken/ios.png" alt=""></a>
                    <!--<p v-if="is_ios" class="des">安装前请卸载旧版本，安装后请打开「设置」-「通用」-「设备管理」，点击信任GAME TOKEN，安装完成。</p>-->

                    <a :href="android_url" v-if="is_android" class="btn" @click="skip('2')"><img src="../assets/img/gameToken/android.png" alt=""></a>
                </div>
                <div class="loading" v-if="is_loading"><p>请稍等...</p></div>
                <div class="weixin" v-if="is_weixin"><img src="../assets/img/weixin.png" alt=""></div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {isIos,isWeiXin} from "../assets/js/tool";
    import {isYouxibi,downloadApk} from "../assets/js/app";

    export default {
        data(){
            return{
                scroll:null,
                is_ios:'',
                is_android:'',
                is_weixin:'',
                is_loading:'',
                android_url:'http://game.shenzhouxing.com/gametoken/app/gametoken-release-108-2.apk',
                ios_url:'https://www.hema91.com/itunes/iTI2A'

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
                if(e==2){if (isYouxibi()) {downloadApk(this.android_url)}}
            },
        },
    }
</script>
<style lang="scss" scoped>
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
            .bg{
                width: 100%;
                height:1875px;
                display: block;
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
                top: 380px;
                left: 50%;
                transform: translateX(-50%);
                width: 400px;
                z-index: 99;
                img{
                    width: 100%;
                }
            }
            .des{
                color: #fff;
                font-size:24px;
                position: absolute;
                top: 530px;
                width: 100%;
                box-sizing: border-box;
                padding: 0 60px;
                z-index: 1;
                line-height: 1.5;
                text-align: center;
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
