<template>
    <div :class="isPC?'pc-item6':'mobile-item6'">
        <div class="con">
            <div class="title">
                <div class="t1">收入测算</div>
                <div class="t2"> REVENUE</div>
            </div>
            <div class="title2">低成本投入，无风险暴富、<span v-if="!isPC"><br></span>只要合作终身锁客、努力一段一生躺赚</div>
            <div class="des-box">
                <div class="des">
                    <div class="t">利润测算： </div>
                    <div class="t1">邀请<span class="n">1000</span>个选手，选手日报名参赛30元， 365*30*1000*5% =<span class="n">54.75</span>万</div>
                    <div class="t1">邀请<span class="n">5000</span>个选手，选手日报名参赛30元， 365*30*5000*5% =<span class="n">273.7</span>万</div>
                    <div class="t1">邀请<span class="n">10000</span>个选手，选手日报名参赛30元， 365*30*10000*5% =<span class="n">547.5</span>万</div>
                    <div class="t1">邀请<span class="n">100000</span>个选手，选手日报名参赛30元， 365*30*100000*5% =<span class="n">5475</span>万</div>
                </div>
            </div>
        </div>
        <div class="con6 mark" id="item6">
            <div class="title">
                <div class="t1">加盟流程</div>
                <div class="t2">FRANCHISE PROCESS</div>
            </div>
            <div class="des2-box">
                <div class="list1">
                    <div class="img"><img src="../../assets/img/main/item6/1.png" alt=""></div>
                    <div class="d1">了解加盟信息</div>
                </div>
                <div class="list2">
                    <div class="img"><img src="../../assets/img/main/item6/2.png" alt=""></div>
                    <div class="d1">确定加盟意向</div>
                </div>
                <div class="list3">
                    <div class="img"><img src="../../assets/img/main/item6/3.png" alt=""></div>
                    <div class="d1">签署合同</div>
                </div>
                <div class="list4">
                    <div class="img"><img src="../../assets/img/main/item6/4.png" alt=""></div>
                    <div class="d1">缴纳款项</div>
                </div>
                <div class="list5">
                    <div class="img"><img src="../../assets/img/main/item6/5.png" alt=""></div>
                    <div class="d1">权限部署</div>
                </div>
                <div class="list6">
                    <div class="img"><img src="../../assets/img/main/item6/6.png" alt=""></div>
                    <div class="d1">运营支持</div>
                </div>
                <div class="hx" v-if="isPC"><img src="../../assets/img/main/item6/hx.png" alt=""></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ispc} from "../../utils/isPc";

    export default {
        data(){
            return{
                isPC:true,
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item6{
        width: 100%;
        height: 1440px;
        background-image: url("../../assets/img/main/item6/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con,.con6{
            width: 1200px;
            margin: 0 auto;
            .title{
                .t1{
                    text-align: center;
                    color:rgba(186,88,35,1);
                    font-size: 32px;
                    font-weight: bold;
                    line-height: 24px;
                }
                .t2{
                    text-align: center;
                    color:rgba(186,88,35,1);
                    font-size: 18px;
                    line-height: 22px;
                    margin-top: 15px;
                }
            }
            .title2{
                color:rgba(157,102,57,1);
                font-size: 20px;
                font-weight:bold;
                margin-top:70px ;
            }
            .des-box{
                width: 1200px;
                height: 312px;
                border:8px solid rgba(250, 241, 222, 1);
                border-radius:8px;
                margin-top: 30px;
                .des{
                    box-sizing: border-box;
                    padding: 30px 120px;
                    .t{
                        color:rgba(157,102,57,1);
                        font-size: 20px;
                        font-weight:bold;
                        padding-bottom: 6px;
                    }
                    .t1{
                        color:rgba(157,102,57,1);
                        font-size: 20px;
                        font-weight:bold;
                        margin-top:20px;
                        .n{
                            font-size: 28px;
                            padding: 0 10px;
                        }
                    }
                }
            }
        }
        .con6{
            margin-top: 200px;
            box-sizing: border-box;
            padding-top: 100px;
            .des2-box{
                width:1200px;
                margin: 0 auto;
                overflow: hidden;
                height: 340px;
                background:rgba(242,229,204,1);
                display: flex;
                align-items: center;
                justify-content: space-around;
                margin-top: 80px;
                box-sizing: border-box;
                padding-top: 100px;
                padding-bottom: 120px;
                position: relative;
                .list1,.list2,.list3,.list4,.list4,.list5,.list6{
                    flex: 1;
                    width: 100%;
                    .img{
                        width: 87px;
                        margin: 0 auto;
                        position: relative;
                        z-index: 2;
                        img{
                            width: 100%;
                        }
                    }
                    .d1{
                        color: #9D6639;
                        font-size: 20px;
                        font-weight: bold;
                        text-align: center;
                        margin-top: 20px;
                    }

                }
                .hx{
                    position: absolute;
                    top:120px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1160px;
                    margin: 0 auto;
                    z-index: 0;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .con,.con6{
                width:900px;
                .title2{
                    color:rgba(157,102,57,1);
                    font-size:16px;
                    font-weight:bold;
                    margin-top:70px ;
                }
                .des-box{
                    width: 900px;
                    height: 234px;
                    .des{
                        box-sizing: border-box;
                        padding:20px 90px;
                        .t{
                            font-size:18px;
                        }
                        .t1{
                            font-size:16px;
                            .n{
                                font-size:20px;
                                padding: 0 10px;
                            }
                        }
                    }
                }
            }
            .con6{
                margin-top: 300px;
                box-sizing: border-box;
                padding-top: 100px;
                .des2-box{
                    width:900px;
                    height: 255px;
                    overflow: hidden;
                    margin: 0 auto;
                    margin-top: 50px;
                    .list1,.list2,.list3,.list4,.list4,.list5,.list6{
                        .img{
                            width: 65px;
                        }
                        .d1{
                            font-size: 16px;
                            margin-top: 10px;
                        }

                    }
                    .hx{
                        width:870px;
                        top: 85px;
                    }
                }
            }
        }

    }
    .mobile-item6{
        width: 100%;
        background-image: url("../../assets/img/main/item6/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con,.con6{
            .title{
                .t1{
                    text-align: center;
                    color:rgba(186,88,35,1);
                    font-size: 5vw;
                    font-weight: bold;
                }
                .t2{
                    text-align: center;
                    color:rgba(186,88,35,1);
                    font-size: 4vw;
                    margin-top: 3vw;
                }
            }
            .title2{
                width: 90vw;
                text-align: center;
                margin: 0 auto;
                color:rgba(157,102,57,1);
                font-size: 4vw;
                margin-top:40px ;
                line-height: 1.5;
                font-weight: bold;
            }
            .des-box{
                width:80vw;
                margin: 0 auto;
                height:420px;
                border:3px solid rgba(250, 241, 222, 1);
                border-radius:8px;
                margin-top: 30px;
                .des{
                    box-sizing: border-box;
                    padding:20px 10px;
                    .t{
                        color:rgba(157,102,57,1);
                        font-size:4vw;
                        font-weight:bold;
                    }
                    .t1{
                        color:rgba(157,102,57,1);
                        font-size:4vw;
                        margin-top:20px;
                        line-height: 1.5;
                        .n{
                            font-size:5vw;
                            padding: 0 10px;
                            font-weight: bold;
                            font-family: 微软雅黑;
                        }
                    }
                }
            }

        }
        .con6{
            margin-top: 60px;
            .des2-box{
                width: 90vw;
                margin: 0 auto;
                display: flex;
                align-items: center;
                flex-wrap:wrap;
                .list1,.list2,.list3,.list4,.list4,.list5,.list6{
                    width: 30vw;
                    margin-top:60px;
                    .img{
                        width: 12vw;
                        margin: 0 auto;
                        img{
                            width: 100%;
                        }
                    }
                    .d1{
                        color: #9D6639;
                        font-size: 4vw;
                        text-align: center;
                        margin-top:1vw;
                    }
                }
            }
        }
    }
</style>
