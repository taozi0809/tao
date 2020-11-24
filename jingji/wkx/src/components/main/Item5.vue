<template>
    <div class="mark" :class="isPC?'pc-item5':'mobile-item5'">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="top">
                    <div class="b">
                        <img src="../../assets/img/main/item5/1.png" alt="">
                        <div class="b1">
                            <div class="b2">国家体育总局棋牌运动管理中心</div>
                            <div class="b3">竞技趣味棋牌公共政策的制定者</div>
                        </div>
                    </div>
                    <div class="b">
                        <img src="../../assets/img/main/item5/2.png" alt="">
                        <div class="b1">
                            <div class="b2">中国智力运动产业基地</div>
                            <div class="b3">竞技趣味棋牌的指定执行单位</div>
                        </div>
                    </div>
                    <div class="b">
                        <img src="../../assets/img/main/item5/3.png" alt="">
                        <div class="b1">
                            <div class="b2">中国互联网上网服务行业协会</div>
                            <div class="b3">竞技趣味棋牌团体标准的制定者</div>
                        </div>
                    </div>
                </div>
                <div class="ce">
                    <img src="../../assets/img/main/item5/xt.png" alt="" v-if="isPC">
                    <div class="ced ced1">体育总局棋牌运动管理中心</div>
                    <div class="ced ced2">海南省文化广电出版体育厅</div>
                    <div class="ced ced3">海南省澄迈县人民政府</div>
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
                    name:"管理单位",
                    des:"MANAGEMENT UNIT",
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
    .pc-item5{
        width: 100%;
        height:850px;
        background: #fff;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            .des-box{
                width: 1200px;
                margin: 0 auto;
                margin-top:128px;
                overflow: hidden;
                .top{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .b{
                        width: 344px;
                        position: relative;
                        img{
                            width: 100%;
                        }
                        .b1{
                            position: absolute;
                            bottom: 0;
                            width: 344px;
                            height: 96px;
                            box-sizing: border-box;
                            .b2{
                                color: #fff;
                                font-size: 24px;
                                font-weight: bold;
                                margin-top: 17px;
                                text-align: center;
                            }
                            .b3{
                                color: #fff;
                                font-size: 18px;
                                margin-top: 13px;
                                text-align: center;
                            }
                        }
                    }
                }
                .ce{
                    width: 780px;
                    margin: 0 auto;
                    position: relative;
                    img{
                        width: 100%;
                    }
                    .ced{
                        position: absolute;
                        color: #020202;
                        font-size: 18px;
                        bottom:14px;

                    }
                    .ced1{
                        left:11px;
                    }
                    .ced2{
                        left:282px;
                    }
                    .ced3{
                        left:570px;
                    }
                }
            }
        }

    }
    @media screen and (max-width: 1024px) {
        .pc-item5{
            width: 100%;
            height:700px;
            background: #fff;
            box-sizing: border-box;
            padding-top: 100px;
            .con{
                .des-box{
                    width:900px;
                    margin-top:96px;
                    .top{
                        .b{
                            width:258px;
                            .b1{
                                width:258px;
                                height:72px;
                                .b2{
                                    font-size: 17px;
                                    margin-top:14px;
                                }
                                .b3{
                                    font-size: 13px;
                                    margin-top:10px;
                                }
                            }
                        }
                    }
                    .ce{
                        width: 585px;
                        .ced{
                            font-size:13px;
                            bottom:11px;
                        }
                        .ced1{
                            left:13px;
                        }
                        .ced2{
                            left:214px;
                        }
                        .ced3{
                            left:430px;
                        }
                    }
                }
            }
        }

    }
    .mobile-item5{
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding-bottom: 10vw;
        padding-top: 10vw;
        .con{
            .des-box{
                margin-top: 10vw;
                .top{
                    width: 100%;
                    .b{
                        width: 80vw;
                        img{
                            width: 100%;
                        }
                        margin: 0 auto;
                        position: relative;
                        margin-top: 10vw;
                        .b1{
                            position: absolute;
                            bottom: 0;
                            box-sizing: border-box;
                            width: 80vw;
                            height: 23vw;
                            .b2{
                                text-align: center;
                                color: #fff;
                                font-size: 5vw;
                                margin-top:5vw;
                                font-weight: bold;
                            }
                            .b3{
                                margin-top:3vw;
                                text-align: center;
                                color: #fff;
                                font-size: 4vw;
                            }
                        }
                    }
                }
                .ce{
                    .ced{
                        width: 100%;
                        padding:0 10vw;
                        box-sizing: border-box;
                        margin-top: 6vw;
                        color: #333;
                        font-size: 5vw;
                    }
                }
            }
        }
    }




</style>
