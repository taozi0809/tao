<template>
    <div :class="isPC?'pc-item4':'mobile-item4'">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="l"><img src="../../assets/img/main/item4/l.png" alt=""></div>
                <div class="r">
                    <div class="t1">
                        <img src="../../assets/img/main/item4/r.png" alt="" v-if="isPC">
                        <div class="t">《趣味棋牌竞技网络赛事组织与管理规范》</div>
                    </div>
                    <div class="d1">
                        是全国首个关于网络棋牌行业的团体标准，规定了国内开展趣味棋牌竞技网络赛事的基本原则、赛事运营资格和责任、赛事筹备、赛事管理、赛事奖励发放及赛事监管的相关要求。
                        <span>公安部、文旅部、工信部、国家标准化委员会</span>
                        等审查委员会成员审批通过标准报批稿，最终通过中国互联网上网服务行业协会于2020年5月28日正式颁布。
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";
    import Title from '../../components/Title'

    export default {
        components:{Title},
        data(){
            return{
                isPC:true,
                title:{
                    name:"执行标准",
                    des:"EXECUTIVE STANDARD",
                    color:2,
                },
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item4{
        width: 100%;
        height:800px;
        background-image: url("../../assets/img/main/item4/bg.png");
        background-size:100% 90%;
        box-sizing: border-box;
        padding-top:100px;
        .con{
            .des-box{
                display: flex;
                align-items: center;
                width: 1200px;
                margin: 0 auto;
                margin-top:50px;
                overflow: hidden;
                .l{
                    width:366px;
                    box-sizing: border-box;
                    flex-shrink: 0;
                    position: relative;
                    z-index: 1;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width:864px;
                    flex-shrink: 0;
                    height: 294px;
                    background: #fff;
                    position: relative;
                    z-index: 0;
                    left: -30px;
                    .t1{
                        width: 656px;
                        height: 57px;
                        position: relative;
                        margin-top: 40px;
                        box-sizing: border-box;
                        img{
                            width: 100%;
                        }
                        .t{
                            color: #fff;
                            font-size: 30px;
                            font-weight: bold;
                            position: absolute;
                            top: 14px;
                            left: 30px;
                        }
                    }
                    .d1{
                        color: #333;
                        font-size: 20px;
                        line-height: 36px;
                        box-sizing: border-box;
                        padding: 26px 46px;
                        span{
                            font-weight: bold;
                        }
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item4{
            width: 100%;
            height:700px;
            background-image: url("../../assets/img/main/item4/bg.png");
            background-size:100% 70%;
            box-sizing: border-box;
            padding-top:100px;
            .con{
                .des-box{
                    width: 900px;
                    margin-top:75px;
                    .l{
                        width:274px;
                    }
                    .r{
                        width:626px;
                        height:220px;
                        .t1{
                            width:492px;
                            height:42px;
                            margin-top:30px;
                            .t{
                                font-size:22px;
                                top: 11px;
                                left: 22px;
                            }
                        }
                        .d1{
                            font-size: 15px;
                            line-height:27px;
                            padding: 19px 34px;
                        }
                    }
                }
            }
        }

    }
    .mobile-item4{
        width: 100%;
        background-image: url("../../assets/img/main/item4/bg.png");
        background-size:100% 25%;
        box-sizing: border-box;
        padding-bottom:10vw;
        padding-top: 10vw;
        .con{
            .des-box{
                margin-top: 10vw;
                .l{
                    width: 50vw;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    .t1{
                        margin-top: 10vw;
                        .t{
                            text-align: center;
                            color: #fff;
                            font-size: 4.5vw;
                        }
                    }
                    .d1{
                        width: 80vw;
                        margin: 0 auto;
                        margin-top: 6vw;
                        color: #fff;
                        font-size: 4vw;
                        line-height: 1.5;
                        span{
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }




</style>
