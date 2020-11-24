<template>
    <div class="register-page">
        <div class="form">
            <div class="close" @click="handleClose">x</div>
            <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.loginR:''}}</div>
            <div class="item">
                <input type="text" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.emailR:''" v-model="accountR">
            </div>
            <div class="item authCodeBox">
                <input type="tel" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.authCode:''" v-model="authCode">
                <div class="authCodeBtn" v-if="isAuthCode" @click="handleSendAuthCode">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.authCodeBtn:''}}</div>
                <div class="authCodeBtn" v-if="!isAuthCode">{{timeNum}}s</div>
            </div>
            <div class="item password">
                <input :type="isEye?'text':'password'" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.passwordR1:''" v-model="passwordR1">

                <div class="xyj">
                    <span v-if="isEye"><img src="../assets/img/password-open.png" alt="" @click="isEye=false"></span>
                    <span v-if="!isEye"><img src="../assets/img/password-close.png" alt="" @click="isEye=true"></span>
                </div>
            </div>
            <div class="item agree">
                <div class="agree-item">
                    <span class="select-box" v-if="!selectActive" @click="selectActive=true"></span>
                    <span class="select-box" v-if="selectActive" @click="selectActive=false"><img src="../assets/img/select-active.png" alt=""></span>
                    <p class="agreeDes">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.agreeDes1:''}}</p>
                </div>
                <div class="agree-item">
                    <a  href='https://www.vidfish.net/terms-of-use/' class="rule">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.rule:''}}</a>
                    <p class="agreeDes">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.agreeDes2:''}}</p>
                    <a  href='https://www.vidfish.net/privacy-policy/' class="policy">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.policy:''}}</a>
                </div>
            </div>
            <div class="login-btn" @click="handleRegister">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.loginR:''}}</div>
            <div class="or">
                <span class="l"></span>
                <span class="c">OR</span>
                <span class="r"></span>
            </div>
            <div class="register-here" @click="handleLoginPage">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.desR:''}}<span class="register-btn">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.registerR:''}}</span></div>
        </div>
        <message ref="message"/>
    </div>
</template>

