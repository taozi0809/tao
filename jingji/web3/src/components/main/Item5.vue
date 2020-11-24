<template>
    <div class="mark" :class="isPC?'pc-item5':'mobile-item5'" id="item5">
        <div class="con">
            <Title :title="title"/>
            <div class="title2">我们提供客户后台管理系统，欢迎有以下资源的合作。  </div>
            <div class="des-box">
                <div class="list">
                    <div class="c1">
                        <div class="img-icon"><img src="../../assets/img/main/item5/1.png" alt=""></div>
                        <div class="t1">休闲场景</div>
                        <div class="t2">棋牌室、茶室、网吧、台球厅、足疗按摩、洗浴、美发、KTV</div>
                    </div>
                    <div class="c1">
                        <div class="img-icon"><img src="../../assets/img/main/item5/2.png" alt=""></div>
                        <div class="t1">等候场景</div>
                        <div class="t2">高铁站、火车站、汽车站、机场、餐饮、地铁站、彩票站 </div>
                    </div>
                    <div class="c1">
                        <div class="img-icon"><img src="../../assets/img/main/item5/3.png" alt=""></div>
                        <div class="t1">高频场景</div>
                        <div class="t2">便利店、共享充电宝、共享单车、连锁店</div>
                    </div>
                    <div class="c1">
                        <div class="img-icon"><img src="../../assets/img/main/item5/4.png" alt=""></div>
                        <div class="t1">地推场景</div>
                        <div class="t2">夜市、美团、饿了么、滴滴、58同城</div>
                    </div>
                    <div class="c1">
                        <div class="img-icon"><img src="../../assets/img/main/item5/5.png" alt=""></div>
                        <div class="t1">线上推广</div>
                        <div class="t2">网站兼职、社群、私域流量、百度推广、内容推广、超级APP、小游戏植入</div>
                    </div>
                    <div class="c1">
                        <div class="img-icon"><img src="../../assets/img/main/item5/6.png" alt=""></div>
                        <div class="t1">异业合作</div>
                        <div class="t2">区块链、小游戏、棋牌游戏、直销、积分商城、微商</div>
                    </div>
                </div>
                <div class="xt"><img src="../../assets/img/main/item5/xt.png" alt=""></div>
            </div>
        </div>
        <div class="con5">
            <Title :title="title1"/>
            <div class="des2-box">
                <div class="l">
                    <div class="t1"><span>01</span>合法合规的协办授权资质</div>
                    <div class="t1"><span>02</span>全程推广营销体系支持</div>
                    <div class="t1"><span>03</span>全国过万亿的市场空间参与机会</div>
                    <div class="t1"><span>04</span>教育成本几乎为零的</div>
                </div>
                <div class="c">
                    <div class="t1"><span>05</span>一次精力的投入，一生躺赚的资产</div>
                    <div class="t1"><span>06</span>五亿庞大的基础趣味竞技棋牌用户</div>
                    <div class="t1"><span>07</span>政策的红利+行业的机遇=人生财富自由的机会</div>
                    <div class="t1"><span>08</span>一起参与打造国内首个千亿级智力竞技体育赛事平台</div>
                </div>
                <div class="r"><img src="../../assets/img/main/item5/dengpao.png" alt=""></div>
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
                    name:"合作对象",
                    des:"COOPERATION",
                },
                title1:{
                    name:"合作亮点",
                    des:"COOPERATION",
                },
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item5{
        width: 100%;
        height: 1390px;
        background-image: url("../../assets/img/main/item5/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con,.con5{
            .title2{
                font-size: 22px;
                color:#6381B7;
                font-weight: bold;
                text-align: center;
                margin-top: 40px;
            }
            .des-box{
                width: 1200px;
                margin: 0 auto;
                .list{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .c1{
                        width: 372px;
                        height: 200px;
                        box-sizing: border-box;
                        background:#DBEBFD;
                        border:2px solid #9AB9F0;
                        margin-top: 90px;
                        position: relative;
                        padding: 0 40px;
                        .img-icon{
                            width: 112px;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            top: -56px;
                            img{
                                width: 100%;
                            }
                        }
                        .t1{
                            color:#6381B7;
                            font-size: 22px;
                            text-align: center;
                            margin-top:74px;
                            font-weight: bold;
                        }
                        .t2{
                            margin-top: 18px;
                            color:#6381B7;
                            font-size: 16px;
                            text-align: center;
                            line-height: 1.5;
                        }
                    }
                }
                .xt{
                    width: 1200px;
                    margin: 0 auto;
                    margin-top: 70px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .con5{
            width: 1200px;
            margin: 0 auto;
            margin-top: 50px;
            .des2-box{
                margin-top: 60px;
                display: flex;
                align-items: center;
                .l,.c{
                    width: 400px;
                    .t1{
                        font-size: 20px;
                        color:#6381B7;
                        line-height: 45px;
                        span{
                            color:#A2B8DE;
                            font-family: 微软雅黑;
                            font-size: 24px;
                            box-sizing: border-box;
                            padding-right: 15px;
                        }
                    }
                }
                .c{
                    width: 620px;
                }
                .r{
                    width: 160px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .des-box{
                width:900px !important;
                .list{
                    .c1{
                        width: 280px !important;
                        height: 150px !important;
                        padding: 0 10px !important;
                        .img-icon{
                            width: 84px !important;
                            top: -47px !important;
                        }
                        .t1{
                            font-size: 18px !important;
                            margin-top: 50px !important;
                        }
                        .t2{
                            font-size:14px !important;
                            margin-top: 15px !important;
                        }
                    }
                }
                .xt{
                    width:900px !important;
                }
            }
            .con5{
                width: 900px;
                .des2-box{
                    .l,.c{
                        width:300px;
                        .t1{
                            font-size:16px;
                            span{
                                font-size:20px;
                            }
                        }
                    }
                    .c{
                        width: 465px;
                    }
                    .r{
                        width:120px;
                    }
                }
            }
        }

    }
    .mobile-item5{
        width: 100%;
        background-image: url("../../assets/img/main/item5/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con,.con5{

            .title2{
                font-size:3.6vw;
                font-weight: bold;
                color:#6381B7;
                text-align: center;
                margin-top:6vw;
            }
            .des-box{
                width: 80%;
                margin: 0 auto;
                .list{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .c1{
                        width: 372px;
                        height: 200px;
                        box-sizing: border-box;
                        background:#DBEBFD;
                        border:2px solid #9AB9F0;
                        margin-top: 90px;
                        position: relative;
                        padding: 0 40px;
                        .img-icon{
                            width: 90px;
                            position: absolute;
                            left: 50%;
                            transform: translateX(-50%);
                            top: -45px;
                            img{
                                width: 100%;
                            }
                        }
                        .t1{
                            color:#6381B7;
                            font-size:5vw;
                            text-align: center;
                            margin-top:74px;
                            font-weight: bold;
                        }
                        .t2{
                            margin-top: 18px;
                            color:#6381B7;
                            font-size: 4vw;
                            text-align: center;
                            line-height: 1.5;
                        }
                    }
                }
                .xt{
                    width: 80vw;
                    margin: 0 auto;
                    margin-top: 70px;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        .con5{
            width: 90vw;
            margin: 0 auto;
            margin-top: 60px;
            .des2-box{
                margin-top: 10vw;
                position: relative;
                .l,.c{
                    position: relative;
                    z-index: 2;
                    .t1{
                        font-size:4vw;
                        color:#6381B7;
                        margin-top: 15px;
                        line-height: 1.5;
                        text-indent: -2em ;
                        margin-left: 2em ;
                        span{
                            color:#A2B8DE;
                            font-family: 微软雅黑;
                            font-size: 5vw;
                            box-sizing: border-box;
                            padding-right:2vw;
                        }
                    }
                }
                .r{
                    position: absolute;
                    z-index: 1;
                    right:-5vw;
                    top: -5vw;
                    width: 20vw;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }




</style>
