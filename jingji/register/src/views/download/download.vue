<template>
    <div class="download">
        <a class="btn" :href="url" @click="skip(is_ios?'1':'2')"><img src="../../assets/img/download/btn.png" alt=""></a>
    </div>
</template>

<script>
    import {isIos} from "../../assets/js/tool";
    import {isYouxibi,downloadApk} from "../../assets/js/app";

    export default {
        data(){
            return{
                is_ios:'',
                is_android:"",
                android_url:"http://caishenhongbao.com/jjddz_client-release.apk",
                ios_url:"",
                url:'',
            }
        },
        created() {
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            this.is_ios?this.url=this.ios_url:this.url=this.android_url
        },
        methods:{
            skip:function(e){
                if(e==2){
                    if (isYouxibi()) {downloadApk(this.android_url)}
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    .download{
        width: 100%;
        height: 1334px;
        background-image: url("../../assets/img/download/bg.png");
        background-size: 100% 100%;
        .btn{
            position: absolute;
            right: 70px;
            top: 1166px;
            width:285px ;
            img{
                width: 100%;
            }
        }

    }
</style>
