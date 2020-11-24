<template>
    <div class="change-password">
        <div class="con-bg">
            <div class="con-c">
                <div class="password">
                    <div class="title">修改密码</div>
                    <div class="item">
                        <div class="label">账号</div>
                        <div class="input"><el-input v-model.number="Account" placeholder="请输入"></el-input></div>
                    </div>
                    <div class="item">
                        <div class="label">新密码</div>
                        <div class="input"><el-input v-model="Password" placeholder="请输入8-15位" type="password"></el-input></div>
                    </div>
                    <div class="item itme2">
                        <div class="label">验证码</div>
                        <div class="input">
                            <div class="v">
                                <el-input v-model="Code" placeholder="请输入"></el-input>
                            </div>
                            <div class="btn">
                                <el-button type="primary" @click="getSmsCode" style="width:80%;" v-if="show">获取验证码</el-button>
                                <el-button type="primary" style="width:80%;" v-if="!show">{{count}} s</el-button>
                            </div>
                        </div>
                    </div>
                    <el-button type="primary" @click="changePassword" class="save1">修改</el-button>
                    <el-button type="primary" @click="changePassword2" class="save2">取消修改</el-button>
                </div>
            </div>
            <a href="http://www.jjedy.cn/" class="back-btn"></a>
        </div>


    </div>
</template>

<script>
    import {getSmsCode,changePassword} from "../../service/api/api";
    import { Message } from 'element-ui';
    import {getLocalStore} from "../../storage";

    export default {
        data(){
            return{
                Account:getLocalStore('jingjiddz_account')!=null?getLocalStore('jingjiddz_account'):null,
                Password:'',
                Code:'',

                show: true,
                count: '',
                timer: null,
            }
        },
        methods:{
            changePassword2(){
                this.$router.push({path: '/login'});
            },
            getCode(){
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            getSmsCode(){
                var reg =/^[1][3,4,5,7,8,9][0-9]{9}$/;
                if(!!reg.test(this.Account)){
                    this.getCode()
                    getSmsCode(parseInt(this.Account)).then(res=>{
                        console.log("获取验证码",res)
                        if(res.code==0){
                            Message.success("已发送")
                        }
                    })
                }else{
                    Message.error("手机号格式错误")
                }

            },
            changePassword(){
                if(this.Password.length>=8&&this.Password.length<=16){
                    var reg =/^[1][3,4,5,7,8,9][0-9]{9}$/;
                    if(!!reg.test(this.Account) && !!this.Password && !!this.Code){
                        changePassword(parseInt(this.Account),this.Password,this.Code).then(res=>{
                            console.log("修改密码",res)
                            if(res.code==0){
                                Message.success("修改成功")
                                this.$router.push({ path:'/login'})
                            }
                        })
                    }
                }else{
                    Message.error("密码最少8位，不能超过16位")
                }

            },
        }
    }
</script>

<style lang="scss" scoped>
    .change-password{
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
            box-sizing: border-box;
            position: relative;
            .con-c{
                width: 1022px;
                height: 534px;
                background: #fff;
                position: absolute;
                top: 210px;
                left: 120px;
                border-radius:4px;
                display: flex;
                justify-content: center;
                align-items: center;
                .password{
                    width:500px;
                    height:420px;
                    box-sizing: border-box;
                    /*border: 1px solid red;*/
                    .title{
                        text-align: center;
                        color: #1C78CD;
                        font-size: 18px;
                        width: 100%;
                        height: 60px;
                        line-height: 60px;
                        margin-bottom:30px;
                    }
                    .item{
                        width: 100%;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        .label{
                            color: #99ABB4;
                            font-size: 14px;
                            height: 40px;
                            line-height: 40px;
                            width: 60px;
                            flex-shrink: 0;
                        }
                        .input{
                            width: 400px;
                        }
                    }
                    .itme2{
                        .input{
                            display: flex;
                            align-content: center;
                            .v{
                                width: 100%;
                            }
                            .btn{
                                width: 200px;
                                text-align: right;
                                overflow: hidden;
                                /*border: 1px solid red;*/
                            }
                        }

                    }
                    .save1{
                        text-align: center;
                        width: 400px;
                        margin-left: 60px;
                        margin-bottom: 20px;
                        margin-top: 20px;
                    }
                    .save2{
                        text-align: center;
                        width: 400px;
                        margin-left: 60px;
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

    }
</style>
