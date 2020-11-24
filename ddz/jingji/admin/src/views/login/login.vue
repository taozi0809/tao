<template>
    <div class="login">
        <div class="con-bg">
            <div class="login-l">
                <div class="l-t"><img src="../../assets/images/login/l-t.png" alt=""></div>
                <div class="d1">如果您加入我们成为赛事合作伙伴，您可以获得：</div>
                <div class="d2"><span>01</span>  平台业务介绍、推广资料，业务模式现场培训</div>
                <div class="d2"><span>02</span>  招募选手运营服务支持</div>
                <div class="d2"><span>03</span>  办比赛运营服务支持</div>
                <div class="d2"><span>04</span>  人力资源工具、运营营销工具、财务工具、大数据等技术支持</div>
                <a href="https://h5.ebdan.net/ls/u4mk7sDR?from=singlemessage" class="d3">申请加盟</a>
            </div>
            <el-form :model="loginForm" :rules="loginRules" prop="loginForm" class="login-box">
                <div class="title">用户登录</div>

                <el-form-item label="用户名" class="item" prop="account">
                    <el-input v-model="loginForm.account" placeholder="请输入账号" type="text" class="account"></el-input>
                </el-form-item>

                <el-form-item label="密码" class="item" prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" class="password" @keyup.enter="loginClick"></el-input>
                    <div class="c-p">
                        <el-button type="text" @click="$router.push({ path:'/revisePassword'})">忘记密码</el-button>
                    </div>
                </el-form-item>


                <div class="item item-btn-box">
                    <el-button type="primary" class="item-button" @click="loginClick" :loading="loading">登录</el-button>
                </div>

                <div class="item check-box" @click="check=!check">
                    <div class="check" v-if="!check"><img src="../../assets/images/login/check.png" alt=""></div>
                    <div class="check" v-if="check"><img src="../../assets/images/login/check_active.png" alt=""></div>
                    <div class="t">记住密码</div>
                </div>


            </el-form>
            <a href="http://www.jjedy.cn/" class="back-btn"></a>
        </div>

