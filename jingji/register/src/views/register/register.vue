<template>
    <div class="register">
        <div class="logo"><img src="../../assets/img/register/logo.png" alt=""></div>
        <div class="share-code">
            <div class="t">邀请码：</div>
            <div class="v">{{ShareCode}}</div>
        </div>
        <div class="con">
            <div class="c-s">
                <div class="s1" :class="activeName=='register'?'active':''" @click="handleClick1('register')">注册</div>
                <div class="s1-2">|</div>
                <div class="s2" :class="activeName=='login'?'active':''" @click="handleClick1('login')">登录</div>
            </div>
            <div class="item">
                <div class="icon1"><img src="../../assets/img/register/icon-iphone.png" alt=""></div>
                <div class="input-box">
                    <input type="text" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入手机号" v-model="Account">
                </div>
            </div>
            <div class="item">
                <div class="icon2"><img src="../../assets/img/register/icon-password.png" alt=""></div>
                <div class="input-box">
                    <input type="password" placeholder="请输入密码" v-model="Password">
                </div>
            </div>

            <div class="item-box" v-if="activeName=='register'">
                <div class="item2">
                    <div class="icon3"><img src="../../assets/img/register/icon-check.png" alt=""></div>
                    <div class="input-box">
                        <input type="text" placeholder="请输入验证码" v-model="Code">
                    </div>
                </div>
                <div class="get-code" @click="getCodeClick(2)" v-if="CodeNum==1">获取验证码</div>
                <div class="get-code" v-if="CodeNum==2">{{countDownNum}}s</div>
            </div>
<!--            <div class="item-box" v-if="activeName=='login'"></div>-->
            <div class="item btn" @click="handleClick2('register')" v-if="activeName=='register'">立即注册</div>
            <div class="item btn" @click="handleClick2('login')" v-if="activeName=='login'">立即登录</div>



        </div>
        <div class="bot">赛事奖金由国家体育总局棋牌运动管理中心下发</div>

    </div>
</template>

<script>
    import {register,getCode,loginverify} from "../../service/api/api";
    import qs from 'qs'

    export default {
        data(){
            return{
                activeName:"register",
                Account:"",
                Code:"",
                Password:"",
                ShareCode:"",

                countDownNum:60,
                timer:null,
                CodeNum:1,
            }
        },
        created() {
           this.ShareCode = this.$route.query.shareCode
        },
        methods:{
            countDown(){
                this.timer=setInterval(() => {
                    this.countDownNum--;
                    if(this.countDownNum<=0){
                        this.CodeNum=1
                        this.countDownNum=60
                        clearInterval(this.timer);
                    }
                },1000);
            },
            getCodeClick(num){
                if(num==2){
                    var data=new FormData();
                    var value={
                        Account:this.Account,
                    }
                    data.append('data',JSON.stringify(value));
                    getCode(data).then(res=>{
                        console.log("获取验证码",res)
                        if(res.errcode==0){
                            this.CodeNum=num
                            this.countDown()
                        }else{
                            this.$toast(res.errmsg);
                        }
                    })
                }
            },
            handleClick1(name){
                this.activeName=name
            },
            handleClick2(name){
                if(name=='register'){
                    var data=new FormData();
                    var value={
                        Account:this.Account,
                        Code:this.Code,
                        Password:this.Password,
                        ShareCode:this.ShareCode
                    }
                    data.append('data',JSON.stringify(value));

                    register(data).then(res=>{
                        console.log("注册",res)
                        if(res.errcode==0){
                            this.$toast("注册成功");
                            this.$router.push({path:'/download'})
                        }else{
                            this.$toast(res.errmsg);
                        }
                    })
                }
                if(name=='login'){
                    var data=new FormData();
                    var value={
                        Account:this.Account,
                        Password:this.Password,
                    }
                    data.append('data',JSON.stringify(value));
                    loginverify(data).then(res=>{
                        console.log("登录",res)
                        if(res.errcode==0){
                            this.$toast("登录成功");
                            this.$router.push({path:'/download'})
                        }else{
                            this.$toast(res.errmsg);
                        }
                    })
                }
            },

        }
    }
</script>

