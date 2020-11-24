<template>
    <div class="register">
        <span class="home-bg"><img src="../../assets/img/chatLinkSignIn/page2.png" alt=""></span>

        <div class="form">
            <div class="item">
                <p class="item-title">手机号码</p>
                <div class="input-box">
                    <input type="tel" id="demo" class="qz">
                    <input type="tel" class="phone-number" v-model="phoneNumber">
                </div>
            </div>

            <div class="item">
                <p class="item-title">验证码</p>
                <div class="input-box">
                    <input type="tel" v-model="securityCode" class="security-code">
                    <div class="get-security-code" @click="handleGetSecurityCode">{{txt}}</div>
                </div>
            </div>

            <div class="item">
                <p class="item-title">设置密码</p>
                <div class="input-box">
                    <input type="password" class="password" v-model="password">
                </div>
            </div>

            <div class="btn" @click="handleRegister">立即注册</div>

            <div class="download" @click="handleLinkToDownload">
                <span>已有账号？</span>
                <span>立即下载</span>
            </div>
        </div>


        <message ref="message"/>
    </div>
</template>

<script>
    import {intlTelInputInit} from "../../assets/js/intlTelInputInit";
    import {sms_send_captcha,user_identify,link_register_with_link} from "../../service/api";

    export default {
        data(){
            return{
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
            this.inviteCode = this.$route.query.inviteCode
            this.identify_fun()
        },
        mounted:function(){
            // intlTelInputInit()
        },
        methods:{
            handleLinkToDownload(){
                this.$router.push('/chatLinkSignInDownload')
            },
            handleRegister(){
                if(!!this.identify&&!!this.securityCode&&!!this.phoneNumber&&!!this.password&&!!this.inviteCode){
                    link_register_with_link(this.identify,this.securityCode,this.phoneNumber,this.password,this.inviteCode).then(res=>{
                        console.log('注册:',res)
                        if(res.code==0){
                            this.$refs.message.Message('注册成功');
                            this.$router.push('/chatLinkSignInDownload')
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }
            },
            handleGetSecurityCode(){
               if(this.canClick){
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
                   console.log(this.identify,this.key,this.phoneNumber)
                   sms_send_captcha("sms:captcha",this.key,this.phoneNumber).then(res=>{
                       console.log(res)
                       if(res.code==0){
                           this.$refs.message.Message('已发送');
                       }else{
                           this.$refs.message.Message(res.message);
                       }
                   })
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
        },
    }
</script>

<style lang="scss" scoped>
    .register{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #3b4cd9;
        .home-bg{
            width: 100%;
            display: block;
            img{
                width: 100%;
            }
        }
        .form{
            width: 690px;
            height: 687px;
            background: #fff;
            position: absolute;
            bottom: 0;
            left:50%;
            transform: translateX(-50%);
            overflow: hidden;
            border-top-right-radius: 30px;
            border-top-left-radius: 30px;
            box-sizing: border-box;
            padding: 43px 34px;

            .item{
                margin-bottom: 35px;
                .item-title{
                    color: #3f546d;
                    font-size: 30px;
                    margin-bottom: 10px;
                }
                .input-box{
                    height: 80px;
                    width: 100%;
                    border-bottom:1px solid #BBBDBF ;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    overflow: hidden;
                    input{
                        font-size: 40px;
                        color: #42524a;
                    }
                    .qz{
                        width: 0;
                    }
                    .phone-number{
                        width: 500px;
                    }


                    .security-code{
                        width: 480px;
                        height: 60px;
                    }
                    .get-security-code{
                        width: 150px;
                        height: 60px;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24px;
                        background: #013071;
                        border-radius: 5px;
                    }

                    .password{
                        width: 100%;
                    }
                }

            }
            .btn{
                width: 500px;
                height: 80px;
                margin: 0 auto;
                background: #013071;
                font-size: 32px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }
            .download{
                text-align: center;
                span{
                    font-size: 24px;
                }
                span:nth-child(1){
                    color: #808080;
                }
                span:nth-child(2){
                    color:#013071 ;
                }
            }
        }


    }
</style>