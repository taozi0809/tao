<template>
    <div class="ChatLinkSignIn">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <span class="bg3"><img src="../assets/img/chatLink.signIn/page1.png" alt=""></span>
                    <span class="phone"><img src="../assets/img/chatLink.signIn/phone.png" alt=""></span>
                    <span class="join" @click="swiper.slideNext()"><img src="../assets/img/chatLink.signIn/join.png" alt=""></span>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                    <span class="bg"><img src="../assets/img/chatLink.signIn/page2.png" alt=""></span>
                    <div class="form">
                        <div class="row">
                            <div class="label">手机号码</div>
                            <div class="value value1">
                                <IntlTellInput :toFront="toFront" :countryCode="countryCode" @excountry="showCountry"/>
                                <input type="tel" v-model="phoneNumber">

                            </div>
                        </div>
                        <div class="row">
                            <div class="label">验证码</div>
                            <div class="value value2">
                                <input type="tel" v-model="securityCode">
                                <!--<div class="auth-code">获取验证码</div>-->
                                <div class="auth-code" @click="getSecurityCode">{{txt}}</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="label">密码</div>
                            <div class="value value3">
                                <input type="password" v-model="password">
                            </div>
                        </div>
                        <div class="sign-in" @click="signIn">立即注册</div>
                        <div class="des">
                            <span>已有账号？</span>
                            <span @click="swiper.slideNext()">立即下载</span>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                    <span class="bg bg33"><img src="../assets/img/chatLink.signIn/page3.png" alt=""></span>
                    <span class="bg3"><img src="../assets/img/chatLink.signIn/page.png" alt=""></span>
                    <span class="ios" @click="download('ios')"><img src="../assets/img/chatLink.signIn/ios.png" alt=""></span>
                    <span class="android" @click="download('android')"><img src="../assets/img/chatLink.signIn/android.png" alt=""></span>
                </div>
            </div>
        </div>

        <div class="weixin" v-if="is_weixin"><img src="../assets/img/weixin.png" alt=""></div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import IntlTellInput from '../components/tellInput/Intltelinput'
    import {isIos,isWeiXin} from "../assets/js/tool";
    import { Toast } from 'vant';
    import {user_identify,link_register_with_link,sms_send_captcha} from "../api/api";

    export default {
        components:{IntlTellInput},
        data(){
            return{
                swiper:null,
                toFront:[ "us", "gb" ],
                countryCode:'cn',
                dialCode:null,
                android_url:"https://chat.link/apk/cl_1.0.4.apk",
                // ios_url:"itms-services://?action=download-manifest&amp;url=https://chat.link/ipa/cl_1.0.0.plist",
                ios_url:"https://wyuq.com/supersign/0CH5",
                is_weixin:false,

                phoneNumber:'',
                areaNumber:'',
                txt:'获取验证码',
                totalTime: 60,
                canClick:true,
                securityCode:'',
                password:'',
                isShow:false,
                key:'',
                identify:'',
                inviteCode:'',
            }
        },
        created:function(){
            this.inviteCode = !!this.$route.query.inviteCode?this.$route.query.inviteCode:Toast({message:'未获取到邀请码', duration:1500})

            isWeiXin()&&!isIos()?this.is_weixin=true:''

        },
        mounted:function(){
            this.swiper=new Swiper ('.swiper-container', {
                direction : 'vertical',
                noSwiping : true,
            })
            this.identify_fun()
        },
        methods:{
            showCountry(data){
               // console.log(data)
                this.dialCode=data.dialCode
            },
            download(type){
                if(isIos()){
                    if(type=='ios'){
                        window.location.href=this.ios_url
                    }
                }else{
                    if(type=='android') {
                        window.location.href=this.android_url
                    }
                }
            },
            identify_fun(){
                user_identify().then(res=>{
                    console.log('获取key：',res)
                    if(res.code==0){
                        this.identify = res.data.identify
                        this.key = res.data.key
                    }
                })
            },
            signIn(){
                // this.inviteCode='12sk12'
                if(!!this.identify&&!!this.securityCode&&!!this.phoneNumber&&!!this.password&&!!this.inviteCode){
                    var phoneNumber=`+${this.dialCode}-${this.phoneNumber}`
                    link_register_with_link(this.identify,this.securityCode,phoneNumber,this.password,this.inviteCode).then(res=>{
                        console.log('注册:',res)
                        if(res.code==0){
                            Toast({message:'注册成功', duration:1500})
                            this.swiper.slideNext()
                        }else{
                            Toast({message:res.message, duration:1500})
                        }

                    })
                }
            },
            getSecurityCode(){
                if(this.canClick&&!!this.phoneNumber){
                    var phoneNumber=`+${this.dialCode}-${this.phoneNumber}`
                    sms_send_captcha("sms:captcha",this.key,phoneNumber).then(res=>{
                        console.log(res)
                        if(res.code==0){
                            Toast({message:'已发送', duration:1500})
                            this.canClick = false
                            this.txt = this.totalTime + 's'
                            let clock = window.setInterval(() => {
                                this.totalTime--
                                this.txt = this.totalTime + 's'
                                if (this.totalTime < 0) {
                                    window.clearInterval(clock)
                                    this.txt = '获取验证码'
                                    this.totalTime = 60
                                    this.canClick = true  //这里重新开启
                                }
                            },1000)
                        }else{
                            Toast({message:res.message, duration:1500})
                        }
                    })
                }
            },
        },
    }

