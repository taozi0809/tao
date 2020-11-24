<template>
    <div class="mark" :class="isPC?'pc-item3':'mobile-item3'" id="item3">
        <div class="con">
            <Title :title="title"/>
            <div class="des-box">
                <div class="l"><img src="../../assets/img/main/item3/l.png" alt=""></div>
                <div class="r">
                    <div class="des">竞技二打一起源湖北、安徽一带，俗称斗地主，是一种简单易学、趣味性强、并且能够锻炼思维的纸牌游戏，深受各年龄段用户的喜爱。基于这样的产品特性，我们在中国智力产业基地和中国互联网上网行业协会的指导下，搭建一个全国性的竞技二打一多终端平台，构建选手报名、竞赛、奖金发放的闭环体系。同时，我们积极邀请全国的合作方与我们一起共建用户的推广和运营体系，丰富比赛的种类和玩法，开放办赛能力，下沉赋能赛事推广合作方，打造区域性个性化竞技赛事，通过娱乐生活的两端并行，以赛事运营+用户运营的手段拓展全新市场。</div>
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
                    des:"PRODUCT INTRODUCTION",
                },
            }
        },
        created() {
            this.isPC=ispc()
        }
    }
</script>

<style lang="scss" scoped>
    .pc-item3{
        width: 100%;
        height: 570px;
        background-image: url("../../assets/img/main/item3/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        .con{
            .des-box{
                display: flex;
                align-items: center;
                justify-content: center;
                width:1200px;
                margin: 0 auto;
                margin-top: 70px;
                .l{
                    width: 490px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width:710px;
                    flex-shrink: 0;
                    box-sizing: border-box;
                    padding-left: 70px;
                    .des{
                        color:#6381B7;
                        font-size: 20px;
                        font-weight: bold;
                        line-height: 30px;
                    }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .con{
                .des-box{
                    width: 900px;
                    .l{
                        width: 367px;
                    }
                    .r{
                        width: 533px;
                        .des{
                            font-size: 16px;
                        }
                    }
                }
            }

        }
    }
    .mobile-item3{
        width: 100%;
        background-image: url("../../assets/img/main/item3/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con{
            .des-box{
                .l{
                    width: 90vw;
                    margin: 0 auto;
                    margin-top: 6vw;
                    img{
                        width: 100%;
                    }
                }
                .r{
                    width: 90vw;
                    margin: 0 auto;
                    .des{
                        font-size: 4vw;
                        color:#6382B7;
                        line-height: 1.5;
                        margin-top: 4vw;
                    }
                }
            }
        }
    }




</style>
