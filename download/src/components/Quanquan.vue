<template>
    <div class="quanquan">
        <div class="bg"><img src="../assets/img/quanquan/bg.png" alt=""></div>
        <div class="ios-btn" @click="download('ios')"><img src="../assets/img/quanquan/ios-btn.png" alt=""></div>
        <div class="android-btn" @click="download('android')"><img src="../assets/img/quanquan/android-btn.png" alt=""></div>
        <div class="donload" @click="download('download')"></div>
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
                android_url:"http://api.resource.youxibi.com/app/apk/WeGroup.apk",
                ios_url:"https://apps.apple.com/cn/app/%E5%9C%88%E5%9C%88-%E5%90%8C%E5%A5%BD%E7%A4%BE%E7%BE%A4/id1341536873",
            }
        },
        created:function(){
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
        },
        methods:{
            download(type){
                if(type=='ios'){
                    window.location.href = this.ios_url
                }
                if(type=='android'){
                    window.location.href = this.android_url
                }
                if(type=='download'){
                    var download_url
                    if(this.is_ios){
                        download_url = this.ios_url
                    }else if(this.is_android){
                        download_url = this.android_url
                    }else{
                        download_url = this.android_url
                    }
                    window.location.href = download_url
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    .quanquan{
        width: 100%;
        .bg{
            width: 100%;
            height: 3358px;
            overflow: hidden;
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
        .ios-btn,.android-btn{
            width: 532px;
            height: 106px;
            left: 50%;
            transform: translateX(-50%);
            img{
                width: 100%;
            }
        }
        .ios-btn{
            position: absolute;
            top: 851px;
        }
        .android-btn{
            position: absolute;
            top: 1022px;
        }
        .donload{
            width: 250px;
            height: 100px;
            position: absolute;
            right: 0;
            top:3258px;
            z-index: 1;
        }

    }
</style>
