<template>
    <div class="mahjong">
        <div class="bg"><img src="../assets/img/mahjong/mahjong-bg.png" alt=""></div>
        <a :href="url" class="download-btn" @click="skip(is_ios?'1':'2')"><img src="../assets/img/mahjong/mahjong-download.png" alt=""></a>
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
                android_url:"https://www.shenzhouxing.com/gdmj/dl/android/gdmj.apk",
                ios_url:"https://www.wyuq.com/supersign/47O3",
                url:'',
            }
        },
        created:function(){
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
            this.is_ios?this.url=this.ios_url:this.url=this.android_url
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
    .mahjong{
        width: 100%;
        .bg{
            width: 100%;
            height: 2032px;
            img{
                width: 100%;
            }
        }
        .download-btn{
            position: absolute;
            top: 700px;
            left: 50%;
            transform: translateX(-50%);
            width: 376px;
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