<style lang="scss" scoped>
    .register{
        width: 100%;
        height: 1509px;
        background-image: url("../../assets/img/register/bg.png");
        background-size:100% 100%;
        .logo{
            position: absolute;
            left:36px;
            top:38px;
            width:193px ;
            img{
                width: 100%;
            }
        }
        .share-code{
            position: absolute;
            right:30px;
            top:53px;
            display: flex;
            align-content: center;
           .t,.v{
               color: #fff;
               font-size: 30px;
               font-weight: bold;
           }

        }
        .con{
            width: 646px;
            height: 592px;
            background-image: url("../../assets/img/register/con-bg.png");
            background-size: 100% 100%;
            position: absolute;
            right:52px;
            top:832px;
            box-sizing: border-box;
            padding: 0 72px;
            .c-s{
                display: flex;
                align-content: center;
                width: 100%;
                margin: 0 auto;
                height: 110px;
                .s1,.s2{
                    height: 110px;
                    line-height: 110px;
                    width: 100%;
                    text-align: center;
                    font-size: 30px;
                    color: #9A9A9A;
                    cursor: pointer;
                }
                .s1-2{
                    height: 110px;
                    line-height: 110px;
                    color: #9A9A9A;
                }
                .active{
                    color: #FE7416;
                }
            }

            .item{
                width: 500px;
                height: 80px;
                background: #EFEFEF;
                border-radius: 10px;
                margin-bottom: 30px;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                padding: 20px 26px;
                .icon1{
                    width: 25px;
                    img{
                        width: 100%;
                    }
                }
                .icon2{
                    width: 26px;
                    img{
                        width: 100%;
                    }
                }
                .icon3{
                    width: 21px;
                    position: absolute;
                    img{
                        width: 100%;
                    }
                }
                .input-box{
                    input{
                        width:100%;
                        outline-style: none ;
                        border: 0;
                        font-size:26px;
                        color: #333;
                        background: none;
                        box-sizing: border-box;
                        padding: 0 20px;
                        height: 60px;
                        line-height: 60px;
                    }
                    input::-webkit-input-placeholder {
                        /* WebKit browsers */
                        color: #CACACA;
                    }
                    input:-moz-placeholder {
                        /* Mozilla Firefox 4 to 18 */
                        color:#CACACA;
                    }
                    input::-moz-placeholder {
                        /* Mozilla Firefox 19+ */
                        color: #CACACA;
                    }
                    input:-ms-input-placeholder {
                        /* Internet Explorer 10+ */
                        color: #CACACA;
                    }
                }

            }
            .item-box{
                width: 500px;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 40px;
                .item2{
                    width:280px;
                    height: 80px;
                    background: #EFEFEF;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    padding: 20px 26px;
                    overflow: hidden;
                    .icon3{
                        width: 21px;
                        flex-shrink: 0;
                        img{
                            width: 100%;
                        }
                    }
                    .input-box{
                        input{
                            width:100%;
                            outline-style: none ;
                            border: 0;
                            font-size:26px;
                            color: #333;
                            background: none;
                            box-sizing: border-box;
                            padding: 0 20px;
                            height: 60px;
                            line-height: 60px;
                        }
                        input::-webkit-input-placeholder {
                            /* WebKit browsers */
                            color: #CACACA;
                        }
                        input:-moz-placeholder {
                            /* Mozilla Firefox 4 to 18 */
                            color:#CACACA;
                        }
                        input::-moz-placeholder {
                            /* Mozilla Firefox 19+ */
                            color: #CACACA;
                        }
                        input:-ms-input-placeholder {
                            /* Internet Explorer 10+ */
                            color: #CACACA;
                        }
                    }

                }
                .get-code{
                    width: 200px;
                    height: 80px;
                    background: #FE7416;
                    border-radius: 10px;
                    font-size: 30px;
                    color: #fff;
                    line-height: 80px;
                    text-align: center;
                    overflow: hidden;
                }

            }
            .btn{
                background: #FE7416;
                font-size: 36px;
                color: #fff;
                justify-content: center;
            }
        }
        .bot{
            position: absolute;
            top: 1448px;
            text-align: center;
            width: 100%;
            color: #fff;
            font-size: 26px;
            font-weight: bold;
        }

    }
</style>

<style>
    .van-toast{
        font-size: 26px !important;
    }
    .van-toast--html, .van-toast--text{
        padding: 20px !important;
    }
</style>
