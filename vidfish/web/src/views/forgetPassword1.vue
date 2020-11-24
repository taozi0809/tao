/<template>
    <div class="accountSet">
        <Head/>
        <div class="top"></div>
        <section class="main">
            <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.changePassword:''}}</div>

            <div class="account-settings">
                <div class="form">
                    <div class="item">
                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.email:''}}</p>
                        <div class="r">
                            <input type="text" v-model="userInfo.email">

                            <div class="authCodeBtn" v-if="isAuthCode" @click="handleSendAuthCode">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.authCodeBtn:''}}</div>
                            <div class="authCodeBtn" v-if="!isAuthCode">{{timeNum}}s</div>

                        </div>
                    </div>

                    <div class="item">
                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.authCode:''}}</p>
                        <div class="r">
                            <input type="text" v-model="authCode">
                        </div>
                    </div>

                    <div class="item">
                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.passwordR1:''}}</p>
                        <div class="r">
                            <input type="text" v-model="password">
                        </div>
                    </div>

                    <div class="item">
                        <p>{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.passwordR2:''}}</p>
                        <div class="r">
                            <input type="text" v-model="rePassword">
                        </div>
                    </div>
                    <div class="row">
                        <div class="save" @click="handleSave">{{lang.hasOwnProperty('lang')?langCon[lang.lang].login.save:''}}</div>
                    </div>

                </div>
            </div>
        </section>

        <message ref="message"/>
    </div>
</template>

<script>
    import Head from '../components/Head'
    import {mapState, mapMutations} from 'vuex'
    import {getSessionStore,getLocalStore} from "../storage";
    import {langCon} from "../assets/data/langCon";
    import {emailSendCheckCode,userChangePassword} from "../service/api";

    export default {
        components:{Head},
        data(){
            return{
                authCode:'',
                password:'',
                rePassword:'',
                isAuthCode:true,
                timeNum:60,
                TIMECONTENT:60,
            }
        },
        computed:{
            ...mapState(['lang','isLogin','userInfo']),
        },
        created:function(){
            this.token = getLocalStore('token')
            this.langCon = langCon
        },
        methods:{
            handleSendAuthCode(){
                emailSendCheckCode(null,this.userInfo.email,this.lang.lang).then(res=>{
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
                                this.$refs.message.Message(`我们已发送验证码到${this.userInfo.email}，请查看邮箱。`);
                                break;
                            case 'EN':
                                this.$refs.message.Message(`We have sent the verification code to ${this.userInfo.email}, please check your mailbox.`);
                                break;
                            case 'IND':
                                this.$refs.message.Message(`Kami telah mengirimkan kode verifikasi ke ${this.userInfo.email}, silakan periksa kotak surat Anda`);
                                break;
                        }
                        this.emailType=1
                    }else{
                        this.$refs.message.Message(res.message);
                    }
                })
            },
            handleSave(){
                if(this.userInfo.email==''){this.$refs.message.Message('请输入邮箱');return}
                if(this.authCode==''){this.$refs.message.Message('请输入验证码');return}
                if(this.password==''){this.$refs.message.Message('请输入旧密码');return}
                if(this.rePassword==''){this.$refs.message.Message('请输入新密码');return}

                userChangePassword(this.userInfo.email,this.authCode,this.password,this.rePassword).then(res=>{
                    console.log('修改密码：',res)
                    if (res.code==0){
                        this.$refs.message.Message('修改成功');
                        this.$router.push('/')
                    } else{
                        this.$refs.message.Message(res.message);
                    }
                })
            },
        },
        watch:{
            isLogin(newValue,oldValue){
                if(newValue!=oldValue){
                    if(!newValue){
                        this.$router.push('/')
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .accountSet{
        .top{
            width: 100%;
            height: 750px;
            /*background: url("../assets/img/bg-banner-home.png") no-repeat;*/
            background: url("../assets/img/bg.png") no-repeat;
            overflow: hidden;
        }
        .main{
            position: absolute;
            top:150px;
            min-width: 1200px;
            width: 100%;
            box-sizing: border-box;
            padding: 0 60px;
            .title{
                font-size: 32px;
                font-weight: bold;
                color: #f7f7f7;
                margin-bottom: 30px;
            }
            .account-settings{
                background: #000;
                width: 100%;
                height: 600px;
                /*border: 1px solid red;*/
                .form{
                    width:100%;
                    padding-top: 60px;
                    box-sizing: border-box;
                    .item{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 30px;

                        p{
                            color: #fff;
                            /*color: #999;*/
                            /*font-weight: bold;*/
                            font-size: 18px;
                            width: 210px;
                            text-align: right;
                        }
                        .r{
                            display: flex;
                            align-items: center;
                            border-bottom: 1px solid #fff;
                            margin-left: 30px;
                            padding: 6px;
                            position: relative;
                            width: 450px;
                            input{
                                width: 350px;
                                color: #fff;
                                /*color: #555;*/
                                background: none;
                                border: none;
                                font-size: 18px;
                            }
                            input:focus {
                                outline: none;
                            }

                            .change{
                                cursor: pointer;
                                font-size: 16px;
                                color: #358dfe;
                                position: absolute;
                                right: 0;
                            }

                            .qh{
                                position: absolute;
                                width: 30px;
                                display: block;
                                right: 0;
                                cursor: pointer;
                                img{
                                    width: 100%;
                                }
                            }
                            .authCodeBtn{
                                width: 120px;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                position: absolute;
                                right: 0;
                            }
                        }
                    }
                    .row{
                        width: 100%;
                        text-align: center;
                        .save{
                            display: inline-block;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            background: #358dfe;
                            color: #fff;
                            border-radius: 30px;
                            margin: 0 auto;
                            margin-top: 50px;
                            cursor: pointer;
                            padding: 4px 30px;
                        }
                    }

                    .change-password{
                        position: relative;
                        left: -40px;
                    }

                }
            }
        }
    }
</style>

