<template>
    <div :class="isPC?'pc-item1_top':'mobile-item1_top'" id="item2">
        <div class="con">
            <Title :title="title"/>
            <div class="des">
                <div class="l"><img src="../../assets/img/main/item1_top/l.png" alt=""></div>
                <div class="r">
                    <div class="d1">依托竞技趣味棋牌服务管理</div>
                    <div class="d1">平台软件开展</div>
                    <div class="d1">竞技二打一实名认证赛事</div>
                    <div class="q">
                        <div class="q1">高频赛</div>
                        <div class="q1">实时赛</div>
                        <div class="q1">复活赛</div>
                        <div class="q1">锦标赛</div>
                        <div class="q1">天梯赛</div>
                    </div>
                    <div class="d2">比赛完成后选手可以在APP内实时提取奖金</div>
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
                    name:"产品介绍",
                    des:"PRODUCT DESCRIPTION",
                    color:1,
                },
            }
        },
        created() {
            this.isPC=ispc()
        },
    }
</script>


<style lang="scss" scoped>
    .pc-item1_top{
        width: 100%;
        height:800px;
        background:#fff;
        box-sizing: border-box;
        padding-top: 100px;
        overflow: hidden;
        .con{
            .des{
                width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 130px;
                .l{
                    width: 600px;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width:600px;
                    flex-shrink: 0;
                    position: relative;
                    .d1{
                        color: #333;
                        font-size: 26px;
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .q{
                        display: flex;
                        align-content: center;
                        justify-content: space-between;
                        margin-top: 40px;
                        .q1{
                            flex-shrink: 0;
                            color: #fff;
                            font-size: 22px;
                            width: 98px;
                            height: 98px;
                            overflow: hidden;
                            text-align: center;
                            line-height: 98px;
                            background-image: url("../../assets/img/main/item1_top/r.png");
                            background-size: 100% 100%;
                        }
                    }
                    .d2{
                        color: #333;
                        font-size: 24px;
                        margin-top:40px ;
                        text-align: center;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 1024px) {
        .pc-item1_top{
            height:700px;
            padding-top: 100px;
            .con{
                .des{
                    width: 900px;
                    .l{
                        width: 450px;
                    }
                    .r{
                        width: 450px;
                        .d1{

                            font-size:19px;
                            margin-bottom: 15px;
                        }
                        .q{
                            margin-top: 40px;
                            .q1{
                                font-size:16px;
                                width: 73.5px;
                                height: 73.5px;
                                line-height: 73.5px;
                            }
                        }
                        .d2{
                            font-size: 18px;
                        }
                    }
                }

            }
        }

    }
    .mobile-item1_top{
        width: 100%;
        background:#fff;
        box-sizing: border-box;
        padding-bottom:10vw;
        padding-top: 16vw;
        .con{
            .des{
                width: 100vw;
                box-sizing: border-box;
                margin: 0 auto;
                .l{
                    width: 80vw;
                    margin: 0 auto;
                    margin-top: 10vw;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    margin-top: 10vw;
                    .d1{
                        color: #333;
                        font-size:4vw;
                        text-align: center;
                        margin-bottom:4vw;
                    }
                    .q{
                        display: flex;
                        align-content: center;
                        justify-content: space-between;
                        width: 80vw;
                        margin: 0 auto;
                        margin-top:10vw;
                        .q1{
                            flex-shrink: 0;
                            color: #fff;
                            font-size: 4vw;
                            width: 12vw;
                            height: 12vw;
                            line-height: 12vw;
                            overflow: hidden;
                            text-align: center;
                            background-image: url("../../assets/img/main/item1_top/r.png");
                            background-size: 100% 100%;
                        }
                    }
                    .d2{
                        color: #333;
                        font-size:4vw;
                        margin-top:40px ;
                        text-align: center;
                    }
                }
            }
        }
    }




</style>
