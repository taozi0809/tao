<template>
    <div class="login">
        <div class="login-box">
            <div class="title">管理员登录</div>
            <div class="lable">
                <input type="text" v-model="userName" placeholder="账号">
            </div>
            <div class="lable">
                <input type="password" v-model="password" placeholder="密码" @keyup.enter="handleLogin">
            </div>
            <div class="login-btn" @click="handleLogin">登录</div>
        </div>

    </div>
</template>

<script>
    import {login} from "../../service/api";
    import { Message } from 'element-ui';
    import {setLocalStore,setSessionStore,getLocalStore} from "../../storage";
    export default {
        data(){
            return{
                userName:getLocalStore('userName')!=null?getLocalStore('userName'):'',
                password:'',
            }
        },
        methods:{
            handleLogin(){
                if(this.userName!=''&&this.password!=''){
                    login(this.userName,this.password).then(res=>{
                       console.log(res)
                       if(res.code==='0'){
                            setLocalStore('userName',res.data.userName)
                            setSessionStore('isLogin',true)
                            this.$router.push('/index')
                       }else{
                           Message({
                               message:res.message,
                               type: 'error',
                           duration:'1500',
                           })
                       }
                    })
                }
            },
        },
    }
</script>

<style lang="scss" scoped>
    .login{
        width: 100%;
        min-width: 1200px;
        height: 100%;
        background: #2d3a4b;
        display: flex;
        align-items: center;
        justify-content: center;
        .login-box{
            box-sizing: border-box;
            /*border: 1px solid red;*/
            min-width: 500px;
            width: 0.052 * 500vw;
            height: 350px;
            padding: 15px;
            position: relative;
            top:-10%;
            .title{
                font-size: 26px;
                color: #eee;
                font-weight: 700;
                text-align: center;
            }
            .lable{
                width: 100%;
                height: 100px;
                box-sizing: border-box;
                border-radius: 5px;
                display: flex;
                align-items: center;

                input{
                    background: none;
                    box-sizing: border-box;
                    border: 1px solid red;
                    width: 100%;
                    height: 50px;
                    padding: 0 10px;
                    font-size: 14px;
                    color:#eee;
                    border: 1px solid rgba(255,255,255,.1);
                }
                input::-webkit-input-placeholder{
                    color: #eee;
                }
            }
            .login-btn{
                cursor: pointer;
                height: 50px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #409eff;
                position: absolute;
                bottom:30px;
                left:10px;
                right: 10px;
                border-radius: 5px;
                font-size: 16px;
                color: #fff;
            }
        }


    }
</style>