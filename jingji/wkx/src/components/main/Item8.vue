<template>
    <div class="mark" :class="isPC?'pc-item8':'mobile-item8'" id="item4">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="l"><img src="../../assets/img/main/item8/l.png" alt=""></div>
                <div class="r">
                    <div class="t">万康兴以智力竞技产业促进地区文化发展</div>
                    <!--                    <div class="d">2020/07/31  14:00:00</div>-->
                    <div class="d">原鞍山公安局局长王魁良认为：万康兴的落地可以帮助鞍山营造健康体育竞技文化和生态，激发和聚集新的经济活力，使得鞍山跻身于健康竞...</div>
                    <div class="xt"></div>

                    <div class="t">趣味棋牌产业的困境还是机遇？</div>
                    <!--                    <div class="d">2020/07/31  14:00:00</div>-->
                    <div class="d">自从国家体育总局棋牌运动管理中心将大众喜爱的棋牌游戏发展成专业水平的竞技化赛事，即“竞技二打一”纳入智力竞技体育项目...</div>
                    <div class="xt"></div>

                    <div class="t">率先开创竞技趣味棋牌风口的探路者</div>
                    <!--                    <div class="d">2020/07/31  14:00:00</div>-->
                    <div class="d">早年间，被官方和社会主流舆论认可的智力竞技运动只包括“五棋一牌”，即围棋、象棋、国际象棋、国际跳棋、五子棋和桥牌...</div>
                    <div class="xt"></div>

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
                    name:"新闻资讯",
                    des:"NEWS INFORMATION",
                    color:2,
                },
            }
        },

        created() {
            this.isPC=ispc()
        },

    }
</script>

<style lang="scss" scoped>
    .pc-item8{
        width: 100%;
        height:800px;
        background-image: url("../../assets/img/main/item8/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            .des-box{
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 1200px;
                margin: 0 auto;
                margin-top: 100px;
                .l{
                    width: 620px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width: 540px;
                    position: relative;
                    top: 10px;
                    .t{
                        color: #fff;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .d{
                        color: #fff;
                        font-size: 14px;
                        width: 518px;
                        line-height: 21px;
                        margin-top:6px;
                    }
                    .xt{
                        background: #7C7C7C;
                        width: 537px;
                        height: 1px;
                        margin-top: 15px;
                        margin-bottom: 15px;
                    }

                }
            }
        }


    }
    @media screen and (max-width: 1024px) {
        .pc-item8{
            height:650px;
            padding-top: 100px;
            .con{
                .des-box{
                    width:900px;
                    margin-top:75px;
                    .l{
                        width:465px;
                        height: 270px;
                    }
                    .r{
                        width:405px;
                        .t{
                            font-size: 18px;
                        }
                        .d{
                            color: #fff;
                            font-size:12px;
                            width:388px;
                            line-height:15px;
                            margin-top:4px;
                        }
                        .xt{
                            width:402px;
                            height: 1px;
                            margin-top: 11px;
                            margin-bottom:11px;
                        }

                    }
                }
            }
        }
    }
    .mobile-item8{
        width: 100%;
        background-image: url("../../assets/img/main/item8/bg.png");
        background-size:100% 20%;
        box-sizing: border-box;
        padding-bottom: 10vw;
        padding-top: 16vw;
        .con{
            .des-box{

                .l{
                    width: 80vw;
                    height: 45vw;
                    margin: 0 auto;
                    background: #BEBEBE;
                    margin-top: 10vw;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width: 80vw;
                    margin: 0 auto;
                    margin-top: 10vw;
                    .t{
                        color: #fff;
                        font-size:4vw;
                        font-weight: bold;
                        margin-bottom: 2vw;
                    }
                    .d{
                        color: #fff;
                        font-size:3vw;
                        line-height:1.5;
                        margin-bottom: 1vw;
                    }
                    .xt{
                        background: #7C7C7C;
                        width: 80vw;
                        height: 1px;
                        margin-top: 3vw;
                        margin-bottom:4vw;
                    }

                }
            }
        }
    }
</style>

