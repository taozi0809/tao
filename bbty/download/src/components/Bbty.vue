<template>
    <div class="bbty">
        <span class="bg"><img src="../assets/images/bg.png" alt=""></span>
        <span class="ios"><img src="../assets/images/ios.png" alt=""></span>
        <span class="android"><img src="../assets/images/android.png" alt=""></span>
        <a :href="ios_url" class="ios-btn" @click="skip('1')"></a>
        <a :href="android_url" class="android-btn" @click="skip('2')"></a>
        <div class="loading" v-if="is_loading"><p>请稍等...</p></div>
        <div class="weixin" v-if="is_weixin"><img src="../assets/images/weixin.png" alt=""></div>
    </div>
</template>
<script>
    import {isYouxibi,downloadApk} from "../assets/js/app";
    import {isIos,isWeiXin} from "../assets/js/tool";

    export default {
        data(){
            return{
                android_url:"https://titan.link/bbty/app/Bbty.apk",
                ios_url:"https://www.hema91.com/itunes/iULTE",
                is_ios:'',
                is_android:'',
                is_loading:'',
                is_weixin:'',
            }
        },
        created:function(){
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
        },
        methods:{
            skip:function(e){
                this.is_loading=true
                setTimeout(()=>{
                    this.is_loading=false
                },1500)
                if(e==2){
                    if (isYouxibi()) {
                        downloadApk(this.android_url)
                    }
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .bg{
        width:750px;
        height: 3040px;
        display: block;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
    .ios{
        width: 415px;
        height: 98px;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 704px;
        img{
            width: 100%;
        }
    }
    .ios-btn{
        width: 415px;
        height: 98px;
        z-index: 10;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 704px;
    }
    .android{
        width: 415px;
        height: 98px;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 848px;
        img{
            width: 100%;
        }
    }
    .android-btn{
        width: 415px;
        height: 98px;
        z-index: 10;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 848px;
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
</style>
