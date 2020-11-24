<template>
    <div class="login">
        <div class="img-box"><img src="../../assets/images/login/login_bg.png" alt=""></div>
        <div class="login-box">
            <div class="title">登录</div>
            <div class="item">
                <div class="label">用户名</div>
                <input placeholder="请输入账号" type="text" v-model="account" class="account">
            </div>
            <div class="item">
                <div class="label">密码</div>
                <input placeholder="请输入密码" type="password" v-model="password" class="password" @keyup.enter="loginClick">
            </div>
            <div class="item item-btn-box">
                <el-button type="primary" class="item-button" @click="loginClick">登录</el-button>
            </div>
            <div class="item check-box" @click="check=!check">
                <div class="check" v-if="!check"><img src="../../assets/images/login/check.png" alt=""></div>
                <div class="check" v-if="check"><img src="../../assets/images/login/check_active.png" alt=""></div>
                <div class="t">记住密码</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Message,Loading } from 'element-ui';
    import {setLocalStore,getLocalStore} from "../../storage";
    import {managerLogin} from "../../service/api";
    import {mapState, mapMutations} from 'vuex'

    export default {
        data(){
            return{
                account:!!getLocalStore('esportslink_account')?getLocalStore('esportslink_account'):'',
                password:'',
                check:false,
            }
        },
        computed:{
            ...mapState(['token']),
        },
        methods:{
            ...mapMutations(['TOKEN']),
            loginClick(){
                this.TOKEN('123')
                // managerLogin(this.account,this.password).then(res=>{
                //     console.log('登录',res)
                // })
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
        background: #e0e8ff;
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
                height:44px;
            }
            .item{
                width: 100%;
                margin-bottom: 10px;
                .label{
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #4C4C4C;
                }
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