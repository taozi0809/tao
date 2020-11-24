<template>
    <div class="Zrmnddz">
        <div class="bg"><img src="../assets/img/zrmnddz/bg.png" alt=""></div>
        <transition name="ddz-fade">
            <div class="download"  v-if="isLoaded">
                <div class="l">
                    <div class="logo"><img src="../assets/img/zrmnddz/logo.png" alt=""></div>
                    <div class="txt">
                        <div class="t">真人美女斗地主</div>
                        <div class="b">经典棋牌,真人美女对战</div>
                    </div>
                </div>

                <a class="btn" :href="url" @click="skip(is_ios?'1':'2')"><img src="../assets/img/zrmnddz/btn.png" alt=""></a>
            </div>
        </transition>


        <div class="weixin" v-if="is_weixin&&is_android"><img src="../assets/img/weixin.png" alt=""></div>
    </div>
</template>

<script>
    import {isIos,isWeiXin} from "../assets/js/tool";
    import {isYouxibi,downloadApk} from "../assets/js/app";

    export default {
        data(){
            return{
                is_ios:'',
                is_android:'',
                is_loading:'',
                is_weixin:'',
                android_url:"https://www.shenzhouxing.com/czddz/dl/android/czddz.apk",
                ios_url:"itms-services://?action=download-manifest&url=https://www.shenzhouxing.com/czddz/dl/ios/czddz.plist",
                url:'',
                isLoaded:false,
            }
        },
        created() {
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
            this.is_ios?this.url=this.ios_url:this.url=this.android_url
        },
        mounted() {
            this.isLoaded=true
        },
        methods:{
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
    .bg{
        width: 100%;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .download{
        width: 100%;
        height: 106px;
        position: absolute;
        overflow: hidden;
        z-index: 1;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: url("../assets/img/zrmnddz/bg_btn.png") center no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        padding-left: 11px;
        padding-right: 7px;
        .logo{
            width: 80px;
            position: relative;
            z-index: 1;
            img{
                width: 100%;
            }
        }
        .l{
            display: flex;
            align-items: center;
            .txt{
                margin-left: 20px;
                font-family: PingFangSC-Regular;
                color:rgba(255,251,249,1);
                .t{
                    font-size: 30px;
                    margin-bottom: 10px;
                }
                .b{
                    color: #E5E3E1;
                    font-size: 24px;
                }
            }
        }
        .bg-btn{
            width: 100%;
            height: 106px;
            position: absolute;
            top: 0;
            left: 0;
        }
        .btn{
            width: 206px;
            img{
                width: 206px;
            }
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

    .ddz-fade-enter{
        top: -100px;
        transition: top .5s;
    }
    .ddz-fade-enter-active{
        top: -100px;
        transition: top .5s;
    }
    .ddz-fade-enter-to{
        top: 0px;
    }

</style>
