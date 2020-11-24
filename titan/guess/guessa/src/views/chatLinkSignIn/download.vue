<template>
    <div class="download">
        <span class="download-bg"><img src="../../assets/img/chatLinkSignIn/page3.png" alt=""></span>

        <a class="ios-btn" href="itms-services://?action=download-manifest&amp;url=https://chat.link/ipa/cl_1.0.0.plist">
            <img src="../../assets/img/chatLinkSignIn/ios.png" alt=""></a>
        <a class="android-btn" href="https://chat.link/apk/cl_1.0.4.apk">
            <img src="../../assets/img/chatLinkSignIn/android.png" alt=""></a>

        <div class="bg" v-if="isWxChat"><img src="../../assets/img/invitationRegister/weixin-bg.png" alt=""></div>
    </div>
</template>

<script>
    import {isWxChat,isIos} from "../../assets/js/tool";

    export default {
        data(){
            return{
                isWxChat:false,
            }
        },
        created:function(){
            this.isWxChat = isWxChat()&&!isIos()
        }
    }
</script>

<style lang="scss" scoped>
    .download{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #3b4cd9;
        .download-bg{
            display: block;
            width: 100%;
            img{
                width: 100%;
            }
        }
        .ios-btn,.android-btn{
            position: absolute;
            top:698px;
            left:50%;
            transform: translateX(-50%);
            display: block;
            width: 415px;
            img{
                width: 100%;
            }
        }
        .android-btn{
            top: 842px;
        }

        .bg{
            position: fixed;
            width: 100%;
            top:0;
            left:0;
            bottom: 0;
            z-index: 10;
            img{
                width: 100%;
            }
        }
    }
</style>