<template>
    <div class="mark" :class="isPC?'pc-item8':'mobile-item8'" id="item8">
        <div class="con">
            <div class="title">
                <div class="t1">联系我们</div>
                <div class="t2">CONTACT US</div>
            </div>
            <div class="des-box">
                <div class="l"><img src="../../assets/img/main/item8/qr_code.png" alt=""></div>
                <div class="r">
                    <div class="t1">电话:  13520360588</div>
                    <div class="t1">公众号:  万康兴</div>
                    <div class="t1">微信号:  li17160030999</div>
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
        height:1263px;
        background-image: url("../../assets/img/main/item8/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        position: relative;
        top: -2px;
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
                height: 400px;
                margin: 0 auto;
                margin-top:80px;
                background-image: url("../../assets/img/main/item8/dk.png");
                background-size: 100% 100%;

                display: flex;
                align-items: center;
                .l{
                    width: 300px;
                    margin: 0 100px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    margin-left:60px;
                    .t1{
                        color:rgba(157,102,57,1);
                        line-height: 68px;
                        font-size: 26px;
                        font-weight: bold;
                    }
                }
            }
        }
        .con8{
            width: 1200px;
            margin-top: 210px;
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
                    .l{
                        width: 225px;
                        margin: 0 75px;
                    }
                    .r{
                        margin-left:45px;
                        .t1{
                            line-height: 68px;
                            font-size:20px;
                            font-weight: bold;
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
        background-image: url("../../assets/img/main/item8/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        position: relative;
        top: -2px;
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
                height:200px;
                margin: 0 auto;
                background-image: url("../../assets/img/main/item8/dk.png");
                background-size:100% 100%;
                margin-top:40px;
                display: flex;
                align-items: center;
                .l{
                    width:100px;
                    flex-shrink: 0;
                    margin-left:34px;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    margin-left:40px;
                    .t1{
                        color:rgba(157,102,57,1);
                        font-size:3.5vw;
                        font-weight: bold;
                        line-height: 34px;
                    }
                }

            }

        }
        .con8{
            width:90vw;
            margin: 0 auto;
            margin-top:80px;
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