</script>

<style lang="scss" scoped>
    .ChatLinkSignIn{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #3b4cd9;
        .swiper-container{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .swiper-wrapper{
                .swiper-slide{
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                    .bg{
                        width: 100%;
                        display: block;
                        img{
                            width: 100%;
                        }
                    }
                    .bg1{
                        position: relative;
                        z-index: 2;
                    }
                    .phone{
                        display: block;
                        width: 146%;
                        position: absolute;
                        top: 260px;
                        z-index: 1;
                        left: -20%;
                        img{
                            width: 100%;
                        }
                    }
                    .bg3{
                        position: absolute;
                        top: 0;
                        z-index: 0;
                        width: 100%;
                        display: block;
                        img{
                            width: 100%;
                        }
                    }
                    .bg33{
                        position: absolute;
                        bottom: 0;
                        z-index: 2;
                    }
                    .join{
                        position: absolute;
                        width:138px;
                        display: block;
                        top: 273px;
                        right: 12px;
                        z-index: 3;
                        img{
                            width: 100%;
                        }
                    }

                    .form{
                        width: 305px;
                        height: 320px;
                        position: absolute;
                        left:50%;
                        transform: translateX(-50%);
                        bottom: 0;
                        background: #fff;
                        border-top-right-radius: 15px;
                        border-top-left-radius: 15px;
                        overflow: hidden;
                        .row{
                            width: 265px;
                            height: 72px;
                            box-sizing: border-box;
                            border-bottom: 1px solid #BBBDBF;
                            margin: 0 auto;
                            padding-top: 17px;
                            .label{
                                font-size: 15px;
                                color: #3F546D;
                            }
                            .value1{
                                display: flex;
                                align-items: center;
                                height: 35px;
                                input{
                                    margin-left: 46px;
                                    width: 190px;
                                    box-sizing: border-box;
                                    font-size: 20px;
                                    color: #42524A;
                                }
                            }
                            .value2{
                                display: flex;
                                align-items: center;
                                height: 35px;
                                input{
                                    width: 190px;
                                    box-sizing: border-box;
                                    font-size: 20px;
                                    color: #42524A;
                                }
                                .auth-code{
                                    width: 75px;
                                    height: 30px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    color: #fff;
                                    background: #013071;
                                    font-size: 12px;
                                }
                            }
                            .value3{
                                input{
                                    margin-top: 8px;
                                    width: 265px;
                                    box-sizing: border-box;
                                    font-size: 20px;
                                    color: #42524A;
                                    /*border: 1px solid red;*/
                                }
                            }
                        }

                        .sign-in{
                            width: 250px;
                            height: 40px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: #fff;
                            font-size: 16px;
                            background: #013071;
                            margin: 0 auto;
                            margin-top: 15px;
                            margin-bottom: 10px;
                        }
                        .des{
                            text-align: center;
                            span:nth-child(1){
                                font-size: 12px;
                                color: #808080;
                            }
                            span:nth-child(2){
                                font-size: 12px;
                                color: #013071;
                            }
                        }
                    }

                    .ios{
                        position: absolute;
                        display: block;
                        width: 208px;
                        height: 49px;
                        overflow: hidden;
                        top: 350px;
                        left:50%;
                        transform: translateX(-50%);
                        z-index: 3;
                        img{
                            width: 100%;
                        }
                    }
                    .android{
                        position:absolute;
                        display: block;
                        width: 208px;
                        height: 49px;
                        overflow: hidden;
                        top: 422px;
                        left:50%;
                        transform: translateX(-50%);
                        z-index: 3;
                        img{
                            width: 100%;
                        }
                    }
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
    }
</style>