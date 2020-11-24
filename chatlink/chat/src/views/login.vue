<template>
    <div class="login">
        <section class="content">
            <div class="c-l">
                <span><img src="../assets/images/login/logo.png" alt=""></span>
            </div>
            <div class="form">
                <p class="form-title">账号登录</p>
                <div class="input">
                    <input type="number" v-model="phone_number" oninput="if(value.length>11)value=value.slice(0,11)" placeholder="请输入手机号码">
                </div>
                <div class="password">
                    <input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="handleLogin">
                </div>
                <div class="forget" @click="is_forget_page=true">忘记密码?</div>
                <div class="login-btn" @keyup.enter="handleLogin" @click="handleLogin">登录</div>
            </div>
        </section>
        <section class="forget-page" v-if="is_forget_page" @click="handleForget">
            <div class="forget-page-content">
                <p class="ref">请使用手机客户端重置密码</p>
                <span><img src="../assets/images/login/qr_code.png" alt="" class="ref"></span>
            </div>
        </section>
        <message ref="message"/>
    </div>
</template>

<script>

    import {mapState, mapMutations} from 'vuex'
    import {isPhoneAvailable} from "../util/tools/isPhoneAvailable";
    import {loginPassword} from "../service/api";

    export default {
        data(){
            return{
                is_forget_page:false,
                phone_number:'',
                password:'',
            }
        },
        computed:{
            ...mapState(['token','userInfo','account']),
        },
        created:function(){
            this.phone_number=this.account
        },
        methods:{
            ...mapMutations(['TOKEN','USERINFO','ACCOUNT','NAV','STATUS','ISUSERINFOMENU','CHATSTATUS','CHATINFOINDEX',
                'ISCHATINFODES'
            ]),
            handleForget(e){
                if(e.target.className=='ref'||e.target.className=='forget-page-content'){
                    return
                }else{
                    this.is_forget_page = false
                }
            },
            handleLogin() {
                if (this.phone_number.length < 11 || !isPhoneAvailable(this.phone_number) || this.phone_number == '') {
                    this.$refs.message.Message('手机号格式错误');
                    return
                }
                if (this.password.length < 6 || this.password == '') {
                    this.$refs.message.Message('密码错误');
                    return
                }
                loginPassword(this.phone_number, this.password).then(res => {
                    console.log('登录',res)
                    if (res.code == 0) {
                        this.TOKEN(res.data.token)
                        this.USERINFO(res.data)
                        this.ACCOUNT(this.phone_number)
                        this.NAV('0')
                        this.STATUS('0')
                        this.CHATINFOINDEX('-1')
                        this.CHATSTATUS('0')
                        this.ISUSERINFOMENU(false)
                        this.ISCHATINFODES(false)
                        // this.$router.push('/home')
                        window.location.reload();
                    } else {
                        this.$refs.message.Message(res.message);
                    }
                })


            }
        },

    }
</script>

<style lang="scss" scoped>
    @import "../assets/css/mixin";
    .login{
        width: 62.5vw;
        height: 39vw;
        min-width: 1000px;
        min-height: 625px;
        overflow: hidden;
        background: url("../assets/images/login/bg.png") no-repeat center center;
        background-size: 100% 100%;
        @include center;
        box-sizing: border-box;
        .content{
            @include center;
            z-index: 1;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            align-items: center;
            background: #fff;
            width: 36vw;
            height: 19.5vw;
            min-width: 576px;
            min-height: 312px;
            .c-l{
                width: 15vw;
                height: 19.5vw;
                min-width: 242px;
                min-height: 312px;
                background: #E6F1FF;
                display: flex;
                align-items: center;
                justify-content: center;
                span{
                    display: block;
                    width: 85px;
                    img{
                        width: 100%;
                    }
                }
            }
            .form{
                width:21vw;
                height: 19.5vw;
                min-width:334px;
                min-height: 312px;
                background: #fff;
                box-sizing: border-box;
                position: relative;
                border-radius: 5px;
                overflow: hidden;
                z-index: 1;
                display:flex;
                /*align-items:center;*/
                justify-content: center;
                flex-direction: column;
                padding:0 40px;
                .form-title{
                    font-size: 16px;
                    color: #333;
                    box-sizing: border-box;
                    height:30px;
                }
                .input,.password{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    box-sizing: border-box;
                    margin-bottom: 15px;
                    border: 1px solid #E4E4E4;
                    input{
                        width: 100%;
                        height: 100%;
                        font-size: 14px;
                        padding-left: 10px;
                    }
                }
                .forget{
                    cursor: pointer;
                    color: #43B1FF;
                    font-size: 12px;
                    padding-left:6px;
                }
                .login-btn{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    background:#003680;
                    color: #fff;
                    text-align: center;
                    font-size: 16px;
                    cursor: pointer;
                    margin-top: 50px;
                    letter-spacing: 5px;

                }
            }
            .qr-code{
                box-sizing: border-box;
                width: 10vw;
                text-align: center;
                p{
                    color: #333333;
                    font-size:14px;
                    box-sizing: border-box;
                    padding-bottom: 1vw;
                }
                span{
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    width: 8vw;
                    height: 8vw;
                    img{
                        width: 100%;
                    }
                }
            }
        }

        .forget-page{
            width: 1000px;
            height: 625px;
            background: rgba(0,0,0,.7);
            @include flex;
            overflow: hidden;
            z-index: 10;
            position: relative;
            .forget-page-content{
                width: 400px;
                height: 300px;
                overflow: hidden;
                background: #fff;
                text-align: center;
                border-radius: 2px;
                border-color: rgba(0,0,0,.05);
                box-shadow: 4px 4px 40px rgba(0,0,0,.05);
                box-sizing: border-box;
                p{
                    font-size: 16px;
                    box-sizing: border-box;
                    color: #333;
                    height: 60px;
                    line-height: 60px;
                }
                span{
                    @include flex;
                    overflow: hidden;
                    width: 200px;
                    height: 200px;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }

</style>