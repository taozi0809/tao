<template>
    <div class="mark" :class="isPC?'pc-item2':'mobile-item2'" id="item2">
        <div class="con">
            <div class="title">
                <div class="t1">公司介绍</div>
                <div class="t2">COMPANY INTRODUCTION</div>
            </div>
            <div class="des-box">
                <div class="l">
                    <div class="des1">万康兴体育文化发展（海南)有限公司是“棋牌综合业务网络化管理项目”“趣味棋牌竞技化项目竞技二打一”的合法实施单位，由中国智力产业基地授权，中国互联网上网行业协会指导。通过竞技趣味棋牌服务管理平台对比赛信息、选手信息、赛事奖金规范管理。</div>
                    <div class="des2">其核心团队主要来自JJ比赛、迅雷游戏、腾讯游戏、汇旺支付、香港新华集团、中国上网行业服务协会、竞技趣味服务管理平台、智力产业运动基地、中国智力运动网的高管。对支付行业有深刻的理解，对游戏行业有深刻的认知、对赛事行业有深刻的见解、对文化领域又深刻的理解、对东南亚情况有深刻的了解。</div>
                    <div class="des3">旨在通过自身合法合规运营中的不断迭代更新升级，使趣味竞技棋牌产业突破“灰色地带”束缚，实现阳光化、绿色化、科学化、规范化、趣味化、竞技化、全民化、惠民化， 让趣味竞技 棋牌像彩票一样阳光化、规范化、全民化。</div>
                </div>
                <div class="r"><img src="../../assets/img/main/item2/r.png" alt=""></div>
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
    .pc-item2{
        width: 100%;
        height: 630px;
        background-image: url("../../assets/img/main/item2/bg.png");
        background-size:100% 100%;
        box-sizing: border-box;
        padding-top: 100px;
        overflow: hidden;
        .con{
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
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1200px;
                margin: 0 auto;
                margin-top: 20px;
                .l{
                    width: 900px;
                    box-sizing: border-box;
                    padding-right: 100px;
                    .des1,.des2,.des3{
                        color:rgba(152,102,61,1);
                        font-size: 20px;
                        font-weight: bold;
                        margin-top: 20px;
                        line-height: 30px;
                    }
                }
                .r{
                    width: 300px;
                    flex-shrink: 0;
                    img{
                        width: 100%;
                    }
                }
            }
        }
        @media screen and (max-width: 1024px) {
            .con{
                .des-box{
                    width: 900px !important;
                    .l{
                        width:675px !important;
                        padding-right: 75px !important;
                        .des1,.des2,.des3{
                            font-size: 14px !important;
                            margin-top: 10px !important;
                        }
                    }
                    .r{
                        width:225px !important;
                    }
                }
            }


        }
    }
    .mobile-item2{
        width: 100%;
        background-image: url("../../assets/img/main/item2/bg.png");
        background-size:cover;
        box-sizing: border-box;
        padding-bottom: 6vw;
        padding-top: 60px;
        .con{
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
                .l{
                    width: 90vw;
                    margin: 0 auto;
                    .des1,.des2,.des3{
                        font-size: 4vw;
                        color:rgba(152,102,61,1);
                        line-height: 1.5;
                        margin-top: 4vw;
                    }
                }
                .r{
                    width: 50vw;
                    margin: 0 auto;
                    margin-top: 4vw;
                    img{
                        width: 100%;
                    }
                }
            }
        }
    }




</style>
