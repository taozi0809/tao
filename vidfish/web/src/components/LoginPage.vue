<template>
    <div class="login-page" >
        <div class="form">
            <div class="close" @click="handleClose">x</div>
            <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.login:''}}</div>
            <div class="item" :id="isEmail?'email-active':'phone-active'">
                <input type="tel" id="demo" placeholder="" class="demo" unselectable="on" :class="isEmail?'email-active':'phone-active'">
                <input type="text" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.email:''" v-if="isEmail" v-model="account">
                <input type="phone" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.phone:''" v-if="!isEmail" v-model="account">

                <!--<span class="qh"><img src="../assets/img/qh.png" alt="" @click="handleQh"></span>-->
            </div>
            <p class="qh" @click="handleQh" v-if="isEmail">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.qhMobile:''}}</p>
            <p class="qh" @click="handleQh" v-if="!isEmail">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.qhEmail:''}}</p>
            <div class="item">
                <input type="password" :placeholder="lang.hasOwnProperty('lang')?langCon[lang.lang].login.password:''" v-model="password">
            </div>
            <div class="forget" @click="handleToForget">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.forgetPassword:''}}</div>
            <div class="login-btn" @click="handleLogin">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.login:''}}</div>
            <div class="or">
                <span class="l"></span>
                <span class="c">OR</span>
                <span class="r"></span>
            </div>
            <div class="register-here" @click="handleRegisterPage">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.des:''}}<span class="register-btn">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.register:''}}</span></div>
        </div>
        <message ref="message"/>
    </div>
</template>


<script>
    import {langCon} from "../assets/data/langCon";
    import {mapState, mapMutations} from 'vuex'
    import {userLogin} from "../service/api";
    import {setLocalStore} from "../storage";
    export default {
        data(){
            return{
                langCon:{},
                isEmail:true,
                account:'',
                password:'',
            }
        },
        computed:{
            ...mapState(['lang','isLogin','loginType']),
        },
        created:function(){
            this.langCon = langCon
        },
        mounted:function(){
            let that = this;
            document.onkeydown = function (e) {
                let key = window.event.keyCode;
                if (key === 13){
                    that.handleLogin()
                }
            }

            $("#demo").intlTelInput({
                preferredCountries: ['sg','cn','us'],
            });
            $('.intl-tel-input').css({
                'display':'none'
            })
        },
        methods:{
            ...mapMutations(['ISLOGIN','LOGINTYPE','USERINFO']),
            handleClose(){
                this.LOGINTYPE('')
            },
            handleRegisterPage(){
                this.LOGINTYPE('registerPage')
            },
            handleToForget(){
                this.LOGINTYPE('')
                this.$router.push({path:'/forgetPassword'})
            },
            handleQh(){
                this.isEmail=!this.isEmail
                if(this.isEmail){
                    $('.intl-tel-input').css({
                        'display':'none'
                    })
                }else{
                    $('.intl-tel-input').css({
                        'display':'block'
                    })
                }
            },
            handleLogin(){
                let code = $("#demo").intlTelInput("getSelectedCountryData")
                let CountryCode = `+${code.dialCode}-`
                if(!!this.account&&!!this.password){
                    userLogin(this.isEmail?this.account:CountryCode+this.account,this.password,this.lang.lang).then(res=>{
                        console.log('登录',res)
                        if(res.code==0){
                            setLocalStore('token',res.data.token)
                            this.LOGINTYPE('')
                            this.ISLOGIN(true)
                            this.USERINFO(res.data)
                        }else{

                            this.$refs.message.Message(res.message);
                        }
                    })
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .login-page{
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
        .form{
            position: relative;
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
            }
            width: 430px;
            height: 650px;
            border: 1px solid rgb(53, 141, 254);
            box-sizing: border-box;
            padding:50px 30px;
            background: rgba(0,0,0,.9);
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
            .qh{
                color: #358dfe;
                font-size: 14px;
                cursor: pointer;
                position: absolute;
                right: 30px;
                margin-top: -15px;
                /*border: 1px solid red;*/
                padding: 8px 0;
                z-index: 9999;
            }
            .forget{
                font-size: 16px;
                color: #fff;
                text-align: right;
                cursor: pointer;
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
</style>