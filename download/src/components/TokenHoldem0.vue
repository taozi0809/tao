<template>
    <div class="tokenholdem0">
        <div class="bg"><img src="../assets/img/tokenholdem0/bg-ys.png" alt=""></div>
        
        <div class="ios" v-if="is_ios" @click="download"><img src="../assets/img/tokenholdem0/ios.png" alt=""></div>
        <div class="android" v-if="is_android" @click="download"><img src="../assets/img/tokenholdem0/android.png" alt=""></div>
        <div class="download" @click="download('download')"><img src="../assets/img/tokenholdem0/download.png" alt=""></div>
        <div class="weixin" v-if="is_weixin&&is_android"><img src="../assets/img/weixin.png" alt=""></div>
    </div>
</template>

<script>

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
                android_url:"https://www.shenzhouxing.com/tholdem/dl/android/tholdem.apk",
                ios_url:"https://www.hema91.com/itunes/iG9FS",
                download_url:"http://game.shenzhouxing.com/gametoken/dl/",
            }
        },
        created:function(){
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
        },
        methods:{
            download(type){
                if(this.is_ios){
                    window.location.href = this.ios_url
                }
                if(this.is_android){
                    if (isYouxibi()) {downloadApk(this.android_url)}
                    window.location.href = this.android_url
                }
                if(type=='download'){
                    window.location.href = this.download_url
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .tokenholdem0{
        width: 100%;
        .bg{
            width: 100%;
            height: 2240px;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .ios{
            width: 375px;
            position: absolute;
            top: 480px;
            left: 50%;
            transform: translateX(-50%);
            img{
                width: 100%;
            }
        }
        .android{
            width: 375px;
            position: absolute;
            top: 480px;
            left: 50%;
            transform: translateX(-50%);
            img{
                width: 100%;
            }

        }
        .download{
            width: 375px;
            position: absolute;
            top: 2000px;
            left: 50%;
            transform: translateX(-50%);
            img{
                width: 100%;
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
