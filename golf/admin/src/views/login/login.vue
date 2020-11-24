<template>
    <div class="login">
        <div class="img-box"><img src="../../assets/images/login/login_bg.png" alt=""></div>
        <el-form :model="loginForm" :rules="loginRules" prop="loginForm" class="login-box">
            <div class="title">登录</div>

            <el-form-item label="用户名" class="item" prop="account">
                <el-input v-model="loginForm.account" placeholder="请输入账号" type="text" class="account"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="item" prop="password">
                <el-input v-model="loginForm.password" placeholder="请输入密码" type="password" class="password" @keyup.enter.native="loginClick"></el-input>
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
    </div>
</template>
<script>

    import {mapState, mapMutations} from 'vuex'
    import { Message} from 'element-ui';
    import {setLocalStore,getLocalStore,removeLocalStore} from "../../storage";
    import {aesEn,aesDe} from "../../util/encryptToDecrypt";
    import {login} from "@/service/config";

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
            let validateAccountCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入手机号'));
                }
            }
            let validatePasswordCode = (rule, value, callback)=>{
                if (!value) {
                    return callback(new Error('请输入验证码'));
                }
            }
            return{
                loginForm:{
                    account:getLocalStore('golf_account')!=null?getLocalStore('golf_account'):'',
                    password:getLocalStore('golf_password')!=null?aesDe(getLocalStore('golf_password')):'',
                },
                loginRules: {
                    account:[
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    password:[
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                },
                check:getLocalStore('golf_password')!=null?true:false,
                loading:false,

                loginFormCode:{
                    account:'',
                    code:'',
                },
                loginRulesCode: {
                    account:[
                        { validator: validateAccountCode, trigger: 'blur' }
                    ],
                    code:[
                        { validator: validatePasswordCode, trigger: 'blur' }
                    ],
                },
            }
        },
        methods:{
            ...mapMutations(['TOKEN','POWER']),
            loginClick(){
                this.loading=true
                setTimeout(()=>{
                    this.loading=false
                },5000)
              setLocalStore('golf_account',this.loginForm.account)
              login(this.loginForm.account,this.loginForm.password).then(res=>{
                console.log("登录",res)
                if(res.code==0){
                  Message.success("登录成功")
                  this.TOKEN(res.data.token)
                  if(this.check){setLocalStore('golf_password',aesEn(this.loginForm.password))} else{
                    removeLocalStore('golf_password')
                  }
                  this.$router.push({path:"/home"})
                }else{
                  Message.error(res.message)
                }

              })
            },
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
        background: #e0e8ff;
        min-width: 1200px;
        .img-box{
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 0;
            img{
                width: 100%;
            }
        }
        .login-box{
            width:360px;
            height: 350px;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
            padding: 20px;
            background: #fff;
            box-shadow:3px 3px 21px 0px rgba(92,120,202,0.24);
            border-radius: 2px;
            top: -80px;
            .title{
                font-size: 18px;
                color: #333;
                font-weight: 600;
                height:36px;
            }
            .item{
                width: 100%;
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

            }
            .code{
                position: relative;
                .code-txt{
                    width: 200px;
                }
                .code-btn{
                    position: absolute;
                    right: 0;
                    top: calc(50% + 8px);
                    transform: translateY(-50%);
                    width: 112px;
                    .el-button{
                        width: 112px;
                    }
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
        .item-button{
            width: 100%;
            height: 40px;
            font-size: 14px;
            color: #fff;
            font-weight: 600;
        }
        input::-webkit-input-placeholder{
            color: #5D858D;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color: #5D858D;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color: #5D858D;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
            color: #5D858D;
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
