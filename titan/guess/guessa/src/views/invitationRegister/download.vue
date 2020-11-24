<template>
    <div class="download">
        <span class="download-bg"><img src="../../assets/img/invitationRegister/download-bg.png" alt=""></span>

        <!--<a class="ios-btn" href="itms-services://?action=download-manifest&url=https://www.titan.link/ipa/titan_1.0.0.plist"><img src="../../assets/img/invitationRegister/ios-btn.png" alt=""></a>-->
        <a class="ios-btn" href="https://wyuq.com/supersign/RTK9"><img src="../../assets/img/invitationRegister/ios-btn.png" alt=""></a>
        <a class="android-btn" href="http://api.resource.titan.shenzhouxing.com/web/apk/titan.apk"><img src="../../assets/img/invitationRegister/android-btn.png" alt=""></a>

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
        background: url("../../assets/img/invitationRegister/bg.png") no-repeat;
        background-size: 100%;
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