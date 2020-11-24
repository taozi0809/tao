<template>
    <div class="mark" :class="isPC?'pc-item8':'mobile-item8'" id="item8">
        <div class="con">
            <div class="title">
                <div class="t1">关于我们</div>
                <div class="t2">ABOUT US</div>
            </div>
            <div class="des-box">
                <div class="list1">
                    <div class="img"><img src="src/assets/img/main/item8.2020.06.22/1.png" alt=""></div>
                    <div class="b">
                        <div class="d1">合法合规</div>
                        <div class="d2">我们是一个中国智力产业基地和中国互联网上网行业协会。双方携手打造棋牌竞技赛事，弘扬中国传统棋牌文化</div>
                    </div>
                </div>
                <div class="list2">
                    <div class="img"><img src="src/assets/img/main/item8.2020.06.22/2.png" alt=""></div>
                    <div class="b">
                        <div class="d1">公平公正</div>
                        <div class="d2">中国智力产业基地和中国互联网上网行业协会审核，赛事信息开放到区块链平台，在线可查，保证赛事的公平公正</div>
                    </div>
                </div>
                <div class="list3">
                    <div class="img"><img src="src/assets/img/main/item8.2020.06.22/3.png" alt=""></div>
                    <div class="b">
                        <div class="d1">综合平台</div>
                        <div class="d2">智力竞技、休闲娱乐、生活电商多维融合，为用户提供竞技、娱乐、生活三位一体的综合性平台</div>
                    </div>
                </div>
                <div class="list4">
                    <div class="img"><img src="src/assets/img/main/item8.2020.06.22/4.png" alt=""></div>
                    <div class="b">
                        <div class="d1">竞技棋牌</div>
                        <div class="d2">汇集全球竞技棋牌爱好者，同场竞技，以牌会友，以技取胜，带来欢乐的同时还可以获取丰厚的奖金</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="con8">
            <div class="title">
                <div class="t1">鸣谢单位</div>
            </div>
            <div class="dex2-box">
                <div class="l">
                    <div class="t">国家体育总局棋牌运动管理中心</div>
                    <div class="t">中国互联网上网服务行业协会</div>
                    <div class="t">中国智力运动产业基地</div>
                    <div class="t">众智体育发展有限公司</div>
                    <div class="t">和合文化集团（中国）有限公司</div>
                    <div class="t">北京网络行业协会</div>
                    <div class="t">中国互联网协会</div>
                    <div class="t">路火科技有限公司</div>
                </div>
                <div class="r">
                    <div class="t">中国警察协会</div>
                    <div class="t">中国互联网上网服务行业协会智力竞技分会</div>
                    <div class="t">中国智力运动网</div>
                    <div class="t">杉木（北京）投资咨询有限公司</div>
                    <div class="t">北京和合时代资产管理有限公司</div>
                    <div class="t">文化和旅游部</div>
                    <div class="t">国家标准化管理委员会</div>
                </div>
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
    .pc-item8{
        width: 100%;
        height:1424px;
        background-image: url("src/assets/img/main/item8.2020.06.22/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con,.con8{
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
            .des-box{
                width:1200px;
                margin: 0 auto;
                margin-top: 60px;
                .list1,.list2,.list3,.list4{
                    display: flex;
                    align-items: center;
                    margin-bottom: 40px;
                    .img{
                        width: 114px;
                        margin-right: 60px;
                        flex-shrink: 0;
                        img{
                            width: 100%;
                        }
                    }
                    .b{
                        color: #9D6639;
                        .d1{
                            font-size: 26px;
                            font-weight: bold;
                            margin-bottom: 20px;
                        }
                        .d2{
                            font-size: 22px;
                        }
                    }
                }
            }
        }
        .con8{
            width: 1200px;
            margin-top: 150px;
            .dex2-box{
                display: flex;
                align-items: center;
                margin-top: 70px;
                .l,.r{
                    width: 600px;
                    .t{
                        font-size: 20px;
                        font-weight:bold;
                        color:rgba(157,102,57,1);
                        line-height: 36px;
                    }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .con,.con8{
                width: 900px;
                .des-box{
                    width:900px;
                    .list1,.list2,.list3,.list4{
                        margin-bottom: 30px;
                        .img{
                            width:85px;
                            margin-right:30px;
                        }
                        .b{
                            .d1{
                                font-size:20px;
                                margin-bottom: 20px;
                            }
                            .d2{
                                font-size:16px;
                            }
                        }
                    }
                }
            }
            .con8{
                width:900px;
                .dex2-box{
                    .l,.r{
                        width: 450px;
                        .t{
                            font-size: 16px;
                            line-height:28px;
                        }
                    }
                }
            }

        }

    }
    .mobile-item8{
        width: 100%;
        background-image: url("../../assets/img/main/item7/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con,.con8{
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
            .des-box{
                width:90vw;
                margin: 0 auto;
                margin-top: 60px;
                .list1,.list2,.list3,.list4{
                    display: flex;
                    align-items: center;
                    margin-bottom: 40px;
                    .img{
                        width:15vw;
                        margin-right:4vw;
                        flex-shrink: 0;
                        img{
                            width: 100%;
                        }
                    }
                    .b{
                        color: #9D6639;
                        .d1{
                            font-size:5vw;
                            font-weight: bold;
                            margin-bottom: 15px;
                        }
                        .d2{
                            font-size:4vw;
                            line-height: 1.5;
                        }
                    }
                }
            }

        }
        .con8{
            width:90vw;
            margin: 0 auto;
            margin-top:120px;
            .dex2-box{
                margin-top:40px;
                .l,.r{
                    .t{
                        font-size:4vw;
                        color:rgba(157,102,57,1);
                        margin-top: 15px;
                    }
                }
            }
        }

    }
</style>
