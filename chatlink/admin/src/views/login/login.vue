<template>
    <div class="login">
        <div class="login-box">
            <div class="title">管理员登录</div>
            <div class="item">
                <input placeholder="请输入账号" type="text" v-model="account" class="account">
            </div>
            <div class="item">
                <input placeholder="请输入密码" type="password" v-model="password" class="password" @keyup.enter="loginClick">
            </div>
            <div class="item">
                <el-button type="primary" class="item-button" @click="loginClick">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { Message,Loading } from 'element-ui';
    import {setLocalStore,getLocalStore} from "../../storage";
    import {managerLogin} from "../../service/api";

    export default {
        data(){
            return{
                account:!!getLocalStore('account')?getLocalStore('account'):'',
                password:'',
            }
        },
        methods:{
            loginClick(){
                managerLogin(this.account,this.password).then(res=>{
                    console.log('登录',res)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login{
        position: fixed;
        z-index: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        background: #2d3a4b;
        display: flex;
        align-items: center;
        justify-content: center;

        .login-box{
            width: 500px;
            height: 350px;
            position: relative;
            top: -100px;
            .title{
                height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-weight: bold;
                font-size: 20px;
            }
            .item{
                width: 460px;
                margin: 0 auto;
                margin-bottom: 20px;
                .account,.password{
                    width: 460px;
                    height: 50px;
                    overflow:hidden;
                    border: none;
                    border-radius: 5px;
                    padding: 0 10px;
                    color: #000;
                    font-size: 16px;
                    font-family: 微软雅黑;
                    margin: 0;
                    box-sizing: border-box;
                }
            }
        }
        .item-button{
            width: 460px;
            height: 50px;
            font-size: 16px;
        }
    }
</style>