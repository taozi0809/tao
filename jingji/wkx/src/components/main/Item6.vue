<template>
    <div :class="isPC?'pc-item6':'mobile-item6'" id="item3">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="top">
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/1.png" alt="">
                        </div>
                        <div class="t2">计算机软件著作权登记证书</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/2.png" alt="">
                        </div>
                        <div class="t2">增值电信业务经营许可证</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/3.png" alt="">
                        </div>
                        <div class="t2">网络文化经营许可证</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/4.png" alt="">
                        </div>
                        <div class="t2">计算机软件著作权登记证书</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/5.png" alt="">
                        </div>
                        <div class="t2">国产网络游戏备案</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/6.png" alt="">
                        </div>
                        <div class="t2">国家新闻出版广电总局司局局函件</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/7.png" alt="">
                        </div>
                        <div class="t2">顶级国际域名证书</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/8.png" alt="">
                        </div>
                        <div class="t2">中国智力运动产业基地</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/9.png" alt="">
                        </div>
                        <div class="t2">众智体育发展有限公司</div>
                    </div>
                    <div class="t">
                        <div class="t1">
                            <img src="../../assets/img/main/item6/10.png" alt="">
                        </div>
                        <div class="t2">杉木（北京）投资咨询有限公司</div>
                    </div>
                    <div class="t"></div>
                    <div class="t"></div>
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
                    name:"资质展示",
                    des:"QUALIFICATION SHOW",
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
    .pc-item6{
        width: 100%;
        height: 1600px;
        background-image: url("../../assets/img/main/item6/bg.png");
        background-size:100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            .des-box{
                width: 1200px;
                margin: 0 auto;
                margin-top: 100px;
                .top{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .t{
                        width: 25%;
                        margin-bottom: 80px;
                        .t1{
                            width: 240px;
                            margin: 0 auto;
                            img{
                                width: 100%;
                            }

                        }
                        .t2{
                            text-align: center;
                            font-size: 18px;
                            font-weight: bold;
                            color: #fff;
                            margin-top: 20px;
                        }
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item6{
            background-size: 100% 60%;
            height:1340px;
            .con{
                .des-box{
                    width:900px;
                    margin-top: 100px;
                    .top{
                        .t{
                            width: 25%;
                            margin-bottom: 80px;
                            .t1{
                                width: 180px;
                            }
                            .t2{
                                font-size: 13px;
                                margin-top: 20px;
                            }
                        }
                    }
                }
            }
        }

    }
    .mobile-item6{
        width: 100%;
        background-image: url("../../assets/img/main/item6/bg.png");
        background-size:100% 18%;
        box-sizing: border-box;
        padding-bottom: 10vw;
        padding-top: 16vw;
        .con{
            .des-box{
                margin-top: 10vw;
                .top{
                    width: 90vw;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .t{
                        width:45vw;
                        margin-bottom:10vw;
                        .t1{
                            width:40vw;
                            margin: 0 auto;
                            img{
                                width: 100%;
                            }
                        }
                        .t2{
                            text-align: center;
                            font-size:3vw;
                            font-weight: bold;
                            color: #fff;
                            margin-top:4vw;
                        }
                    }
                }
            }
        }
    }
</style>
