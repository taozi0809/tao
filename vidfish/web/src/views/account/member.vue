<template>
    <div class="accountSet">
        <Head/>
        <div class="top"></div>
        <section class="main">
            <div class="con">
                <div class="nav">
                    <div class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</div>
                    <ul>
                        <li @click="$router.push('/account')">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.yourAccount:''}}</li>
                        <li @click="$router.push({path:'/sub_account'})">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.subAccount:''}}</li>
                        <li class="active">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.membership:''}}</li>
                    </ul>
                </div>
                <div class="details">
                    <div class="membership-billing">
                        <div>
                            <p class="title">{{lang.hasOwnProperty('lang')?langCon[lang.lang].account.membershipTitle:''}}</p>
                            <span><img src="../../assets/img/accountSet/viped.png" alt="vip"></span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Head from '../../components/Head'
    import {mapState, mapMutations} from 'vuex'
    import {langCon} from "../../assets/data/langCon";
    export default {
        components:{Head},
        data(){
            return{
                langCon:langCon,

            }
        },
        computed:{
            ...mapState(['lang','isLogin','userInfo','country']),
        },
        mounted:function(){
            if(!this.isLogin){
                switch (this.lang.lang) {
                    case 'ZH':
                        // this.$refs.message.Message('您尚未登录。立即登录！');
                        alert('您尚未登录。立即登录！');
                        break;
                    case 'EN':
                        // this.$refs.message.Message('You are not logged in. Login now! ');
                        alert('You are not logged in. Login now! ');
                        break;
                    case 'IND':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'ES':
                        // this.$refs.message.Message('Anda belum login. Login sekarang!');
                        alert('Anda belum login. Login sekarang!');
                        break;
                    case 'PT':
                        // this.$refs.message.Message('Você não está logado. Entre agora!');
                        alert('Você não está logado. Entre agora!');
                        break;
                    default:
                        alert('You are not logged in. Login now! ');
                }
                this.$router.push({path:'/home'})
            }
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
            position: absolute;
            width: 100%;
            height: 750px;
            background: url("../../assets/img/bg.png") no-repeat;
            background-size: cover;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .main{
            position: absolute;
            top:150px;
            min-width: 1200px;
            width: 100%;
            box-sizing: border-box;
            padding: 0 60px;
            .con{
                width: 100%;
                min-width: 1200px;
                display: flex;
                .nav{
                    width: 260px;
                    height: 240px;
                    border: 1px solid #fff;
                    box-sizing: border-box;
                    overflow: hidden;
                    flex:  0 0 auto;
                    .title{
                        font-size: 32px;
                        font-weight: bold;
                        color: #f7f7f7;
                        height: 60px;
                        line-height: 60px;
                        box-sizing: border-box;
                        padding: 0 10px;
                    }
                    ul{
                        width: 100%;
                        padding: 0;
                        margin: 0;
                        li{
                            font-size: 16px;
                            font-weight: bold;
                            color: #fff;
                            cursor: pointer;
                            height: 60px;
                            line-height: 60px;
                            box-sizing: border-box;
                            padding: 0 10px;
                        }
                        .active{
                            cursor: default;
                            background: #358dfe;
                            /*background: #62a4fa;*/
                        }

                    }
                }
                .details{
                    flex: 1 1 auto;
                    .account-settings{
                        .head{
                            margin-bottom: 30px;
                            span{
                                display: block;
                                width: 80px;
                                height: 80px;
                                overflow: hidden;
                                margin: 0 auto;
                                cursor: pointer;
                                img{
                                    width: 100%;
                                }
                            }
                        }
                        .form{
                            width: 100%;
                            min-width: 1000px;
                            margin: 0 auto;
                            height: 400px;
                            background: #000;
                            box-sizing: border-box;
                            padding: 30px 0;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .form-container{
                                width: 100%;
                                padding: 0 30px;
                                box-sizing: border-box;
                                .row{
                                    display: flex;
                                    align-items: center;
                                    min-width: 1000px;
                                    width: 100%;
                                    .item{
                                        display: flex;
                                        align-items: center;
                                        margin-bottom: 30px;
                                        width: 45%;
                                        min-width: 500px;
                                        box-sizing: border-box;
                                        p{
                                            color: #fff;
                                            font-size: 18px;
                                            width:180px;
                                            white-space: nowrap;
                                        }
                                        .r{
                                            display: flex;
                                            align-items: center;
                                            border-bottom: 1px solid #fff;
                                            padding: 6px;
                                            position: relative;
                                            box-sizing: border-box;
                                            flex: 1;
                                            input{
                                                color: #fff;
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
                                                cursor: pointer;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                position: absolute;
                                                right: 0;
                                                color: #358dfe;
                                            }
                                        }
                                    }
                                    .c{
                                        width: 60px;
                                    }


                                }
                                .save,.change-password{
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
                                .change-password{
                                    position: relative;
                                    left: -40px;
                                }
                            }
                            .zh{
                                .row{
                                    .item{
                                        p{
                                            width: 60px;
                                        }
                                    }
                                }
                            }
                            .en{
                                .row{
                                    .item{
                                        p{
                                            width: 140px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .membership-billing{
                        width: 100%;
                        overflow: hidden;
                        .title{
                            color: #fff;
                            font-size: 24px;
                            width: 100%;
                            padding: 0 30px;
                            box-sizing: border-box;
                            margin-bottom: 15px;
                        }
                        .limited{
                            color: #fff;
                            font-size: 14px;
                            width: 100%;
                            padding: 0 30px;
                            box-sizing: border-box;
                            margin-bottom: 30px;
                        }
                        .vip-type-list{
                            width: 100%;
                            margin-bottom: 30px;
                            ul{
                                box-sizing: border-box;
                                width: 100%;
                                padding: 0 30px;
                                display: flex;
                                align-items: center;
                                li{
                                    width: 200px;
                                    border-radius: 40px;
                                    position: relative;
                                    margin-right: 15px;
                                    cursor: pointer;
                                    span{
                                        display: block;
                                        width: 200px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                    p{
                                        position: absolute;
                                        top: 50%;
                                        left:50%;
                                        transform: translate(-50%,-50%);
                                        color: #fff;
                                        font-size: 18px;
                                        white-space :nowrap;
                                    }
                                }
                                .active{
                                    /*background: #ffc510;*/
                                    p{
                                        color: #000;
                                    }
                                }
                            }
                        }
                        .promotion-code,.freeCode{
                            width: 100%;
                            margin-left: 30px;
                            margin-bottom: 30px;
                            .label{
                                color: #fff;
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                            .value{
                                display: flex;
                                align-items: center;
                                width: 420px;
                                border-bottom: 1px solid #fff;
                                input{
                                    border: none;
                                    background: transparent;
                                    width: 500px;
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 18px;
                                    color: #fff;
                                    outline: none;
                                }
                                .btn{
                                    color: #358dfe;
                                    cursor: pointer;
                                }
                            }
                        }
                        .pay-list{
                            box-sizing: border-box;
                            margin: 0 30px;
                            margin-bottom: 15px;
                            .payment{
                                color: #fff;
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                            .paypal-box{
                                display: flex;
                                align-items: center;
                                height: 34px;
                                margin-bottom: 20px;
                                .paypal-button-container{
                                    width: 260px;
                                    height: 34px;
                                    overflow: hidden;
                                    margin-right: 60px;
                                }
                            }
                            .show{
                                display: flex;
                            }
                            .hide{
                                display: none;
                            }
                            ul{
                                li{
                                    cursor: pointer;
                                    margin-right: 30px;
                                    box-sizing: border-box;
                                    margin-bottom: 20px;
                                    text-align: center;
                                    display: flex;
                                    align-items: center;
                                    span{
                                        display: block;
                                        width: 260px;
                                        overflow: hidden;
                                        background: #fff;
                                        height: 34px;
                                        cursor: pointer ;
                                        border-radius: 3px;
                                        margin-right: 60px;
                                        img{
                                            height: 100%;
                                        }
                                    }

                                }
                            }
                            .price{
                                display: flex;
                                align-items: center;
                                p:nth-child(1){
                                    color: #fff;
                                    position: relative;
                                    margin-right: 20px;
                                }
                                .line:after{
                                    content: '';
                                    display: block;
                                    width: 100%;
                                    height: 2px;
                                    background: #ff0000;
                                    border-radius: 5px;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                                p:nth-child(2){
                                    color: #fff;
                                }
                            }


                        }
                        .hint{
                            width: 100%;
                            padding: 0 30px;
                            margin-bottom: 15px;
                            color: #ffb632;
                        }
                        .total{
                            display: flex;
                            align-items: center;
                            box-sizing: border-box;
                            justify-content: space-between;
                            padding: 0 30px;
                            margin-bottom: 30px;
                            width: 100%;
                            .l{
                                display: flex;
                                align-items: center;
                                p:nth-child(1){
                                    margin-right: 10px;
                                    color: #fff;
                                }
                                p:nth-child(2){
                                    display: block;
                                    color: #ff4949;
                                    border: 1px solid #ff4949;
                                    border-radius: 5px;
                                    padding: 4px 10px;
                                    box-sizing: border-box;
                                }
                            }
                            .r{
                                display: flex;
                                align-items: center;
                                p:nth-child(1){
                                    color: #fff;
                                    position: relative;
                                    margin-right: 20px;
                                }
                                p:nth-child(1):after{
                                    content: '';
                                    display: block;
                                    width: 100%;
                                    height: 2px;
                                    background: #ff0000;
                                    border-radius: 5px;
                                    position: absolute;
                                    top: 50%;
                                    transform: translateY(-50%);
                                }
                                p:nth-child(2){
                                    color: #fff;
                                }
                            }
                        }
                        .vip-privilege{
                            margin-bottom: 30px;
                            ul{
                                box-sizing: border-box;
                                padding: 0 30px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                li{
                                    display: flex;
                                    align-items: center;
                                    span{
                                        display: block;
                                        width: 30px;
                                        margin-right: 15px;
                                        img{
                                            width: 100%;
                                        }
                                    }
                                    p{
                                        color: #fff;
                                        font-size: 16px;
                                    }
                                }
                            }
                        }

                        .join{
                            width: 100%;
                            box-sizing: border-box;
                            padding: 0 30px;
                            display: flex;
                            margin-bottom: 30px;
                            span{
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                border-radius: 5px;
                                color: #fff;
                                font-size: 18px;
                                cursor: pointer;
                                width: 268px;
                                height: 65px;
                                background: url("../../assets/img/accountSet/buy.png") no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
            }
        }
        .received-code{
            width: 100%;
            position: absolute;
            z-index: 9999;
            height: 100%;
            top: 0;
            bottom: 0;
            background: rgba(0,0,0,.6);
            display: flex;
            align-items: center;
            justify-content: center;
            .box{
                background: #000;
                border: 1px solid #fff;
                border-radius: 30px;
                width: 500px;
                height: 300px;
                position: relative;
                .close{
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    color: #fff;
                    font-size:26px;
                    cursor: pointer;
                }
                .title{
                    color: #fff;
                    font-size: 18px;
                    text-align: center;
                    margin-top: 40px;
                }
                .des{
                    color: #fff;
                    font-size: 16px;
                    width: 100%;
                    box-sizing: border-box;
                    margin-top: 15px;
                    line-height: 1.5;
                    text-align: center;
                }
                .btn{
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0 15px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 40px;
                    .btn1{
                        width: 225px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 50px;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 30px;
                        background:linear-gradient(35deg,rgba(208,25,141,1),rgba(83,15,134,1));
                        cursor: pointer;
                    }
                    .btn2{
                        width: 225px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 50px;
                        color: #fff;
                        font-size: 16px;
                        border-radius: 30px;
                        background:linear-gradient(35deg,rgba(44,76,135,1),rgba(36,153,191,1));
                        cursor: pointer;
                    }
                }
            }
        }
        .right-web{
            position: absolute;
            width: 400px;
            height: 400px;
            right: 80px;
            top: -20px;
            img{
                width: 100%;
            }
        }
    }

</style>