<script>
    import {langCon} from "../assets/data/langCon";
    import {vidfishUserRegist,emailSendCheckCode} from "../service/api";
    import {mapState, mapMutations} from 'vuex'
    import {setLocalStore} from "../storage";

    export default{
        data(){
            return{
                isEmailR:true,
                accountR:'',
                passwordR1:'',
                passwordR2:'',
                passwordR:'',
                userName:'',
                authCode:'',
                birthdays:'',
                promotionCodeType:'',
                promotionCode:'',
                referralCode:'',
                selectActive:true,
                isAuthCode:true,
                timeNum:60,
                TIMECONTENT:60,
                isMonth:0,
                isEye:false,

            }
        },
        computed:{
            ...mapState(['lang','loginType']),
        },
        created:function(){
            this.langCon = langCon
        },
        methods:{
            ...mapMutations(['ISLOGIN','LOGINTYPE','USERINFO']),
            handleClose(){
                this.LOGINTYPE('')
            },
            handleLoginPage(){
                this.LOGINTYPE('loginPage')
                setTimeout(()=>{
                    $("#demo").intlTelInput({
                        preferredCountries: ['sg','cn','us'],
                    });
                    $('.intl-tel-input').css({
                        'display':'none'
                    })
                },0)
            },
            handleSendAuthCode(){
                if(!!this.accountR){
                    let phomeNumber=null
                    let email=null

                    if(this.isEmailR){
                        email=this.accountR
                    }else{
                        let code = $("#demoR").intlTelInput("getSelectedCountryData")
                        let CountryCode = `+${code.dialCode}-`
                        phomeNumber=CountryCode+this.accountR
                    }
                    emailSendCheckCode(phomeNumber,email,this.lang.lang).then(res=>{
                        console.log('注册码发送:',res)
                        if(res.code==0){
                            this.isAuthCode = false
                            this.timeNum = this.TIMECONTENT
                            let timer = setInterval(() => {
                                if (this.timeNum > 0 && this.timeNum <= this.TIMECONTENT) {
                                    this.timeNum--;
                                } else {
                                    clearInterval(timer);
                                    this.isAuthCode=true
                                }
                            }, 1000)
                            switch (this.lang.lang){
                                case 'ZH':
                                    this.$refs.message.Message(`我们已发送验证码到${email}，请查看邮箱。`);
                                    break;
                                case 'EN':
                                    this.$refs.message.Message(`We have sent the verification code to ${email}, please check your mailbox.`);
                                    break;
                                case 'IND':
                                    this.$refs.message.Message(`Kami telah mengirimkan kode verifikasi ke ${email}, silakan periksa kotak surat Anda`);
                                    break;
                            }
                            this.emailType=1
                        }else{
                            this.$refs.message.Message(res.message);
                        }
                    })
                }else{
                    if(this.lang.lang=='ZH'){this.$refs.message.Message('请输入账号')}
                    if(this.lang.lang=='EN'){this.$refs.message.Message('Please enter your email or phone number')}
                    if(this.lang.lang=='IND'){this.$refs.message.Message('Silakan masukkan email atau nomor telepon Anda')}
                }
            },
            handleRegister(){
                if(this.accountR==''){
                    if(this.lang.lang=='ZH'){this.$refs.message.Message('请输入账号')}
                    if(this.lang.lang=='EN'){this.$refs.message.Message('Please enter your email or phone number')}
                    if(this.lang.lang=='IND'){this.$refs.message.Message('Silakan masukkan email atau nomor telepon Anda')}
                    return
                }
                if(this.authCode==''){
                    this.$refs.message.Message('验证码不能为空');
                    return
                }
                if(this.passwordR1==''&&this.passwordR1.length>=6){
                    this.$refs.message.Message('密码最少6位');
                    return
                }
                if(!this.selectActive){
                    this.$refs.message.Message('请勾选同意');
                    return
                }
                vidfishUserRegist(this.userName,this.accountR,this.passwordR1,this.authCode,null,null,null,'946698415000',null,null).then(res=>{
                    console.log('注册：',res)
                    if(res.code==0){
                        setLocalStore('token',res.data.token)
                        this.USERINFO(res.data)
                        this.LOGINTYPE('')
                        this.ISLOGIN(true)
                        this.$refs.message.Message('注册成功');
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .register-page{
        position: fixed;
        z-index: 99;
        background: rgba(0,0,0,.8);
        width: 100%;
        height: 100%;
        top:0;
        bottom: 0;
        left:0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        .x-box{
            position: relative;
            width: 430px;
            height: 650px;
        }


        .form{
            position: relative;
            width: 430px;
            height: 650px;
            border: 1px solid rgb(53, 141, 254);
            box-sizing: border-box;
            padding:50px 30px;
            background: rgba(0,0,0,.9);
            .close{
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background: #358dfe;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                font-weight: bold;
                position: absolute;
                top:6px;
                right: 6px;
                cursor: pointer;
                color: #fff;
                z-index: 99;
            }
            .title{
                font-size: 26px;
                color: #fff;
                font-weight: bold;
                margin-bottom: 35px;
            }
            .item{
                width: 100%;
                height: 60px;
                position: relative;
                display: flex;
                align-items: center;
                input{
                    border: none;
                    width: 100%;
                    height: 40px;
                    background: rgba(0,0,0,0);
                    color: rgba(93,93,93,1);
                    font-weight: bold;
                    font-size: 16px;
                    border-bottom: 1px solid rgba(93,93,93,1);
                    margin-bottom: 10px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    outline: none;
                }
                .qh{
                    position: absolute;
                    width: 25px;
                    display: block;
                    right: 0;
                    top: 12.5px;
                    cursor: pointer;
                    img{
                        width: 100%;
                    }
                }
                .demo{
                    width: 50px;
                    border: none;
                    height: 30px;
                    background: rgba(0,0,0,0);
                    font-weight: bold;
                    font-size: 16px;
                    border-bottom: 1px solid rgba(93,93,93,1);
                    margin-bottom: 10px;
                    box-sizing: border-box;
                    outline: none;
                    color:transparent;
                }
            }
            .forget{
                font-size: 16px;
                color: #fff;
                text-align: right;
            }
            .login-btn{
                cursor: pointer;
                margin-top: 80px;
                width: 100%;
                height: 50px;
                background: #358dfe;
                color: #fff;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                border-radius: 30px;
                margin-bottom: 30px;
            }
            .or{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 30px;
                .l,.r{
                    display: block;
                    width: 40%;
                    height: 2px;
                    background: #fff;
                    border-radius: 2px;
                }
                .c{
                    font-size: 16px;
                    color: rgba(93,93,93,1);

                }
            }
            .register-here{
                font-size: 16px;
                text-align: center;
                color: #fff;
                .register-btn{
                    color:#358dfe;
                    cursor: pointer;
                }
            }
        }
    }
    .register-page{
        .form{
            /*overflow-y: scroll;*/
            /*overflow-x: hidden;*/
            .login-btn{
                margin-top: 30px;
            }
            .agree{
                display: block;
                .agree-item{
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    .select-box{
                        width: 15px;
                        height: 15px;
                        background: #fff;
                        display: block;
                        overflow: hidden;
                        border-radius: 2px;
                        img{
                            width: 100%;
                        }
                    }
                    .agreeDes{
                        font-size: 14px;
                        color: #fff;
                        margin: 0 5px;
                    }
                    a{
                        color: #358dfe;
                        cursor: pointer;
                        font-size: 14px;
                    }
                }
            }

            .authCodeBox{
                .authCodeBtn{
                    width: 120px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            .promotion{
                justify-content: space-between;
                .box{
                    position: relative;
                    width: 40%;
                }
                input:nth-child(2){
                    width: 55%;
                }
            }
        }
        .form::-webkit-scrollbar {
            display: none;
        }
        .password{
            position: relative;
            .xyj{
                position: absolute;
                right: 5px;
                span{
                    cursor: pointer;
                    display: block;
                    width: 25px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }
</style>