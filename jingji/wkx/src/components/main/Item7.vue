<template>
    <div class="mark" :class="isPC?'pc-item7':'mobile-item7'">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box" v-if="isPC">
                <div class="c">
                    <div class="d2">实名认证、职业注册</div>
                    <div class="d1">专业选手和职业选手实名认证、职业注册</div>
                </div>
                <div class="bot">
                    <div class="l">
                        <div class="lt l1">
                            <div class="d2">规范监督</div>
                            <div class="d1">通过行业自律公约和举报平台 规范、监督行业</div>
                        </div>
                        <div class="lt l2">
                            <div class="d2">官方认证</div>
                            <div class="d1">使用国家体育总局棋牌运动 管理中心认证的赛事标准、牌库</div>
                        </div>
                    </div>
                    <div class="c"><img src="../../assets/img/main/item7/c.png" alt=""></div>
                    <div class="r">
                        <div class="rt r1">
                            <div class="d2">平台监管</div>
                            <div class="d1">竞技趣味棋牌管理服务平台合作 伙伴账户监管实现企业守法经营</div>
                        </div>
                        <div class="rt r2">
                            <div class="d2">同等牌力撮合</div>
                            <div class="d1">通过同等牌力撮合，使赛事更 权威、更公平，防止作弊发生</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="des-box" v-if="!isPC">
                <div class="c"><img src="../../assets/img/main/item7/c.png" alt=""></div>
                <div class="bot">
                   <div class="b">
                       <div class="d2">实名认证、职业注册</div>
                       <div class="d1">专业选手和职业选手实名认证、职业注册</div>
                   </div>
                    <div class="b">
                        <div class="d2">规范监督</div>
                        <div class="d1">通过行业自律公约和举报平台 规范、监督行业</div>
                    </div>
                    <div class="b">
                        <div class="d2">平台监管</div>
                        <div class="d1">竞技趣味棋牌管理服务平台合作 伙伴账户监管实现企业守法经营</div>
                    </div>
                    <div class="b">
                        <div class="d2">官方认证</div>
                        <div class="d1">使用国家体育总局棋牌运动 管理中心认证的赛事标准、牌库</div>
                    </div>
                    <div class="b">
                        <div class="d2">同等牌力撮合</div>
                        <div class="d1">通过同等牌力撮合，使赛事更 权威、更公平，防止作弊发生</div>
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
                    name:"合规保障",
                    des:"COMPLIANCE GUARANTEE",
                    color:1,
                },
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item7{
        width: 100%;
        height:900px;
        background: #fff;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            width: 1200px;
            margin: 0 auto;
            .des-box{
                margin-top: 120px;
                .d1{
                    color: #737373;
                    font-size: 24px;
                }
                .d2{
                    color: #CB1B17;
                    font-size: 24px;
                    font-weight: bold;
                    margin-top: 12px;
                }
                .c{
                    .d1{
                        text-align: center;
                    }
                    .d2{
                        text-align: center;
                        margin-bottom: 12px;
                    }
                }
                .bot{
                    margin-top: 35px;
                    display: flex;
                    justify-content: center;
                    .l{
                        width: 320px;
                        text-align: right;
                        position: relative;
                        .lt{
                            .d1{
                                margin-top: 15px;
                                line-height: 30px;
                            }
                        }
                        .l2{
                            position: absolute;
                            bottom: 50px;
                        }
                    }
                    .c{
                        width:518px;
                        margin: 0 auto;
                        img{
                            width: 100%;
                        }
                    }
                    .r{
                        width: 320px;
                        text-align: left;
                        position: relative;
                        .rt{
                            .d1{
                                margin-top: 15px;
                                line-height: 30px;
                            }
                        }
                        .r2{
                            position: absolute;
                            bottom:50px;
                        }
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item7{
            height:750px;
            .con{
                width: 900px;
                .des-box{
                    margin-top:90px;
                    .d1{
                        font-size: 18px;
                    }
                    .d2{
                        font-size: 18px;
                        margin-top: 12px;
                    }
                    .bot{
                        margin-top: 26px;
                        .l{
                            width:240px;
                            .lt{
                                .d1{
                                    margin-top:12px;
                                    line-height:25px;
                                }
                            }
                            .l2{
                                bottom: 30px;
                            }
                        }
                        .c{
                            width:388px;

                        }
                        .r{
                            width: 240px;
                            .rt{
                                .d1{
                                    margin-top:12px;
                                    line-height:25px;
                                }
                            }
                            .r2{
                                bottom: 30px;
                            }
                        }
                    }
                }
            }
        }


    }
    .mobile-item7{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding-bottom:10vw;
        padding-top:10vw;
        .con{
            .des-box{
                margin-top: 10vw;
                .c{
                    width:70vw;
                    margin: 0 auto;
                    img{
                        width: 100%;
                    }
                }
                .bot{
                    margin-top: 10vw;
                    .b{
                        width: 80vw;
                        margin: 0 auto;
                        margin-top: 4vw;
                        .d1{
                            color: #737373;
                            font-size:4vw;
                            line-height: 1.5;
                            margin-top: 2vw;
                        }
                        .d2{
                            color: #CB1B17;
                            font-size: 4vw;
                            font-weight: bold;
                            margin-top: 2vw;
                        }
                    }
                }
            }
        }

    }
</style>