<!--        <div class="footer">-->
<!--            <div class="f-con">-->
<!--                <div class="d1">网络文化经营许可证：粤网文[2016]5694-1371号</div>-->
<!--                <div class="d1">粤ICP备16033307号-5</div>-->
<!--                <div class="d1">《隐私政策》 | 《用户协议》</div>-->
<!--                <div class="d1">万康兴体育文化发展（海南）有限公司</div>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>
<script>

    import {mapState, mapMutations} from 'vuex'
    import { Message,Loading } from 'element-ui';
    import {setLocalStore,getLocalStore,removeLocalStore} from "../../storage";
    import {aesEn,aesDe} from "../../util/tools/encryptToDecrypt";
    import {login} from "../../service/api/api";
    import {PAGES} from "../../vuex/type";

    export default {
        data(){
            let validateAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入账号'));
                }
            }
            let validatePassword = (rule, value, callback)=>{
                if (!value) {
                    return callback(new Error('请输入密码'));
                }
            }
            return{
                loginForm:{
                    account:getLocalStore('jingjiddz_account')!=null?getLocalStore('jingjiddz_account'):'',
                    password:getLocalStore('jingjiddz_password')!=null?aesDe(getLocalStore('jingjiddz_password')):'',
                },
                loginRules: {
                    account:[
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    password:[
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                },
                check:getLocalStore('jingjiddz_password')!=null?true:false,
                loading:false,

            }
        },
        methods:{
            ...mapMutations(['TOKEN','AGENTTYPE','AGENTTYPES','PAGES']),
            loginClick(){
                this.loading=true
                if(!!this.loginForm.account&&!!this.loginForm.password){
                    let timer = setTimeout(()=>{
                        this.loading=false
                        Message.error('登录超时')
                    },5000)
                    setLocalStore('jingjiddz_account',this.loginForm.account)
                    login(this.loginForm.account,this.loginForm.password).then(res=>{
                        console.log('登录:',res)
                        this.loading=false
                        clearTimeout(timer)
                        if(res.code==0){
                            Message.success('登录成功')
                            if(this.check){setLocalStore('jingjiddz_password',aesEn(this.loginForm.password))} else{
                                removeLocalStore('jingjiddz_password')
                            }
                            this.TOKEN(res.token)
                            this.AGENTTYPE(res.agentType)
                            this.AGENTTYPES(res.agentTypes)
                            this.PAGES(res['pages'])
                            this.$router.push({ path:'/home'})
                        }else{
                            Message.error(res.desc)
                        }
                    })
                }else{
                    this.loading=false
                    Message.error("账号或密码错误")
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #164d89;
        background-image: url("../../assets/images/login/login_bg.png");
        background-size: 100% 100%;

        .con-bg{
            background-image:url("../../assets/images/login/con_bg.png") ;
            background-size: 100% 100%;
            width: 1150px;
            height: 750px;
            /*border: 1px solid red;*/
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding-left: 120px;
            padding-right: 100px;
            position: relative;
            .login-l{
                width: 520px;
                box-sizing: border-box;
                height: 400px;
                /*border: 1px solid red;*/
                margin-top: 250px;
                .l-t{
                    width: 229px;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                .d1{
                    color: #B7DDFF;
                    font-size: 14px;
                    margin-top: 30px;
                }
                .d2{
                    color: #fff;
                    font-size: 14px;
                    margin-top: 20px;
                    display: flex;
                    align-items: center;
                    span{
                        font-size: 24px;
                        color: #8CCAFF;
                        font-family:Alibaba PuHuiTi;
                        padding-right: 10px;
                    }
                }
                .d3{
                    width:200px;
                    height:40px;
                    background:rgba(8,62,120,1);
                    border-radius:4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    color: #fff;
                    margin: 0 auto;
                    margin-top: 50px;
                }
            }
            .login-box{
                width:360px;
                height:380px;
                position: relative;
                box-sizing: border-box;
                overflow: hidden;
                padding: 20px;
                background: #fff;
                box-shadow:3px 3px 21px 0px rgba(92,120,202,0.24);
                border-radius: 2px;
                margin-top: 250px;
                flex-shrink: 0;
                .title{
                    font-size: 18px;
                    color:#1C78CD;
                    font-weight: 600;
                    height:36px;
                }
                .item{
                    width: 100%;
                    position: relative;
                    .account,.password{
                        width: 100%;
                        height: 40px;
                        overflow:hidden;
                        border-radius: 2px;
                        padding: 0 10px;
                        color: #5D858D;
                        font-size: 14px;
                        box-sizing: border-box;
                        border: 1px solid #2D3C41;
                    }
                    .c-p{
                        position: absolute;
                        right: 0;
                        top:70px;
                    }
                }
                .item-btn-box{
                    margin-bottom: 15px;
                    margin-top: 20px;
                }
                .check-box{
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 20px;
                    cursor: pointer;
                    .check{
                        width: 16px;
                        height: 16px;
                        margin-right:8px;
                        img{
                            width: 100%;
                        }
                    }
                    .t{
                        color: #4C4C4C;
                        font-size: 14px;
                        height: 20px;
                        line-height: 20px;
                    }
                }
            }
            .back-btn{
                position: absolute;
                /*border: 1px solid red;*/
                width: 600px;
                height: 240px;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }



        .item-button{
            width: 100%;
            height: 40px;
            font-size: 14px;
            color: #fff;
            font-weight: 600;
            margin-top:30px;
        }
        input::-webkit-input-placeholder{
            color: #99AFC2;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color: #99AFC2;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color: #99AFC2;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color: #99AFC2;
        }
        .footer{
            width: 100%;
            height: 160px;
            position: fixed;
            bottom: 0;
            background:rgba(15,15,15,0.13);
            display: flex;
            align-items: center;
            .f-con{
                width: 1200px;
                margin: 0 auto;
                text-align: center;
                .d1{
                    font-size: 14px;
                    color: #fff;
                    line-height: 24px;
                }
            }
        }
    }
</style>
<style lang="scss">
    .login{
        .el-form-item{
            margin-bottom:8px;
            position: relative;
            .el-form-item__label{
                padding: 0;
                line-height:30px;
            }
        }
        .account,.password{
            .el-input__inner{
                padding: 0;
                border: none;
            }

        }
        .el-form-item__error{
            top:inherit;
            padding: 0;
            bottom: -3px;
        }
    }
</style>
