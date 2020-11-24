<template>
    <div class="Zrmnddz">
        <div class="bg" v-if="!isShare"><img src="../assets/img/jjedy/bg.png" alt=""></div>
        <div class="bg share-bg" v-if="isShare"><img src="../assets/img/jjedy/share-bg.png" alt=""></div>
        <transition name="ddz-fade">
            <div class="download"  v-if="isLoaded">
                <div class="l">
                    <div class="logo"><img src="../assets/img/jjedy/logo.png" alt=""></div>
                    <div class="txt">
                        <div class="t">竞技二打一</div>
                        <div class="b">斗地主，赢奖金</div>
                    </div>
                </div>

                <a class="btn" :href="url" @click="skip(is_ios?'1':'2')"><img src="../assets/img/jjedy/btn.png" alt=""></a>
            </div>
        </transition>

        <div class="weixin" v-if="is_weixin&&is_android"><img src="../assets/img/weixin.png" alt=""></div>
        <div class="share-box" v-if="isShare">
            <div class="l">
                <div class="t">邀请码</div>
                <div class="v">{{shareCode}}</div>
            </div>
            <div class="r" @click="copy()"><img src="../assets/img/jjedy/share-btn.png" alt=""></div>
        </div>
        <div class="loading" v-if="is_loading"><p>复制成功</p></div>
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
                is_loading:false,
                is_weixin:'',
                android_url:"http://caishenhongbao.com/jjddz_client-release.apk",
                ios_url:"",
                url:'',
                isLoaded:false,

                isShare:false,
                shareCode:"",

            }
        },
        created() {
            isIos()?(this.is_ios=true,this.is_android=false):(this.is_ios=false,this.is_android=true)
            isWeiXin()?this.is_weixin=true:this.is_weixin=false
            this.is_ios?this.url=this.ios_url:this.url=this.android_url

            function getUrlParams(name) { // 不传name返回所有值，否则返回对应值
                var url = window.location.search;
                if (url.indexOf('?') == 1) { return false; }
                url = url.substr(1);
                url = url.split('&');
                var name = name || '';
                var nameres;
                // 获取全部参数及其值
                for(var i=0;i<url.length;i++) {
                    var info = url[i].split('=');
                    var obj = {};
                    obj[info[0]] = decodeURI(info[1]);
                    url[i] = obj;
                }
                // 如果传入一个参数名称，就匹配其值
                if (name) {
                    for(var i=0;i<url.length;i++) {
                        for (const key in url[i]) {
                            if (key == name) {
                                nameres = url[i][key];
                            }
                        }
                    }
                } else {
                    nameres = url;
                }
                // 返回结果
                return nameres;
            }

            if(!!getUrlParams("shareCode")){
                this.shareCode=getUrlParams("shareCode")
                this.isShare=true
            }


        },
        mounted() {
            this.isLoaded=true
        },
        methods:{
            skip:function(e){
                if(e==2){
                    if (isYouxibi()) {downloadApk(this.android_url)}}
            },
            copy(){
                this.$copyText(this.shareCode).then(e=> {
                    this.is_loading=true
                    setTimeout(()=>{
                        this.is_loading=false
                    },500)
                    console.log(e)
                }, function (e) {
                    console.log(e)
                })
            },

        }
    }
</script>


<style lang="scss" scoped>
    .bg{
        width: 100%;
        height: 1378px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .share-bg{
        height: 1378px;
    }
    .share-box{
        width:90%;
        left: 50%;
        transform: translateX(-50%);
        height: 150px;
        position: absolute;
        top:125px;
        display: flex;
        align-content: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 40px;
        .l{
            width: 100%;
            .t{
                color: #055FB7;
                font-size:30px;
                font-weight: bold;
                font-family: PingFangSC-Regular;
                margin-top:30px;
            }
            .v{
                color: #055FB7;
                font-size:50px;
                font-weight: bold;
                font-family: PingFangSC-Regular;
                margin-top: 15px;
            }
        }
        .r{
            width: 230px;
            flex-shrink: 0;
            position: relative;
            top: 35px;
            img{
                width: 100%;
            }
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
        background: url("../assets/img/jjedy/bg_btn.png") center no-repeat;
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
    .btn2{
        width: 363px;
        position: absolute;
        top: 825px;
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

</style>
